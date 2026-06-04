function toNumber(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
}

function formatMoney(value) {
    return toNumber(value, 0).toFixed(2);
}

Page({
    data: {
        orderAmount: '300',
        directRate: '10',
        teamRate: '3',
        directAmount: '30.00',
        teamAmount: '9.00',
        estimateTotal: '39.00',
        rules: [
            {
                title: '真实成交才产生收益',
                desc: '收益以系统订单、支付和结算记录为准，分享或邀新本身不等于收益。'
            },
            {
                title: '退款会扣回',
                desc: '订单发生退款后，未结算收益会取消；已结算收益会进入扣回或欠款处理。'
            },
            {
                title: '佣金账和货款账分开',
                desc: '佣金用于提现，货款用于代理订货、充值、划拨和货款支付，两本账不能混用。'
            },
            {
                title: '提现以财务审核为准',
                desc: '提现需要后台审核和微信转账记录，最终到账以微信官方流水为准。'
            }
        ],
        roleRules: [
            {
                title: '当前身份用户',
                desc: '可查看团队、佣金明细、可提现金额和货款余额。'
            },
            {
                title: '店长',
                desc: '重点看门店工作台、自提核销、门店库存、备货和店长相关服务费。'
            },
            {
                title: '区域代理',
                desc: '按后台配置的省/市/区归属和订单收货地址计算，优先匹配更细区域。'
            }
        ]
    },

    onLoad() {
        this.recalculate();
    },

    onInput(e) {
        const field = e.currentTarget.dataset.field;
        if (!field) return;
        this.setData({ [field]: e.detail.value }, () => this.recalculate());
    },

    recalculate() {
        const orderAmount = Math.max(0, toNumber(this.data.orderAmount, 0));
        const directRate = Math.max(0, toNumber(this.data.directRate, 0));
        const teamRate = Math.max(0, toNumber(this.data.teamRate, 0));
        const directAmount = orderAmount * directRate / 100;
        const teamAmount = orderAmount * teamRate / 100;
        this.setData({
            directAmount: formatMoney(directAmount),
            teamAmount: formatMoney(teamAmount),
            estimateTotal: formatMoney(directAmount + teamAmount)
        });
    }
});
