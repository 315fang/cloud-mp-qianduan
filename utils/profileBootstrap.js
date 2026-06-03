// miniprogram/utils/profileBootstrap.js
// 首次登录强制完善昵称+头像的统一守卫。
// 触发条件：用户已登录，但 nickname 仍是默认值或 avatar 为空。
// 命中后通过 wx.reLaunch 锁定到 edit-profile?bootstrap=1，
// 这样无论从哪条登录路径进入，都不会绕过完善流程。

const { isDefaultUserProfile } = require('./userProfile');

const BOOTSTRAP_URL = '/pages/user/edit-profile?bootstrap=1';
const BOOTSTRAP_ROUTE = 'pages/user/edit-profile';

function getCurrentRoute() {
    try {
        const pages = getCurrentPages();
        if (!pages || !pages.length) return '';
        return pages[pages.length - 1].route || '';
    } catch (_) {
        return '';
    }
}

function isOnBootstrapPage() {
    return getCurrentRoute() === BOOTSTRAP_ROUTE;
}

function reLaunchToBootstrap() {
    if (isOnBootstrapPage()) return false;
    try {
        wx.reLaunch({ url: BOOTSTRAP_URL });
        return true;
    } catch (err) {
        console.warn('[profileBootstrap] reLaunch failed:', err);
        return false;
    }
}

function enforceProfileBootstrap(userInfo) {
    if (!userInfo) return false;
    if (!isDefaultUserProfile(userInfo)) return false;
    return reLaunchToBootstrap();
}

function enforceProfileBootstrapDeferred(userInfo) {
    if (!userInfo) return;
    if (!isDefaultUserProfile(userInfo)) return;
    setTimeout(() => {
        enforceProfileBootstrap(userInfo);
    }, 0);
}

module.exports = {
    BOOTSTRAP_URL,
    enforceProfileBootstrap,
    enforceProfileBootstrapDeferred,
    isOnBootstrapPage
};
