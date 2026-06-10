"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Inbox, Loader2, AlertCircle, Share2 } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

type ViewState = "normal" | "empty" | "loading" | "error";

const depositOrders = [
  {
    id: "DEP202412080001", status: "可退款", statusColor: "#3D8B5F", statusBg: "#E8F5EC",
    paid: 1000, refunded: 0, refundable: 1000, voucherStatus: "已分享 2 / 共 5", refundTimes: 0, canShare: true,
  },
  {
    id: "DEP202412050012", status: "已支付待分享", statusColor: "#E8975A", statusBg: "#FFF3E6",
    paid: 2000, refunded: 0, refundable: 2000, voucherStatus: "待分享兑换码", refundTimes: 0, canShare: true,
  },
  {
    id: "DEP202411280033", status: "部分退款", statusColor: "#4A7CC7", statusBg: "#EAF1FA",
    paid: 3000, refunded: 1200, refundable: 1800, voucherStatus: "已分享 3 / 共 5", refundTimes: 1, canShare: false,
  },
];

export default function DepositOrdersPage() {
  const router = useRouter();
  const [view, setView] = useState<ViewState>("normal");

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]" aria-label="返回">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">押金记录</span>
          <select value={view} onChange={(e) => setView(e.target.value as ViewState)} className="text-[10px] text-[#B8973A] bg-transparent">
            <option value="normal">正常</option>
            <option value="empty">空</option>
            <option value="loading">加载</option>
            <option value="error">失败</option>
          </select>
        </div>

        <div className="px-4 pt-3 pb-1">
          <p className="text-xs text-[#8C7B6B] leading-relaxed">完成押金支付后，这里显示兑换码和退款状态。</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {view === "loading" && (
            <div className="flex flex-col items-center justify-center py-24 text-[#B8A898]">
              <Loader2 size={28} className="animate-spin mb-3" />
              <p className="text-sm">加载中...</p>
            </div>
          )}
          {view === "error" && (
            <div className="flex flex-col items-center justify-center py-24 text-[#B8A898]">
              <AlertCircle size={36} className="mb-3 text-[#D14343]" />
              <p className="text-sm mb-3">加载失败，请重试</p>
              <button onClick={() => setView("normal")} className="px-5 py-2 bg-[#B8973A] text-white text-xs font-bold rounded-full">重新加载</button>
            </div>
          )}
          {view === "empty" && (
            <div className="flex flex-col items-center justify-center py-24 text-[#B8A898]">
              <Inbox size={40} className="mb-3" />
              <p className="text-sm">暂无押金记录</p>
            </div>
          )}
          {view === "normal" && depositOrders.map((o) => (
            <div key={o.id} className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#F0E8DC]">
                <span className="text-xs text-[#8C7B6B]">{o.id}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ color: o.statusColor, backgroundColor: o.statusBg }}>{o.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div><p className="text-[11px] text-[#8C7B6B]">已付金额</p><p className="text-sm font-bold text-[#1A1208] mt-0.5">¥{o.paid}</p></div>
                <div><p className="text-[11px] text-[#8C7B6B]">已退金额</p><p className="text-sm font-bold text-[#1A1208] mt-0.5">¥{o.refunded}</p></div>
                <div><p className="text-[11px] text-[#8C7B6B]">剩余可退</p><p className="text-sm font-bold text-[#B8973A] mt-0.5">¥{o.refundable}</p></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#8C7B6B] mb-3">
                <span>兑换码：{o.voucherStatus}</span>
                <span>退款 {o.refundTimes} 次</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-[#1A1208] text-white text-xs font-bold rounded-xl">立即支付</button>
                <button
                  disabled={!o.canShare}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 ${o.canShare ? "bg-[#B8973A] text-white" : "bg-[#F5EFE8] text-[#B8A898]"}`}
                >
                  <Share2 size={13} /> {o.canShare ? "分享兑换码" : "暂无可分享"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
