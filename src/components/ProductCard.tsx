"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Plus, X, Check } from "lucide-react";
import type { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";

type Props = {
  product: Product;
  layout?: "grid" | "list";
};

function AddToCartSheet({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [selectedSpec, setSelectedSpec] = useState(product.specs[0].value);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty, selectedSpec);
    setAdded(true);
    setTimeout(() => {
      onClose();
      setAdded(false);
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end"
      style={{ left: "50%", transform: "translateX(-50%)", maxWidth: 390, width: "100%" }}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-[24px] px-5 pt-5 pb-8 z-10">
        <div className="flex items-start gap-4 mb-5">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F5EFE8] flex-shrink-0">
            <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
          </div>
          <div className="flex-1">
            <p className="text-base font-bold text-[#1A1208]">¥{product.price}</p>
            {product.originalPrice && (
              <p className="text-xs text-[#8C7B6B] line-through">¥{product.originalPrice}</p>
            )}
            <p className="text-sm text-[#8C7B6B] mt-0.5">{product.name}</p>
          </div>
          <button onClick={onClose} className="text-[#8C7B6B] flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm font-semibold text-[#1A1208] mb-2">规格</p>
        <div className="flex gap-2 flex-wrap mb-5">
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

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-[#1A1208]">
            数量 <span className="text-[#8C7B6B] font-normal text-xs ml-1">库存 {product.stock} 件</span>
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-8 h-8 rounded-full border border-[#E8DDD0] flex items-center justify-center text-[#1A1208]"
            >
              <span className="text-lg leading-none">−</span>
            </button>
            <span className="text-base font-semibold text-[#1A1208] w-5 text-center">{qty}</span>
            <button
              onClick={() => setQty(Math.min(product.stock, qty + 1))}
              className="w-8 h-8 rounded-full bg-[#1A1208] flex items-center justify-center text-white"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className={`w-full py-4 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            added ? "bg-[#4A7C59] text-white" : "bg-[#1A1208] text-white"
          }`}
        >
          {added ? (
            <>
              <Check size={16} />
              已加入购物袋
            </>
          ) : (
            <>
              <ShoppingBag size={15} />
              加入购物袋
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function ProductCard({ product, layout = "grid" }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);

  if (layout === "list") {
    return (
      <>
        <Link href={`/products/${product.id}`} className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm">
          <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-[#F5EFE8] flex-shrink-0">
            <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
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
              <h3 className="font-luxury text-sm text-[#1A1208] leading-tight">{product.name}</h3>
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
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[#8C7B6B]">
                  <Star size={11} fill="#B8973A" stroke="none" />
                  <span className="text-[11px]">{product.rating}</span>
                </div>
                <button
                  className="w-7 h-7 rounded-full bg-[#1A1208] flex items-center justify-center text-white active:scale-95 transition-transform"
                  aria-label="加入购物袋"
                  onClick={(e) => { e.preventDefault(); setSheetOpen(true); }}
                >
                  <ShoppingBag size={12} />
                </button>
              </div>
            </div>
          </div>
        </Link>
        {sheetOpen && <AddToCartSheet product={product} onClose={() => setSheetOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <Link href={`/products/${product.id}`} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="relative w-full aspect-square bg-[#F5EFE8]">
          <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
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
            aria-label="加入购物袋"
            onClick={(e) => { e.preventDefault(); setSheetOpen(true); }}
          >
            <ShoppingBag size={14} />
          </button>
        </div>
        <div className="p-3">
          <h3 className="font-luxury text-sm text-[#1A1208] leading-tight">{product.name}</h3>
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
      {sheetOpen && <AddToCartSheet product={product} onClose={() => setSheetOpen(false)} />}
    </>
  );
}
