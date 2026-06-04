"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Gift, ChevronRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const history = [
  { id: 1, desc: "购买「焕颜臻萃精华」获得积分", points: "+120", date: "2024-11-28", type: "earn" },
  { id: 2, desc: "购买「轻盈保湿面霜」获得积分", points: "+86", date: "2024-11-20", type: "earn" },
  { id: 3, desc: "积分兑换优惠券", points: "-200", date: "2024-11-15", type: "spend" },
  { id: 4, desc: "签到奖励", points: "+10", date: "2024-11-10", type: "earn" },
  { id: 5, desc: "新用户注册奖励", points: "+100", date: "2024-10-01", type: "earn" },
];

const gifts = [
  { id: 1, name: "¥30 满减券", points: 200, image: "🎟️" },
  { id: 2, name: "精华小样", points: 500, image: "✨" },
  { id: 3, name: "免邮券", points: 100, image: "📦" },
];

export default function PointsPage() {
  const router = useRouter();

  return (
    <PhoneFrame hideNav>
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]"
        >
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </button>
        <h1 className="text-base font-bold text-[#1A1208]">积分中心</h1>
        <div className="w-8" />
      </header>

      <div className="px-4 space-y-4 pb-8">
        {/* 积分总额 */}
        <div className="bg-[#1A1208] rounded-2xl px-5 py-6 text-center">
          <p className="text-[11px] text-[#B8973A] tracking-[0.2em] font-medium">我的积分</p>
          <p className="text-5xl font-bold text-white mt-1">1,280</p>
          <p className="text-xs text-white/40 mt-1">黄金会员 · 距铂金还差 720 积分</p>
          <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#B8973A] to-[#D4AF5A] rounded-full" style={{ width: "64%" }} />
          </div>
        </div>

        {/* 积分兑换 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F9F5F0]">
            <div className="flex items-center gap-2">
              <Gift size={15} className="text-[#B8973A]" />
              <span className="text-sm font-bold text-[#1A1208]">积分兑换</span>
            </div>
          </div>
          <div className="p-4 grid grid-cols-3 gap-3">
            {gifts.map((gift) => (
              <button key={gift.id} className="flex flex-col items-center gap-2 bg-[#FAF7F4] rounded-xl p-3">
                <span className="text-2xl">{gift.image}</span>
                <p className="text-xs font-semibold text-[#1A1208] text-center">{gift.name}</p>
                <p className="text-[10px] text-[#B8973A] font-medium">{gift.points} 积分</p>
              </button>
            ))}
          </div>
        </div>

        {/* 积分记录 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F9F5F0]">
            <span className="text-sm font-bold text-[#1A1208]">积分明细</span>
          </div>
          <div>
            {history.map(({ id, desc, points, date, type }, idx) => (
              <div
                key={id}
                className={`flex items-center px-4 py-3.5 ${
                  idx < history.length - 1 ? "border-b border-[#F9F5F0]" : ""
                }`}
              >
                <div className="flex-1">
                  <p className="text-sm text-[#1A1208]">{desc}</p>
                  <p className="text-[11px] text-[#8C7B6B] mt-0.5">{date}</p>
                </div>
                <span
                  className={`text-sm font-bold ${
                    type === "earn" ? "text-[#4A7C59]" : "text-red-400"
                  }`}
                >
                  {points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
