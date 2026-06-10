"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Ticket, TrendingUp, ChevronRight, Crown, Users } from "lucide-react";
import Link from "next/link";
import PhoneFrame from "@/components/PhoneFrame";

const member = {
  identityName: "高级会员",
  growthValue: 3580,
  level: 2,
  levelName: "精英会员",
  nextStage: { name: "尊享会员", threshold: 5000 },
  points: 1240,
  coupons: 6,
  hasTeam: true,
  consumeLevel: "精英会员 · 9.5 折专享",
  distributorLevel: "高级推广员 · 团队 12 人",
  upgradeRoute: "再消费 ¥1,420 升级尊享会员",
};

const assets = [
  { label: "可用积分", value: member.points.toLocaleString(), icon: Star, href: "/profile/points" },
  { label: "可用优惠券", value: member.coupons, icon: Ticket, href: "/profile/coupons" },
  { label: "当前成长值", value: member.growthValue.toLocaleString(), icon: TrendingUp },
];

export default function MemberCenterPage() {
  const router = useRouter();
  const progress = Math.min((member.growthValue / member.nextStage.threshold) * 100, 100);
  const remain = member.nextStage.threshold - member.growthValue;

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]" aria-label="返回">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">会员中心</span>
          <Link href="/profile/rights" className="text-xs text-[#B8973A] font-medium">权益说明</Link>
        </div>

        <div className="flex-1 overflow-y-auto pb-6">
          {/* Hero */}
          <div className="mx-4 mt-4 bg-[#1A1208] rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #D4AF5A, transparent 70%)" }} />
            <div className="flex items-center gap-2 mb-4 relative">
              <Crown size={18} className="text-[#D4AF5A]" />
              <span className="text-lg font-bold">{member.identityName}</span>
              <span className="ml-auto text-[11px] bg-[#B8973A] px-2.5 py-0.5 rounded-full">Lv.{member.level} {member.levelName}</span>
            </div>
            <div className="relative">
              <div className="flex justify-between text-xs text-white/60 mb-1.5">
                <span>成长值 {member.growthValue.toLocaleString()}</span>
                <span>距 {member.nextStage.name} 还差 {remain}</span>
              </div>
              <div className="h-2 bg-white/15 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #B8973A, #D4AF5A)" }} />
              </div>
            </div>
          </div>

          {/* 三资产卡 */}
          <div className="grid grid-cols-3 gap-3 mx-4 mt-4">
            {assets.map(({ label, value, icon: Icon, href }) => {
              const inner = (
                <div className="bg-white rounded-2xl p-3 flex flex-col items-center gap-1">
                  <Icon size={18} className="text-[#B8973A]" />
                  <span className="text-lg font-bold text-[#1A1208] leading-none mt-1">{value}</span>
                  <span className="text-[11px] text-[#8C7B6B]">{label}</span>
                </div>
              );
              return href ? <Link key={label} href={href}>{inner}</Link> : <div key={label}>{inner}</div>;
            })}
          </div>

          {/* 身份权益 */}
          <div className="mx-4 mt-4 bg-white rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-[#1A1208]">我的身份权益</h3>
            <div className="flex items-center gap-3 p-3 bg-[#FFF7E6] rounded-xl">
              <div className="w-9 h-9 rounded-full bg-[#B8973A]/15 flex items-center justify-center shrink-0">
                <Star size={16} className="text-[#B8973A]" />
              </div>
              <div>
                <p className="text-xs text-[#8C7B6B]">消费等级</p>
                <p className="text-sm font-medium text-[#1A1208]">{member.consumeLevel}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#F5EFE8] rounded-xl">
              <div className="w-9 h-9 rounded-full bg-[#6B4EC7]/15 flex items-center justify-center shrink-0">
                <Users size={16} className="text-[#6B4EC7]" />
              </div>
              <div>
                <p className="text-xs text-[#8C7B6B]">分销/团队身份</p>
                <p className="text-sm font-medium text-[#1A1208]">{member.distributorLevel}</p>
              </div>
            </div>
          </div>

          {/* 升级路径 */}
          <div className="mx-4 mt-4 bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#1A1208]">升级路径</h3>
              <Link href="/profile/rights" className="flex items-center text-xs text-[#B8973A]">完整门槛 <ChevronRight size={13} /></Link>
            </div>
            <p className="text-sm text-[#3D2B1A] mb-2">{member.upgradeRoute}</p>
            <div className="h-2 bg-[#F5EFE8] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #B8973A, #D4AF5A)" }} />
            </div>
            <p className="text-right text-[11px] text-[#8C7B6B] mt-1.5">{Math.round(progress)}%</p>
          </div>

          {/* 团队中心入口（仅有团队身份） */}
          {member.hasTeam && (
            <Link href="/distributor/team" className="mx-4 mt-4 bg-[#1A1208] rounded-2xl p-4 flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-[#B8973A]/20 flex items-center justify-center shrink-0">
                <Users size={18} className="text-[#D4AF5A]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">团队中心</p>
                <p className="text-xs text-white/60">查看团队成员、佣金与货款</p>
              </div>
              <ChevronRight size={18} className="text-white/40" />
            </Link>
          )}

          {/* 完整说明入口 */}
          <Link href="/profile/rights" className="mx-4 mt-4 bg-white rounded-2xl p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-[#1A1208]">查看完整身份权益说明</span>
            <ChevronRight size={18} className="text-[#C8BAA8]" />
          </Link>
        </div>
      </div>
    </PhoneFrame>
  );
}
