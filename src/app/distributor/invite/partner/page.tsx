"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Users, Gift, Share2, Copy, Check, TrendingUp } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function PartnerInvitePage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const inviteCode = "WL-PARTNER-8829";
  const benefits = [
    { icon: TrendingUp, title: "专属佣金", desc: "邀约成功后享受团队分佣" },
    { icon: Gift, title: "新人礼包", desc: "合伙人专属开通礼包" },
    { icon: Users, title: "团队权益", desc: "组建并管理自己的团队" },
  ];

  const steps = [
    { step: "01", text: "分享专属邀请链接或二维码给好友" },
    { step: "02", text: "好友通过链接注册并完成实名认证" },
    { step: "03", text: "好友开通合伙人，你即可获得邀约奖励" },
  ];

  const invitedList = [
    { name: "陈**", date: "2024-11-28", status: "已开通", avatar: "陈" },
    { name: "王**", date: "2024-11-25", status: "认证中", avatar: "王" },
    { name: "刘**", date: "2024-11-20", status: "已开通", avatar: "刘" },
  ];

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4]">
        <header className="sticky top-0 z-10 flex items-center gap-3 surface-noir px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">合伙人邀约</h1>
        </header>

        {/* Hero */}
        <div className="surface-noir px-5 pb-6 pt-2">
          <p className="text-[10px] tracking-[0.3em] text-[#B8973A] uppercase mb-2">Partner Program</p>
          <h2 className="text-2xl font-light text-white leading-snug">
            邀请好友成为合伙人<br />共享品牌增长红利
          </h2>
        </div>

        <div className="px-4 py-5 space-y-4">
          {/* 邀请码卡 */}
          <div className="bg-white rounded-2xl p-5">
            <p className="text-xs text-[#8C7B6B] mb-2">我的专属邀请码</p>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xl font-bold text-[#1A1208] tracking-wider">{inviteCode}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 bg-[#F5EFE8] text-[#B8973A] text-xs font-medium px-3 py-2 rounded-lg active:opacity-70"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "已复制" : "复制"}
              </button>
            </div>
            <button className="w-full mt-4 bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:opacity-80">
              <Share2 size={16} />
              分享邀请链接
            </button>
          </div>

          {/* 权益 */}
          <div className="grid grid-cols-3 gap-2">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-3 flex flex-col items-center text-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-[#F5EFE8] flex items-center justify-center">
                  <Icon size={18} className="text-[#B8973A]" />
                </div>
                <p className="text-xs font-bold text-[#1A1208]">{title}</p>
                <p className="text-[10px] text-[#8C7B6B] leading-tight">{desc}</p>
              </div>
            ))}
          </div>

          {/* 邀约流程 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-3">邀约流程</h3>
            <div className="space-y-3">
              {steps.map(({ step, text }) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="text-lg font-light text-[#B8973A] tabular-nums w-7">{step}</span>
                  <span className="text-sm text-[#3D2B1A]">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 已邀约 */}
          <div className="bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#1A1208]">已邀约好友</h3>
              <span className="text-xs text-[#8C7B6B]">共 {invitedList.length} 人</span>
            </div>
            <div className="space-y-2">
              {invitedList.map((p, i) => (
                <div key={i} className="flex items-center gap-3 py-1">
                  <div className="w-9 h-9 rounded-full bg-[#F0E6C8] flex items-center justify-center text-sm font-bold text-[#B8973A] shrink-0">
                    {p.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#1A1208]">{p.name}</p>
                    <p className="text-[11px] text-[#A89685]">{p.date}</p>
                  </div>
                  <span className={`text-xs font-medium ${p.status === "已开通" ? "text-[#B8973A]" : "text-[#8C7B6B]"}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
