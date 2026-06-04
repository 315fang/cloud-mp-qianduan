"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  Plus,
  Minus,
  ShoppingBag,
  ChevronRight,
  Check,
  Truck,
  AlertCircle,
  Search,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

type CartEntry = { quantity: number; price: number };

// 经销商采购价（约为零售价的 6 折）
const wholesalePrices: Record<string, number> = {
  "1": 359,
  "2": 257,
  "3": 221,
  "4": 119,
  "5": 281,
  "6": 143,
};

// 最低起订量
const minOrders: Record<string, number> = {
  "1": 3,
  "2": 3,
  "3": 5,
  "4": 10,
  "5": 3,
  "6": 5,
};

export default function RestockPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filteredProducts = products.filter((p) =>
    query.trim() ? p.name.includes(query.trim()) || p.subtitle.includes(query.trim()) : true
  );

  const setQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } else {
      setCart((prev) => ({
        ...prev,
        [id]: { quantity: qty, price: wholesalePrices[id] || 0 },
      }));
    }
  };

  const totalItems = Object.values(cart).reduce((s, v) => s + v.quantity, 0);
  const totalPrice = Object.entries(cart).reduce(
    (s, [, v]) => s + v.quantity * v.price,
    0
  );

  const handleSubmit = () => {
    if (totalItems === 0) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCart({});
    }, 2000);
  };

  return (
    <PhoneFrame hideNav>
      {/* 顶部 */}
      <div className="bg-[#1A1208] px-4 pt-4 pb-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10"
            aria-label="返回"
          >
            <ArrowLeft size={17} className="text-white" />
          </button>
          <span className="text-sm font-bold text-white">采购入仓</span>
          <Link
            href="/distributor/stock-logs"
            className="text-xs text-[#B8973A] font-medium flex items-center gap-1"
          >
            库存 <ChevronRight size={13} />
          </Link>
        </div>

        {/* 搜索栏 */}
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2.5">
          <Search size={14} className="text-white/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索采购商品..."
            className="flex-1 text-[13px] text-white bg-transparent outline-none placeholder:text-white/40"
          />
        </div>
      </div>

      {/* 提示横幅 */}
      <div className="bg-[#FBF5E6] px-4 py-2.5 flex items-center gap-2">
        <AlertCircle size={13} className="text-[#B8973A] flex-shrink-0" />
        <p className="text-[10px] text-[#8C7B6B]">
          经销商专属采购价 · 满足最低起订量后下单 · 预计 3-5 个工作日发货入仓
        </p>
      </div>

      {/* 商品列表 */}
      <div className="flex-1 overflow-y-auto bg-[#FAF7F4] px-4 py-3 space-y-3 pb-28">
        {filteredProducts.map((product) => {
          const qty = cart[product.id]?.quantity || 0;
          const wholesale = wholesalePrices[product.id] || 0;
          const minQty = minOrders[product.id] || 1;
          const saving = product.price - wholesale;

          return (
            <div key={product.id} className="bg-white rounded-2xl p-4 flex gap-3">
              <div className="relative w-20 h-20 bg-[#F5EFE8] rounded-xl flex-shrink-0 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1A1208] line-clamp-1">{product.name}</p>
                <p className="text-[10px] text-[#8C7B6B] mt-0.5 line-clamp-1">{product.subtitle}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-bold text-[#B8973A]">采购价 ¥{wholesale}</span>
                  <span className="text-[10px] text-[#8C7B6B] line-through">零售 ¥{product.price}</span>
                </div>
                <p className="text-[10px] text-[#2D8C5E] font-medium">省 ¥{saving} · 起订量 {minQty} 件</p>
                {/* 数量调节 */}
                <div className="flex items-center gap-3 mt-2.5">
                  {qty === 0 ? (
                    <button
                      onClick={() => setQty(product.id, minQty)}
                      className="flex items-center gap-1.5 bg-[#1A1208] text-white text-xs font-medium px-4 py-1.5 rounded-full"
                    >
                      <Plus size={12} />
                      加入采购
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQty(product.id, Math.max(0, qty - 1))}
                        className="w-7 h-7 rounded-full border border-[#E8DDD0] flex items-center justify-center"
                        aria-label="减少"
                      >
                        <Minus size={13} className="text-[#3D2B1A]" />
                      </button>
                      <span className="text-sm font-bold text-[#1A1208] min-w-[24px] text-center tabular-nums">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty(product.id, qty + 1)}
                        className="w-7 h-7 rounded-full bg-[#1A1208] flex items-center justify-center"
                        aria-label="增加"
                      >
                        <Plus size={13} className="text-white" />
                      </button>
                      <span className="text-[10px] text-[#8C7B6B]">
                        小计 ¥{(qty * wholesale).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {qty > 0 && qty < minQty && (
                    <span className="text-[10px] text-[#B85A2A]">不足起订量</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部结算栏 */}
      {totalItems > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E8DDD0] px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag size={16} className="text-[#B8973A]" />
              <span className="text-sm font-medium text-[#1A1208]">
                已选 {totalItems} 件
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#8C7B6B]">采购总额 </span>
              <span className="text-base font-bold text-[#B8973A]">¥{totalPrice.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className={`w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all ${
              submitted ? "bg-[#2D8C5E]" : "bg-[#1A1208]"
            }`}
          >
            {submitted ? (
              <span className="flex items-center justify-center gap-2">
                <Check size={16} />
                采购单已提交
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Truck size={16} />
                提交采购单
              </span>
            )}
          </button>
        </div>
      )}

      {/* 成功提示 */}
      {submitted && (
        <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(26,18,8,0.4)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-3xl px-8 py-8 mx-6 text-center shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-[#2D8C5E]" />
            </div>
            <p className="text-base font-bold text-[#1A1208]">采购单已提交！</p>
            <p className="text-xs text-[#8C7B6B] mt-2 leading-relaxed">
              我们将在 1 个工作日内审核<br />通过后安排发货，请留意通知
            </p>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
