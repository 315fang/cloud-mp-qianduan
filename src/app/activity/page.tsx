"use client";

import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

export default function ActivityPage() {
  const activities = [
    {
      icon: "🌟",
      title: "新品首发",
      desc: "焕活修护精华",
      href: "/activity/new-launch",
      gradient: "from-[#F8F1E4] to-[#EDD9BC]",
      borderColor: "border-[#D4AF5A]/30",
      tagBg: "bg-[#D4AF5A]/10",
      tagText: "text-[#B8973A]",
    },
    {
      icon: "👑",
      title: "会员专享",
      desc: "限额9折特权",
      href: "/activity/member-exclusive",
      gradient: "from-[#1A3A4A] to-[#2A4A5A]",
      borderColor: "border-[#4A8FC7]/30",
      tagBg: "bg-[#4A8FC7]/10",
      tagText: "text-[#4A7CC7]",
    },
    {
      icon: "✨",
      title: "限时体验",
      desc: "线下沙龙邀约",
      href: "/activity/limited-experience",
      gradient: "from-[#3A2A4A] to-[#4A3A5A]",
      borderColor: "border-[#9B59B6]/30",
      tagBg: "bg-[#9B59B6]/10",
      tagText: "text-[#7C4AC7]",
    },
    {
      icon: "🎁",
      title: "积分抽奖",
      desc: "转盘赢好礼",
      href: "/lottery",
      gradient: "from-[#2A3A5A] to-[#3A4A6A]",
      borderColor: "border-[#5B7CC7]/30",
      tagBg: "bg-[#5B7CC7]/10",
      tagText: "text-[#4A7CC7]",
    },
    {
      icon: "🛍",
      title: "特惠随心选",
      desc: "DIY组合优惠",
      href: "/activity/custom-choice",
      gradient: "from-[#2A4A2A] to-[#3A5A3A]",
      borderColor: "border-[#5FA86C]/30",
      tagBg: "bg-[#5FA86C]/10",
      tagText: "text-[#2D8C5E]",
    },
    {
      icon: "🤝",
      title: "拼团优惠",
      desc: "3人团购至低价",
      href: "/group",
      gradient: "from-[#4A2A1A] to-[#5A3A2A]",
      borderColor: "border-[#B85A2A]/30",
      tagBg: "bg-[#B85A2A]/10",
      tagText: "text-[#A04820]",
    },
  ];

  return (
    <PhoneFrame>
      {/* 顶部标题 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm px-5 pt-4 pb-3 border-b border-[#E8DDD0]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-[#B8973A] font-medium uppercase">Luxe Moments</p>
            <h1 className="text-lg font-bold text-[#1A1208]">活动中心</h1>
          </div>
          <Link href="/activity/rules" className="text-[12px] text-[#B8973A] font-medium flex items-center gap-0.5">
            活动规则 <ChevronRight size={13} />
          </Link>
        </div>
      </header>

      <div className="px-4 py-5 space-y-3 pb-20">
        {/* 品牌宣传图 */}
        <div className="relative h-32 rounded-2xl overflow-hidden bg-gradient-to-r from-[#1A1208]/80 to-[#3D2B1A]/60 backdrop-blur-sm border border-[#D4AF5A]/20 flex items-center justify-center">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: "linear-gradient(45deg, #D4AF5A 1px, transparent 1px)", backgroundSize: "20px 20px"}} />
          <div className="relative text-center px-6">
            <Sparkles size={28} className="text-[#D4AF5A] mx-auto mb-2" />
            <p className="text-xs font-semibold text-[#D4AF5A] tracking-widest uppercase">CLOUD BEAUTY</p>
            <p className="text-xs text-[#B8973A] mt-1">精选美学 · 焕活之旅</p>
          </div>
        </div>

        {/* 6个高级活动卡片 */}
        <section className="space-y-2 mt-4">
          <h2 className="text-sm font-semibold text-[#1A1208] px-1 mb-3">精选活动</h2>
          {activities.map((activity) => (
            <Link
              key={activity.title}
              href={activity.href}
              className={`group relative block rounded-2xl overflow-hidden border ${activity.borderColor} transition-all hover:shadow-lg`}
            >
              {/* 渐变背景 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${activity.gradient}`} />
              
              {/* 装饰元素 */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none" style={{background: "radial-gradient(circle, rgba(212,175,90,0.15), transparent 70%)"}} />

              {/* 内容 */}
              <div className="relative px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#1A1208]">{activity.title}</h3>
                    <p className="text-xs text-[#8C7B6B] line-clamp-1">{activity.desc}</p>
                  </div>
                </div>
                <div className={`${activity.tagBg} ${activity.tagText} text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap`}>
                  进入
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* 活动说明 */}
        <div className="mt-6 p-4 rounded-xl bg-[#F5EFE8] border border-[#E8DDD0]">
          <p className="text-xs text-[#8C7B6B] leading-relaxed">
            <span className="font-semibold text-[#B8973A]">提示：</span>所有活动均为会员尊享权益。登录即可参与，更多惊喜敬请期待。
          </p>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
