"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, ChevronRight, Flame, Sparkles, Leaf, Shield, Clock } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BannerCarousel from "@/components/BannerCarousel";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

const hotProducts = products.filter((p) => p.isHot || p.isNew).slice(0, 4);
const allProducts = products.slice(0, 6);

// 秒杀商品
const flashSaleProducts = [products[0], products[4], products[5]];

// 品牌承诺
const brandPromises = [
  { icon: Leaf, label: "纯净配方", desc: "无添加" },
  { icon: Shield, label: "皮肤科测试", desc: "过敏测试" },
  { icon: Clock, label: "28天见效", desc: "承诺" },
];

// 倒计时 hook
function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return { h, m, s };
}

export default function HomePage() {
  const countdown = useCountdown(4 * 3600 + 23 * 60 + 15);

  return (
    <PhoneFrame>
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm">
        {/* 公告栏 */}
        <div className="bg-[#1A1208] px-4 py-1.5 flex items-center justify-center gap-2 overflow-hidden">
          <span className="text-[10px] tracking-[0.15em] text-[#D4AF5A] font-medium animate-pulse">
            NEW
          </span>
          <p className="text-[10px] text-white/80 truncate">
            轻奢护肤新品上线 · 首单立减 ¥50 · 满299包顺丰
          </p>
          <ChevronRight size={10} className="text-[#D4AF5A] flex-shrink-0" />
        </div>

        <div className="flex items-center justify-between px-5 pt-3 pb-2">
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-[#B8973A] uppercase">Cloud Beauty</p>
            <h1 className="text-lg font-bold text-[#1A1208] leading-tight">云肌护肤</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-8 h-8 flex items-center justify-center" aria-label="消息通知">
              <Bell size={20} strokeWidth={1.5} className="text-[#3D2B1A]" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#B8973A] rounded-full" />
            </button>
            <Link href="/products" className="w-8 h-8 flex items-center justify-center" aria-label="搜索商品">
              <Search size={20} strokeWidth={1.5} className="text-[#3D2B1A]" />
            </Link>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="px-5 pb-3">
          <Link
            href="/products"
            className="flex items-center gap-2 bg-[#F5EFE8] rounded-full px-4 py-2.5"
          >
            <Search size={14} className="text-[#8C7B6B]" />
            <span className="text-[13px] text-[#8C7B6B]">搜索精华、面霜、护肤套装...</span>
          </Link>
        </div>
      </header>

      <div className="px-4 space-y-5 pb-4">
        {/* Banner 轮播 */}
        <BannerCarousel />



        {/* 限时秒杀 */}
        <section aria-labelledby="flash-sale-heading">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-[#B8973A]" />
              <h2 id="flash-sale-heading" className="text-base font-bold text-[#1A1208]">限时特惠</h2>
            </div>
            {/* 倒计时 */}
            <div className="flex items-center gap-1.5" aria-label={`剩余时间 ${countdown.h}小时${countdown.m}分${countdown.s}秒`}>
              <span className="text-[10px] text-[#8C7B6B]">距结束</span>
              {[countdown.h, countdown.m, countdown.s].map((unit, i) => (
                <span key={i} className="flex items-center">
                  <span className="min-w-[22px] text-center text-[12px] font-bold text-white bg-[#1A1208] rounded-md px-1 py-0.5 tabular-nums">
                    {unit}
                  </span>
                  {i < 2 && <span className="text-[#8C7B6B] mx-0.5 text-[12px] font-bold">:</span>}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {flashSaleProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="flex-shrink-0 w-36 bg-white rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-square bg-[#F5EFE8]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-2 left-2 bg-[#B8973A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      -{Math.round((1 - product.price / product.originalPrice) * 10) * 10}%
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-[#1A1208] line-clamp-1">{product.name}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-sm font-bold text-[#1A1208]">¥{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-[#8C7B6B] line-through">¥{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="mt-1.5 w-full bg-[#E8DDD0] rounded-full h-1 overflow-hidden">
                    <div
                      className="h-full bg-[#B8973A] rounded-full"
                      style={{ width: `${Math.min(85, 30 + Math.random() * 55).toFixed(0)}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-[#8C7B6B] mt-0.5">
                    仅剩 {product.stock > 20 ? "少量" : product.stock + "件"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>


        <section aria-labelledby="hot-heading">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#B8973A]" />
              <h2 id="hot-heading" className="text-base font-bold text-[#1A1208]">热门推荐</h2>
            </div>
            <Link href="/products" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              查看全部 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {hotProducts.map((product) => (
              <ProductCard key={product.id} product={product} layout="grid" />
            ))}
          </div>
        </section>

        {/* 品牌承诺 */}
        <section className="bg-white rounded-2xl px-5 py-5" aria-labelledby="brand-promise-heading">
          <p className="text-[10px] tracking-[0.25em] text-[#B8973A] font-medium mb-1">BRAND PROMISE</p>
          <h2 id="brand-promise-heading" className="text-base font-bold text-[#1A1208] mb-4">云肌品质承诺</h2>
          <div className="grid grid-cols-3 gap-3">
            {brandPromises.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#F5EFE8] flex items-center justify-center">
                  <Icon size={20} className="text-[#B8973A]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1208]">{label}</p>
                  <p className="text-[10px] text-[#8C7B6B]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 精选系列 */}
        <section aria-labelledby="series-heading">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Leaf size={16} className="text-[#B8973A]" />
              <h2 id="series-heading" className="text-base font-bold text-[#1A1208]">精选系列</h2>
            </div>
            <Link href="/products" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              查看全部 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} layout="list" />
            ))}
          </div>
        </section>

        {/* 底部品牌信息 */}
        <div className="text-center py-6">
          <div className="gold-divider mb-4" aria-hidden="true" />
          <p className="text-[10px] tracking-[0.25em] text-[#8C7B6B] font-medium">CLOUD BEAUTY · 云肌</p>
          <p className="text-[10px] text-[#8C7B6B]/60 mt-1">源自自然 · 精于科技 · 美于生活</p>
        </div>
      </div>
    </PhoneFrame>
  );
}
