"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users, Clock, Scissors } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const activities = [
  { id: "s1", productName: "臻润修护精华液 30ml", image: "/images/product-serum.png", originalPrice: 388, floorPrice: 188, maxHelpers: 5, expireHours: 24, helpersCount: 1231 },
  { id: "s2", productName: "焕亮嫩肤面霜 50ml", image: "/images/product-cream.png", originalPrice: 268, floorPrice: 128, maxHelpers: 3, expireHours: 48, helpersCount: 876 },
  { id: "s3", productName: "深层补水面膜 5片装", image: "/images/product-mask.png", originalPrice: 196, floorPrice: 88, maxHelpers: 10, expireHours: 72, helpersCount: 2340 },
];

const myRecords = [
  { id: "m1", productName: "臻润修护精华液 30ml", image: "/images/product-serum.png", currentPrice: 228, floorPrice: 188, helpers: 3, maxHelpers: 5, status: "active", expireAt: "2024-12-15 18:00" },
];

export default function SlashPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"activities" | "my">("activities");

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">砍一刀</span>
          <div className="w-8" />
        </div>

        {/* 说明卡 */}
        <div className="mx-4 mt-3 surface-noir rounded-2xl px-4 py-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] bg-[#B8973A] text-white px-2 py-0.5 rounded-full">全员可参与</span>
            <p className="text-white font-bold mt-1">发起砍价，好友帮砍</p>
            <p className="text-white/60 text-xs mt-0.5">分享给好友，每人帮你砍一刀</p>
          </div>
          <Scissors size={36} className="text-[#B8973A]" strokeWidth={1.5} />
        </div>

        {/* Tab */}
        <div className="flex mx-4 mt-3 bg-[#F5EFE8] rounded-xl p-1">
          {[{ key: "activities", label: "砍价商品" }, { key: "my", label: "我的砍价" }].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as "activities" | "my")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === t.key ? "bg-white text-[#1A1208] shadow-sm" : "text-[#8C7B6B]"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {tab === "activities" && activities.map(a => (
            <Link key={a.id} href={`/slash/${a.id}`} className="block bg-white rounded-2xl overflow-hidden">
              <div className="flex gap-3 p-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F5EFE8] shrink-0">
                  <Image src={a.image} alt={a.productName} width={80} height={80} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1A1208] line-clamp-2">{a.productName}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="text-center">
                      <p className="text-xs text-[#8C7B6B]">原价</p>
                      <p className="text-sm line-through text-[#B8A898]">¥{a.originalPrice}</p>
                    </div>
                    <div className="text-[#B8A898]">→</div>
                    <div className="text-center">
                      <p className="text-xs text-[#8C7B6B]">底价</p>
                      <p className="text-sm font-bold text-[#E57373]">¥{a.floorPrice}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-[#8C7B6B]">
                    <span className="flex items-center gap-1"><Users size={10} /> 最多{a.maxHelpers}人帮砍</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {a.expireHours}h有效</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-[#F5EFE8] px-3 py-2 flex items-center justify-between">
                <span className="text-xs text-[#8C7B6B]">已有 {a.helpersCount}+ 人参与</span>
                <button className="bg-[#E57373] text-white text-xs px-3 py-1.5 rounded-lg font-medium">发起砍价</button>
              </div>
            </Link>
          ))}

          {tab === "my" && (
            myRecords.length > 0 ? myRecords.map(r => (
              <div key={r.id} className="bg-white rounded-2xl p-4">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F5EFE8] shrink-0">
                    <Image src={r.image} alt={r.productName} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1A1208]">{r.productName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-base font-bold text-[#E57373]">¥{r.currentPrice}</span>
                      <span className="text-xs text-[#8C7B6B]">底价 ¥{r.floorPrice}</span>
                    </div>
                  </div>
                  <span className="text-xs text-[#388E3C] bg-[#E8F5E9] px-2 py-0.5 rounded-full h-fit">进行中</span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-[#8C7B6B] mb-1">
                    <span>已有 {r.helpers}/{r.maxHelpers} 人帮砍</span>
                    <span>截止 {r.expireAt}</span>
                  </div>
                  <div className="h-2 bg-[#F5EFE8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#E57373] rounded-full" style={{ width: `${(r.helpers / r.maxHelpers) * 100}%` }} />
                  </div>
                </div>
                <button className="mt-3 w-full py-2.5 bg-[#1A1208] text-white text-sm rounded-xl font-medium">
                  邀请好友帮我砍
                </button>
              </div>
            )) : (
              <div className="flex flex-col items-center py-16 gap-3">
                <Scissors size={40} className="text-[#D4C0A8]" strokeWidth={1.5} />
                <p className="text-sm text-[#8C7B6B]">还没有砍价记录</p>
                <button onClick={() => setTab("activities")} className="text-sm text-[#B8973A]">去发起砍价</button>
              </div>
            )
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
