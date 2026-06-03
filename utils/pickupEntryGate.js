/**
 * 自提相关入口统一闸门：避免 show_pickup_entry 与店长 Lv6 在各页复制粘贴导致行为不一致。
 */
const app = getApp();
const { getFeatureFlags } = require('./miniProgramConfig');
const { USER_ROLES } = require('../config/constants');

async function refreshMiniProgramConfigIfPossible() {
    if (app && typeof app.fetchMiniProgramConfig === 'function') {
        await app.fetchMiniProgramConfig({ forceRefresh: true }).catch(() => null);
    }
}

/** 运营配置层面是否打开「自提/核销」能力（不等同于当前用户是否有核销权限）。 */
function isPickupFeatureGloballyOn() {
    return getFeatureFlags().show_pickup_entry !== false;
}

function resolveRoleLevelFromUser(user) {
    const u = user && typeof user === 'object' ? user : {};
    const n = Number(u.role_level || 0);
    return Number.isFinite(n) ? n : 0;
}

function userHasStoreWorkbenchFlag(user) {
    const u = user && typeof user === 'object' ? user : {};
    return !!(
        u.isStoreManager ||
        u.storeWorkbench ||
        u.store_workbench ||
        u.capabilities?.store_workbench ||
        u.pickupScopeLight?.isStoreManager
    );
}

/** 店长身份：等级到店长，或服务端/页面缓存已确认拥有门店店长工作台能力。 */
function hasStoreManagerIdentity(user = null) {
    const u = user || app.globalData.userInfo || {};
    return tierBypassesPickupFlag(resolveRoleLevelFromUser(u)) || userHasStoreWorkbenchFlag(u);
}

/** 店长分销等级（Lv6）：全局关闭自提入口时仍需能进入店长工作台及其链路页面（与设计口径一致）。 */
function tierBypassesPickupFlag(roleLevel) {
    const n = Number(roleLevel || 0);
    return Number.isFinite(n) && n >= USER_ROLES.STORE;
}

/** 当前登录用户是否允许使用依赖自提开关的流程页（核销列表、待核销订单等）。 */
function canUsePickupFlowPages(userOverride = null) {
    if (isPickupFeatureGloballyOn()) return true;
    const u = userOverride || app.globalData.userInfo || {};
    return tierBypassesPickupFlag(resolveRoleLevelFromUser(u));
}

async function fetchStoreWorkbenchCapability() {
    try {
        const { get } = require('./request');
        const { cachedGet } = require('./requestCache');
        const { resolveCapabilitiesFromBootstrapPayload } = require('./userCapabilities');
        const openid = app.globalData.openid || wx.getStorageSync('openid') || '';
        const response = await cachedGet(get, '/user/dashboard-bootstrap', { _openid_cache_key: openid }, {
            cacheTTL: 15 * 1000,
            showError: false,
            maxRetries: 0
        });
        // 返回三态：true=明确有能力 / false=明确无能力 / null=查询失败或无有效数据（不可据此拒绝）
        if (!response || !response.data) return null;
        return !!resolveCapabilitiesFromBootstrapPayload(response.data || {}).storeWorkbench;
    } catch (_) {
        return null;
    }
}

async function canUseStoreWorkbench(userOverride = null) {
    if (hasStoreManagerIdentity(userOverride)) return true;
    const capability = await fetchStoreWorkbenchCapability();
    if (capability === true) return true;
    if (capability === false) return false;
    // 能力查询失败（capability === null）：不因网络抖动把店长挡在门外，
    // 回退到本地等级判定（Lv6 店长即放行），与 hasStoreManagerIdentity 的等级口径一致。
    const u = userOverride || app.globalData.userInfo || {};
    return tierBypassesPickupFlag(resolveRoleLevelFromUser(u));
}

/**
 * 页面 onLoad/onShow 使用：配置关闭时对普通用户 Toast + 可选返回。
 * @param {{ navigateBackOnDeny?: boolean }} options navigateBackOnDeny 默认 true（与原 verify/orders 行为一致）
 */
async function ensurePickupEntryAvailable(options = {}) {
    const { navigateBackOnDeny = true } = options;
    await refreshMiniProgramConfigIfPossible();
    if (canUsePickupFlowPages()) return true;
    wx.showToast({ title: '自提功能暂未开放', icon: 'none' });
    if (navigateBackOnDeny) {
        setTimeout(() => wx.navigateBack({ fail: () => wx.switchTab({ url: '/pages/user/user' }) }), 100);
    }
    return false;
}

async function ensureStoreWorkbenchAvailable(options = {}) {
    const { navigateBackOnDeny = true } = options;
    await refreshMiniProgramConfigIfPossible();
    if (await canUseStoreWorkbench(options.user)) return true;
    wx.showToast({ title: '店长工作台暂未开放', icon: 'none' });
    if (navigateBackOnDeny) {
        setTimeout(() => wx.navigateBack({ fail: () => wx.switchTab({ url: '/pages/user/user' }) }), 100);
    }
    return false;
}

module.exports = {
    isPickupFeatureGloballyOn,
    tierBypassesPickupFlag,
    hasStoreManagerIdentity,
    canUsePickupFlowPages,
    canUseStoreWorkbench,
    ensurePickupEntryAvailable,
    ensureStoreWorkbenchAvailable,
    resolveRoleLevelFromUser
};
