"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Timer,
  ChevronRight,
  Loader2,
  RefreshCw,
  PackageOpen,
  Sparkles,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

type LoadState = "loading" | "error" | "empty" | "ok";

const bundles = [
  {
    id: "diy-1",
    cover: "/images/product-serum.png",
    price: 888,
    originalPrice: 1280,
    tags: ["随心搭", "省 ¥392"],
    title: "焕颜精华随心选",
    subtitle: "3 件自由搭配，享专属套装价",
    groups: 3,
    options: 6,
  },
  {
    id: "diy-2",
    cover: "/images/product-cream.png",
    price: 666,
    originalPrice: 960,
    tags: ["热销", "限量 200 套"],
    title: "水润锁水套装",
    subtitle: "2 件锁水好物，由你决定",
    groups: 2,
    options: 4,
  },
  {
    id: "diy-3",
    cover: "/images/product-mask.png",
    price: 399,
    originalPrice: 560,
    tags: ["新人首单"],
    title: "焕肤面膜任选",
    subtitle: "4 选 2，轻松开启护肤计划",
    groups: 2,
    options: 4,
  },
];

export default function DiyListPage() {
  const router = useRouter();
  // 通过 state 演示不同加载态：loading / error / empty / ok
  const [state, setState] = useState<LoadState>("ok");

  return (
    <PhoneFrame hideNav>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <button
          onClick={() => router.back()}
          className="absolute top-14 left-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm"
          aria-label="返回"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>

        <div className="flex-1 overflow-y-auto pb-6">
          {/* Hero 卡 */}
          <div className="relative px-5 pt-16 pb-7 surface-noir text-white overflow-hidden">
            <div
              className="absolute top-0 right-0 w-44 h-44 rounded-full opacity-15"
              style={{ background: "radial-gradient(circle, #D4AF5A, transparent 70%)" }}
            />
            <p className="text-[10px] tracking-[0.3em] text-[#D4AF5A] uppercase mb-1">DIY Bundle Sale</p>
            <h1 className="text-2xl font-bold">特惠随心选</h1>
            <p className="text-sm text-white/70 mt-2">自由搭配组合，享超值套装专属价</p>
            <div className="flex items-center gap-2 mt-3 text-[#D4AF5A]">
              <Timer size={15} />
              <span className="text-xs">活动进行中 · 距结束 02 天 06:24:18</span>
            </div>
          </div>

          {/* 列表态切换（仅用于演示设计稿的不同状态） */}
          <div className="flex gap-2 px-4 mt-4">
            {(["ok", "loading", "error", "empty"] as LoadState[]).map((s) => (
              <button
                key={s}
                onClick={() => setState(s)}
                className={`text-[10px] px-2.5 py-1 rounded-full border ${
                  state === s ? "bg-[#1A1208] text-white border-[#1A1208]" : "border-[#E8DDD0] text-[#8C7B6B]"
                }`}
              >
                {s === "ok" ? "正常" : s === "loading" ? "加载中" : s === "error" ? "失败" : "空"}
              </button>
            ))}
          </div>

          {/* 加载中 */}
          {state === "loading" && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Loader2 size={32} className="text-[#B8973A] animate-spin" />
              <p className="text-sm text-[#8C7B6B]">正在加载套餐…</p>
            </div>
          )}

          {/* 加载失败 */}
          {state === "error" && (
            <div className="flex flex-col items-center justify-center py-24 gap-3 px-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#FBF0E8] flex items-center justify-center">
                <RefreshCw size={28} className="text-[#B85A2A]" />
              </div>
              <p className="text-sm font-medium text-[#3D2B1A]">加载失败</p>
              <p className="text-xs text-[#8C7B6B]">网络似乎开小差了，请稍后重试</p>
              <button
                onClick={() => setState("ok")}
                className="mt-2 px-7 py-2.5 rounded-full bg-[#1A1208] text-white text-sm font-medium"
              >
                重新加载
              </button>
            </div>
          )}

          {/* 空状态 */}
          {state === "empty" && (
            <div className="flex flex-col items-center justify-center py-24 gap-3 px-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F5EFE8] flex items-center justify-center">
                <PackageOpen size={28} className="text-[#A89685]" />
              </div>
              <p className="text-sm font-medium text-[#3D2B1A]">暂无可选套餐</p>
              <p className="text-xs text-[#8C7B6B]">活动尚未开始，敬请期待</p>
              <button
                onClick={() => router.push("/")}
                className="mt-2 px-7 py-2.5 rounded-full border border-[#E8DDD0] text-[#3D2B1A] text-sm font-medium"
              >
                去逛逛其他
              </button>
            </div>
          )}

          {/* 套餐列表 */}
          {state === "ok" && (
            <div className="px-4 mt-4 space-y-4">
              {bundles.map((b) => (
                <button
                  key={b.id}
                  onClick={() => router.push("/activity/diy")}
                  className="w-full text-left bg-white rounded-2xl overflow-hidden active:opacity-90 transition-opacity"
                >
                  {/* 封面 + 价格角标 */}
                  <div className="relative w-full aspect-[16/9] bg-[#F5EFE8]">
                    <Image src={b.cover} alt={b.title} fill className="object-cover" />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {b.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1A1208]/80 text-[#D4AF5A] backdrop-blur-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="absolute bottom-0 right-0 bg-[#B8973A] text-white px-3 py-1.5 rounded-tl-2xl">
                      <span className="text-[10px]">套装价 </span>
                      <span className="text-base font-bold">¥{b.price}</span>
                      <span className="text-[10px] line-through ml-1 opacity-70">¥{b.originalPrice}</span>
                    </div>
                  </div>

                  {/* 文案区 */}
                  <div className="p-4">
                    <h2 className="text-base font-bold text-[#1A1208]">{b.title}</h2>
                    <p className="text-xs text-[#8C7B6B] mt-1">{b.subtitle}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#B8973A] font-medium">
                        <Sparkles size={13} />
                        <span>{b.groups} 组 · {b.options} 款可选</span>
                      </div>
                      <span className="flex items-center gap-0.5 text-xs font-bold text-[#1A1208] bg-[#F5EFE8] px-3 py-1.5 rounded-full">
                        去搭配 <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
