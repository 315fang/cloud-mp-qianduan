"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Clock, CalendarDays, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";

type NewsTab = "event" | "industry" | "notice";

const tabs: { key: NewsTab; label: string }[] = [
  { key: "event", label: "最新活动" },
  { key: "industry", label: "行业前沿" },
  { key: "notice", label: "商城公告" },
];

const newsData: Record<
  NewsTab,
  { id: string; title: string; excerpt: string; time: string; tag: string; img: string | null }[]
> = {
  event: [
    {
      id: "e1",
      title: "问兰药业亮相苏州美博会，人造皮脂膜™技术受关注",
      excerpt: "问兰药业携屏障修护全线产品参展，现场为观众提供肌肤屏障检测体验，展位人气持续高涨。",
      time: "2024-12-06",
      tag: "品牌活动",
      img: "/images/brand-news-event.png",
    },
    {
      id: "e2",
      title: "「先修墙」冬季屏障养护沙龙开放报名",
      excerpt: "邀请专属顾问现场讲解干敏季节的屏障养护方案，含一对一肌肤检测，限量 30 席。",
      time: "2024-11-28",
      tag: "会员沙龙",
      img: null,
    },
    {
      id: "e3",
      title: "会员日礼遇升级：12 月入会礼全新上线",
      excerpt: "黄金及以上会员本月可领取修护精华中样与积分加速权益，详情见会员中心。",
      time: "2024-11-20",
      tag: "会员礼遇",
      img: null,
    },
  ],
  industry: [
    {
      id: "i1",
      title: "皮肤屏障研究新进展：仿生皮脂膜成为修护新方向",
      excerpt: "近年研究表明，模拟天然皮脂结构的仿生成分在敏感肌维稳与屏障重建上表现突出。",
      time: "2024-12-02",
      tag: "研究动态",
      img: "/images/brand-news-lab.png",
    },
    {
      id: "i2",
      title: "聚季铵盐-51：长效锁水成膜剂的功效解析",
      excerpt: "从分子结构到临床表现，解读这一核心保湿成膜成分的作用机理与配方应用。",
      time: "2024-11-25",
      tag: "成分科普",
      img: null,
    },
    {
      id: "i3",
      title: "国货功效护肤备案数据盘点：修护类目持续增长",
      excerpt: "屏障修护与敏感肌养护类产品备案量连续三年保持两位数增长，成为功效护肤主赛道。",
      time: "2024-11-15",
      tag: "行业观察",
      img: null,
    },
  ],
  notice: [
    {
      id: "n1",
      title: "新门店开业：问兰美学空间（苏州中心店）",
      excerpt: "即日起开放到店自提与肌肤检测预约，开业期间到店礼遇加赠，欢迎莅临体验。",
      time: "2024-12-05",
      tag: "门店公告",
      img: "/images/brand-news-store.png",
    },
    {
      id: "n2",
      title: "元旦物流安排公告",
      excerpt: "12 月 31 日至 1 月 1 日订单将于 1 月 2 日起顺延发出，门店自提服务不受影响。",
      time: "2024-12-01",
      tag: "物流公告",
      img: null,
    },
    {
      id: "n3",
      title: "商城积分规则更新说明",
      excerpt: "12 月起消费积分将于确认收货后实时入账，冻结期相应缩短，详情见积分中心。",
      time: "2024-11-22",
      tag: "规则更新",
      img: null,
    },
  ],
};

function BrandNewsInner() {
  const router = useRouter();
  const params = useSearchParams();
  const tabParam = params.get("tab");
  const active: NewsTab =
    tabParam === "industry" || tabParam === "notice" ? tabParam : "event";

  const setTab = (tab: NewsTab) => {
    router.replace(`/brand/news?tab=${tab}`);
  };

  const list = newsData[active];
  const [featured, ...rest] = list;

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        {/* 顶栏 */}
        <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm">
          <div className="flex items-center px-4 pt-4 pb-2">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white -ml-1"
              aria-label="返回"
            >
              <ArrowLeft size={18} className="text-[#1A1208]" />
            </button>
            <div className="flex-1 text-center">
              <p className="eyebrow">Brand Zone</p>
              <h1 className="font-luxury text-base text-[#1A1208]">品牌专区</h1>
            </div>
            <span className="w-8" aria-hidden="true" />
          </div>

          {/* 分类 Tab */}
          <div className="px-4 pb-3">
            <div className="bg-white rounded-full p-1 flex gap-1">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex-1 py-2 rounded-full text-[12px] font-medium transition-colors ${
                    active === key ? "surface-noir text-white" : "text-[#8C7B6B]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-3">
          {/* 头条卡（带图） */}
          {featured?.img && (
            <Link href={`/brand/news/${featured.id}`} className="block bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative aspect-[16/9] bg-[#F5EFE8]">
                <Image src={featured.img} alt={featured.title} fill className="object-cover" />
                <span className="absolute top-3 left-3 text-[10px] font-semibold text-[#D4AF5A] surface-noir px-2.5 py-1 rounded-full tracking-wide">
                  {featured.tag}
                </span>
              </div>
              <div className="p-4">
                <h2 className="font-luxury text-[15px] text-[#1A1208] leading-snug text-balance">{featured.title}</h2>
                <p className="text-xs text-[#8C7B6B] mt-1.5 leading-relaxed line-clamp-2">{featured.excerpt}</p>
                <div className="flex items-center gap-1.5 mt-3 text-[10px] text-[#B0A18C]">
                  <CalendarDays size={11} />
                  {featured.time}
                  <ChevronRight size={12} className="ml-auto text-[#C0B0A0]" />
                </div>
              </div>
            </Link>
          )}

          {/* 列表卡（纯文字） */}
          {(featured?.img ? rest : list).map((a) => (
            <Link key={a.id} href={`/brand/news/${a.id}`} className="block bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-[#8C6B1F] bg-[#F0E6C8] px-2 py-0.5 rounded-full">
                  {a.tag}
                </span>
                <span className="text-[10px] text-[#B0A18C] ml-auto flex items-center gap-1">
                  <Clock size={10} /> {a.time}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#1A1208] leading-snug mt-2.5 text-balance">{a.title}</h3>
              <p className="text-xs text-[#8C7B6B] mt-1 leading-relaxed line-clamp-2">{a.excerpt}</p>
            </Link>
          ))}

          {/* 底部品牌落款 */}
          <div className="text-center pt-6 pb-2">
            <div className="gold-divider mb-4" aria-hidden="true" />
            <p className="text-[10px] text-[#8C7B6B]/70 tracking-[0.15em]">品牌甄选 · 问兰药业</p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function BrandNewsPage() {
  return (
    <Suspense fallback={null}>
      <BrandNewsInner />
    </Suspense>
  );
}
