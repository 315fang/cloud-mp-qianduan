"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, TrendingUp, Clock, CheckCircle2, XCircle, ChevronRight, AlertCircle } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import GoldHeroCard, { GoldDivider } from "@/components/GoldHeroCard";

type TabKey = "all" | "frozen" | "pending" | "settled" | "rejected";

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "frozen", label: "冻结中" },
  { key: "pending", label: "待审批" },
  { key: "settled", label: "已结算" },
  { key: "rejected", label: "已驳回" },
];

const commissionLogs = [
  { id: 1, orderId: "YJ20241201001", product: "焕活精华液 30ml", buyer: "林*燕", amount: 780, commission: 78, level: 1, status: "settled" as const, time: "2024-12-01 14:32", settledAt: "2024-12-08 10:00" },
  { id: 2, orderId: "YJ20241130008", product: "紧致赋活面霜", buyer: "张*华", amount: 980, commission: 98, level: 1, status: "frozen" as const, time: "2024-11-30 10:15", settledAt: null },
  { id: 3, orderId: "YJ20241129003", product: "入门精萃水乳套组", buyer: "王*静", amount: 580, commission: 38, level: 2, status: "pending" as const, time: "2024-11-29 09:45", settledAt: null },
  { id: 4, orderId: "YJ20241128011", product: "肌底修护精华", buyer: "赵*丽", amount: 680, commission: 44, level: 2, status: "settled" as const, time: "2024-11-28 16:22", settledAt: "2024-12-05 10:00" },
  { id: 5, orderId: "YJ20241127005", product: "嫩白保湿防晒霜", buyer: "陈*芳", amount: 288, commission: 18, level: 1, status: "rejected" as const, time: "2024-11-27 11:30", settledAt: null },
  { id: 6, orderId: "YJ20241126002", product: "焕颜淡斑精华", buyer: "刘*梅", amount: 860, commission: 86, level: 1, status: "settled" as const, time: "2024-11-26 08:55", settledAt: "2024-12-03 10:00" },
  { id: 7, orderId: "YJ20241125009", product: "冰肌水光眼霜", buyer: "林*燕", amount: 468, commission: 46, level: 1, status: "frozen" as const, time: "2024-11-25 15:40", settledAt: null },
];

const statusConfig = {
  frozen: { label: "冻结中", color: "#8C7B6B", bg: "#F5EFE8", icon: Clock },
  pending: { label: "待审批", color: "#B8973A", bg: "#FBF5E6", icon: AlertCircle },
  settled: { label: "已结算", color: "#2D8C5E", bg: "#E8F5EE", icon: CheckCircle2 },
  rejected: { label: "已驳回", color: "#B85A2A", bg: "#FBF0E8", icon: XCircle },
};

export default function CommissionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = activeTab === "all"
    ? commissionLogs
    : commissionLogs.filter((l) => l.status === activeTab);

  const totalSettled = commissionLogs.filter((l) => l.status === "settled").reduce((s, l) => s + l.commission, 0);
  const totalFrozen = commissionLogs.filter((l) => l.status === "frozen").reduce((s, l) => s + l.commission, 0);
  const totalPending = commissionLogs.filter((l) => l.status === "pending").reduce((s, l) => s + l.commission, 0);

  return (
    <PhoneFrame>
      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#FAF7F4]">
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F0E8DC]" aria-label="返回">
          <ArrowLeft size={17} className="text-[#3D2B1A]" />
        </button>
        <span className="text-sm font-bold text-[#1A1208] tracking-wide">佣金明细</span>
        <div className="w-8" />
      </div>

      {/* 统计区 */}
      <GoldHeroCard
        brand="问兰佣金"
        sub="COMMISSION"
        badge={<span className="text-[9px] font-bold text-[#E7C977] border border-[#E7C977]/40 rounded-full px-2 py-0.5 tracking-widest">明细</span>}
      >
        <div className="flex items-center gap-2">
          <TrendingUp size={15} className="text-[#E7C977]" />
          <span className="text-[10px] text-[#C9B68C]/80 tracking-[0.18em]">累计佣金概览（元）</span>
        </div>
        <div className="flex items-end gap-1.5 mt-1.5">
          <span className="text-lg font-bold mb-1 text-[#E7C977]">¥</span>
          <span className="text-[34px] leading-none font-bold bg-gradient-to-b from-[#F8EBC6] to-[#CDA047] bg-clip-text text-transparent tabular-nums">
            {(totalSettled + totalFrozen + totalPending).toFixed(2)}
          </span>
        </div>
        <GoldDivider className="mt-4" />
        <div className="grid grid-cols-3 gap-3 mt-3">
          {[
            { label: "已结算", value: `¥${totalSettled.toFixed(2)}` },
            { label: "冻结中", value: `¥${totalFrozen.toFixed(2)}` },
            { label: "待审批", value: `¥${totalPending.toFixed(2)}` },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-sm font-bold text-[#F1E4C4] tabular-nums">{value}</p>
              <p className="text-[10px] mt-0.5 text-[#C9B68C]/70">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-[#C9B68C]/50 leading-relaxed">冻结佣金在买家确认收货后 15 天自动解冻，进入待审批状态</p>
      </GoldHeroCard>

      {/* Tabs */}
      <div className="bg-white flex border-b border-[#F0E8DC] sticky top-0 z-10 overflow-x-auto scrollbar-hide">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-shrink-0 px-4 py-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === key
                ? "border-[#B8973A] text-[#B8973A]"
                : "border-transparent text-[#8C7B6B]"
            }`}
          >
            {label}
            {key !== "all" && (
              <span className="ml-1 text-[10px]">
                ({commissionLogs.filter((l) => l.status === key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 列表 */}
      <div className="flex-1 overflow-y-auto bg-[#FAF7F4]">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <TrendingUp size={40} className="text-[#E8DDD0]" strokeWidth={1} />
            <p className="text-sm text-[#8C7B6B]">暂无记录</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {filtered.map((log) => {
              const cfg = statusConfig[log.status];
              const Icon = cfg.icon;
              const isExpanded = expandedId === log.id;
              return (
                <div key={log.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : log.id)}
                    className="w-full px-4 py-3.5 flex items-start gap-3 text-left"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: cfg.bg }}>
                      <Icon size={16} style={{ color: cfg.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1A1208] truncate">{log.product}</p>
                      <p className="text-[10px] text-[#8C7B6B] mt-0.5">
                        买家：{log.buyer} · L{log.level}层级 · {log.time}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-base font-bold text-[#B8973A]">+¥{log.commission}</p>
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full" style={{ color: cfg.color, background: cfg.bg }}>
                        {cfg.label}
                      </span>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-0 border-t border-[#F9F5F0] space-y-2">
                      <div className="flex justify-between text-xs text-[#8C7B6B] pt-3">
                        <span>关联订单</span>
                        <span className="font-mono text-[#3D2B1A]">{log.orderId}</span>
                      </div>
                      <div className="flex justify-between text-xs text-[#8C7B6B]">
                        <span>订单金额</span>
                        <span className="text-[#3D2B1A] font-semibold">¥{log.amount}</span>
                      </div>
                      <div className="flex justify-between text-xs text-[#8C7B6B]">
                        <span>佣金比例</span>
                        <span className="text-[#3D2B1A]">{((log.commission / log.amount) * 100).toFixed(1)}%</span>
                      </div>
                      {log.settledAt && (
                        <div className="flex justify-between text-xs text-[#8C7B6B]">
                          <span>结算时间</span>
                          <span className="text-[#2D8C5E]">{log.settledAt}</span>
                        </div>
                      )}
                      {log.status === "frozen" && (
                        <div className="mt-2 bg-[#FBF5E6] rounded-xl px-3 py-2 text-[10px] text-[#8C7B6B] leading-relaxed">
                          预计解冻时间：买家确认收货后 15 天
                        </div>
                      )}
                      {log.status === "rejected" && (
                        <div className="mt-2 bg-[#FBF0E8] rounded-xl px-3 py-2 text-[10px] text-[#B85A2A] leading-relaxed">
                          驳回原因：订单已退款，佣金不予结算
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div className="pb-4 text-center">
          <p className="text-[10px] text-[#C0B0A0]">已显示全部记录</p>
        </div>
      </div>
    </PhoneFrame>
  );
}
