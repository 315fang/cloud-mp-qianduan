"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, CheckCircle2, XCircle, Copy } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function RechargeOrderDetailPage() {
  const router = useRouter();

  // 演示数据：待支付订单
  const order = {
    no: "CZ202411280042",
    amount: "2,000.00",
    status: "pending" as "pending" | "paid" | "failed",
    method: "微信支付",
    createdAt: "2024-11-28 16:08:22",
    deadline: "2024-11-28 16:38:22",
    paidAt: "",
    closeReason: "",
  };

  const meta = {
    pending: {
      label: "待支付", icon: Clock, color: "#C8973A", bg: "bg-[#FFF7E6]",
      tip: "订单未完成支付，请在支付截止时间前完成，超时将自动关闭。",
    },
    paid: {
      label: "已完成", icon: CheckCircle2, color: "#5A8A5A", bg: "bg-[#EEF6EE]",
      tip: "货款已成功充值到账，可用于采购订货。",
    },
    failed: {
      label: "已关闭", icon: XCircle, color: "#B5564E", bg: "bg-[#FBEDEC]",
      tip: "订单已关闭，款项未扣除。如需充值请重新发起。",
    },
  }[order.status];

  const Icon = meta.icon;

  const rows: { label: string; value: string }[] = [
    { label: "充值金额", value: `¥${order.amount}` },
    { label: "支付方式", value: order.method },
    { label: "订单号", value: order.no },
    { label: "创建时间", value: order.createdAt },
  ];
  if (order.status === "pending") rows.push({ label: "支付截止", value: order.deadline });
  if (order.status === "paid") rows.push({ label: "支付时间", value: order.paidAt || "—" });
  if (order.status === "failed") rows.push({ label: "关闭原因", value: order.closeReason || "支付超时自动关闭" });

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4] pb-24">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A1208] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">充值订单详情</h1>
        </header>

        {/* 状态头卡 */}
        <div className="bg-[#1A1208] px-5 pb-7 pt-3 text-center">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
            <Icon size={28} style={{ color: meta.color }} />
          </div>
          <p className="text-lg font-bold text-white">{meta.label}</p>
          <p className="text-3xl font-light text-white tabular-nums mt-2">¥{order.amount}</p>
        </div>

        <div className="px-4 py-5 space-y-4">
          {/* 状态提示条 */}
          <div className={`rounded-xl px-4 py-3 ${meta.bg}`}>
            <p className="text-xs leading-relaxed" style={{ color: meta.color }}>{meta.tip}</p>
          </div>

          {/* 订单信息 */}
          <div className="bg-white rounded-2xl p-4 space-y-3">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="text-xs text-[#8C7B6B]">{r.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-sm ${r.label === "充值金额" ? "font-bold text-[#1A1208]" : "text-[#3D2B1A]"}`}>
                    {r.value}
                  </span>
                  {r.label === "订单号" && (
                    <button onClick={() => alert("已复制")} className="text-[#B8973A]"><Copy size={12} /></button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 待支付底部按钮 */}
        {order.status === "pending" && (
          <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-white border-t border-[#F0E8DC] px-4 py-3">
            <button
              onClick={() => alert("功能开发中")}
              className="w-full bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3.5 rounded-xl active:opacity-80"
            >
              继续支付
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
