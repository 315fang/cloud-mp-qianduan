"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowLeftRight, TrendingUp, TrendingDown } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function FundTransferHistoryPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | "in" | "out">("all");

  const summary = {
    totalIn: "12,800.00",
    totalOut: "8,400.00",
    count: 26,
  };

  const records = [
    { dir: "in", target: "总部货款充值", amount: "+5,000.00", status: "已到账", date: "2024-12-01 10:24", no: "HK202412010001" },
    { dir: "out", target: "下级经销商 · 李静茵", amount: "-2,000.00", status: "已划拨", date: "2024-11-28 16:08", no: "HK202411280042" },
    { dir: "in", target: "佣金转货款", amount: "+1,200.00", status: "已到账", date: "2024-11-25 09:15", no: "HK202411250018" },
    { dir: "out", target: "下级经销商 · 王敏", amount: "-3,000.00", status: "处理中", date: "2024-11-20 14:30", no: "HK202411200007" },
    { dir: "out", target: "采购扣减", amount: "-1,400.00", status: "已划拨", date: "2024-11-18 11:00", no: "HK202411180003" },
  ];

  const filtered = tab === "all" ? records : records.filter((r) => r.dir === tab);

  const statusColor = (s: string) =>
    s === "处理中" ? "text-[#C8973A] bg-[#FFF7E6]" : "text-[#5A8A5A] bg-[#EEF6EE]";

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4]">
        <header className="sticky top-0 z-10 flex items-center gap-3 surface-noir px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">货款划拨记录</h1>
        </header>

        {/* 统计卡 */}
        <div className="surface-noir px-5 pb-6 pt-2">
          <div className="flex items-center gap-2 mb-4">
            <ArrowLeftRight size={18} className="text-[#B8973A]" />
            <span className="text-xs text-white/60">累计划拨概览</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-[11px] text-white/50">累计转入</p>
              <p className="text-lg font-light text-[#B8973A] tabular-nums mt-1">¥{summary.totalIn}</p>
            </div>
            <div>
              <p className="text-[11px] text-white/50">累计转出</p>
              <p className="text-lg font-light text-white tabular-nums mt-1">¥{summary.totalOut}</p>
            </div>
            <div>
              <p className="text-[11px] text-white/50">总笔数</p>
              <p className="text-lg font-light text-white tabular-nums mt-1">{summary.count}</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-5">
          {/* Tab */}
          <div className="flex bg-white rounded-xl p-1 mb-4">
            {[
              { key: "all" as const, label: "全部" },
              { key: "in" as const, label: "转入" },
              { key: "out" as const, label: "转出" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
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
              <ArrowLeftRight size={32} className="text-[#D8CCBC]" />
              <p className="text-xs text-[#8C7B6B]">暂无划拨记录</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        r.dir === "in" ? "bg-[#F0E6C8]" : "bg-[#F5EFE8]"
                      }`}>
                        {r.dir === "in"
                          ? <TrendingUp size={16} className="text-[#B8973A]" />
                          : <TrendingDown size={16} className="text-[#8C7B6B]" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1A1208]">{r.target}</p>
                        <p className="text-[11px] text-[#A89685] mt-0.5">{r.date}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold tabular-nums ${
                      r.dir === "in" ? "text-[#B8973A]" : "text-[#1A1208]"
                    }`}>
                      {r.amount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F5EFE8]">
                    <span className="text-[11px] text-[#A89685]">流水号 {r.no}</span>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusColor(r.status)}`}>
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
