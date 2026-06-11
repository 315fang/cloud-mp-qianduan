"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Copy,
  Check,
  Share2,
  Gift,
  Users,
  ChevronRight,
  QrCode,
  MessageCircle,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const inviteCode = "YJ2024001";
const inviteLink = "https://yunjihf.com/join?code=YJ2024001";

const rewards = [
  { trigger: "好友注册", reward: "¥10 现金", desc: "好友完成注册即发放", color: "#4A7CC7", bg: "#EBF1FB" },
  { trigger: "好友首单", reward: "¥30 现金", desc: "好友首单成功即结算", color: "#2D8C5E", bg: "#E8F5EE" },
  { trigger: "好友升级L2", reward: "¥100 奖励", desc: "好友升至L2高级经销商", color: "#B8973A", bg: "#FBF5E6" },
];

const inviteRecords = [
  { name: "周*云", joinDate: "2024-11-10", reward: "¥10", status: "已发放", step: "注册" },
  { name: "吴*婷", joinDate: "2024-11-05", reward: "¥40", status: "已发放", step: "首单" },
  { name: "郑*宁", joinDate: "2024-10-28", reward: "¥140", status: "已发放", step: "升级L2" },
];

export default function InvitePage() {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1800);
    } catch {}
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1800);
    } catch {}
  };

  return (
    <PhoneFrame hideNav>
      {/* 顶部 */}
      <div className="surface-noir px-4 pt-4 pb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#B8973A]/10"
          style={{ transform: "translate(30%, -40%)" }}
        />
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10"
            aria-label="返回"
          >
            <ArrowLeft size={17} className="text-white" />
          </button>
          <span className="text-sm font-bold text-white">邀请好友</span>
          <div className="w-8" />
        </div>

        <div className="text-center">
          <p className="text-[11px] tracking-[0.2em] text-[#B8973A] font-medium">REFERRAL PROGRAM</p>
          <h1 className="text-xl font-bold text-white mt-1">邀请好友，共享收益</h1>
          <p className="text-xs text-white/50 mt-1.5">每成功邀请一位，最高可获 ¥140 奖励</p>

          {/* 已邀请统计 */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { label: "已邀请", value: "16人" },
              { label: "待发奖励", value: "¥80" },
              { label: "累计收益", value: "¥2,040" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 rounded-xl py-3">
                <p className="text-base font-bold text-white">{value}</p>
                <p className="text-[10px] text-white/50 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4 pb-6">
        {/* 邀请码卡片 */}
        <div className="bg-white rounded-2xl p-5 shadow">
          <p className="text-[11px] text-[#8C7B6B] font-medium tracking-wider mb-4 text-center">我的专属邀请码</p>
          <div className="flex items-center justify-between bg-[#FAF7F4] rounded-2xl px-5 py-4 mb-4">
            <p className="text-2xl font-bold tracking-[0.3em] text-[#1A1208]">{inviteCode}</p>
            <button
              onClick={handleCopyCode}
              className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all ${
                copiedCode ? "bg-[#E8F5EE] text-[#2D8C5E]" : "bg-[#1A1208] text-white"
              }`}
            >
              {copiedCode ? <Check size={14} /> : <Copy size={14} />}
              {copiedCode ? "已复制" : "复制"}
            </button>
          </div>

          {/* 分享方式 */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: MessageCircle, label: "分享给好友", color: "#2D8C5E" },
              { icon: QrCode, label: "我的二维码", color: "#4A7CC7" },
              { icon: Share2, label: "复制链接", color: "#B8973A", onClick: handleCopyLink },
            ].map(({ icon: Icon, label, color, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="flex flex-col items-center gap-2 py-3 bg-[#FAF7F4] rounded-xl"
              >
                <Icon size={20} style={{ color }} strokeWidth={1.5} />
                <span className="text-[10px] text-[#3D2B1A] font-medium">{label}</span>
                {label === "复制链接" && copiedLink && (
                  <span className="text-[9px] text-[#2D8C5E]">已复制</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 邀请奖励说明 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#F0E8DC] flex items-center gap-2">
            <Gift size={15} className="text-[#B8973A]" />
            <span className="text-sm font-bold text-[#1A1208]">邀请奖励规则</span>
          </div>
          <div className="p-4 space-y-3">
            {rewards.map(({ trigger, reward, desc, color, bg }) => (
              <div key={trigger} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: bg }}
                >
                  <Gift size={18} style={{ color }} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#1A1208]">{trigger}</span>
                    <span className="text-sm font-bold" style={{ color }}>→ {reward}</span>
                  </div>
                  <p className="text-[10px] text-[#8C7B6B] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 pb-4">
            <button className="w-full text-center text-[12px] text-[#B8973A] font-medium flex items-center justify-center gap-1">
              查看完整规则 <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* 邀请记录 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#F0E8DC] flex items-center gap-2">
            <Users size={15} className="text-[#B8973A]" />
            <span className="text-sm font-bold text-[#1A1208]">邀请记录</span>
          </div>
          <div className="divide-y divide-[#F9F5F0]">
            {inviteRecords.map(({ name, joinDate, reward, status, step }) => (
              <div key={name} className="flex items-center gap-3 px-4 py-3">
                <div className="w-9 h-9 rounded-full bg-[#F5EFE8] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[#B8973A]">{name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1208]">{name}</p>
                  <p className="text-[10px] text-[#8C7B6B]">{joinDate} 完成{step}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-[#2D8C5E]">{reward}</p>
                  <span className="text-[9px] text-[#2D8C5E] bg-[#E8F5EE] px-1.5 py-0.5 rounded-full">{status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 text-center">
            <button className="text-[12px] text-[#B8973A] font-medium flex items-center gap-1 mx-auto">
              查看全部记录 <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
