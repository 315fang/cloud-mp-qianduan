const { get } = require('../../utils/request');
const { requireLogin } = require('../../utils/auth');
const { ensurePickupEntryAvailable, canUsePickupFlowPages } = require('../../utils/pickupEntryGate');

function formatDate(value) {
    if (!value) return '';
    return String(value).replace('T', ' ').slice(0, 16);
}

Page({
    data: {
        loading: true,
        stationId: '',
        station: null,
        list: [],
        page: 1,
        limit: 20,
        hasMore: true
    },

    async onLoad(options) {
        if (!(await ensurePickupEntryAvailable())) return;
        if (!requireLogin()) {
            setTimeout(() => wx.navigateBack(), 100);
            return;
        }
        this.setData({
            stationId: options.station_id ? String(options.station_id) : ''
        });
        this.loadOrders();
    },

    async onShow() {
        if (!(await ensurePickupEntryAvailable())) return;
        if (!requireLogin()) {
            setTimeout(() => wx.navigateBack(), 100);
        }
    },

    async loadOrders(append = false) {
        if (!(await ensurePickupEntryAvailable())) return;
        this.setData({ loading: true });
        try {
            const page = append ? this.data.page : 1;
            const res = await get('/pickup/pending-orders', {
                station_id: this.data.stationId,
                page,
                limit: this.data.limit
            }, { showLoading: !append });

            const incoming = (res.data?.list || []).map((item) => ({
                ...item,
                buyer: item.buyer || {},
                quantity: Number(item.quantity || 0),
                amount_text: item.pay_amount != null ? item.pay_amount : (item.total_amount || 0),
                created_at_text: formatDate(item.created_at),
                paid_at_text: formatDate(item.paid_at),
                shipped_at_text: formatDate(item.shipped_at)
            }));

            this.setData({
                list: append ? this.data.list.concat(incoming) : incoming,
                station: res.data?.station || null,
                page: page + 1,
                hasMore: incoming.length === this.data.limit,
                loading: false
            });
        } catch (e) {
            this.setData({ loading: false });
        }
    },

    onLoadMore() {
        if (!this.data.loading && this.data.hasMore) {
            this.loadOrders(true);
        }
    },

    goVerifyPage() {
        if (!canUsePickupFlowPages()) {
            wx.showToast({ title: '自提功能暂未开放', icon: 'none' });
            return;
        }
        const { stationId } = this.data;
        wx.navigateTo({ url: `/pages/pickup/verify${stationId ? `?station_id=${stationId}` : ''}` });
    },

    goOrderDetail(e) {
        const id = e.currentTarget.dataset.id;
        if (!id) return;
        wx.navigateTo({ url: `/pages/order/detail?id=${id}` });
    }
});
