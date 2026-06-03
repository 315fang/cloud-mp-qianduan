const { get, post } = require('../../utils/request');
const { humanizePaymentError } = require('../../utils/paymentErrorMessage');

function formatDateTime(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value).replace('T', ' ').slice(0, 19);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatCountdown(seconds) {
    const total = Math.max(0, Number(seconds) || 0);
    const hours = String(Math.floor(total / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const secs = String(total % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
}

Page({
    data: {
        rechargeOrderId: '',
        loading: true,
        paying: false,
        order: null,
        countdownText: ''
    },

    onLoad(options) {
        this.setData({
            rechargeOrderId: decodeURIComponent(options.id || '')
        });
        this._skipNextOnShowRefresh = true;
        this.loadOrder();
    },

    onShow() {
        if (this._skipNextOnShowRefresh) {
            this._skipNextOnShowRefresh = false;
            return;
        }
        if (this.data.rechargeOrderId) {
            this.loadOrder();
        }
    },

    onUnload() {
        this._clearCountdown();
    },

    _clearCountdown() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    },

    _startCountdown(seconds) {
        this._clearCountdown();
        this.setData({ countdownText: formatCountdown(seconds) });
        if (seconds <= 0) return;
        let remaining = seconds;
        this._timer = setInterval(() => {
            remaining -= 1;
            if (remaining <= 0) {
                this._clearCountdown();
                this.setData({ countdownText: '00:00:00' });
                this.loadOrder();
                return;
            }
            this.setData({ countdownText: formatCountdown(remaining) });
        }, 1000);
    },

    async loadOrder() {
        if (!this.data.rechargeOrderId) return;
        this.setData({ loading: true });
        try {
            const res = await get(`/agent/wallet/recharge-orders/${encodeURIComponent(this.data.rechargeOrderId)}`);
            const order = res?.data;
            const orderId = order?.id || order?._id || this.data.rechargeOrderId;
            this.setData({
                loading: false,
                rechargeOrderId: orderId,
                order: order ? {
                    ...order,
                    id: orderId,
                    amountText: Number(order.amount || 0).toFixed(2),
                    createdAtText: formatDateTime(order.created_at),
                    expireAtText: formatDateTime(order.expire_at),
                    paidAtText: formatDateTime(order.paid_at),
                    cancelledAtText: formatDateTime(order.cancelled_at)
                } : null
            });
            this._startCountdown(order?.can_continue_pay ? order.seconds_remaining : 0);
        } catch (err) {
            this._clearCountdown();
            this.setData({ loading: false });
            wx.showToast({ title: err.message || '加载失败', icon: 'none' });
        }
    },

    async onContinuePay() {
        const order = this.data.order;
        if (!order || !order.can_continue_pay || this.data.paying) return;

        this.setData({ paying: true });
        wx.showLoading({ title: '拉起支付...' });
        try {
            const rechargeOrderId = order.id || order._id || order.order_no;
            const res = await post('/agent/wallet/prepay', { recharge_order_id: rechargeOrderId });
            wx.hideLoading();
            const data = res?.data || {};

            if (data.prepay_failed || !data.timeStamp) {
                this.setData({ paying: false });
                wx.showModal({
                    title: '暂时无法支付',
                    content: humanizePaymentError(data.prepay_message, '请稍后重试，充值单会保留到超时关闭。'),
                    showCancel: false
                });
                this.loadOrder();
                return;
            }

            wx.requestPayment({
                timeStamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: data.signType || 'RSA',
                paySign: data.paySign,
                success: () => {
                    // 兜底入账：详见 pages/wallet/agent-wallet.js:_syncRechargeWithRetry。
                    this._syncRechargeWithRetry(data.recharge_id || rechargeOrderId);
                },
                fail: (err) => {
                    if (err.errMsg && err.errMsg.includes('cancel')) {
                        wx.showToast({ title: '已取消支付', icon: 'none' });
                    } else {
                        wx.showToast({ title: '支付未完成，可继续重试', icon: 'none' });
                    }
                    this.loadOrder();
                },
                complete: () => {
                    this.setData({ paying: false });
                }
            });
        } catch (err) {
            wx.hideLoading();
            this.setData({ paying: false });
            wx.showToast({ title: humanizePaymentError(err, '拉起支付失败'), icon: 'none' });
            this.loadOrder();
        }
    },

    async _syncRechargeWithRetry(rechargeId) {
        if (!rechargeId) {
            wx.showToast({ title: '已支付，正在确认入账', icon: 'none' });
            setTimeout(() => this.loadOrder(), 1200);
            return;
        }
        wx.showLoading({ title: '入账确认中...' });
        const delays = [800, 1500, 2500];
        for (let i = 0; i < delays.length; i++) {
            await new Promise((r) => setTimeout(r, delays[i]));
            try {
                const res = await post('/agent/wallet/sync-recharge', { recharge_id: rechargeId });
                const data = (res && res.data) || {};
                if (data.status === 'paid') {
                    wx.hideLoading();
                    wx.showToast({ title: '充值成功！', icon: 'success' });
                    setTimeout(() => this.loadOrder(), 800);
                    return;
                }
            } catch (_) {}
        }
        wx.hideLoading();
        wx.showModal({
            title: '充值正在入账',
            content: '微信收款已完成，但入账确认稍慢。请稍后刷新页面查看；如长时间未到账请联系客服。',
            showCancel: false,
        });
        this.loadOrder();
    }
});
