"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Ticket,
  TrendingUp,
  ChevronRight,
  Crown,
  Users,
  Gift,
  Truck,
  Headphones,
  Cake,
  Sparkles,
  BadgePercent,
} from "lucide-react";
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
  upgradeRoute: "再消费 ¥1,420 升级尊享会员",
};

const assets = [
  { label: "可用积分", value: member.points.toLocaleString(), icon: Star, href: "/profile/points" },
  { label: "优惠券", value: member.coupons, icon: Ticket, href: "/profile/coupons" },
  { label: "成长值", value: member.growthValue.toLocaleString(), icon: TrendingUp },
];

// 当前等级专属权益（图标化，会员语言而非功能语言）
const privileges = [
  { icon: BadgePercent, label: "全场 9.5 折", desc: "会员专享价" },
  { icon: Gift, label: "每月礼遇", desc: "中样随单赠" },
  { icon: Cake, label: "生日三倍", desc: "积分加速月" },
  { icon: Truck, label: "优先发货", desc: "顺丰急速达" },
  { icon: Headphones, label: "专属顾问", desc: "1v1 肌肤咨询" },
  { icon: Sparkles, label: "新品先享", desc: "提前 7 天购" },
];

// 等级阶梯
const ladder = [
  { name: "普通会员", short: "普通", reached: true },
  { name: "精英会员", short: "精英", reached: true, current: true },
  { name: "尊享会员", short: "尊享", reached: false },
  { name: "黑金会员", short: "黑金", reached: false },
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
          {/* 会员卡：香槟面板 + 衬线字标，物理会员卡质感 */}
          <div className="mx-4 mt-4 surface-champagne rounded-2xl p-5 relative overflow-hidden border border-[#EADFC8] animate-rise animate-rise-1">
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-[#B8973A]/8 -translate-y-1/3 translate-x-1/4 pointer-events-none" aria-hidden="true" />
            <div className="flex items-center justify-between relative">
              <div>
                <p className="eyebrow">Wenlan Membre</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <h2 className="font-luxury text-xl text-[#1A1208]">{member.levelName}</h2>
                  <span className="text-[10px] font-medium text-[#8C6B1F] bg-white/70 px-2 py-0.5 rounded-full border border-[#E2D3B4]">
                    Lv.{member.level}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/80 border border-[#E2D3B4] flex items-center justify-center">
                <Crown size={20} className="text-[#B8973A]" strokeWidth={1.5} />
              </div>
            </div>

            <div className="mt-5 relative">
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-[#8C6B1F] font-medium">成长值 {member.growthValue.toLocaleString()}</span>
                <span className="text-[#B0A18C]">距{member.nextStage.name}还差 {remain.toLocaleString()}</span>
              </div>
              <div className="h-1.5 bg-[#E8DCC4] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#B8973A] to-[#D4AF5A]" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-[10px] text-[#B0A18C] mt-2">{member.upgradeRoute}</p>
            </div>
          </div>

          {/* 三资产（细线分隔，一卡收纳） */}
          <div className="mx-4 mt-3 bg-white rounded-2xl grid grid-cols-3 divide-x divide-[#F0E8DC] py-3.5">
            {assets.map(({ label, value, icon: Icon, href }) => {
              const inner = (
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-base font-bold text-[#1A1208] leading-none">{value}</span>
                  <span className="flex items-center gap-1 text-[10px] text-[#8C7B6B] mt-1">
                    <Icon size={11} className="text-[#B8973A]" /> {label}
                  </span>
                </div>
              );
              return href ? <Link key={label} href={href}>{inner}</Link> : <div key={label}>{inner}</div>;
            })}
          </div>

          {/* 专属权益宫格：当前等级可享 */}
          <div className="mx-4 mt-4">
            <div className="flex items-baseline justify-between mb-3 px-1">
              <h3 className="font-luxury text-base text-[#1A1208]">专属礼遇</h3>
              <span className="text-[10px] text-[#8C7B6B]">{member.levelName}可享 {privileges.length} 项</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {privileges.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-white rounded-2xl p-3.5 flex flex-col items-center text-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-[#F5EFE8] flex items-center justify-center">
                    <Icon size={17} className="text-[#B8973A]" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs font-semibold text-[#1A1208] leading-tight">{label}</p>
                  <p className="text-[10px] text-[#8C7B6B] leading-tight">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 等级阶梯：水平旅程 */}
          <div className="mx-4 mt-4 bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-4">会员旅程</h3>
            <div className="flex items-center">
              {ladder.map((l, i) => (
                <div key={l.name} className={`flex items-center ${i < ladder.length - 1 ? "flex-1" : ""}`}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        l.current
                          ? "bg-[#B8973A] border-[#B8973A]"
                          : l.reached
                            ? "bg-[#F0E6C8] border-[#E2D3B4]"
                            : "bg-[#FAF7F4] border-[#F0E8DC]"
                      }`}
                    >
                      <Crown size={13} className={l.current ? "text-white" : l.reached ? "text-[#B8973A]" : "text-[#D8CCBA]"} strokeWidth={1.5} />
                    </div>
                    <span className={`text-[10px] leading-none ${l.current ? "text-[#8C6B1F] font-bold" : "text-[#8C7B6B]"}`}>{l.short}</span>
                  </div>
                  {i < ladder.length - 1 && (
                    <div className={`flex-1 h-px mx-1.5 mb-4 ${l.reached ? "bg-[#D4AF5A]" : "bg-[#F0E8DC]"}`} />
                  )}
                </div>
              ))}
            </div>
            <Link href="/profile/rights" className="flex items-center justify-center gap-1 text-[11px] text-[#B8973A] mt-4 pt-3 border-t border-[#F9F5F0]">
              查看各等级完整权益 <ChevronRight size={12} />
            </Link>
          </div>

          {/* 团队中心入口（白卡 + 金圈，不再用黑块） */}
          {member.hasTeam && (
            <Link href="/distributor/team" className="mx-4 mt-4 bg-white rounded-2xl p-4 flex items-center gap-3 border border-[#F0E8DC]">
              <div className="w-10 h-10 rounded-full bg-[#F0E6C8] flex items-center justify-center shrink-0">
                <Users size={18} className="text-[#8C6B1F]" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1A1208]">团队中心</p>
                <p className="text-xs text-[#8C7B6B] mt-0.5">查看团队成员、佣金与货款</p>
              </div>
              <ChevronRight size={18} className="text-[#C8BAA8]" />
            </Link>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
