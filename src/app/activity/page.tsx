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
  Star,
  UserPlus,
  Palette,
  Lock,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import { products } from "@/lib/data";

// 当前用户经销商等级（L2 高级经销商，与「我的」页一致）
const USER_LEVEL = 2;
// 定向邀约所需等级
const INVITE_REQUIRED_LEVEL = 3;

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

// Banner 轮播数据
const banners = [
  {
    id: "summer",
    image: "/images/banner-1.png",
    title: "盛夏焕肤节",
    subtitle: "夏日限定特惠 · 防晒精华同享",
    badge: "限时",
    countdown: 3 * 86400000 + 4 * 3600000 + 23 * 60000,
    href: "/activity/summer",
  },
  {
    id: "member",
    image: "/images/banner-2.png",
    title: "会员日专属福利",
    subtitle: "每月 8 日 · 会员专享额外 9 折",
    badge: "会员专属",
    countdown: 1 * 86400000 + 12 * 3600000,
    href: "/activity/member",
  },
  {
    id: "newuser",
    image: "/images/banner-3.png",
    title: "新人礼遇季",
    subtitle: "首单立减 · 专属新人价",
    badge: "新人专享",
    countdown: 6 * 86400000,
    href: "/activity/newuser",
  },
];

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="min-w-[26px] text-center text-sm font-bold text-white bg-black/30 rounded-md px-1.5 py-1 tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[8px] text-white/70 mt-0.5">{label}</span>
    </div>
  );
}

function CountdownSep() {
  return <span className="text-white/60 font-bold text-sm self-start mt-1 mx-0.5">:</span>;
}

// Banner 轮播
function BannerCarousel() {
  const [active, setActive] = useState(0);
  const countdowns = banners.map((b) => useCountdown(b.countdown));

  useEffect(() => {
    const t = setInterval(() => setActive((v) => (v + 1) % banners.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section aria-label="活动 Banner" className="pt-4">
      <div className="relative w-full h-44 rounded-2xl overflow-hidden">
        {banners.map((b, i) => {
          const cd = countdowns[i];
          return (
            <Link
              key={b.id}
              href={b.href}
              className={`absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
            >
              <Image src={b.image} alt={b.title} fill className="object-cover" priority={i === 0} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1208]/80 via-[#1A1208]/30 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-center">
                <span className="inline-block w-fit text-[10px] font-bold px-2.5 py-1 rounded-full mb-2 bg-[#B8973A] text-white">
                  {b.badge}
                </span>
                <p className="text-lg font-bold text-white">{b.title}</p>
                <p className="text-xs text-white/70 mt-0.5 mb-3">{b.subtitle}</p>
                <div className="flex items-end gap-1">
                  <span className="text-[10px] text-white/70 mr-1 mb-1">距结束</span>
                  <CountdownUnit value={cd.d} label="天" />
                  <CountdownSep />
                  <CountdownUnit value={cd.h} label="时" />
                  <CountdownSep />
                  <CountdownUnit value={cd.m} label="分" />
                  <CountdownSep />
                  <CountdownUnit value={cd.s} label="秒" />
                </div>
              </div>
            </Link>
          );
        })}
        <div className="absolute bottom-3 right-4 z-20 flex gap-1.5">
          {banners.map((b, i) => (
            <button
              key={b.id}
              aria-label={`切换到第 ${i + 1} 张`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ActivityPage() {
  const inviteUnlocked = USER_LEVEL >= INVITE_REQUIRED_LEVEL;

  return (
    <PhoneFrame>
      {/* 顶部标题 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm px-5 pt-4 pb-3 border-b border-[#E8DDD0]">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Activities</p>
            <h1 className="font-luxury text-lg text-[#1A1208]">活动中心</h1>
          </div>
          <Link href="/activity/rules" className="text-[12px] text-[#B8973A] font-medium flex items-center gap-0.5">
            活动规则 <ChevronRight size={13} />
          </Link>
        </div>
      </header>

      <div className="px-4 space-y-5 pb-4">
        {/* Banner 轮播 */}
        <BannerCarousel />

        {/* 活动拼图（Bento 几何拼接） */}
        <section aria-labelledby="bento-heading" className="animate-rise animate-rise-2">
          <div className="text-center mb-4">
            <p className="eyebrow">Curated Events</p>
            <h2 id="bento-heading" className="font-luxury text-lg text-[#1A1208] mt-1">甄选活动</h2>
          </div>

          {/* 第一组：左高卡（秒杀）+ 右两叠卡（拼团/砍价） */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/activity/flash"
              className="relative bg-white rounded-2xl overflow-hidden flex flex-col active:scale-[0.98] transition-transform"
            >
              <div className="relative flex-1 min-h-[148px] bg-[#F5EFE8]">
                <Image src={products[3].image} alt="限时秒杀精选商品" fill className="object-contain p-5" />
              </div>
              <div className="px-4 pb-4 pt-3">
                <div className="flex items-center gap-1.5">
                  <Zap size={14} className="text-[#B8973A]" strokeWidth={1.8} />
                  <p className="text-sm font-bold text-[#1A1208]">限时秒杀</p>
                </div>
                <p className="text-[10px] text-[#8C7B6B] mt-0.5">人气单品 · 限量放送</p>
              </div>
            </Link>

            <div className="flex flex-col gap-3">
              <Link
                href="/group"
                className="relative flex-1 bg-white rounded-2xl p-4 flex flex-col justify-between overflow-hidden active:scale-[0.98] transition-transform"
              >
                <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-[#F0E6C8]/70 pointer-events-none" />
                <Users size={18} className="text-[#B8973A]" strokeWidth={1.6} />
                <div className="relative">
                  <p className="text-sm font-bold text-[#1A1208]">拼团活动</p>
                  <p className="text-[10px] text-[#8C7B6B] mt-0.5">成团享专属价</p>
                </div>
              </Link>
              <Link
                href="/slash"
                className="relative flex-1 bg-white rounded-2xl p-4 flex flex-col justify-between overflow-hidden active:scale-[0.98] transition-transform"
              >
                <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-[#F5EFE8] pointer-events-none" />
                <Scissors size={18} className="text-[#B8973A]" strokeWidth={1.6} />
                <div className="relative">
                  <p className="text-sm font-bold text-[#1A1208]">砍价专区</p>
                  <p className="text-[10px] text-[#8C7B6B] mt-0.5">邀好友砍底价</p>
                </div>
              </Link>
            </div>
          </div>

          {/* 第二组：宽幅抽奖（暖咖深面板）+ 签到方卡 */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            <Link
              href="/lottery"
              className="col-span-2 surface-noir rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between min-h-[108px] active:scale-[0.98] transition-transform"
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#B8973A]/20 pointer-events-none"
                style={{ transform: "translate(30%, -40%)" }}
              />
              <Trophy size={18} className="text-[#D4AF5A]" strokeWidth={1.6} />
              <div>
                <p className="text-sm font-bold text-white">抽奖大转盘</p>
                <p className="text-[10px] text-white/55 mt-0.5">今日已有 128 人获奖</p>
              </div>
            </Link>
            <Link
              href="/questionnaire"
              className="bg-white rounded-2xl p-4 flex flex-col justify-between min-h-[108px] active:scale-[0.98] transition-transform"
            >
              <Star size={18} className="text-[#B8973A]" strokeWidth={1.6} />
              <div>
                <p className="text-sm font-bold text-[#1A1208]">每日签到</p>
                <p className="text-[10px] text-[#8C7B6B] mt-0.5">连签领惊喜</p>
              </div>
            </Link>
          </div>

          {/* 第三组：随心选方卡 + 宽幅积分商城（香槟面板） */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            <Link
              href="/activity/diy/list"
              className="bg-white rounded-2xl p-4 flex flex-col justify-between min-h-[108px] active:scale-[0.98] transition-transform"
            >
              <Palette size={18} className="text-[#B8973A]" strokeWidth={1.6} />
              <div>
                <p className="text-sm font-bold text-[#1A1208]">随心选</p>
                <p className="text-[10px] text-[#8C7B6B] mt-0.5">自由组合优惠</p>
              </div>
            </Link>
            <Link
              href="/profile/points"
              className="col-span-2 surface-champagne border border-[#EADFC8] rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between min-h-[108px] active:scale-[0.98] transition-transform"
            >
              <div
                className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-[#B8973A]/10 pointer-events-none"
                style={{ transform: "translate(30%, 40%)" }}
              />
              <Gift size={18} className="text-[#8C6B1F]" strokeWidth={1.6} />
              <div>
                <p className="text-sm font-bold text-[#1A1208]">积分商城</p>
                <p className="text-[10px] text-[#8C7B6B] mt-0.5">签到、消费赚积分 · 兑好礼</p>
              </div>
            </Link>
          </div>
        </section>

        {/* 定向邀约：等级门槛卡 */}
        <section aria-labelledby="invite-heading" className="animate-rise animate-rise-3">
          {inviteUnlocked ? (
            <Link
              href="/invite/activity?mode=share"
              className="block bg-white rounded-2xl p-5 relative overflow-hidden active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#F0E6C8] flex items-center justify-center shrink-0">
                  <UserPlus size={20} className="text-[#8C6B1F]" strokeWidth={1.6} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 id="invite-heading" className="text-sm font-bold text-[#1A1208]">定向邀约</h2>
                    <span className="text-[9px] font-medium text-[#8C6B1F] bg-[#F0E6C8] px-1.5 py-0.5 rounded-full">
                      L{INVITE_REQUIRED_LEVEL}+ 专享
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C7B6B] mt-0.5">邀好友得双重奖励 · 仅限受邀名额</p>
                </div>
                <ChevronRight size={16} className="text-[#C0B0A0] shrink-0" />
              </div>
            </Link>
          ) : (
            <div className="bg-white rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center gap-4 opacity-60">
                <div className="w-11 h-11 rounded-full bg-[#F5EFE8] flex items-center justify-center shrink-0">
                  <Lock size={18} className="text-[#B0A18C]" strokeWidth={1.6} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 id="invite-heading" className="text-sm font-bold text-[#1A1208]">定向邀约</h2>
                    <span className="text-[9px] font-medium text-[#B0A18C] bg-[#F5EFE8] px-1.5 py-0.5 rounded-full">
                      L{INVITE_REQUIRED_LEVEL} 及以上专享
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C7B6B] mt-0.5">当前 L{USER_LEVEL} · 升级经销商等级后解锁</p>
                </div>
              </div>
              <Link
                href="/profile/rights"
                className="mt-3 flex items-center justify-center gap-1 text-[11px] font-medium text-[#8C6B1F] bg-[#F0E6C8] rounded-full py-2"
              >
                查看升级路径 <ChevronRight size={12} />
              </Link>
            </div>
          )}
        </section>

        <div className="pb-2" />
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
