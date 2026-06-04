"use client";

import Link from "next/link";
import { ChevronLeft, ShoppingCart, ArrowUpRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

const newProducts = [
  {
    id: 1,
    name: "焕活修护精华液",
    desc: "高浓度多肽复合物，深层修护肌肤屏障，24 小时持续滋养，唤醒肌肤新生活力",
    price: 599,
    originalPrice: 799,
    badge: "首发新品",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&q=90",
  },
  {
    id: 2,
    name: "柔润焕肤乳液",
    desc: "天然植物萃取，温和适用全肤质，质地轻盈透薄，快速吸收不留残留",
    price: 428,
    originalPrice: 560,
    badge: "新上市",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop&q=90",
  },
  {
    id: 3,
    name: "晶透亮肤精露",
    desc: "即时提亮暗沉，打造玻璃肌光泽质感，蕴含烟酰胺与维生素 C 复合精华",
    price: 498,
    originalPrice: 650,
    badge: "限量",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=400&fit=crop&q=90",
  },
];

export default function NewLaunchPage() {
  return (
    <PhoneFrame>
      <div className="bg-[#FAF7F4] min-h-screen">

        {/* Header */}
        <div className="sticky top-0 z-50 bg-[#FAF7F4]/95 backdrop-blur-sm border-b border-[#E8DDD0] px-5 py-3 flex items-center gap-3">
          <Link href="/activity" className="-ml-1">
            <ChevronLeft size={22} className="text-[#1A1208]" strokeWidth={1.5} />
          </Link>
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#B8973A] uppercase">01</p>
            <h1 className="text-sm font-light text-[#1A1208]">新品首发</h1>
          </div>
        </div>

        {/* Hero */}
        <div className="relative h-56 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=400&fit=crop&q=90"
            alt="新品首发"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F4] via-transparent to-transparent" />
        </div>

        {/* Intro */}
        <div className="px-5 pt-2 pb-6">
          <p className="text-[10px] tracking-widest text-[#B8973A] uppercase mb-2">New Launch · 焕活系列</p>
          <h2 className="text-2xl font-light text-[#1A1208] leading-snug mb-3">
            为肌肤<br />注入新生
          </h2>
          <p className="text-xs text-[#8C7B6B] font-light leading-relaxed">
            融合最新护肤科技与天然植物精萃，每一款产品均经过严格临床验证。限量首发，会员专享 8 折优惠。
          </p>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-[#E8DDD0]" />

        {/* Products */}
        <div className="px-5 pt-6 pb-28 space-y-px">
          {newProducts.map((product, i) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group block">
              {/* Full-bleed image */}
              <div className="relative h-44 -mx-5 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F4] via-transparent to-transparent" />
                <span className="absolute top-3 left-5 text-[10px] tracking-widest text-[#B8973A] uppercase">
                  {product.badge}
                </span>
              </div>

              {/* Text row */}
              <div className="flex items-start justify-between py-4 border-b border-[#E8DDD0]">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <span className="text-[11px] text-[#B8973A] tabular-nums mt-0.5">0{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-light text-[#1A1208]">{product.name}</h3>
                    <p className="text-[10px] text-[#8C7B6B] font-light mt-1 line-clamp-2 leading-relaxed">
                      {product.desc}
                    </p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-sm text-[#B8973A] font-light">¥{product.price}</span>
                      <span className="text-[10px] text-[#C8BAA8] line-through">¥{product.originalPrice}</span>
                    </div>
                  </div>
                </div>
                <button
                  className="ml-3 w-8 h-8 rounded-full border border-[#E8DDD0] flex items-center justify-center group-hover:border-[#B8973A] transition-colors flex-shrink-0"
                  aria-label="加入购物车"
                >
                  <ShoppingCart size={13} className="text-[#B8973A]" strokeWidth={1.5} />
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Sticky CTA */}
        <div className="fixed bottom-16 left-0 right-0 max-w-[390px] mx-auto px-5 pb-4">
          <button className="w-full py-3.5 bg-[#1A1208] text-[#FAF7F4] text-xs tracking-widest font-light flex items-center justify-center gap-2 rounded-sm">
            查看全部新品
            <ArrowUpRight size={13} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
