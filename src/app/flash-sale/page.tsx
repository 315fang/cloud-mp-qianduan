"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Flame, ShoppingCart } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import { products } from "@/lib/data";

function useCountdown(ms: number) {
  const [left, setLeft] = useState(ms);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => Math.max(0, v - 1000)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(left / 3600000)).padStart(2, "0");
  const m = String(Math.floor((left % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((left % 60000) / 1000)).padStart(2, "0");
  return { h, m, s, left };
}

const flashSaleProducts = [
  { ...products[0], flashPrice: 298, stock: 8, sold: 42 },
  { ...products[1], flashPrice: 188, stock: 15, sold: 28 },
  { ...products[2], flashPrice: 168, stock: 5, sold: 65 },
  { ...products[3], flashPrice: 98, stock: 2, sold: 89 },
];

export default function FlashSalePage() {
  const countdown = useCountdown(6 * 3600000 + 45 * 60000 + 32 * 1000);
  const progressPercent = (countdown.left / (8 * 3600000)) * 100;

  return (
    <PhoneFrame>
      <div className="bg-gradient-to-b from-[#1A1208] to-[#3D2B1A] text-white sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#B8973A]/20">
          <Link href="/activity" className="flex items-center">
            <ChevronLeft size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <Flame size={18} className="text-[#E8573A]" />
            <span className="text-base font-bold">限时秒杀</span>
          </div>
          <div className="w-6" />
        </div>

        {/* 倒计时和进度条 */}
        <div className="px-4 py-3 space-y-2">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-black text-[#E8573A]">{countdown.h}</span>
            <span className="text-lg text-[#D4AF5A]">:</span>
            <span className="text-3xl font-black text-[#E8573A]">{countdown.m}</span>
            <span className="text-lg text-[#D4AF5A]">:</span>
            <span className="text-3xl font-black text-[#E8573A]">{countdown.s}</span>
            <span className="text-xs text-[#B8973A] ml-2">活动进行中</span>
          </div>
          <div className="h-1 rounded-full bg-[#B8973A]/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E8573A] to-[#B8973A] transition-all"
              style={{ width: `${Math.min(100, progressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-3 py-3 space-y-2">
        {flashSaleProducts.map((product) => {
          const discount = Math.round(
            ((product.price - product.flashPrice) / product.price) * 10
          ) * 10;
          const stockPercent = (product.sold / (product.sold + product.stock)) * 100;

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3 p-3">
                <div className="relative w-24 h-24 rounded-xl bg-[#F5EFE8] flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-2"
                  />
                  <div className="absolute top-1 left-1 bg-[#E8573A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    -{discount}%
                  </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#1A1208] line-clamp-2">
                      {product.name}
                    </p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-base font-black text-[#E8573A]">
                        ¥{product.flashPrice}
                      </span>
                      <span className="text-[10px] text-[#8C7B6B] line-through">
                        ¥{product.price}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] text-[#8C7B6B]">
                        已抢 {product.sold} | 仅剩 {product.stock}
                      </span>
                      {product.stock <= 3 && (
                        <span className="text-[8px] font-bold text-[#E8573A]">即将售罄</span>
                      )}
                    </div>
                    <div className="h-1 rounded-full bg-[#F0E8DC] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#E8573A] to-[#B8973A]"
                        style={{ width: `${stockPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-center">
                  <button className="w-10 h-10 rounded-full bg-[#B8973A] text-white flex items-center justify-center">
                    <ShoppingCart size={16} />
                  </button>
                  <span className="text-[8px] text-[#8C7B6B] mt-1">立即抢</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
