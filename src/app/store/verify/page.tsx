"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ScanLine, Check, AlertCircle } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function VerifyConsolePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState<null | { ok: boolean; order?: typeof matchedOrder }>(null);

  const matchedOrder = {
    code: "HX8829",
    customer: "李**",
    items: "雪绒花修护精华 ×1",
    amount: "¥780",
    pickupCode: "8829",
  };

  const handleVerify = () => {
    if (!code.trim()) return;
    if (code === "8829") {
      setVerified({ ok: true, order: matchedOrder });
    } else {
      setVerified({ ok: false });
    }
  };

  const handleConfirm = () => {
    // 资金红线：实际核销提交由后端处理，此处仅演示
    setCode("");
    setVerified(null);
    router.push("/store/pending");
  };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#1A1208]">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A1208] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">核销台</h1>
        </header>

        <div className="px-5 py-6">
          {/* 扫码区 */}
          <button className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-[#B8973A]/40 bg-white/5 flex flex-col items-center justify-center gap-3 active:bg-white/10 transition-colors">
            <ScanLine size={48} className="text-[#B8973A]" />
            <span className="text-sm text-white/80 font-medium">点击扫描提货二维码</span>
            <span className="text-xs text-white/40">对准客户出示的核销码</span>
          </button>

          {/* 分隔 */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/40">或手动输入</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* 手动输入 */}
          <div className="bg-white/5 rounded-2xl p-4">
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setVerified(null);
              }}
              placeholder="输入 4 位提货码"
              maxLength={4}
              inputMode="numeric"
              className="w-full bg-transparent text-center text-2xl font-bold text-white placeholder:text-white/30 tracking-[0.5em] outline-none py-2"
            />
            <button
              onClick={handleVerify}
              className="w-full mt-3 bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3 rounded-xl active:opacity-80"
            >
              查询订单
            </button>
            <p className="text-[10px] text-white/30 text-center mt-2">演示：输入 8829 可匹配示例订单</p>
          </div>

          {/* 查询结果 */}
          {verified?.ok && verified.order && (
            <div className="mt-5 bg-white rounded-2xl p-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F0E8DC]">
                <Check size={18} className="text-[#B8973A]" />
                <span className="text-sm font-bold text-[#1A1208]">找到待核销订单</span>
              </div>
              <div className="space-y-2 mt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#8C7B6B]">订单号</span>
                  <span className="text-[#1A1208]">{verified.order.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7B6B]">客户</span>
                  <span className="text-[#1A1208]">{verified.order.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7B6B]">商品</span>
                  <span className="text-[#1A1208]">{verified.order.items}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7B6B]">金额</span>
                  <span className="text-base font-bold text-[#1A1208]">{verified.order.amount}</span>
                </div>
              </div>
              <button
                onClick={handleConfirm}
                className="w-full mt-4 bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3 rounded-xl active:opacity-80"
              >
                确认核销
              </button>
            </div>
          )}

          {verified && !verified.ok && (
            <div className="mt-5 bg-white rounded-2xl p-5 flex items-center gap-3">
              <AlertCircle size={20} className="text-[#E8857A] shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#1A1208]">未找到对应订单</p>
                <p className="text-xs text-[#8C7B6B] mt-0.5">请核对提货码是否正确</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
