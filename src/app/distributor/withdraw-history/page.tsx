"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Banknote } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const history = [
  { id: "W2024012", amount: 1280, method: "微信零钱", status: "success", statusText: "已到账", date: "2024-12-01 10:22", account: "微信(138****8821)" },
  { id: "W2024011", amount: 860, method: "银行卡", status: "success", statusText: "已到账", date: "2024-11-01 09:45", account: "建行(****3392)" },
  { id: "W2024010", amount: 2100, method: "微信零钱", status: "success", statusText: "已到账", date: "2024-10-01 10:10", account: "微信(138****8821)" },
  { id: "W2024009", amount: 350, method: "银行卡", status: "rejected", statusText: "已拒绝", date: "2024-09-15 14:30", account: "建行(****3392)" },
];

const statusStyle: Record<string, string> = {
  pending: "text-[#B8973A] bg-[#FFF7E6]",
  success: "text-[#388E3C] bg-[#E8F5E9]",
  rejected: "text-[#E57373] bg-[#FFEBEE]",
};

export default function WithdrawHistoryPage() {
  const router = useRouter();
  const totalWithdrawn = history.filter(h => h.status === "success").reduce((sum, h) => sum + h.amount, 0);

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">提现记录</span>
          <div className="w-8" />
        </div>

        {/* 汇总卡 */}
        <div className="mx-4 mt-4 bg-[#1A1208] rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#B8973A]/20 flex items-center justify-center">
            <Banknote size={20} className="text-[#B8973A]" />
          </div>
          <div>
            <p className="text-white/60 text-xs">累计提现</p>
            <p className="text-white text-xl font-bold mt-0.5">¥{totalWithdrawn.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 mt-2">
          {history.map(h => (
            <div key={h.id} className="bg-white rounded-2xl px-4 py-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8C7B6B]">单号：{h.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[h.status]}`}>{h.statusText}</span>
              </div>
              <div className="flex items-end justify-between mt-2">
                <div>
                  <p className="text-xl font-bold text-[#1A1208]">¥{h.amount.toLocaleString()}</p>
                  <p className="text-xs text-[#8C7B6B] mt-0.5">{h.account} · {h.method}</p>
                  <p className="text-xs text-[#B8A898] mt-0.5">{h.date}</p>
                </div>
                {h.status === "rejected" && (
                  <button className="text-xs text-[#B8973A] border border-[#B8973A] px-3 py-1.5 rounded-lg">重新申请</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
