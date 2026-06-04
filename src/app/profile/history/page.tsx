"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

const historyGroups = [
  { date: "今天", items: products.slice(0, 3) },
  { date: "昨天", items: products.slice(3, 6) },
];

export default function HistoryPage() {
  const router = useRouter();

  return (
    <PhoneFrame hideNav>
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]"
        >
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </button>
        <h1 className="text-base font-bold text-[#1A1208]">浏览足迹</h1>
        <button className="text-xs text-[#8C7B6B] flex items-center gap-1">
          <Trash2 size={13} />
          清除
        </button>
      </header>

      <div className="px-4 py-4 space-y-5">
        {historyGroups.map(({ date, items }) => (
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
    </PhoneFrame>
  );
}
