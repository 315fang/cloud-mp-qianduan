"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Share2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";

const articles: Record<string, { title: string; subtitle: string; tag: string; time: string; paragraphs: string[] }> = {
  "1": {
    title: "冬季护肤的五个黄金法则",
    subtitle: "干燥季节，如何为肌肤构筑坚固的水润屏障",
    tag: "护肤知识", time: "2024-12-08",
    paragraphs: [
      "随着气温骤降，空气湿度大幅下降，肌肤的天然屏障面临严峻考验。许多人会发现脸颊泛红、起皮、紧绷，这正是屏障受损的信号。",
      "第一法则：温和清洁。冬季应避免使用强力清洁产品，选择氨基酸类温和洁面，保留肌肤必要的皮脂膜。",
      "第二法则：及时补水。洁面后三分钟内是补水黄金期，建议立即使用保湿精华，再用面霜锁住水分。",
      "第三法则：强化屏障。含有神经酰胺、角鲨烷成分的产品能有效修护受损屏障，提升肌肤自身锁水能力。",
      "第四法则：不忘防晒。冬季紫外线依然存在，日间防晒不可松懈，建议选择 SPF30 以上的轻薄防晒。",
      "第五法则：内外兼修。充足的饮水、规律的作息与均衡的饮食，是任何护肤品都无法替代的根本。",
    ],
  },
};

const related = [
  { id: "3", title: "烟酰胺到底怎么用才有效" },
  { id: "5", title: "敏感肌的日常护理指南" },
];

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const article = articles[id] ?? articles["1"];

  return (
    <PhoneFrame hideNav>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <button onClick={() => router.back()} className="absolute top-14 left-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm" aria-label="返回">
          <ArrowLeft size={18} className="text-white" />
        </button>

        <div className="flex-1 overflow-y-auto">
          {/* 大封面 */}
          <div className="relative h-52 w-full">
            <Image src="/images/news-cover.png" alt={article.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/60 to-transparent" />
          </div>

          {/* 标题区 */}
          <div className="px-5 -mt-8 relative">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] text-[#B8973A] font-medium">{article.tag}</span>
              <h1 className="text-xl font-bold text-[#1A1208] mt-1.5 leading-snug text-balance">{article.title}</h1>
              <p className="text-sm text-[#8C7B6B] mt-2 leading-relaxed">{article.subtitle}</p>
              <p className="text-[11px] text-[#B8A898] mt-3 flex items-center gap-1"><Clock size={11} /> 发布于 {article.time}</p>
            </div>
          </div>

          {/* 正文 */}
          <div className="px-5 mt-4 space-y-4">
            {article.paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-[#3D2B1A] leading-[1.8] text-pretty">{p}</p>
            ))}
          </div>

          {/* 分享 */}
          <div className="px-5 mt-6">
            <button className="w-full py-3 bg-[#1A1208] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2">
              <Share2 size={15} /> 分享这篇文章
            </button>
          </div>

          {/* 相关推荐 */}
          <div className="px-5 mt-6 mb-6">
            <h2 className="text-sm font-bold text-[#1A1208] mb-3">相关推荐</h2>
            <div className="bg-white rounded-2xl divide-y divide-[#F0E8DC]">
              {related.map((r) => (
                <Link key={r.id} href={`/brand/news/${r.id}`} className="flex items-center justify-between p-4">
                  <span className="text-sm text-[#3D2B1A]">{r.title}</span>
                  <ChevronRight size={16} className="text-[#C8BAA8]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
