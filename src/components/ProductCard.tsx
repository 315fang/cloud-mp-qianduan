"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/data";

type Props = {
  product: Product;
  layout?: "grid" | "list";
};

export default function ProductCard({ product, layout = "grid" }: Props) {
  if (layout === "list") {
    return (
      <Link href={`/products/${product.id}`} className="flex gap-3 bg-white rounded-[12px] p-3 shadow-sm">
        <div className="relative w-28 h-28 rounded-[8px] overflow-hidden bg-[#F5EFE8] flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2"
          />
          {product.isNew && (
            <span className="absolute top-1.5 left-1.5 bg-[#1A1208] text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full tracking-wider">
              NEW
            </span>
          )}
          {product.isHot && (
            <span className="absolute top-1.5 left-1.5 bg-[#B8973A] text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full tracking-wider">
              HOT
            </span>
          )}
        </div>
        <div className="flex flex-col justify-between flex-1 py-0.5">
          <div>
            <h3 className="text-sm font-semibold text-[#1A1208] leading-tight">{product.name}</h3>
            <p className="text-xs text-[#8C7B6B] mt-0.5 leading-relaxed">{product.subtitle}</p>
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {product.tags.map((tag) => (
                <span key={tag} className="text-[10px] text-[#B8973A] bg-[#F0E6C8] px-1.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-base font-bold text-[#1A1208]">¥{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-[#8C7B6B] line-through ml-1.5">¥{product.originalPrice}</span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[#8C7B6B]">
              <Star size={11} fill="#B8973A" stroke="none" />
              <span className="text-[11px]">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.id}`} className="flex flex-col bg-white rounded-[14px] overflow-hidden shadow-sm">
      <div className="relative w-full aspect-square bg-[#F5EFE8]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-[#1A1208] text-white text-[9px] font-medium px-2 py-0.5 rounded-full tracking-wider">
            NEW
          </span>
        )}
        {product.isHot && (
          <span className="absolute top-2 left-2 bg-[#B8973A] text-white text-[9px] font-medium px-2 py-0.5 rounded-full tracking-wider">
            HOT
          </span>
        )}
        <button
          className="absolute bottom-2 right-2 w-8 h-8 bg-[#1A1208] text-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
          aria-label="加入购物车"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <ShoppingBag size={14} />
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-[#1A1208] leading-tight">{product.name}</h3>
        <p className="text-[11px] text-[#8C7B6B] mt-0.5">{product.subtitle}</p>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-base font-bold text-[#1A1208]">¥{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#8C7B6B] line-through ml-1">¥{product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-0.5 text-[#8C7B6B]">
            <Star size={10} fill="#B8973A" stroke="none" />
            <span className="text-[10px]">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
