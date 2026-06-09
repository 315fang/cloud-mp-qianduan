"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, ChevronRight, Tag, Check, ShoppingBag } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, selectedIds, total, clearSelected } = useCart();
  const [payMethod, setPayMethod] = useState<"wechat" | "alipay" | "card">("wechat");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const itemKey = (id: string, spec: string) => `${id}-${spec}`;
  const selectedItems = items.filter((i) => selectedIds.has(itemKey(i.product.id, i.spec)));
  const totalQty = selectedItems.reduce((s, i) => s + i.qty, 0);
  const shipping = total >= 299 ? 0 : 12;
  const finalTotal = total + shipping;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearSelected();
    setTimeout(() => {
      router.push("/orders");
    }, 1800);
  };

  if (orderPlaced) {
    return (
      <PhoneFrame hideNav>
        <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-[#4A7C59] flex items-center justify-center mb-5 shadow-lg">
            <Check size={36} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-bold text-[#1A1208]">下单成功！</h1>
          <p className="text-sm text-[#8C7B6B] mt-2">正在跳转到我的订单...</p>
        </div>
      </PhoneFrame>
    );
  }

  if (selectedItems.length === 0) {
    return (
      <PhoneFrame hideNav>
        <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
          <ShoppingBag size={48} strokeWidth={1} className="mb-4 text-[#E8DDD0]" />
          <p className="text-sm text-[#3D2B1A] font-medium">没有待结算的商品</p>
          <Link href="/cart" className="mt-4 text-[#B8973A] text-sm">返回购物车</Link>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame hideNav>
      {/* 顶栏 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]"
        >
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </button>
        <h1 className="text-base font-bold text-[#1A1208]">确认订单</h1>
        <div className="w-8" />
      </header>

      <div className="px-4 pb-32 space-y-3">
        {/* 收货地址 */}
        <Link
          href="/profile/address"
          className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4"
        >
          <div className="w-10 h-10 rounded-full bg-[#F5EFE8] flex items-center justify-center flex-shrink-0">
            <MapPin size={18} className="text-[#B8973A]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#1A1208]">
              李静茵 &nbsp; 158 2288 8888
            </p>
            <p className="text-xs text-[#8C7B6B] mt-0.5">
              上海市静安区南京西路 1111 号问兰大厦 101 室
            </p>
          </div>
          <ChevronRight size={16} className="text-[#C0B0A0]" />
        </Link>

        {/* 商品清单 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F9F5F0]">
            <span className="text-sm font-bold text-[#1A1208]">商品清单</span>
            <span className="text-xs text-[#8C7B6B]">共 {totalQty} 件</span>
          </div>
          <div className="px-4 py-3 space-y-3">
            {selectedItems.map((item) => (
              <div key={`${item.product.id}-${item.spec}`} className="flex gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F5EFE8] flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-contain p-1.5"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1A1208] line-clamp-1">{item.product.name}</p>
                  <p className="text-[11px] text-[#8C7B6B] mt-0.5">{item.spec}</p>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-sm font-bold text-[#1A1208]">¥{item.product.price}</span>
                    <span className="text-xs text-[#8C7B6B]">x{item.qty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 配送方式 */}
        <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#1A1208]">配送方式</span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-[#8C7B6B]">
              顺丰快递 · {shipping === 0 ? "免运费" : `¥${shipping}`}
            </span>
            <ChevronRight size={14} className="text-[#C0B0A0]" />
          </div>
        </div>

        {/* 优惠券 */}
        <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3">
          <Tag size={16} className="text-[#B8973A] flex-shrink-0" />
          <span className="flex-1 text-sm text-[#1A1208]">优惠券 / 优惠码</span>
          <span className="text-xs text-[#8C7B6B]">暂无可用</span>
          <ChevronRight size={14} className="text-[#C0B0A0]" />
        </div>

        {/* 支付方式 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <p className="text-sm font-bold text-[#1A1208] px-4 py-3 border-b border-[#F9F5F0]">
            支付方式
          </p>
          {[
            { key: "wechat" as const, label: "微信支付", desc: "推荐" },
            { key: "alipay" as const, label: "支付宝", desc: "" },
            { key: "card" as const, label: "银行卡", desc: "" },
          ].map(({ key, label, desc }, idx, arr) => (
            <button
              key={key}
              onClick={() => setPayMethod(key)}
              className={`w-full flex items-center px-4 py-3.5 transition-colors ${
                idx < arr.length - 1 ? "border-b border-[#F9F5F0]" : ""
              } ${payMethod === key ? "bg-[#FAF7F4]" : ""}`}
            >
              <span className="flex-1 text-sm text-[#1A1208] text-left">{label}</span>
              {desc && (
                <span className="text-[10px] text-[#B8973A] bg-[#F0E6C8] px-1.5 py-0.5 rounded-full mr-3">
                  {desc}
                </span>
              )}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  payMethod === key ? "bg-[#1A1208] border-[#1A1208]" : "border-[#D5C9BC]"
                }`}
              >
                {payMethod === key && <span className="text-white text-[10px] leading-none">✓</span>}
              </div>
            </button>
          ))}
        </div>

        {/* 价格汇总 */}
        <div className="bg-white rounded-2xl px-4 py-4 space-y-2">
          {[
            { label: `商品小计（${totalQty}件）`, value: `¥${total.toFixed(2)}` },
            { label: "运费", value: shipping === 0 ? "免运费" : `¥${shipping}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-[#8C7B6B]">{label}</span>
              <span className="text-[#1A1208] font-medium">{value}</span>
            </div>
          ))}
          <div className="gold-divider" />
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-bold text-[#1A1208]">实付款</span>
            <span className="text-xl font-bold text-[#1A1208]">¥{finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* 备注 */}
        <div className="bg-white rounded-2xl px-4 py-3.5">
          <p className="text-sm font-semibold text-[#1A1208] mb-2">订单备注</p>
          <textarea
            placeholder="如有特殊要求可在此备注..."
            rows={2}
            className="w-full text-sm text-[#1A1208] bg-[#F5EFE8] rounded-xl px-3 py-2.5 outline-none resize-none placeholder:text-[#C0B0A0]"
          />
        </div>
      </div>

      {/* 底部提交按钮 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#E8DDD0] px-5 py-3 z-50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#8C7B6B]">实付款</span>
          <span className="text-xl font-bold text-[#1A1208]">¥{finalTotal.toFixed(2)}</span>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-[#1A1208] text-white text-sm font-bold py-4 rounded-full"
        >
          提交订单
        </button>
      </div>
    </PhoneFrame>
  );
}
