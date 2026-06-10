"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ChevronRight,
  Tag,
  MapPin,
  Star,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/data";
import { useState } from "react";

const recommendProducts = products.slice(2, 5);

const coupons = [
  { code: "WENLAN50", label: "新人专享 ¥50 优惠码", discount: 50, min: 299 },
  { code: "VIP30", label: "会员 ¥30 优惠码", discount: 30, min: 200 },
];

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQty, toggleSelect, selectedIds, selectAll, setSelectAll, total } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponLabel, setCouponLabel] = useState("");
  const [couponError, setCouponError] = useState("");
  const [showCouponSheet, setShowCouponSheet] = useState(false);

  const itemKey = (id: string, spec: string) => `${id}-${spec}`;
  const someSelected = items.some((i) => selectedIds.has(itemKey(i.product.id, i.spec)));
  const selectedItems = items.filter((i) => selectedIds.has(itemKey(i.product.id, i.spec)));
  const totalQty = selectedItems.reduce((s, i) => s + i.qty, 0);
  const subtotal = selectedItems.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal >= 299 ? 0 : 12;
  const finalTotal = subtotal + shipping - appliedDiscount;

  const applyCoupon = (code: string) => {
    const found = coupons.find((c) => c.code === code.toUpperCase());
    if (!found) {
      setCouponError("优惠码无效，请检查后重试");
      return;
    }
    if (subtotal < found.min) {
      setCouponError(`该优惠码需满 ¥${found.min} 可用`);
      return;
    }
    setAppliedDiscount(found.discount);
    setCouponLabel(found.label);
    setCouponError("");
    setShowCouponSheet(false);
  };

  const clearCoupon = () => {
    setAppliedDiscount(0);
    setCouponLabel("");
    setCouponInput("");
    setCouponError("");
  };

  return (
    <PhoneFrame>
      {/* 顶栏 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]"
        >
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </button>
        <h1 className="text-base font-bold text-[#1A1208]">购物袋</h1>
        <button
          className="text-[12px] text-[#B8973A] font-medium"
          onClick={() => {
            if (someSelected) {
              selectedItems.forEach((i) => removeItem(i.product.id, i.spec));
            }
          }}
        >
          {someSelected ? "删除所选" : "管理"}
        </button>
      </header>

      <div className="px-4 pb-4 space-y-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#8C7B6B]">
            <ShoppingBag size={48} strokeWidth={1} className="mb-4 text-[#E8DDD0]" />
            <p className="text-sm font-medium text-[#3D2B1A]">购物袋空空如也</p>
            <p className="text-xs text-[#8C7B6B] mt-1">快去挑选心仪的护肤品吧</p>
            <Link
              href="/products"
              className="mt-5 bg-[#1A1208] text-white text-sm font-medium px-10 py-3 rounded-full"
            >
              去逛逛
            </Link>
          </div>
        ) : (
          <>
            {/* 收货地址 */}
            <Link
              href="/profile/address"
              className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5"
            >
              <MapPin size={18} className="text-[#B8973A] flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#1A1208]">
                  王小美 &nbsp; 138 0000 0000
                </p>
                <p className="text-xs text-[#8C7B6B] mt-0.5 truncate">
                  上海市静安区南京西路 1111 号问兰大厦 101 室
                </p>
              </div>
              <ChevronRight size={16} className="text-[#C0B0A0] flex-shrink-0" />
            </Link>

            {/* 全选 */}
            <div className="flex items-center gap-3 py-1 px-1">
              <button
                onClick={() => setSelectAll(!selectAll)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                  selectAll ? "bg-[#1A1208] border-[#1A1208]" : "border-[#D5C9BC]"
                }`}
              >
                {selectAll && <span className="text-white text-[10px] leading-none">✓</span>}
              </button>
              <span className="text-sm text-[#3D2B1A] font-medium">全选</span>
              <span className="text-xs text-[#8C7B6B] ml-auto">{items.length} 件商品</span>
            </div>

            {/* 商品列表 */}
            <div className="space-y-3">
              {items.map((item) => {
                const k = itemKey(item.product.id, item.spec);
                const isSelected = selectedIds.has(k);
                return (
                  <div key={k} className="bg-white rounded-2xl p-4 flex gap-3">
                    <button
                      onClick={() => toggleSelect(item.product.id, item.spec)}
                      className={`mt-auto mb-auto w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? "bg-[#1A1208] border-[#1A1208]" : "border-[#D5C9BC]"
                      }`}
                    >
                      {isSelected && (
                        <span className="text-white text-[10px] leading-none">✓</span>
                      )}
                    </button>

                    <Link
                      href={`/products/${item.product.id}`}
                      className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#F5EFE8] flex-shrink-0"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </Link>

                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <Link href={`/products/${item.product.id}`}>
                          <h3 className="text-sm font-semibold text-[#1A1208] leading-tight line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-[11px] text-[#8C7B6B] mt-0.5">{item.product.subtitle}</p>
                        <span className="text-[10px] text-[#B8973A] bg-[#F0E6C8] px-1.5 py-0.5 rounded-full mt-1 inline-block">
                          {item.spec}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <span className="text-base font-bold text-[#1A1208]">
                            ¥{item.product.price}
                          </span>
                          {item.product.originalPrice && (
                            <span className="text-xs text-[#8C7B6B] line-through ml-1">
                              ¥{item.product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeItem(item.product.id, item.spec)}
                            className="text-[#D5C9BC] mr-1"
                            aria-label="删除"
                          >
                            <Trash2 size={14} />
                          </button>
                          <button
                            onClick={() => updateQty(item.product.id, item.spec, item.qty - 1)}
                            className="w-7 h-7 rounded-full border border-[#E8DDD0] flex items-center justify-center text-[#1A1208]"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-semibold text-[#1A1208] w-5 text-center">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.product.id, item.spec, item.qty + 1)}
                            className="w-7 h-7 rounded-full bg-[#1A1208] flex items-center justify-center text-white"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 运费提示 */}
            {subtotal > 0 && subtotal < 299 && (
              <div className="bg-[#F0E6C8] rounded-xl px-4 py-2.5 flex items-center justify-between">
                <p className="text-xs text-[#B8973A]">
                  再购 <span className="font-bold">¥{(299 - subtotal).toFixed(0)}</span> 即可免运费
                </p>
                <div className="flex-1 mx-3 h-1 bg-white/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#B8973A] rounded-full transition-all"
                    style={{ width: `${Math.min((subtotal / 299) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            {subtotal >= 299 && (
              <div className="bg-[#F0E6C8] rounded-xl px-4 py-2.5">
                <p className="text-xs text-[#B8973A] font-medium">已享顺丰免费配送</p>
              </div>
            )}

            {/* 优惠券 */}
            <button
              onClick={() => setShowCouponSheet(true)}
              className="w-full bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3"
            >
              <Tag size={16} className="text-[#B8973A] flex-shrink-0" />
              <span className="flex-1 text-sm text-left text-[#1A1208]">
                {couponLabel || "优惠券 / 优惠码"}
              </span>
              {appliedDiscount > 0 ? (
                <span className="text-sm font-semibold text-[#B8973A]">-¥{appliedDiscount}</span>
              ) : (
                <span className="text-xs text-[#8C7B6B]">3张可用</span>
              )}
              <ChevronRight size={15} className="text-[#C0B0A0] flex-shrink-0" />
            </button>

            {/* 价格明细 */}
            <div className="bg-white rounded-2xl px-4 py-4 space-y-3">
              <h3 className="text-sm font-bold text-[#1A1208]">价格明细</h3>
              <div className="space-y-2">
                {[
                  { label: `商品小计（${totalQty} 件）`, value: `¥${subtotal.toFixed(2)}`, highlight: false },
                  { label: "运费", value: shipping === 0 ? "免运费" : `¥${shipping}`, highlight: false },
                  ...(appliedDiscount > 0
                    ? [{ label: couponLabel || "优惠券", value: `-¥${appliedDiscount}`, highlight: true }]
                    : []),
                ].map(({ label, value, highlight }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-[#8C7B6B]">{label}</span>
                    <span className={`font-medium ${highlight ? "text-[#B8973A]" : "text-[#1A1208]"}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="gold-divider" />
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#1A1208]">合计</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-[#1A1208]">
                    ¥{finalTotal.toFixed(2)}
                  </span>
                  {appliedDiscount > 0 && (
                    <p className="text-[10px] text-[#B8973A]">已省 ¥{appliedDiscount}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 猜你喜欢 */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#F9F5F0]">
                <h3 className="text-sm font-bold text-[#1A1208]">猜你喜欢</h3>
                <Link href="/products" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
                  更多 <ChevronRight size={13} />
                </Link>
              </div>
              <div className="p-3 flex gap-3 overflow-x-auto scrollbar-hide">
                {recommendProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`} className="flex-shrink-0 w-28">
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-[#F5EFE8]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-3"
                      />
                    </div>
                    <p className="text-xs font-semibold text-[#1A1208] mt-1.5 line-clamp-1">
                      {product.name}
                    </p>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs font-bold text-[#1A1208]">¥{product.price}</span>
                      <div className="flex items-center gap-0.5">
                        <Star size={9} fill="#B8973A" stroke="none" />
                        <span className="text-[10px] text-[#8C7B6B]">{product.rating}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pb-2" />
          </>
        )}
      </div>

      {/* 底部结算栏 */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#E8DDD0] px-5 py-3 z-50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectAll(!selectAll)}
              className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                selectAll ? "bg-[#1A1208] border-[#1A1208]" : "border-[#D5C9BC]"
              }`}
            >
              {selectAll && <span className="text-white text-[10px] leading-none">✓</span>}
            </button>
            <span className="text-xs text-[#8C7B6B]">全选</span>
            <div className="flex-1" />
            <div className="text-right mr-2">
              <span className="text-xs text-[#8C7B6B]">合计</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-[#1A1208]">¥{finalTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => someSelected && router.push("/checkout")}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all flex-shrink-0 ${
                someSelected ? "bg-[#1A1208] text-white" : "bg-[#E8DDD0] text-[#8C7B6B]"
              }`}
              disabled={!someSelected}
            >
              结算{someSelected ? `（${totalQty}）` : ""}
            </button>
          </div>
        </div>
      )}

      {/* 优惠券弹窗 */}
      {showCouponSheet && (
        <div
          className="fixed inset-0 z-[60] flex items-end"
          style={{ left: "50%", transform: "translateX(-50%)", maxWidth: 390, width: "100%" }}
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCouponSheet(false)} />
          <div className="relative w-full bg-white rounded-t-[24px] px-5 pt-5 pb-8 z-10">
            <h2 className="text-base font-bold text-[#1A1208] mb-4">优惠券 / 优惠码</h2>

            {/* 输入优惠码 */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                placeholder="输入优惠码（如 CLOUD50）"
                className="flex-1 border border-[#E8DDD0] rounded-full px-4 py-2.5 text-sm text-[#1A1208] outline-none focus:border-[#B8973A] transition-colors"
              />
              <button
                onClick={() => applyCoupon(couponInput)}
                className="bg-[#1A1208] text-white text-sm font-semibold px-5 py-2.5 rounded-full flex-shrink-0"
              >
                使用
              </button>
            </div>
            {couponError && (
              <p className="text-xs text-red-400 mb-3 px-1">{couponError}</p>
            )}

            {/* 可用优惠券列表 */}
            <p className="text-xs font-semibold text-[#8C7B6B] mb-2">可用优惠券</p>
            <div className="space-y-2">
              {coupons.map((c) => {
                const canUse = subtotal >= c.min;
                return (
                  <button
                    key={c.code}
                    disabled={!canUse}
                    onClick={() => applyCoupon(c.code)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      canUse
                        ? "border-[#E8DDD0] active:bg-[#F5EFE8]"
                        : "border-[#F0E8DC] opacity-50"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#F0E6C8] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#B8973A] font-bold text-sm">-¥{c.discount}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1208]">{c.label}</p>
                      <p className="text-[10px] text-[#8C7B6B] mt-0.5">满 ¥{c.min} 可用</p>
                    </div>
                    <ChevronRight size={14} className="text-[#C0B0A0] ml-auto" />
                  </button>
                );
              })}
            </div>

            {appliedDiscount > 0 && (
              <button
                onClick={clearCoupon}
                className="w-full mt-4 py-3 rounded-full border border-[#E8DDD0] text-sm text-[#8C7B6B]"
              >
                取消使用优惠券
              </button>
            )}
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
