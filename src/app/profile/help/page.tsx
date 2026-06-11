"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ChevronRight, MessageSquare, Phone,
  ShoppingBag, RefreshCcw, Truck, Coins, Shield, Star,
  FileSearch, ClipboardList,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const categories = [
  {
    id: "order",
    icon: ShoppingBag,
    label: "订单问题",
    color: "#4A7CC7",
    bg: "#E8F0FB",
    faqs: [
      { q: "如何查看我的订单？", a: "进入「我的」→「全部订单」即可查看所有历史订单。订单按状态分为待付款、待发货、待收货、已完成四类。" },
      { q: "下单后能取消吗？", a: "订单在「待发货」状态下可申请取消。进入订单详情页，点击「取消订单」按钮，退款将在 1-3 个工作日原路返回。" },
      { q: "如何修改收货地址？", a: "订单在发货前可修改地址。进入订单详情页，点击「修改地址」即可。发货后无法修改，请联系在线客服处理。" },
      { q: "订单显示已完成但未收到货怎么办？", a: "请先确认快递是否放到了代收点或快递柜。如确认未收到，请在订单完成后 15 天内联系客服，我们将协助核实并处理。" },
    ],
  },
  {
    id: "aftersale",
    icon: RefreshCcw,
    label: "退换售后",
    color: "#B8973A",
    bg: "#FBF5E6",
    faqs: [
      { q: "如何申请退换货？", a: "收到商品后 7 天内（护肤品未开封），在「我的订单」找到对应订单，点击「申请售后」发起。审核通过后按提示寄回，运费由责任方承担。" },
      { q: "退款什么时候到账？", a: "退货审核通过后，退款将在 1-3 个工作日原路退回。如果超过 5 个工作日未到账，请提供退款截图联系客服。" },
      { q: "收到的商品有破损怎么办？", a: "请第一时间拍照留证（包括快递外包装）并联系客服，我们将优先安排补发或退款，无需退回破损商品。" },
      { q: "开封的护肤品可以退货吗？", a: "已开封使用的护肤品通常不支持退货，但如涉及质量问题（过敏反应除外），请联系客服提供皮肤检测报告，我们将个案处理。" },
    ],
  },
  {
    id: "delivery",
    icon: Truck,
    label: "配送物流",
    color: "#059669",
    bg: "#E6F4EF",
    faqs: [
      { q: "配送时效是多久？", a: "普通订单 1-3 个工作日内发货，顺丰快递一般 1-2 天送达。节假日期间可能延迟，以实际物流为准。" },
      { q: "满多少免运费？", a: "单笔订单满 ¥299 免运费，不满收取 ¥12 顺丰快递费。会员享有额外免运权益，具体请查看会员中心。" },
      { q: "能否指定配送时间？", a: "目前暂不支持指定时间配送。如有特殊需求（如礼品配送），可在备注中说明，我们将尽量安排。" },
    ],
  },
  {
    id: "points",
    icon: Coins,
    label: "积分礼遇",
    color: "#B8973A",
    bg: "#FBF5E6",
    faqs: [
      { q: "积分如何获得？", a: "每消费 ¥1 获得 1 积分；每日签到、完成肌肤测评（+25 积分）、完善个人资料（+25 积分）均可获得积分。" },
      { q: "积分有有效期吗？", a: "积分有效期为获得之日起 12 个月，到期自动清零。即将到期的积分可在积分中心查看提醒。" },
      { q: "积分怎么用？", a: "积分可在「积分商城」兑换优惠券、护肤小样及品牌礼品。100 积分起兑，兑换后即时到账。" },
    ],
  },
  {
    id: "account",
    icon: Shield,
    label: "账号安全",
    color: "#6B4EC7",
    bg: "#F0EBF9",
    faqs: [
      { q: "如何修改登录手机号？", a: "进入「我的」→「设置」→「账号安全」→「修改手机号」，需验证原手机号后才能绑定新号码。" },
      { q: "忘记业务密码怎么办？", a: "业务密码用于分销提现等敏感操作。进入「设置」→「业务密码」→「忘记密码」，通过短信验证码重置。" },
      { q: "账号被盗怎么处理？", a: "请立即联系在线客服，我们将协助冻结账号并核实身份。建议同时修改绑定手机的登录密码和验证方式。" },
    ],
  },
  {
    id: "member",
    icon: Star,
    label: "会员权益",
    color: "#B8973A",
    bg: "#FBF5E6",
    faqs: [
      { q: "会员等级如何晋升？", a: "累计消费满 ¥2,000 升至银卡，¥5,000 升至金卡，¥15,000 升至铂金卡。等级与专属折扣、月礼、积分加速等权益挂钩。" },
      { q: "会员月礼如何领取？", a: "每月 1 日在「会员权益中心」→「本月礼遇」处领取，逾期不补。礼品将在领取后 3 个工作日内发出。" },
      { q: "会员等级会降级吗？", a: "会员等级按自然年累计，次年 1 月将根据上年消费重新评定。年内已享权益不受影响。" },
    ],
  },
];

const selfTools = [
  { icon: FileSearch, label: "查询物流", desc: "输入单号快速查件", href: "/orders" },
  { icon: ClipboardList, label: "申请售后", desc: "退换货一键发起", href: "/orders" },
  { icon: Coins, label: "积分明细", desc: "查看积分获取记录", href: "/profile/points" },
];

export default function HelpPage() {
  const router = useRouter();
  const [activeCat, setActiveCat] = useState("order");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const cur = categories.find(c => c.id === activeCat)!;

  return (
    <PhoneFrame hideNav>
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#F0E8DC]">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]"
        >
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </button>
        <h1 className="text-base font-bold text-[#1A1208]">帮助中心</h1>
        <div className="w-8" />
      </header>

      <div className="pb-8">
        {/* 联系方式双卡 */}
        <div className="grid grid-cols-2 gap-3 px-4 pt-4">
          <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-[#F0E8DC]">
            <div className="w-9 h-9 rounded-full bg-[#F0E6C8] flex items-center justify-center shrink-0">
              <MessageSquare size={16} className="text-[#B8973A]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1A1208]">在线客服</p>
              <p className="text-[10px] text-[#8C7B6B] mt-0.5">工作日 9—21 时</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-[#F0E8DC]">
            <div className="w-9 h-9 rounded-full bg-[#F0E6C8] flex items-center justify-center shrink-0">
              <Phone size={16} className="text-[#B8973A]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1A1208]">电话客服</p>
              <p className="text-[10px] text-[#8C7B6B] mt-0.5">400-XXX-XXXX</p>
            </div>
          </div>
        </div>

        {/* 自助工具 */}
        <div className="px-4 mt-4">
          <p className="text-xs font-bold text-[#1A1208] mb-2.5">自助工具</p>
          <div className="grid grid-cols-3 gap-2">
            {selfTools.map(({ icon: Icon, label, desc, href }) => (
              <button
                key={label}
                onClick={() => router.push(href)}
                className="bg-white rounded-2xl p-3 flex flex-col items-center gap-1.5 border border-[#F0E8DC] press-scale"
              >
                <div className="w-9 h-9 rounded-full bg-[#F5EFE8] flex items-center justify-center">
                  <Icon size={16} className="text-[#B8973A]" />
                </div>
                <p className="text-[11px] font-semibold text-[#1A1208]">{label}</p>
                <p className="text-[9px] text-[#8C7B6B] text-center leading-snug">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 分类 FAQ */}
        <div className="px-4 mt-5">
          <p className="text-xs font-bold text-[#1A1208] mb-3">常见问题</p>

          {/* 分类标签横滑 */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(c => {
              const Icon = c.icon;
              const active = activeCat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => { setActiveCat(c.id); setExpandedIdx(null); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                    active
                      ? "text-white"
                      : "bg-white text-[#8C7B6B] border border-[#F0E8DC]"
                  }`}
                  style={active ? { backgroundColor: c.color } : {}}
                >
                  <Icon size={12} />
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* FAQ 列表 */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#F0E8DC] mt-3">
            {cur.faqs.map(({ q, a }, idx) => (
              <div key={idx} className={idx < cur.faqs.length - 1 ? "border-b border-[#F9F5F0]" : ""}>
                <button
                  onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                  className="w-full flex items-center px-4 py-3.5 text-left gap-2"
                >
                  <span className="flex-1 text-sm text-[#1A1208] leading-snug">{q}</span>
                  <ChevronRight
                    size={15}
                    className={`text-[#C0B0A0] flex-shrink-0 transition-transform ${expandedIdx === idx ? "rotate-90" : ""}`}
                  />
                </button>
                {expandedIdx === idx && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-[#8C7B6B] leading-relaxed bg-[#FAF7F4] rounded-xl p-3">
                      {a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
