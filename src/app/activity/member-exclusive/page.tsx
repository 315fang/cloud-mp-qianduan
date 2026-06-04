"use client";

import Link from "next/link";
import { ChevronLeft, Crown } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

export default function MemberExclusivePage() {
  const memberBenefits = [
    { level: "初级会员", discount: "7.5折", savings: "可省至150元" },
    { level: "中级会员", discount: "8折", savings: "可省至240元" },
    { level: "高级会员", discount: "9折", savings: "可省至120元", highlight: true },
    { level: "推广合伙人", discount: "8.5折", savings: "可省至300元" },
  ];

  const exclusiveProducts = [
    {
      id: 1,
      name: "高级会员专属礼盒",
      desc: "精选护肤品套装，仅限高级会员购买",
      price: 899,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
    },
    {
      id: 2,
      name: "限量周年纪念装",
      desc: "品牌周年特别版，数量有限",
      price: 599,
      originalPrice: 799,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
    },
  ];

  return (
    <PhoneFrame>
      {/* 顶部 */}
      <header className="sticky top-0 z-40 bg-gradient-to-b from-[#1A3A4A] to-[#2A4A5A]/50 text-white backdrop-blur-sm px-4 py-3 border-b border-[#4A8FC7]/20">
        <div className="flex items-center justify-between">
          <Link href="/activity" className="flex items-center">
            <ChevronLeft size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <Crown size={18} className="text-[#4A8FC7]" />
            <h1 className="text-base font-bold">会员专享</h1>
          </div>
          <div className="w-6" />
        </div>
      </header>

      <div className="px-4 py-4 space-y-4 pb-20 bg-gradient-to-b from-white to-[#F5F0E8]">
        {/* 会员权益对比 */}
        <div className="rounded-2xl overflow-hidden border border-[#4A8FC7]/20">
          <div className="bg-gradient-to-r from-[#1A3A4A] to-[#2A4A5A] p-4 text-white">
            <p className="text-sm font-semibold">会员等级权益对比</p>
          </div>
          <div className="p-4 space-y-2 bg-white">
            {memberBenefits.map((benefit) => (
              <div
                key={benefit.level}
                className={`p-3 rounded-xl flex justify-between items-center ${
                  benefit.highlight
                    ? "bg-gradient-to-r from-[#4A8FC7]/10 to-[#5B7CC7]/10 border border-[#4A8FC7]/30"
                    : "bg-[#F5F0E8]"
                }`}
              >
                <div>
                  <p className="text-xs font-semibold text-[#1A1208]">{benefit.level}</p>
                  <p className="text-[10px] text-[#8C7B6B]">{benefit.savings}</p>
                </div>
                <span className={`text-sm font-bold ${benefit.highlight ? "text-[#4A7CC7]" : "text-[#B8973A]"}`}>
                  {benefit.discount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 专属产品 */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-[#1A1208]">会员专属产品</h2>
          {exclusiveProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8DDD0] hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3 p-3">
                <div className="w-24 h-24 rounded-xl bg-[#F5EFE8] flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#1A1208]">{product.name}</p>
                    <p className="text-[10px] text-[#8C7B6B] mt-1">{product.desc}</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-[#4A7CC7]">¥{product.price}</span>
                    <span className="text-[10px] text-[#8C7B6B] line-through">¥{product.originalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 活动说明 */}
        <div className="p-4 rounded-2xl bg-[#EBF1FB] border border-[#4A8FC7]/20">
          <p className="text-xs font-semibold text-[#4A7CC7] mb-2">活动须知</p>
          <ul className="text-xs text-[#2A4A5A] space-y-1">
            <li>• 每月8日为会员专享购物日，额外享受折扣</li>
            <li>• 产品需于活动期间使用会员账户购买</li>
            <li>• 享受权益需满足对应会员等级要求</li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
