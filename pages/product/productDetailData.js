const { get } = require('../../utils/request');
const {
    parseImages,
    normalizeProductId,
    resolveProductImage,
    resolveProductDisplayPrice,
    resolveProductCurrentPrice,
    resolveProductInitialSku,
    getSkuSpecEntries,
    buildSkuValueText,
    buildProductSpecSummary,
    resolveProductDefaultSpecText
} = require('../../utils/dataFormatter');
const { ErrorHandler } = require('../../utils/errorHandler');
const { USER_ROLES } = require('../../config/constants');
const LocalUserContent = require('../../utils/localUserContent');
const { getConfigSection } = require('../../utils/miniProgramConfig');
const {
    pickPreferredAssetRef,
    resolveRenderableImageList
} = require('../../utils/cloudAssetRuntime');
const {
    resolvePurchaseLimitView,
    capQuantityByPurchaseLimit
} = require('../../utils/purchaseLimit');
const app = getApp();

const PRODUCT_PLACEHOLDER = '/assets/images/placeholder.svg';
const PLEDGE_ICONS = {
    seven_day: '/assets/icons/refresh-cw.svg',
    return_shipping: '/assets/icons/truck.svg',
    brand_guarantee: '/assets/icons/shield.svg',
    authentic: '/assets/icons/shield.svg',
    shipping_promise: '/assets/icons/truck.svg',
    after_sale: '/assets/icons/refresh-cw.svg'
};
const PLEDGE_TAG_CLASSES = ['tag-blue', 'tag-green', 'tag-orange'];
const PLEDGE_ORDER = ['seven_day', 'return_shipping', 'brand_guarantee', 'authentic', 'shipping_promise', 'after_sale'];
const PLEDGE_LABELS = {
    seven_day: '7天无理由退货',
    return_shipping: '退货运费说明',
    brand_guarantee: '品牌保证',
    authentic: '官方正品',
    shipping_promise: '发货时效',
    after_sale: '售后无忧'
};

function pickText(...values) {
    for (const value of values) {
        if (value === null || value === undefined) continue;
        const text = String(value).trim();
        if (text) return text;
    }
    return '';
}

function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

function normalizeLegacyServicePledges(product = {}) {
    const rawPledges = Array.isArray(product.service_pledges) ? product.service_pledges : [];
    return rawPledges
        .map((pledge, index) => {
            const id = pickText(pledge && pledge.id, pledge && pledge.key);
            const title = pickText(pledge && pledge.title, PLEDGE_LABELS[id], id);
            if (!id || !title) return null;
            return {
                ...pledge,
                id,
                title,
                desc: pickText(pledge && pledge.desc, pledge && pledge.description, pledge && pledge.copy),
                icon: PLEDGE_ICONS[id] || '/assets/icons/shield.svg',
                tagClass: pickText(pledge && pledge.tagClass, PLEDGE_TAG_CLASSES[index % PLEDGE_TAG_CLASSES.length])
            };
        })
        .filter(Boolean);
}

function buildConfiguredServicePledges(product = {}) {
    const configured = getConfigSection('product_detail_pledges');
    const items = configured && isPlainObject(configured.items) ? configured.items : {};
    const configuredKeys = Object.keys(items);
    if (!configuredKeys.length) {
        return normalizeLegacyServicePledges(product);
    }

    const legacyLookup = new Map(
        normalizeLegacyServicePledges(product).map((item) => [item.id, item])
    );
    const keys = [...new Set([...PLEDGE_ORDER, ...configuredKeys])];
    return keys.map((id, index) => {
        const configItem = isPlainObject(items[id]) ? items[id] : {};
        const legacyItem = legacyLookup.get(id) || {};
        if (configItem.enabled === false) return null;
        const title = pickText(configItem.title, legacyItem.title, PLEDGE_LABELS[id], id);
        if (!title) return null;
        return {
            ...legacyItem,
            id,
            title,
            desc: pickText(configItem.desc, legacyItem.desc),
            icon: PLEDGE_ICONS[id] || legacyItem.icon || '/assets/icons/shield.svg',
            tagClass: pickText(legacyItem.tagClass, PLEDGE_TAG_CLASSES[index % PLEDGE_TAG_CLASSES.length])
        };
    }).filter(Boolean);
}

function parseApiDisplayPrice(v) {
    if (v === null || v === undefined || v === '') return null;
    const x = typeof v === 'number' ? v : parseFloat(String(v).trim());
    return Number.isFinite(x) && x >= 0 ? x : null;
}

function parseApiCentPrice(v) {
    const x = parseApiDisplayPrice(v);
    if (x == null) return null;
    return x / 100;
}

function sanitizeImageList(value, fallback) {
    const images = parseImages(value).filter((item) => !!item);
    if (images.length) return images;
    return fallback ? [fallback] : [];
}

function expandDetailImageSources(value) {
    if (!value) return [];
    if (Array.isArray(value)) {
        return value.flatMap((item) => expandDetailImageSources(item));
    }
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) return [];
        if (trimmed[0] === '[') {
            try {
                return expandDetailImageSources(JSON.parse(trimmed));
            } catch (_) {
                return [trimmed];
            }
        }
        return [trimmed];
    }
    if (typeof value === 'object') {
        const picked = pickPreferredAssetRef(value);
        return picked ? [picked] : [];
    }
    return [];
}

function collectAssetSources(...values) {
    const seen = new Set();
    return values.flatMap((value) => expandDetailImageSources(value)).filter((item) => {
        const key = String(item || '').trim();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function collectSkuImageSources(skus = []) {
    return (Array.isArray(skus) ? skus : []).flatMap((sku) => {
        if (!sku || typeof sku !== 'object') return [];
        return [
            sku.images,
            sku.preview_images,
            sku.previewImages,
            sku.image_ref,
            sku.imageRef,
            sku.file_id,
            sku.fileId,
            sku.image,
            sku.image_url,
            sku.imageUrl,
            sku.cover_image,
            sku.coverImage
        ];
    });
}

function collectProductGallerySources(product = {}) {
    if (!product || typeof product !== 'object') return [];
    const primaryImages = collectAssetSources(product.images);
    if (primaryImages.length) return primaryImages;
    return collectAssetSources(
        product.image_candidates,
        product.imageCandidates,
        product.image_ref,
        product.imageRef,
        product.file_id,
        product.fileId,
        product.cover_image,
        product.coverImage,
        product.image,
        product.preview_images,
        product.previewImages,
        product.display_image,
        product.displayImage,
        product.image_url,
        product.imageUrl,
        collectSkuImageSources(product.skus)
    );
}

function collectProductDetailImageSources(product = {}) {
    if (!product || typeof product !== 'object') return [];
    const primaryImages = collectAssetSources(product.detail_images);
    if (primaryImages.length) return primaryImages;
    return collectAssetSources(
        product.detailImages,
        product.preview_detail_images,
        product.previewDetailImages,
        product.description_images,
        product.descriptionImages,
        product.detail_image,
        product.detailImage
    );
}

function resolveDetailImageList(sources = []) {
    return resolveRenderableImageList(sources, []);
}

// 构建 SKU 规格文本（只显示规格值，例如 "120ml" / "120ml / 礼盒"）
function buildSkuText(sku) {
    return buildSkuValueText(sku, '默认规格');
}

function isGenericSpecName(name) {
    const text = String(name || '').trim().toLowerCase();
    return !text || text === '规格' || text === '默认规格' || text === 'spec' || text === 'sku';
}

function resolvePayableUnitPrice(product, sku, roleLevel) {
    const resolved = resolveProductCurrentPrice(product, sku, roleLevel);
    if (Number.isFinite(Number(resolved)) && Number(resolved) >= 0) {
        return Number(resolved);
    }
    if (parseApiDisplayPrice(product.displayPrice) != null) {
        return parseApiDisplayPrice(product.displayPrice);
    }
    return 0;
}

function resolveInitialSku(product, skus, roleLevel) {
    return resolveProductInitialSku(product, skus, roleLevel);
}

function hasAvailableSkuStock(sku) {
    return Number(sku && sku.stock || 0) > 0;
}

function resolveInitialPurchasableSku(product, skus, roleLevel) {
    const preferredSku = resolveInitialSku(product, skus, roleLevel);
    if (!preferredSku || hasAvailableSkuStock(preferredSku)) {
        return preferredSku;
    }

    return resolveInitialSku({
        ...product,
        default_sku_id: null
    }, skus, roleLevel) || preferredSku;
}

async function loadProduct(page, id) {
    wx.showLoading({ title: '加载中...' });

    try {
        const res = await get(`/products/${id}`);
        const product = res.data || {};
        const gallerySources = collectProductGallerySources(product);
        product.gallery_image_sources = gallerySources;

        product.images = await resolveRenderableImageList(
            gallerySources.length ? gallerySources : resolveProductImage(product, PRODUCT_PLACEHOLDER),
            PRODUCT_PLACEHOLDER
        );
        if (!product.images.length) {
            product.images = await resolveRenderableImageList(
                sanitizeImageList(resolveProductImage(product, PRODUCT_PLACEHOLDER), PRODUCT_PLACEHOLDER),
                PRODUCT_PLACEHOLDER
            );
        }
        product.detail_image_sources = collectProductDetailImageSources(product);

        let specs = [];
        if (product.skus && product.skus.length > 0) {
            const specMap = {};
            product.skus.forEach((sku) => {
                getSkuSpecEntries(sku).forEach((s) => {
                    if (s.name && s.value) {
                        if (!specMap[s.name]) {
                            specMap[s.name] = new Set();
                        }
                        specMap[s.name].add(s.value);
                    }
                });
            });

            const specNames = Object.keys(specMap);
            specs = specNames.map((name) => ({
                name,
                showTitle: specNames.length > 1 || !isGenericSpecName(name),
                values: Array.from(specMap[name])
            }));
        }
        product.specs = specs;

        const specSummary = resolveProductDefaultSpecText(product, product.skus || [])
            || buildProductSpecSummary(product.skus || []);
        product.specSummary = specSummary;

        const roleLevel = app.globalData.userInfo && app.globalData.userInfo.role_level || USER_ROLES.GUEST;
        const displayPrice = resolveProductDisplayPrice(product, roleLevel);

        let discount = 10;
        if (product.market_price && parseFloat(product.market_price) > 0) {
            discount = Math.round((Number(displayPrice) / parseFloat(product.market_price)) * 10);
        }

        const firstSku = resolveInitialPurchasableSku(product, product.skus, roleLevel);
        const selectedSpecs = {};
        if (firstSku) {
            getSkuSpecEntries(firstSku).forEach((s) => {
                if (s.name && s.value) {
                    selectedSpecs[s.name] = s.value;
                }
            });
            // 向后兼容
            if (Object.keys(selectedSpecs).length === 0 && firstSku.spec_name) {
                selectedSpecs[firstSku.spec_name] = firstSku.spec_value;
            }
        }

        const currentPrice = Number(resolvePayableUnitPrice(product, firstSku, roleLevel)).toFixed(2);
        const currentStock = firstSku ? (firstSku.stock || 0) : (product.stock || 0);
        const isOutOfStock = currentStock <= 0;
        const purchaseLimit = resolvePurchaseLimitView(product);
        const initialQuantity = purchaseLimit.enabled
            ? capQuantityByPurchaseLimit(1, purchaseLimit)
            : 1;

        const pid = normalizeProductId(product.id);
        const servicePledges = buildConfiguredServicePledges(product);

        page.setData({
            product: {
                ...product,
                displayPrice: Number(displayPrice).toFixed(2)
            },
            skus: product.skus || [],
            selectedSku: firstSku,
            selectedSpecs,
            selectedSkuText: firstSku ? buildSkuText(firstSku) : '默认规格',
            imageCount: product.images.length || 0,
            roleLevel,
            isAgent: roleLevel >= USER_ROLES.LEADER,
            discount,
            currentPrice,
            currentStock,
            isOutOfStock,
            quantity: initialQuantity,
            purchaseLimit,
            purchaseLimitText: purchaseLimit.text,
            purchaseLimitRemainingText: purchaseLimit.remainingText,
            purchaseLimitExhausted: purchaseLimit.exhausted,
            detailImageSourceList: product.detail_image_sources || [],
            detailImageList: [],
            detailImagesLoaded: !(product.detail_image_sources || []).length,
            detailImagesLoading: false,
            hasRichDetail: !!product.detail_html,
            servicePledges,
            pageLoading: false
        });

        LocalUserContent.recordFootprint({
            id: pid,
            name: product.name,
            image: product.images && product.images[0] || '',
            image_ref: product.cover_image || product.file_id || product.image || product.image_url || '',
            price: Number(displayPrice).toFixed(2)
        });

        page.refreshFavoriteState();
        page.loadReviews();
        if (typeof page.loadActivityState === 'function') {
            page.loadActivityState(product.id);
        }
    } catch (err) {
        ErrorHandler.handle(err, { customMessage: '商品加载失败' });
        console.error('加载商品详情失败:', err);
        page.setData({ pageLoading: false });
    } finally {
        wx.hideLoading();
    }
}

module.exports = {
    loadProduct,
    resolveDetailImageList,
    resolvePayableUnitPrice,
    parseApiDisplayPrice,
    parseApiCentPrice,
    buildSkuText,
    collectProductGallerySources,
    collectProductDetailImageSources,
    PRODUCT_PLACEHOLDER,
    PLEDGE_ICONS
};
