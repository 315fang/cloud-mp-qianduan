"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy, Check, Download, BookImage, MessageSquare, Image as ImageIcon, FileText, Calculator } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

type TabKey = "images" | "copywriting" | "calculator";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "images", label: "主图素材", icon: <ImageIcon size={13} /> },
  { key: "copywriting", label: "推广文案", icon: <MessageSquare size={13} /> },
  { key: "calculator", label: "佣金估算", icon: <Calculator size={13} /> },
];

const copywritingTemplates = [
  {
    id: 1,
    tag: "朋友圈",
    title: "日常种草",
    text: "用了三个月的问兰焕活精华，皮肤真的变了！毛孔细了、暗沉少了，最重要的是早上起来脸很水润，妆感也好多了✨ 用完一瓶回购第三瓶了，强烈推荐给我的朋友们～有需要的私我，有专属优惠！",
  },
  {
    id: 2,
    tag: "朋友圈",
    title: "活动促销",
    text: "【好消息】问兰护肤品本月限时优惠，我的专属折扣码 WL2024001 还剩最后几天！精华液、面霜、眼霜全线参与，买两件再送小样礼盒。有意向的朋友快来找我，帮你选最适合的套组～",
  },
  {
    id: 3,
    tag: "社群",
    title: "品牌介绍",
    text: "给大家介绍一个我亲测很好用的轻奢护肤品牌——问兰。主打成分党，配方透明公开，5%烟酰胺+雪绒花干细胞萃取，价格比大牌实惠很多，效果真不输！皮肤科医生测试通过，敏感肌也能用～",
  },
  {
    id: 4,
    tag: "私信",
    title: "客户跟进",
    text: "亲爱的，你上次问的问兰精华液现在有现货了！我帮你备了一瓶，原价 ¥780，通过我拿有专属优惠，还送小样试用包。你要的话我今天就给你安排发货，到了一定要跟我反馈效果哦～",
  },
];

export default function MaterialsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("images");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // 佣金估算
  const [salePrice, setSalePrice] = useState("780");
  const [commRate, setCommRate] = useState("10");
  const [qty, setQty] = useState("1");

  const commission = (Number(salePrice) * (Number(commRate) / 100) * Number(qty)) || 0;
  const teamComm = (commission * 0.3) || 0;

  const handleCopy = async (id: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1800);
    } catch {}
  };

  return (
    <PhoneFrame>
      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1A1208]">
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10" aria-label="返回">
          <ArrowLeft size={17} className="text-white" />
        </button>
        <span className="text-sm font-bold text-white tracking-wide">推广素材中心</span>
        <div className="w-8" />
      </div>

      {/* Tabs */}
      <div className="bg-white flex border-b border-[#F0E8DC]">
        {TABS.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === key
                ? "border-[#B8973A] text-[#B8973A]"
                : "border-transparent text-[#8C7B6B]"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto bg-[#FAF7F4]">

        {/* 主图素材 */}
        {activeTab === "images" && (
          <div className="p-4 space-y-4">
            <div className="bg-[#FBF5E6] rounded-2xl px-4 py-3 text-xs text-[#8C7B6B] leading-relaxed flex items-start gap-2">
              <BookImage size={13} className="text-[#B8973A] mt-0.5 flex-shrink-0" />
              以下图片均为官方授权素材，可直接用于朋友圈、社群、小红书等平台推广。
            </div>
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="relative aspect-square bg-[#F5EFE8]">
                  <Image src={product.image} alt={product.name} fill className="object-contain p-6" />
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#1A1208] truncate">{product.name}</p>
                    <p className="text-[10px] text-[#8C7B6B] mt-0.5">建议零售价 ¥{product.price}</p>
                  </div>
                  <button className="ml-3 flex items-center gap-1.5 bg-[#F5EFE8] text-[#B8973A] text-xs font-medium px-3 py-2 rounded-full flex-shrink-0">
                    <Download size={12} />
                    保存
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 推广文案 */}
        {activeTab === "copywriting" && (
          <div className="p-4 space-y-3">
            <div className="bg-[#FBF5E6] rounded-2xl px-4 py-3 text-xs text-[#8C7B6B] leading-relaxed flex items-start gap-2">
              <FileText size={13} className="text-[#B8973A] mt-0.5 flex-shrink-0" />
              以下文案由官方精心撰写，可一键复制使用，建议根据个人风格稍作调整再发布。
            </div>
            {copywritingTemplates.map(({ id, tag, title, text }) => (
              <div key={id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-[#B8973A] bg-[#FBF5E6] border border-[#B8973A]/30 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                    <span className="text-xs font-bold text-[#1A1208]">{title}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(id, text)}
                    className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                      copiedId === id
                        ? "bg-[#E8F5EE] text-[#2D8C5E]"
                        : "bg-[#F5EFE8] text-[#B8973A]"
                    }`}
                  >
                    {copiedId === id ? <Check size={11} /> : <Copy size={11} />}
                    {copiedId === id ? "已复制" : "复制"}
                  </button>
                </div>
                <p className="text-xs text-[#3D2B1A] leading-relaxed bg-[#FAF7F4] rounded-xl px-3 py-2.5 whitespace-pre-wrap">
                  {text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 佣金估算器 */}
        {activeTab === "calculator" && (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-bold text-[#1A1208] mb-4">佣金估算器</p>
              <div className="space-y-4">
                {[
                  { label: "商品售价（元）", value: salePrice, setter: setSalePrice, placeholder: "如：780", suffix: "¥" },
                  { label: "佣金比例（%）", value: commRate, setter: setCommRate, placeholder: "如：10", suffix: "%" },
                  { label: "销售数量（件）", value: qty, setter: setQty, placeholder: "如：1", suffix: "件" },
                ].map(({ label, value, setter, placeholder, suffix }) => (
                  <div key={label}>
                    <p className="text-xs text-[#8C7B6B] mb-1.5">{label}</p>
                    <div className="flex items-center gap-2 bg-[#FAF7F4] rounded-xl px-4 py-3">
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        placeholder={placeholder}
                        className="flex-1 text-sm font-bold text-[#1A1208] bg-transparent outline-none"
                      />
                      <span className="text-sm text-[#8C7B6B] flex-shrink-0">{suffix}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 surface-noir rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/60">预计直销佣金</span>
                  <span className="text-lg font-bold text-[#D4AF5A]">¥{commission.toFixed(2)}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/60">若下级复购，额外团队分佣</span>
                  <span className="text-sm font-bold text-[#B8973A]">+¥{teamComm.toFixed(2)}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/60">合计最高预期</span>
                  <span className="text-xl font-bold text-white">¥{(commission + teamComm).toFixed(2)}</span>
                </div>
              </div>

              <p className="text-[10px] text-[#C0B0A0] text-center mt-3 leading-relaxed">
                以上为估算值，实际佣金以结算时系统计算为准。<br />
                团队分佣需满足下级成交后方可获得。
              </p>
            </div>

            {/* 佣金费率说明 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-sm font-bold text-[#1A1208] mb-3">各等级佣金费率</p>
              <div className="space-y-2">
                {[
                  { level: "L1 普��经销商", direct: "10%", team: "3%", color: "#8C7B6B" },
                  { level: "L2 高级经销商", direct: "13%", team: "5%", color: "#B8973A" },
                  { level: "L3 白金经销商", direct: "15%", team: "8%", color: "#4A7CC7" },
                ].map(({ level, direct, team, color }) => (
                  <div key={level} className="flex items-center justify-between bg-[#FAF7F4] rounded-xl px-3 py-2.5">
                    <span className="text-xs font-medium text-[#1A1208]">{level}</span>
                    <div className="flex gap-3 text-[10px]">
                      <span style={{ color }}>直销 {direct}</span>
                      <span className="text-[#8C7B6B]">团队 {team}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="pb-4" />
      </div>
    </PhoneFrame>
  );
}
