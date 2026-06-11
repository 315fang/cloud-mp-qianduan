"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Timer } from "lucide-react";
import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";

const groups = [
  {
    step: 1, title: "第 1 步 · 选基础精华", desc: "任选 1 件",
    items: [
      { id: "1", name: "焕颜臻萃精华", spec: "30ml", image: "/images/product-serum.png" },
      { id: "3", name: "玫瑰柔润水", spec: "150ml", image: "/images/product-toner.png" },
    ],
  },
  {
    step: 2, title: "第 2 步 · 选锁水面霜", desc: "任选 1 件",
    items: [
      { id: "2", name: "轻盈保湿面霜", spec: "50g", image: "/images/product-cream.png" },
      { id: "5", name: "紧致抗皱眼霜", spec: "15ml", image: "/images/product-eye.png" },
    ],
  },
  {
    step: 3, title: "第 3 步 · 选随身好物", desc: "任选 1 件",
    items: [
      { id: "4", name: "海藻焕肤面膜", spec: "5片", image: "/images/product-mask.png" },
      { id: "6", name: "轻透防晒乳", spec: "50ml", image: "/images/product-sunscreen.png" },
    ],
  },
];

const setPrice = 888;

export default function DiyActivityPage() {
  const router = useRouter();
  const [picks, setPicks] = useState<Record<number, string>>({});
  const selectedCount = Object.keys(picks).length;
  const allDone = selectedCount === groups.length;

  return (
    <PhoneFrame hideNav>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <button onClick={() => router.back()} className="absolute top-14 left-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm" aria-label="返回">
          <ArrowLeft size={18} className="text-white" />
        </button>

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Hero */}
          <div className="relative px-5 pt-16 pb-6 surface-noir text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #D4AF5A, transparent 70%)" }} />
            <p className="text-[10px] tracking-[0.3em] text-[#D4AF5A] uppercase mb-1">DIY Bundle</p>
            <h1 className="text-2xl font-bold">随心选专场</h1>
            <p className="text-sm text-white/70 mt-2">自由搭配 3 件好物，享专属套装价 ¥{setPrice}</p>
            <div className="flex items-center gap-2 mt-3 text-[#D4AF5A]">
              <Timer size={15} />
              <span className="text-xs">距结束 02 天 06:24:18</span>
            </div>
          </div>

          {/* 步骤选品 */}
          <div className="px-4 mt-4 space-y-4">
            {groups.map((g) => (
              <div key={g.step} className="bg-white rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${picks[g.step] ? "bg-[#B8973A] text-white" : "bg-[#F5EFE8] text-[#8C7B6B]"}`}>{g.step}</span>
                  <h2 className="text-sm font-bold text-[#1A1208]">{g.title}</h2>
                  <span className="ml-auto text-[11px] text-[#8C7B6B]">{g.desc}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {g.items.map((item) => {
                    const active = picks[g.step] === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setPicks({ ...picks, [g.step]: item.id })}
                        className={`relative text-left rounded-xl border-2 p-2 transition-all ${active ? "border-[#B8973A] bg-[#FFF7E6]" : "border-[#F0E8DC] bg-white"}`}
                      >
                        {active && <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#B8973A] flex items-center justify-center"><Check size={12} className="text-white" /></span>}
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#F5EFE8] mb-2">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <p className="text-xs font-medium text-[#1A1208] truncate">{item.name}</p>
                        <p className="text-[11px] text-[#8C7B6B]">{item.spec}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部汇总浮层 */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F0E8DC] px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-[#8C7B6B]">已选 {selectedCount}/{groups.length} 件</p>
            <p className="text-lg font-bold text-[#B8973A] leading-tight">¥{setPrice}</p>
          </div>
          <button
            disabled={!allDone}
            className={`px-8 py-3 text-sm font-bold rounded-xl ${allDone ? "bg-[#B8973A] text-white" : "bg-[#E8DDD0] text-[#8C7B6B]"}`}
          >
            {allDone ? "确认搭配" : `还差 ${groups.length - selectedCount} 件`}
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
