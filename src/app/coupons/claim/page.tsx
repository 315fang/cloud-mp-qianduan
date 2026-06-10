"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Ticket, Check } from "lucide-react";
import Link from "next/link";
import PhoneFrame from "@/components/PhoneFrame";

// 状态：claimable | claimed | ended | soldout
type State = "claimable" | "claimed" | "ended" | "soldout";

const coupon = { amount: 100, title: "好友专属分享券", threshold: "满 599 可用", validity: "领取后 7 天内有效" };

export default function CouponClaimPage() {
  const router = useRouter();
  const [state, setState] = useState<State>("claimable");

  const stateText: Record<State, { tip: string; tipColor: string; btn: string; btnEnabled: boolean }> = {
    claimable: { tip: "好友送你一张专属优惠券", tipColor: "#3D8B5F", btn: "立即领取", btnEnabled: true },
    claimed: { tip: "你已成功领取该券", tipColor: "#B8973A", btn: "去使用", btnEnabled: true },
    ended: { tip: "活动已结束", tipColor: "#8C7B6B", btn: "返回首页", btnEnabled: true },
    soldout: { tip: "很遗憾，该券已被领完", tipColor: "#D14343", btn: "返回首页", btnEnabled: true },
  };
  const s = stateText[state];

  const handleClick = () => {
    if (state === "claimable") setState("claimed");
    else router.push(state === "claimed" ? "/coupons/center" : "/");
  };

  return (
    <PhoneFrame hideNav>
      <div className="flex flex-col h-full" style={{ background: "linear-gradient(160deg, #1A1208 0%, #2A2018 100%)" }}>
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10" aria-label="返回">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-white">领取优惠券</span>
          <select value={state} onChange={(e) => setState(e.target.value as State)} className="text-[10px] text-[#D4AF5A] bg-transparent">
            <option value="claimable">可领</option><option value="claimed">已领</option><option value="ended">结束</option><option value="soldout">领完</option>
          </select>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-10">
          {/* 状态提示 */}
          <p className="text-sm mb-4" style={{ color: s.tipColor === "#8C7B6B" ? "#B8A898" : s.tipColor }}>{s.tip}</p>

          {/* 大券面 */}
          <div className={`w-full max-w-[300px] bg-white rounded-2xl overflow-hidden ${state === "ended" || state === "soldout" ? "opacity-50" : ""}`}>
            <div className="bg-[#1A1208] py-8 flex flex-col items-center relative">
              <Ticket size={28} className="text-[#D4AF5A] mb-2" />
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-lg">¥</span>
                <span className="text-5xl font-bold">{coupon.amount}</span>
              </div>
              <span className="text-xs text-white/60 mt-2">{coupon.threshold}</span>
              <span className="absolute -left-2 bottom-0 w-4 h-4 rounded-full bg-[#231a10]" />
              <span className="absolute -right-2 bottom-0 w-4 h-4 rounded-full bg-[#231a10]" />
            </div>
            <div className="p-5 text-center border-t border-dashed border-[#E8DDD0]">
              <p className="text-base font-bold text-[#1A1208]">{coupon.title}</p>
              <p className="text-xs text-[#8C7B6B] mt-1.5">{coupon.validity}</p>
              {state === "claimed" && (
                <div className="flex items-center justify-center gap-1.5 mt-3 text-[#3D8B5F]">
                  <Check size={14} /><span className="text-xs font-medium">已存入我的卡券</span>
                </div>
              )}
            </div>
          </div>

          {/* 按钮 */}
          <button onClick={handleClick} className="w-full max-w-[300px] mt-6 py-3.5 bg-[#B8973A] text-white text-sm font-bold rounded-xl">
            {s.btn}
          </button>
          {state === "claimed" && (
            <Link href="/" className="mt-3 text-xs text-white/50">返回首页</Link>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
