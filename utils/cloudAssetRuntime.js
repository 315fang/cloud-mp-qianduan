const { normalizeAssetUrl, parseImages, isTemporarySignedAssetUrl, cloudFileIdToPublicUrl } = require('./dataFormatter');

// 存储桶已设为公开读：cloud:// 由 cloudFileIdToPublicUrl 纯字符串映射为永久 HTTPS 链接，
// 零成本、永不过期。因此原先用于缓存临时链接（约 2 小时过期）的机制
// （TEMP_URL_CACHE_TTL / tempUrlCache / getCachedTempUrl / setCachedTempUrl）已全部移除。

function isCloudFileId(value) {
    return /^cloud:\/\//i.test(String(value || '').trim());
}

function toAssetList(value) {
    if (Array.isArray(value)) {
        return value
            .map((item) => pickPreferredAssetRef(item))
            .filter(Boolean);
    }
    if (value && typeof value === 'object') {
        const picked = pickPreferredAssetRef(value);
        return picked ? [picked] : [];
    }
    return parseImages(value);
}

function expandAssetCandidates(value) {
    if (value == null || value === '') return [];
    if (Array.isArray(value)) {
        return value.flatMap((item) => expandAssetCandidates(item));
    }
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) return [];
        if (trimmed[0] === '[') {
            try {
                const parsed = JSON.parse(trimmed);
                return expandAssetCandidates(parsed);
            } catch (_) {
                return [trimmed];
            }
        }
        return [trimmed];
    }
    return [value];
}

function toRenderableImageList(value) {
    return toAssetList(value).filter((item) => item && !isCloudFileId(item));
}

function normalizeHttpCandidate(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    if (/^https?:\/\//i.test(raw)) return normalizeAssetUrl(raw);
    if (raw.startsWith('//')) return `https:${raw}`;
    return '';
}

function pickDirectAssetUrl(record = {}) {
    if (!record) return '';

    if (Array.isArray(record)) {
        for (let i = 0; i < record.length; i += 1) {
            const matched = pickDirectAssetUrl(record[i]);
            if (matched) return matched;
        }
        return '';
    }

    if (typeof record === 'string') {
        const httpCandidate = normalizeHttpCandidate(record);
        if (httpCandidate) return httpCandidate;
        const normalized = normalizeAssetUrl(record);
        return normalized && !isCloudFileId(normalized) ? normalized : '';
    }

    if (typeof record !== 'object') {
        return '';
    }

    const directCandidates = [
        record.display_image,
        record.displayImage,
        record.image_url,
        record.imageUrl,
        record.url,
        record.temp_url,
        record.product_image,
        record.productImage,
        record.image,
        record.snapshot_image,
        record.snapshotImage,
        record.cover_image,
        record.coverImage,
        record.cover,
        record.cover_url,
        record.coverUrl,
        record.image_ref,
        record.imageRef,
        record.thumb,
        record.thumbnail,
        record.images,
        record.image_candidates,
        record.imageCandidates,
        record.preview_images,
        record.previewImages,
        record.detail_images,
        record.preview_detail_images,
        record.previewDetailImages
    ].flatMap((item) => expandAssetCandidates(item));

    for (let i = 0; i < directCandidates.length; i += 1) {
        const httpCandidate = normalizeHttpCandidate(directCandidates[i]);
        if (httpCandidate) return httpCandidate;
    }

    for (let i = 0; i < directCandidates.length; i += 1) {
        const normalized = normalizeAssetUrl(directCandidates[i]);
        if (normalized && !isCloudFileId(normalized)) return normalized;
    }

    return '';
}

function pickPreferredAssetRef(record = {}) {
    if (!record) return '';
    if (typeof record === 'string') return normalizeAssetUrl(record);
    if (typeof record !== 'object') return normalizeAssetUrl(record);

    const fileId = normalizeAssetUrl(record.image_ref || record.imageRef || record.file_id || record.fileId || '');
    if (fileId) return fileId;

    const candidates = [
        record.display_image,
        record.displayImage,
        record.image_url,
        record.imageUrl,
        record.url,
        record.temp_url,
        record.product_image,
        record.productImage,
        record.image,
        record.snapshot_image,
        record.snapshotImage,
        record.cover_image,
        record.coverImage,
        record.cover,
        record.cover_url,
        record.coverUrl,
        record.thumb,
        record.thumbnail,
        record.images,
        record.image_candidates,
        record.imageCandidates,
        record.preview_images,
        record.previewImages,
        record.detail_images,
        record.preview_detail_images,
        record.previewDetailImages
    ].flatMap((item) => expandAssetCandidates(item));

    for (const candidate of candidates) {
        const normalized = normalizeAssetUrl(candidate);
        if (normalized) return normalized;
    }

    return '';
}

function pickRenderableAssetRef(record = {}) {
    const directUrl = pickDirectAssetUrl(record);
    if (directUrl) return directUrl;
    return pickPreferredAssetRef(record);
}

// 公开读后无需预取临时链接；保留这两个导出以兼容大量页面调用点（await warm...），现为 no-op。
async function warmCloudTempUrls() { /* no-op：cloud:// 直接映射为永久链接，无需预取 */ }
async function warmRenderableImageUrls() { /* no-op：同上 */ }

async function resolveCloudImageUrl(value, fallback = '') {
    try {
        const preferred = Array.isArray(value) ? (toAssetList(value)[0] || '') : pickPreferredAssetRef(value);
        const directUrl = pickDirectAssetUrl(value);
        const safeFallback = directUrl || toRenderableImageList(fallback)[0] || pickDirectAssetUrl(fallback) || '';
        if (!preferred) return safeFallback;
        if (!isCloudFileId(preferred)) return preferred;
        return cloudFileIdToPublicUrl(preferred) || safeFallback;
    } catch (err) {
        console.warn('[cloudAssetRuntime] resolveCloudImageUrl error:', err);
        return pickDirectAssetUrl(fallback) || '';
    }
}

async function resolveRenderableImageUrl(value, fallback = '') {
    try {
        const renderable = Array.isArray(value) ? (toAssetList(value)[0] || '') : pickRenderableAssetRef(value);
        const safeFallback = toRenderableImageList(fallback)[0] || pickDirectAssetUrl(fallback) || '';
        if (!renderable) return safeFallback;
        if (!isCloudFileId(renderable)) return renderable;
        return cloudFileIdToPublicUrl(renderable) || safeFallback;
    } catch (err) {
        console.warn('[cloudAssetRuntime] resolveRenderableImageUrl error:', err);
        return pickDirectAssetUrl(fallback) || '';
    }
}

async function resolveRenderableImageList(value, fallbackList = []) {
    const candidates = expandAssetCandidates(value)
        .map((item) => pickRenderableAssetRef(item))
        .filter(Boolean);
    const seen = new Set();
    const normalizedList = candidates.filter((item) => {
        if (!item || seen.has(item)) return false;
        seen.add(item);
        return true;
    });
    const safeFallbackList = expandAssetCandidates(fallbackList)
        .map((item) => pickDirectAssetUrl(item) || normalizeAssetUrl(item))
        .filter(Boolean);
    if (!normalizedList.length) return safeFallbackList;

    const resolved = normalizedList
        .map((item) => (isCloudFileId(item) ? cloudFileIdToPublicUrl(item) : item))
        .filter(Boolean);

    return resolved.length ? resolved : safeFallbackList;
}

async function resolveCloudImageList(value, fallbackList = []) {
    const normalizedList = toAssetList(value);
    const safeFallbackList = toRenderableImageList(fallbackList);
    if (!normalizedList.length) return safeFallbackList;

    const resolved = normalizedList
        .map((item) => (isCloudFileId(item) ? cloudFileIdToPublicUrl(item) : item))
        .filter(Boolean);

    return resolved.length ? resolved : safeFallbackList;
}

module.exports = {
    isCloudFileId,
    isTemporarySignedAssetUrl,
    pickDirectAssetUrl,
    pickPreferredAssetRef,
    warmCloudTempUrls,
    warmRenderableImageUrls,
    resolveCloudImageUrl,
    resolveRenderableImageUrl,
    resolveRenderableImageList,
    resolveCloudImageList
};
