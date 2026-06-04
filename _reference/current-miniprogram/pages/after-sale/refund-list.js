// pages/after-sale/refund-list.js - 退款售后列表
const { get, post, put } = require('../../utils/request');
const { parseImages } = require('../../utils/dataFormatter');
const { resolveCloudImageList, resolveCloudImageUrl } = require('../../utils/cloudAssetRuntime');
const { normalizeRefundConsumer } = require('../../utils/orderConsumerFields');

Page({
    data: {
        refunds: [],
        page: 1,
        limit: 20,
        hasMore: true,
        loading: false,
        refreshing: false,
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

    onShow() {
        this.setData({ refunds: [], page: 1, hasMore: true });
        this.loadRefunds();
    },

    async loadRefunds(isLoadMore = false) {
        if (this.data.loading) return;
        this.setData({ loading: true });

        try {
            const { page, limit, refunds } = this.data;
            const res = await get('/refunds', { page, limit });

            if (res.code === 0 && res.data) {
                const list = await Promise.all((res.data.list || []).map(async (rawItem) => {
                    const item = normalizeRefundConsumer(rawItem);
                    // 处理商品图片
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
                }));

                this.setData({
                    refunds: isLoadMore ? refunds.concat(list) : list,
                    hasMore: list.length === limit,
                    page: page + 1,
                    loading: false
                });
            } else {
                this.setData({ loading: false });
            }
        } catch (err) {
            this.setData({ loading: false });
            console.error('加载退款列表失败:', err);
        }
    },

    onLoadMore() {
        if (this.data.hasMore) {
            this.loadRefunds(true);
        }
    },

    // 主内容在 scroll-view 内，用 refresher 下拉刷新：重置分页后重新加载首页。
    onRefresherRefresh() {
        if (this.data.refreshing) return;
        this.setData({ refreshing: true, refunds: [], page: 1, hasMore: true });
        this.loadRefunds().finally(() => this.setData({ refreshing: false }));
    },

    onRefundTap(e) {
        const id = e.currentTarget.dataset.id;
        const orderId = e.currentTarget.dataset.orderId || '';
        if (orderId) {
            wx.navigateTo({ url: `/pages/after-sale/order-after-sale?order_id=${orderId}&refund_id=${id}` });
            return;
        }
        wx.navigateTo({ url: `/pages/after-sale/refund-detail?id=${id}` });
    },

    async onCancelRefund(e) {
        const { id, index } = e.currentTarget.dataset;
        wx.showModal({
            title: '提示',
            content: '确定取消此售后申请？',
            success: async (res) => {
                if (res.confirm) {
                    try {
                        const cancelRes = await put(`/refunds/${id}/cancel`);
                        if (cancelRes.code === 0) {
                            wx.showToast({ title: '已取消', icon: 'success' });
                            // 刷新列表
                            this.setData({ refunds: [], page: 1, hasMore: true });
                            this.loadRefunds();
                        }
                    } catch (err) {
                        wx.showToast({ title: '取消失败', icon: 'none' });
                    }
                }
            }
        });
    }
});
