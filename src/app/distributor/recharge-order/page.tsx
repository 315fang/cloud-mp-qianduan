"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wallet, Clock, CheckCircle2, XCircle } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

type Status = "pending" | "paid" | "failed";

export default function RechargeOrderPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | Status>("all");

  const orders: { no: string; amount: string; status: Status; date: string; method: string }[] = [
    { no: "CZ202412010001", amount: "5,000.00", status: "paid", date: "2024-12-01 10:24", method: "微信支付" },
    { no: "CZ202411280042", amount: "2,000.00", status: "pending", date: "2024-11-28 16:08", method: "微信支付" },
    { no: "CZ202411250018", amount: "3,000.00", status: "failed", date: "2024-11-25 09:15", method: "微信支付" },
    { no: "CZ202411200007", amount: "8,000.00", status: "paid", date: "2024-11-20 14:30", method: "微信支付" },
  ];

  const filtered = tab === "all" ? orders : orders.filter((o) => o.status === tab);

  const statusMeta = (s: Status) => {
    if (s === "paid") return { label: "已完成", color: "text-[#5A8A5A] bg-[#EEF6EE]", icon: <CheckCircle2 size={14} className="text-[#5A8A5A]" />, desc: "货款已到账，可用于采购" };
    if (s === "pending") return { label: "待支付", color: "text-[#C8973A] bg-[#FFF7E6]", icon: <Clock size={14} className="text-[#C8973A]" />, desc: "订单未完成支付，请尽快支付" };
    return { label: "已失败", color: "text-[#B5564E] bg-[#FBEDEC]", icon: <XCircle size={14} className="text-[#B5564E]" />, desc: "支付失败，款项未扣除，可重新发起" };
  };

  const onComingSoon = () => alert("功能开发中");

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4]">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A1208] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">货款充值订单</h1>
        </header>

        {/* Hero */}
        <div className="bg-[#1A1208] px-5 pb-6 pt-2">
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={18} className="text-[#B8973A]" />
            <span className="text-xs text-white/60">当前货款余额（元）</span>
          </div>
          <p className="text-4xl font-light text-white tabular-nums">¥16,000.00</p>
          <button
            onClick={onComingSoon}
            className="mt-5 w-full bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3 rounded-xl active:opacity-80"
          >
            充值货款
          </button>
        </div>

        <div className="px-4 py-5">
          {/* Tab */}
          <div className="flex bg-white rounded-xl p-1 mb-4">
            {[
              { key: "all" as const, label: "全部" },
              { key: "pending" as const, label: "待支付" },
              { key: "paid" as const, label: "已完成" },
              { key: "failed" as const, label: "已失败" },
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

          {/* 列表 */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl py-12 flex flex-col items-center gap-2">
              <Wallet size={32} className="text-[#D8CCBC]" />
              <p className="text-xs text-[#8C7B6B]">暂无充值订单</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((o, i) => {
                const m = statusMeta(o.status);
                return (
                  <div key={i} className="bg-white rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#A89685]">订单号 {o.no}</span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${m.color}`}>
                        {m.icon}
                        {m.label}
                      </span>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <div>
                        <p className="text-2xl font-light text-[#1A1208] tabular-nums">¥{o.amount}</p>
                        <p className="text-[11px] text-[#A89685] mt-1">{o.method} · {o.date}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#F5EFE8]">
                      <p className="text-[11px] text-[#8C7B6B] leading-relaxed mb-2">{m.desc}</p>
                      {o.status === "pending" && (
                        <button
                          onClick={onComingSoon}
                          className="w-full bg-[#1A1208] text-white text-xs font-bold py-2.5 rounded-lg active:opacity-80"
                        >
                          继续支付
                        </button>
                      )}
                      {o.status === "failed" && (
                        <button
                          onClick={onComingSoon}
                          className="w-full border border-[#B8973A] text-[#B8973A] text-xs font-bold py-2.5 rounded-lg active:opacity-80"
                        >
                          重新发起
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
