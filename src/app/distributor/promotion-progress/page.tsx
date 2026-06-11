"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Crown, Check, Lock, TrendingUp, Gift } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function PromotionProgressPage() {
  const router = useRouter();

  const current = {
    level: "L2 高级经销商",
    next: "L3 金牌合伙人",
  };

  const conditions = [
    { label: "个人累计销售额", current: 28600, target: 50000, unit: "元" },
    { label: "直推有效会员数", current: 18, target: 30, unit: "人" },
    { label: "团队总业绩", current: 86000, target: 120000, unit: "元" },
    { label: "本月活跃下级", current: 12, target: 10, unit: "人", done: true },
  ];

  const rewards = [
    { label: "团队分佣比例提升至 12%", unlocked: false },
    { label: "专属合伙人培训资格", unlocked: false },
    { label: "季度返利资格", unlocked: false },
    { label: "高级经销价权限", unlocked: true },
  ];

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4]">
        <header className="sticky top-0 z-10 flex items-center gap-3 surface-noir px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">升级进度</h1>
        </header>

        {/* 当前等级主卡 */}
        <div className="surface-noir px-5 pb-7 pt-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-white/50">当前等级</p>
              <p className="text-xl font-bold text-white mt-1">{current.level}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#B8973A]/20 flex items-center justify-center">
              <Crown size={24} className="text-[#B8973A]" />
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
            <TrendingUp size={16} className="text-[#B8973A] shrink-0" />
            <p className="text-xs text-white/70 leading-relaxed">
              完成下方全部条件，即可升级为 <span className="text-[#B8973A] font-semibold">{current.next}</span>，解锁更高分佣与专属权益。
            </p>
          </div>
        </div>

        <div className="px-4 py-5 space-y-4">
          {/* 条件进度 */}
          <div className="bg-white rounded-2xl p-4">
            <h2 className="text-sm font-bold text-[#1A1208] mb-4">升级条件</h2>
            <div className="space-y-4">
              {conditions.map((c, i) => {
                const pct = Math.min(100, Math.round((c.current / c.target) * 100));
                const done = c.done || c.current >= c.target;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-[#3D2B1A] flex items-center gap-1.5">
                        {done && <Check size={13} className="text-[#5A8A5A]" />}
                        {c.label}
                      </span>
                      <span className="text-[11px] tabular-nums text-[#8C7B6B]">
                        <span className={done ? "text-[#5A8A5A] font-semibold" : "text-[#B8973A] font-semibold"}>
                          {c.current.toLocaleString()}
                        </span>
                        {" / "}{c.target.toLocaleString()} {c.unit}
                      </span>
                    </div>
                    <div className="h-2 bg-[#F0E8DC] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${done ? "bg-[#5A8A5A]" : "bg-[#B8973A]"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 可解锁奖励 */}
          <div className="bg-white rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <Gift size={16} className="text-[#B8973A]" />
              <h2 className="text-sm font-bold text-[#1A1208]">升级可解锁</h2>
            </div>
            <div className="space-y-2.5">
              {rewards.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    r.unlocked ? "bg-[#EEF6EE]" : "bg-[#F5EFE8]"
                  }`}>
                    {r.unlocked
                      ? <Check size={14} className="text-[#5A8A5A]" />
                      : <Lock size={13} className="text-[#A89685]" />}
                  </div>
                  <span className={`text-xs ${r.unlocked ? "text-[#5A8A5A]" : "text-[#3D2B1A]"}`}>
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 入账状态说明 */}
          <div className="bg-[#FFF7E6] rounded-xl p-3">
            <p className="text-[11px] text-[#8C7B6B] leading-relaxed">
              业绩数据每日 0 点更新，升级审核在条件达成后 1 个工作日内完成。升级成功后，新等级权益自动生效，奖励将在下一结算周期入账。
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
