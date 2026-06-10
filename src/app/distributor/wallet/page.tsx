"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Wallet,
  Landmark,
  Coins,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

type WithdrawStep = "idle" | "input" | "confirm" | "success";
type Method = "wechat" | "bank" | "goods";

const ledger = [
  { id: 1, type: "in" as const, label: "佣金结算入账", amount: 78, time: "12-01 14:32" },
  { id: 2, type: "out" as const, label: "提现申请（微信）", amount: -500, time: "11-28 11:00", status: "approved" as const },
  { id: 3, type: "in" as const, label: "佣金结算入账", amount: 44, time: "11-28 10:00" },
  { id: 4, type: "in" as const, label: "佣金结算入账", amount: 86, time: "12-03 10:00" },
  { id: 5, type: "out" as const, label: "提现申请（银行卡）", amount: -1000, time: "11-20 15:30", status: "pending" as const },
  { id: 6, type: "in" as const, label: "佣金结算入账", amount: 58, time: "11-29 09:00" },
];

// 提现记录
const withdrawals = [
  { id: "W2024120301", amount: 500, real: 495, time: "12-03 11:20", status: "approved" as const, method: "微信零钱" },
  { id: "W2024112801", amount: 1000, real: 990, time: "11-28 15:30", status: "pending" as const, method: "银行卡" },
  { id: "W2024112002", amount: 300, real: 0, time: "11-20 09:10", status: "rejected" as const, method: "微信零钱", reason: "收款账户信息有误，请核对后重新申请" },
];

// 佣金概览四格
const commissionOverview = [
  { key: "total", label: "累计佣金", value: "12,860.00", tone: "#1A1208" },
  { key: "frozen", label: "冻结中", value: "144.00", tone: "#B85A2A" },
  { key: "expected", label: "预计收益", value: "320.00", tone: "#B8973A" },
  { key: "pending", label: "待打款", value: "1,000.00", tone: "#2D8C5E" },
];

// 收益阶段明细
const stageDetail = [
  { label: "预计收益", desc: "订单确认收货前的预估佣金", amount: "320.00", tone: "#B8973A" },
  { label: "冻结中", desc: "售后期内暂不可提现", amount: "144.00", tone: "#B85A2A" },
  { label: "审核中", desc: "提现申请正在平台审核", amount: "1,000.00", tone: "#8C7B6B" },
  { label: "待打款", desc: "审核通过，等待自动打款", amount: "1,000.00", tone: "#2D8C5E" },
];

const statusMap = {
  approved: { label: "已到账", cls: "bg-[#E8F5EE] text-[#2D8C5E]" },
  pending: { label: "审核中", cls: "bg-[#FBF5E6] text-[#B8973A]" },
  rejected: { label: "已驳回", cls: "bg-[#FBF0E8] text-[#B85A2A]" },
};

export default function WalletPage() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const [step, setStep] = useState<WithdrawStep>("idle");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<Method>("wechat");
  const [stageOpen, setStageOpen] = useState(false);
  const [bank, setBank] = useState({ name: "", bankName: "", cardNo: "" });

  const balance = 3420.5;

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

  // 货款余额免手续费
  const isGoods = method === "goods";
  const fee = isGoods ? 0 : Number(amount || 0) * 0.01;
  const real = Number(amount || 0) - fee;

  return (
    <PhoneFrame>
      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1A1208]">
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10" aria-label="返回">
          <ArrowLeft size={17} className="text-white" />
        </button>
        <span className="text-sm font-bold text-white tracking-wide">我的钱包</span>
        <button aria-label="切换余额可见" onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? <EyeOff size={18} className="text-white/50" /> : <Eye size={18} className="text-white/50" />}
        </button>
      </div>

      {/* 余额区 */}
      <div className="bg-[#1A1208] px-5 pt-2 pb-8">
        <p className="text-[11px] text-white/40 tracking-widest">可提现余额（元）</p>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-4xl font-bold text-white">{showBalance ? balance.toFixed(2) : "••••••"}</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-[10px] text-white/40">冻结中：{showBalance ? "¥144" : "•••"}</p>
          <span className="text-white/20 text-xs">|</span>
          <p className="text-[10px] text-white/40">累计提现：{showBalance ? "¥28,000" : "•••"}</p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="px-5 -mt-4 relative z-10 flex gap-3">
        <button onClick={() => setStep("input")} className="flex-1 bg-[#B8973A] text-white text-sm font-bold py-3.5 rounded-2xl shadow-lg">
          申请提现
        </button>
        <button onClick={() => router.push("/distributor/commission")} className="flex-1 bg-white text-[#1A1208] text-sm font-bold py-3.5 rounded-2xl shadow-lg border border-[#F0E8DC]">
          佣金明细
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 mt-4 pb-6 space-y-4">
        {/* 佣金概览四格 */}
        <div className="bg-white rounded-2xl p-4">
          <p className="text-xs font-bold text-[#1A1208] mb-3 tracking-wide">佣金概览</p>
          <div className="grid grid-cols-2 gap-3">
            {commissionOverview.map((c) => (
              <div key={c.key} className="bg-[#FAF7F4] rounded-xl px-3 py-3">
                <p className="text-[10px] text-[#8C7B6B]">{c.label}</p>
                <p className="text-lg font-bold mt-0.5" style={{ color: c.tone }}>
                  {showBalance ? `¥${c.value}` : "•••"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 收益阶段明细（可展开） */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <button onClick={() => setStageOpen(!stageOpen)} className="w-full flex items-center justify-between px-4 py-3.5">
            <span className="text-xs font-bold text-[#1A1208] tracking-wide">收益阶段明细</span>
            <ChevronDown size={16} className={`text-[#8C7B6B] transition-transform ${stageOpen ? "rotate-180" : ""}`} />
          </button>
          {stageOpen && (
            <div className="px-4 pb-4 divide-y divide-[#F9F5F0]">
              {stageDetail.map((s) => (
                <div key={s.label} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-[#1A1208]">{s.label}</p>
                    <p className="text-[10px] text-[#8C7B6B] mt-0.5">{s.desc}</p>
                  </div>
                  <span className="text-sm font-bold" style={{ color: s.tone }}>
                    {showBalance ? `¥${s.amount}` : "•••"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 提现记录 */}
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-[#1A1208] tracking-wide">提现记录</p>
            <button onClick={() => router.push("/distributor/withdraw-history")} className="flex items-center gap-0.5 text-[11px] text-[#B8973A]">
              全部 <ChevronRight size={13} />
            </button>
          </div>
          <div className="space-y-3">
            {withdrawals.map((w) => {
              const st = statusMap[w.status];
              return (
                <div key={w.id} className="bg-[#FAF7F4] rounded-xl px-3.5 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#1A1208]">提现 ¥{w.amount}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${st.cls}`}>{st.label}</span>
                    </div>
                    <span className="text-[10px] text-[#8C7B6B]">{w.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-[10px] text-[#8C7B6B]">{w.method} · 单号 {w.id}</p>
                    <p className="text-[11px] text-[#3D2B1A]">
                      实到 <span className="font-semibold">¥{w.real}</span>
                    </p>
                  </div>
                  {w.status === "rejected" && w.reason && (
                    <div className="mt-2 flex items-start gap-1.5 bg-[#FBF0E8] rounded-lg px-2.5 py-1.5">
                      <AlertCircle size={11} className="text-[#B85A2A] mt-0.5 shrink-0" />
                      <p className="text-[10px] text-[#B85A2A] leading-relaxed">驳回原因：{w.reason}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 账单流水 */}
        <div>
          <p className="text-xs font-bold text-[#1A1208] mb-3 tracking-wide">账单流水</p>
          <div className="bg-white rounded-2xl overflow-hidden divide-y divide-[#F9F5F0]">
            {ledger.map(({ id, type, label, amount: amt, time, status }) => (
              <div key={id} className="flex items-center gap-3 px-4 py-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${type === "in" ? "bg-[#E8F5EE]" : "bg-[#FBF0E8]"}`}>
                  {type === "in" ? <ArrowDownLeft size={16} className="text-[#2D8C5E]" /> : <ArrowUpRight size={16} className="text-[#B85A2A]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1208]">{label}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[10px] text-[#8C7B6B]">{time}</p>
                    {status && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${statusMap[status].cls}`}>
                        {statusMap[status].label}
                      </span>
                    )}
                  </div>
                </div>
                <p className={`text-sm font-bold flex-shrink-0 ${type === "in" ? "text-[#2D8C5E]" : "text-[#B85A2A]"}`}>
                  {type === "in" ? "+" : ""}
                  {showBalance ? `¥${Math.abs(amt)}` : "•••"}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#C0B0A0] text-center mt-3">已显示近 30 天流水</p>
        </div>
      </div>

      {/* 提现弹窗 */}
      {step !== "idle" && step !== "success" && (
        <div className="absolute inset-0 z-30 flex flex-col justify-end" style={{ background: "rgba(26,18,8,0.5)", backdropFilter: "blur(2px)" }}>
          <div className="bg-white rounded-t-3xl px-5 pt-5 pb-8 max-h-[88%] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <p className="text-base font-bold text-[#1A1208]">{step === "input" ? "申请提现" : "确认提现"}</p>
              <button onClick={() => { setStep("idle"); setAmount(""); }} className="text-[#8C7B6B] text-sm">取消</button>
            </div>

            {step === "input" && (
              <>
                {/* 金额 */}
                <div className="bg-[#FAF7F4] rounded-2xl px-4 py-4 mb-3">
                  <p className="text-[10px] text-[#8C7B6B] mb-2">提现金额（元）</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-[#1A1208]">¥</span>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="flex-1 text-2xl font-bold text-[#1A1208] bg-transparent outline-none" />
                    <button onClick={() => setAmount(String(balance))} className="text-xs text-[#B8973A] font-semibold flex-shrink-0">全部</button>
                  </div>
                  <p className="text-[10px] text-[#8C7B6B] mt-2">可提现 ¥{balance.toFixed(2)}</p>
                </div>

                {/* 货款余额免手续费说明 */}
                {isGoods && (
                  <div className="bg-[#E8F5EE] rounded-xl px-4 py-2.5 mb-4 flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#2D8C5E] mt-0.5 shrink-0" />
                    <p className="text-[10px] text-[#2D8C5E] leading-relaxed">
                      转入货款余额免收手续费，可用于补货下单，实时到账。
                    </p>
                  </div>
                )}

                {/* 提现方式三选一 */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-[#1A1208] mb-2">提现方式</p>
                  <div className="space-y-2">
                    {[
                      { key: "wechat" as const, icon: Wallet, label: "微信零钱", sub: "1-3分钟到账 · 手续费 1%" },
                      { key: "bank" as const, icon: Landmark, label: "银行卡", sub: "1-3个工作日 · 手续费 1%" },
                      { key: "goods" as const, icon: Coins, label: "货款余额", sub: "实时到账 · 免手续费" },
                    ].map(({ key, icon: Icon, label, sub }) => (
                      <button
                        key={key}
                        onClick={() => setMethod(key)}
                        className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 border-2 text-left transition-colors ${
                          method === key ? "border-[#B8973A] bg-[#FBF5E6]" : "border-[#F0E8DC] bg-white"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${method === key ? "bg-[#B8973A]" : "bg-[#F5EFE8]"}`}>
                          <Icon size={17} className={method === key ? "text-white" : "text-[#B8973A]"} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#1A1208]">{label}</p>
                          <p className="text-[10px] text-[#8C7B6B] mt-0.5">{sub}</p>
                        </div>
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method === key ? "border-[#B8973A]" : "border-[#D8CBBB]"}`}>
                          {method === key && <span className="w-2 h-2 rounded-full bg-[#B8973A]" />}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 银行卡表单 */}
                {method === "bank" && (
                  <div className="bg-[#FAF7F4] rounded-2xl p-4 mb-4 space-y-3">
                    <p className="text-xs font-bold text-[#1A1208]">收款信息</p>
                    {[
                      { key: "name" as const, label: "持卡人姓名", placeholder: "请输入持卡人姓名" },
                      { key: "bankName" as const, label: "开户银行", placeholder: "如：招商银行" },
                      { key: "cardNo" as const, label: "银行卡号", placeholder: "请输入银行卡号" },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="text-[10px] text-[#8C7B6B]">{label}</label>
                        <input
                          value={bank[key]}
                          onChange={(e) => setBank({ ...bank, [key]: e.target.value })}
                          placeholder={placeholder}
                          inputMode={key === "cardNo" ? "numeric" : "text"}
                          className="w-full mt-1 bg-white border border-[#F0E8DC] rounded-xl px-3 py-2.5 text-sm text-[#1A1208] outline-none focus:border-[#B8973A]"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleWithdraw}
                  disabled={!amount || Number(amount) <= 0 || Number(amount) > balance}
                  className="w-full bg-[#B8973A] disabled:bg-[#E8DDD0] text-white font-bold py-4 rounded-2xl text-sm transition-colors"
                >
                  {isGoods ? "确认转入货款余额" : "确认提现"} {amount ? `¥${Number(amount).toFixed(2)}` : ""}
                </button>
              </>
            )}

            {step === "confirm" && (
              <>
                <div className="bg-[#FAF7F4] rounded-2xl divide-y divide-[#F0E8DC] mb-5">
                  {[
                    { label: isGoods ? "转入金额" : "提现金额", value: `¥${Number(amount).toFixed(2)}`, bold: true },
                    { label: isGoods ? "手续费" : "手续费 (1%)", value: isGoods ? "免手续费" : `¥${fee.toFixed(2)}` },
                    { label: "实际到账", value: `¥${real.toFixed(2)}`, highlight: true },
                    { label: "到账方式", value: method === "wechat" ? "微信零钱" : method === "bank" ? "银行卡" : "货款余额" },
                    { label: "预计到账", value: method === "wechat" ? "1-3分钟" : method === "bank" ? "1-3个工作日" : "实时到账" },
                  ].map(({ label, value, bold, highlight }) => (
                    <div key={label} className="flex justify-between items-center px-4 py-3">
                      <span className="text-xs text-[#8C7B6B]">{label}</span>
                      <span className={`text-sm ${bold ? "font-bold text-[#1A1208]" : highlight ? "font-bold text-[#2D8C5E]" : "text-[#3D2B1A]"}`}>{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep("input")} className="flex-1 bg-[#F5EFE8] text-[#1A1208] font-bold py-4 rounded-2xl text-sm">修改</button>
                  <button onClick={handleConfirm} className="flex-1 bg-[#B8973A] text-white font-bold py-4 rounded-2xl text-sm">确认提交</button>
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
            <p className="text-base font-bold text-[#1A1208]">{isGoods ? "已转入货款余额" : "提现申请已提交"}</p>
            <p className="text-xs text-[#8C7B6B] mt-2">
              {isGoods ? "可前往货款余额查看明细" : "审核通过后将自动打款，请留意到账通知"}
            </p>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
