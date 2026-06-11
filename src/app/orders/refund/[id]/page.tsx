"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, Clock, XCircle } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const steps = [
  { label: "提交申请", time: "2024-12-08 14:22", done: true },
  { label: "商家确认", time: "2024-12-09 10:05", done: true },
  { label: "退款处理", time: "处理中...", done: false },
  { label: "退款到账", time: "预计 1-3 个工作日", done: false },
];

export default function RefundDetailPage() {
  const router = useRouter();
  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">退款详情</span>
          <div className="w-8" />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 状态卡 */}
          <div className="surface-noir rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <Clock size={22} className="text-[#B8973A]" />
              <div>
                <p className="text-white font-bold text-base">退款处理中</p>
                <p className="text-white/60 text-xs mt-0.5">预计 1-3 个工作日退回原支付账户</p>
              </div>
            </div>
            {/* 进度条 */}
            <div className="flex items-center mt-5">
              {steps.map((s, i) => (
                <div key={s.label} className="flex-1 flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${s.done ? "bg-[#B8973A]" : "bg-white/20"}`}>
                    {s.done ? <CheckCircle2 size={14} className="text-white" /> : <div className="w-2 h-2 rounded-full bg-white/40" />}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute" style={{ width: "25%", left: `${(i + 0.5) * 25}%` }} />
                  )}
                  <p className="text-[10px] text-white/70 mt-1 text-center">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 退款信息 */}
          <div className="bg-white rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-[#1A1208]">退款信息</h3>
            {[
              { label: "退款类型", value: "仅退款" },
              { label: "退款原因", value: "质量问题" },
              { label: "退款金额", value: "¥388.00", highlight: true },
              { label: "申请时间", value: "2024-12-08 14:22" },
              { label: "退款单号", value: "R2024001" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-[#8C7B6B]">{item.label}</span>
                <span className={item.highlight ? "font-bold text-[#B8973A]" : "text-[#1A1208]"}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* 商品信息 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-3">退款商品</h3>
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F5EFE8] shrink-0">
                <Image src="/images/product-serum.png" alt="商品" width={64} height={64} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1208]">臻润修护精华液 30ml</p>
                <p className="text-xs text-[#8C7B6B] mt-1">数量：1</p>
              </div>
            </div>
          </div>

          {/* 退款进度时间线 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-4">处理进度</h3>
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#F0E8DC]" />
              <div className="space-y-5">
                {steps.filter(s => s.done).map((s, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#B8973A] border-2 border-[#B8973A] shrink-0 mt-0.5 relative z-10" />
                    <div>
                      <p className="text-sm font-medium text-[#1A1208]">{s.label}</p>
                      <p className="text-xs text-[#8C7B6B] mt-0.5">{s.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
