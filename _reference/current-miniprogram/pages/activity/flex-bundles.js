const { get } = require('../../utils/request');
const { cachedGet } = require('../../utils/requestCache');
const { safeBack } = require('../../utils/navigator');
const { warmRenderableImageUrls, resolveRenderableImageUrl } = require('../../utils/cloudAssetRuntime');
const { isActivityCenterEnabled } = require('../../utils/miniProgramConfig');
const app = getApp();

const BUNDLE_LIST_CACHE_TTL = 2 * 60 * 1000;

function pickInitialBundleCover(item = {}) {
    return item.hero_preview_url || item.hero_image || item.hero_file_id || item.cover_preview_url || item.cover_image || item.cover_file_id || '';
}

function mapBundleCard(item = {}) {
    return {
        ...item,
        cover_preview_url: pickInitialBundleCover(item)
    };
}

Page({
    data: {
        loading: true,
        loadError: false,
        bundles: []
    },

    onLoad() {
        if (app && typeof app.fetchMiniProgramConfig === 'function') {
            app.fetchMiniProgramConfig({ cacheOnly: true }).catch(() => null);
        }
        if (!isActivityCenterEnabled()) {
            wx.showToast({ title: '活动入口暂未开放', icon: 'none' });
            safeBack('/pages/index/index');
            return;
        }
        this.loadBundles();
    },

    onPullDownRefresh() {
        this.loadBundles(true).finally(() => {
            wx.stopPullDownRefresh();
        });
    },

    async loadBundles(forceRefresh = false) {
        const loadSeq = (this._bundleLoadSeq || 0) + 1;
        this._bundleLoadSeq = loadSeq;
        this.setData({ loading: true, loadError: false });
        try {
            const res = await cachedGet(get, '/product-bundles', {
                scene_type: 'flex_bundle',
                page: 1,
                limit: 50
            }, {
                cacheTTL: forceRefresh ? 0 : BUNDLE_LIST_CACHE_TTL,
                showError: false,
                maxRetries: 0,
                timeout: 10000
            });
            const rawList = Array.isArray(res?.data?.list)
                ? res.data.list
                : (Array.isArray(res?.list) ? res.list : []);
            const bundles = rawList.map(mapBundleCard);
            this.setData({
                bundles,
                loading: false,
                loadError: false
            });
            this.resolveBundleCoverUrls(rawList, loadSeq);
        } catch (error) {
            console.error('[flex-bundles] load failed:', error);
            this.setData({
                loading: false,
                loadError: true,
                bundles: []
            });
        }
    },

    async resolveBundleCoverUrls(rawList = [], loadSeq = 0) {
        try {
            const coverSources = (Array.isArray(rawList) ? rawList : []).map((item) => ({
                file_id: item.hero_file_id || item.cover_file_id || '',
                image: item.hero_preview_url || item.hero_image || item.cover_preview_url || item.cover_image || ''
            }));
            await warmRenderableImageUrls(coverSources);
            const bundles = await Promise.all((Array.isArray(rawList) ? rawList : []).map(async (item) => ({
                ...item,
                cover_preview_url: await resolveRenderableImageUrl({
                    file_id: item.hero_file_id || item.cover_file_id || '',
                    image: item.hero_preview_url || item.hero_image || item.cover_preview_url || item.cover_image || ''
                }, pickInitialBundleCover(item))
            })));
            if (this._bundleLoadSeq !== loadSeq) return;
            this.setData({ bundles });
        } catch (error) {
            console.warn('[flex-bundles] resolve covers failed:', error);
        }
    },

    onBack() {
        safeBack('/pages/activity/activity');
    },

    onRetry() {
        this.loadBundles();
    },

    onOpenBundle(e) {
        const id = e.currentTarget.dataset.id;
        if (!id) return;
        wx.navigateTo({
            url: `/pages/product-bundle/detail?id=${encodeURIComponent(String(id))}`
        });
    }
});
