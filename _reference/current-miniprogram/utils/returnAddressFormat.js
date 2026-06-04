/**
 * 退货地址展示文案（与 logistics_config.return_address 八字段对齐）。
 * 单一入口：配置预览类页面使用；结构化退款对象仍以服务端 / normalizeRefundConsumer 为准。
 */
function formatReturnAddressForDisplay(addr = {}) {
    if (!addr || typeof addr !== 'object') {
        return { text: '', hasContent: false };
    }
    const name = String(addr.receiver_name || '').trim();
    const phone = String(addr.receiver_phone || '').trim();
    const line = [addr.province, addr.city, addr.district, addr.detail]
        .map((x) => String(x || '').trim())
        .filter(Boolean)
        .join('');
    const postal = String(addr.postal_code || '').trim();
    const note = String(addr.note || '').trim();
    if (!name && !phone && !line) {
        return { text: '', hasContent: false };
    }
    const parts = [];
    if (name || phone) parts.push([name, phone].filter(Boolean).join(' '));
    if (line) parts.push(line);
    if (postal) parts.push(`邮编：${postal}`);
    if (note) parts.push(`备注：${note}`);
    return { text: parts.join('\n'), hasContent: true };
}

module.exports = {
    formatReturnAddressForDisplay
};
