"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Search, MapPin, Phone, Clock, Check, Navigation } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { pickupStores, stockMeta } from "@/lib/pickup-stores";

function StorePickerInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<string | null>(params.get("store"));

  const filtered = pickupStores.filter(
    (s) => s.name.includes(keyword) || s.address.includes(keyword),
  );

  const confirm = () => {
    if (!selected) return;
    router.push(`/checkout?delivery=pickup&store=${selected}`);
  };

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
        <h1 className="text-base font-bold text-[#1A1208]">选择自提门店</h1>
        <div className="w-8" />
      </header>

      {/* 搜索 */}
      <div className="px-4 pt-1 pb-3">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5">
          <Search size={16} className="text-[#B8A898]" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索门店名称或地址"
            className="flex-1 text-sm text-[#1A1208] outline-none placeholder:text-[#C0B0A0]"
          />
        </div>
      </div>

      {/* 当前定位提示 */}
      <div className="mx-4 mb-3 flex items-center gap-1.5 text-[11px] text-[#8C7B6B]">
        <Navigation size={12} className="text-[#B8973A]" />
        当前定位：上海市静安区南京西路 · 已按距离排序
      </div>

      <div className="px-4 pb-32 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <MapPin size={40} strokeWidth={1} className="text-[#E8DDD0] mb-3" />
            <p className="text-sm text-[#8C7B6B]">附近没有匹配的门店</p>
          </div>
        ) : (
          filtered.map((store) => {
            const disabled = !store.pickup;
            const isSelected = selected === store.id;
            return (
              <button
                key={store.id}
                disabled={disabled}
                onClick={() => setSelected(store.id)}
                className={`w-full text-left bg-white rounded-2xl px-4 py-4 border-2 transition-colors ${
                  isSelected ? "border-[#B8973A]" : "border-transparent"
                } ${disabled ? "opacity-60" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <p className="text-sm font-bold text-[#1A1208] truncate">{store.name}</p>
                    <span
                      className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ color: stockMeta[store.stock].color, backgroundColor: stockMeta[store.stock].bg }}
                    >
                      {stockMeta[store.stock].label}
                    </span>
                  </div>
                  {isSelected ? (
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#B8973A] flex items-center justify-center">
                      <Check size={13} className="text-white" strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="shrink-0 text-[11px] text-[#B8973A]">{store.distance}</span>
                  )}
                </div>
                <p className="text-xs text-[#8C7B6B] mt-1.5 flex items-start gap-1">
                  <MapPin size={13} className="text-[#C0B0A0] mt-0.5 shrink-0" />
                  {store.address}
                </p>
                <div className="flex items-center gap-4 mt-2 text-[11px] text-[#8C7B6B]">
                  <span className="flex items-center gap-1"><Phone size={12} className="text-[#B8973A]" /> {store.phone}</span>
                  <span className="flex items-center gap-1"><Clock size={12} className="text-[#B8973A]" /> {store.hours}</span>
                </div>
                {disabled && (
                  <p className="mt-2 text-[11px] text-[#C2410C] bg-[#FFF1E6] rounded-lg px-2 py-1 inline-block">
                    该门店暂不支持自提，仅供展示
                  </p>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* 底部确认 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#E8DDD0] px-5 py-3 z-50">
        <button
          onClick={confirm}
          disabled={!selected}
          className={`w-full text-sm font-bold py-4 rounded-full ${
            selected ? "bg-[#1A1208] text-white" : "bg-[#EDE4D6] text-[#B0A18C]"
          }`}
        >
          {selected ? "确认选择该门店" : "请选择自提门店"}
        </button>
      </div>
    </PhoneFrame>
  );
}

export default function StorePickerPage() {
  return (
    <Suspense fallback={null}>
      <StorePickerInner />
    </Suspense>
  );
}
