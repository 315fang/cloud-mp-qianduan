"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, ChevronRight, ArrowRight, Crown, Ticket, Zap, Sparkles, Heart } from "lucide-react";
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
            <p className="font-display-en text-[10px] font-medium gold-sheen">Wenlan Beauty</p>
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
        <section aria-label="功能入口" className="animate-rise animate-rise-1">
          <div className="grid grid-cols-5 gap-x-1 bg-white rounded-2xl py-4 px-2">
            {[
              { icon: Crown, label: "品牌世界", href: "/brand" },
              { icon: Sparkles, label: "新品上市", href: "/products" },
              { icon: Zap, label: "限时专场", href: "/activity/flash" },
              { icon: Ticket, label: "领券中心", href: "/coupons/center" },
              { icon: Heart, label: "会员礼遇", href: "/lottery" },
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
        <section aria-labelledby="brand-narrative-heading" className="animate-rise animate-rise-2">
          <Link href="/brand" className="block surface-noir rounded-2xl px-6 py-8 relative overflow-hidden press-scale">
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

        {/* 精品系列：肌肤哲学三部曲的套组化呈现（拼图式 Bento） */}
        <section aria-labelledby="collections-heading" className="animate-rise animate-rise-2">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="eyebrow">Collections</p>
              <h2 id="collections-heading" className="font-luxury text-lg text-[#1A1208] mt-1">精品系列</h2>
            </div>
            <span className="text-[11px] text-[#8C7B6B] pb-0.5">三步哲学 · 系列套组</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* 左：修护系列高卡（第一步，视觉权重最高） */}
            <Link
              href="/products?series=repair"
              className="relative row-span-2 rounded-2xl overflow-hidden press-scale surface-noir"
            >
              <img
                src="/images/series-repair.png"
                alt="修护系列产品"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/85 via-[#1A1208]/20 to-transparent" />
              <div className="relative flex flex-col justify-end h-full p-4 min-h-[280px]">
                <p className="text-[9px] tracking-[0.25em] text-[#D4AF5A] uppercase">Step 1 · Repair</p>
                <p className="font-luxury text-lg text-white mt-1">修护系列</p>
                <p className="text-[10px] text-white/65 mt-0.5">先修墙 · 稳固肌肤屏障</p>
                <span className="flex items-center gap-1 mt-2 text-[10px] text-[#D4AF5A]">
                  探索套组 <ArrowRight size={11} />
                </span>
              </div>
            </Link>

            {/* 右上：保湿系列 */}
            <Link
              href="/products?series=hydra"
              className="relative rounded-2xl overflow-hidden press-scale surface-champagne"
            >
              <img
                src="/images/series-hydra.png"
                alt="保湿系列产品"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1E10]/75 via-transparent to-transparent" />
              <div className="relative flex flex-col justify-end h-full p-4 min-h-[134px]">
                <p className="text-[9px] tracking-[0.25em] text-[#E8CC7A] uppercase">Step 2 · Hydrate</p>
                <p className="font-luxury text-base text-white mt-0.5">保湿系列</p>
                <p className="text-[10px] text-white/65">再蓄水 · 充盈水润储备</p>
              </div>
            </Link>

            {/* 右下：抗老系列 */}
            <Link
              href="/products?series=antiage"
              className="relative rounded-2xl overflow-hidden press-scale bg-white"
            >
              <img
                src="/images/series-antiage.png"
                alt="抗老系列产品"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1E10]/75 via-transparent to-transparent" />
              <div className="relative flex flex-col justify-end h-full p-4 min-h-[134px]">
                <p className="text-[9px] tracking-[0.25em] text-[#E8CC7A] uppercase">Step 3 · Renew</p>
                <p className="font-luxury text-base text-white mt-0.5">抗老系列</p>
                <p className="text-[10px] text-white/65">后抗老 · 唤醒紧致弹性</p>
              </div>
            </Link>
          </div>
        </section>

        {/* 限时专场：保留活力但视觉克制 */}
        <section aria-labelledby="flash-sale-heading" className="animate-rise animate-rise-3">
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

        {/* 臻选推荐 */}
        <section aria-labelledby="hot-heading" className="animate-rise animate-rise-4">
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

        {/* 问兰礼盒：有故事的套装（花西子式仪式感载体） */}
        <section aria-labelledby="giftset-heading" className="animate-rise animate-rise-4">
          <div className="text-center mb-4">
            <p className="eyebrow">Gift Sets</p>
            <h2 id="giftset-heading" className="font-luxury text-lg text-[#1A1208] mt-1">问兰礼盒</h2>
            <p className="text-[11px] text-[#8C7B6B] mt-1">每一份礼盒，都是一段肌肤修护的旅程</p>
          </div>

          <div className="space-y-3">
            {[
              {
                img: "/images/set-repair.png",
                step: "壹 · 先修墙",
                name: "初愈礼盒",
                story: "致敬 1974 年的第一支修护配方，写给脆弱肌的安抚信",
                price: 469,
                original: 568,
              },
              {
                img: "/images/set-hydra.png",
                step: "贰 · 再蓄水",
                name: "润泽礼盒",
                story: "屏障稳固之后，为肌肤注入一池静水深流",
                price: 399,
                original: 496,
              },
              {
                img: "/images/set-renew.png",
                step: "叁 · 后抗老",
                name: "时光礼盒",
                story: "以近半世纪的修护沉淀，从容回应岁月",
                price: 659,
                original: 788,
              },
            ].map(({ img, step, name, story, price, original }, i) => (
              <Link
                key={name}
                href="/products?tag=套装"
                className={`flex bg-white rounded-2xl overflow-hidden shadow-sm press-scale ${i % 2 === 1 ? "flex-row-reverse" : ""}`}
              >
                <div className="relative w-[42%] flex-shrink-0 bg-[#F5EFE8]">
                  <img src={img} alt={name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="flex-1 px-4 py-5 flex flex-col justify-center min-h-[130px]">
                  <p className="text-[9px] tracking-[0.25em] text-[#B8973A] uppercase">{step}</p>
                  <p className="font-luxury text-base text-[#1A1208] mt-1">{name}</p>
                  <p className="text-[10px] text-[#8C7B6B] mt-1 leading-relaxed text-pretty">{story}</p>
                  <div className="flex items-baseline gap-1.5 mt-2.5">
                    <span className="text-sm font-bold text-[#1A1208]">¥{price}</span>
                    <span className="text-[10px] text-[#B0A18C] line-through">¥{original}</span>
                    <span className="text-[9px] text-[#8C6B1F] bg-[#F0E6C8] px-1.5 py-0.5 rounded-full ml-auto">会员礼遇价</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 品牌专区：药业主视觉 + 资讯三卡 */}
        <section aria-labelledby="brand-zone-heading" className="animate-rise animate-rise-5">
          <div className="text-center mb-4">
            <p className="eyebrow">Brand Zone</p>
            <h2 id="brand-zone-heading" className="font-luxury text-lg text-[#1A1208] mt-1">品牌专区</h2>
          </div>

          {/* 主视觉：问兰药业总部 */}
          <Link href="/brand" className="block bg-white rounded-2xl overflow-hidden shadow-sm press-scale">
            <div className="relative aspect-[16/10] bg-[#F5EFE8]">
              <img
                src="/images/brand-hq.png"
                alt="问兰药业（苏州）总部大楼"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-baseline gap-3 px-5 py-4">
              <span className="font-luxury text-lg text-[#1A1208]">问兰药业</span>
              <span className="text-xs text-[#8C7B6B]">专业皮肤修护 始于1974</span>
              <ChevronRight size={14} className="ml-auto text-[#C0B0A0] self-center" />
            </div>
          </Link>

          {/* 资讯三卡 */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            {[
              { img: "/images/brand-news-event.png", label: "最新活动", tab: "event" },
              { img: "/images/brand-news-lab.png", label: "行业前沿", tab: "industry" },
              { img: "/images/brand-news-store.png", label: "商城公告", tab: "notice" },
            ].map(({ img, label, tab }) => (
              <Link key={tab} href={`/brand/news?tab=${tab}`} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="relative aspect-square bg-[#F5EFE8]">
                  <img src={img} alt={label} className="w-full h-full object-cover" />
                </div>
                <p className="text-[11px] font-semibold text-[#1A1208] px-2.5 py-2.5">{label}</p>
              </Link>
            ))}
          </div>
        </section>
        <div className="text-center py-8">
          <div className="gold-divider mb-5" aria-hidden="true" />
          <p className="font-display-en text-[11px] text-[#3D2B1A]">Wenlan Beauty · Since 1974</p>
          <p className="text-[10px] text-[#8C7B6B]/70 mt-1.5 tracking-[0.1em]">1974 溯源 · 屏障修护 · 国货高端功效护肤</p>
        </div>
      </div>
    </PhoneFrame>
  );
}
