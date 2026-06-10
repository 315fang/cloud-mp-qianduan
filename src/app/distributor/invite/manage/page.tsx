"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Gift, Share2, ChevronRight, Plus,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

type St = "pending" | "accepted" | "expired" | "revoked";

export default function PartnerInviteManagePage() {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | St>("all");

  const records: { id: string; name: string; target: string; amount: string; status: St; ticket: string; date: string }[] = [
    { id: "1", name: "陈** (138****8829)", target: "金牌合伙人", amount: "5,000.00", status: "pending", ticket: "YY202412010001", date: "2024-12-01 10:24" },
    { id: "2", name: "王** (139****1102)", target: "银牌合伙人", amount: "3,000.00", status: "accepted", ticket: "YY202411280042", date: "2024-11-28 16:08" },
    { id: "3", name: "刘** (137****5560)", target: "金牌合伙人", amount: "5,000.00", status: "expired", ticket: "YY202411200018", date: "2024-11-20 09:15" },
    { id: "4", name: "赵** (135****3344)", target: "银牌合伙人", amount: "3,000.00", status: "revoked", ticket: "YY202411150007", date: "2024-11-15 14:30" },
  ];

  const meta = (s: St) => ({
    pending: { label: "待接受", color: "text-[#C8973A] bg-[#FFF7E6]" },
    accepted: { label: "已接受", color: "text-[#5A8A5A] bg-[#EEF6EE]" },
    expired: { label: "已过期", color: "text-[#8C7B6B] bg-[#F1ECE4]" },
    revoked: { label: "已撤销", color: "text-[#B5564E] bg-[#FBEDEC]" },
  }[s]);

  const tabs = [
    { key: "all" as const, label: "全部" },
    { key: "pending" as const, label: "待接受" },
    { key: "accepted" as const, label: "已接受" },
    { key: "expired" as const, label: "已失效" },
  ];

  const filtered = tab === "all"
    ? records
    : tab === "expired"
    ? records.filter((r) => r.status === "expired" || r.status === "revoked")
    : records.filter((r) => r.status === tab);

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4] pb-24">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A1208] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">推广合伙人邀约</h1>
        </header>

        {/* 邀约说明卡 */}
        <div className="bg-[#1A1208] px-5 pb-6 pt-2">
          <div className="flex items-start gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#B8973A] flex items-center justify-center shrink-0">
              <Gift size={20} className="text-[#1A1208]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">发起合伙人邀约</h2>
              <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                邀约通过后将按约定金额划拨货款给对方，对方即可开通对应合伙人身份。邀约有效期 7 天。
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 py-5">
          {/* 状态分类标签 */}
          <div className="flex bg-white rounded-xl p-1 mb-4">
            {tabs.map((t) => (
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

          {/* 邀约记录卡片 */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl py-12 flex flex-col items-center gap-2">
              <Gift size={32} className="text-[#D8CCBC]" />
              <p className="text-xs text-[#8C7B6B]">暂无邀约记录</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((r) => {
                const m = meta(r.status);
                return (
                  <div key={r.id} className="bg-white rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#1A1208]">{r.name}</span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${m.color}`}>{m.label}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-[#8C7B6B]">目标身份：{r.target}</span>
                      <span className="text-sm font-bold text-[#B8973A] tabular-nums">¥{r.amount}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-[#F5EFE8] text-[11px] text-[#A89685] space-y-0.5">
                      <p>票据号：{r.ticket}</p>
                      <p>发起时间：{r.date}</p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Link
                        href={`/distributor/invite/accept/${r.ticket}`}
                        className="flex-1 border border-[#E5DDD0] text-[#3D2B1A] text-xs font-medium py-2 rounded-lg flex items-center justify-center gap-1 active:opacity-70"
                      >
                        查看详情 <ChevronRight size={12} />
                      </Link>
                      {r.status === "pending" && (
                        <>
                          <button
                            onClick={() => alert("功能开发中")}
                            className="flex-1 bg-[#B8973A] text-[#1A1208] text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 active:opacity-80"
                          >
                            <Share2 size={13} /> 分享邀约
                          </button>
                          <button
                            onClick={() => alert("功能开发中")}
                            className="px-3 border border-[#E5C8C5] text-[#B5564E] text-xs font-medium py-2 rounded-lg active:opacity-70"
                          >
                            撤销
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 底部发起按钮 */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-white border-t border-[#F0E8DC] px-4 py-3">
          <button
            onClick={() => alert("功能开发中")}
            className="w-full bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3.5 rounded-xl flex items-center justify-center gap-1.5 active:opacity-80"
          >
            <Plus size={17} /> 发起新邀约
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
