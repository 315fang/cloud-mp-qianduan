"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  ShoppingBag,
  ChevronRight,
  Flame,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";

const sortOptions = ["综合", "销量", "价格↑", "价格↓", "评分"];

const priceRanges = [
  { label: "全部", min: 0, max: Infinity },
  { label: "¥0-199", min: 0, max: 199 },
  { label: "¥200-399", min: 200, max: 399 },
  { label: "¥400+", min: 400, max: Infinity },
];

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("综合");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activePriceRange, setActivePriceRange] = useState(0);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyHot, setOnlyHot] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 筛选逻辑
  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const range = priceRanges[activePriceRange];
    const matchPrice = p.price >= range.min && p.price <= range.max;
    const matchNew = onlyNew ? p.isNew : true;
    const matchHot = onlyHot ? p.isHot : true;
    const matchQuery = query.trim()
      ? p.name.includes(query.trim()) ||
        p.subtitle.includes(query.trim()) ||
        p.tags.some((t) => t.includes(query.trim()))
      : true;
    return matchCat && matchPrice && matchNew && matchHot && matchQuery;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (activeSort === "销量") return b.reviewCount - a.reviewCount;
    if (activeSort === "价格↑") return a.price - b.price;
    if (activeSort === "价格↓") return b.price - a.price;
    if (activeSort === "评分") return b.rating - a.rating;
    return 0;
  });

  const hasActiveFilter =
    activePriceRange !== 0 || onlyNew || onlyHot;

  const resetFilters = () => {
    setActivePriceRange(0);
    setOnlyNew(false);
    setOnlyHot(false);
  };

  return (
    <PhoneFrame>
      {/* 顶部 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm">
        {/* 搜索行 */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <Link
            href="/"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8] flex-shrink-0"
          >
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </Link>

          <div className="flex-1 flex items-center gap-2 bg-[#F5EFE8] rounded-full px-4 py-2.5">
            <Search size={14} className="text-[#8C7B6B] flex-shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索精华、面霜、眼霜..."
              className="flex-1 text-[13px] text-[#1A1208] bg-transparent outline-none placeholder:text-[#8C7B6B] min-w-0"
              aria-label="搜索商品"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="清除搜索">
                <X size={14} className="text-[#8C7B6B]" />
              </button>
            )}
          </div>

          <button
            onClick={() => setFilterOpen(true)}
            className={`relative w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 transition-colors ${
              hasActiveFilter ? "bg-[#1A1208]" : "bg-[#F5EFE8]"
            }`}
            aria-label="筛选"
          >
            <SlidersHorizontal
              size={16}
              className={hasActiveFilter ? "text-white" : "text-[#1A1208]"}
            />
            {hasActiveFilter && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#B8973A] rounded-full" />
            )}
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
              className={`flex-shrink-0 flex items-center gap-1 text-xs font-medium px-4 py-1.5 rounded-full transition-all ${
                activeCategory === cat.id
                  ? "bg-[#1A1208] text-white"
                  : "bg-[#F5EFE8] text-[#3D2B1A]"
              }`}
            >
              <span aria-hidden="true">{cat.icon}</span>
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
            aria-label={viewMode === "grid" ? "切换为列表视图" : "切换为网格视图"}
          >
            {viewMode === "grid" ? <List size={18} /> : <LayoutGrid size={18} />}
          </button>
        </div>
      </header>

      {/* 活动横幅（仅在无搜索时展示） */}
      {!query && activeCategory === "all" && (
        <div className="mx-4 mt-3 bg-[#1A1208] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Flame size={14} className="text-[#B8973A]" />
              <div>
                <p className="text-[10px] text-[#B8973A] font-medium tracking-wider">FLASH SALE</p>
                <p className="text-xs font-bold text-white">本周特惠 · 最高直降 ¥180</p>
              </div>
            </div>
            <Link
              href="/?section=flash"
              className="flex items-center gap-0.5 text-[11px] text-[#D4AF5A] font-medium"
            >
              抢购 <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      )}

      {/* 商品列表 */}
      <div className="px-4 py-4">
        {/* 结果统计 */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] text-[#8C7B6B]">
            {query
              ? `"${query}" 共找到 ${sorted.length} 件商品`
              : `共 ${sorted.length} 件商品`}
          </p>
          {hasActiveFilter && (
            <button
              onClick={resetFilters}
              className="text-[11px] text-[#B8973A] font-medium flex items-center gap-0.5"
            >
              <X size={11} />
              重置筛选
            </button>
          )}
        </div>

        {/* 空状态 */}
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#8C7B6B]">
            <div className="w-20 h-20 rounded-full bg-[#F5EFE8] flex items-center justify-center mb-4">
              <ShoppingBag size={32} strokeWidth={1} className="text-[#E8DDD0]" />
            </div>
            <p className="text-sm font-medium text-[#3D2B1A]">
              {query ? `未找到与"${query}"相关的商品` : "该分类暂无商品"}
            </p>
            <p className="text-xs text-[#8C7B6B] mt-1">换个关键词或分类试试吧</p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
                resetFilters();
              }}
              className="mt-5 bg-[#1A1208] text-white text-sm font-medium px-8 py-3 rounded-full"
            >
              查看全部商品
            </button>
          </div>
        ) : viewMode === "grid" ? (
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

      {/* 筛选抽屉 */}
      {filterOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end"
          style={{ left: "50%", transform: "translateX(-50%)", maxWidth: 390, width: "100%" }}
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setFilterOpen(false)}
          />
          <div className="relative w-full bg-white rounded-t-[24px] px-5 pt-5 pb-8 z-10">
            {/* 抽屉头部 */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-[#1A1208]">筛选</h2>
              <button onClick={() => setFilterOpen(false)} aria-label="关闭筛选">
                <X size={20} className="text-[#8C7B6B]" />
              </button>
            </div>

            {/* 价格区间 */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-[#1A1208] mb-3">价格区间</p>
              <div className="flex gap-2 flex-wrap">
                {priceRanges.map(({ label }, i) => (
                  <button
                    key={label}
                    onClick={() => setActivePriceRange(i)}
                    className={`text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                      activePriceRange === i
                        ? "bg-[#1A1208] text-white border-[#1A1208]"
                        : "bg-white text-[#3D2B1A] border-[#E8DDD0]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 商品标签 */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-[#1A1208] mb-3">商品标签</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setOnlyNew(!onlyNew)}
                  className={`text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                    onlyNew
                      ? "bg-[#1A1208] text-white border-[#1A1208]"
                      : "bg-white text-[#3D2B1A] border-[#E8DDD0]"
                  }`}
                >
                  新品
                </button>
                <button
                  onClick={() => setOnlyHot(!onlyHot)}
                  className={`text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                    onlyHot
                      ? "bg-[#1A1208] text-white border-[#1A1208]"
                      : "bg-white text-[#3D2B1A] border-[#E8DDD0]"
                  }`}
                >
                  热销
                </button>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 rounded-full border border-[#E8DDD0] text-sm font-semibold text-[#3D2B1A]"
              >
                重置
              </button>
              <button
                onClick={() => setFilterOpen(false)}
                className="flex-2 flex-grow-[2] py-3 rounded-full bg-[#1A1208] text-sm font-semibold text-white"
              >
                查看 {sorted.length} 件商品
              </button>
            </div>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
