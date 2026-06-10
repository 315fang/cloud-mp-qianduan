"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, RefreshCw, QrCode, Share2, Loader2, ImageOff } from "lucide-react";
import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";

const product = {
  name: "焕颜臻萃精华",
  subtitle: "黄金精华 · 28日焕亮肌肤",
  price: 598,
  originalPrice: 780,
  image: "/images/product-serum.png",
};

const styles = [
  { key: "simple", label: "简约版", bg: "#FFFFFF", text: "#1A1208" },
  { key: "luxury", label: "高级版", bg: "#1A1208", text: "#FFFFFF" },
  { key: "campaign", label: "活动版", bg: "#B83232", text: "#FFFFFF" },
];

type PosterState = "generating" | "ready" | "error";

export default function PosterPage() {
  const router = useRouter();
  const [style, setStyle] = useState("luxury");
  const [state, setState] = useState<PosterState>("ready");
  const cur = styles.find((s) => s.key === style)!;

  // 切换风格 / 重新生成 → 模拟海报生成中
  const regenerate = (nextStyle?: string) => {
    if (nextStyle) setStyle(nextStyle);
    setState("generating");
    setTimeout(() => setState("ready"), 1200);
  };

  return (
    <PhoneFrame hideNav>
      <div className="flex flex-col h-full bg-[#2A2018]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10" aria-label="返回">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-white">分享海报</span>
          <span className="w-8" />
        </div>

        {/* 海报预览 */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col items-center">
          <div className="w-full max-w-[280px] rounded-2xl overflow-hidden shadow-2xl relative" style={{ backgroundColor: cur.bg }}>
            {/* 生成中 / 失败 遮罩 */}
            {state === "generating" && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#1A1208]/85">
                <Loader2 size={32} className="text-[#D4AF5A] animate-spin" />
                <p className="text-xs text-white/70">海报生成中…</p>
              </div>
            )}
            {state === "error" && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#1A1208]/90 px-6 text-center">
                <ImageOff size={30} className="text-white/50" />
                <p className="text-xs text-white/70">海报加载失败，请重试</p>
                <button onClick={() => regenerate()} className="px-5 py-2 rounded-full bg-[#B8973A] text-[#1A1208] text-xs font-bold">
                  重新生成
                </button>
              </div>
            )}

            <div className="relative w-full aspect-square bg-[#F5EFE8]">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
              {style === "campaign" && (
                <span className="absolute top-3 left-3 text-[10px] bg-[#FFD66B] text-[#B83232] px-2 py-1 rounded-full font-bold">限时特惠</span>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-base font-bold" style={{ color: cur.text }}>{product.name}</h2>
              <p className="text-xs mt-1 opacity-70" style={{ color: cur.text }}>{product.subtitle}</p>
              <div className="flex items-end gap-2 mt-3">
                <span className="text-xl font-bold" style={{ color: style === "simple" ? "#B8973A" : cur.text }}>¥{product.price}</span>
                <span className="text-xs line-through mb-0.5 opacity-50" style={{ color: cur.text }}>¥{product.originalPrice}</span>
              </div>
              {/* 小程序码位 */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t" style={{ borderColor: style === "simple" ? "#F0E8DC" : "rgba(255,255,255,0.15)" }}>
                <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: style === "simple" ? "#F5EFE8" : "rgba(255,255,255,0.1)" }}>
                  <QrCode size={32} style={{ color: style === "simple" ? "#1A1208" : cur.text }} />
                </div>
                <div>
                  <p className="text-[11px] font-medium" style={{ color: cur.text }}>长按识别小程序码</p>
                  <p className="text-[10px] opacity-60" style={{ color: cur.text }}>问兰 · 轻奢护肤</p>
                </div>
              </div>
            </div>
          </div>

          {/* 长按提示 */}
          <p className="text-[11px] text-white/40 mt-3">长按海报可直接转发或保存</p>

          {/* 风格切换 */}
          <div className="flex gap-2 mt-5 w-full max-w-[280px]">
            {styles.map((s) => (
              <button
                key={s.key}
                onClick={() => regenerate(s.key)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${style === s.key ? "bg-[#B8973A] text-white" : "bg-white/10 text-white/70"}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 底部操作：分享好友 / 重新生成 / 保存海报 三同级 */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-3 gap-3">
            <button
              disabled={state !== "ready"}
              className="flex flex-col items-center gap-1.5 py-3 bg-[#B8973A] disabled:opacity-50 text-white rounded-xl"
            >
              <Share2 size={18} />
              <span className="text-xs font-bold">分享好友</span>
            </button>
            <button
              onClick={() => regenerate()}
              disabled={state === "generating"}
              className="flex flex-col items-center gap-1.5 py-3 bg-white/10 disabled:opacity-50 text-white rounded-xl"
            >
              <RefreshCw size={18} className={state === "generating" ? "animate-spin" : ""} />
              <span className="text-xs font-medium">重新生成</span>
            </button>
            <button
              disabled={state !== "ready"}
              className="flex flex-col items-center gap-1.5 py-3 bg-white/10 disabled:opacity-50 text-white rounded-xl"
            >
              <Download size={18} />
              <span className="text-xs font-medium">保存海报</span>
            </button>
          </div>
          <p className="text-center text-[11px] text-white/40 pt-3">保存后可分享至微信好友或朋友圈</p>
        </div>
      </div>
    </PhoneFrame>
  );
}
