"use client";

import Link from "next/link";
import { ChevronLeft, Sparkles, ShoppingCart } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

export default function NewLaunchPage() {
  const newProducts = [
    {
      id: 1,
      name: "焕活修护精华液",
      desc: "蕴含高浓度多肽复合物，深层修护肌肤屏障",
      price: 599,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
      isNew: true,
      badge: "首发新品",
    },
    {
      id: 2,
      name: "柔和焕肤乳液",
      desc: "温和配方，适合所有肤质，日常护肤必备",
      price: 428,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
      isNew: true,
      badge: "新上市",
    },
    {
      id: 3,
      name: "晶透亮肤精露",
      desc: "提亮肤色，打造迷人光泽感的秘密武器",
      price: 498,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
      isNew: true,
      badge: "限量",
    },
  ];

  return (
    <PhoneFrame>
      {/* 顶部 */}
      <header className="sticky top-0 z-40 bg-gradient-to-b from-[#F8F1E4] to-[#EDD9BC]/50 backdrop-blur-sm px-4 py-3 border-b border-[#D4AF5A]/20">
        <div className="flex items-center justify-between">
          <Link href="/activity" className="flex items-center">
            <ChevronLeft size={24} className="text-[#1A1208]" />
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#D4AF5A]" />
            <h1 className="text-base font-bold text-[#1A1208]">新品首发</h1>
          </div>
          <div className="w-6" />
        </div>
      </header>

      <div className="px-4 py-4 space-y-4 pb-20">
        {/* 活动介绍 */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F8F1E4] to-[#EDD9BC] border border-[#D4AF5A]/30">
          <p className="text-sm font-semibold text-[#1A1208] mb-2">焕活新纪元</p>
          <p className="text-xs text-[#8C7B6B] leading-relaxed">
            云肌推出全新焕活系列，融合最新护肤科技与天然植物精萃，为肌肤注入新生活力。首批新品享受会员专属优惠。
          </p>
        </div>

        {/* 新品展示 */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-[#1A1208]">首发产品</h2>
          {newProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block bg-white rounded-2xl overflow-hidden border border-[#E8DDD0] hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3 p-3">
                <div className="relative w-24 h-24 rounded-xl bg-[#F5EFE8] flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 right-1 bg-[#D4AF5A] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                    {product.badge}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#1A1208]">{product.name}</p>
                    <p className="text-[10px] text-[#8C7B6B] mt-1 line-clamp-2">{product.desc}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-black text-[#B8973A]">¥{product.price}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button className="w-9 h-9 rounded-full bg-[#F5EFE8] flex items-center justify-center hover:bg-[#EDD9BC] transition-colors">
                    <ShoppingCart size={16} className="text-[#B8973A]" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* 权益卡 */}
        <div className="p-4 rounded-2xl bg-[#FAF7F4] border border-[#E8DDD0]">
          <p className="text-xs text-[#8C7B6B] mb-2">会员权益</p>
          <div className="space-y-2">
            <p className="text-xs text-[#1A1208]">✓ 首发新品 8 折优惠</p>
            <p className="text-xs text-[#1A1208]">✓ 免费小样体验装</p>
            <p className="text-xs text-[#1A1208]">✓ 优先发货保证</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
