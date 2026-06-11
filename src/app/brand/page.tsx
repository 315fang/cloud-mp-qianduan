"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, ChevronRight, ArrowRight, Award, Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

/* ============================================
   品牌叙事框架 · 占位内容（待品牌故事素材替换）
   结构：宣言 → 起源 → 成分溯源 → 系列体系 → 认证
   ============================================ */

// 起源里程碑（占位：待真实品牌历程替换）
const milestones = [
  { year: "2018", title: "问兰创立", desc: "于苏州，以一株兰花为序章" },
  { year: "2020", title: "成分实验室成立", desc: "建立自有活性成分研究体系" },
  { year: "2022", title: "核心专利成分问世", desc: "兰花活性萃取工艺获得专利" },
  { year: "2024", title: "走向更广阔的肌肤", desc: "服务数十万用户的美学旅程" },
];

// 系列体系（占位命名：待正式系列名替换；图片取自现有产品库）
const collections = [
  { name: "兰御系列", en: "Imperial Orchid", focus: "紧致抗老", desc: "以高浓度兰花精萃，唤醒肌肤年轻态", product: products[0] },
  { name: "兰润系列", en: "Hydra Orchid", focus: "深层保湿", desc: "三重玻尿酸协同，沁润每一层肌肤", product: products[1] },
  { name: "兰皙系列", en: "Lumi Orchid", focus: "焕亮透白", desc: "烟酰胺与兰花菁华，点亮自然光泽", product: products[2] },
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
          <div className="relative h-72 w-full">
            <Image src="/images/brand-hero.png" alt="问兰品牌主视觉" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/80 via-[#1A1208]/20 to-transparent" />
            <div className="absolute bottom-6 left-5 right-5 text-white">
              <p className="font-display-en text-[10px] text-[#D4AF5A] mb-2">Maison Wenlan</p>
              <h1 className="font-luxury text-[26px] leading-tight text-balance">
                一朵兰，
                <br />一种肌肤哲学
              </h1>
              <div className="gold-rule mt-3" aria-hidden="true" />
            </div>
          </div>

          {/* 品牌宣言（占位文案：待替换） */}
          <div className="mx-5 mt-8 text-center">
            <p className="eyebrow">Manifesto</p>
            <p className="font-luxury text-base text-[#1A1208] leading-relaxed mt-3 text-balance">
              「真正的美，
              <br />来自肌肤的健康与内在的从容。」
            </p>
            <p className="text-xs text-[#8C7B6B] leading-relaxed mt-4 text-pretty">
              问兰，源于东方草本智慧与现代护肤科学的融合。
              每一款产品，都是对品质的极致追求。
            </p>
          </div>

          {/* 起源 · 时间线（占位：待真实品牌历程替换） */}
          <div className="px-5 mt-10">
            <p className="eyebrow">Origins</p>
            <h2 className="font-luxury text-lg text-[#1A1208] mt-1 mb-5">品牌起源</h2>
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-4">
                  {/* 时间轴 */}
                  <div className="flex flex-col items-center">
                    <span className="w-2 h-2 rounded-full bg-[#B8973A] mt-1.5 shrink-0" />
                    {i < milestones.length - 1 && (
                      <span className="w-px flex-1 bg-[#E8DDD0]" aria-hidden="true" />
                    )}
                  </div>
                  <div className={i < milestones.length - 1 ? "pb-6" : ""}>
                    <p className="font-display-en text-[13px] text-[#B8973A]">{m.year}</p>
                    <p className="text-sm font-semibold text-[#1A1208] mt-0.5">{m.title}</p>
                    <p className="text-xs text-[#8C7B6B] mt-0.5 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 成分溯源 · 暗色仪式区（占位文案：待真实成分故事替换） */}
          <div className="mx-4 mt-10 bg-[#1A1208] rounded-2xl px-6 py-8 relative overflow-hidden">
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#B8973A]/50" aria-hidden="true" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#B8973A]/50" aria-hidden="true" />
            <p className="eyebrow text-center">Ingredient Provenance</p>
            <h2 className="font-luxury text-xl text-white text-center mt-3">成分溯源</h2>
            <div className="gold-rule mx-auto mt-4" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-white/65 text-center mt-5 text-pretty">
              我们走访全球原料产地，甄选珍稀植萃。
              从兰花根茎中萃取的活性菁华，
              经皮肤科学实验室反复验证，
              只为呈现最纯净、最有效的配方。
            </p>
            <div className="flex justify-center gap-6 mt-6">
              {[
                { num: "12", label: "原料产地" },
                { num: "300+", label: "次配方验证" },
                { num: "0", label: "动物实验" },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <p className="font-display-en text-lg text-[#D4AF5A]">{num}</p>
                  <p className="text-[10px] text-white/50 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 系列体系（占位命名：待正式系列名替换） */}
          <div className="px-5 mt-10">
            <p className="eyebrow">Collections</p>
            <h2 className="font-luxury text-lg text-[#1A1208] mt-1 mb-4">系列体系</h2>
            <div className="space-y-3">
              {collections.map((c) => (
                <Link
                  key={c.name}
                  href={`/products/${c.product.id}`}
                  className="flex items-center gap-4 bg-white rounded-2xl p-4"
                >
                  <div className="relative w-20 h-20 rounded-xl bg-[#F5EFE8] shrink-0 overflow-hidden">
                    <Image src={c.product.image} alt={c.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display-en text-[9px] text-[#B8973A]">{c.en}</p>
                    <p className="font-luxury text-[15px] text-[#1A1208] mt-0.5">{c.name}</p>
                    <p className="text-[11px] text-[#8C7B6B] mt-1 leading-snug line-clamp-1">{c.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-[#B8973A] bg-[#F0E6C8] px-2 py-0.5 rounded-full font-medium">{c.focus}</span>
                    <ArrowRight size={14} className="text-[#C0B0A0] mt-3 ml-auto" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 品牌资讯入口 */}
          <Link href="/brand/news" className="mx-4 mt-6 bg-white rounded-2xl p-4 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#F5EFE8] flex items-center justify-center shrink-0">
              <Newspaper size={20} className="text-[#B8973A]" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1A1208]">新闻中心</p>
              <p className="text-[11px] text-[#8C7B6B] mt-0.5">品牌动态与媒体报道</p>
            </div>
            <ChevronRight size={16} className="text-[#C0B0A0]" />
          </Link>

          {/* 认证资质 */}
          <div className="px-5 mt-10">
            <p className="eyebrow">Certifications</p>
            <h2 className="font-luxury text-lg text-[#1A1208] mt-1 mb-4">认证资质</h2>
            <div className="bg-white rounded-2xl divide-y divide-[#F0E8DC]">
              {certifications.map((cert) => (
                <div key={cert.title} className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F5EFE8] flex items-center justify-center shrink-0">
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

          {/* 收尾 CTA */}
          <div className="text-center mt-10 mb-8 px-5">
            <div className="gold-divider mb-6" aria-hidden="true" />
            <p className="font-display-en text-[11px] text-[#3D2B1A]">Wenlan Beauty</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-4 bg-[#1A1208] text-white text-sm font-medium px-8 py-3.5 rounded-full"
            >
              探索全系臻品 <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
