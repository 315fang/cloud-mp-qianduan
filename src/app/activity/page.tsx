"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

export default function ActivityPage() {
  const activities = [
    {
      id: "featured",
      title: "焕活新纪元",
      tagline: "新品首发限时体验",
      description: "首次推出焕活修护系列，蕴含高浓度多肽复合物。每个订单赠送品牌代言人私人护肤手册。",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=400&fit=crop",
      cta: "发现新品",
      featured: true,
    },
    {
      id: "member",
      title: "会员仪式",
      tagline: "尊享专属体验权益",
      description: "Lv.2+ 会员限定。专属折扣、双倍积分、VIP 线下沙龙邀约。",
      image: "https://images.unsplash.com/photo-1570194676281-a16d3f1c6c0d?w=400&h=300&fit=crop",
      cta: "了解权益",
    },
    {
      id: "ritual",
      title: "护肤仪式",
      tagline: "按步骤发现你的美",
      description: "4步护肤流程指南。从清洁、爽肤、精华到面霜，每一步都精心设计。",
      image: "https://images.unsplash.com/photo-1600857062241-98e5dba7214b?w=400&h=300&fit=crop",
      cta: "开始仪式",
    },
    {
      id: "story",
      title: "品牌故事",
      tagline: "每一瓶背后的匠心",
      description: "探寻原料地故事、配方研发历程、工艺细节。感受高端护肤品的灵魂。",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=300&fit=crop",
      cta: "阅读故事",
    },
    {
      id: "collection",
      title: "限量组合",
      tagline: "编辑精选搭配方案",
      description: "由品牌美学顾问精心搭配的 3 个组合方案，呈现不同肤质的完美方案。",
      image: "https://images.unsplash.com/photo-1631702281081-e088ca1e9a19?w=400&h=300&fit=crop",
      cta: "查看组合",
    },
  ];

  return (
    <PhoneFrame>
      <div className="bg-[#FEFDFB] min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-[#FEFDFB]/95 backdrop-blur-sm border-b border-[#E8DDD2]/50 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1 -ml-2">
              <ChevronLeft size={22} className="text-[#1A1208]" strokeWidth={1.5} />
            </Link>
            <div>
              <p className="text-[10px] tracking-widest text-[#B8973A] font-light uppercase">精选活动</p>
              <h1 className="text-sm font-light text-[#1A1208]">云肌美学</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pb-24">
          {/* Featured Hero */}
          <Link
            href={`/activity/${activities[0].id}`}
            className="relative h-72 group overflow-hidden block"
          >
            <img
              src={activities[0].image}
              alt={activities[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <p className="text-xs tracking-widest text-white/70 font-light uppercase mb-2">
                {activities[0].tagline}
              </p>
              <h2 className="text-3xl font-light text-white mb-3 leading-tight">
                {activities[0].title}
              </h2>
              <p className="text-xs text-white/80 font-light line-clamp-2 mb-4">
                {activities[0].description}
              </p>
              <div className="flex items-center text-white">
                <span className="text-xs font-light">{activities[0].cta}</span>
                <ChevronRight size={14} className="ml-1" />
              </div>
            </div>
          </Link>

          {/* Activities Section */}
          <div className="px-4 py-8 space-y-6">
            {/* Section Title */}
            <div className="space-y-1">
              <p className="text-xs tracking-widest text-[#B8973A] font-light uppercase">更多活动</p>
              <h2 className="text-lg font-light text-[#1A1208]">编辑精选</h2>
            </div>

            {/* Activities Grid */}
            <div className="grid grid-cols-2 gap-4">
              {activities.slice(1).map((activity) => (
                <Link
                  key={activity.id}
                  href={`/activity/${activity.id}`}
                  className="group"
                >
                  <div className="space-y-3">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-xl aspect-square bg-[#E8DDD2]">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                    </div>

                    {/* Text */}
                    <div className="space-y-1">
                      <h3 className="text-sm font-light text-[#1A1208]">
                        {activity.title}
                      </h3>
                      <p className="text-xs text-[#8C7B6B] font-light line-clamp-1">
                        {activity.tagline}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="px-4 py-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#E8DDD2] to-transparent" />
          </div>

          {/* Bottom Info */}
          <div className="px-4 py-6 space-y-4 text-center">
            <p className="text-xs text-[#8C7B6B] font-light leading-relaxed">
              所有活动均为会员尊享权益<br />
              登录即可参与，发现更多惊喜
            </p>
            <div className="flex justify-center gap-2">
              <Link
                href="/profile/customer-service"
                className="text-xs text-[#B8973A] font-light hover:underline"
              >
                有疑问？
              </Link>
              <span className="text-[#E8DDD2]">·</span>
              <Link
                href="/activity"
                className="text-xs text-[#B8973A] font-light hover:underline"
              >
                活动规则
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
