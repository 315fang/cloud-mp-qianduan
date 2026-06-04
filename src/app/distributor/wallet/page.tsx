"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ChevronRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

type WithdrawStep = "idle" | "input" | "confirm" | "success";

const ledger = [
  { id: 1, type: "in" as const, label: "佣金结算入账", amount: 78, time: "12-01 14:32", balance: 3420.50 },
  { id: 2, type: "out" as const, label: "提现申请（微信）", amount: -500, time: "11-28 11:00", balance: 3342.50, status: "approved" as const },
  { id: 3, type: "in" as const, label: "佣金结算入账", amount: 44, time: "11-28 10:00", balance: 3842.50 },
  { id: 4, type: "in" as const, label: "佣金结算入账", amount: 86, time: "12-03 10:00", balance: 3798.50 },
  { id: 5, type: "out" as const, label: "提现申请（银行卡）", amount: -1000, time: "11-20 15:30", balance: 3712.50, status: "pending" as const },
  { id: 6, type: "in" as const, label: "佣金结算入账", amount: 58, time: "11-29 09:00", balance: 4712.50 },
];

export default function WalletPage() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const [step, setStep] = useState<WithdrawStep>("idle");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<"wechat" | "bank">("wechat");

  const balance = 3420.50;
  const freezeAmount = 144;

  const handleWithdraw = () => {
    if (!amount || Number(amount) <= 0 || Number(amount) > balance) return;
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("success");
    setTimeout(() => {
      setStep("idle");
      setAmount("");
    }, 2000);
  };

  return (
    <PhoneFrame>
      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1A1208]">
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10" aria-label="返回">
          <ArrowLeft size={17} className="text-white" />
        </button>
        <span className="text-sm font-bold text-white tracking-wide">我的钱包</span>
        <button className="text-xs text-[#B8973A] font-medium" onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? <EyeOff size={18} className="text-white/50" /> : <Eye size={18} className="text-white/50" />}
        </button>
      </div>

      {/* 余额区 */}
      <div className="bg-[#1A1208] px-5 pt-2 pb-8">
        <p className="text-[11px] text-white/40 tracking-widest">可提现余额（元）</p>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-4xl font-bold text-white">
            {showBalance ? balance.toFixed(2) : "••••••"}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-[10px] text-white/40">
            冻结中：{showBalance ? `¥${freezeAmount}` : "•••"}
          </p>
          <span className="text-white/20 text-xs">|</span>
          <p className="text-[10px] text-white/40">累计提现：{showBalance ? "¥28,000" : "•••"}</p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="px-5 -mt-4 relative z-10 flex gap-3">
        <button
          onClick={() => setStep("input")}
          className="flex-1 bg-[#B8973A] text-white text-sm font-bold py-3.5 rounded-2xl shadow-lg"
        >
          申请提现
        </button>
        <button
          onClick={() => router.push("/distributor/commission")}
          className="flex-1 bg-white text-[#1A1208] text-sm font-bold py-3.5 rounded-2xl shadow-lg border border-[#F0E8DC]"
        >
          佣金明细
        </button>
      </div>

      {/* 说明卡 */}
      <div className="px-4 mt-4">
        <div className="bg-[#FBF5E6] rounded-2xl px-4 py-3 flex items-start gap-2">
          <AlertCircle size={13} className="text-[#B8973A] mt-0.5 flex-shrink-0" />
          <p className="text-[10px] text-[#8C7B6B] leading-relaxed">
            每日 09:00—18:00 可申请提现，单次最低 ¥100，最高 ¥10,000。提现到微信零钱1-3分钟到账，银行卡1-3个工作日到账。手续费 1%，最低 ¥0.30。
          </p>
        </div>
      </div>

      {/* 流水列表 */}
      <div className="flex-1 overflow-y-auto px-4 mt-4">
        <p className="text-xs font-bold text-[#1A1208] mb-3 tracking-wide">账单流水</p>
        <div className="bg-white rounded-2xl overflow-hidden divide-y divide-[#F9F5F0]">
          {ledger.map(({ id, type, label, amount: amt, time, status }) => (
            <div key={id} className="flex items-center gap-3 px-4 py-3.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                type === "in" ? "bg-[#E8F5EE]" : "bg-[#FBF0E8]"
              }`}>
                {type === "in"
                  ? <ArrowDownLeft size={16} className="text-[#2D8C5E]" />
                  : <ArrowUpRight size={16} className="text-[#B85A2A]" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1A1208]">{label}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[10px] text-[#8C7B6B]">{time}</p>
                  {status && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                      status === "approved" ? "bg-[#E8F5EE] text-[#2D8C5E]"
                      : status === "pending" ? "bg-[#FBF5E6] text-[#B8973A]"
                      : "bg-[#FBF0E8] text-[#B85A2A]"
                    }`}>
                      {status === "approved" ? "已到账" : status === "pending" ? "审核中" : "已拒绝"}
                    </span>
                  )}
                </div>
              </div>
              <p className={`text-sm font-bold flex-shrink-0 ${
                type === "in" ? "text-[#2D8C5E]" : "text-[#B85A2A]"
              }`}>
                {type === "in" ? "+" : ""}
                {showBalance ? `¥${Math.abs(amt)}` : "•••"}
              </p>
            </div>
          ))}
        </div>
        <div className="pb-6 text-center mt-3">
          <p className="text-[10px] text-[#C0B0A0]">已显示近 30 天流水</p>
        </div>
      </div>

      {/* 提现弹窗 */}
      {step !== "idle" && step !== "success" && (
        <div className="absolute inset-0 z-30 flex flex-col justify-end" style={{ background: "rgba(26,18,8,0.5)", backdropFilter: "blur(2px)" }}>
          <div className="bg-white rounded-t-3xl px-5 pt-5 pb-8">
            <div className="flex items-center justify-between mb-5">
              <p className="text-base font-bold text-[#1A1208]">
                {step === "input" ? "申请提现" : "确认提现"}
              </p>
              <button onClick={() => { setStep("idle"); setAmount(""); }} className="text-[#8C7B6B] text-sm">取消</button>
            </div>

            {step === "input" && (
              <>
                <div className="bg-[#FAF7F4] rounded-2xl px-4 py-4 mb-4">
                  <p className="text-[10px] text-[#8C7B6B] mb-2">提现金额（元）</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-[#1A1208]">¥</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 text-2xl font-bold text-[#1A1208] bg-transparent outline-none"
                    />
                    <button onClick={() => setAmount(String(balance))} className="text-xs text-[#B8973A] font-semibold flex-shrink-0">全部</button>
                  </div>
                  <p className="text-[10px] text-[#8C7B6B] mt-2">可提现 ¥{balance.toFixed(2)}</p>
                </div>
                <div className="mb-5">
                  <p className="text-xs font-bold text-[#1A1208] mb-2">提现方式</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "wechat" as const, label: "微信零钱", sub: "1-3分钟到账" },
                      { key: "bank" as const, label: "银行卡", sub: "1-3个工作日" },
                    ].map(({ key, label, sub }) => (
                      <button
                        key={key}
                        onClick={() => setMethod(key)}
                        className={`rounded-2xl px-4 py-3 text-left border-2 transition-colors ${
                          method === key ? "border-[#B8973A] bg-[#FBF5E6]" : "border-[#F0E8DC] bg-white"
                        }`}
                      >
                        <p className="text-sm font-semibold text-[#1A1208]">{label}</p>
                        <p className="text-[10px] text-[#8C7B6B] mt-0.5">{sub}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleWithdraw}
                  disabled={!amount || Number(amount) <= 0 || Number(amount) > balance}
                  className="w-full bg-[#B8973A] disabled:bg-[#E8DDD0] text-white font-bold py-4 rounded-2xl text-sm transition-colors"
                >
                  确认提现 {amount ? `¥${Number(amount).toFixed(2)}` : ""}
                </button>
              </>
            )}

            {step === "confirm" && (
              <>
                <div className="bg-[#FAF7F4] rounded-2xl divide-y divide-[#F0E8DC] mb-5">
                  {[
                    { label: "提现金额", value: `¥${Number(amount).toFixed(2)}`, bold: true },
                    { label: "手续费 (1%)", value: `¥${(Number(amount) * 0.01).toFixed(2)}` },
                    { label: "实际到账", value: `¥${(Number(amount) * 0.99).toFixed(2)}`, highlight: true },
                    { label: "到账方式", value: method === "wechat" ? "微信零钱" : "银行卡" },
                    { label: "预计到账", value: method === "wechat" ? "1-3分钟" : "1-3个工作日" },
                  ].map(({ label, value, bold, highlight }) => (
                    <div key={label} className="flex justify-between items-center px-4 py-3">
                      <span className="text-xs text-[#8C7B6B]">{label}</span>
                      <span className={`text-sm ${bold ? "font-bold text-[#1A1208]" : highlight ? "font-bold text-[#2D8C5E]" : "text-[#3D2B1A]"}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep("input")} className="flex-1 bg-[#F5EFE8] text-[#1A1208] font-bold py-4 rounded-2xl text-sm">
                    修改
                  </button>
                  <button onClick={handleConfirm} className="flex-1 bg-[#B8973A] text-white font-bold py-4 rounded-2xl text-sm">
                    确认提交
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 成功状态 */}
      {step === "success" && (
        <div className="absolute inset-0 z-30 flex items-center justify-center" style={{ background: "rgba(26,18,8,0.5)", backdropFilter: "blur(2px)" }}>
          <div className="bg-white rounded-3xl px-8 py-8 mx-6 text-center">
            <CheckCircle2 size={48} className="text-[#2D8C5E] mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-base font-bold text-[#1A1208]">提现申请已提交</p>
            <p className="text-xs text-[#8C7B6B] mt-2">审核通过后将自动打款，请留意到账通知</p>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
