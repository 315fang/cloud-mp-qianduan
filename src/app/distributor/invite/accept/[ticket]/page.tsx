"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, BadgeCheck, ArrowDown, Clock, ShieldCheck, User,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function InviteAcceptPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const data = {
    inviter: { name: "李静茵", id: "WL10086", level: "钻石合伙人", avatar: "李" },
    target: "金牌合伙人",
    amount: "5,000.00",
    ticket: "YY202412010001",
    ticketStatus: "有效",
    expire: "2024-12-08 10:24",
    invitee: { name: "陈雅琳", phone: "138****8829" },
  };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4] pb-24">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A1208] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">邀约确认</h1>
        </header>

        {/* Hero */}
        <div className="bg-[#1A1208] px-5 pb-7 pt-3 text-center">
          <p className="text-[10px] tracking-[0.3em] text-[#B8973A] uppercase mb-2">Partner Invitation</p>
          <h2 className="text-xl font-light text-white leading-snug">
            您收到一份<br />合伙人邀约
          </h2>
          <p className="text-xs text-white/50 mt-3">请确认以下信息后接受邀约</p>
        </div>

        <div className="px-4 py-5 space-y-4">
          {/* 划拨关系图 */}
          <div className="bg-white rounded-2xl p-5">
            {/* 发起人 */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#F0E6C8] flex items-center justify-center text-base font-bold text-[#B8973A]">
                {data.inviter.avatar}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-[#1A1208]">{data.inviter.name}</p>
                  <span className="text-[10px] text-[#B8973A] border border-[#B8973A]/40 px-1.5 py-0.5 rounded-full">
                    {data.inviter.level}
                  </span>
                </div>
                <p className="text-[11px] text-[#A89685] mt-0.5">邀请人 ID {data.inviter.id}</p>
              </div>
            </div>

            {/* 划拨货款 */}
            <div className="my-4 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F4] flex items-center justify-center">
                <ArrowDown size={16} className="text-[#B8973A]" />
              </div>
              <div className="mt-2 bg-[#FFF7E6] rounded-xl px-4 py-2 text-center">
                <p className="text-[11px] text-[#C8973A]">通过后将为您划拨货款</p>
                <p className="text-2xl font-light text-[#B8973A] tabular-nums">¥{data.amount}</p>
              </div>
            </div>

            {/* 接受人 */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#F5EFE8] flex items-center justify-center">
                <User size={20} className="text-[#8C7B6B]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A1208]">{data.invitee.name}</p>
                <p className="text-[11px] text-[#A89685] mt-0.5">接受人 {data.invitee.phone}</p>
              </div>
            </div>
          </div>

          {/* 详情 */}
          <div className="bg-white rounded-2xl p-4 space-y-3">
            <Row icon={BadgeCheck} label="目标身份" value={data.target} highlight />
            <Row icon={ShieldCheck} label="票据状态" value={data.ticketStatus} />
            <Row icon={Clock} label="有效期至" value={data.expire} />
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-[#8C7B6B]">票据号</span>
              <span className="text-xs text-[#3D2B1A]">{data.ticket}</span>
            </div>
          </div>

          <p className="text-[11px] text-[#A89685] px-1 leading-relaxed">
            接受邀约即表示您同意成为问兰{data.target}，划拨货款将进入您的货款余额，仅可用于采购订货。
          </p>
        </div>

        {/* 底部确认 */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-white border-t border-[#F0E8DC] px-4 py-3">
          <button
            onClick={() => { setAccepted(true); alert("功能开发中"); }}
            className="w-full bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3.5 rounded-xl active:opacity-80"
          >
            {accepted ? "已确认接受" : "确认接受邀约"}
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Row({ icon: Icon, label, value, highlight }: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string; value: string; highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Icon size={14} className="text-[#B8973A]" />
        <span className="text-xs text-[#8C7B6B]">{label}</span>
      </div>
      <span className={`text-sm ${highlight ? "font-bold text-[#B8973A]" : "text-[#3D2B1A]"}`}>{value}</span>
    </div>
  );
}
