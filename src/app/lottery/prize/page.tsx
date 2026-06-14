"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trophy, MapPin, ChevronRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function LotteryPrizePage() {
  const router = useRouter();
  const [claimed, setClaimed] = useState(false);

  // 中奖奖品（实物需填写收货信息）
  const prize = {
    name: "雪绒花修护精华小样",
    spec: "5ml × 2",
    image: "/images/product-serum.png",
    type: "product" as const,
    wonAt: "2024-12-01 14:23",
  };

  const address = {
    name: "李静茵",
    phone: "158 2288 8888",
    detail: "上海市静安区南京西路 1111 号问兰大厦 101 室",
  };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4]">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#FAF7F4]/95 backdrop-blur px-4 py-3 border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-[#1A1208]" />
          </button>
          <h1 className="text-base font-bold text-[#1A1208]">领取奖品</h1>
        </header>

        <div className="px-4 py-5 space-y-4">
          {/* 中奖横幅 */}
          <div className="surface-noir rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#B8973A] flex items-center justify-center shrink-0">
              <Trophy size={24} className="text-[#1A1208]" />
            </div>
            <div>
              <p className="text-base font-bold text-white">恭喜中奖！</p>
              <p className="text-xs text-white/60 mt-0.5">中奖时间 {prize.wonAt}</p>
            </div>
          </div>

          {/* 奖品卡 */}
          <div className="bg-white rounded-2xl p-4 flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-[#F5EFE8] overflow-hidden shrink-0">
              <img src={prize.image || "/placeholder.svg"} alt={prize.name} className="w-full h-full object-contain p-2" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#1A1208]">{prize.name}</p>
              <p className="text-xs text-[#8C7B6B] mt-1">规格：{prize.spec}</p>
              <span className="inline-block mt-2 text-[10px] text-[#B8973A] border border-[#B8973A]/40 rounded-full px-2 py-0.5">
                实物奖品 · 需填写收货地址
              </span>
            </div>
          </div>

          {/* 收货地址（实物奖品需要） */}
          <button className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 text-left active:bg-[#FAF7F4] transition-colors">
            <MapPin size={20} className="text-[#B8973A] shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#1A1208]">{address.name}</span>
                <span className="text-xs text-[#8C7B6B]">{address.phone}</span>
              </div>
              <p className="text-xs text-[#8C7B6B] mt-1 leading-relaxed">{address.detail}</p>
            </div>
            <ChevronRight size={18} className="text-[#C8BAA8] shrink-0" />
          </button>

          {/* 说明 */}
          <div className="bg-white rounded-2xl p-4">
            <p className="text-xs text-[#8C7B6B] leading-relaxed">
              实物奖品请在 7 天内填写收货信息并领取，逾期视为放弃。奖品将在领取后 3-5 个工作日内发出，请耐心等待。
            </p>
          </div>
        </div>

        {/* 底部领取按钮 */}
        <div className="sticky bottom-0 bg-[#FAF7F4]/95 backdrop-blur px-4 py-3 border-t border-[#F0E8DC]">
          <button
            onClick={() => setClaimed(true)}
            disabled={claimed}
            className={`w-full text-sm font-bold py-3.5 rounded-xl transition-opacity ${
              claimed ? "bg-[#D8CCBC] text-white" : "bg-[#B8973A] text-[#1A1208] active:opacity-80"
            }`}
          >
            {claimed ? "已领取，等待发货" : "确认领取"}
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
