"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Gift, ShieldCheck, Sparkles } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function InviteBindPage() {
  const router = useRouter();
  const [bound, setBound] = useState(false);

  // 邀请人信息（实际由 URL 参数 / 后端解析）
  const inviter = {
    name: "李静茵",
    avatar: "李",
    level: "金牌合伙人",
    desc: "邀请你加入问兰，开启专属护肤之旅",
  };

  const perks = [
    { icon: Gift, title: "新人专享礼包", desc: "绑定即领 ¥50 无门槛券" },
    { icon: Sparkles, title: "会员积分", desc: "下单累积，兑换好礼" },
    { icon: ShieldCheck, title: "正品保障", desc: "品牌直供，假一赔十" },
  ];

  const handleBind = () => {
    // 资金红线：实际绑定关系写入由后端处理
    setBound(true);
    setTimeout(() => router.push("/"), 1500);
  };

  return (
    <PhoneFrame hideNav>
      <div className="min-h-full bg-[#1A1208] flex flex-col">
        {/* Hero */}
        <div className="px-6 pt-12 pb-8 text-center">
          <p className="text-[10px] tracking-[0.4em] text-[#B8973A] uppercase mb-4">Wenlan Beauty · 问兰</p>
          <div className="w-20 h-20 rounded-full bg-[#F0E6C8] flex items-center justify-center text-3xl font-bold text-[#B8973A] mx-auto mb-4">
            {inviter.avatar}
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-white">{inviter.name}</h2>
            <span className="text-[10px] text-[#B8973A] border border-[#B8973A]/50 px-2 py-0.5 rounded-full">
              {inviter.level}
            </span>
          </div>
          <p className="text-sm text-white/60">{inviter.desc}</p>
        </div>

        {/* 权益卡 */}
        <div className="flex-1 bg-[#FAF7F4] rounded-t-3xl px-5 pt-6 pb-8">
          <h3 className="text-base font-bold text-[#1A1208] text-center mb-5">绑定后立即享受</h3>
          <div className="space-y-3">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#F5EFE8] flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-[#B8973A]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#1A1208]">{title}</p>
                  <p className="text-xs text-[#8C7B6B] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 绑定按钮 */}
          <button
            onClick={handleBind}
            disabled={bound}
            className={`w-full mt-6 text-sm font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-opacity ${
              bound ? "bg-[#B8973A]/60 text-[#1A1208]" : "bg-[#B8973A] text-[#1A1208] active:opacity-80"
            }`}
          >
            {bound ? (
              <>
                <Check size={18} />
                绑定成功，正在跳转…
              </>
            ) : (
              "确认绑定并领取礼包"
            )}
          </button>
          <p className="text-[11px] text-[#A89685] text-center mt-3 leading-relaxed">
            绑定后将与邀请人建立专属关系，享受其推荐权益。<br />
            点击即代表同意《问兰用户协议》与《隐私政策》
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}
