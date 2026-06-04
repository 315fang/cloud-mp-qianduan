/**
 * 微信开发者工具「代码质量」只按主包依赖图判断主包内 JS 是否被使用。
 * 这些工具是分包页面复用的主包共享入口，不能复制到页面私有 utils 目录。
 * 在 App 启动后显式 require 一次，让主包依赖扫描识别它们是有意保留的共享模块。
 */
function markSharedUtilitiesUsed() {
    require('./activityHelpers');
    require('./orderConsumerFields');
    require('./paymentErrorMessage');
    require('./pickupEntryGate');
    require('./returnAddressFormat');
}

module.exports = {
    markSharedUtilitiesUsed
};
