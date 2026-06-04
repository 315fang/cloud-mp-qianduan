"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, ChevronRight, Gift, Crown, Flame, Star, BookOpen, Users, Sparkles } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BannerCarousel from "@/components/BannerCarousel";

// 气泡通告
const bubbles = [
  "张女士刚刚购买了「臻萃精华」",
  "李女士完成了今日签到，获得 20 积分",
  "王女士拼团成功，省了 ¥80",
  "陈女士升级为黄金会员啦",
  "刘女士邀请好友获得 ¥30 佣金",
];

// 特色卡片
const featureCards = [
  {
    id: 1,
    name: "镜像见面会",
    desc: "线下品鉴·面对面交流",
    tag: "线下",
    bg: "linear-gradient(145deg,#1a1a2e,#16213e)",
    icon: "🪞",
  },
  {
    id: 2,
    name: "创始人对谈",
    desc: "每月直播·答疑解惑",
    tag: "直播",
    bg: "linear-gradient(145deg,#2d1b00,#4a2e05)",
    icon: "🎙️",
  },
  {
    id: 3,
    name: "知识星球",
    desc: "护肤干货·专属社群",
    tag: "社群",
    bg: "linear-gradient(145deg,#0d2818,#1a4a2e)",
    icon: "🌿",
  },
  {
    id: 4,
    name: "共创计划",
    desc: "参与产品研发·共享收益",
    tag: "共创",
    bg: "linear-gradient(145deg,#1e0a2e,#3d1a5e)",
    icon: "✨",
  },
];

export default function HomePage() {
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [todaySigned, setTodaySigned] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // 气泡轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbleVisible(false);
      setTimeout(() => {
        setBubbleIndex((i) => (i + 1) % bubbles.length);
        setBubbleVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLongPressStart = () => {
    const t = setTimeout(() => setShowSurprise(true), 600);
    setLongPressTimer(t);
  };
  const handleLongPressEnd = () => {
    if (longPressTimer) clearTimeout(longPressTimer);
  };

  return (
    <PhoneFrame>
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm border-b border-[#F0E8DC]/50">
        <div className="flex items-center justify-between px-5 pt-3 pb-2">
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-[#B8973A] uppercase">Cloud Beauty</p>
            <h1 className="text-lg font-bold text-[#1A1208] leading-tight">问兰镜像</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/profile/notifications" className="relative w-8 h-8 flex items-center justify-center" aria-label="消息通知">
              <Bell size={20} strokeWidth={1.5} className="text-[#3D2B1A]" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#B8973A] rounded-full" />
            </Link>
            <Link href="/search" className="w-8 h-8 flex items-center justify-center" aria-label="搜索">
              <Search size={20} strokeWidth={1.5} className="text-[#3D2B1A]" />
            </Link>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="px-5 pb-3">
          <Link href="/search" className="flex items-center gap-2 bg-[#F5EFE8] rounded-full px-4 py-2.5">
            <Search size={14} className="text-[#8C7B6B]" />
            <span className="text-[13px] text-[#8C7B6B]">素颜三部曲 · 臻萃精华...</span>
          </Link>
        </div>
      </header>

      <div className="px-4 space-y-4 pb-6">

        {/* 气泡通告 */}
        <div
          className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-sm border border-[#F0E8DC]"
          style={{ opacity: bubbleVisible ? 1 : 0, transition: "opacity 0.3s" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8973A] flex-shrink-0 animate-pulse" />
          <p className="text-[11px] text-[#3D2B1A] truncate">{bubbles[bubbleIndex]}</p>
        </div>

        {/* Banner 海报 */}
        <section>
          <BannerCarousel />
        </section>

        {/* 会员等级卡 */}
        <Link href="/profile" className="block bg-[#1A1208] rounded-2xl px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B8973A]/20 border border-[#B8973A]/40 flex items-center justify-center">
                <Crown size={18} className="text-[#B8973A]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold tracking-widest text-[#B8973A] uppercase">GOLD</span>
                  <span className="text-[10px] text-white/50">会员</span>
                </div>
                <p className="text-sm font-bold text-white">云朵用户</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-white/40" />
          </div>
          {/* 成长值进度条 */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-white/50">成长值</span>
              <span className="text-[10px] text-[#B8973A]">1280 / 2000</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#B8973A] to-[#D4B86A] rounded-full" style={{ width: "64%" }} />
            </div>
            <p className="text-[10px] text-white/40 mt-1">再积累 720 成长值升级铂金会员</p>
          </div>
        </Link>

        {/* 积分卡 */}
        <div className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between border border-[#F0E8DC]">
          <Link href="/profile/points" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F5EFE8] flex items-center justify-center">
              <Gift size={18} className="text-[#B8973A]" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#1A1208]">3,280</p>
              <p className="text-[10px] text-[#8C7B6B]">我的积分</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTodaySigned(true)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                todaySigned
                  ? "bg-[#F5EFE8] border-[#E8DDD0] text-[#8C7B6B]"
                  : "bg-[#1A1208] border-[#1A1208] text-white"
              }`}
            >
              {todaySigned ? "已签到" : "签  到"}
            </button>
            <Link
              href="/profile/points"
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#B8973A] text-[#B8973A]"
            >
              兑  换
            </Link>
          </div>
        </div>

        {/* 活动预告横条 */}
        <Link href="/activity" className="flex items-center justify-between bg-white rounded-2xl px-5 py-3.5 border border-[#F0E8DC]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FBF5E6] flex items-center justify-center">
              <Flame size={16} className="text-[#B8973A]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1208]">618 护肤节即将开启</p>
              <p className="text-[10px] text-[#8C7B6B]">拼团 · 砍价 · 抽奖 · 新品发布</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#B8973A] text-xs font-medium">
            查看
            <ChevronRight size={13} />
          </div>
        </Link>

        {/* 特色卡片横向滑动 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#B8973A] rounded-full" />
              <h2 className="text-sm font-bold text-[#1A1208]">我们的特色</h2>
            </div>
            <span className="text-[10px] text-[#8C7B6B] tracking-wider">Our Features</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {featureCards.map((card) => (
              <Link
                key={card.id}
                href="/feed"
                className="flex-shrink-0 w-40 rounded-2xl overflow-hidden relative"
                style={{ background: card.bg }}
              >
                {/* 装饰圆 */}
                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/5" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5" />
                <div className="relative p-4">
                  <div className="text-2xl mb-2">{card.icon}</div>
                  <p className="text-sm font-bold text-white leading-tight">{card.name}</p>
                  <p className="text-[10px] text-white/60 mt-0.5 leading-snug">{card.desc}</p>
                  <span className="inline-block mt-2 text-[9px] font-medium px-2 py-0.5 rounded-full bg-white/15 text-white/80">
                    {card.tag}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 使用指南卡 */}
        <Link href="/questionnaire" className="block bg-white rounded-2xl overflow-hidden border border-[#F0E8DC]">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#F5EFE8]">
            <p className="text-sm font-bold text-[#1A1208]">小程序使用指南</p>
            <div className="flex items-center gap-1 text-[#B8973A] text-xs">
              点击查看 <ChevronRight size={13} />
            </div>
          </div>
          <div className="bg-[#1A1208] px-5 py-5 flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-white">GET 指南</p>
              <p className="text-[11px] text-white/50 mt-1">最新功能操作攻略</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#B8973A]/20 flex items-center justify-center">
              <BookOpen size={22} className="text-[#B8973A]" />
            </div>
          </div>
        </Link>

        {/* 共创信息卡 */}
        <Link href="/feed" className="block bg-white rounded-2xl overflow-hidden border border-[#F0E8DC]">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#F5EFE8]">
            <p className="text-sm font-bold text-[#1A1208]">共创信息</p>
            <div className="flex items-center gap-1 text-[#8C7B6B] text-[10px]">
              获取更多不定期的共创机会 <ChevronRight size={12} />
            </div>
          </div>
          <div
            className="px-5 py-5 flex items-center justify-between"
            style={{ background: "linear-gradient(135deg,#1A1208 0%,#3D2B1A 100%)" }}
          >
            <div>
              <p className="text-base font-bold text-white leading-tight">天马乘风</p>
              <p className="text-base font-bold text-[#B8973A] leading-tight">共创未来</p>
              <p className="text-[10px] text-white/50 mt-1">携手同行，共建美好未来</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Users size={22} className="text-[#D4B86A]" />
            </div>
          </div>
        </Link>

        {/* 底部彩蛋 */}
        <div className="flex justify-center py-4">
          <button
            className="flex flex-col items-center gap-2 select-none"
            onMouseDown={handleLongPressStart}
            onMouseUp={handleLongPressEnd}
            onTouchStart={handleLongPressStart}
            onTouchEnd={handleLongPressEnd}
            aria-label="长按开启隐藏美学"
          >
            <div className="flex items-center gap-1.5">
              <Star size={12} className="text-[#B8973A]" />
              <span className="text-[10px] text-[#8C7B6B] tracking-widest">长按开启隐藏美学</span>
              <Star size={12} className="text-[#B8973A]" />
            </div>
            {showSurprise && (
              <div className="mt-2 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full border-2 border-[#B8973A] flex items-center justify-center mx-auto mb-2">
                  <Sparkles size={24} className="text-[#B8973A]" />
                </div>
                <p className="text-xs font-bold text-[#1A1208]">问兰镜像 · 臻选美学</p>
                <p className="text-[10px] text-[#8C7B6B] mt-0.5">遇见，是为了更好的绽放</p>
              </div>
            )}
          </button>
        </div>

      </div>
    </PhoneFrame>
  );
}
