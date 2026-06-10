"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, PiggyBank, ArrowDownLeft, ArrowUpRight, Info } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

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
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A1208] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">我的存钱罐</h1>
        </header>

        {/* 余额卡 */}
        <div className="bg-[#1A1208] px-5 pb-6 pt-2">
          <div className="flex items-center gap-2 mb-3">
            <PiggyBank size={18} className="text-[#B8973A]" />
            <span className="text-xs text-white/60">存钱罐余额（元）</span>
          </div>
          <p className="text-4xl font-light text-white tabular-nums">¥{balance}</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs text-white/50">冻结中 ¥{frozen}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button className="bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3 rounded-xl active:opacity-80">
              提现
            </button>
            <button className="bg-white/10 text-white text-sm font-bold py-3 rounded-xl active:opacity-80">
              转入余额
            </button>
          </div>
        </div>

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
