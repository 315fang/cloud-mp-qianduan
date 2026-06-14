"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, PiggyBank, ArrowDownLeft, ArrowUpRight, Info } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import GoldHeroCard, { GoldDivider } from "@/components/GoldHeroCard";

export default function SavingsJarPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | "in" | "out">("all");

  const balance = "2,386.50";
  const frozen = "320.00";

  const records = [
    { type: "in", title: "团队佣金结算", amount: "+128.40", date: "2024-12-01 10:24", note: "11月团队分佣" },
    { type: "in", title: "直推佣金", amount: "+56.00", date: "2024-11-30 16:08", note: "订单 #WL202411..." },
    { type: "out", title: "提现至微信", amount: "-500.00", date: "2024-11-28 09:15", note: "提现申请" },
    { type: "in", title: "复购奖励", amount: "+32.80", date: "2024-11-25 14:30", note: "会员复购" },
    { type: "out", title: "转入余额", amount: "-200.00", date: "2024-11-20 11:00", note: "转入购物余额" },
  ];

  const filtered = tab === "all" ? records : records.filter((r) => r.type === tab);

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4]">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#FAF7F4] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-[#3D2B1A]" />
          </button>
          <h1 className="text-base font-bold text-[#1A1208]">我的存钱罐</h1>
        </header>

        {/* 余额卡 */}
        <GoldHeroCard
          brand="问兰存钱罐"
          sub="SAVINGS JAR"
          badge={<span className="text-[9px] font-bold text-[#E7C977] border border-[#E7C977]/40 rounded-full px-2 py-0.5 tracking-widest">收益归集</span>}
        >
          <div className="flex items-center gap-2">
            <PiggyBank size={15} className="text-[#E7C977]" />
            <span className="text-[10px] text-[#C9B68C]/80 tracking-[0.18em]">存钱罐余额（元）</span>
          </div>
          <div className="flex items-end gap-1.5 mt-1.5">
            <span className="text-xl font-bold mb-1.5 text-[#E7C977]">¥</span>
            <span className="text-[40px] leading-none font-bold bg-gradient-to-b from-[#F8EBC6] to-[#CDA047] bg-clip-text text-transparent tabular-nums">
              {balance}
            </span>
          </div>
          <p className="text-[11px] text-[#C9B68C]/70 mt-2">冻结中 ¥{frozen}</p>
          <GoldDivider className="mt-4" />
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="bg-[#B8973A] text-white text-sm font-bold py-2.5 rounded-xl active:opacity-80">
              提现
            </button>
            <button className="bg-[#E7C977]/10 border border-[#E7C977]/30 text-[#F1E4C4] text-sm font-bold py-2.5 rounded-xl active:opacity-80">
              转入余额
            </button>
          </div>
        </GoldHeroCard>

        <div className="px-4 py-5 space-y-4">
          {/* 说明条 */}
          <div className="bg-[#FFF7E6] rounded-xl p-3 flex items-start gap-2">
            <Info size={14} className="text-[#B8973A] mt-0.5 shrink-0" />
            <p className="text-[11px] text-[#8C7B6B] leading-relaxed">
              存钱罐用于归集您的佣金收益。佣金结算后将进入存钱罐，可申请提现或转入购物余额。冻结金额为待结算部分。
            </p>
          </div>

          {/* Tab + 明细 */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="flex border-b border-[#F0E8DC]">
              {[
                { key: "all" as const, label: "全部" },
                { key: "in" as const, label: "收入" },
                { key: "out" as const, label: "支出" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                    tab === t.key ? "text-[#B8973A]" : "text-[#8C7B6B]"
                  }`}
                >
                  {t.label}
                  {tab === t.key && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#B8973A] rounded-full" />}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="py-12 flex flex-col items-center gap-2">
                <PiggyBank size={32} className="text-[#D8CCBC]" />
                <p className="text-xs text-[#8C7B6B]">暂无记录</p>
              </div>
            ) : (
              <div>
                {filtered.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[#F5EFE8] last:border-0">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      r.type === "in" ? "bg-[#F0E6C8]" : "bg-[#F5EFE8]"
                    }`}>
                      {r.type === "in"
                        ? <ArrowDownLeft size={16} className="text-[#B8973A]" />
                        : <ArrowUpRight size={16} className="text-[#8C7B6B]" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1A1208]">{r.title}</p>
                      <p className="text-[11px] text-[#A89685] mt-0.5">{r.date} · {r.note}</p>
                    </div>
                    <span className={`text-sm font-bold tabular-nums ${
                      r.type === "in" ? "text-[#B8973A]" : "text-[#1A1208]"
                    }`}>
                      {r.amount}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
