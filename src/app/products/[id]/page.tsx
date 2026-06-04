"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  MessageSquare,
  Leaf,
  Beaker,
  ThumbsUp,
  Check,
  X,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { useCart } from "@/context/CartContext";

const reviews = [
  {
    id: 1,
    name: "小晴",
    avatar: "晴",
    rating: 5,
    date: "2024-11-28",
    content: "真的太好用了！用了一周皮肤就感觉水润很多，精华液很轻薄不油腻，早晚都在用，强烈推荐！",
    tags: ["持久保湿", "质地轻薄"],
    helpful: 42,
  },
  {
    id: 2,
    name: "Grace L.",
    avatar: "G",
    rating: 5,
    date: "2024-11-20",
    content: "包装很精美，送礼自用都合适。味道很淡雅，涂上去吸收特别快，第二天早上皮肤明显更透亮。",
    tags: ["吸收好", "气味好闻"],
    helpful: 31,
  },
  {
    id: 3,
    name: "Lily W.",
    avatar: "L",
    rating: 4,
    date: "2024-11-12",
    content: "整体还不错，保湿效果很好，就是容量有点小，价格稍微贵一点。下次试试套装版本。",
    tags: ["性价比", "保湿效果"],
    helpful: 18,
  },
];

const ingredients = [
  { name: "玻尿酸复合体", desc: "三重分子量，深层锁水补湿" },
  { name: "黄金因子", desc: "活化细胞，促进胶原蛋白生成" },
  { name: "烟酰胺", desc: "提亮肤色，淡化色斑" },
  { name: "神经酰胺", desc: "修护肌肤屏障，抵御外界刺激" },
];

type Params = { id: string };

export default function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = use(params);
  const router = useRouter();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();

  const [liked, setLiked] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedSpec, setSelectedSpec] = useState(
    product?.specs[0]?.value ?? ""
  );
  const [activeTab, setActiveTab] = useState<"detail" | "specs" | "review">("detail");
  const [helpfulIds, setHelpfulIds] = useState<number[]>([]);
  const [bottomSheet, setBottomSheet] = useState<"cart" | "buy" | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const related = products
    .filter((p) => p.id !== id && p.category === product?.category)
    .slice(0, 4);

  if (!product) {
    return (
      <PhoneFrame>
        <div className="flex flex-col items-center justify-center h-64 text-[#8C7B6B]">
          <p>商品不存在</p>
          <Link href="/products" className="mt-3 text-[#B8973A] text-sm">
            返回列表
          </Link>
        </div>
      </PhoneFrame>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 10) * 10
    : null;

  const avgRating = (
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  ).toFixed(1);

  const handleAddToCart = () => {
    addItem(product, qty, selectedSpec);
    setAddedToCart(true);
    setTimeout(() => {
      setBottomSheet(null);
      setAddedToCart(false);
    }, 800);
  };

  const handleBuyNow = () => {
    addItem(product, qty, selectedSpec);
    setBottomSheet(null);
    router.push("/cart");
  };

  const openSheet = (type: "cart" | "buy") => {
    setQty(1);
    setAddedToCart(false);
    setBottomSheet(type);
  };

  return (
    <PhoneFrame hideNav>
      {/* 悬浮顶栏 */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
          aria-label="返回"
        >
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </button>
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
            aria-label="分享"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.name, url: window.location.href });
              }
            }}
          >
            <Share2 size={16} className="text-[#1A1208]" />
          </button>
          <button
            className="w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
            onClick={() => setLiked(!liked)}
            aria-label={liked ? "取消收藏" : "收藏"}
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
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeImage
                  ? "w-5 h-1.5 bg-[#B8973A]"
                  : "w-1.5 h-1.5 bg-[#B8973A]/30"
              }`}
              aria-label={`查看第${i + 1}张图片`}
            />
          ))}
        </div>
      </div>

      {/* 商品信息卡 */}
      <div className="bg-white rounded-t-[24px] -mt-4 relative z-10 px-5 pt-5">
        {/* 标签 */}
        <div className="flex gap-1.5 mb-2 flex-wrap">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-[#B8973A] bg-[#F0E6C8] px-2 py-0.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
          {product.isNew && (
            <span className="text-[10px] text-white bg-[#1A1208] px-2 py-0.5 rounded-full font-medium">
              NEW
            </span>
          )}
          {product.isHot && (
            <span className="text-[10px] text-white bg-[#B8973A] px-2 py-0.5 rounded-full font-medium">
              HOT
            </span>
          )}
        </div>

        <h1 className="text-xl font-bold text-[#1A1208] leading-snug text-balance">
          {product.name}
        </h1>
        <p className="text-sm text-[#8C7B6B] mt-0.5">{product.subtitle}</p>

        {/* 价格与评分 */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1A1208]">¥{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-[#8C7B6B] line-through">
                ¥{product.originalPrice}
              </span>
            )}
            {discount && (
              <span className="text-xs text-white bg-[#B8973A] px-1.5 py-0.5 rounded font-medium">
                {discount}折
              </span>
            )}
          </div>
          <button
            className="flex items-center gap-1.5 bg-[#F5EFE8] rounded-full px-3 py-1.5"
            onClick={() => setActiveTab("review")}
          >
            <Star size={12} fill="#B8973A" stroke="none" />
            <span className="text-sm font-semibold text-[#1A1208]">{avgRating}</span>
            <span className="text-xs text-[#8C7B6B]">({product.reviewCount})</span>
          </button>
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
          <div className="ml-auto">
            <span className="text-[11px] text-[#8C7B6B]">发货：1-3天</span>
          </div>
        </div>

        {/* 规格选择 */}
        <div className="mt-4">
          <p className="text-sm font-semibold text-[#1A1208] mb-2">规格</p>
          <div className="flex gap-2 flex-wrap">
            {product.specs.map((spec) => (
              <button
                key={spec.label}
                onClick={() => setSelectedSpec(spec.value)}
                className={`text-[12px] px-4 py-2 rounded-full font-medium border transition-all ${
                  selectedSpec === spec.value
                    ? "bg-[#1A1208] text-white border-[#1A1208]"
                    : "bg-white text-[#3D2B1A] border-[#E8DDD0]"
                }`}
              >
                {spec.value}
              </button>
            ))}
          </div>
        </div>

        {/* 数量选择 */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-sm font-semibold text-[#1A1208]">数量</span>
            <span className="text-xs text-[#8C7B6B] ml-2">库存 {product.stock} 件</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-8 h-8 rounded-full border border-[#E8DDD0] flex items-center justify-center text-[#1A1208] active:bg-[#F5EFE8]"
            >
              <Minus size={14} />
            </button>
            <span className="text-base font-semibold text-[#1A1208] w-6 text-center">
              {qty}
            </span>
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
            const labels = {
              detail: "商品详情",
              specs: "规格参数",
              review: `评价(${reviews.length})`,
            };
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
            <div className="space-y-4">
              <p className="text-sm text-[#3D2B1A] leading-relaxed">
                {product.description}
              </p>
              <div className="bg-[#FAF7F4] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Beaker size={14} className="text-[#B8973A]" />
                  <p className="text-sm font-semibold text-[#1A1208]">使用步骤</p>
                </div>
                {[
                  "洁面后取适量精华",
                  "均匀点涂于全脸",
                  "轻拍至完全吸收",
                  "搭配面霜锁水效果更佳",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 mb-2">
                    <span className="w-5 h-5 rounded-full bg-[#F0E6C8] text-[#B8973A] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-[13px] text-[#3D2B1A]">{step}</p>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Leaf size={14} className="text-[#B8973A]" />
                  <p className="text-sm font-semibold text-[#1A1208]">核心成分</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {ingredients.map(({ name, desc }) => (
                    <div key={name} className="bg-[#FAF7F4] rounded-xl p-3">
                      <p className="text-xs font-semibold text-[#B8973A]">{name}</p>
                      <p className="text-[10px] text-[#8C7B6B] mt-0.5 leading-snug">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="space-y-0">
              {product.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex justify-between py-3 ${
                    i < product.specs.length - 1 ? "border-b border-[#F0E8DC]" : ""
                  }`}
                >
                  <span className="text-sm text-[#8C7B6B]">{spec.label}</span>
                  <span className="text-sm text-[#1A1208] font-medium">{spec.value}</span>
                </div>
              ))}
              <div className="mt-4 bg-[#FAF7F4] rounded-xl p-3">
                <p className="text-[11px] text-[#8C7B6B] leading-relaxed">
                  * 以上参数仅供参考，实际以产品包装标注为准。如有疑问请联系客服。
                </p>
              </div>
            </div>
          )}

          {activeTab === "review" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-[#FAF7F4] rounded-2xl p-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#1A1208]">{avgRating}</p>
                  <div className="flex gap-0.5 mt-1 justify-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        fill={i < Math.round(Number(avgRating)) ? "#B8973A" : "#E8DDD0"}
                        stroke="none"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-[#8C7B6B] mt-1">{product.reviewCount} 条评价</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length;
                    const pct = Math.round((count / reviews.length) * 100);
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-[10px] text-[#8C7B6B] w-3">{star}</span>
                        <div className="flex-1 h-1.5 bg-[#E8DDD0] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#B8973A] rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[#8C7B6B] w-6">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {reviews.map((review) => (
                <div key={review.id} className="bg-[#FAF7F4] rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-[#F0E6C8] flex items-center justify-center text-[#B8973A] font-bold text-sm flex-shrink-0">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1A1208]">{review.name}</p>
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            fill={i < review.rating ? "#B8973A" : "#E8DDD0"}
                            stroke="none"
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-[#8C7B6B]">{review.date}</span>
                  </div>
                  <p className="text-sm text-[#3D2B1A] leading-relaxed">{review.content}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-1.5 flex-wrap">
                      {review.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-[#B8973A] bg-[#F0E6C8] px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        setHelpfulIds((prev) =>
                          prev.includes(review.id)
                            ? prev.filter((i) => i !== review.id)
                            : [...prev, review.id]
                        )
                      }
                      className={`flex items-center gap-1 text-[10px] ${
                        helpfulIds.includes(review.id) ? "text-[#B8973A]" : "text-[#8C7B6B]"
                      }`}
                    >
                      <ThumbsUp
                        size={11}
                        fill={helpfulIds.includes(review.id) ? "#B8973A" : "none"}
                      />
                      有用({review.helpful + (helpfulIds.includes(review.id) ? 1 : 0)})
                    </button>
                  </div>
                </div>
              ))}

              <Link
                href={`/products/${id}/reviews`}
                className="w-full py-3 text-sm text-[#B8973A] border border-[#E8DDD0] rounded-full font-medium flex items-center justify-center gap-1"
              >
                查看全部 {product.reviewCount} 条评价
                <ChevronRight size={13} />
              </Link>
            </div>
          )}
        </div>

        {/* 相关推荐 */}
        {related.length > 0 && (
          <div className="mt-2 border-t border-[#E8DDD0] pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#1A1208]">相关推荐</h3>
              <Link
                href="/products"
                className="flex items-center gap-0.5 text-[12px] text-[#B8973A]"
              >
                更多 <ChevronRight size={13} />
              </Link>
            </div>
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
        <div className="flex items-center gap-3">
          <button
            className="flex flex-col items-center gap-0.5 text-[#8C7B6B]"
            aria-label="联系客服"
          >
            <MessageSquare size={18} strokeWidth={1.5} />
            <span className="text-[9px]">客服</span>
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className="flex flex-col items-center gap-0.5 text-[#8C7B6B]"
            aria-label={liked ? "取消收藏" : "收藏"}
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              className={liked ? "text-red-400 fill-red-400" : ""}
            />
            <span className="text-[9px]">{liked ? "已收藏" : "收藏"}</span>
          </button>
          <button
            onClick={() => openSheet("cart")}
            className="flex-1 flex items-center justify-center gap-2 border border-[#1A1208] text-[#1A1208] text-sm font-semibold py-3 rounded-full"
          >
            <ShoppingBag size={15} />
            加入购物车
          </button>
          <button
            onClick={() => openSheet("buy")}
            className="flex-1 bg-[#1A1208] text-white text-sm font-semibold py-3 rounded-full"
          >
            立即购买
          </button>
        </div>
      </div>

      {/* 底部弹窗（加入购物车 / 立即购买） */}
      {bottomSheet && (
        <div
          className="fixed inset-0 z-[60] flex items-end"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: 390,
            width: "100%",
          }}
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setBottomSheet(null)}
          />
          <div className="relative w-full bg-white rounded-t-[24px] px-5 pt-5 pb-8 z-10">
            {/* 商品简介 */}
            <div className="flex gap-4 mb-5">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F5EFE8] flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1">
                <p className="text-xl font-bold text-[#1A1208]">¥{product.price}</p>
                {product.originalPrice && (
                  <p className="text-xs text-[#8C7B6B] line-through">
                    ¥{product.originalPrice}
                  </p>
                )}
                <p className="text-sm text-[#8C7B6B] mt-1">{product.name}</p>
              </div>
              <button
                onClick={() => setBottomSheet(null)}
                className="text-[#8C7B6B] flex-shrink-0 self-start"
              >
                <X size={20} />
              </button>
            </div>

            {/* 规格选择 */}
            <p className="text-sm font-semibold text-[#1A1208] mb-2">规格</p>
            <div className="flex gap-2 flex-wrap mb-4">
              {product.specs.map((spec) => (
                <button
                  key={spec.value}
                  onClick={() => setSelectedSpec(spec.value)}
                  className={`text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                    selectedSpec === spec.value
                      ? "bg-[#1A1208] text-white border-[#1A1208]"
                      : "bg-white text-[#3D2B1A] border-[#E8DDD0]"
                  }`}
                >
                  {spec.value}
                </button>
              ))}
            </div>

            {/* 数量 */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold text-[#1A1208]">购买数量</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 rounded-full border border-[#E8DDD0] flex items-center justify-center"
                >
                  <Minus size={14} />
                </button>
                <span className="text-base font-semibold w-6 text-center">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="w-8 h-8 rounded-full bg-[#1A1208] flex items-center justify-center text-white"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* 确认按钮 */}
            {bottomSheet === "cart" ? (
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  addedToCart ? "bg-[#4A7C59] text-white" : "bg-[#1A1208] text-white"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={16} /> 已加入购物车
                  </>
                ) : (
                  <>
                    <ShoppingBag size={15} /> 加入购物车
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#B8973A] text-white text-sm font-bold py-4 rounded-full"
              >
                立即购买 · ¥{(product.price * qty).toFixed(2)}
              </button>
            )}
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
