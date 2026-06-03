"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, ChevronRight, Tag } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

type CartItem = {
  product: (typeof products)[0];
  qty: number;
  selected: boolean;
};

const initialCart: CartItem[] = [
  { product: products[0], qty: 1, selected: true },
  { product: products[1], qty: 2, selected: true },
  { product: products[3], qty: 1, selected: false },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialCart);
  const [coupon, setCoupon] = useState("");

  const allSelected = items.every((i) => i.selected);

  const toggleAll = () => {
    setItems(items.map((i) => ({ ...i, selected: !allSelected })));
  };

  const toggleItem = (idx: number) => {
    setItems(items.map((item, i) => (i === idx ? { ...item, selected: !item.selected } : item)));
  };

  const updateQty = (idx: number, delta: number) => {
    setItems(
      items.map((item, i) => {
        if (i !== idx) return item;
        const newQty = Math.max(1, Math.min(item.product.stock, item.qty + delta));
        return { ...item, qty: newQty };
      })
    );
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const selectedItems = items.filter((i) => i.selected);
  const subtotal = selectedItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = subtotal >= 299 ? 0 : 12;
  const discount = coupon === "CLOUD50" ? 50 : 0;
  const total = subtotal + shipping - discount;

  return (
    <PhoneFrame>
      {/* 顶栏 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </Link>
        <h1 className="text-base font-bold text-[#1A1208]">购物车</h1>
        <button className="text-[12px] text-[#B8973A] font-medium">管理</button>
      </header>

      <div className="px-4 pb-4 space-y-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#8C7B6B]">
            <ShoppingBag size={48} strokeWidth={1} className="mb-4 text-[#E8DDD0]" />
            <p className="text-sm font-medium">购物车空空如也</p>
            <Link
              href="/products"
              className="mt-4 bg-[#1A1208] text-white text-sm font-medium px-8 py-2.5 rounded-full"
            >
              去逛逛
            </Link>
          </div>
        ) : (
          <>
            {/* 全选 */}
            <div className="flex items-center gap-3 py-1">
              <button
                onClick={toggleAll}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  allSelected ? "bg-[#1A1208] border-[#1A1208]" : "border-[#D5C9BC]"
                }`}
              >
                {allSelected && <span className="text-white text-[10px] leading-none">✓</span>}
              </button>
              <span className="text-sm text-[#3D2B1A] font-medium">全选</span>
              <span className="text-xs text-[#8C7B6B] ml-auto">{items.length} 件商品</span>
            </div>

            {/* 商品列表 */}
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={item.product.id} className="bg-white rounded-2xl p-4 flex gap-3">
                  {/* 选择框 */}
                  <button
                    onClick={() => toggleItem(idx)}
                    className={`mt-auto mb-auto w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                      item.selected ? "bg-[#1A1208] border-[#1A1208]" : "border-[#D5C9BC]"
                    }`}
                  >
                    {item.selected && <span className="text-white text-[10px] leading-none">✓</span>}
                  </button>

                  {/* 商品图 */}
                  <Link href={`/products/${item.product.id}`} className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#F5EFE8] flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </Link>

                  {/* 商品信息 */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-sm font-semibold text-[#1A1208] leading-tight line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="text-[11px] text-[#8C7B6B] mt-0.5">{item.product.subtitle}</p>
                      <span className="text-[10px] text-[#B8973A] bg-[#F0E6C8] px-1.5 py-0.5 rounded-full mt-1 inline-block">
                        {item.product.specs[0].value}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-base font-bold text-[#1A1208]">¥{item.product.price}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeItem(idx)}
                          className="text-[#D5C9BC] mr-1"
                          aria-label="删除"
                        >
                          <Trash2 size={14} />
                        </button>
                        <button
                          onClick={() => updateQty(idx, -1)}
                          className="w-7 h-7 rounded-full border border-[#E8DDD0] flex items-center justify-center text-[#1A1208]"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-semibold text-[#1A1208] w-5 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(idx, 1)}
                          className="w-7 h-7 rounded-full bg-[#1A1208] flex items-center justify-center text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 优惠券 */}
            <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3">
              <Tag size={16} className="text-[#B8973A]" />
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                placeholder="输入优惠码（试试 CLOUD50）"
                className="flex-1 text-sm text-[#1A1208] bg-transparent outline-none placeholder:text-[#C0B0A0]"
              />
              <button className="text-xs text-[#B8973A] font-semibold">使用</button>
            </div>

            {/* 运费提示 */}
            {subtotal > 0 && subtotal < 299 && (
              <div className="bg-[#F0E6C8] rounded-xl px-4 py-2.5">
                <p className="text-xs text-[#B8973A]">
                  再购 ¥{(299 - subtotal).toFixed(0)} 即可免运费
                </p>
              </div>
            )}
            {subtotal >= 299 && (
              <div className="bg-[#F0E6C8] rounded-xl px-4 py-2.5">
                <p className="text-xs text-[#B8973A]">已享顺丰免费配送</p>
              </div>
            )}

            {/* 价格明细 */}
            <div className="bg-white rounded-2xl px-4 py-4 space-y-3">
              <h3 className="text-sm font-bold text-[#1A1208]">价格明细</h3>
              <div className="space-y-2">
                {[
                  { label: `商品小计（${selectedItems.reduce((s, i) => s + i.qty, 0)} 件）`, value: `¥${subtotal.toFixed(2)}` },
                  { label: "运费", value: shipping === 0 ? "免运费" : `¥${shipping}` },
                  ...(discount > 0 ? [{ label: "优惠码折扣", value: `-¥${discount}` }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-[#8C7B6B]">{label}</span>
                    <span className={`font-medium ${value.startsWith("-") ? "text-[#B8973A]" : "text-[#1A1208]"}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="gold-divider" />
              <div className="flex justify-between">
                <span className="text-sm font-bold text-[#1A1208]">合计</span>
                <span className="text-lg font-bold text-[#1A1208]">¥{total.toFixed(2)}</span>
              </div>
            </div>

            {/* 推荐加购 */}
            <div className="bg-white rounded-2xl px-4 py-3">
              <Link href="/products" className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1A1208]">为你推荐</span>
                <ChevronRight size={16} className="text-[#8C7B6B]" />
              </Link>
            </div>
          </>
        )}
      </div>

      {/* 底部结算栏 */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#E8DDD0] px-5 py-3 z-50">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-[#8C7B6B]">合计</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-[#1A1208]">¥{total.toFixed(2)}</span>
                {discount > 0 && (
                  <span className="text-xs text-[#B8973A]">已省¥{discount}</span>
                )}
              </div>
            </div>
            <button
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                selectedItems.length > 0
                  ? "bg-[#1A1208] text-white"
                  : "bg-[#E8DDD0] text-[#8C7B6B]"
              }`}
              disabled={selectedItems.length === 0}
            >
              结算（{selectedItems.length}）
            </button>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
