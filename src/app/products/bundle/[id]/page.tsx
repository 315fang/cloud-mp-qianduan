"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Gift, ShoppingBag } from "lucide-react";
import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";

const bundle = {
  title: "焕颜臻萃护肤套组",
  subtitle: "精华 + 面霜 + 眼霜，28 日焕亮全套方案",
  bundlePrice: 1280,
  originalPrice: 1534,
  cover: "/images/product-serum.png",
  soldOut: false,
  items: [
    { id: "1", name: "焕颜臻萃精华", spec: "30ml", image: "/images/product-serum.png", fixed: true },
    { id: "2", name: "轻盈保湿面霜", spec: "50g", image: "/images/product-cream.png", fixed: true },
    { id: "5", name: "紧致抗皱眼霜", spec: "15ml", image: "/images/product-eye.png", fixed: false,
      options: ["15ml 标准装", "20ml 加量装"] },
  ],
  benefits: ["套装立省 ¥254", "赠定制化妆包", "顺丰包邮", "30 天无忧退换"],
};

export default function BundleDetailPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Record<string, number>>({ "5": 0 });
  const save = bundle.originalPrice - bundle.bundlePrice;

  return (
    <PhoneFrame hideNav>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <button onClick={() => router.back()} className="absolute top-14 left-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm" aria-label="返回">
          <ArrowLeft size={18} className="text-white" />
        </button>

        <div className="flex-1 overflow-y-auto pb-24">
          {/* 主视觉 */}
          <div className="relative h-64 w-full bg-[#F0E8DC]">
            <Image src={bundle.cover} alt={bundle.title} fill className="object-cover" />
            <span className="absolute top-14 right-4 text-[10px] bg-[#B8973A] text-white px-2.5 py-1 rounded-full font-bold">套装专享</span>
          </div>

          {/* 标题价格 */}
          <div className="bg-white px-5 py-4">
            <h1 className="text-lg font-bold text-[#1A1208] text-balance">{bundle.title}</h1>
            <p className="text-sm text-[#8C7B6B] mt-1">{bundle.subtitle}</p>
            <div className="flex items-end gap-2 mt-3">
              <span className="text-2xl font-bold text-[#B8973A]">¥{bundle.bundlePrice}</span>
              <span className="text-sm text-[#B8A898] line-through mb-0.5">¥{bundle.originalPrice}</span>
              <span className="ml-auto text-xs bg-[#FFF3E6] text-[#E8975A] px-2 py-1 rounded-full font-bold">立省 ¥{save}</span>
            </div>
          </div>

          {/* 组合商品列表 */}
          <div className="mx-4 mt-3 bg-white rounded-2xl p-4">
            <h2 className="text-sm font-bold text-[#1A1208] mb-3">套装包含 {bundle.items.length} 件</h2>
            <div className="space-y-3">
              {bundle.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F5EFE8] shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A1208]">{item.name}</p>
                    <p className="text-xs text-[#8C7B6B] mt-0.5">{item.spec}</p>
                    {/* 可选规格 */}
                    {!item.fixed && item.options && (
                      <div className="flex gap-2 mt-2">
                        {item.options.map((opt, i) => (
                          <button
                            key={opt}
                            onClick={() => setSelected({ ...selected, [item.id]: i })}
                            className={`text-[11px] px-2.5 py-1 rounded-full border ${selected[item.id] === i ? "border-[#B8973A] bg-[#FFF7E6] text-[#B8973A]" : "border-[#E8DDD0] text-[#8C7B6B]"}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                    {item.fixed && <span className="inline-block mt-1.5 text-[10px] text-[#8C7B6B] bg-[#F5EFE8] px-2 py-0.5 rounded-full">固定搭配</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 套装权益 */}
          <div className="mx-4 mt-3 bg-white rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Gift size={16} className="text-[#B8973A]" />
              <h2 className="text-sm font-bold text-[#1A1208]">套装权益</h2>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {bundle.benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 p-2.5 bg-[#FAF7F4] rounded-xl">
                  <Check size={13} className="text-[#B8973A] shrink-0" />
                  <span className="text-xs text-[#3D2B1A]">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部固定按钮 */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F0E8DC] px-4 py-3 flex gap-3">
          {bundle.soldOut ? (
            <button disabled className="flex-1 py-3 bg-[#E8DDD0] text-[#8C7B6B] text-sm font-bold rounded-xl">已售罄</button>
          ) : (
            <>
              <button className="flex-1 py-3 bg-[#F5EFE8] text-[#1A1208] text-sm font-bold rounded-xl flex items-center justify-center gap-1.5">
                <ShoppingBag size={15} /> 加入购物袋
              </button>
              <button className="flex-1 py-3 bg-[#B8973A] text-white text-sm font-bold rounded-xl">立即购买</button>
            </>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
