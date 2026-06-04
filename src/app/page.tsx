"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, ChevronRight, Flame, Sparkles } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BannerCarousel from "@/components/BannerCarousel";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

const hotProducts = products.filter((p) => p.isHot || p.isNew).slice(0, 4);
const allProducts = products.slice(0, 6);

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
  const [searchQuery, setSearchQuery] = useState("");
  const countdown = useCountdown(4 * 3600 + 23 * 60 + 15);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

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
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="flex-1 bg-[#F5EFE8] rounded-full px-4 py-2.5 flex items-center gap-2 border border-[#E8DDD0] focus-within:border-[#B8973A]">
              <Search size={14} className="text-[#8C7B6B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索精华、面霜、护肤套装..."
                className="flex-1 bg-transparent text-sm outline-none text-[#1A1208] placeholder-[#8C7B6B]"
              />
            </div>
          </form>
        </div>
      </header>

      <div className="px-4 space-y-5 pb-4">
        {/* Banner 轮播 */}
        <BannerCarousel />



        {/* 限时秒杀 */}
        <section aria-labelledby="flash-sale-heading">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-[#E8573A]" />
              <h2 id="flash-sale-heading" className="text-sm font-bold text-[#1A1208]">限时秒杀</h2>
              <span className="text-[10px] text-[#8C7B6B]">
                {countdown.h}:{countdown.m}:{countdown.s}
              </span>
            </div>
            <Link href="/activity" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              查看全部 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="space-y-2">
            {products.slice(0, 4).map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="block">
                <ProductCard product={product} layout="list" />
              </Link>
            ))}
          </div>
        </section>

        {/* 热门推荐 */}
        <section aria-labelledby="hot-heading">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#B8973A]" />
              <h2 id="hot-heading" className="text-sm font-bold text-[#1A1208]">热门推荐</h2>
            </div>
            <Link href="/products" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              查看全部 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="space-y-2">
            {hotProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="block">
                <ProductCard product={product} layout="list" />
              </Link>
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
