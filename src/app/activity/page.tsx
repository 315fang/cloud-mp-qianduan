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
      <div className="bg-[#FAF7F4] min-h-screen">

        {/* Header */}
        <div className="px-5 pt-8 pb-5">
          <p className="text-[10px] tracking-[0.3em] text-[#B8973A] uppercase mb-2">
            Cloud Beauty · 云肌
          </p>
          <div className="flex items-end justify-between">
            <h1 className="text-[26px] font-light text-[#1A1208] leading-tight">
              美学活动
            </h1>
            <div className="w-6 h-px bg-[#B8973A] mb-2" />
          </div>
        </div>

        {/* Cards */}
        <div className="px-4 pb-24 space-y-4">
          {activities.map((item) => (
            <Link key={item.id} href={item.href} className="group block rounded-2xl overflow-hidden bg-white shadow-sm">

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* index badge 叠在图片左上角 */}
                <span className="absolute top-3 left-3 text-[10px] text-white/80 font-light tabular-nums bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  {item.index}
                </span>
              </div>

              {/* Text row */}
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <h2 className="text-[15px] font-medium text-[#1A1208] leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-xs text-[#8C7B6B] font-light mt-0.5">
                    {item.tagline}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-[#C8BAA8] group-hover:text-[#B8973A] transition-colors flex-shrink-0"
                  strokeWidth={1.5}
                />
              </div>

            </Link>
          ))}

          {/* Footer note */}
          <p className="text-center text-[10px] text-[#C8BAA8] tracking-widest pt-4 pb-2 uppercase">
            会员专属 · 登录可参与全部活动
          </p>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
