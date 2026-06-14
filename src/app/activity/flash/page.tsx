"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Zap, Info } from "lucide-react";
import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";

const flashItems = [
  { id: "1", name: "焕颜臻萃精华", spec: "30ml", image: "/images/product-serum.png", flashPrice: 398, originalPrice: 598, sold: 82, total: 100, status: "抢购中" },
  { id: "4", name: "海藻焕肤面膜", spec: "5片/盒", image: "/images/product-mask.png", flashPrice: 128, originalPrice: 198, sold: 200, total: 200, status: "已抢完" },
  { id: "2", name: "轻盈保湿面霜", spec: "50g", image: "/images/product-cream.png", flashPrice: 298, originalPrice: 428, sold: 0, total: 80, status: "即将开始" },
  { id: "5", name: "紧致抗皱眼霜", spec: "15ml", image: "/images/product-eye.png", flashPrice: 328, originalPrice: 468, sold: 45, total: 120, status: "抢购中" },
];

const statusStyle: Record<string, { btn: string; cls: string }> = {
  "抢购中": { btn: "立即抢购", cls: "bg-[#D14343] text-white" },
  "已抢完": { btn: "已抢完", cls: "bg-[#E8DDD0] text-[#8C7B6B]" },
  "即将开始": { btn: "即将开始", cls: "bg-[#1A1208] text-white" },
};

export default function FlashSalePage() {
  const router = useRouter();
  const [time, setTime] = useState({ h: 2, m: 36, s: 18 });

  useEffect(() => {
    const t = setInterval(() => {
      setTime((p) => {
        let { h, m, s } = p;
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <PhoneFrame hideNav>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <button onClick={() => router.back()} className="absolute top-14 left-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm" aria-label="返回">
          <ArrowLeft size={18} className="text-white" />
        </button>

        <div className="flex-1 overflow-y-auto pb-6">
          {/* 活动横幅 + 倒计时 */}
          <div className="relative px-5 pt-16 pb-6 text-white overflow-hidden" style={{ background: "linear-gradient(135deg, #B83232 0%, #1A1208 100%)" }}>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={20} className="text-[#FFD66B] fill-[#FFD66B]" />
              <h1 className="text-2xl font-bold">限时抢购</h1>
            </div>
            <p className="text-sm text-white/80 mb-4">每日精选好物，限量秒杀价</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/80">距本场结束</span>
              {[time.h, time.m, time.s].map((n, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="w-9 h-9 bg-black/30 rounded-lg flex items-center justify-center text-base font-bold">{pad(n)}</span>
                  {i < 2 && <span className="text-white/60">:</span>}
                </span>
              ))}
            </div>
          </div>

          {/* 规则提示条 */}
          <div className="mx-4 mt-3 bg-[#FFF3E6] rounded-xl px-3 py-2.5 flex items-center gap-2">
            <Info size={14} className="text-[#E8975A] shrink-0" />
            <p className="text-[11px] text-[#8C5A1A]">每人每款限购 1 件，下单后 15 分钟内未支付自动释放库存。</p>
          </div>

          {/* 商品列表 */}
          <div className="px-4 mt-3 space-y-3">
            {flashItems.map((item) => {
              const pct = Math.round((item.sold / item.total) * 100);
              const ss = statusStyle[item.status];
              return (
                <div key={item.id} className="bg-white rounded-2xl p-3 flex gap-3">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#F5EFE8] shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <p className="text-sm font-bold text-[#1A1208]">{item.name}</p>
                    <p className="text-[11px] text-[#8C7B6B]">{item.spec}</p>
                    <div className="flex items-end gap-1.5 mt-1">
                      <span className="text-lg font-bold text-[#D14343]">¥{item.flashPrice}</span>
                      <span className="text-xs text-[#B8A898] line-through mb-0.5">¥{item.originalPrice}</span>
                    </div>
                    {/* 库存进度 */}
                    <div className="mt-1.5">
                      <div className="h-3.5 bg-[#F5EFE8] rounded-full overflow-hidden relative">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #E8975A, #D14343)" }} />
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">已抢 {pct}%</span>
                      </div>
                    </div>
                  </div>
                  <button disabled={item.status !== "抢购中"} className={`self-end px-3 py-2 text-xs font-bold rounded-lg shrink-0 ${ss.cls}`}>{ss.btn}</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
