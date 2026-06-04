"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Gift,
  Zap,
  Users,
  Scissors,
  ChevronRight,
  Trophy,
  Flame,
  Star,
  Clock,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import { products } from "@/lib/data";

// 倒计时
function useCountdown(targetMs: number) {
  const [left, setLeft] = useState(targetMs);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => Math.max(0, v - 1000)), 1000);
    return () => clearInterval(t);
  }, []);
  const d = Math.floor(left / 86400000);
  const h = Math.floor((left % 86400000) / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);
  return { d, h, m, s };
}

// 节日活动数据
const festivals = [
  {
    id: "summer",
    title: "盛夏焕肤节",
    subtitle: "夏日限定特惠 · 防晒精华同享",
    daysLeft: 3 * 86400000 + 4 * 3600000 + 23 * 60000,
    bg: "from-[#1A1208] to-[#3D2B1A]",
    accent: "#B8973A",
    badge: "限时",
  },
  {
    id: "member",
    title: "会员日专属福利",
    subtitle: "每月 8 日 · 会员专享额外 9 折",
    daysLeft: 1 * 86400000 + 12 * 3600000,
    bg: "from-[#2A3D2B] to-[#1A2A1C]",
    accent: "#5FAD6C",
    badge: "会员专属",
  },
];

// 快捷入口
const quickEntries = [
  { icon: Zap, label: "限时秒杀", href: "/activity/flash", color: "#B8973A", bg: "#FBF5E6" },
  { icon: Users, label: "拼团活动", href: "/activity/group", color: "#4A7CC7", bg: "#EBF1FB" },
  { icon: Scissors, label: "砍价专区", href: "/activity/slash", color: "#B85A2A", bg: "#FBF0E8" },
  { icon: Trophy, label: "抽奖大转盘", href: "/activity/lottery", color: "#7C4AC7", bg: "#F3EBFB" },
  { icon: Gift, label: "积分兑换", href: "/profile/points", color: "#2D8C5E", bg: "#E8F5EE" },
  { icon: Star, label: "每日签到", href: "/activity/checkin", color: "#C7A42A", bg: "#FBF8E6" },
];

// 拼团活动
const groupActivities = [
  {
    id: "g1",
    product: products[0],
    originalPrice: 598,
    groupPrice: 398,
    needPeople: 3,
    joinedPeople: 2,
    timeLeft: 5 * 3600000 + 23 * 60000,
  },
  {
    id: "g2",
    product: products[2],
    originalPrice: 368,
    groupPrice: 228,
    needPeople: 5,
    joinedPeople: 3,
    timeLeft: 12 * 3600000 + 8 * 60000,
  },
];

// 砍价活动
const slashActivities = [
  {
    id: "s1",
    product: products[1],
    originalPrice: 428,
    lowestPrice: 188,
    currentPrice: 268,
    percent: 38,
  },
  {
    id: "s2",
    product: products[4],
    originalPrice: 468,
    lowestPrice: 198,
    currentPrice: 298,
    percent: 55,
  },
];

// 秒杀商品
const flashProducts = [products[3], products[5], products[0]];

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="min-w-[28px] text-center text-sm font-bold text-white bg-[#1A1208] rounded-lg px-1.5 py-1 tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] text-[#8C7B6B] mt-0.5">{label}</span>
    </div>
  );
}

function CountdownSep() {
  return <span className="text-[#8C7B6B] font-bold text-sm self-start mt-1.5 mx-0.5">:</span>;
}

export default function ActivityPage() {
  const festivalCountdowns = festivals.map((f) => useCountdown(f.daysLeft));

  return (
    <PhoneFrame>
      {/* 顶部标题 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm px-5 pt-4 pb-3 border-b border-[#E8DDD0]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-[#B8973A] font-medium uppercase">Activities</p>
            <h1 className="text-lg font-bold text-[#1A1208]">活动中心</h1>
          </div>
          <Link href="/activity/rules" className="text-[12px] text-[#B8973A] font-medium flex items-center gap-0.5">
            活动规则 <ChevronRight size={13} />
          </Link>
        </div>
      </header>

      <div className="px-4 space-y-5 pb-4">
        {/* 节日倒计时横滑 */}
        <section aria-labelledby="festival-heading">
          <h2 id="festival-heading" className="sr-only">节日活动</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pt-4">
            {festivals.map((festival, i) => {
              const cd = festivalCountdowns[i];
              return (
                <Link
                  key={festival.id}
                  href={`/activity/${festival.id}`}
                  className={`flex-shrink-0 w-72 rounded-2xl bg-gradient-to-br ${festival.bg} p-5 relative overflow-hidden`}
                >
                  {/* 背景装饰 */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                    style={{ background: festival.accent, transform: "translate(30%, -30%)" }}
                  />
                  <span
                    className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full mb-2"
                    style={{ background: festival.accent + "33", color: festival.accent }}
                  >
                    {festival.badge}
                  </span>
                  <p className="text-base font-bold text-white">{festival.title}</p>
                  <p className="text-xs text-white/50 mt-0.5 mb-4">{festival.subtitle}</p>
                  {/* 倒计时 */}
                  <div className="flex items-end gap-1">
                    <span className="text-[11px] text-white/50 mr-1 mb-1">距结束</span>
                    <CountdownUnit value={cd.d} label="天" />
                    <CountdownSep />
                    <CountdownUnit value={cd.h} label="时" />
                    <CountdownSep />
                    <CountdownUnit value={cd.m} label="分" />
                    <CountdownSep />
                    <CountdownUnit value={cd.s} label="秒" />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span
                      className="text-xs font-medium px-4 py-1.5 rounded-full text-white flex items-center gap-1"
                      style={{ background: festival.accent }}
                    >
                      立即参与 <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 快捷入口 */}
        <section className="bg-white rounded-2xl p-4" aria-labelledby="quick-entry-heading">
          <h2 id="quick-entry-heading" className="text-sm font-bold text-[#1A1208] mb-4">活动入口</h2>
          <div className="grid grid-cols-3 gap-4">
            {quickEntries.map(({ icon: Icon, label, href, color, bg }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-2">
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center"
                  style={{ background: bg, width: 52, height: 52 }}
                >
                  <Icon size={22} style={{ color }} strokeWidth={1.5} />
                </div>
                <span className="text-[11px] text-[#3D2B1A] font-medium text-center">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 限时秒杀 */}
        <section aria-labelledby="flash-heading">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-[#B8973A]" />
              <h2 id="flash-heading" className="text-base font-bold text-[#1A1208]">限时秒杀</h2>
            </div>
            <Link href="/activity/flash" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              全部 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {flashProducts.map((product) => {
              const discount = product.originalPrice
                ? Math.round((1 - product.price / product.originalPrice) * 100)
                : 0;
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="flex-shrink-0 w-36 bg-white rounded-2xl overflow-hidden"
                >
                  <div className="relative aspect-square bg-[#F5EFE8]">
                    <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
                    {discount > 0 && (
                      <span className="absolute top-2 left-2 bg-[#E8573A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        -{discount}%
                      </span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-semibold text-[#1A1208] line-clamp-1">{product.name}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-sm font-bold text-[#1A1208]">¥{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-[#8C7B6B] line-through">¥{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="mt-1.5 w-full bg-[#E8DDD0] rounded-full h-1 overflow-hidden">
                      <div className="h-full bg-[#B8973A] rounded-full" style={{ width: "72%" }} />
                    </div>
                    <p className="text-[9px] text-[#8C7B6B] mt-0.5">仅剩少量</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 拼团活动 */}
        <section aria-labelledby="group-heading">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-[#4A7CC7]" />
              <h2 id="group-heading" className="text-base font-bold text-[#1A1208]">拼团专区</h2>
            </div>
            <Link href="/activity/group" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              全部 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="space-y-3">
            {groupActivities.map((act) => {
              const h = Math.floor(act.timeLeft / 3600000);
              const m = Math.floor((act.timeLeft % 3600000) / 60000);
              return (
                <div key={act.id} className="bg-white rounded-2xl overflow-hidden flex">
                  <div className="relative w-28 h-28 bg-[#F5EFE8] flex-shrink-0">
                    <Image src={act.product.image} alt={act.product.name} fill className="object-contain p-3" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#1A1208] line-clamp-1">{act.product.name}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-base font-bold text-[#4A7CC7]">¥{act.groupPrice}</span>
                        <span className="text-xs text-[#8C7B6B] line-through">¥{act.originalPrice}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="flex -space-x-1.5">
                          {Array.from({ length: act.joinedPeople }).map((_, i) => (
                            <div key={i} className="w-5 h-5 rounded-full bg-[#B8973A] border-2 border-white flex items-center justify-center">
                              <span className="text-[7px] text-white font-bold">{i + 1}</span>
                            </div>
                          ))}
                          {Array.from({ length: act.needPeople - act.joinedPeople }).map((_, i) => (
                            <div key={i} className="w-5 h-5 rounded-full bg-[#E8DDD0] border-2 border-white flex items-center justify-center">
                              <span className="text-[7px] text-[#8C7B6B]">+</span>
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] text-[#8C7B6B]">
                          还差 {act.needPeople - act.joinedPeople} 人成团
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-[10px] text-[#8C7B6B]">
                        <Clock size={10} />
                        {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")} 后结束
                      </div>
                      <Link
                        href={`/activity/group/${act.id}`}
                        className="text-xs font-medium text-white bg-[#4A7CC7] px-3 py-1.5 rounded-full"
                      >
                        去拼团
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 砍价专区 */}
        <section aria-labelledby="slash-heading">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Scissors size={16} className="text-[#B85A2A]" />
              <h2 id="slash-heading" className="text-base font-bold text-[#1A1208]">砍价专区</h2>
            </div>
            <Link href="/activity/slash" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              全部 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="space-y-3">
            {slashActivities.map((act) => (
              <div key={act.id} className="bg-white rounded-2xl p-4 flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-xl bg-[#F5EFE8] flex-shrink-0 overflow-hidden">
                  <Image src={act.product.image} alt={act.product.name} fill className="object-contain p-2" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1A1208] line-clamp-1">{act.product.name}</p>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base font-bold text-[#B85A2A]">¥{act.currentPrice}</span>
                    <span className="text-xs text-[#8C7B6B] line-through">¥{act.originalPrice}</span>
                  </div>
                  <p className="text-[10px] text-[#8C7B6B] mt-0.5">
                    最低可砍至 <span className="text-[#B85A2A] font-medium">¥{act.lowestPrice}</span>
                  </p>
                  {/* 进度条 */}
                  <div className="mt-2 w-full bg-[#F5EFE8] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#B85A2A] to-[#D4845A] rounded-full"
                      style={{ width: `${act.percent}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-[#8C7B6B] mt-0.5">已有 {act.percent}% 砍价成功</p>
                </div>
                <Link
                  href={`/activity/slash/${act.id}`}
                  className="flex-shrink-0 text-xs font-medium text-white bg-[#B85A2A] px-3 py-1.5 rounded-full"
                >
                  去砍价
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 抽奖大转盘入口 */}
        <Link href="/activity/lottery" className="block">
          <div className="bg-gradient-to-r from-[#1A1208] to-[#3D2B1A] rounded-2xl overflow-hidden px-5 py-5 relative">
            <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-[#B8973A]/20"
              style={{ transform: "translate(30%, -40%)" }}
            />
            <p className="text-[10px] tracking-[0.2em] text-[#B8973A] font-medium">LUCKY DRAW</p>
            <p className="text-base font-bold text-white mt-1">每日抽奖大转盘</p>
            <p className="text-xs text-white/50 mt-0.5 mb-4">免费抽奖机会 · 精华面霜等你拿</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <Trophy size={14} className="text-[#D4AF5A]" />
                <span className="text-xs text-[#D4AF5A] font-medium">今日已有 128 人获奖</span>
              </div>
            </div>
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
              <div className="w-16 h-16 rounded-full border-4 border-[#B8973A]/40 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#B8973A]/30 flex items-center justify-center">
                  <Trophy size={20} className="text-[#D4AF5A]" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="pb-2" />
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
