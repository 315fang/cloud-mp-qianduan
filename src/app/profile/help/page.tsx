"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, MessageSquare } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const faqs = [
  {
    q: "如何申请退换货？",
    a: "收到商品后 7 天内，在「我的订单」中找到对应订单，点击「申请售后」即可发起退换货申请。我们将在 1-3 个工作日内审核处理。",
  },
  {
    q: "配送需要多久？",
    a: "普通订单 1-3 个工作日发货，顺丰快递一般 1-2 天送达。满 ¥299 免运费，不满需支付 ¥12 运费。",
  },
  {
    q: "如何使用优惠券？",
    a: "在结算页面点击「优惠券/优惠码」，选择可用券即可自动抵扣。每笔订单限用一张优惠券。",
  },
  {
    q: "商品是否为正品？",
    a: "云肌所有商品均为正品保障，直接与品牌合作，提供购物凭证，支持专柜验货。",
  },
  {
    q: "积分如何获得？",
    a: "每消费 ¥1 获得 1 积分，积分可用于兑换优惠券或礼品。积分有效期为获得之日起 12 个月。",
  },
];

export default function HelpPage() {
  const router = useRouter();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <PhoneFrame hideNav>
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]"
        >
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </button>
        <h1 className="text-base font-bold text-[#1A1208]">帮助中心</h1>
        <div className="w-8" />
      </header>

      <div className="px-4 space-y-4 pb-8">
        {/* 联系客服 */}
        <div className="bg-[#1A1208] rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#B8973A]/20 flex items-center justify-center flex-shrink-0">
            <MessageSquare size={20} className="text-[#B8973A]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">在线客服</p>
            <p className="text-[11px] text-white/50 mt-0.5">工作日 9:00 - 21:00 在线</p>
          </div>
          <button className="bg-[#B8973A] text-white text-xs font-medium px-4 py-2 rounded-full flex-shrink-0">
            联系
          </button>
        </div>

        {/* 常见问题 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <p className="text-sm font-bold text-[#1A1208] px-4 py-3 border-b border-[#F9F5F0]">
            常见问题
          </p>
          {faqs.map(({ q, a }, idx) => (
            <div key={idx} className={idx < faqs.length - 1 ? "border-b border-[#F9F5F0]" : ""}>
              <button
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                className="w-full flex items-center px-4 py-3.5 text-left"
              >
                <span className="flex-1 text-sm text-[#1A1208]">{q}</span>
                <ChevronRight
                  size={15}
                  className={`text-[#C0B0A0] transition-transform ${expandedIdx === idx ? "rotate-90" : ""}`}
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
    </PhoneFrame>
  );
}
