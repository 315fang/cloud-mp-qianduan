"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users, Clock } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const groups = [
  { id: "g1", productName: "臻润修护精华液 30ml", image: "/images/product-serum.png", originalPrice: 388, groupPrice: 268, groupSize: 3, joinedCount: 2, expireHours: 24, totalJoined: 3421 },
  { id: "g2", productName: "焕亮嫩肤面霜 50ml", image: "/images/product-cream.png", originalPrice: 268, groupPrice: 178, groupSize: 2, joinedCount: 1, expireHours: 48, totalJoined: 1876 },
  { id: "g3", productName: "深层补水面膜 5片装", image: "/images/product-mask.png", originalPrice: 196, groupPrice: 128, groupSize: 5, joinedCount: 4, expireHours: 12, totalJoined: 5230 },
  { id: "g4", productName: "修护精华眼霜 15ml", image: "/images/product-eye.png", originalPrice: 468, groupPrice: 318, groupSize: 3, joinedCount: 1, expireHours: 36, totalJoined: 987 },
];

export default function GroupPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"list" | "my">("list");

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">拼团</span>
          <div className="w-8" />
        </div>

        {/* 说明横幅 */}
        <div className="mx-4 mt-3 bg-gradient-to-r from-[#1A1208] to-[#3D2B1A] rounded-2xl px-4 py-3">
          <p className="text-[#B8973A] text-xs font-medium">拼团专享价</p>
          <p className="text-white font-bold mt-0.5">邀请好友一起拼，享受更低价格</p>
        </div>

        {/* Tab */}
        <div className="flex mx-4 mt-3 bg-[#F5EFE8] rounded-xl p-1">
          {[{ key: "list", label: "拼团商品" }, { key: "my", label: "我的拼团" }].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as "list" | "my")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === t.key ? "bg-white text-[#1A1208] shadow-sm" : "text-[#8C7B6B]"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {tab === "list" && groups.map(g => (
            <Link key={g.id} href={`/group/${g.id}`} className="block bg-white rounded-2xl overflow-hidden">
              <div className="flex gap-3 p-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F5EFE8] shrink-0">
                  <Image src={g.image} alt={g.productName} width={80} height={80} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1A1208] line-clamp-2">{g.productName}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-base font-bold text-[#E57373]">¥{g.groupPrice}</span>
                    <span className="text-xs line-through text-[#B8A898]">¥{g.originalPrice}</span>
                    <span className="text-[10px] bg-[#FFEBEE] text-[#E57373] px-1.5 py-0.5 rounded-full">{g.groupSize}人团</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-[#8C7B6B]">
                    <span className="flex items-center gap-1"><Users size={10} /> 需{g.groupSize}人成团</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {g.expireHours}h有效</span>
                  </div>
                </div>
              </div>
              {/* 拼团进度 */}
              <div className="border-t border-[#F5EFE8] px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: g.groupSize }).map((_, i) => (
                    <div key={i} className={`w-5 h-5 rounded-full border-2 ${i < g.joinedCount ? "bg-[#B8973A] border-[#B8973A]" : "bg-[#F5EFE8] border-[#D4C0A8]"} flex items-center justify-center`}>
                      {i < g.joinedCount && <span className="text-white text-[8px]">✓</span>}
                    </div>
                  ))}
                  <span className="text-xs text-[#8C7B6B] ml-1">还差 {g.groupSize - g.joinedCount} 人</span>
                </div>
                <button className="bg-[#E57373] text-white text-xs px-3 py-1.5 rounded-lg font-medium">去拼团</button>
              </div>
            </Link>
          ))}

          {tab === "my" && (
            <div className="flex flex-col items-center py-16 gap-3">
              <Users size={40} className="text-[#D4C0A8]" strokeWidth={1.5} />
              <p className="text-sm text-[#8C7B6B]">还没有参与拼团</p>
              <button onClick={() => setTab("list")} className="text-sm text-[#B8973A]">去参与拼团</button>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
