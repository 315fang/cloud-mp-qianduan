"use client";

import { useState, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Heart, Trash2, ShoppingBag, Clock } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

type Tab = "favorites" | "history";

const initialFavorites = products.slice(0, 4).map((p) => ({ ...p }));
const initialHistory = [
  { date: "今天", items: products.slice(0, 3) },
  { date: "昨天", items: products.slice(3, 6) },
];

function CollectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab: Tab = searchParams.get("tab") === "history" ? "history" : "favorites";
  const [tab, setTab] = useState<Tab>(initialTab);
  const [favorites, setFavorites] = useState(initialFavorites);
  const [history, setHistory] = useState(initialHistory);
  const [openSwipeId, setOpenSwipeId] = useState<string | null>(null);
  const touchStartX = useRef(0);

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
    setOpenSwipeId(null);
  };

  const clearFavorites = () => setFavorites([]);
  const clearHistory = () => setHistory([]);

  const historyCount = history.reduce((n, g) => n + g.items.length, 0);

  // 左滑手势：滑动超过阈值则展开该行的操作区
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent, id: string) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -40) setOpenSwipeId(id);
    else if (delta > 40) setOpenSwipeId(null);
  };

  return (
    <PhoneFrame hideNav>
      {/* 顶部栏 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]"
            aria-label="返回"
          >
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <h1 className="text-base font-bold text-[#1A1208]">我的收藏</h1>
          {/* 清空入口：按当前 tab 切换 */}
          {tab === "favorites" ? (
            <button
              onClick={clearFavorites}
              disabled={favorites.length === 0}
              className="text-xs text-[#8C7B6B] flex items-center gap-1 disabled:opacity-30"
            >
              <Trash2 size={13} />
              清空
            </button>
          ) : (
            <button
              onClick={clearHistory}
              disabled={historyCount === 0}
              className="text-xs text-[#8C7B6B] flex items-center gap-1 disabled:opacity-30"
            >
              <Trash2 size={13} />
              清空
            </button>
          )}
        </div>

        {/* 双 Tab 切换 + 滑块指示 */}
        <div className="px-5 pb-2">
          <div className="relative flex bg-[#F0E8DC] rounded-full p-1">
            <span
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-transform duration-300"
              style={{ transform: tab === "favorites" ? "translateX(0)" : "translateX(100%)" }}
            />
            <button
              onClick={() => setTab("favorites")}
              className={`relative z-10 flex-1 py-2 text-xs font-semibold rounded-full transition-colors ${
                tab === "favorites" ? "text-[#1A1208]" : "text-[#8C7B6B]"
              }`}
            >
              我的收藏 {favorites.length > 0 && `(${favorites.length})`}
            </button>
            <button
              onClick={() => setTab("history")}
              className={`relative z-10 flex-1 py-2 text-xs font-semibold rounded-full transition-colors ${
                tab === "history" ? "text-[#1A1208]" : "text-[#8C7B6B]"
              }`}
            >
              近期浏览 {historyCount > 0 && `(${historyCount})`}
            </button>
          </div>
        </div>
      </header>

      {/* 收藏 Tab */}
      {tab === "favorites" && (
        <div className="px-4 py-4">
          {favorites.length === 0 ? (
            <EmptyState
              icon={<Heart size={48} strokeWidth={1} className="text-[#E8DDD0]" />}
              title="还没有收藏任何商品"
              hint="把喜欢的商品收藏起来，方便随时查看"
            />
          ) : (
            <div className="space-y-2.5">
              {favorites.map((product) => (
                <div key={product.id} className="relative overflow-hidden rounded-2xl">
                  {/* 左滑显露的删除操作区 */}
                  <div className="absolute top-0 right-0 bottom-0 w-20 bg-red-400 flex items-center justify-center">
                    <button
                      onClick={() => removeFavorite(product.id)}
                      className="flex flex-col items-center gap-1 text-white"
                      aria-label="删除收藏"
                    >
                      <Trash2 size={18} />
                      <span className="text-[10px]">删除</span>
                    </button>
                  </div>

                  {/* 商品行卡片（可左滑/长按） */}
                  <div
                    onTouchStart={onTouchStart}
                    onTouchEnd={(e) => onTouchEnd(e, product.id)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setOpenSwipeId(openSwipeId === product.id ? null : product.id);
                    }}
                    className="relative bg-white p-3 flex gap-3 transition-transform duration-300"
                    style={{ transform: openSwipeId === product.id ? "translateX(-80px)" : "translateX(0)" }}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F5EFE8] flex-shrink-0"
                    >
                      <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-sm font-semibold text-[#1A1208] leading-tight line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-[11px] text-[#8C7B6B] mt-0.5 line-clamp-1">{product.subtitle}</p>
                      </Link>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-base font-bold text-[#1A1208]">¥{product.price}</span>
                        <button
                          className="w-8 h-8 bg-[#1A1208] rounded-full flex items-center justify-center"
                          aria-label="加入购物车"
                        >
                          <ShoppingBag size={13} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-center text-[10px] text-[#C0B0A0] pt-2">左滑或长按商品可删除</p>
            </div>
          )}
        </div>
      )}

      {/* 浏览 Tab */}
      {tab === "history" && (
        <div className="px-4 py-4">
          {historyCount === 0 ? (
            <EmptyState
              icon={<Clock size={48} strokeWidth={1} className="text-[#E8DDD0]" />}
              title="还没有浏览记录"
              hint="你浏览过的商品会显示在这里"
            />
          ) : (
            <div className="space-y-5">
              {history.map(({ date, items }) => (
                <div key={date}>
                  <p className="text-xs font-semibold text-[#8C7B6B] mb-3">{date}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {items.map((product) => (
                      <Link key={product.id} href={`/products/${product.id}`} className="flex flex-col gap-1.5">
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F5EFE8]">
                          <Image src={product.image} alt={product.name} fill className="object-contain p-3" />
                        </div>
                        <p className="text-[11px] font-semibold text-[#1A1208] line-clamp-1">{product.name}</p>
                        <p className="text-[11px] font-bold text-[#1A1208]">¥{product.price}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </PhoneFrame>
  );
}

function EmptyState({ icon, title, hint }: { icon: React.ReactNode; title: string; hint: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4">{icon}</div>
      <p className="text-sm font-medium text-[#3D2B1A]">{title}</p>
      <p className="text-xs text-[#8C7B6B] mt-1">{hint}</p>
      <Link href="/products" className="mt-5 bg-[#1A1208] text-white text-sm font-medium px-8 py-3 rounded-full">
        去逛逛
      </Link>
    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F4]" />}>
      <CollectionContent />
    </Suspense>
  );
}
