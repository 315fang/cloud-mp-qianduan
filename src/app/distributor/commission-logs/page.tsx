"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, TrendingUp, Clock, CheckCircle2, XCircle, Lock } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const logs = [
  { id: "1", orderId: "YJ20241201001", orderUser: "李**", type: "direct", amount: 89.7, status: "settled", date: "2024-12-01", rate: "15%" },
  { id: "2", orderId: "YJ20241130008", orderUser: "张**", type: "team", amount: 32.4, status: "pending", date: "2024-11-30", rate: "5%" },
  { id: "3", orderId: "YJ20241129005", orderUser: "王**", type: "direct", amount: 62.1, status: "frozen", date: "2024-11-29", rate: "15%" },
  { id: "4", orderId: "YJ20241128002", orderUser: "陈**", type: "team", amount: 18.9, status: "rejected", date: "2024-11-28", rate: "5%", reason: "订单已退款" },
  { id: "5", orderId: "YJ20241125011", orderUser: "刘**", type: "direct", amount: 119.4, status: "settled", date: "2024-11-25", rate: "15%" },
  { id: "6", orderId: "YJ20241120007", orderUser: "赵**", type: "direct", amount: 74.7, status: "settled", date: "2024-11-20", rate: "15%" },
];

const tabs = [
  { key: "all", label: "全部" },
  { key: "frozen", label: "冻结中" },
  { key: "pending", label: "待结算" },
  { key: "settled", label: "已结算" },
  { key: "rejected", label: "已驳回" },
] as const;

type TabKey = typeof tabs[number]["key"];

const statusConfig = {
  frozen: { label: "冻结中", icon: Lock, color: "text-blue-500", bg: "bg-blue-50" },
  pending: { label: "待结算", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  settled: { label: "已结算", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  rejected: { label: "已驳回", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
};

const typeLabel = { direct: "直销佣金", team: "团队分佣" };

export default function CommissionLogsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const filtered = activeTab === "all" ? logs : logs.filter((l) => l.status === activeTab);
  const total = filtered.filter((l) => l.status === "settled").reduce((s, l) => s + l.amount, 0);

  return (
    <PhoneFrame>
      <div className="min-h-screen bg-[#F5EFE8] flex flex-col">
        <div className="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="font-bold text-[#1A1208]">佣金日志</span>
        </div>

        {/* 统计卡 */}
        <div className="mx-4 mt-4 bg-[#1A1208] rounded-2xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-[#C4A882] text-xs">筛选范围内已结算</p>
            <p className="text-2xl font-bold text-white mt-1">¥{total.toFixed(2)}</p>
          </div>
          <TrendingUp size={32} className="text-[#B8973A]" strokeWidth={1.5} />
        </div>

        {/* Tabs */}
        <div className="flex mx-4 mt-4 bg-white rounded-xl overflow-hidden">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors ${activeTab === t.key ? "bg-[#1A1208] text-white" : "text-[#8C7B6B]"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto pb-8 space-y-3 p-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-[#C4A882]">
              <TrendingUp size={36} strokeWidth={1} className="mb-3" />
              <p className="text-sm">暂无相关佣金记录</p>
            </div>
          ) : filtered.map((log) => {
            const cfg = statusConfig[log.status as keyof typeof statusConfig];
            const Icon = cfg.icon;
            return (
              <div key={log.id} className="bg-white rounded-2xl px-4 py-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs text-[#8C7B6B] bg-[#F5EFE8] px-2 py-0.5 rounded-full">{typeLabel[log.type as keyof typeof typeLabel]}</span>
                    <p className="text-sm font-medium text-[#1A1208] mt-1.5">{log.orderUser} 的订单</p>
                    <p className="text-xs text-[#C4A882]">{log.orderId} · 佣金比例 {log.rate}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-base font-bold text-[#B8973A]">+¥{log.amount.toFixed(2)}</p>
                    <div className={`flex items-center gap-1 justify-end mt-1 text-xs ${cfg.color}`}>
                      <Icon size={11} />
                      <span>{cfg.label}</span>
                    </div>
                  </div>
                </div>
                {log.reason && (
                  <p className="text-xs text-red-400 bg-red-50 px-3 py-1.5 rounded-lg">{log.reason}</p>
                )}
                <p className="text-xs text-[#C4A882] mt-2">{log.date}</p>
              </div>
            );
          })}
        </div>
      </div>
    </PhoneFrame>
  );
}
