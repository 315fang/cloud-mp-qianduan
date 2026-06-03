/**
 * 用户「能力」解析：以 dashboard-bootstrap 的 capabilities 为服务端口径，
 * pickupScopeLight 仅作字段载体与旧缓存兼容。
 */

function resolveCapabilitiesFromBootstrapPayload(payload = {}) {
    const caps = payload.capabilities;
    const ps = payload.pickupScopeLight || {};
    const hasCaps = caps && typeof caps === 'object';

    const storeWorkbench = hasCaps && caps.store_workbench !== undefined
        ? !!caps.store_workbench
        : !!ps.isStoreManager;

    const pickupVerifyAtStation = hasCaps && caps.pickup_verify_at_station !== undefined
        ? !!caps.pickup_verify_at_station
        : !!ps.hasVerifyAccess;

    return {
        storeWorkbench,
        pickupVerifyAtStation,
        stationName: ps.stationName || '',
        stationCount: Number(ps.stationCount || 0)
    };
}

/** 与团队中心原有多门店文案一致：首店名 + 「等N个门店」 */
function formatPickupStationDisplay(pickupScopeLight = {}) {
    const count = Number(pickupScopeLight.stationCount || 0);
    const first = String(pickupScopeLight.stationName || '').trim();
    if (count > 1 && first) return `${first}等${count}个门店`;
    return first;
}

module.exports = {
    resolveCapabilitiesFromBootstrapPayload,
    formatPickupStationDisplay
};
