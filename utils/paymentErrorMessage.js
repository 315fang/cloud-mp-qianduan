// miniprogram/utils/paymentErrorMessage.js
//
// 统一处理"支付链路抛上来的原始错误信息"在小程序端的展示：
//   - 含环境变量名 / 私钥 / 证书路径等运维语汇的 → 翻译成消费者能理解的提示
//   - 微信支付 V3 接口侧 4xx/5xx 中文 message → 原样保留，否则给一个友好的 fallback
//
// 历史背景（2026-05-08）：
//   线上多次出现 toast "无法加载微信支付私钥，请配置 PAYMENT_PRIVATE_KEY_FILE_ID"
//   这种把 ENV 名字直接给 C 端用户看的事故。Toast 是给用户看的，不是给运维的；
//   后端原始 message 仍然走 console，不丢失运维线索。

const SENSITIVE_PATTERNS = [
    /PAYMENT_/i,
    /WECHAT_PAY/i,
    /PRIVATE[_\s]?KEY/i,
    /PUBLIC[_\s]?KEY/i,
    /API_?V3/i,
    /SERIAL[_\s]?NO/i,
    /CERTIFICATE/i,
    /证书/,
    /私钥/,
    /公钥/,
    /API.?v3.?密钥/i,
    /downloadFile/,
    /storage file not exists/i,
    /-?\d{6}\b/   // 兜底：纯数字错误码（如 -503003）
];

const FRIENDLY_FALLBACK = '支付服务暂未就绪，请联系商家或稍后再试';

function isSensitive(text) {
    if (!text) return false;
    const str = String(text);
    return SENSITIVE_PATTERNS.some((re) => re.test(str));
}

/**
 * 把后端原始报错翻译成给消费者看的 toast 文案
 *
 * @param {string|Error|object} raw 后端返回的 message / 抛出的 Error
 * @param {string} [fallback] 用户友好的兜底文案
 * @returns {string}
 */
function humanizePaymentError(raw, fallback = FRIENDLY_FALLBACK) {
    let text = '';
    if (raw && typeof raw === 'object') {
        text = String(raw.message || raw.errMsg || '');
    } else if (raw != null) {
        text = String(raw);
    }
    text = text.trim();
    if (!text) return fallback;

    // 含敏感运维语汇 → 不能给 C 端看，原文写 console
    if (isSensitive(text)) {
        try { console.warn('[paymentErrorMessage] 隐藏敏感报错给用户:', text); } catch (_) {}
        return fallback;
    }

    // 过长（多半是堆栈/拼接 message）也不要原样 toast
    if (text.length > 60) {
        try { console.warn('[paymentErrorMessage] 报错过长截断:', text); } catch (_) {}
        return fallback;
    }

    return text;
}

module.exports = {
    humanizePaymentError,
    FRIENDLY_FALLBACK
};
