/**
 * appPrefetch.js — 云开发版
 *
 * 原版通过 GET /page-content/home 预拉取，
 * 云开发版改为调用 config 云函数。
 */
const { callFn } = require('./utils/cloud');
const { get } = require('./utils/request');
const { cachedGet } = require('./utils/requestCache');
const { isActivityCenterEnabled } = require('./utils/miniProgramConfig');
const HOME_PAGE_CACHE_KEY = 'home_config_cache';
const MINI_PROGRAM_CONFIG_CACHE_KEY = 'mini_program_config_cache';
const HOME_PAGE_ASSET_TTL = 5 * 60 * 1000;
const MINI_PROGRAM_CONFIG_CACHE_TTL = 60 * 1000;
const CATEGORY_BOOTSTRAP_TTL = 5 * 60 * 1000;
const ACTIVITY_BOOTSTRAP_TTL = 60 * 1000;
const LIMITED_SALE_OVERVIEW_TTL = 30 * 1000;
const USER_DASHBOARD_BOOTSTRAP_TTL = 15 * 1000;
const PRODUCT_BUNDLE_PREFETCH_TTL = 2 * 60 * 1000;

module.exports = {
    prefetchHomeData(options = {}) {
        const { forceRefresh = false } = options;
        const expireAt = Number(this.globalData.homePageDataExpireAt || 0);
        if (!forceRefresh && this.globalData.homePageData && expireAt > Date.now()) {
            this._applyMiniProgramConfigFromHomePayload(this.globalData.homePageData);
            return Promise.resolve(this.globalData.homePageData);
        }
        if (!forceRefresh && this.globalData.homeDataPromise) {
            return this.globalData.homeDataPromise;
        }
        if (forceRefresh) {
            this.globalData.homePageData = null;
            this.globalData.homePageDataExpireAt = 0;
            try { wx.removeStorageSync(HOME_PAGE_CACHE_KEY); } catch (_) {}
        } else {
            try {
                const cached = wx.getStorageSync(HOME_PAGE_CACHE_KEY);
                if (cached && cached.data && cached.expireAt > Date.now()) {
                    this._cacheHomePayload(cached.data, Number(cached.expireAt) || 0);
                    this._applyMiniProgramConfigFromHomePayload(cached.data);
                    return Promise.resolve(cached.data);
                }
            } catch (_) {}
        }

        // ★ 改为调用云函数
        // 加可控超时:原来 timeout=0 完全依赖基础库默认超时,冷启动慢时会干等十几秒并抛
        // 基础库 Error: timeout。这里 8s 截断 + 只读重试一次:首次超时通常已 warm 容器,
        // 重试命中热容器快速返回;仍失败则走下方 .catch 兜底(首页用本地缓存渲染,不受影响)。
        const promise = callFn('config', { action: 'homeContent' }, {
            showError: false,
            timeout: 8000,
            maxRetries: 1,
            retryDelay: 500,
            readOnly: true
        })
            .then(res => {
                const pageData = res && (res.data || res);
                if (!pageData) throw new Error('empty home content');

                this._cacheHomePayload(pageData);
                this._applyMiniProgramConfigFromHomePayload(pageData);
                return pageData;
            })
            .catch(err => {
                console.warn('[Prefetch] 首页配置预拉取失败（不影响首页兜底渲染）', err);
                return null;
            })
            .finally(() => {
                this.globalData.homeDataPromise = null;
            });

        this.globalData.homeDataPromise = promise;
        return promise;
    },

    prefetchCategoryBootstrap() {
        if (this.globalData.categoryBootstrapPromise) {
            return this.globalData.categoryBootstrapPromise;
        }

        const promise = Promise.allSettled([
            cachedGet(get, '/categories', {}, {
                cacheTTL: CATEGORY_BOOTSTRAP_TTL,
                showError: false,
                maxRetries: 0
            }),
            cachedGet(get, '/banners', { position: 'category' }, {
                cacheTTL: CATEGORY_BOOTSTRAP_TTL,
                showError: false,
                maxRetries: 0
            }),
            cachedGet(get, '/product-bundles', { page: 1, limit: 20 }, {
                cacheTTL: PRODUCT_BUNDLE_PREFETCH_TTL,
                showError: false,
                maxRetries: 0
            }),
            cachedGet(get, '/products', {
                page: 1,
                limit: 100,
                sort: 'manual_weight',
                view: 'card',
                include_skus: 0,
                include_total: 1
            }, {
                cacheTTL: CATEGORY_BOOTSTRAP_TTL,
                showError: false,
                maxRetries: 0
            })
        ])
            .catch((err) => {
                console.warn('[Prefetch] 分类页基础数据预拉取失败（不影响分类页兜底加载）', err);
                return null;
            })
            .finally(() => {
                this.globalData.categoryBootstrapPromise = null;
            });

        this.globalData.categoryBootstrapPromise = promise;
        return promise;
    },

    prefetchActivityBootstrap() {
        if (!isActivityCenterEnabled()) {
            return Promise.resolve(null);
        }
        if (this.globalData.activityBootstrapPromise) {
            return this.globalData.activityBootstrapPromise;
        }

        const promise = Promise.allSettled([
            cachedGet(get, '/page-content', { page_key: 'activity' }, {
                cacheTTL: ACTIVITY_BOOTSTRAP_TTL,
                showError: false,
                maxRetries: 0
            }),
            cachedGet(get, '/limited-sales/overview', {}, {
                cacheTTL: LIMITED_SALE_OVERVIEW_TTL,
                showError: false,
                maxRetries: 0
            })
        ])
            .catch((err) => {
                console.warn('[Prefetch] 活动页基础数据预拉取失败（不影响活动页兜底加载）', err);
                return null;
            })
            .finally(() => {
                this.globalData.activityBootstrapPromise = null;
            });

        this.globalData.activityBootstrapPromise = promise;
        return promise;
    },

    prefetchUserBootstrap() {
        if (!this.globalData.isLoggedIn) {
            return Promise.resolve(null);
        }
        if (this.globalData.userDashboardBootstrapPromise) {
            return this.globalData.userDashboardBootstrapPromise;
        }

        const openid = this.globalData.openid || wx.getStorageSync('openid') || '';
        const promise = cachedGet(get, '/user/dashboard-bootstrap', { _openid_cache_key: openid }, {
            cacheTTL: USER_DASHBOARD_BOOTSTRAP_TTL,
            showError: false,
            maxRetries: 0
        })
            .catch((err) => {
                console.warn('[Prefetch] 用户 dashboard 预拉取失败（不影响我的页兜底加载）', err);
                return null;
            })
            .finally(() => {
                this.globalData.userDashboardBootstrapPromise = null;
            });

        this.globalData.userDashboardBootstrapPromise = promise;
        return promise;
    },

    runDeferredStartupPrefetch() {
        setTimeout(() => {
            const runWarmup = () => {
                this.prefetchCategoryBootstrap();
                this.prefetchActivityBootstrap();
                this.prefetchUserBootstrap();
            };
            if (!wx.getNetworkType) {
                runWarmup();
                return;
            }
            wx.getNetworkType({
                success: (res) => {
                    if (res && res.networkType === 'wifi') {
                        runWarmup();
                    }
                }
            });
        }, 3500);
    },

    _cacheHomePayload(payload, expireAt = Date.now() + HOME_PAGE_ASSET_TTL) {
        this.globalData.homePageData = payload;
        this.globalData.homePageDataExpireAt = expireAt;
        this.globalData.homePageDataVersion = '';
        const configs = payload?.configs || payload?.resources?.configs || {};
        if (configs) {
            this.globalData.brandName = configs.brand_name || this.globalData.brandName;
            this.globalData.shareTitle = configs.share_title || this.globalData.shareTitle;
            this.globalData.customerServiceWechat = configs.customer_service_wechat || this.globalData.customerServiceWechat;
        }
        try { wx.setStorageSync(HOME_PAGE_CACHE_KEY, { data: payload, expireAt }); } catch (_) {}
    },

    _applyMiniProgramConfigFromHomePayload(payload = {}) {
        const config = payload.miniProgramConfig
            || payload.mini_program_config
            || (payload.resources && payload.resources.mini_program_config);
        if (!config || typeof this.applyMiniProgramConfig !== 'function') return;
        this.applyMiniProgramConfig(config);
        try {
            wx.setStorageSync(MINI_PROGRAM_CONFIG_CACHE_KEY, {
                config,
                expireAt: Date.now() + MINI_PROGRAM_CONFIG_CACHE_TTL
            });
        } catch (_) {}
    }
};
