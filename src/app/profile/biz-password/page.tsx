"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, ShieldAlert, Lock, Copy, Eye, EyeOff, AlertTriangle } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

// 状态：unsupported(普通用户) | needInit(已开启需首次修改) | normal(正常) | locked(锁定)
type PwState = "unsupported" | "needInit" | "normal" | "locked";

export default function BizPasswordPage() {
  const router = useRouter();
  const [state, setState] = useState<PwState>("needInit");
  const [initPassword, setInitPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState({ cur: false, next: false, confirm: false });
  const [form, setForm] = useState({ cur: "", next: "", confirm: "" });

  const lockUntil = "2024-12-12 18:30";

  const statusMap: Record<PwState, { label: string; color: string; bg: string; icon: typeof ShieldCheck }> = {
    unsupported: { label: "当前账号暂不支持业务密码", color: "#8C7B6B", bg: "#F5EFE8", icon: ShieldAlert },
    needInit: { label: "需先修改初始密码", color: "#E8975A", bg: "#FFF3E6", icon: ShieldAlert },
    normal: { label: "可正常使用", color: "#3D8B5F", bg: "#E8F5EC", icon: ShieldCheck },
    locked: { label: `已锁定 · 解锁时间 ${lockUntil}`, color: "#D14343", bg: "#FCE9E9", icon: ShieldAlert },
  };
  const st = statusMap[state];

  const handleGenInit = () => {
    setInitPassword("638274");
    setState("needInit");
  };
  const handleCopy = () => {
    if (initPassword) navigator.clipboard?.writeText(initPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]" aria-label="返回">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">业务密码</span>
          {/* 状态切换器（演示用） */}
          <select value={state} onChange={(e) => setState(e.target.value as PwState)} className="text-[10px] text-[#B8973A] bg-transparent">
            <option value="unsupported">普通</option>
            <option value="needInit">需改</option>
            <option value="normal">正常</option>
            <option value="locked">锁定</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 状态卡 */}
          <div className="bg-white rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: st.bg }}>
                <st.icon size={22} style={{ color: st.color }} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A1208]">业务密码状态</p>
                <p className="text-xs mt-0.5" style={{ color: st.color }}>{st.label}</p>
              </div>
            </div>
            <p className="text-[11px] text-[#8C7B6B] leading-relaxed bg-[#FAF7F4] rounded-xl p-3">
              业务密码用于提现、货款支付、内部划拨等高风险操作，请妥善保管，切勿告知他人。
            </p>
            {state === "unsupported" && (
              <button onClick={handleGenInit} className="w-full mt-4 py-3 bg-[#B8973A] text-white text-sm font-bold rounded-xl">
                申领初始密码
              </button>
            )}
          </div>

          {/* 初始密码结果卡 */}
          {initPassword && (
            <div className="bg-[#1A1208] rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Lock size={16} className="text-[#D4AF5A]" />
                <span className="text-sm font-bold">初始密码已生成</span>
              </div>
              <div className="flex items-center justify-center gap-2 my-4">
                {initPassword.split("").map((d, i) => (
                  <span key={i} className="w-10 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl font-bold">{d}</span>
                ))}
              </div>
              <button onClick={handleCopy} className="w-full py-2.5 bg-[#B8973A] rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                <Copy size={15} /> {copied ? "已复制" : "复制密码"}
              </button>
              <div className="flex items-start gap-2 mt-3 text-[#E8975A]">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">该密码仅展示一次，请立即保存。关闭后将无法再次查看，请尽快前往下方修改。</p>
              </div>
            </div>
          )}

          {/* 锁定态提示 */}
          {state === "locked" && (
            <div className="bg-[#FCE9E9] rounded-2xl p-4 flex items-start gap-3">
              <ShieldAlert size={18} className="text-[#D14343] shrink-0 mt-0.5" />
              <p className="text-xs text-[#B33] leading-relaxed">密码连续输错已被锁定，请于 {lockUntil} 后重试，或联系客服解锁。</p>
            </div>
          )}

          {/* 修改密码表单 */}
          {(state === "needInit" || state === "normal") && (
            <div className="bg-white rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-[#1A1208]">{state === "needInit" ? "修改初始密码" : "更新业务密码"}</h3>
              {([
                { key: "cur", label: state === "needInit" ? "初始密码" : "当前密码" },
                { key: "next", label: "新密码" },
                { key: "confirm", label: "确认新密码" },
              ] as const).map((f) => (
                <div key={f.key} className="relative">
                  <input
                    type={show[f.key] ? "text" : "password"}
                    inputMode="numeric"
                    maxLength={6}
                    placeholder={`请输入${f.label}（6 位数字）`}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value.replace(/\D/g, "") })}
                    className="w-full px-4 py-3 bg-[#FAF7F4] rounded-xl text-sm text-[#1A1208] pr-11 outline-none focus:ring-1 focus:ring-[#B8973A]"
                  />
                  <button
                    onClick={() => setShow({ ...show, [f.key]: !show[f.key] })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7B6B]"
                    aria-label="切换显示"
                  >
                    {show[f.key] ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              ))}
              <button className="w-full mt-1 py-3 bg-[#B8973A] text-white text-sm font-bold rounded-xl">
                {state === "needInit" ? "完成修改" : "更新密码"}
              </button>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
