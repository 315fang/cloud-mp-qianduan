"use client";

import Link from "next/link";
import { ChevronLeft, ArrowUpRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

const levels = [
  { name: "银卡会员", threshold: "累计消费 ¥500+", discount: "9 折", points: "1.2x 积分" },
  { name: "金卡会员", threshold: "累计消费 ¥2000+", discount: "8.5 折", points: "1.5x 积分" },
  { name: "黑卡会员", threshold: "累计消费 ¥5000+", discount: "8 折", points: "2x 积分" },
  { name: "推广合伙人", threshold: "邀请 3 位新会员", discount: "7.5 折", points: "3x 积分" },
];

const exclusiveProducts = [
  {
    id: 1,
    name: "黑卡会员专属礼盒",
    desc: "精选五款核心产品，含限定版香薰蜡烛，仅限黑卡及以上会员",
    price: 899,
    originalPrice: 1580,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=300&fit=crop&q=90",
  },
  {
    id: 2,
    name: "周年纪念限定套装",
    desc: "品牌七周年特别版，独立编号包装，全球限量 500 套",
    price: 1299,
    originalPrice: 2100,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&q=90",
  },
];

export default function MemberExclusivePage() {
  return (
    <PhoneFrame>
      <div className="bg-[#FAF7F4] min-h-screen">

        {/* Header */}
        <div className="sticky top-0 z-50 bg-[#FAF7F4]/95 backdrop-blur-sm border-b border-[#E8DDD0] px-5 py-3 flex items-center gap-3">
          <Link href="/activity" className="-ml-1">
            <ChevronLeft size={22} className="text-[#1A1208]" strokeWidth={1.5} />
          </Link>
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#B8973A] uppercase">02</p>
            <h1 className="text-sm font-light text-[#1A1208]">会员专享</h1>
          </div>
        </div>

        {/* Hero */}
        <div className="relative h-56 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=400&fit=crop&q=90"
            alt="会员专享"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F4] via-transparent to-transparent" />
        </div>

        {/* Intro */}
        <div className="px-5 pt-2 pb-6">
          <p className="text-[10px] tracking-widest text-[#B8973A] uppercase mb-2">Member · 尊享权益</p>
          <h2 className="text-2xl font-light text-[#1A1208] leading-snug mb-3">
            每一位会员<br />都值得被珍视
          </h2>
          <p className="text-xs text-[#8C7B6B] font-light leading-relaxed">
            四种会员等级，持续累积积分与消费即可升级。等级越高，折扣越深，专属礼遇越丰厚。
          </p>
        </div>

        <div className="mx-5 h-px bg-[#E8DDD0]" />

        {/* Level Table */}
        <div className="px-5 pt-6 pb-4">
          <p className="text-[10px] tracking-widest text-[#B8973A] uppercase mb-4">等级权益</p>
          <div className="space-y-0">
            {levels.map((level, i) => (
              <div
                key={level.name}
                className={`flex items-center justify-between py-4 border-b border-[#E8DDD0] ${i === 0 ? "border-t border-[#E8DDD0]" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-[11px] text-[#B8973A] tabular-nums mt-0.5">0{i + 1}</span>
                  <div>
                    <p className="text-sm font-light text-[#1A1208]">{level.name}</p>
                    <p className="text-[10px] text-[#8C7B6B] font-light mt-0.5">{level.threshold}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-light text-[#B8973A]">{level.discount}</p>
                  <p className="text-[10px] text-[#8C7B6B] font-light mt-0.5">{level.points}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-5 h-px bg-[#E8DDD0] mt-2" />

        {/* Exclusive Products */}
        <div className="px-5 pt-6 pb-28">
          <p className="text-[10px] tracking-widest text-[#B8973A] uppercase mb-4">专属产品</p>
          <div className="space-y-0">
            {exclusiveProducts.map((product, i) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group block">
                <div className="relative h-40 -mx-5 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F4] via-transparent to-transparent" />
                </div>
                <div className="flex items-start justify-between py-4 border-b border-[#E8DDD0]">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <span className="text-[11px] text-[#B8973A] tabular-nums mt-0.5">0{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-light text-[#1A1208]">{product.name}</h3>
                      <p className="text-[10px] text-[#8C7B6B] font-light mt-1 leading-relaxed line-clamp-2">{product.desc}</p>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-sm text-[#B8973A] font-light">¥{product.price}</span>
                        <span className="text-[10px] text-[#C8BAA8] line-through">¥{product.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-[#C8BAA8] group-hover:text-[#B8973A] transition-colors mt-0.5 flex-shrink-0 ml-3" strokeWidth={1.5} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
