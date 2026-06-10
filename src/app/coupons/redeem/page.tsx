"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Ticket, Gift } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function RedeemCodePage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<null | { ok: boolean; msg: string }>(null);

  const handleRedeem = () => {
    if (!code.trim()) {
      setResult({ ok: false, msg: "请输入兑换码" });
      return;
    }
    // 资金红线：实际写账户动作止于此，仅前端演示
    setResult({ ok: true, msg: "功能开发中，兑换将由后端处理" });
  };

  const history = [
    { code: "WL-8F2K-90XZ", name: "新人礼 ¥50 券", date: "2024-11-20", status: "已兑换" },
    { code: "WL-3A7M-22QP", name: "护肤小样礼盒", date: "2024-10-08", status: "已兑换" },
  ];

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4]">
        {/* 顶部返回栏 */}
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#FAF7F4]/95 backdrop-blur px-4 py-3 border-b border-[#F0E8DC]">
          <Link href="/profile" className="flex items-center justify-center w-8 h-8 -ml-1">
            <ChevronLeft size={22} className="text-[#1A1208]" />
          </Link>
          <h1 className="text-base font-bold text-[#1A1208]">兑换码</h1>
        </header>

        <div className="px-4 py-5 space-y-5">
          {/* 输入卡 */}
          <div className="bg-[#1A1208] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Ticket size={18} className="text-[#B8973A]" />
              <span className="text-sm font-bold text-white">输入兑换码</span>
            </div>
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setResult(null);
              }}
              placeholder="请输入兑换码（如 WL-XXXX-XXXX）"
              className="w-full bg-white/10 text-white placeholder:text-white/40 text-sm rounded-xl px-4 py-3 outline-none tracking-wider border border-white/15 focus:border-[#B8973A] transition-colors"
            />
            {result && (
              <p className={`text-xs mt-3 ${result.ok ? "text-[#B8973A]" : "text-[#E8857A]"}`}>
                {result.msg}
              </p>
            )}
            <button
              onClick={handleRedeem}
              className="w-full mt-4 bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3 rounded-xl active:opacity-80 transition-opacity"
            >
              立即兑换
            </button>
          </div>

          {/* 说明 */}
          <div className="bg-white rounded-2xl p-4">
            <p className="text-xs text-[#8C7B6B] leading-relaxed">
              兑换码可用于兑换优惠券、实物礼品或会员权益。每个兑换码限用一次，兑换成功后将自动发放至对应账户。如有疑问请联系客服。
            </p>
          </div>

          {/* 兑换记录 */}
          <div>
            <h2 className="text-sm font-bold text-[#1A1208] mb-3">兑换记录</h2>
            {history.length === 0 ? (
              <div className="bg-white rounded-2xl py-12 flex flex-col items-center gap-2">
                <Gift size={32} className="text-[#D8CCBC]" />
                <p className="text-xs text-[#8C7B6B]">暂无兑换记录</p>
              </div>
            ) : (
              <div className="space-y-2">
                {history.map((h) => (
                  <div key={h.code} className="bg-white rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#1A1208]">{h.name}</p>
                      <p className="text-[11px] text-[#A89685] mt-0.5 tracking-wider">{h.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-[#B8973A] font-medium">{h.status}</p>
                      <p className="text-[10px] text-[#A89685] mt-0.5">{h.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
