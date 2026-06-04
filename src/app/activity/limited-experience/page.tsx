"use client";

import Link from "next/link";
import { ChevronLeft, MapPin, Clock, Users } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

export default function LimitedExperiencePage() {
  const experiences = [
    {
      id: 1,
      title: "线下沙龙体验",
      location: "苏州·科技大学校园店",
      date: "5月20日-5月22日",
      time: "10:00-18:00",
      capacity: "30人",
      joined: 12,
      desc: "邀您参加八宝周老师线下沙龙，深入体验云肌护肤产品，获得专业护肤咨询。",
    },
    {
      id: 2,
      title: "品牌分享会",
      location: "杭州·西湖体验中心",
      date: "6月10日-6月12日",
      time: "14:00-17:00",
      capacity: "25人",
      joined: 18,
      desc: "邀请品牌创始人亲临现场，分享护肤理念与新品开发背后的故事。",
    },
    {
      id: 3,
      title: "VIP私享会",
      location: "南京·限制邀约",
      date: "6月15日",
      time: "19:00-21:00",
      capacity: "15人",
      joined: 14,
      desc: "高级会员独享，精致晚宴+产品品鉴+专属礼遇。名额有限，先到先得。",
    },
  ];

  return (
    <PhoneFrame>
      {/* 顶部 */}
      <header className="sticky top-0 z-40 bg-gradient-to-b from-[#3A2A4A] to-[#4A3A5A]/50 text-white backdrop-blur-sm px-4 py-3 border-b border-[#9B59B6]/20">
        <div className="flex items-center justify-between">
          <Link href="/activity" className="flex items-center">
            <ChevronLeft size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <h1 className="text-base font-bold">限时体验</h1>
          </div>
          <div className="w-6" />
        </div>
      </header>

      <div className="px-4 py-4 space-y-3 pb-20">
        {/* 体验说明 */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#3A2A4A] to-[#4A3A5A] text-white border border-[#9B59B6]/30">
          <p className="text-xs leading-relaxed">
            云肌邀您参与品牌线下体验活动。通过面对面交流、产品体验、专业咨询等环节，深入了解云肌护肤理念，获得定制化护肤方案。
          </p>
        </div>

        {/* 体验活动列表 */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-[#1A1208] px-1">即将活动</h2>
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8DDD0] hover:shadow-md transition-shadow"
            >
              {/* 头部 */}
              <div className="bg-gradient-to-r from-[#3A2A4A]/5 to-[#4A3A5A]/5 p-3 border-b border-[#E8DDD0]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xs font-bold text-[#1A1208]">{exp.title}</h3>
                  <span className="text-[9px] font-semibold text-[#7C4AC7] bg-[#F3EBFB] px-2 py-0.5 rounded-full">
                    {Math.ceil((exp.joined / exp.capacity) * 100)}% 已报
                  </span>
                </div>
              </div>

              {/* 内容 */}
              <div className="p-3 space-y-2">
                <p className="text-[10px] text-[#8C7B6B] leading-relaxed">{exp.desc}</p>

                {/* 信息栏 */}
                <div className="space-y-1 mt-2">
                  <div className="flex items-center gap-2 text-[10px] text-[#8C7B6B]">
                    <MapPin size={12} />
                    {exp.location}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#8C7B6B]">
                    <Clock size={12} />
                    {exp.date} {exp.time}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#8C7B6B]">
                    <Users size={12} />
                    {exp.joined}/{exp.capacity} 人已报名
                  </div>
                </div>

                {/* 进度条 */}
                <div className="mt-2 h-1 rounded-full bg-[#F0E8DC] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7C4AC7] to-[#9B59B6]"
                    style={{ width: `${(exp.joined / exp.capacity) * 100}%` }}
                  />
                </div>

                {/* 按钮 */}
                <button className="w-full mt-3 py-2 rounded-lg bg-gradient-to-r from-[#7C4AC7] to-[#9B59B6] text-white text-xs font-semibold hover:shadow-md transition-shadow">
                  立即报名
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* 活动提示 */}
        <div className="p-4 rounded-2xl bg-[#F3EBFB] border border-[#9B59B6]/20">
          <p className="text-xs text-[#7C4AC7] mb-2">提示信息</p>
          <ul className="text-xs text-[#5A3A6A] space-y-1">
            <li>• 报名后请按时到场，迟到20分钟视为弃权</li>
            <li>• 限制名额，额满即止，先报先得</li>
            <li>• 参与即可获得品牌限定礼物一份</li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
