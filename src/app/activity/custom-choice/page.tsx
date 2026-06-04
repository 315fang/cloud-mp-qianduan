"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Check } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

const products = [
  { id: "p1", name: "焕活修护精华液", category: "精华", price: 599, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop&q=80" },
  { id: "p2", name: "柔润焕肤乳液", category: "乳液", price: 428, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&h=200&fit=crop&q=80" },
  { id: "p3", name: "晶透亮肤精露", category: "精华", price: 498, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&h=200&fit=crop&q=80" },
  { id: "p4", name: "深层补水面膜", category: "面膜", price: 128, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop&q=80" },
  { id: "p5", name: "舒缓修护面膜", category: "面膜", price: 138, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop&q=80" },
  { id: "p6", name: "轻透保湿霜", category: "面霜", price: 368, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop&q=80" },
];

const tiers = [
  { count: 3, label: "3 件", discount: 0.88, desc: "88 折" },
  { count: 4, label: "4 件", discount: 0.85, desc: "85 折" },
  { count: 5, label: "5 件", discount: 0.80, desc: "8 折" },
];

export default function CustomChoicePage() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const total = useMemo(
    () => products.filter((p) => selected.includes(p.id)).reduce((sum, p) => sum + p.price, 0),
    [selected]
  );

  const currentTier = tiers.slice().reverse().find((t) => selected.length >= t.count);
  const discountedTotal = currentTier ? Math.round(total * currentTier.discount) : total;
  const savings = total - discountedTotal;

  return (
    <PhoneFrame>
      <div className="bg-[#FAF7F4] min-h-screen">

        {/* Header */}
        <div className="sticky top-0 z-50 bg-[#FAF7F4]/95 backdrop-blur-sm border-b border-[#E8DDD0] px-5 py-3 flex items-center gap-3">
          <Link href="/activity" className="-ml-1">
            <ChevronLeft size={22} className="text-[#1A1208]" strokeWidth={1.5} />
          </Link>
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#B8973A] uppercase">04</p>
            <h1 className="text-sm font-light text-[#1A1208]">特惠随心选</h1>
          </div>
        </div>

        {/* Hero */}
        <div className="relative h-44 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=350&fit=crop&q=90"
            alt="特惠随心选"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F4] via-transparent to-transparent" />
        </div>

        {/* Intro */}
        <div className="px-5 pt-2 pb-5">
          <p className="text-[10px] tracking-widest text-[#B8973A] uppercase mb-2">Custom · 自由组合</p>
          <h2 className="text-2xl font-light text-[#1A1208] leading-snug mb-3">
            随心搭配<br />多选更优惠
          </h2>

          {/* Tier indicator */}
          <div className="flex gap-2 mt-3">
            {tiers.map((tier) => (
              <div
                key={tier.count}
                className={`flex-1 py-2 text-center border transition-colors ${
                  selected.length >= tier.count
                    ? "border-[#B8973A] bg-[#B8973A]/5"
                    : "border-[#E8DDD0] bg-transparent"
                }`}
              >
                <p className={`text-xs font-light ${selected.length >= tier.count ? "text-[#B8973A]" : "text-[#C8BAA8]"}`}>
                  {tier.desc}
                </p>
                <p className={`text-[10px] font-light ${selected.length >= tier.count ? "text-[#8C7B6B]" : "text-[#C8BAA8]"}`}>
                  {tier.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-5 h-px bg-[#E8DDD0]" />

        {/* Product Grid */}
        <div className="px-5 pt-5 pb-36">
          <p className="text-[10px] tracking-widest text-[#B8973A] uppercase mb-4">选择产品</p>
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => {
              const isSelected = selected.includes(product.id);
              return (
                <button
                  key={product.id}
                  onClick={() => toggle(product.id)}
                  className={`group text-left border transition-all ${
                    isSelected ? "border-[#B8973A]" : "border-[#E8DDD0]"
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#B8973A] flex items-center justify-center">
                        <Check size={11} className="text-white" strokeWidth={2.5} />
                      </div>
                    )}
                    <span className="absolute bottom-2 left-2 text-[9px] text-[#8C7B6B] bg-[#FAF7F4]/80 backdrop-blur-sm px-1.5 py-0.5">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11px] font-light text-[#1A1208] line-clamp-1">{product.name}</p>
                    <p className={`text-xs mt-0.5 font-light ${isSelected ? "text-[#B8973A]" : "text-[#8C7B6B]"}`}>
                      ¥{product.price}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticky Summary Bar */}
        <div className="fixed bottom-16 left-0 right-0 max-w-[390px] mx-auto bg-[#FAF7F4] border-t border-[#E8DDD0] px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] text-[#8C7B6B] font-light">
                已选 {selected.length} 件
                {currentTier && <span className="text-[#B8973A] ml-1">· {currentTier.desc}</span>}
              </p>
              {savings > 0 && (
                <p className="text-[10px] text-[#B8973A] font-light">省 ¥{savings}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[#C8BAA8] line-through font-light">
                {selected.length > 0 && currentTier ? `¥${total}` : ""}
              </p>
              <p className="text-base font-light text-[#1A1208]">
                {selected.length > 0 ? `¥${discountedTotal}` : "—"}
              </p>
            </div>
          </div>
          <button
            disabled={selected.length < 3}
            className={`w-full py-3 text-xs tracking-widest font-light transition-colors ${
              selected.length >= 3
                ? "bg-[#1A1208] text-[#FAF7F4]"
                : "bg-[#E8DDD0] text-[#C8BAA8]"
            }`}
          >
            {selected.length < 3 ? `还需选 ${3 - selected.length} 件` : "确认组合"}
          </button>
        </div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
