/**
 * config/env.js — 云开发版（精简）
 *
 * 原版用于切换 API BaseUrl，云开发无需 HTTP BaseUrl。
 * 保留所有导出签名，避免调用方 require 报错。
 */

const CLOUD_ENV_ID = 'cloud1-9gywyqe49638e46f';

// 环境判断：根据云环境ID或本地存储的调试标志
const IS_PRODUCTION = !CLOUD_ENV_ID.includes('test') && !CLOUD_ENV_ID.includes('dev');

function getApiBaseUrl() { return ''; }
function getCdnBaseUrl() { return 'https://cdn.jxalk.cn'; }

// 缓存生产环境调试开关，避免每次日志调用都同步读 storage（热路径优化）。
// 调试开关在启动时设定，运行期间变更可调用 refreshDebugFlag() 重新读取。
let _debugFlagCache = null;

function readDebugFlag() {
    try {
        return wx.getStorageSync('__debug_mode') === 'true';
    } catch (e) {
        return false;
    }
}

function refreshDebugFlag() {
    _debugFlagCache = readDebugFlag();
    return _debugFlagCache;
}

function isDebugEnabled() {
    // 非生产环境：始终启用
    if (!IS_PRODUCTION) return true;
    // 生产环境：首次读取后缓存，仅当本地存储明确开启调试模式时才启用
    if (_debugFlagCache === null) {
        _debugFlagCache = readDebugFlag();
    }
    return _debugFlagCache;
}

function isLogEnabled() {
    // 生产环境默认关闭日志，非生产环境默认开启
    return !IS_PRODUCTION || isDebugEnabled();
}

function isDevelopment() {
    return CLOUD_ENV_ID.includes('dev');
}

function isStaging() {
    return CLOUD_ENV_ID.includes('test') || CLOUD_ENV_ID.includes('staging');
}

function isProduction() {
    return IS_PRODUCTION;
}

function getImageQuality() { return 95; }
function getVersion() { return '3.0.0-cloud'; }

function log(...args) {
    if (isLogEnabled()) {
        console.log('[ENV]', ...args);
    }
}

function logError(...args) { console.error('[ENV]', ...args); }
function logWarn(...args) { console.warn('[ENV]', ...args); }

function getConfig() {
    return {
        apiBaseUrl: '',
        debug: isDebugEnabled(),
        enableLog: isLogEnabled(),
        cacheEnabled: true,
        imageQuality: 95,
        cdnBaseUrl: 'https://cdn.jxalk.cn',
        version: '3.0.0-cloud',
        cloudEnvId: CLOUD_ENV_ID,
        isProduction: IS_PRODUCTION
    };
}

const ENV_TYPES = { DEVELOPMENT: 'development', STAGING: 'staging', PRODUCTION: 'production' };
const CURRENT_ENV = isDevelopment() ? ENV_TYPES.DEVELOPMENT : (isStaging() ? ENV_TYPES.STAGING : ENV_TYPES.PRODUCTION);

module.exports = {
    ENV_TYPES, CURRENT_ENV, CLOUD_ENV_ID,
    getConfig, getApiBaseUrl, getCdnBaseUrl,
    isDebugEnabled, isLogEnabled, isDevelopment, isStaging, isProduction,
    refreshDebugFlag,
    getImageQuality, getVersion, log, logError, logWarn
};
