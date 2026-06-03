import Link from "next/link";
import { Search, Bell, ChevronRight, Flame, Sparkles } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BannerCarousel from "@/components/BannerCarousel";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";

const hotProducts = products.filter((p) => p.isHot || p.isNew).slice(0, 4);
const allProducts = products.slice(0, 6);

export default function HomePage() {
  return (
    <PhoneFrame>
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-[#B8973A] uppercase">Cloud Beauty</p>
            <h1 className="text-lg font-bold text-[#1A1208] leading-tight">云肌护肤</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-8 h-8 flex items-center justify-center" aria-label="消息通知">
              <Bell size={20} strokeWidth={1.5} className="text-[#3D2B1A]" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#B8973A] rounded-full" />
            </button>
            <Link
              href="/products"
              className="w-8 h-8 flex items-center justify-center"
              aria-label="搜索商品"
            >
              <Search size={20} strokeWidth={1.5} className="text-[#3D2B1A]" />
            </Link>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="px-5 pb-3">
          <Link href="/products" className="flex items-center gap-2 bg-[#F5EFE8] rounded-full px-4 py-2.5">
            <Search size={14} className="text-[#8C7B6B]" />
            <span className="text-[13px] text-[#8C7B6B]">搜索精华、面霜、护肤套装...</span>
          </Link>
        </div>
      </header>

      <div className="px-4 space-y-5 pb-4">
        {/* Banner 轮播 */}
        <BannerCarousel />

        {/* 功效分类 */}
        <section>
          <div className="grid grid-cols-6 gap-2 py-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F5EFE8] flex items-center justify-center group-active:bg-[#F0E6C8] transition-colors">
                  <span className="text-lg text-[#B8973A]">{cat.icon}</span>
                </div>
                <span className="text-[11px] text-[#3D2B1A] font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 金色分隔线 */}
        <div className="gold-divider" />

        {/* 活动横幅 */}
        <section className="rounded-2xl bg-[#1A1208] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-[#B8973A] font-medium">LIMITED OFFER</p>
              <p className="text-base font-bold text-white mt-0.5">新会员专属礼遇</p>
              <p className="text-xs text-white/60 mt-0.5">首单立减 ¥50 · 满 299 享 8 折</p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-1 bg-[#B8973A] text-white text-xs font-medium px-4 py-2 rounded-full"
            >
              立即领取
              <ChevronRight size={12} />
            </Link>
          </div>
        </section>

        {/* 热门推荐 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-[#B8973A]" />
              <h2 className="text-base font-bold text-[#1A1208]">热门推荐</h2>
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

        {/* 精选系列 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#B8973A]" />
              <h2 className="text-base font-bold text-[#1A1208]">精选系列</h2>
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
          <div className="gold-divider mb-4" />
          <p className="text-[10px] tracking-[0.25em] text-[#8C7B6B] font-medium">CLOUD BEAUTY · 云肌</p>
          <p className="text-[10px] text-[#8C7B6B]/60 mt-1">源自自然 · 精于科技 · 美于生活</p>
        </div>
      </div>
    </PhoneFrame>
  );
}
