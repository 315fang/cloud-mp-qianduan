"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Copy, RefreshCw, Download, Loader2, Check,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const templates = [
  { id: "elegant", name: "雅致金", image: "/images/brand-hero.png" },
  { id: "fresh", name: "清新米", image: "/images/news-cover.png" },
  { id: "bold", name: "经典棕", image: "/images/brand-hero.png" },
];

export default function BrandPosterPage() {
  const router = useRouter();
  const [active, setActive] = useState("elegant");
  const [generating, setGenerating] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const myId = "WL10086";
  const current = templates.find((t) => t.id === active)!;

  const regenerate = () => {
    setGenerating(true);
    setImgLoaded(false);
    setTimeout(() => setGenerating(false), 1200);
  };

  const switchTpl = (id: string) => {
    if (id === active) return;
    setActive(id);
    setImgLoaded(false);
    setGenerating(true);
    setTimeout(() => setGenerating(false), 1000);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4] pb-8">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A1208] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">品牌推荐海报</h1>
        </header>

        <div className="bg-[#1A1208] px-5 pb-5 pt-2">
          {/* 我的ID */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60">我的推广ID</span>
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-sm font-medium text-[#B8973A]">
              {myId}
              {copied ? <Check size={13} /> : <Copy size={13} />}
            </button>
          </div>
        </div>

        <div className="px-4 py-5 space-y-4">
          {/* 海报预览 */}
          <div className="bg-white rounded-2xl p-4">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F5EFE8]">
              {/* 预览图加载态 / 生成中态 */}
              {(generating || !imgLoaded) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 bg-[#F5EFE8]">
                  <Loader2 size={28} className="text-[#B8973A] animate-spin" />
                  <p className="text-xs text-[#8C7B6B]">{generating ? "海报生成中…" : "加载预览…"}</p>
                </div>
              )}
              <img
                src={current.image || "/placeholder.svg"}
                alt="海报预览"
                onLoad={() => setImgLoaded(true)}
                className="w-full h-full object-cover"
              />
              {/* 底部小程序码占位 */}
              {imgLoaded && !generating && (
                <div className="absolute bottom-3 right-3 bg-white rounded-lg p-2 shadow-lg">
                  <div className="w-12 h-12 bg-[#1A1208] rounded grid place-items-center">
                    <span className="text-[8px] text-[#B8973A] font-bold text-center leading-tight">扫码<br />进店</span>
                  </div>
                  <p className="text-[8px] text-[#8C7B6B] text-center mt-1">ID {myId}</p>
                </div>
              )}
            </div>
          </div>

          {/* 海报版本切换 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-3">选择海报版本</h3>
            <div className="grid grid-cols-3 gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => switchTpl(t.id)}
                  className={`rounded-xl overflow-hidden border-2 transition-all ${
                    active === t.id ? "border-[#B8973A]" : "border-transparent"
                  }`}
                >
                  <div className="aspect-[3/4] bg-[#F5EFE8]">
                    <img src={t.image || "/placeholder.svg"} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <p className={`text-[11px] py-1.5 ${active === t.id ? "text-[#B8973A] font-medium" : "text-[#8C7B6B]"}`}>
                    {t.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 操作 */}
          <div className="flex gap-3">
            <button
              onClick={regenerate}
              disabled={generating}
              className="flex-1 border border-[#E5DDD0] text-[#3D2B1A] text-sm font-medium py-3 rounded-xl flex items-center justify-center gap-1.5 active:opacity-70 disabled:opacity-50"
            >
              <RefreshCw size={16} className={generating ? "animate-spin" : ""} /> 重新生成
            </button>
            <button
              onClick={() => alert("功能开发中")}
              disabled={generating || !imgLoaded}
              className="flex-1 bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 active:opacity-80 disabled:opacity-50"
            >
              <Download size={16} /> 保存到相册
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
