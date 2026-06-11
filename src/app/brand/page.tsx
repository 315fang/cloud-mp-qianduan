"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, ChevronRight, ArrowRight, Award, Newspaper, FlaskConical, Microscope, BadgeCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

/* ============================================
   问兰品牌叙事 · 真实素材版
   轴线：1974 溯源 → 修护基因 → 肌肤哲学
        （先修墙、再蓄水、后抗老）→ 核心科技 → 资质
   ============================================ */

// 品牌历程（真实溯源）
const milestones = [
  { year: "1974", title: "修护经验的起点", desc: "溯源苏州消防支队卫生队，面对烧烫伤与皮肤损伤的临床修护场景，积累脆弱肌养护的专业经验" },
  { year: "——", title: "从修复到护肤", desc: "将受损肌、敏感肌的专业修护逻辑，沉淀为可长期坚持的屏障修护体系" },
  { year: "落地苏州", title: "问兰药业（苏州）有限公司", desc: "建立研发、生产与产品体系，主打高端修护抗老护肤" },
  { year: "2024", title: "首批苏州知名品牌", desc: "13 项国家发明专利、高新技术企业，获中科院陈洪渊院士产线调研认可" },
];

// 肌肤哲学：先修墙 → 再蓄水 → 后抗老
const philosophy = [
  { step: "壹", title: "先修墙", en: "Repair", desc: "以人造皮脂膜™稳固肌肤屏障，让脆弱肌、敏感肌先回到稳定状态", product: products[2] },
  { step: "贰", title: "再蓄水", en: "Hydrate", desc: "屏障稳固后，水分得以留存，肌肤重新拥有蓄水与自我调节的能力", product: products[1] },
  { step: "叁", title: "后抗老", en: "Renew", desc: "在稳定与润泽的基底上，紧致抗老成分才能真正发挥长期功效", product: products[0] },
];

// 真实资质
const certifications = [
  { title: "13 项国家发明专利", subtitle: "围绕人造皮脂膜™与屏障修护核心技术" },
  { title: "高新技术企业", subtitle: "问兰药业（苏州）有限公司" },
  { title: "2024 首批苏州知名品牌", subtitle: "苏州市知名品牌认定" },
  { title: "院士产线调研认可", subtitle: "中科院陈洪渊院士莅临产线调研" },
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
              <p className="font-display-en text-[10px] text-[#D4AF5A] mb-2">Since 1974 · Suzhou</p>
              <h1 className="font-luxury text-[26px] leading-tight text-balance">
                先修墙，再蓄水，
                <br />后抗老
              </h1>
              <div className="gold-rule mt-3" aria-hidden="true" />
            </div>
          </div>

          {/* 品牌宣言 */}
          <div className="mx-5 mt-8 text-center">
            <p className="eyebrow">Manifesto</p>
            <p className="font-luxury text-base text-[#1A1208] leading-relaxed mt-3 text-balance">
              「真正有效的护肤，
              <br />从修好肌肤屏障开始。」
            </p>
            <p className="text-xs text-[#8C7B6B] leading-relaxed mt-4 text-pretty">
              问兰护肤，源自苏州近半世纪皮肤修护经验。
              我们把原本用于脆弱肌、受损肌养护的专业修护逻辑，
              转化为在家也能长期坚持的高端功效护肤方案。
            </p>
          </div>

          {/* 起源 · 时间线（真实溯源） */}
          <div className="px-5 mt-10">
            <p className="eyebrow">Origins · 1974</p>
            <h2 className="font-luxury text-lg text-[#1A1208] mt-1 mb-5">品牌溯源</h2>
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={m.title} className="flex gap-4">
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

          {/* 核心科技 · 暗色仪式区（人造皮脂膜™） */}
          <div className="mx-4 mt-10 bg-[#1A1208] rounded-2xl px-6 py-8 relative overflow-hidden">
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#B8973A]/50" aria-hidden="true" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#B8973A]/50" aria-hidden="true" />
            <p className="eyebrow text-center">Core Technology</p>
            <h2 className="font-luxury text-xl text-white text-center mt-3">人造皮脂膜™</h2>
            <div className="gold-rule mx-auto mt-4" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-white/65 text-center mt-5 text-pretty">
              以聚季铵盐-51 为核心的仿生屏障技术，
              在肌肤表层构筑类皮脂膜保护层——
              修护受损屏障、维稳敏感肌，
              让肌肤重新拥有稳定、蓄水与自我焕新的能力。
            </p>
            <div className="flex justify-center gap-6 mt-6">
              {[
                { num: "1974", label: "修护经验溯源", icon: Microscope },
                { num: "13", label: "国家发明专利", icon: FlaskConical },
                { num: "50年", label: "近半世纪沉淀", icon: BadgeCheck },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <p className="font-display-en text-lg text-[#D4AF5A]">{num}</p>
                  <p className="text-[10px] text-white/50 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 肌肤哲学三部曲（替代虚构系列） */}
          <div className="px-5 mt-10">
            <p className="eyebrow">Skin Philosophy</p>
            <h2 className="font-luxury text-lg text-[#1A1208] mt-1 mb-4">肌肤哲学三部曲</h2>
            <div className="space-y-3">
              {philosophy.map((c) => (
                <Link
                  key={c.title}
                  href={`/products/${c.product.id}`}
                  className="flex items-center gap-4 bg-white rounded-2xl p-4"
                >
                  <div className="relative w-20 h-20 rounded-xl bg-[#F5EFE8] shrink-0 overflow-hidden">
                    <Image src={c.product.image} alt={c.title} fill className="object-contain p-2" />
                    <span className="absolute top-1 left-1.5 font-luxury text-[13px] text-[#B8973A]">{c.step}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display-en text-[9px] text-[#B8973A]">{c.en}</p>
                    <p className="font-luxury text-[15px] text-[#1A1208] mt-0.5">{c.title}</p>
                    <p className="text-[11px] text-[#8C7B6B] mt-1 leading-snug line-clamp-2">{c.desc}</p>
                  </div>
                  <ArrowRight size={14} className="text-[#C0B0A0] shrink-0" />
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

          {/* 认证资质（真实） */}
          <div className="px-5 mt-10">
            <p className="eyebrow">Credentials</p>
            <h2 className="font-luxury text-lg text-[#1A1208] mt-1 mb-4">企业资质</h2>
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
            <p className="font-display-en text-[11px] text-[#3D2B1A]">Wenlan Beauty · Since 1974</p>
            <p className="text-[10px] text-[#8C7B6B] mt-2 tracking-[0.08em]">1974 溯源 · 屏障修护 · 国货高端功效护肤</p>
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
