"use client";

import Link from "next/link";
import { ChevronLeft, Package, Zap, ShoppingCart } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

const shoppingBags = [
  {
    id: "bag1",
    name: "初夏护肤套装",
    desc: "精华液 + 乳液 + 面膜",
    originalPrice: 1298,
    bagPrice: 899,
    products: [
      { name: "云肌精华液 50ml", originalPrice: 598 },
      { name: "轻盈乳液 100ml", originalPrice: 398 },
      { name: "补水面膜 5片", originalPrice: 302 },
    ],
    badge: "热销",
  },
  {
    id: "bag2",
    name: "敏感肌修护套装",
    desc: "舒缓精华 + 修护霜 + 隔离",
    originalPrice: 1298,
    bagPrice: 799,
    products: [
      { name: "舒缓精华液 50ml", originalPrice: 568 },
      { name: "修护面霜 50ml", originalPrice: 468 },
      { name: "清爽隔离 30ml", originalPrice: 262 },
    ],
    badge: "新品",
  },
  {
    id: "bag3",
    name: "男士护肤基础套装",
    desc: "洁面 + 爽肤水 + 乳液",
    originalPrice: 868,
    bagPrice: 599,
    products: [
      { name: "深层洁面乳 150ml", originalPrice: 268 },
      { name: "清爽爽肤水 120ml", originalPrice: 298 },
      { name: "清爽乳液 100ml", originalPrice: 302 },
    ],
    badge: "热销",
  },
];

export default function ShoppingBagsPage() {
  return (
    <PhoneFrame>
      <div className="sticky top-0 z-50 bg-white border-b border-[#F0E8DC]">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/profile" className="flex items-center">
            <ChevronLeft size={24} className="text-[#1A1208]" />
          </Link>
          <Package size={20} className="text-[#B8973A]" />
          <span className="text-base font-bold text-[#1A1208]">购物袋</span>
        </div>
      </div>

      <div className="px-3 py-4 space-y-3">
        {shoppingBags.map((bag) => {
          const savings = bag.originalPrice - bag.bagPrice;
          const savingsPercent = Math.round((savings / bag.originalPrice) * 100);

          return (
            <div key={bag.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {/* 顶部信息 */}
              <div className="bg-gradient-to-r from-[#F5EDE0] to-[#EDD9BC] p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-[#3D2B1A]">{bag.name}</h3>
                    <p className="text-xs text-[#8C7B6B] mt-0.5">{bag.desc}</p>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-1 rounded-full bg-[#E8573A]/10 text-[#E8573A]">
                    {bag.badge}
                  </span>
                </div>

                {/* 价格对比 */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-black text-[#B8973A]">¥{bag.bagPrice}</span>
                  <span className="text-xs text-[#8C7B6B] line-through">¥{bag.originalPrice}</span>
                  <span className="ml-auto text-xs font-bold text-[#E8573A]">省 ¥{savings}</span>
                </div>

                {/* 节省指示 */}
                <div className="flex items-center gap-1">
                  <Zap size={12} className="text-[#E8573A]" />
                  <span className="text-[10px] font-semibold text-[#E8573A]">省 {savingsPercent}%</span>
                </div>
              </div>

              {/* 商品列表 */}
              <div className="px-4 py-3 space-y-2 bg-[#FAFAF8]">
                {bag.products.map((product, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-[#3D2B1A]">{product.name}</span>
                    <span className="text-[#8C7B6B]">¥{product.originalPrice}</span>
                  </div>
                ))}
              </div>

              {/* 购买按钮 */}
              <div className="p-4 flex gap-2">
                <button className="flex-1 bg-[#B8973A]/10 text-[#B8973A] font-semibold py-2.5 rounded-full text-sm">
                  详细信息
                </button>
                <button className="flex-1 bg-[#B8973A] text-white font-semibold py-2.5 rounded-full text-sm flex items-center justify-center gap-1">
                  <ShoppingCart size={16} />
                  加入购物车
                </button>
              </div>
            </div>
          );
        })}

        {/* 底部提示 */}
        <div className="bg-gradient-to-r from-[#B8973A]/5 to-[#D4AF5A]/5 rounded-2xl p-4 text-center">
          <p className="text-sm text-[#3D2B1A] font-semibold mb-2">更多套装持续上线</p>
          <p className="text-xs text-[#8C7B6B]">购物袋更划算 · 精选组合 · 好友推荐</p>
        </div>

        <div className="pb-2" />
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
