"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";

const sortOptions = ["综合", "销量", "价格↑", "价格↓", "评分"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("综合");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (activeSort === "销量") return b.reviewCount - a.reviewCount;
    if (activeSort === "价格↑") return a.price - b.price;
    if (activeSort === "价格↓") return b.price - a.price;
    if (activeSort === "评分") return b.rating - a.rating;
    return 0;
  });

  return (
    <PhoneFrame>
      {/* 顶部 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <Link href="/" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </Link>
          <div className="flex-1 flex items-center gap-2 bg-[#F5EFE8] rounded-full px-4 py-2.5">
            <Search size={14} className="text-[#8C7B6B]" />
            <span className="text-[13px] text-[#8C7B6B]">搜索商品...</span>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]" aria-label="筛选">
            <SlidersHorizontal size={16} className="text-[#1A1208]" />
          </button>
        </div>

        {/* 分类标签横滑 */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveCategory("all")}
            className={`flex-shrink-0 text-xs font-medium px-4 py-1.5 rounded-full transition-all ${
              activeCategory === "all"
                ? "bg-[#1A1208] text-white"
                : "bg-[#F5EFE8] text-[#3D2B1A]"
            }`}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 text-xs font-medium px-4 py-1.5 rounded-full transition-all ${
                activeCategory === cat.id
                  ? "bg-[#1A1208] text-white"
                  : "bg-[#F5EFE8] text-[#3D2B1A]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 排序栏 */}
        <div className="flex items-center justify-between px-4 pb-2 border-b border-[#E8DDD0]">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {sortOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveSort(opt)}
                className={`flex-shrink-0 text-[12px] pb-1.5 border-b-2 transition-all ${
                  activeSort === opt
                    ? "border-[#B8973A] text-[#B8973A] font-semibold"
                    : "border-transparent text-[#8C7B6B]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="ml-3 text-[#8C7B6B] flex-shrink-0"
            aria-label="切换视图"
          >
            {viewMode === "grid" ? <List size={18} /> : <LayoutGrid size={18} />}
          </button>
        </div>
      </header>

      {/* 商品列表 */}
      <div className="px-4 py-4">
        <p className="text-[11px] text-[#8C7B6B] mb-3">共 {sorted.length} 件商品</p>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-3">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} layout="grid" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} layout="list" />
            ))}
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
