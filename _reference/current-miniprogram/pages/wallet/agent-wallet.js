// pages/wallet/agent-wallet.js — 代理商货款余额
const { get, post } = require('../../utils/request');
const { humanizePaymentError } = require('../../utils/paymentErrorMessage');
const { formatLogItem, mergeWalletLogPairs, groupLogsByDate, formatGroupDate, getChangeLabel } = require('./agentWalletLogs');
const {
    DEFAULT_PRESET_AMOUNTS,
    loadRechargeConfig,
    getBonusForAmount,
    getRechargeAmount,
    updateBonusHint
} = require('./agentWalletRecharge');
const app = getApp();

Page({
    data: {
        statusBarHeight: 20,
        navBarHeight: 44,
        loading: true,
        isAgent: false,
        roleLevel: 0,
        balance: '0.00',
        frozenBalance: '0.00',
        totalRecharge: '0.00',
        totalDeduct: '0.00',
        logs: [],
        groupedLogs: [],       // 按日期分组的流水
        page: 1,
        limit: 20,
        hasMore: true,
        logsLoading: false,
        loadError: '',         // 错误信息
        activeFilter: 'all',
        activeFilterText: '全部',  // 空状态文案用
        showRechargePanel: false,
        rechargeEnabled: true,
        presetAmounts: DEFAULT_PRESET_AMOUNTS,
        selectedAmount: null,
        selectedIdx: -1,
        customAmount: '',
        useCustom: false,
        recharging: false,
        bonusEnabled: false,
        bonusTiers: [],
        currentBonusHint: ''
    },

    onLoad() {
        this.setData({
            statusBarHeight: app.globalData.statusBarHeight || 20,
            navBarHeight: app.globalData.navBarHeight || 44
        });

        const userInfo = app.globalData.userInfo || {};
        const roleLevel = userInfo.role_level || 0;
        const isAgent = roleLevel >= 3;
        this.setData({ roleLevel, isAgent });

        if (isAgent) {
            this.loadRechargeConfig();
            this.loadAll();
        } else {
            this.setData({ loading: false });
        }
    },

    onPullDownRefresh() {
        if (!this.data.isAgent) { wx.stopPullDownRefresh(); return; }
        this.setData({ logs: [], page: 1, hasMore: true });
        this.loadAll().finally(() => wx.stopPullDownRefresh());
    },

    onReachBottom() {
        if (this.data.hasMore && !this.data.logsLoading && this.data.isAgent) {
            this.loadLogs();
        }
    },

    async loadAll() {
        this.setData({ loading: true });
        await Promise.allSettled([this.loadWalletInfo(), this.loadLogs(true)]);
        this.setData({ loading: false });
    },

    async loadWalletInfo() {
        try {
            const res = await get('/agent/wallet');
            if (res && res.code === 0 && res.data) {
                const d = res.data;
                this.setData({
                    balance: d.goods_fund_balance || d.balance || '0.00',
                    frozenBalance: d.frozen_balance || '0.00',
                    totalRecharge: d.total_recharge || '0.00',
                    totalDeduct: d.total_deduct || '0.00'
                });
            }
        } catch (e) {
            console.error('货款余额加载失败:', e);
        }
    },

    async loadLogs(reset = false) {
        if (this.data.logsLoading) return;
        const page = reset ? 1 : this.data.page;
        this.setData({ logsLoading: true, loadError: '' });
        try {
            const params = {
                page,
                limit: this.data.limit
            };
            if (this.data.activeFilter && this.data.activeFilter !== 'all') {
                params.filter = this.data.activeFilter;
            }
            const res = await get('/agent/wallet/logs', params);
            if (res && res.code === 0) {
                const responseList = res.data.list || [];
                const rawList = mergeWalletLogPairs(responseList);
                const newLogs = rawList.map(item => this._formatLogItem(item));
                const total = Number(res.data.pagination?.total || 0);
                const logs = reset ? newLogs : [...this.data.logs, ...newLogs];
                this.setData({
                    logs,
                    groupedLogs: this._groupLogsByDate(logs),
                    page: page + 1,
                    hasMore: total > 0 ? page * this.data.limit < total : responseList.length === this.data.limit
                });
            } else {
                // API 返回业务错误
                const msg = (res && res.message) || '加载流水失败';
                if (reset || this.data.logs.length === 0) {
                    this.setData({ loadError: msg });
                }
            }
        } catch (e) {
            console.error('加载流水失败:', e);
            const msg = e.message || '网络异常，请检查网络连接';
            if (reset || this.data.logs.length === 0) {
                this.setData({ loadError: msg });
            }
        }
        this.setData({ logsLoading: false });
    },

    /** 格式化单条日志 */
    _formatLogItem(item) {
        return formatLogItem(this, item);
    },

    /** 按日期对日志进行分组 */
    _groupLogsByDate(logs) {
        return groupLogsByDate(logs);
    },

    /** 格式化分组日期文案 */
    _formatGroupDate(dateKey) {
        return formatGroupDate(dateKey);
    },

    _getChangeLabel(type) {
        return getChangeLabel(type);
    },

    async loadRechargeConfig() {
        return loadRechargeConfig(this);
    },

    _getBonusForAmount(amount) {
        return getBonusForAmount(this, amount);
    },

    _updateBonusHint() {
        return updateBonusHint(this);
    },

    onFilterChange(e) {
        const filter = e.currentTarget.dataset.filter;
        if (filter === this.data.activeFilter) return;
        const filterTextMap = { all: '全部', in: '入账', out: '支出' };
        this.setData({
            activeFilter: filter,
            activeFilterText: filterTextMap[filter] || '全部',
            logs: [],
            groupedLogs: [],
            page: 1,
            hasMore: true,
            loadError: ''
        });
        this.loadLogs(true);
    },

    /** 重试加载 */
    onRetryLoad() {
        this.setData({ loadError: '', logs: [], groupedLogs: [], page: 1, hasMore: true });
        this.loadAll();
    },

    onRecharge() {
        if (!this.data.isAgent) {
            wx.showModal({
                title: '仅代理商可充值',
                content: '货款充值功能仅开放给代理商等级及以上用户，请联系客服升级账户。',
                showCancel: false,
                confirmText: '我知道了'
            });
            return;
        }
        if (!this.data.rechargeEnabled) {
            wx.showToast({ title: '货款充值暂未开放', icon: 'none' });
            return;
        }
        const defaultIdx = this.data.presetAmounts.length > 0 ? Math.min(2, this.data.presetAmounts.length - 1) : -1;
        this.setData({
            showRechargePanel: true,
            customAmount: '',
            useCustom: false,
            selectedAmount: defaultIdx >= 0 ? this.data.presetAmounts[defaultIdx] : null,
            selectedIdx: defaultIdx
        });
    },

    onPanelTap() { },

    onCloseRecharge() {
        if (this.data.recharging) return;
        this.setData({ showRechargePanel: false });
    },

    onSelectPreset(e) {
        const amount = Number(e.currentTarget.dataset.amount);
        const idx = Number(e.currentTarget.dataset.idx);
        this.setData({ selectedAmount: amount, selectedIdx: idx, useCustom: false, customAmount: '' }, () => this._updateBonusHint());
    },

    onCustomAmountInput(e) {
        const val = e.detail.value;
        this.setData({ customAmount: val, useCustom: !!val, selectedAmount: null, selectedIdx: -1 }, () => this._updateBonusHint());
    },

    onCustomAmountFocus() {
        this.setData({ useCustom: true, selectedAmount: null, selectedIdx: -1 });
    },

    _getRechargeAmount() {
        return getRechargeAmount(this);
    },

    async onConfirmRecharge() {
        // 防重入：缺少入口检查时，快速双击会两次走到 prepay 而创建多个充值单。
        if (this.data.recharging) return;
        if (!this.data.rechargeEnabled) {
            wx.showToast({ title: '货款充值暂未开放', icon: 'none' });
            return;
        }
        const amount = this._getRechargeAmount();
        if (!amount || isNaN(amount) || amount <= 0) {
            wx.showToast({ title: '请选择或输入充值金额', icon: 'none' });
            return;
        }
        if (amount < 10) {
            wx.showToast({ title: '最低充值 ¥10', icon: 'none' });
            return;
        }
        if (amount > 100000) {
            wx.showToast({ title: '单次最高充值 ¥100,000', icon: 'none' });
            return;
        }

        this.setData({ recharging: true });
        wx.showLoading({ title: '发起支付...' });
        try {
            const prepayRes = await post('/agent/wallet/prepay', { amount });
            wx.hideLoading();

            if (prepayRes.code !== 0) {
                wx.showToast({ title: humanizePaymentError(prepayRes.message, '发起支付失败'), icon: 'none' });
                this.setData({ recharging: false });
                return;
            }

            const p = prepayRes.data;
            const rechargeOrderId = p.recharge_id || p.order_no || '';
            wx.requestPayment({
                timeStamp: p.timeStamp,
                nonceStr:  p.nonceStr,
                package:   p.package,
                signType:  p.signType || 'RSA',
                paySign:   p.paySign,
                success: () => {
                    this.setData({ showRechargePanel: false, recharging: false });
                    // 兜底入账：微信支付公钥模式下回调验签偶发失败会让 RCH 单卡 pending、
                    // 钱包不入账。走"主动查询微信侧 → SUCCESS 即推进 paid"的路径补救，
                    // 与订单的 paymentQuery 是同一种机制。
                    this._syncRechargeWithRetry(rechargeOrderId);
                },
                fail: (err) => {
                    this.setData({ recharging: false });
                    if (err.errMsg && err.errMsg.includes('cancel')) {
                        wx.showModal({
                            title: '已取消充值',
                            content: '充值单会保留一段时间，可继续支付或等待超时关闭。',
                            confirmText: '查看充值单',
                            cancelText: '知道了',
                            success: (res) => {
                                if (res.confirm && rechargeOrderId) {
                                    wx.navigateTo({ url: `/pages/wallet/recharge-order?id=${encodeURIComponent(rechargeOrderId)}` });
                                }
                            }
                        });
                    } else {
                        wx.showToast({ title: '支付失败，请重试', icon: 'none' });
                    }
                }
            });
        } catch (err) {
            wx.hideLoading();
            this.setData({ recharging: false });
            wx.showToast({ title: humanizePaymentError(err, '发起充值失败'), icon: 'none' });
        }
    },

    onBack() {
        wx.navigateBack();
    },

    /**
     * 用户支付成功后的兜底入账：私钥 GET 微信查询接口 → SUCCESS 即调用
     * handleRechargeCallback 把订单从 pending 推进到 paid 并加余额。
     * 重试是因为微信侧偶发延迟 1-3 秒才会把订单状态置 SUCCESS。
     *
     * 关键约束：「充值成功」必须等 status==='paid' 才提示。
     * 历史 bug：曾用 `status==='paid' || trade_state==='SUCCESS'` 判定——
     * trade_state=SUCCESS 仅代表微信侧扣款完成，但后端入账三步（加货款 / 写
     * ledger / 写流水）任一抛异常都会让 status 卡在 'crediting'，此时若以
     * trade_state 判定就会出现「钱扣了 + 弹"充值成功" + 货款没加」资损现象。
     */
    async _syncRechargeWithRetry(rechargeId) {
        if (!rechargeId) {
            // 没有充值单号无法兜底确认；保留原有友好提示，但走 loadAll 让用户自己看到余额
            wx.showToast({ title: '已提交，请稍后查看余额', icon: 'none' });
            setTimeout(() => this.loadAll(), 1500);
            return;
        }
        wx.showLoading({ title: '入账确认中...' });
        const delays = [800, 1500, 2500]; // 共最多 ~5s
        for (let i = 0; i < delays.length; i++) {
            await new Promise((r) => setTimeout(r, delays[i]));
            try {
                const res = await post('/agent/wallet/sync-recharge', { recharge_id: rechargeId });
                const data = (res && res.data) || {};
                if (data.status === 'paid') {
                    wx.hideLoading();
                    wx.showToast({ title: '充值成功！', icon: 'success' });
                    setTimeout(() => this.loadAll(), 800);
                    return;
                }
                // trade_state=SUCCESS 但 status≠paid（仍 pending/crediting）：
                // 微信扣款已完成，后端入账还在进行中 / 中途异常。继续 retry，
                // 三轮还不到 paid 就走下面的「入账确认中」模态框，让用户去
                // 充值订单页查询，绝不在这里提示「成功」。
            } catch (_) {}
        }
        wx.hideLoading();
        wx.showModal({
            title: '充值正在入账',
            content: '微信收款已完成，但入账确认稍慢。可在"我的充值订单"查看；如长时间未到账请联系客服。',
            showCancel: false,
        });
        this.loadAll();
    }
});
