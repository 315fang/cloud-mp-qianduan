"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import GoldHeroCard from "@/components/GoldHeroCard";

export default function FundPoolPage() {
  const router = useRouter();

  const myTotal = "12,860.00";

  const platformPools = [
    { name: "新人培育池", balance: "286,400" },
    { name: "团队激励池", balance: "512,800" },
    { name: "门店扶持池", balance: "184,200" },
    { name: "平台储备池", balance: "920,600" },
  ];

  const myPools = [
    { name: "新人培育池", value: "3,200.00" },
    { name: "团队激励池", value: "5,860.00" },
    { name: "门店扶持池", value: "1,400.00" },
    { name: "平台储备池", value: "2,400.00" },
  ];

  const records = [
    { type: "in", title: "团队业绩贡献", pool: "团队激励池", amount: "+186.00", date: "2024-12-01 10:24" },
    { type: "in", title: "新人订单贡献", pool: "新人培育池", amount: "+42.00", date: "2024-11-30 18:12" },
    { type: "out", title: "门店扶持发放", pool: "门店扶持池", amount: "-120.00", date: "2024-11-28 09:40" },
    { type: "in", title: "团队业绩贡献", pool: "团队激励池", amount: "+208.00", date: "2024-11-25 14:30" },
  ];

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4] pb-8">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#FAF7F4] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-[#3D2B1A]" />
          </button>
          <h1 className="text-base font-bold text-[#1A1208]">基金贡献</h1>
        </header>

        {/* 个人累计贡献头卡 */}
        <GoldHeroCard
          brand="问兰基金"
          sub="FUND POOL"
          badge={<span className="text-[9px] font-bold text-[#E7C977] border border-[#E7C977]/40 rounded-full px-2 py-0.5 tracking-widest">贡献</span>}
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={15} className="text-[#E7C977]" />
            <span className="text-[10px] text-[#C9B68C]/80 tracking-[0.18em]">我的累计贡献（元）</span>
          </div>
          <div className="flex items-end gap-1.5 mt-1.5">
            <span className="text-xl font-bold mb-1.5 text-[#E7C977]">¥</span>
            <span className="text-[40px] leading-none font-bold bg-gradient-to-b from-[#F8EBC6] to-[#CDA047] bg-clip-text text-transparent tabular-nums">
              {myTotal}
            </span>
          </div>
          <p className="text-[11px] text-[#C9B68C]/70 mt-2 leading-relaxed">
            您的消费与团队业绩按规则贡献至平台基金池，用于全员激励与扶持。
          </p>
        </GoldHeroCard>

        <div className="px-4 py-5 space-y-4">
          {/* 第一层：平台池子总览 */}
          <div className="bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#1A1208]">平台池子总览</h3>
              <span className="text-[11px] text-[#A89685]">全平台实时</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {platformPools.map((p) => (
                <div key={p.name} className="bg-[#FAF7F4] rounded-xl p-3">
                  <p className="text-[11px] text-[#8C7B6B]">{p.name}</p>
                  <p className="text-base font-bold text-[#1A1208] mt-1 tabular-nums">¥{p.balance}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 第二层：我的四池贡献 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-3">我的各池贡献</h3>
            <div className="space-y-3">
              {myPools.map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <span className="text-sm text-[#3D2B1A]">{p.name}</span>
                  <span className="text-sm font-bold text-[#B8973A] tabular-nums">¥{p.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 贡献记录列表 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-3">贡献记录</h3>
            <div className="space-y-2">
              {records.map((r, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#F5EFE8] last:border-0">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${r.type === "in" ? "bg-[#EEF6EE]" : "bg-[#FBEDEC]"}`}>
                      {r.type === "in"
                        ? <ArrowUpRight size={15} className="text-[#5A8A5A]" />
                        : <ArrowDownRight size={15} className="text-[#B5564E]" />}
                    </div>
                    <div>
                      <p className="text-sm text-[#1A1208]">{r.title}</p>
                      <p className="text-[11px] text-[#A89685] mt-0.5">{r.pool} · {r.date}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold tabular-nums ${r.type === "in" ? "text-[#5A8A5A]" : "text-[#B5564E]"}`}>
                    {r.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
