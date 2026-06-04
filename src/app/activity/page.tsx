"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

const activities = [
  {
    id: "new-launch",
    index: "01",
    title: "新品首发",
    tagline: "焕活修护系列",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=400&fit=crop&q=90",
    href: "/activity/new-launch",
  },
  {
    id: "member-exclusive",
    index: "02",
    title: "会员专享",
    tagline: "尊享 75 折起权益",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=400&fit=crop&q=90",
    href: "/activity/member-exclusive",
  },
  {
    id: "limited-experience",
    index: "03",
    title: "限时体验",
    tagline: "线下沙龙邀约",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop&q=90",
    href: "/activity/limited-experience",
  },
  {
    id: "custom-choice",
    index: "04",
    title: "特惠随心选",
    tagline: "自由组合 · 多件更优",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop&q=90",
    href: "/activity/custom-choice",
  },
  {
    id: "lottery",
    index: "05",
    title: "积分抽奖",
    tagline: "积分兑好礼",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=400&fit=crop&q=90",
    href: "/lottery",
  },
  {
    id: "group",
    index: "06",
    title: "拼团优惠",
    tagline: "三人同行 · 共享折扣",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=400&fit=crop&q=90",
    href: "/group",
  },
];

export default function ActivityPage() {
  return (
    <PhoneFrame>
      <div className="bg-[#0F0D0A] min-h-screen">

        {/* Header */}
        <div className="px-5 pt-10 pb-8">
          <p className="text-[10px] tracking-[0.3em] text-[#B8973A] uppercase mb-3">
            Cloud Beauty · 云肌
          </p>
          <h1 className="text-[28px] font-light text-white leading-tight">
            美学<br />活动
          </h1>
          <div className="mt-4 w-8 h-px bg-[#B8973A]" />
        </div>

        {/* Cards — every card is identical in structure */}
        <div className="pb-24">
          {activities.map((item) => (
            <Link key={item.id} href={item.href} className="group block">

              {/* Image — full-bleed, fixed height */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-500"
                />
                {/* subtle top-fade so numbers read clearly */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
              </div>

              {/* Text row — always same layout */}
              <div className="flex items-start justify-between px-5 py-4 border-b border-white/8">
                <div className="flex items-start gap-4">
                  {/* Index number */}
                  <span className="text-[11px] text-[#B8973A] font-light mt-0.5 tabular-nums">
                    {item.index}
                  </span>
                  {/* Title + tagline */}
                  <div>
                    <h2 className="text-base font-light text-white leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-xs text-white/40 font-light mt-1">
                      {item.tagline}
                    </p>
                  </div>
                </div>
                {/* Arrow */}
                <ArrowUpRight
                  size={16}
                  className="text-white/25 group-hover:text-[#B8973A] transition-colors mt-1 flex-shrink-0"
                  strokeWidth={1.5}
                />
              </div>

            </Link>
          ))}

          {/* Footer note */}
          <p className="text-center text-[10px] text-white/20 tracking-widest py-10 uppercase">
            会员专属 · 登录可参与全部活动
          </p>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
