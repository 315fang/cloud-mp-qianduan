"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";

const tabs = ["全部", "最新", "品牌动态", "护肤知识"];

const articles = [
  { id: "1", title: "冬季护肤的五个黄金法则", excerpt: "干燥季节如何科学锁水？资深配方师为你拆解保湿屏障的修护逻辑。", time: "2024-12-08", tag: "护肤知识", featured: true },
  { id: "2", title: "问兰焕颜精华荣获年度成分大奖", excerpt: "凭借创新黄金因子配方，问兰再次获得行业权威认可。", time: "2024-12-05", tag: "品牌动态" },
  { id: "3", title: "烟酰胺到底怎么用才有效", excerpt: "浓度、搭配、使用顺序，一篇讲清烟酰胺的正确打开方式。", time: "2024-12-03", tag: "护肤知识" },
  { id: "4", title: "问兰可持续包装计划正式启动", excerpt: "从瓶身到外箱，我们对环保的承诺落到每一个细节。", time: "2024-11-29", tag: "品牌动态" },
  { id: "5", title: "敏感肌的日常护理指南", excerpt: "建立耐受、温和清洁、精简护肤，敏感肌也能拥有好状态。", time: "2024-11-25", tag: "护肤知识" },
];

export default function BrandNewsPage() {
  const router = useRouter();
  const [tab, setTab] = useState("全部");
  const [loading] = useState(false);

  const list = tab === "全部" || tab === "最新" ? articles : articles.filter((a) => a.tag === tab);
  const [featured, ...rest] = list;

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]" aria-label="返回">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">品牌资讯</span>
          <span className="w-8" />
        </div>

        {/* 筛选 Tabs */}
        <div className="flex gap-2 px-4 py-3 bg-white border-b border-[#F0E8DC] overflow-x-auto scrollbar-hide">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${tab === t ? "bg-[#1A1208] text-white" : "bg-[#F5EFE8] text-[#8C7B6B]"}`}>{t}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-40 bg-[#F0E8DC]" />
                <div className="p-4 space-y-2"><div className="h-4 bg-[#F0E8DC] rounded w-3/4" /><div className="h-3 bg-[#F0E8DC] rounded w-full" /></div>
              </div>
            ))
          ) : list.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-[#B8A898]">
              <Clock size={36} className="mb-3" />
              <p className="text-sm">该分类暂无资讯</p>
            </div>
          ) : (
            <>
              {featured && (
                <Link href={`/brand/news/${featured.id}`} className="block bg-white rounded-2xl overflow-hidden">
                  <div className="relative h-44 w-full">
                    <Image src="/images/news-cover.png" alt={featured.title} fill className="object-cover" />
                    <span className="absolute top-3 left-3 text-[10px] bg-[#B8973A] text-white px-2 py-0.5 rounded-full">置顶</span>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] text-[#B8973A] font-medium">{featured.tag}</span>
                    <h2 className="text-base font-bold text-[#1A1208] mt-1 leading-snug text-balance">{featured.title}</h2>
                    <p className="text-xs text-[#8C7B6B] mt-1.5 leading-relaxed line-clamp-2">{featured.excerpt}</p>
                    <p className="text-[11px] text-[#B8A898] mt-2 flex items-center gap-1"><Clock size={11} /> {featured.time}</p>
                  </div>
                </Link>
              )}
              {rest.map((a) => (
                <Link key={a.id} href={`/brand/news/${a.id}`} className="flex gap-3 bg-white rounded-2xl p-3">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <Image src="/images/news-cover.png" alt={a.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <span className="text-[10px] text-[#B8973A] font-medium">{a.tag}</span>
                    <h3 className="text-sm font-bold text-[#1A1208] mt-0.5 leading-snug line-clamp-2">{a.title}</h3>
                    <p className="text-[11px] text-[#8C7B6B] mt-1 leading-relaxed line-clamp-2">{a.excerpt}</p>
                    <p className="text-[11px] text-[#B8A898] mt-auto flex items-center gap-1"><Clock size={10} /> {a.time}</p>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
