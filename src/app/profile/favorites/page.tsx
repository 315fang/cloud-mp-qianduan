"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

const initialFavorites = products.slice(0, 4).map((p) => ({ ...p, saved: true }));

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState(initialFavorites);

  const toggle = (id: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PhoneFrame hideNav>
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]"
        >
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </button>
        <h1 className="text-base font-bold text-[#1A1208]">我的收藏</h1>
        <span className="text-xs text-[#8C7B6B]">{favorites.length} 件</span>
      </header>

      <div className="px-4 py-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#8C7B6B]">
            <Heart size={48} strokeWidth={1} className="mb-4 text-[#E8DDD0]" />
            <p className="text-sm font-medium text-[#3D2B1A]">还没有收藏任何商品</p>
            <Link href="/products" className="mt-4 bg-[#1A1208] text-white text-sm font-medium px-8 py-3 rounded-full">
              去逛逛
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favorites.map((product) => (
              <div key={product.id} className="bg-white rounded-[14px] overflow-hidden shadow-sm relative">
                <Link href={`/products/${product.id}`}>
                  <div className="relative w-full aspect-square bg-[#F5EFE8]">
                    <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-[#1A1208] leading-tight">{product.name}</h3>
                    <p className="text-[11px] text-[#8C7B6B] mt-0.5">{product.subtitle}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-base font-bold text-[#1A1208]">¥{product.price}</span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => toggle(product.id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center shadow-sm"
                  aria-label="取消收藏"
                >
                  <Heart size={14} className="text-red-400 fill-red-400" />
                </button>
                <button
                  className="absolute bottom-12 right-2 w-7 h-7 bg-[#1A1208] rounded-full flex items-center justify-center shadow-md"
                  aria-label="加入购物车"
                >
                  <ShoppingBag size={12} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
