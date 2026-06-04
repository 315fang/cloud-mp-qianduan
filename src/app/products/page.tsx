"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  X,
  ShoppingBag,
  ChevronRight,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Check,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import { products, categories, Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";

// 三级分类体系：一级 → 二级 → 商品
const leftCategories = [
  { id: "all", name: "全部", icon: "◎" },
  { id: "serum", name: "精华液", icon: "✦" },
  { id: "cream", name: "面霜", icon: "◈" },
  { id: "toner", name: "水乳", icon: "◇" },
  { id: "mask", name: "面膜", icon: "◆" },
  { id: "eye", name: "眼霜", icon: "○" },
  { id: "sunscreen", name: "防晒", icon: "◉" },
];

// 二级标签（功效分类）
const subCategories: Record<string, { id: string; name: string }[]> = {
  all: [
    { id: "all", name: "全部" },
    { id: "hot", name: "热销" },
    { id: "new", name: "新品" },
    { id: "set", name: "套装" },
  ],
  serum: [
    { id: "all", name: "全部" },
    { id: "brightening", name: "提亮" },
    { id: "anti-age", name: "抗老" },
    { id: "hydrating", name: "补水" },
  ],
  cream: [
    { id: "all", name: "全部" },
    { id: "hydrating", name: "保湿" },
    { id: "repair", name: "修护" },
    { id: "anti-age", name: "抗老" },
  ],
  toner: [
    { id: "all", name: "全部" },
    { id: "set", name: "套装" },
    { id: "hydrating", name: "补水" },
    { id: "balance", name: "平衡" },
  ],
  mask: [
    { id: "all", name: "全部" },
    { id: "hydrating", name: "补水" },
    { id: "brightening", name: "提亮" },
    { id: "repair", name: "修护" },
  ],
  eye: [
    { id: "all", name: "全部" },
    { id: "anti-age", name: "抗皱" },
    { id: "brightening", name: "淡纹" },
    { id: "hydrating", name: "补水" },
  ],
  sunscreen: [
    { id: "all", name: "全部" },
    { id: "daily", name: "日常" },
    { id: "sport", name: "户外" },
    { id: "sensitive", name: "敏感肌" },
  ],
};

// SKU 规格
const skuOptions = ["30ml", "50ml", "100ml"];

type CartItem = { quantity: number; sku: string };

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [activeLeft, setActiveLeft] = useState("all");
  const [activeSub, setActiveSub] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSku, setSelectedSku] = useState(skuOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedMap, setAddedMap] = useState<Record<string, CartItem>>({});
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  // 过滤逻辑
  const filtered = products.filter((p) => {
    const matchLeft = activeLeft === "all" || p.category === activeLeft;
    const matchSub =
      activeSub === "all"
        ? true
        : activeSub === "hot"
        ? p.isHot
        : activeSub === "new"
        ? p.isNew
        : activeSub === "set"
        ? p.tags.includes("套装")
        : p.tags.some((t) =>
            t.includes(activeSub) ||
            activeSub.includes(t)
          );
    const matchQuery = query.trim()
      ? p.name.includes(query.trim()) || p.subtitle.includes(query.trim())
      : true;
    return matchLeft && matchSub && matchQuery;
  });

  const handleLeftChange = useCallback((id: string) => {
    setActiveLeft(id);
    setActiveSub("all");
  }, []);

  const openSheet = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSku(skuOptions[0]);
    setQuantity(1);
    setJustAdded(false);
  };

  const closeSheet = () => setSelectedProduct(null);

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addItem({ ...selectedProduct, id: selectedProduct.id });
    setAddedMap((prev) => ({
      ...prev,
      [selectedProduct.id]: { quantity: (prev[selectedProduct.id]?.quantity || 0) + quantity, sku: selectedSku },
    }));
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      closeSheet();
    }, 800);
  };

  const cartTotal = Object.values(addedMap).reduce((s, v) => s + v.quantity, 0);

  return (
    <PhoneFrame>
      {/* 顶部搜索栏 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm px-4 pt-4 pb-3 border-b border-[#E8DDD0]">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 bg-[#F5EFE8] rounded-full px-4 py-2.5">
            <Search size={14} className="text-[#8C7B6B] flex-shrink-0" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索商品..."
              className="flex-1 text-[13px] text-[#1A1208] bg-transparent outline-none placeholder:text-[#8C7B6B] min-w-0"
              aria-label="搜索商品"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="清除">
                <X size={14} className="text-[#8C7B6B]" />
              </button>
            )}
          </div>
          <Link
            href="/cart"
            className="relative w-9 h-9 flex items-center justify-center rounded-full bg-[#F5EFE8] flex-shrink-0"
            aria-label="购物车"
          >
            <ShoppingCart size={18} className="text-[#1A1208]" />
            {cartTotal > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-[#B8973A] rounded-full text-white text-[9px] flex items-center justify-center px-0.5 font-medium">
                {cartTotal > 99 ? "99+" : cartTotal}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* 三级分栏主体 */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100% - 116px)" }}>
        {/* 左侧一级分类边栏 */}
        <aside className="w-[72px] flex-shrink-0 bg-[#F5EFE8] overflow-y-auto scrollbar-hide">
          {leftCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleLeftChange(cat.id)}
              className={`w-full flex flex-col items-center gap-1 py-4 px-1 relative transition-all ${
                activeLeft === cat.id
                  ? "bg-[#FAF7F4] text-[#B8973A]"
                  : "text-[#8C7B6B]"
              }`}
            >
              {activeLeft === cat.id && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-[#B8973A] rounded-r-full" />
              )}
              <span className="text-base" aria-hidden="true">{cat.icon}</span>
              <span className="text-[11px] font-medium leading-tight text-center">{cat.name}</span>
            </button>
          ))}
        </aside>

        {/* 右侧内容区 */}
        <main className="flex-1 overflow-y-auto bg-[#FAF7F4]">
          {/* 二级标签横滑 */}
          <div className="sticky top-0 z-10 bg-[#FAF7F4] px-3 pt-3 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
            {(subCategories[activeLeft] || subCategories.all).map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSub(sub.id)}
                className={`flex-shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full transition-all ${
                  activeSub === sub.id
                    ? "bg-[#1A1208] text-white"
                    : "bg-white text-[#3D2B1A] border border-[#E8DDD0]"
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* 商品网格 */}
          <div className="px-3 pb-4">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#8C7B6B]">
                <div className="w-16 h-16 rounded-full bg-[#F5EFE8] flex items-center justify-center mb-3">
                  <ShoppingBag size={28} strokeWidth={1} className="text-[#E8DDD0]" />
                </div>
                <p className="text-sm font-medium text-[#3D2B1A]">暂无相关商品</p>
                <button
                  onClick={() => { setQuery(""); setActiveSub("all"); }}
                  className="mt-4 text-xs text-[#B8973A] font-medium"
                >
                  查看全部
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {filtered.map((product) => {
                  const inCart = addedMap[product.id];
                  return (
                    <div key={product.id} className="bg-white rounded-2xl overflow-hidden">
                      <Link href={`/products/${product.id}`} className="block">
                        <div className="relative aspect-square bg-[#F5EFE8]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-4"
                          />
                          {/* 角标 */}
                          {product.isNew && (
                            <span className="absolute top-2 left-2 bg-[#4A7CC7] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                              NEW
                            </span>
                          )}
                          {product.isHot && !product.isNew && (
                            <span className="absolute top-2 left-2 bg-[#B8973A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                              热销
                            </span>
                          )}
                          {product.originalPrice && (
                            <span className="absolute top-2 right-2 bg-[#E8573A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                              -{Math.round((1 - product.price / product.originalPrice) * 10) * 10}%
                            </span>
                          )}
                        </div>
                        <div className="px-2.5 pt-2.5 pb-1">
                          <p className="text-xs font-semibold text-[#1A1208] line-clamp-1">{product.name}</p>
                          <p className="text-[10px] text-[#8C7B6B] mt-0.5 line-clamp-1">{product.subtitle}</p>
                          {/* 评分 */}
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={10} fill="#B8973A" className="text-[#B8973A]" />
                            <span className="text-[10px] text-[#8C7B6B]">{product.rating} ({product.reviewCount > 999 ? (product.reviewCount / 1000).toFixed(1) + "k" : product.reviewCount})</span>
                          </div>
                        </div>
                      </Link>
                      <div className="px-2.5 pb-2.5 flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-[#1A1208]">¥{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-[10px] text-[#8C7B6B] line-through ml-1">¥{product.originalPrice}</span>
                          )}
                        </div>
                        <button
                          onClick={() => openSheet(product)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            inCart ? "bg-[#4A7C59]" : "bg-[#1A1208]"
                          }`}
                          aria-label={`加入购物车 ${product.name}`}
                        >
                          {inCart ? (
                            <Check size={13} className="text-white" />
                          ) : (
                            <Plus size={13} className="text-white" />
                          )}
                        </button>
                      </div>
                      {inCart && (
                        <p className="text-[9px] text-[#4A7C59] font-medium text-center pb-1.5">
                          已加 {inCart.quantity} 件 · {inCart.sku}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 快捷购物车底栏 */}
      {cartTotal > 0 && !selectedProduct && (
        <div className="absolute bottom-16 left-0 right-0 px-4 z-30">
          <Link
            href="/cart"
            className="flex items-center justify-between bg-[#1A1208] rounded-2xl px-5 py-3 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 bg-[#B8973A] rounded-full flex items-center justify-center">
                <ShoppingCart size={17} className="text-white" />
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-white rounded-full text-[#1A1208] text-[9px] flex items-center justify-center font-bold px-0.5">
                  {cartTotal}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-white">查看购物车</p>
                <p className="text-[10px] text-white/50">{cartTotal} 件商品</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[#B8973A] text-xs font-medium">
              去结算 <ChevronRight size={14} />
            </div>
          </Link>
        </div>
      )}

      {/* SKU 选购弹窗 */}
      {selectedProduct && (
        <div className="absolute inset-0 z-50 flex items-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeSheet}
          />
          <div className="relative w-full bg-white rounded-t-[24px] px-5 pt-5 pb-6 z-10 max-h-[80%] overflow-y-auto">
            {/* 商品信息行 */}
            <div className="flex gap-4 mb-5">
              <div className="w-24 h-24 rounded-2xl bg-[#F5EFE8] flex-shrink-0 overflow-hidden relative">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain p-3"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-[#1A1208] leading-tight">{selectedProduct.name}</p>
                <p className="text-[11px] text-[#8C7B6B] mt-1">{selectedProduct.subtitle}</p>
                <p className="text-xl font-bold text-[#1A1208] mt-2">
                  ¥{selectedProduct.price}
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-[#8C7B6B] line-through ml-2 font-normal">
                      ¥{selectedProduct.originalPrice}
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-[#8C7B6B] mt-1">库存 {selectedProduct.stock} 件</p>
              </div>
              <button onClick={closeSheet} aria-label="关闭">
                <X size={20} className="text-[#8C7B6B]" />
              </button>
            </div>

            {/* SKU 规格选择 */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-[#1A1208] mb-3">选择规格</p>
              <div className="flex gap-2 flex-wrap">
                {skuOptions.map((sku) => (
                  <button
                    key={sku}
                    onClick={() => setSelectedSku(sku)}
                    className={`text-sm font-medium px-5 py-2 rounded-full border transition-all ${
                      selectedSku === sku
                        ? "bg-[#1A1208] text-white border-[#1A1208]"
                        : "bg-white text-[#3D2B1A] border-[#E8DDD0]"
                    }`}
                  >
                    {sku}
                  </button>
                ))}
              </div>
            </div>

            {/* 数量选择 */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-semibold text-[#1A1208]">购买数量</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-full border border-[#E8DDD0] flex items-center justify-center disabled:opacity-40"
                  aria-label="减少数量"
                >
                  <Minus size={14} className="text-[#3D2B1A]" />
                </button>
                <span className="text-base font-bold text-[#1A1208] min-w-[24px] text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(selectedProduct.stock, q + 1))}
                  disabled={quantity >= selectedProduct.stock}
                  className="w-8 h-8 rounded-full border border-[#E8DDD0] flex items-center justify-center disabled:opacity-40"
                  aria-label="增加数量"
                >
                  <Plus size={14} className="text-[#3D2B1A]" />
                </button>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <Link
                href={`/products/${selectedProduct.id}`}
                className="flex-1 py-3 rounded-full border border-[#E8DDD0] text-sm font-semibold text-[#3D2B1A] text-center"
              >
                商品详情
              </Link>
              <button
                onClick={handleAddToCart}
                className={`flex-[2] py-3 rounded-full text-sm font-semibold text-white text-center transition-all ${
                  justAdded ? "bg-[#4A7C59]" : "bg-[#1A1208]"
                }`}
              >
                {justAdded ? "已加入购物车" : `加入购物车 ¥${(selectedProduct.price * quantity).toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </PhoneFrame>
  );
}
