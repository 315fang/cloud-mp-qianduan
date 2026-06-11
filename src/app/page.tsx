"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, ChevronRight, ArrowRight, Crown, Ticket, Zap, Gift, Users, Sparkles } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BannerCarousel from "@/components/BannerCarousel";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

const hotProducts = products.filter((p) => p.isHot || p.isNew).slice(0, 4);

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
        {/* 公告栏：私享礼遇语言，去促销腔 */}
        <Link
          href="/coupons/center"
          className="surface-noir px-4 py-1.5 flex items-center justify-center gap-2 overflow-hidden"
        >
          <span className="text-[9px] tracking-[0.28em] text-[#D4AF5A] font-semibold uppercase">
            Privilege
          </span>
          <p className="text-[10px] text-white/75 truncate">
            会员私享礼遇已上线 · 新客首单尊享入会礼
          </p>
          <ChevronRight size={10} className="text-[#D4AF5A] flex-shrink-0" />
        </Link>

        <div className="flex items-center justify-between px-5 pt-3 pb-2">
          <div>
            <p className="font-display-en text-[10px] font-medium text-[#B8973A]">Wenlan Beauty</p>
            <h1 className="font-luxury text-xl text-[#1A1208] leading-tight">问兰</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/profile/notifications" className="relative w-8 h-8 flex items-center justify-center" aria-label="消息通知">
              <Bell size={20} strokeWidth={1.5} className="text-[#3D2B1A]" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#B8973A] rounded-full" />
            </Link>
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

      <div className="px-4 space-y-7 pb-4">
        {/* Banner 轮播 */}
        <BannerCarousel />

        {/* 金刚区 - 精选 5 入口，留白克制 */}
        <section aria-label="功能入口">
          <div className="grid grid-cols-5 gap-x-1 bg-white rounded-2xl py-4 px-2">
            {[
              { icon: Crown, label: "品牌世界", href: "/brand" },
              { icon: Sparkles, label: "新品上市", href: "/products" },
              { icon: Zap, label: "限时专场", href: "/activity/flash" },
              { icon: Ticket, label: "领券中心", href: "/coupons/center" },
              { icon: Gift, label: "会员礼遇", href: "/lottery" },
            ].map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-1.5">
                <div className="w-11 h-11 rounded-full bg-[#F5EFE8] flex items-center justify-center">
                  <Icon size={19} className="text-[#B8973A]" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] text-[#3D2B1A] font-medium text-center leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 品牌叙事区 —— 1974 溯源 · 真实品牌故事 */}
        <section aria-labelledby="brand-narrative-heading">
          <Link href="/brand" className="block surface-noir rounded-2xl px-6 py-8 relative overflow-hidden">
            {/* 金色装饰角线 */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#B8973A]/50" aria-hidden="true" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#B8973A]/50" aria-hidden="true" />
            <p className="eyebrow text-center">Since 1974 · Suzhou</p>
            <h2
              id="brand-narrative-heading"
              className="font-luxury text-[22px] leading-snug text-white text-center mt-3 text-balance"
            >
              先修墙，再蓄水，后抗老
            </h2>
            <div className="gold-rule mx-auto mt-4" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-white/65 text-center mt-4 text-pretty">
              源自苏州近半世纪皮肤修护经验，
              以人造皮脂膜™仿生科技稳固肌肤屏障，
              让皮肤重新拥有稳定、蓄水与自我焕新的能力。
            </p>
            <span className="flex items-center justify-center gap-1.5 mt-5 text-[11px] tracking-[0.2em] text-[#D4AF5A] uppercase">
              探索品牌世界 <ArrowRight size={12} />
            </span>
          </Link>
        </section>

        {/* 限时专场：保留活力但视觉克制 */}
        <section aria-labelledby="flash-sale-heading">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="eyebrow">Limited Offer</p>
              <h2 id="flash-sale-heading" className="font-luxury text-lg text-[#1A1208] mt-1">限时专场</h2>
            </div>
            {/* 倒计时 */}
            <div className="flex items-center gap-1.5 pb-0.5" aria-label={`剩余时间 ${countdown.h}小时${countdown.m}分${countdown.s}秒`}>
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
            {products.slice(0, 4).map((product) => (
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
                    <div className="absolute top-2 left-2 bg-[#1A1208] text-[#D4AF5A] text-[9px] font-semibold px-2 py-0.5 rounded-full tracking-wider">
                      会员价
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
                      style={{ width: `${30 + ((product.id.charCodeAt(0) * 7) % 56)}%` }}
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

        {/* 更多玩法：拼团/砍价/随心配 收进次级横排入口 */}
        <section aria-label="互动玩法">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Users, label: "好友拼团", sub: "成团享专属价", href: "/group" },
              { icon: Gift, label: "幸运抽奖", sub: "积分赢好礼", href: "/lottery" },
              { icon: Sparkles, label: "随心配", sub: "自由组合套组", href: "/activity/diy/list" },
            ].map(({ icon: Icon, label, sub, href }) => (
              <Link key={label} href={href} className="bg-white rounded-2xl px-3 py-3.5 flex flex-col items-center gap-1.5">
                <Icon size={18} className="text-[#B8973A]" strokeWidth={1.5} />
                <span className="text-[11px] font-semibold text-[#1A1208]">{label}</span>
                <span className="text-[9px] text-[#8C7B6B]">{sub}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 臻选推荐 */}
        <section aria-labelledby="hot-heading">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="eyebrow">Selection</p>
              <h2 id="hot-heading" className="font-luxury text-lg text-[#1A1208] mt-1">臻选推荐</h2>
            </div>
            <Link href="/products" className="flex items-center gap-0.5 text-[12px] text-[#B8973A] pb-0.5">
              查看全部 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {hotProducts.map((product) => (
              <ProductCard key={product.id} product={product} layout="grid" />
            ))}
          </div>
        </section>

        {/* 底部品牌信息 */}
        <div className="text-center py-8">
          <div className="gold-divider mb-5" aria-hidden="true" />
          <p className="font-display-en text-[11px] text-[#3D2B1A]">Wenlan Beauty · Since 1974</p>
          <p className="text-[10px] text-[#8C7B6B]/70 mt-1.5 tracking-[0.1em]">1974 溯源 · 屏障修护 · 国货高端功效护肤</p>
        </div>
      </div>
    </PhoneFrame>
  );
}
