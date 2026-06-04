"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, ChevronRight, Sparkles } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BannerCarousel from "@/components/BannerCarousel";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

const hotProducts = products.filter((p) => p.isHot || p.isNew).slice(0, 4);
const allProducts = products.slice(0, 6);

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

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

        {/* 热门活动卡片 */}
        <section aria-label="热门活动">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              {
                icon: "⏰",
                label: "限时秒杀",
                desc: "红色渐变",
                href: "/flash-sale",
                bg: "from-[#E8573A]/10 to-[#C74523]/5",
                border: "border-[#E8573A]/20",
              },
              {
                icon: "🎁",
                label: "优惠券中心",
                desc: "领取优惠",
                href: "/profile/coupons",
                bg: "from-[#4A7CC7]/10 to-[#2D5FA8]/5",
                border: "border-[#4A7CC7]/20",
              },
              {
                icon: "✨",
                label: "积分抽奖",
                desc: "赢大奖",
                href: "/lottery",
                bg: "from-[#B8973A]/10 to-[#9A7D28]/5",
                border: "border-[#B8973A]/20",
              },
              {
                icon: "👥",
                label: "拼团活动",
                desc: "共享优惠",
                href: "/group",
                bg: "from-[#059669]/10 to-[#047857]/5",
                border: "border-[#059669]/20",
              },
            ].map(({ icon, label, desc, href, bg, border }) => (
              <Link
                key={label}
                href={href}
                className={`bg-gradient-to-br ${bg} ${border} border rounded-2xl p-3 text-center`}
              >
                <span className="text-2xl">{icon}</span>
                <p className="text-xs font-semibold text-[#1A1208] mt-1">{label}</p>
                <p className="text-[9px] text-[#8C7B6B]">{desc}</p>
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

        {/* 品牌专区 */}
        <section className="rounded-2xl overflow-hidden bg-white shadow-sm" aria-labelledby="brand-heading">
          {/* 品牌大图 */}
          <div className="relative h-40 bg-gradient-to-b from-[#E8D9C8] to-[#F5EDE0] flex items-center justify-center overflow-hidden">
            <img
              src="/images/banner-2.png"
              alt="间兰药业"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/40" />
          </div>

          {/* 品牌介绍卡片 */}
          <div className="px-4 py-4">
            <h2 id="brand-heading" className="text-center text-[10px] tracking-[0.2em] text-[#8C7B6B] uppercase mb-3">品牌专区</h2>
            <div className="bg-[#F8F4EE] rounded-2xl px-4 py-4 text-center border border-[#E8DDD0]">
              <p className="text-base font-bold text-[#1A1208]">云肌护肤</p>
              <p className="text-xs text-[#8C7B6B] mt-1">专业皮肤修护 · 始于2024</p>
              <Link
                href="/distributor"
                className="inline-block mt-3 text-xs font-medium text-[#B8973A] bg-white px-3 py-1.5 rounded-full border border-[#B8973A]/30"
              >
                了解更多
              </Link>
            </div>

            {/* 三个快捷卡片 */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: "📰", label: "最新活动", href: "/activity" },
                { icon: "📰", label: "行业动态", href: "/feed" },
                { icon: "📋", label: "商城公告", href: "/profile/notifications" },
              ].map(({ icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#F5EFE8] hover:bg-[#E8DDD0] transition-colors"
                >
                  <span className="text-lg">{icon}</span>
                  <span className="text-[10px] text-[#1A1208] font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 海报分享 */}
        <section className="rounded-2xl bg-gradient-to-r from-[#D4AF5A] to-[#B8973A] px-5 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">生成分享海报</p>
              <p className="text-xs text-white/80 mt-1">邀请好友享优惠，赚取佣金</p>
            </div>
            <Link href="/distributor/materials" className="flex-shrink-0 bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              生成
            </Link>
          </div>
        </section>

        {/* 店长工作台入口 */}
        <section className="rounded-2xl bg-[#F5EFE8] px-5 py-4 border border-[#B8973A]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#1A1208]">店长工作台</p>
              <p className="text-xs text-[#8C7B6B] mt-1">管理团队 · 查看数据 · 提现佣金</p>
            </div>
            <Link href="/distributor" className="flex-shrink-0 text-[#B8973A] font-semibold text-xs">
              进入 →
            </Link>
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
