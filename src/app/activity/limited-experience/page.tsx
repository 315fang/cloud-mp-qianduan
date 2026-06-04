"use client";

import Link from "next/link";
import { ChevronLeft, MapPin, CalendarDays, Users } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

const experiences = [
  {
    id: 1,
    title: "苏州线下沙龙",
    subtitle: "八宝周老师见面会两天一晚",
    location: "苏州 · 科技大学校园店",
    date: "2026 年 7 月 20 – 21 日",
    capacity: 30,
    joined: 12,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop&q=90",
    status: "报名中",
  },
  {
    id: 2,
    title: "杭州美学分享会",
    subtitle: "品牌创始人亲临，护肤理念深度交流",
    location: "杭州 · 西湖体验中心",
    date: "2026 年 8 月 10 日",
    capacity: 25,
    joined: 18,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop&q=90",
    status: "即将截止",
  },
  {
    id: 3,
    title: "南京 VIP 私享晚宴",
    subtitle: "黑卡会员限定，精致晚宴与产品品鉴",
    location: "南京 · 限制邀约",
    date: "2026 年 8 月 15 日",
    capacity: 15,
    joined: 14,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=400&fit=crop&q=90",
    status: "仅剩 1 席",
  },
];

export default function LimitedExperiencePage() {
  return (
    <PhoneFrame>
      <div className="bg-[#FAF7F4] min-h-screen">

        {/* Header */}
        <div className="sticky top-0 z-50 bg-[#FAF7F4]/95 backdrop-blur-sm border-b border-[#E8DDD0] px-5 py-3 flex items-center gap-3">
          <Link href="/activity" className="-ml-1">
            <ChevronLeft size={22} className="text-[#1A1208]" strokeWidth={1.5} />
          </Link>
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#B8973A] uppercase">03</p>
            <h1 className="text-sm font-light text-[#1A1208]">限时体验</h1>
          </div>
        </div>

        {/* Hero */}
        <div className="relative h-56 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop&q=90"
            alt="限时体验"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F4] via-transparent to-transparent" />
        </div>

        {/* Intro */}
        <div className="px-5 pt-2 pb-6">
          <p className="text-[10px] tracking-widest text-[#B8973A] uppercase mb-2">Experience · 线下体验</p>
          <h2 className="text-2xl font-light text-[#1A1208] leading-snug mb-3">
            与美相遇<br />在每一个城市
          </h2>
          <p className="text-xs text-[#8C7B6B] font-light leading-relaxed">
            云肌走进城市，带来沉浸式护肤体验。与品牌创始人、专业美容顾问面对面，获得专属护肤方案。
          </p>
        </div>

        <div className="mx-5 h-px bg-[#E8DDD0]" />

        {/* Events */}
        <div className="pb-24">
          {experiences.map((exp) => (
            <div key={exp.id} className="group">
              {/* Full-bleed image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F4] via-transparent to-transparent" />
                {/* Status badge */}
                <span className="absolute top-3 right-5 text-[10px] text-[#B8973A] tracking-wider border border-[#B8973A]/50 px-2 py-0.5 bg-[#FAF7F4]/80 backdrop-blur-sm">
                  {exp.status}
                </span>
              </div>

              {/* Info */}
              <div className="px-5 pt-3 pb-5 border-b border-[#E8DDD0]">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-light text-[#1A1208]">{exp.title}</h3>
                    <p className="text-[10px] text-[#8C7B6B] font-light mt-1">{exp.subtitle}</p>

                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <MapPin size={11} className="text-[#B8973A] flex-shrink-0" strokeWidth={1.5} />
                        <span className="text-[10px] text-[#8C7B6B] font-light">{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays size={11} className="text-[#B8973A] flex-shrink-0" strokeWidth={1.5} />
                        <span className="text-[10px] text-[#8C7B6B] font-light">{exp.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={11} className="text-[#B8973A] flex-shrink-0" strokeWidth={1.5} />
                        <span className="text-[10px] text-[#8C7B6B] font-light">{exp.joined} / {exp.capacity} 人已报名</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 h-px bg-[#E8DDD0] overflow-hidden rounded-full">
                      <div
                        className="h-full bg-[#B8973A] transition-all"
                        style={{ width: `${(exp.joined / exp.capacity) * 100}%` }}
                      />
                    </div>

                    <button className="mt-4 w-full py-3 border border-[#1A1208] text-[#1A1208] text-xs tracking-widest font-light hover:bg-[#1A1208] hover:text-[#FAF7F4] transition-colors">
                      立即报名
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <p className="text-center text-[10px] text-[#C8BAA8] tracking-widest py-8 uppercase">
            参与即获品牌限定礼物 · 名额有限先报先得
          </p>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
