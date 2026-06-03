function toNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
}

function toPositiveInteger(value, fallback = 0) {
    const number = Math.floor(toNumber(value, fallback));
    return number > 0 ? number : 0;
}

function pickText(value, fallback = '') {
    if (value === null || value === undefined) return fallback;
    const text = String(value).trim();
    return text || fallback;
}

function boolFlag(value, fallback = false) {
    if (value === null || value === undefined || value === '') return fallback;
    if (value === true || value === 1) return true;
    if (value === false || value === 0) return false;
    const text = String(value).trim().toLowerCase();
    if (['1', 'true', 'yes', 'on', 'enabled'].includes(text)) return true;
    if (['0', 'false', 'no', 'off', 'disabled'].includes(text)) return false;
    return fallback;
}

function resolvePurchaseLimitView(source = {}) {
    const limit = source.purchase_limit && typeof source.purchase_limit === 'object'
        ? source.purchase_limit
        : {};
    const quantity = toPositiveInteger(
        limit.quantity
        ?? source.purchase_limit_quantity
        ?? source.purchase_limit_per_user
        ?? source.limit_per_user,
        0
    );
    const enabled = quantity > 0 && boolFlag(
        limit.enabled
        ?? source.purchase_limit_enabled,
        quantity > 0
    );
    const scope = pickText(limit.scope || source.purchase_limit_scope, 'per_user_lifetime') === 'per_order'
        ? 'per_order'
        : 'per_user_lifetime';
    const text = pickText(
        limit.text || source.purchase_limit_text,
        enabled ? (scope === 'per_order' ? `每单限购${quantity}件` : `每人限购${quantity}件`) : ''
    );
    const hasRemaining = limit.remaining_quantity !== undefined
        || source.purchase_limit_remaining !== undefined;
    const remaining = hasRemaining
        ? Math.max(0, toPositiveInteger(limit.remaining_quantity ?? source.purchase_limit_remaining, quantity))
        : quantity;
    const exhausted = enabled && (
        boolFlag(limit.exhausted ?? source.purchase_limit_exhausted, false)
        || remaining <= 0
    );
    return {
        enabled,
        quantity: enabled ? quantity : 0,
        scope,
        text,
        remaining,
        remainingText: enabled ? (remaining > 0 ? `还可购买${remaining}件` : '已达限购') : '',
        exhausted
    };
}

function capQuantityByPurchaseLimit(quantity, purchaseLimit) {
    const requested = Math.max(1, toPositiveInteger(quantity, 1));
    if (!purchaseLimit || !purchaseLimit.enabled) return requested;
    if (purchaseLimit.exhausted) return 1;
    return Math.max(1, Math.min(requested, purchaseLimit.remaining || purchaseLimit.quantity || requested));
}

function resolveQuantityCap(stock, purchaseLimit) {
    const stockCap = toNumber(stock, 0);
    const hasStockCap = stockCap > 0;
    const limitCap = purchaseLimit && purchaseLimit.enabled && !purchaseLimit.exhausted
        ? toPositiveInteger(purchaseLimit.remaining || purchaseLimit.quantity, 0)
        : 0;
    if (purchaseLimit && purchaseLimit.enabled && purchaseLimit.exhausted) return 0;
    if (hasStockCap && limitCap > 0) return Math.min(stockCap, limitCap);
    if (hasStockCap) return stockCap;
    return limitCap;
}

function purchaseLimitToastText(purchaseLimit) {
    if (!purchaseLimit || !purchaseLimit.enabled) return '';
    if (purchaseLimit.exhausted) return '已达限购';
    return purchaseLimit.remaining > 0
        ? `最多还可购买${purchaseLimit.remaining}件`
        : '已达限购';
}

module.exports = {
    resolvePurchaseLimitView,
    capQuantityByPurchaseLimit,
    resolveQuantityCap,
    purchaseLimitToastText
};
