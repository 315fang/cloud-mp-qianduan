/**
 * appConfig.js — 云开发版
 *
 * 原版通过 GET /mini-program-config 拉取配置，
 * 云开发版改为调用 config 云函数（action: 'miniProgramConfig'）
 */
const { callFn } = require('./utils/cloud');
const { cloneDefaults, mergeDeep, normalizeTabBarConfig, coerceLotteryEntryFlagInPlace } = require('./utils/miniProgramConfig');

module.exports = {
    applyMiniProgramConfig(config = {}) {
        const merged = mergeDeep(cloneDefaults(), config);
        if (merged.feature_flags && typeof merged.feature_flags === 'object') {
            coerceLotteryEntryFlagInPlace(merged.feature_flags);
        }
        if (merged.brand_config && merged.brand_config.tab_bar) {
            merged.brand_config.tab_bar = normalizeTabBarConfig(merged.brand_config.tab_bar);
        }
        const brandConfig = merged.brand_config || {};
        this.globalData.miniProgramConfig = merged;
        this.globalData.brandName = brandConfig.brand_name || '问兰';
        this.globalData.shareTitle = brandConfig.share_title || `${this.globalData.brandName} · 品牌甄选`;
        this.globalData.customerServiceWechat = brandConfig.customer_service_wechat || 'wl_service';
        this.globalData.customerServiceHours = brandConfig.customer_service_hours || '9:00-21:00';
        this.applyTabBarConfig(brandConfig.tab_bar || {});
    },

    fetchMiniProgramConfig(options = {}) {
        const { forceRefresh = false, cacheOnly = false } = options;
        const cacheKey = 'mini_program_config_cache';
        // 60s：给后台 feature_flags 等运营开关一个更短的传导窗口；
        // 即使过期也只影响"冷启动那一帧用什么渲染"。
        const cacheTtl = 60 * 1000;
        const now = Date.now();
        let cachedConfig = null;
        let hasFreshCache = false;

        // 先读本地缓存
        try {
            const cached = wx.getStorageSync(cacheKey);
            const hasCachedConfig = !!(cached && cached.config);
            hasFreshCache = hasCachedConfig && cached.expireAt > now;
            if (hasCachedConfig) {
                cachedConfig = cached.config;
            }
            if (hasFreshCache || cacheOnly || (forceRefresh && hasCachedConfig)) {
                if (hasCachedConfig) this.applyMiniProgramConfig(cached.config);
            }
        } catch (_) {}

        if (cacheOnly || (!forceRefresh && hasFreshCache)) {
            return Promise.resolve(cachedConfig || this.globalData.miniProgramConfig);
        }

        if (this.globalData.miniProgramConfigPromise) {
            return this.globalData.miniProgramConfigPromise;
        }

        // ★ 改为调用云函数
        const promise = callFn('config', { action: 'miniProgramConfig' }, { showError: false })
            .then(res => {
                if (res && res.code === 0 && res.data) {
                    this.applyMiniProgramConfig(res.data);
                    wx.setStorageSync(cacheKey, { config: res.data, expireAt: Date.now() + cacheTtl });
                    return res.data;
                }
                return this.globalData.miniProgramConfig;
            })
            .catch(err => {
                console.warn('[MiniProgramConfig] 云函数拉取失败，使用本地默认配置', err);
                return this.globalData.miniProgramConfig;
            })
            .finally(() => {
                this.globalData.miniProgramConfigPromise = null;
            });

        this.globalData.miniProgramConfigPromise = promise;
        return promise;
    },

    applyTabBarConfig(tabBarConfig = {}) {
        if (!wx.setTabBarStyle || !wx.setTabBarItem) return;
        const tabBar = normalizeTabBarConfig(tabBarConfig);
        try {
            wx.setTabBarStyle({
                color: tabBar.color,
                selectedColor: tabBar.selectedColor,
                backgroundColor: tabBar.backgroundColor,
                borderStyle: tabBar.borderStyle
            });
            (tabBar.items || []).forEach(item => {
                if (item && typeof item.index === 'number' && item.text) {
                    wx.setTabBarItem({ index: item.index, text: item.text });
                }
            });
        } catch (e) {
            console.warn('[MiniProgramConfig] 动态应用 TabBar 配置失败:', e);
        }
    },

    applyActiveTheme() {
        const cacheKey = 'active_theme_cache';
        const cacheTtl = 30 * 60 * 1000;
        const now = Date.now();

        try {
            const cached = wx.getStorageSync(cacheKey);
            if (cached && cached.expireAt > now) {
                this.injectThemeCssVars(cached.theme);
                return;
            }
        } catch (e) {}

        // ★ 改为调用云函数
        callFn('config', { action: 'activeTheme' }, { showError: false })
            .then(res => {
                if (res && res.data) {
                    this.injectThemeCssVars(res.data);
                    wx.setStorageSync(cacheKey, { theme: res.data, expireAt: now + cacheTtl });
                }
            })
            .catch(err => {
                console.warn('[Theme] 主题拉取失败，保持默认样式', err);
            });
    },

    injectThemeCssVars(theme) {
        if (!theme) return;
        try {
            const styles = {};
            if (theme.primary_color) {
                styles['--luxury-gold'] = theme.primary_color;
                styles['--color-primary'] = theme.primary_color;
            }
            if (theme.secondary_color) {
                styles['--luxury-black'] = theme.secondary_color;
                styles['--color-text-primary'] = theme.secondary_color;
            }
            if (theme.css_vars && typeof theme.css_vars === 'object') {
                Object.assign(styles, theme.css_vars);
            }
            if (Object.keys(styles).length > 0) {
                const pages = typeof getCurrentPages === 'function' ? getCurrentPages() : [];
                if (!pages.length) return;
                wx.setPageStyle({ style: styles });
            }
        } catch (e) {
            console.warn('[Theme] 注入 CSS 变量失败:', e);
        }
    }
};
