"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const coupons = [
  { id: 1, discount: 50, name: "新人专享券", min: 299, expire: "2024-12-31", type: "available" },
  { id: 2, discount: 30, name: "满减优惠券", min: 200, expire: "2024-12-15", type: "available" },
  { id: 3, discount: 100, name: "品牌周年庆专属", min: 600, expire: "2024-12-25", type: "available" },
  { id: 4, discount: 20, name: "限时专享券", min: 100, expire: "2024-11-15", type: "expired" },
  { id: 5, discount: 50, name: "双十一专属", min: 299, expire: "2024-11-11", type: "used" },
];

const tabs = [
  { key: "available", label: "可使用" },
  { key: "used", label: "已使用" },
  { key: "expired", label: "已过期" },
];

export default function CouponsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("available");

  const filtered = coupons.filter((c) => c.type === activeTab);

  return (
    <PhoneFrame hideNav>
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]"
          >
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <h1 className="text-base font-bold text-[#1A1208]">我的优惠券</h1>
          <div className="w-8" />
        </div>
        <div className="flex border-b border-[#E8DDD0]">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 text-sm py-2.5 font-medium border-b-2 transition-all ${
                activeTab === key
                  ? "border-[#B8973A] text-[#B8973A]"
                  : "border-transparent text-[#8C7B6B]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="px-4 py-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#8C7B6B]">
            <p className="text-sm font-medium text-[#3D2B1A]">暂无{tabs.find(t => t.key === activeTab)?.label}优惠券</p>
          </div>
        ) : (
          filtered.map((coupon) => (
            <div
              key={coupon.id}
              className={`flex overflow-hidden rounded-2xl ${
                coupon.type === "available" ? "bg-white" : "bg-[#F9F5F0] opacity-60"
              }`}
            >
              {/* 左侧金额 */}
              <div className="w-28 bg-[#1A1208] flex flex-col items-center justify-center py-5 flex-shrink-0">
                <p className="text-[10px] text-[#B8973A] font-medium">减</p>
                <p className="text-3xl font-bold text-white leading-tight">{coupon.discount}</p>
                <p className="text-[9px] text-white/50 mt-0.5">满¥{coupon.min}可用</p>
              </div>
              {/* 锯齿 */}
              <div className="relative flex-shrink-0 w-0">
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#F5EFE8]" />
              </div>
              {/* 右侧信息 */}
              <div className="flex-1 px-4 py-4 border-l border-dashed border-[#E8DDD0] flex flex-col justify-between">
                <div>
                  <p className="text-sm font-bold text-[#1A1208]">{coupon.name}</p>
                  <p className="text-[11px] text-[#8C7B6B] mt-1">有效期至 {coupon.expire}</p>
                </div>
                {coupon.type === "available" && (
                  <button
                    onClick={() => router.push("/products")}
                    className="self-end text-xs text-[#B8973A] font-semibold mt-2"
                  >
                    去使用
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </PhoneFrame>
  );
}
