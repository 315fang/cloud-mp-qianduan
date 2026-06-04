"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

export default function ActivityPage() {
  const activities = [
    {
      id: "new-launch",
      title: "新品首发",
      subtitle: "焕活修护·感受新生",
      description: "全新焕活修护系列，专为肌肤新生而设计。蕴含天然植物精粹，唤醒肌肤活力。",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=300&fit=crop",
      cta: "发现新品",
    },
    {
      id: "member-exclusive",
      title: "会员专享",
      subtitle: "尊享高达75折权益",
      description: "Lv.2及以上会员限定。专属折扣、积分加倍、优先发售权，尽享高级待遇。",
      image: "https://images.unsplash.com/photo-1570194676281-a16d3f1c6c0d?w=500&h=300&fit=crop",
      cta: "查看权益",
    },
    {
      id: "limited-experience",
      title: "限时体验",
      subtitle: "线下高端沙龙邀约",
      description: "私享VIP体验，名额有限。与美学大师面对面，感受品牌独特的美学理念。",
      image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=500&h=300&fit=crop",
      cta: "立即报名",
    },
    {
      id: "custom-choice",
      title: "特惠随心选",
      subtitle: "自选组合·享受优惠",
      description: "DIY美妆组合，自由搭配。3件88折，4件85折，5件更低至8折。",
      image: "https://images.unsplash.com/photo-1631702281081-e088ca1e9a19?w=500&h=300&fit=crop",
      cta: "开始组合",
    },
    {
      id: "lottery",
      title: "积分抽奖",
      subtitle: "转盘赢好礼",
      description: "积分可兑，好礼相送。每日签到积累积分，幸运大转盘等你转动。",
      image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=300&fit=crop",
      cta: "去抽奖",
      href: "/lottery",
    },
    {
      id: "group-buy",
      title: "拼团优惠",
      subtitle: "三人成团·共享折扣",
      description: "邀请好友参团，人数越多折扣越大。3人成团享受团购价，最高省100元。",
      image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=300&fit=crop",
      cta: "发起拼团",
      href: "/group",
    },
  ];

  return (
    <PhoneFrame>
      <div className="bg-[#FAF8F5] min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-[#FAF8F5] border-b border-[#E8DDD2] px-4 py-4 flex items-center gap-3">
          <Link href="/" className="p-1 -ml-2">
            <ChevronLeft size={24} className="text-[#1A1208]" strokeWidth={1.5} />
          </Link>
          <div>
            <p className="text-xs tracking-widest text-[#B8973A] font-light">精选活动</p>
            <h1 className="text-sm font-light text-[#1A1208]">云肌美学</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-8 pb-24 space-y-8">
          {/* 品牌简语 */}
          <div className="text-center space-y-2 mt-2">
            <h2 className="text-2xl font-light text-[#1A1208] tracking-wide">每一刻美好</h2>
            <p className="text-xs text-[#8C7B6B] font-light leading-relaxed">
              精选美学生活方式<br />
              发现属于你的焕活时刻
            </p>
          </div>

          {/* Activities Grid - 2列 */}
          <div className="grid grid-cols-2 gap-5">
            {activities.map((activity) => (
              <Link
                key={activity.id}
                href={activity.href || `/activity/${activity.id}`}
                className="group"
              >
                <div className="space-y-3">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-xl aspect-square bg-[#E8DDD2]">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Info */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-light text-[#1A1208]">
                      {activity.title}
                    </h3>
                    <p className="text-xs text-[#B8973A] font-light line-clamp-1">
                      {activity.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Card */}
          <Link
            href="/activity/new-launch"
            className="block overflow-hidden rounded-2xl"
          >
            <div className="relative h-56 bg-[#E8DDD2] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=400&fit=crop"
                alt="Featured"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h3 className="text-xl font-light text-white mb-2">新品首发</h3>
                <p className="text-xs text-[#E8DDD2] font-light line-clamp-2">
                  焕活修护精华系列，只为更好的你
                </p>
              </div>
            </div>
          </Link>

          {/* Tip */}
          <div className="rounded-lg bg-white border border-[#E8DDD2] p-4 space-y-2">
            <p className="text-xs text-[#8C7B6B] font-light leading-relaxed">
              所有活动均为会员专享权益。登录账户即可参与，更多惊喜敬请期待。
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
