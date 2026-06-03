"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  ShoppingBag,
  ChevronRight,
  Shield,
  Truck,
  RotateCcw,
  Minus,
  Plus,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

const reviews = [
  {
    id: 1,
    name: "小晴",
    avatar: "晴",
    rating: 5,
    date: "2024-11-28",
    content: "真的太好用了！用了一周皮肤就感觉水润很多，精华液很轻薄不油腻，早晚都在用，强烈推荐！",
    tags: ["持久保湿", "质地轻薄"],
  },
  {
    id: 2,
    name: "Grace L.",
    avatar: "G",
    rating: 5,
    date: "2024-11-20",
    content: "包装很精美，送礼自用都合适。味道很淡雅，涂上去吸收特别快，第二天早上皮肤明显更透亮。",
    tags: ["吸收好", "气味好闻"],
  },
];

type Params = { id: string };

export default function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const [liked, setLiked] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"detail" | "specs" | "review">("detail");

  const related = products.filter((p) => p.id !== id && p.category === product?.category).slice(0, 4);

  if (!product) {
    return (
      <PhoneFrame>
        <div className="flex flex-col items-center justify-center h-64 text-[#8C7B6B]">
          <p>商品不存在</p>
          <Link href="/products" className="mt-3 text-[#B8973A] text-sm">返回列表</Link>
        </div>
      </PhoneFrame>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 10) * 10
    : null;

  return (
    <PhoneFrame hideNav>
      {/* 悬浮顶栏 */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-4 pb-2">
        <Link
          href="/products"
          className="w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
        >
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </Link>
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
            aria-label="分享"
          >
            <Share2 size={16} className="text-[#1A1208]" />
          </button>
          <button
            className="w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
            onClick={() => setLiked(!liked)}
            aria-label="收藏"
          >
            <Heart
              size={16}
              className={liked ? "text-red-400 fill-red-400" : "text-[#1A1208]"}
            />
          </button>
        </div>
      </div>

      {/* 商品主图 */}
      <div className="relative w-full aspect-square bg-[#F5EFE8]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-10"
          priority
        />
        {discount && (
          <div className="absolute bottom-4 right-4 bg-[#B8973A] text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{discount}%
          </div>
        )}
      </div>

      {/* 商品信息卡 */}
      <div className="bg-white rounded-t-[24px] -mt-4 relative z-10 px-5 pt-5">
        {/* 标签 */}
        <div className="flex gap-1.5 mb-2">
          {product.tags.map((tag) => (
            <span key={tag} className="text-[10px] text-[#B8973A] bg-[#F0E6C8] px-2 py-0.5 rounded-full font-medium">
              {tag}
            </span>
          ))}
          {product.isNew && (
            <span className="text-[10px] text-white bg-[#1A1208] px-2 py-0.5 rounded-full font-medium">NEW</span>
          )}
        </div>

        <h1 className="text-xl font-bold text-[#1A1208] leading-snug">{product.name}</h1>
        <p className="text-sm text-[#8C7B6B] mt-0.5">{product.subtitle}</p>

        {/* 价格与评分 */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1A1208]">¥{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-[#8C7B6B] line-through">¥{product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 bg-[#F5EFE8] rounded-full px-3 py-1.5">
            <Star size={12} fill="#B8973A" stroke="none" />
            <span className="text-sm font-semibold text-[#1A1208]">{product.rating}</span>
            <span className="text-xs text-[#8C7B6B]">({product.reviewCount})</span>
          </div>
        </div>

        {/* 服务保障 */}
        <div className="flex items-center gap-4 mt-4 py-3 border-t border-b border-[#E8DDD0]">
          {[
            { icon: Shield, text: "正品保障" },
            { icon: Truck, text: "顺丰包邮" },
            { icon: RotateCcw, text: "7天退换" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1 text-[#8C7B6B]">
              <Icon size={12} />
              <span className="text-[11px]">{text}</span>
            </div>
          ))}
        </div>

        {/* 规格选择 */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#1A1208]">规格</span>
            <button className="flex items-center gap-0.5 text-[12px] text-[#8C7B6B]">
              已选规格 <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            {product.specs.slice(0, 2).map((spec) => (
              <button
                key={spec.label}
                className="text-[12px] bg-[#F0E6C8] text-[#B8973A] px-3 py-1.5 rounded-full font-medium"
              >
                {spec.value}
              </button>
            ))}
          </div>
        </div>

        {/* 数量选择 */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm font-semibold text-[#1A1208]">数量</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-8 h-8 rounded-full border border-[#E8DDD0] flex items-center justify-center text-[#1A1208] active:bg-[#F5EFE8]"
            >
              <Minus size={14} />
            </button>
            <span className="text-base font-semibold text-[#1A1208] w-6 text-center">{qty}</span>
            <button
              onClick={() => setQty(Math.min(product.stock, qty + 1))}
              className="w-8 h-8 rounded-full bg-[#1A1208] flex items-center justify-center text-white active:bg-[#3D2B1A]"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* 详情/规格/评价标签 */}
        <div className="flex gap-0 mt-5 border-b border-[#E8DDD0]">
          {(["detail", "specs", "review"] as const).map((tab) => {
            const labels = { detail: "商品详情", specs: "规格参数", review: "用户评价" };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-[13px] py-2.5 font-medium border-b-2 transition-all ${
                  activeTab === tab
                    ? "border-[#B8973A] text-[#B8973A]"
                    : "border-transparent text-[#8C7B6B]"
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        {/* 标签内容 */}
        <div className="py-4">
          {activeTab === "detail" && (
            <p className="text-sm text-[#3D2B1A] leading-relaxed">{product.description}</p>
          )}
          {activeTab === "specs" && (
            <div className="space-y-2">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between py-2 border-b border-[#F0E8DC]">
                  <span className="text-sm text-[#8C7B6B]">{spec.label}</span>
                  <span className="text-sm text-[#1A1208] font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "review" && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-[#FAF7F4] rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-[#F0E6C8] flex items-center justify-center text-[#B8973A] font-bold text-sm">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1A1208]">{review.name}</p>
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={10} fill="#B8973A" stroke="none" />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-[#8C7B6B]">{review.date}</span>
                  </div>
                  <p className="text-sm text-[#3D2B1A] leading-relaxed">{review.content}</p>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {review.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-[#B8973A] bg-[#F0E6C8] px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 相关推荐 */}
        {related.length > 0 && (
          <div className="mt-2">
            <h3 className="text-sm font-bold text-[#1A1208] mb-3">相关推荐</h3>
            <div className="grid grid-cols-2 gap-3 pb-32">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} layout="grid" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 底部购买栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#E8DDD0] px-5 py-3 z-50">
        <div className="flex gap-3">
          <Link
            href="/cart"
            className="flex-1 flex items-center justify-center gap-2 border border-[#1A1208] text-[#1A1208] text-sm font-semibold py-3 rounded-full"
          >
            <ShoppingBag size={16} />
            加入购物车
          </Link>
          <button className="flex-1 bg-[#1A1208] text-white text-sm font-semibold py-3 rounded-full">
            立即购买
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
