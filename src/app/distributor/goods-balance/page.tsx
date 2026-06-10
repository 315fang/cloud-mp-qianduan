"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ArrowUpRight, ArrowDownRight, X, ChevronRight,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import GoldHeroCard, { GoldDivider } from "@/components/GoldHeroCard";

type Flow = "all" | "in" | "out";

export default function GoodsBalancePage() {
  const router = useRouter();
  const [tab, setTab] = useState<Flow>("all");
  const [showRecharge, setShowRecharge] = useState(false);
  const [amount, setAmount] = useState("");

  const summary = [
    { label: "冻结中", value: "2,000.00" },
    { label: "累计充值", value: "48,000.00" },
    { label: "累计扣减", value: "32,000.00" },
  ];

  const groups = [
    {
      date: "2024-12-01",
      items: [
        { type: "out" as const, title: "采购扣款 · 订货单 DH8821", amount: "-3,200.00", time: "10:24" },
        { type: "in" as const, title: "货款充值到账", amount: "+5,000.00", time: "09:12" },
      ],
    },
    {
      date: "2024-11-28",
      items: [
        { type: "out" as const, title: "采购扣款 · 订货单 DH8810", amount: "-1,800.00", time: "16:40" },
      ],
    },
    {
      date: "2024-11-25",
      items: [
        { type: "in" as const, title: "团队划拨转入", amount: "+2,000.00", time: "14:30" },
        { type: "out" as const, title: "采购扣款 · 订货单 DH8792", amount: "-960.00", time: "11:05" },
      ],
    },
  ];

  const quickAmounts = ["1000", "3000", "5000", "10000"];

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4] pb-8">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#FAF7F4] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-[#3D2B1A]" />
          </button>
          <h1 className="text-base font-bold text-[#1A1208]">货款余额</h1>
        </header>

        {/* Hero */}
        <GoldHeroCard
          brand="问兰货款"
          sub="GOODS BALANCE"
          badge={<span className="text-[9px] font-bold text-[#E7C977] border border-[#E7C977]/40 rounded-full px-2 py-0.5 tracking-widest">余额</span>}
        >
          <span className="text-[10px] text-[#C9B68C]/80 tracking-[0.18em]">可用货款余额（元）</span>
          <div className="flex items-end gap-1.5 mt-1.5">
            <span className="text-xl font-bold mb-1.5 text-[#E7C977]">¥</span>
            <span className="text-[40px] leading-none font-bold bg-gradient-to-b from-[#F8EBC6] to-[#CDA047] bg-clip-text text-transparent tabular-nums">
              16,000.00
            </span>
          </div>
          <GoldDivider className="mt-4" />
          <div className="grid grid-cols-3 gap-2 mt-3">
            {summary.map((s) => (
              <div key={s.label}>
                <p className="text-[10px] text-[#C9B68C]/60">{s.label}</p>
                <p className="text-sm font-medium text-[#F1E4C4] tabular-nums mt-0.5">¥{s.value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setShowRecharge(true)}
              className="flex-1 bg-[#B8973A] text-white text-sm font-bold py-2.5 rounded-xl active:opacity-80"
            >
              充值货款
            </button>
            <Link
              href="/distributor/recharge-order"
              className="flex items-center gap-1 border border-[#E7C977]/30 bg-[#E7C977]/10 text-[#F1E4C4] text-sm font-medium px-4 py-2.5 rounded-xl active:opacity-70"
            >
              充值订单 <ChevronRight size={14} />
            </Link>
          </div>
        </GoldHeroCard>

        <div className="px-4 py-5">
          {/* 筛选 */}
          <div className="flex bg-white rounded-xl p-1 mb-4">
            {[
              { key: "all" as const, label: "全部" },
              { key: "in" as const, label: "入账" },
              { key: "out" as const, label: "支出" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${
                  tab === t.key ? "bg-[#B8973A] text-[#1A1208]" : "text-[#8C7B6B]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* 按日期分组流水 */}
          <div className="space-y-4">
            {groups.map((g) => {
              const items = g.items.filter((it) => tab === "all" || it.type === tab);
              if (items.length === 0) return null;
              return (
                <div key={g.date}>
                  <p className="text-[11px] text-[#A89685] mb-2 px-1">{g.date}</p>
                  <div className="bg-white rounded-2xl p-4 space-y-2">
                    {items.map((it, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-[#F5EFE8] last:border-0">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${it.type === "in" ? "bg-[#EEF6EE]" : "bg-[#FBEDEC]"}`}>
                            {it.type === "in"
                              ? <ArrowUpRight size={15} className="text-[#5A8A5A]" />
                              : <ArrowDownRight size={15} className="text-[#B5564E]" />}
                          </div>
                          <div>
                            <p className="text-sm text-[#1A1208] leading-snug">{it.title}</p>
                            <p className="text-[11px] text-[#A89685] mt-0.5">{it.time}</p>
                          </div>
                        </div>
                        <span className={`text-sm font-bold tabular-nums ${it.type === "in" ? "text-[#5A8A5A]" : "text-[#B5564E]"}`}>
                          {it.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 充值半屏面板 */}
        {showRecharge && (
          <div className="fixed inset-0 z-50 max-w-[420px] mx-auto">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowRecharge(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5 pb-7">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#1A1208]">充值货款</h3>
                <button onClick={() => setShowRecharge(false)} className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F5EFE8]">
                  <X size={15} className="text-[#8C7B6B]" />
                </button>
              </div>
              <div className="flex items-center bg-[#F5EFE8] rounded-xl px-4 py-3 mb-3">
                <span className="text-2xl font-light text-[#1A1208]">¥</span>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ""))}
                  inputMode="numeric"
                  placeholder="请输入充值金额"
                  className="flex-1 ml-2 bg-transparent text-2xl font-light text-[#1A1208] outline-none placeholder:text-[#C8BAA8] placeholder:text-base"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mb-5">
                {quickAmounts.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAmount(a)}
                    className={`py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      amount === a ? "bg-[#B8973A] text-[#1A1208]" : "bg-[#F5EFE8] text-[#3D2B1A]"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <button
                onClick={() => alert("功能开发中")}
                className="w-full bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3.5 rounded-xl active:opacity-80"
              >
                确认充值
              </button>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
