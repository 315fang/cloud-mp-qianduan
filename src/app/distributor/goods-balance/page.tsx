"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ArrowUpRight, ArrowDownRight, X, ChevronRight,
  Lock, Inbox, AlertCircle, RefreshCw,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import GoldHeroCard, { GoldDivider } from "@/components/GoldHeroCard";

type Flow = "all" | "in" | "out";
type ListState = "ready" | "loading" | "error" | "empty";

export default function GoodsBalancePage() {
  const router = useRouter();
  const [tab, setTab] = useState<Flow>("all");
  const [showRecharge, setShowRecharge] = useState(false);
  const [amount, setAmount] = useState("");
  // 是否为代理商（演示可切换）
  const [isAgent, setIsAgent] = useState(true);
  // 流水区运行态（演示可切换）：ready / loading / error / empty
  const [listState, setListState] = useState<ListState>("ready");

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

  // 仅代理商可使用：整页权限限制态
  if (!isAgent) {
    return (
      <PhoneFrame>
        <div className="min-h-full bg-[#FAF7F4] flex flex-col">
          <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#FAF7F4] px-4 py-3">
            <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
              <ArrowLeft size={20} className="text-[#3D2B1A]" />
            </button>
            <h1 className="text-base font-bold text-[#1A1208]">货款余额</h1>
            <button onClick={() => setIsAgent(true)} className="ml-auto text-[10px] text-[#A89685] underline">
              演示代理商
            </button>
          </header>
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center -mt-10">
            <div className="w-20 h-20 rounded-3xl bg-[#F0E6C8] flex items-center justify-center mb-5">
              <Lock size={36} className="text-[#B8973A]" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-bold text-[#1A1208]">仅代理商可使用</h2>
            <p className="text-sm text-[#8C7B6B] mt-2.5 leading-relaxed">
              货款余额为代理商专属功能，用于采购扣款与货款充值管理。您当前的账号暂未开通代理商权限。
            </p>
            <Link
              href="/distributor/apply"
              className="mt-6 bg-[#B8973A] text-[#1A1208] text-sm font-bold px-8 py-3 rounded-xl active:opacity-80"
            >
              申请成为代理商
            </Link>
            <button onClick={() => router.back()} className="mt-3 text-sm text-[#8C7B6B]">
              返回上一页
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4] pb-8">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#FAF7F4] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-[#3D2B1A]" />
          </button>
          <h1 className="text-base font-bold text-[#1A1208]">货款余额</h1>
          <button onClick={() => setIsAgent(false)} className="ml-auto text-[10px] text-[#A89685] underline">
            演示权限态
          </button>
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
          {/* 流水态演示切换 */}
          <div className="flex items-center gap-1.5 mb-3 overflow-x-auto">
            {([
              { key: "ready", label: "有数据" },
              { key: "loading", label: "加载中" },
              { key: "error", label: "加载失败" },
              { key: "empty", label: "空状态" },
            ] as const).map((s) => (
              <button
                key={s.key}
                onClick={() => setListState(s.key)}
                className={`shrink-0 text-[10px] px-2.5 py-1 rounded-full border ${
                  listState === s.key
                    ? "border-[#B8973A] text-[#B8973A] bg-[#F5EFE8]"
                    : "border-[#E5DDD0] text-[#A89685]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

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
          {listState === "loading" ? (
            /* 加载中骨架态 */
            <div className="space-y-4">
              {[0, 1].map((g) => (
                <div key={g}>
                  <div className="h-3 w-20 bg-[#EDE4D6] rounded mb-2 ml-1 animate-pulse" />
                  <div className="bg-white rounded-2xl p-4 space-y-3">
                    {[0, 1].map((i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#F0EAE0] animate-pulse" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3 w-2/3 bg-[#F0EAE0] rounded animate-pulse" />
                          <div className="h-2.5 w-1/4 bg-[#F0EAE0] rounded animate-pulse" />
                        </div>
                        <div className="h-3 w-14 bg-[#F0EAE0] rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : listState === "error" ? (
            /* 加载失败重试态 */
            <div className="bg-white rounded-2xl py-12 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FBEDEC] flex items-center justify-center mb-3">
                <AlertCircle size={26} className="text-[#B5564E]" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-[#1A1208]">货款流水加载失败</p>
              <p className="text-xs text-[#A89685] mt-1.5 leading-relaxed max-w-[220px]">
                网络异常或服务暂时不可用，请检查网络后重试。
              </p>
              <button
                onClick={() => setListState("ready")}
                className="mt-4 flex items-center gap-1.5 bg-[#1A1208] text-white text-sm font-medium px-6 py-2.5 rounded-full active:opacity-80"
              >
                <RefreshCw size={14} /> 重新加载
              </button>
            </div>
          ) : listState === "empty" ? (
            /* 空状态 */
            <div className="bg-white rounded-2xl py-12 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F5EFE8] flex items-center justify-center mb-3">
                <Inbox size={26} className="text-[#C8BAA8]" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-[#1A1208]">暂无货款流水</p>
              <p className="text-xs text-[#A89685] mt-1.5 leading-relaxed max-w-[220px]">
                您还没有任何货款收支记录，充值或采购扣款后将在此显示。
              </p>
            </div>
          ) : (
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
          )}
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
