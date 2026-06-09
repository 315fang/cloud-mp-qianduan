"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Star, Shield, TrendingUp, ChevronRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const LEVELS = [
  {
    level: "L1",
    name: "普通经销商",
    color: "#8C7B6B",
    bg: "#F5EFE8",
    commission: "10%",
    teamCommission: "3%",
    perks: ["专属商品供货价", "L1层级佣金 10%", "下级团队分佣 3%", "官方素材支持"],
  },
  {
    level: "L2",
    name: "高级经销商",
    color: "#B8973A",
    bg: "#FBF5E6",
    commission: "13%",
    teamCommission: "5%",
    perks: ["L1全部权益", "L1层级佣金 13%", "下级团队分佣 5%", "月度数据报表", "优先发货权"],
    recommended: true,
  },
  {
    level: "L3",
    name: "白金经销商",
    color: "#4A7CC7",
    bg: "#EBF1FB",
    commission: "15%",
    teamCommission: "8%",
    perks: ["L2全部权益", "L1层级佣金 15%", "下级团队分佣 8%", "专属客户经理", "年度品牌礼盒"],
  },
];

export default function DealerApplyPage() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<string>("L2");
  const [step, setStep] = useState<"select" | "form" | "success">("select");
  const [form, setForm] = useState({ name: "", city: "", wechat: "", reason: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.wechat) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setStep("success");
  };

  if (step === "success") {
    return (
      <PhoneFrame>
        <div className="flex items-center justify-between px-4 py-3 bg-[#1A1208]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10">
            <ArrowLeft size={17} className="text-white" />
          </button>
          <span className="text-sm font-bold text-white">申请经销商</span>
          <div className="w-8" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8 bg-[#FAF7F4] text-center gap-4">
          <CheckCircle2 size={64} className="text-[#2D8C5E]" strokeWidth={1.2} />
          <div>
            <p className="text-lg font-bold text-[#1A1208]">申请已提交</p>
            <p className="text-sm text-[#8C7B6B] mt-2 leading-relaxed">
              审核通常在 1 个工作日内完成，通过后您将收到通知，可立即享受经销商专属权益。
            </p>
          </div>
          <div className="w-full bg-white rounded-2xl px-4 py-4 text-left space-y-2 border border-[#F0E8DC]">
            {[
              { label: "申请等级", value: `${selectedLevel} ${LEVELS.find((l) => l.level === selectedLevel)?.name}` },
              { label: "联系人", value: form.name },
              { label: "微信/电话", value: form.wechat },
              { label: "所在城市", value: form.city || "未填写" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-[#8C7B6B]">{label}</span>
                <span className="text-[#1A1208] font-medium">{value}</span>
              </div>
            ))}
          </div>
          <button onClick={() => router.push("/distributor")} className="w-full bg-[#B8973A] text-white font-bold py-4 rounded-2xl text-sm mt-2">
            返回工作台
          </button>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1A1208]">
        <button
          onClick={() => step === "form" ? setStep("select") : router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10"
          aria-label="返回"
        >
          <ArrowLeft size={17} className="text-white" />
        </button>
        <span className="text-sm font-bold text-white tracking-wide">申请经销商</span>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto bg-[#FAF7F4]">
        {step === "select" && (
          <div className="p-4 space-y-4">
            {/* 顶部说明 */}
            <div className="bg-[#1A1208] rounded-2xl px-5 py-4 text-center">
              <p className="text-[10px] tracking-widest text-[#B8973A] font-semibold mb-1">CLOUD BEAUTY · 分销体系</p>
              <p className="text-base font-bold text-white">成为经销商，开启副业新可能</p>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">销售即佣金，团队越大收益越高，零库存无压力</p>
            </div>

            {/* 核心优势 */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "零风险", sub: "无需囤货" },
                { icon: TrendingUp, label: "双层收益", sub: "直销+团队" },
                { icon: Star, label: "轻奢品牌", sub: "高复购率" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-white rounded-2xl p-3 text-center">
                  <div className="w-9 h-9 rounded-full bg-[#F5EFE8] flex items-center justify-center mx-auto mb-2">
                    <Icon size={16} className="text-[#B8973A]" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs font-bold text-[#1A1208]">{label}</p>
                  <p className="text-[10px] text-[#8C7B6B] mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            {/* 等级选择 */}
            <p className="text-xs font-bold text-[#1A1208] tracking-wide">选择申请等级</p>
            {LEVELS.map(({ level, name, color, bg, commission, teamCommission, perks, recommended }) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`w-full rounded-2xl p-4 text-left border-2 transition-all ${
                  selectedLevel === level ? "border-[#B8973A]" : "border-[#F0E8DC] bg-white"
                }`}
                style={{ background: selectedLevel === level ? bg : "white" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold px-2.5 py-0.5 rounded-full text-white" style={{ background: color }}>{level}</span>
                    <span className="text-sm font-bold text-[#1A1208]">{name}</span>
                    {recommended && (
                      <span className="text-[9px] font-bold text-[#B8973A] bg-[#FBF5E6] border border-[#B8973A]/30 px-1.5 py-0.5 rounded-full">
                        推荐
                      </span>
                    )}
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedLevel === level ? "border-[#B8973A] bg-[#B8973A]" : "border-[#E8DDD0]"
                  }`}>
                    {selectedLevel === level && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                </div>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 bg-white/60 rounded-xl px-3 py-2 text-center">
                    <p className="text-base font-bold" style={{ color }}>{commission}</p>
                    <p className="text-[10px] text-[#8C7B6B]">直销佣金</p>
                  </div>
                  <div className="flex-1 bg-white/60 rounded-xl px-3 py-2 text-center">
                    <p className="text-base font-bold" style={{ color }}>{teamCommission}</p>
                    <p className="text-[10px] text-[#8C7B6B]">团队分佣</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-2 text-[11px] text-[#3D2B1A]">
                      <CheckCircle2 size={11} style={{ color }} />
                      {perk}
                    </div>
                  ))}
                </div>
              </button>
            ))}

            <button
              onClick={() => setStep("form")}
              className="w-full bg-[#B8973A] text-white font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2"
            >
              申请 {selectedLevel} {LEVELS.find((l) => l.level === selectedLevel)?.name}
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="bg-[#FBF5E6] rounded-2xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#B8973A]">申请等级</p>
                <p className="text-sm font-bold text-[#1A1208] mt-0.5">
                  {selectedLevel} {LEVELS.find((l) => l.level === selectedLevel)?.name}
                </p>
              </div>
              <button type="button" onClick={() => setStep("select")} className="text-xs text-[#B8973A] underline">
                更改
              </button>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden divide-y divide-[#F9F5F0]">
              {[
                { label: "姓名", key: "name" as const, placeholder: "您的真实姓名", required: true },
                { label: "所在城市", key: "city" as const, placeholder: "如：上海 · 静安", required: false },
                { label: "微信 / 电话", key: "wechat" as const, placeholder: "方便联系您的方式", required: true },
              ].map(({ label, key, placeholder, required }) => (
                <div key={key} className="flex items-center gap-3 px-4 py-3.5">
                  <span className="text-sm text-[#8C7B6B] w-20 flex-shrink-0">
                    {label}{required && <span className="text-[#B85A2A] ml-0.5">*</span>}
                  </span>
                  <input
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="flex-1 text-sm text-[#1A1208] bg-transparent outline-none placeholder:text-[#C0B0A0]"
                  />
                </div>
              ))}
              <div className="px-4 py-3.5">
                <p className="text-sm text-[#8C7B6B] mb-2">合作意向</p>
                <textarea
                  value={form.reason}
                  onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
                  placeholder="简单介绍您的优势，例如：微信好友数量、销售经验、目标客群等"
                  rows={4}
                  className="w-full text-sm text-[#1A1208] bg-[#FAF7F4] rounded-xl px-3 py-2.5 outline-none resize-none placeholder:text-[#C0B0A0] leading-relaxed"
                />
              </div>
            </div>

            <p className="text-[10px] text-[#8C7B6B] text-center leading-relaxed">
              提交后由问兰商务团队在 1 个工作日内审核并联系您。<br />
              审核通过后等级立即生效，可开始享受专属佣金。
            </p>

            <button
              type="submit"
              disabled={!form.name || !form.wechat || submitting}
              className="w-full bg-[#B8973A] disabled:bg-[#E8DDD0] disabled:text-[#C0B0A0] text-white font-bold py-4 rounded-2xl text-sm transition-colors"
            >
              {submitting ? "提交中..." : "提交申请"}
            </button>
          </form>
        )}
      </div>
    </PhoneFrame>
  );
}
