const app = getApp();
const { get } = require('../../utils/request');
const { cachedGet } = require('../../utils/requestCache');
const {
    processProduct,
    genHeatLabel,
    resolveProductImage,
    resolveProductDisplayPrice,
    normalizePriceValue
} = require('../../utils/dataFormatter');
const { getApiBaseUrl } = require('../../config/env');
const { getConfigSection } = require('../../utils/miniProgramConfig');

// 统一走 page._setHomeData，确保派生字段（showHomeLoading / showFeaturedSkeleton /
// showProductsEmpty / showSoloSearch 等）随数据一起重算，避免全屏 loading 遮罩卡住。
function setHomePageData(page, patch, callback) {
    if (page && typeof page._setHomeData === 'function') {
        page._setHomeData(patch, callback);
        return;
    }
    page.setData(patch, callback);
}

function normalizeAssetUrl(url = '') {
    const raw = String(url || '');
    if (!raw) return '';
    if (/^cloud:\/\//i.test(raw)) return raw;
    if (/^https?:\/\//i.test(raw)) {
        if (isExpiredSignedAssetUrl(raw)) return '';
        return raw;
    }
    if (raw.startsWith('/')) {
        const apiBase = getApiBaseUrl().replace(/\/api\/?$/, '');
        return `${apiBase}${raw}`;
    }
    return raw;
}

function parseSignedAssetExpireAt(url = '') {
    const text = String(url || '').trim();
    if (!/^https?:\/\//i.test(text)) return 0;
    const match = text.match(/[?&]t=(\d{10,13})\b/i);
    if (!match) return 0;
    const raw = Number(match[1]);
    if (!Number.isFinite(raw) || raw <= 0) return 0;
    return raw > 1e12 ? raw : raw * 1000;
}

function isExpiredSignedAssetUrl(url = '') {
    const text = String(url || '').trim();
    if (!/^https?:\/\//i.test(text)) return false;
    if (!/[?&]sign=/.test(text)) return false;
    const expireAt = parseSignedAssetExpireAt(text);
    return expireAt > 0 && expireAt <= Date.now();
}

function pickImageSource(record = {}) {
    const direct = [record.image_url, record.url, record.image, record.cover_image]
        .map((item) => normalizeAssetUrl(item))
        .find(Boolean);
    if (direct) return direct;

    const fileId = String(record.file_id || '').trim();
    if (/^cloud:\/\//i.test(fileId)) {
        return normalizeAssetUrl(fileId);
    }
    return normalizeAssetUrl(fileId || '');
}

function pickDisplayName(record = {}) {
    return record.nickName || record.nickname || '';
}

function pickText(value, fallback = '') {
    if (value === null || value === undefined) return fallback;
    const text = String(value).trim();
    return text || fallback;
}

function toBoolean(value) {
    if (value === true || value === 1 || value === '1') return true;
    const text = pickText(value).toLowerCase();
    return ['true', 'yes', 'y', 'on', 'enabled', 'active', 'show', 'visible', 'display'].includes(text);
}

function createEmptyBrandZone() {
    return {
        enabled: false,
        title: '品牌专区',
        coverImage: '',
        showWelcome: false,
        welcomeTitle: '',
        welcomeSubtitle: '',
        cards: [],
        certifications: [],
        story: {
            title: '企业介绍',
            body: ''
        }
    };
}

function normalizeBrandZoneItem(item = {}, index = 0, prefix = 'brand-card') {
    if (typeof item === 'string') {
        const title = pickText(item);
        if (!title) return null;
        return {
            id: `${prefix}-${index}`,
            title,
            subtitle: '',
            image: '',
            link_type: 'none',
            link_value: ''
        };
    }
    if (!item || typeof item !== 'object') return null;
    const title = pickText(item.title || item.name || item.label);
    const subtitle = pickText(item.subtitle || item.desc || item.description);
    const image = normalizeAssetUrl(item.file_id || item.fileId || item.image || item.image_url || item.url || item.cover_image || item.coverImage);
    const linkType = pickText(item.link_type || item.linkType, 'none');
    const linkValue = pickText(item.link_value || item.linkValue);
    if (!(title || subtitle || image || linkValue)) return null;
    return {
        id: pickText(item.id || item._id || item.key, `${prefix}-${index}`),
        title: title || subtitle || '品牌内容',
        subtitle,
        image,
        link_type: linkType,
        link_value: linkValue
    };
}

function normalizeBrandZoneList(list = [], prefix = 'brand-card') {
    return (Array.isArray(list) ? list : [])
        .map((item, index) => normalizeBrandZoneItem(item, index, prefix))
        .filter(Boolean);
}

function buildBrandZone(configs = {}) {
    const empty = createEmptyBrandZone();
    const cards = normalizeBrandZoneList(configs.brand_endorsements, 'brand-card');
    const certifications = normalizeBrandZoneList(configs.brand_certifications, 'brand-cert');
    const rawWelcomeTitle = pickText(configs.brand_zone_welcome_title);
    const welcomeSubtitle = pickText(configs.brand_zone_welcome_subtitle);
    const welcomeTitle = rawWelcomeTitle || (toBoolean(configs.brand_zone_enabled) ? 'Welcome' : '');
    const story = {
        title: pickText(configs.brand_story_title, empty.story.title),
        body: pickText(configs.brand_story_body)
    };
    const coverImage = normalizeAssetUrl(configs.brand_zone_cover_file_id || configs.brand_zone_cover || '');
    const hasContent = !!(
        coverImage
        || rawWelcomeTitle
        || welcomeSubtitle
        || cards.length
        || certifications.length
        || story.body
    );

    const enabled = configs.brand_zone_enabled !== undefined
        ? toBoolean(configs.brand_zone_enabled)
        : hasContent;

    return {
        ...empty,
        enabled,
        title: pickText(configs.brand_zone_title, empty.title),
        coverImage,
        showWelcome: !!(welcomeTitle || welcomeSubtitle),
        welcomeTitle,
        welcomeSubtitle,
        cards,
        certifications,
        story
    };
}

async function loadData(page, forceRefresh = false) {
    const cacheKey = 'home_config_cache';
    const cacheTtl = 5 * 60 * 1000;
    const now = Date.now();
    setHomePageData(page, { loading: true });
    try {
        let data = null;

        if (!forceRefresh) {
            const memoryExpireAt = Number(app.globalData.homePageDataExpireAt || 0);
            if (app.globalData.homePageData && memoryExpireAt > now) {
                data = app.globalData.homePageData;
            } else if (app.globalData.homePageData && memoryExpireAt > 0 && memoryExpireAt <= now) {
                app.globalData.homePageData = null;
                app.globalData.homePageDataExpireAt = 0;
            }
            if (!data) {
                let cached = null;
                try { cached = wx.getStorageSync(cacheKey); } catch (_) {}
                if (cached && cached.expireAt > Date.now()) {
                    data = cached.data;
                    app.globalData.homePageData = data;
                    app.globalData.homePageDataExpireAt = Number(cached.expireAt) || 0;
                }
            }
            if (!data && app.globalData.homeDataPromise) {
                data = await app.globalData.homeDataPromise.catch(() => null);
            }
        }

        if (!data || Object.keys(data).length === 0) {
            const pageRes = await get('/page-content/home').catch(() => null);
            const canonicalPayload = pageRes && (pageRes.data || pageRes);
            if (canonicalPayload && Object.keys(canonicalPayload).length) {
                data = canonicalPayload;
                page.homeResources = canonicalPayload.resources || null;
                setHomePageData(page, { pageLayout: canonicalPayload.layout || canonicalPayload.resources?.layout || null });
            } else {
                const res = await get('/homepage-config').catch(() => ({ data: {} }));
                data = res.data || {};
            }

            if (data && Object.keys(data).length) {
                const expireAt = now + cacheTtl;
                app.globalData.homePageData = data;
                app.globalData.homePageDataExpireAt = expireAt;
                try {
                    wx.setStorageSync(cacheKey, { data, expireAt });
                } catch (_) {
                    // ignore storage write errors in low-storage scenarios
                }
            }
        }

        applyHomeConfig(page, data);
        // Sub-loaders fire without await intentionally — each populates its own
        // data slice independently and does not affect the main loading flag.
        loadFeaturedProducts(page, { forceRefresh });
        loadPosters(page, { forceRefresh });
        loadBubbles(page);
        loadCoupons(page);
    } catch (err) {
        console.error('[Index] 获取首页配置失败:', err);
        setHomePageData(page, { loading: false });
    }
}

async function loadFeaturedProducts(page, options = {}) {
    const forceRefresh = !!options.forceRefresh;
    try {
        const layoutBoardProducts = page.homeResources && page.homeResources.boards
            && page.homeResources.boards['home.featuredProducts']
            ? page.homeResources.boards['home.featuredProducts'].products
            : null;
        let list = Array.isArray(layoutBoardProducts) ? layoutBoardProducts : [];

        let boardProducts = list;
        if (!boardProducts.length) {
            const boardRes = await cachedGet(get, '/boards/map', {
                scene: 'home',
                keys: 'home.featuredProducts'
            }, {
                useCache: !forceRefresh,
                cacheTTL: 2 * 60 * 1000,
                showError: false,
                maxRetries: 0,
                timeout: 10000
            }).catch(() => null);
            boardProducts = boardRes && boardRes.data && boardRes.data['home.featuredProducts']
                ? boardRes.data['home.featuredProducts'].products
                : null;
        }
        list = Array.isArray(boardProducts) ? boardProducts : [];

        if (!list.length) {
            const res = await cachedGet(get, '/products', { page: 1, limit: 6, sort: 'hot' }, {
                useCache: !forceRefresh,
                cacheTTL: 2 * 60 * 1000,
                showError: false,
                maxRetries: 0,
                timeout: 10000
            });
            const listRaw = res.list || (res.data && res.data.list) || (Array.isArray(res.data) ? res.data : []);
            list = Array.isArray(listRaw) ? listRaw : [];
        }

        const roleLevel = app.globalData.userInfo && app.globalData.userInfo.role_level || 0;
        const products = list.map((product) => {
            const processed = processProduct(product, roleLevel);
            const displayPrice = Number(resolveProductDisplayPrice(product, roleLevel) || 0);
            const marketPrice = Number(normalizePriceValue(product.market_price ?? product.original_price) || 0);
            const coverImage = normalizeAssetUrl(resolveProductImage(product))
                || normalizeAssetUrl(processed.firstImage)
                || pickImageSource(product)
                || '/assets/images/placeholder.svg';
            const discountLabel = (marketPrice > displayPrice && displayPrice > 0)
                ? (Math.round(displayPrice / marketPrice * 10)) + '折'
                : '';
            const heatLabel = genHeatLabel(product);
            return {
                ...processed,
                cover_image: coverImage,
                image: coverImage,
                cardImage: coverImage,
                hasCardImage: !!coverImage,
                soldOut: Number(product.stock) === 0 || Number(processed.stock) === 0,
                retail_price: displayPrice,
                price: displayPrice,
                market_price: marketPrice > displayPrice ? marketPrice : 0,
                discount_label: discountLabel,
                heat_label: heatLabel
            };
        });
        setHomePageData(page, { featuredProducts: products });
        if (typeof page._setupScrollReveal === 'function') {
            wx.nextTick(() => page._setupScrollReveal());
        }
    } catch (err) {
        console.error('[Index] 加载精选商品失败:', err);
    }
}

async function loadPosters(page, options = {}) {
    const forceRefresh = !!options.forceRefresh;
    const mapBanners = (list) => (list || []).map((banner) => ({
        id: banner.id,
        image: pickImageSource(banner),
        title: banner.title || '',
        subtitle: banner.subtitle || '',
        link_type: banner.link_type || 'none',
        link_value: banner.link_value || ''
    }));
    try {
        const layoutBanners = page.homeResources ? page.homeResources.banners || null : null;
        if (layoutBanners) {
            setHomePageData(page, {
                midPosters: mapBanners(layoutBanners.home_mid || []),
                bottomPosters: mapBanners(layoutBanners.home_bottom || [])
            });
            if (typeof page._setupScrollReveal === 'function') {
                wx.nextTick(() => page._setupScrollReveal());
            }
            return;
        }

        const [midRes, bottomRes] = await Promise.all([
            cachedGet(get, '/banners', { position: 'home_mid' }, {
                useCache: !forceRefresh,
                cacheTTL: 5 * 60 * 1000,
                showError: false,
                maxRetries: 0,
                timeout: 10000
            }).catch(() => ({ data: [] })),
            cachedGet(get, '/banners', { position: 'home_bottom' }, {
                useCache: !forceRefresh,
                cacheTTL: 5 * 60 * 1000,
                showError: false,
                maxRetries: 0,
                timeout: 10000
            }).catch(() => ({ data: [] }))
        ]);
        const midList = midRes?.data?.list ?? midRes?.list ?? midRes?.data ?? [];
        const bottomList = bottomRes?.data?.list ?? bottomRes?.list ?? bottomRes?.data ?? [];
        setHomePageData(page, {
            midPosters: mapBanners(Array.isArray(midList) ? midList : []),
            bottomPosters: mapBanners(Array.isArray(bottomList) ? bottomList : [])
        });
        if (typeof page._setupScrollReveal === 'function') {
            wx.nextTick(() => page._setupScrollReveal());
        }
    } catch (e) {
        console.log('[Index] 海报加载失败，不影响主页渲染');
    }
}

async function loadBubbles(page) {
    try {
        const res = await cachedGet(get, '/activity/bubbles', { limit: 10 }, {
            cacheTTL: 60 * 1000,
            showError: false,
            maxRetries: 0,
            timeout: 10000
        });
        const list = Array.isArray(res && res.list)
            ? res.list
            : (Array.isArray(res && res.data && res.data.list) ? res.data.list : []);
        if (!Array.isArray(list) || list.length === 0) return;
        const bubbles = list.map((bubble) => {
            if (bubble.text) return bubble.text;
            const action = { order: '购买了', group_buy: '拼团了', slash: '砍价了', lottery: '抽中了' }[bubble.type] || '购买了';
            return `${pickDisplayName(bubble)} ${action} ${bubble.product_name}`;
        });
        setHomePageData(page, { bubbles, currentBubble: bubbles[0] });
        page._bubbleIdx = 0;
        page._startBubbleRotation();
    } catch (err) { console.warn('[Index] bubbles load failed:', err); }
}

function applyHomeConfig(page, data) {
    if (!data) {
        // 即使没有任何配置数据，也要关闭全屏 loading，避免遮罩卡死导致首页空白
        setHomePageData(page, { loading: false });
        if (typeof page._setupScrollReveal === 'function') {
            wx.nextTick(() => page._setupScrollReveal());
        }
        return;
    }
    app.globalData.homePageData = data;
    const brandConfig = getConfigSection('brand_config');
    page.homeResources = data.resources || page.homeResources || null;

    const bannerGroup = data.banners || data.resources?.banners || {};
    const bannerList = Array.isArray(bannerGroup)
        ? bannerGroup
        : (Array.isArray(bannerGroup.home) ? bannerGroup.home : []);
    const defaultBrandBanners = [
        {
            id: '__default_1',
            image: '',
            title: '品牌甄选',
            subtitle: '发现值得信赖的好物',
            link_type: 'none',
            link_value: ''
        }
    ];
    const heroBanners = bannerList.length > 0
        ? bannerList.map((banner) => ({
            id: banner.id,
            image: pickImageSource(banner),
            title: banner.title || '',
            subtitle: banner.subtitle || '',
            link_type: banner.link_type || 'none',
            link_value: banner.link_value || ''
        }))
        : defaultBrandBanners;

    const configs = data.configs || data.resources?.configs || {};
    const showBrandLogo = configs.show_brand_logo !== 'false' && configs.show_brand_logo !== false;
    const brandZone = buildBrandZone(configs);
    setHomePageData(page, {
        homeConfigs: configs,
        showBrandLogo,
        brandLogo: configs.brand_logo || '',
        navBrandTitle: configs.nav_brand_title || brandConfig.nav_brand_title || '问兰镜像',
        navBrandSub: configs.nav_brand_sub || brandConfig.nav_brand_sub || '品牌甄选',
        couponZoneTitle: configs.coupon_zone_title || brandConfig.coupon_zone_title || '优惠券中心',
        couponZoneSubtitle: configs.coupon_zone_subtitle || brandConfig.coupon_zone_subtitle || '领券后下单可用',
        brandZoneCoverKicker: configs.official_promo_badge || '品牌甄选',
        brandZoneCoverTitle: configs.official_promo_title || brandZone.title || '问兰镜像',
        brandZone,
        latestActivity: page._normalizeLatestActivity(data.latestActivity || data.resources?.latest_activity || {}),
        heroBanners,
        loading: false
    });

    if (typeof page._setupScrollReveal === 'function') {
        wx.nextTick(() => page._setupScrollReveal());
    }

    const popupAd = data.popupAd || data.resources?.popup_ad || {};
    if (popupAd.enabled && (popupAd.file_id || popupAd.image_url || popupAd.url)) {
        page._checkAndShowPopupAd({
            ...popupAd,
            file_id: popupAd.file_id || '',
            image_url: pickImageSource(popupAd), // deprecated: use file_id instead
            url: pickImageSource(popupAd),
            displayImage: pickImageSource(popupAd),
            hasImage: !!pickImageSource(popupAd)
        });
    }
}

async function loadCoupons(page) {
    if (!app.globalData.isLoggedIn) {
        setHomePageData(page, { homeCoupons: [] });
        return;
    }
    try {
        const res = await get('/coupons/mine', { status: 'unused' }, { showError: false });
        if (res.code === 0) {
            const source = Array.isArray(res && res.list)
                ? res.list
                : (Array.isArray(res && res.data && res.data.list) ? res.data.list : []);
            const coupons = source.map((c) => {
                let discount_text = '';
                if (c.coupon_type === 'percent') {
                    const raw = parseFloat((toCouponNumber(c.coupon_value) * 10).toFixed(1));
                    discount_text = (raw % 1 === 0 ? raw.toFixed(0) : raw.toFixed(1)) + '折';
                }
                const minLabel = toCouponNumber(c.min_purchase) > 0 ? `满${c.min_purchase}元可用` : '无门槛';
                const valueText = c.coupon_type === 'percent'
                    ? discount_text
                    : `¥${toCouponNumber(c.coupon_value).toFixed(toCouponNumber(c.coupon_value) % 1 === 0 ? 0 : 1)}`;
                const expireFormatted = formatCouponExpire(c.expire_at || c.expires_at || c.end_at || c.valid_until);
                return {
                    ...c,
                    discount_text,
                    value_text: valueText,
                    min_label: minLabel,
                    // 右栏展示：券名 + 有效期。WXML 使用 item.name / item.sub_label，
                    // 后端字段可能是 coupon_name，需在此显式映射，否则右半边会空白。
                    name: c.coupon_name || c.name || '优惠券',
                    sub_label: expireFormatted ? `${expireFormatted} 到期` : '',
                    expire_at_formatted: expireFormatted
                };
            });
            // 只展示前 3 张
            setHomePageData(page, { homeCoupons: coupons.slice(0, 3), unusedCouponCount: coupons.length });
        }
    } catch (_) {
        // 静默失败
    }
}

function toCouponNumber(value) {
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
}

function formatCouponExpire(dateStr) {
    if (!dateStr) return '';
    try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${m}.${day}`;
    } catch (_) {
        return dateStr;
    }
}

module.exports = {
    loadData,
    loadFeaturedProducts,
    loadPosters,
    loadBubbles,
    loadCoupons,
    applyHomeConfig,
    normalizeAssetUrl,
    createEmptyBrandZone
};
