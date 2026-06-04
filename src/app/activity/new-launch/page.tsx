"use client";

import Link from "next/link";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

export default function NewLaunchPage() {
  const newProducts = [
    {
      id: 1,
      name: "焕活修护精华液",
      desc: "蕴含高浓度多肽复合物，深层修护肌肤屏障，24小时集中滋养",
      price: 599,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
      badge: "首发",
    },
    {
      id: 2,
      name: "柔和焕肤乳液",
      desc: "温和配方，适合所有肤质，日常护肤必备，质地清爽易吸收",
      price: 428,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
      badge: "新上市",
    },
    {
      id: 3,
      name: "晶透亮肤精露",
      desc: "提亮肤色，打造迷人光泽感的秘密武器，提升肤质透明感",
      price: 498,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
      badge: "限量",
    },
  ];

  return (
    <PhoneFrame>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#FAF8F5] border-b border-[#E8DDD2] px-4 py-4 flex items-center gap-3">
        <Link href="/activity" className="p-1 -ml-2">
          <ChevronLeft size={24} className="text-[#1A1208]" strokeWidth={1.5} />
        </Link>
        <h1 className="text-sm font-light text-[#1A1208]">新品首发</h1>
      </div>

      <div className="px-4 py-6 pb-24 space-y-6 bg-[#FAF8F5]">
        {/* Hero Section */}
        <div className="relative h-48 -mx-4 bg-gradient-to-br from-[#E8DDD2] to-[#DDD2C7] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=300&fit=crop"
            alt="New Launch"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p className="text-xs font-light tracking-widest mb-1">新品首发</p>
            <h2 className="text-2xl font-light">焕活新纪元</h2>
            <p className="text-xs font-light mt-2 opacity-90">全新焕活系列，只为更好的你</p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="text-xs text-[#8C7B6B] font-light leading-relaxed">
            云肌推出全新焕活系列，融合最新护肤科技与天然植物精萃，为肌肤注入新生活力。首批新品享受会员专属优惠，限量发售。
          </p>
        </div>

        {/* Products */}
        <div className="space-y-4">
          {newProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block"
            >
              <div className="bg-white rounded-lg overflow-hidden border border-[#E8DDD2] hover:border-[#D4AF5A] transition-colors">
                <div className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-lg bg-[#F5EFE8] flex-shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 right-1 bg-[#B8973A] text-white text-[7px] font-light px-1.5 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-light text-[#1A1208]">{product.name}</h3>
                      <p className="text-[10px] text-[#8C7B6B] font-light mt-1 line-clamp-2">
                        {product.desc}
                      </p>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-sm font-light text-[#B8973A]">¥{product.price}</span>
                    </div>
                  </div>

                  {/* Cart */}
                  <div className="flex items-center justify-center">
                    <button className="w-8 h-8 rounded-full bg-[#F5EFE8] hover:bg-[#EDD9BC] flex items-center justify-center transition-colors">
                      <ShoppingCart size={14} className="text-[#B8973A]" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Member Benefits */}
        <div className="rounded-lg bg-white border border-[#E8DDD2] p-4 space-y-3">
          <p className="text-xs font-light text-[#B8973A] tracking-widest">会员权益</p>
          <div className="space-y-2">
            <p className="text-xs text-[#1A1208] font-light">• 首发新品 8 折优惠</p>
            <p className="text-xs text-[#1A1208] font-light">• 免费小样体验装</p>
            <p className="text-xs text-[#1A1208] font-light">• 优先发货保证</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
