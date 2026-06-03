// pages/after-sale/order-after-sale.js — 单笔订单售后中枢（区别于商城浏览页）
const { get } = require('../../utils/request');
const { parseImages } = require('../../utils/dataFormatter');
const { resolveCloudImageList, resolveCloudImageUrl } = require('../../utils/cloudAssetRuntime');
const { normalizeOrderConsumer, normalizeRefundConsumer } = require('../../utils/orderConsumerFields');
const { formatReturnAddressForDisplay } = require('../../utils/returnAddressFormat');

Page({
    data: {
        orderId: '',
        focusRefundId: '',
        order: null,
        refunds: [],
        configReturnAddressText: '',
        configReturnAddressReady: false,
        loading: true,
        statusText: {
            pending: '审核中',
            approved: '已通过',
            rejected: '已拒绝',
            processing: '处理中',
            completed: '已完成',
            cancelled: '已取消'
        },
        typeText: {
            refund_only: '仅退款',
            return_refund: '退货退款'
        }
    },

    onLoad(options) {
        const orderId = options.order_id || options.id || '';
        const focusRefundId = options.refund_id || '';
        if (!orderId) {
            wx.showToast({ title: '缺少订单信息', icon: 'none' });
            setTimeout(() => wx.navigateBack(), 1500);
            return;
        }
        this.setData({ orderId, focusRefundId });
        this.hydrateConfigReturnAddress();
        this.bootstrap();
    },

    onShow() {
        if (this.data.orderId) {
            this.hydrateConfigReturnAddress();
            this.bootstrap();
        }
    },

    hydrateConfigReturnAddress() {
        const app = getApp();
        try {
            app.fetchMiniProgramConfig && app.fetchMiniProgramConfig({ forceRefresh: false });
        } catch (_) {}
        const raw = app.globalData?.miniProgramConfig?.logistics_config?.return_address || {};
        const { text, hasContent } = formatReturnAddressForDisplay(raw);
        this.setData({
            configReturnAddressText: text,
            configReturnAddressReady: hasContent
        });
    },

    async bootstrap() {
        this.setData({ loading: true });
        try {
            const [orderRes, refundRes] = await Promise.all([
                get(`/orders/${encodeURIComponent(this.data.orderId)}`),
                get('/refunds', { order_id: this.data.orderId, limit: 50 })
            ]);

            if (orderRes.code !== 0 || !orderRes.data) {
                wx.showToast({ title: orderRes.message || '订单加载失败', icon: 'none' });
                this.setData({ loading: false });
                return;
            }

            let order = orderRes.data;
            if (order && order.product) {
                order.product.images = await resolveCloudImageList(
                    order.product.images,
                    parseImages(order.product.images)
                );
                order.product.image = await resolveCloudImageUrl(
                    order.product.image || order.product.image_url || '',
                    order.product.images
                );
            }
            order = normalizeOrderConsumer(order);

            let refunds = (refundRes.code === 0 && refundRes.data && refundRes.data.list) ? refundRes.data.list : [];
            refunds = await Promise.all(
                refunds.map(async (raw) => {
                    const item = normalizeRefundConsumer(raw);
                    if (item.order && item.order.product) {
                        item.order.product.images = await resolveCloudImageList(
                            item.order.product.images,
                            parseImages(item.order.product.images)
                        );
                        item.order.product.image = await resolveCloudImageUrl(
                            item.order.product.image || item.order.product.image_url || '',
                            item.order.product.images
                        );
                    }
                    return item;
                })
            );

            this.setData({
                order,
                refunds,
                loading: false
            });

            if (this.data.focusRefundId) {
                const hit = refunds.find((r) => String(r.id) === String(this.data.focusRefundId));
                if (hit) {
                    wx.pageScrollTo({ selector: `#refund-row-${hit.id}`, duration: 200 });
                }
            }
        } catch (e) {
            console.error('[order-after-sale]', e);
            this.setData({ loading: false });
            wx.showToast({ title: '加载失败', icon: 'none' });
        }
    },

    onOpenRefundDetail(e) {
        const id = e.currentTarget.dataset.id;
        if (!id) return;
        wx.navigateTo({ url: `/pages/after-sale/refund-detail?id=${id}` });
    },

    onApplyAfterSale() {
        const id = this.data.order && this.data.order.id;
        if (!id) return;
        wx.navigateTo({ url: `/pages/after-sale/refund-apply?order_id=${id}` });
    },

    onCopyConfigAddress() {
        const t = this.data.configReturnAddressText;
        if (!t) {
            wx.showToast({ title: '后台尚未配置退货地址', icon: 'none' });
            return;
        }
        wx.setClipboardData({
            data: t,
            success: () => wx.showToast({ title: '已复制', icon: 'success' })
        });
    },

    onGoOrderDetail() {
        const id = this.data.order && this.data.order.id;
        if (!id) return;
        wx.navigateTo({ url: `/pages/order/detail?id=${id}` });
    }
});
