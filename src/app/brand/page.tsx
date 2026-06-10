"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, ChevronRight, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";

const columns = [
  { title: "成分实验室", subtitle: "透明配方 · 科学护肤", color: "#B8973A" },
  { title: "匠心工艺", subtitle: "每一滴皆臻于至善", color: "#6B4EC7" },
  { title: "可持续美学", subtitle: "环保包装与责任承诺", color: "#3D8B5F" },
  { title: "品牌大使", subtitle: "与你共享美学理念", color: "#4A7CC7" },
];

const certifications = [
  { title: "GMPC 国际认证", subtitle: "化妆品生产质量管理规范" },
  { title: "FDA 备案", subtitle: "美国食品药品监督管理局" },
  { title: "无动物实验认证", subtitle: "Cruelty Free 国际认证" },
  { title: "ISO 22716", subtitle: "化妆品良好生产规范" },
];

export default function BrandZonePage() {
  const router = useRouter();

  return (
    <PhoneFrame hideNav>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        {/* 悬浮返回 */}
        <button onClick={() => router.back()} className="absolute top-14 left-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm" aria-label="返回">
          <ArrowLeft size={18} className="text-white" />
        </button>

        <div className="flex-1 overflow-y-auto">
          {/* 品牌大图 Hero */}
          <div className="relative h-60 w-full">
            <Image src="/images/brand-hero.png" alt="问兰品牌主视觉" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-[10px] tracking-[0.3em] text-[#D4AF5A] uppercase mb-1">Wenlan Beauty</p>
              <h1 className="text-2xl font-bold">问兰 · 美学专区</h1>
            </div>
          </div>

          {/* 欢迎语卡 */}
          <div className="mx-4 -mt-6 relative bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-[#3D2B1A] leading-relaxed text-pretty">
              问兰，源于东方草本智慧与现代护肤科学的融合。我们相信，真正的美来自肌肤的健康与内在的从容。每一款产品，都是对品质的极致追求。
            </p>
          </div>

          {/* 品牌栏目卡组 */}
          <div className="px-4 mt-5">
            <h2 className="text-sm font-bold text-[#1A1208] mb-3">品牌栏目</h2>
            <div className="grid grid-cols-2 gap-3">
              {columns.map((c) => (
                <div key={c.title} className="bg-white rounded-2xl p-4 flex flex-col gap-1">
                  <div className="w-8 h-8 rounded-full mb-1 flex items-center justify-center" style={{ backgroundColor: `${c.color}18` }}>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  </div>
                  <p className="text-sm font-bold text-[#1A1208]">{c.title}</p>
                  <p className="text-[11px] text-[#8C7B6B] leading-snug">{c.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 认证资质 */}
          <div className="px-4 mt-5">
            <h2 className="text-sm font-bold text-[#1A1208] mb-3">认证资质</h2>
            <div className="bg-white rounded-2xl divide-y divide-[#F0E8DC]">
              {certifications.map((cert) => (
                <div key={cert.title} className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF7E6] flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} className="text-[#B8973A]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1A1208]">{cert.title}</p>
                    <p className="text-[11px] text-[#8C7B6B] mt-0.5">{cert.subtitle}</p>
                  </div>
                  <Award size={16} className="text-[#D4AF5A]" />
                </div>
              ))}
            </div>
          </div>

          {/* 品牌故事 */}
          <div className="px-4 mt-5">
            <h2 className="text-sm font-bold text-[#1A1208] mb-3">品牌故事</h2>
            <div className="bg-white rounded-2xl p-5 space-y-3">
              <p className="text-sm text-[#3D2B1A] leading-relaxed text-pretty">
                2018 年，问兰诞生于一个简单的信念：护肤不应是复杂的负担，而是每日与自己温柔相处的仪式。
              </p>
              <p className="text-sm text-[#3D2B1A] leading-relaxed text-pretty">
                我们走访全球原料产地，甄选珍稀植萃，结合皮肤科学实验室的反复验证，只为呈现最纯净、最有效的配方。透明、安心、有效，是问兰对每一位用户不变的承诺。
              </p>
              <p className="text-sm text-[#3D2B1A] leading-relaxed text-pretty">
                如今，问兰已陪伴数十万用户走过他们的美学旅程。未来，我们将继续以匠心，守护每一寸肌肤的健康之美。
              </p>
            </div>
          </div>

          {/* 返回入口 */}
          <Link href="/" className="mx-4 mt-5 mb-6 bg-[#1A1208] rounded-2xl p-4 flex items-center justify-between text-white">
            <span className="text-sm font-medium">探索问兰全部好物</span>
            <ChevronRight size={18} className="text-white/50" />
          </Link>
        </div>
      </div>
    </PhoneFrame>
  );
}
