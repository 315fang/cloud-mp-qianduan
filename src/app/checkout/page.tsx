"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, MapPin, ChevronRight, Tag, Check, ShoppingBag, Truck, Store, Phone, Clock, Sparkles } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import PhoneFrame from "@/components/PhoneFrame";
import { useCart } from "@/context/CartContext";
import { pickupStores, stockMeta } from "@/lib/pickup-stores";

function CheckoutInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { items, selectedIds, total, clearSelected } = useCart();
  const [payMethod, setPayMethod] = useState<"wechat" | "alipay" | "card">("wechat");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // 配送方式：快递 / 门店自提
  const delivery: "express" | "pickup" = params.get("delivery") === "pickup" ? "pickup" : "express";
  const selectedStore = pickupStores.find((s) => s.id === params.get("store")) || null;

  const setDelivery = (mode: "express" | "pickup") => {
    const q = new URLSearchParams(Array.from(params.entries()));
    q.set("delivery", mode);
    if (mode === "express") q.delete("store");
    router.replace(`/checkout?${q.toString()}`);
  };

  const itemKey = (id: string, spec: string) => `${id}-${spec}`;
  const selectedItems = items.filter((i) => selectedIds.has(itemKey(i.product.id, i.spec)));
  const totalQty = selectedItems.reduce((s, i) => s + i.qty, 0);
  const shipping = delivery === "pickup" ? 0 : total >= 299 ? 0 : 12;
  const finalTotal = total + shipping;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearSelected();
  };

  if (orderPlaced) {
    return (
      <PhoneFrame hideNav>
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center">
          {/* 成功打勾：弹跳入场 + 金辉脉冲 */}
          <div className="w-20 h-20 rounded-full bg-[#4A7C59] flex items-center justify-center mb-5 shadow-lg animate-pop animate-glow-pulse">
            <Check size={36} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-bold text-[#1A1208] animate-pop">下单成功</h1>
          <p className="text-sm text-[#8C7B6B] mt-2 animate-pop">感谢您的信任，问兰已开始为您备货</p>

          {/* 专属顾问服务二维码：稍后浮现 */}
          <div className="mt-7 w-full max-w-[280px] bg-white rounded-2xl p-5 shadow-sm animate-pop animate-pop-delay">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Sparkles size={13} className="text-[#B8973A]" />
              <p className="text-sm font-bold text-[#1A1208]">专属肌肤顾问</p>
            </div>
            <p className="text-[11px] text-[#8C7B6B] leading-relaxed">
              扫码添加您的专属顾问<br />享一对一护肤指导与售后服务
            </p>
            <div className="flex justify-center mt-4">
              <div className="p-3 bg-white rounded-xl border border-[#F0E8DC]">
                <QRCodeSVG
                  value="https://wenlan.beauty/advisor?from=order"
                  size={132}
                  fgColor="#1A1208"
                  bgColor="#FFFFFF"
                  level="M"
                />
              </div>
            </div>
            <p className="text-[10px] text-[#B0A18C] mt-3 tracking-wide">问兰 · 先修墙 再蓄水 后抗老</p>
          </div>

          <div className="flex gap-3 mt-7 w-full max-w-[280px] animate-pop animate-pop-delay">
            <Link
              href="/orders"
              className="flex-1 text-sm font-bold py-3 rounded-full bg-[#1A1208] text-white press-scale"
            >
              查看订单
            </Link>
            <Link
              href="/"
              className="flex-1 text-sm font-medium py-3 rounded-full bg-[#F5EFE8] text-[#1A1208] press-scale"
            >
              返回首页
            </Link>
          </div>
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
          <Link href="/cart" className="mt-4 text-[#B8973A] text-sm">返回购物袋</Link>
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
        {/* 配送方式切换 */}
        <div className="bg-white rounded-2xl p-1.5 flex gap-1.5">
          {[
            { key: "express" as const, label: "快递配送", icon: Truck },
            { key: "pickup" as const, label: "门店自提", icon: Store },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setDelivery(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                delivery === key ? "bg-[#1A1208] text-white" : "text-[#8C7B6B]"
              }`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* 收货地址 / 自提门店 */}
        {delivery === "express" ? (
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
        ) : selectedStore ? (
          <Link
            href={`/checkout/store?store=${selectedStore.id}`}
            className="block bg-white rounded-2xl px-4 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5EFE8] flex items-center justify-center flex-shrink-0">
                <Store size={18} className="text-[#B8973A]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#1A1208] truncate">{selectedStore.name}</p>
                  <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: stockMeta[selectedStore.stock].color, backgroundColor: stockMeta[selectedStore.stock].bg }}>
                    {stockMeta[selectedStore.stock].label}
                  </span>
                </div>
                <p className="text-xs text-[#8C7B6B] mt-0.5 line-clamp-1">{selectedStore.address}</p>
              </div>
              <ChevronRight size={16} className="text-[#C0B0A0]" />
            </div>
            <div className="flex items-center gap-4 mt-2.5 pt-2.5 border-t border-[#F5EFE8] text-[11px] text-[#8C7B6B]">
              <span className="flex items-center gap-1"><Phone size={12} className="text-[#B8973A]" /> {selectedStore.phone}</span>
              <span className="flex items-center gap-1"><Clock size={12} className="text-[#B8973A]" /> {selectedStore.hours}</span>
            </div>
          </Link>
        ) : (
          <Link
            href="/checkout/store"
            className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 border border-dashed border-[#D6C4A0]"
          >
            <div className="w-10 h-10 rounded-full bg-[#F5EFE8] flex items-center justify-center flex-shrink-0">
              <Store size={18} className="text-[#B8973A]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#1A1208]">请选择自提门店</p>
              <p className="text-xs text-[#8C7B6B] mt-0.5">选择就近门店到店自提，免运费</p>
            </div>
            <ChevronRight size={16} className="text-[#C0B0A0]" />
          </Link>
        )}

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

        {/* 配送费用 */}
        <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#1A1208]">{delivery === "pickup" ? "自提服务" : "配送方式"}</span>
          <span className="text-sm text-[#8C7B6B]">
            {delivery === "pickup"
              ? "到店自提 · 免运费"
              : `顺丰快递 · ${shipping === 0 ? "免运费" : `¥${shipping}`}`}
          </span>
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
          disabled={delivery === "pickup" && !selectedStore}
          className={`w-full text-sm font-bold py-4 rounded-full ${
            delivery === "pickup" && !selectedStore
              ? "bg-[#EDE4D6] text-[#B0A18C]"
              : "bg-[#1A1208] text-white"
          }`}
        >
          {delivery === "pickup" && !selectedStore ? "请先选择自提门店" : "提交订单"}
        </button>
      </div>
    </PhoneFrame>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutInner />
    </Suspense>
  );
}
