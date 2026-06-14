"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function PrivacyPage() {
  const router = useRouter();
  const [personalizedAds, setPersonalizedAds] = useState(true);
  const [dataAnalysis, setDataAnalysis] = useState(true);
  const [locationAccess, setLocationAccess] = useState(false);

  const toggles = [
    { label: "个性化推荐", desc: "基于浏览记录推送相关商品", value: personalizedAds, set: setPersonalizedAds },
    { label: "数据分析", desc: "帮助改善产品体验", value: dataAnalysis, set: setDataAnalysis },
    { label: "位置信息", desc: "用于推荐附近服务网点", value: locationAccess, set: setLocationAccess },
  ];

  const links = [
    { label: "隐私政策", href: "#" },
    { label: "用户协议", href: "#" },
    { label: "Cookie 政策", href: "#" },
    { label: "申请删除账号", href: "#" },
  ];

  return (
    <PhoneFrame hideNav>
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]"
        >
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </button>
        <h1 className="text-base font-bold text-[#1A1208]">隐私设置</h1>
        <div className="w-8" />
      </header>

      <div className="px-4 space-y-3 pb-8">
        <div className="bg-white rounded-2xl overflow-hidden">
          <p className="text-xs font-semibold text-[#8C7B6B] px-4 py-2.5 border-b border-[#F9F5F0]">
            数据与权限
          </p>
          {toggles.map(({ label, desc, value, set }, idx) => (
            <div
              key={label}
              className={`flex items-center gap-3 px-4 py-3.5 ${idx < toggles.length - 1 ? "border-b border-[#F9F5F0]" : ""}`}
            >
              <div className="flex-1">
                <p className="text-sm text-[#1A1208]">{label}</p>
                <p className="text-[11px] text-[#8C7B6B] mt-0.5">{desc}</p>
              </div>
              <button
                onClick={() => set(!value)}
                className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${value ? "bg-[#1A1208]" : "bg-[#D5C9BC]"}`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl overflow-hidden">
          {links.map(({ label, href }, idx) => (
            <a
              key={label}
              href={href}
              className={`flex items-center px-4 py-3.5 active:bg-[#FAF7F4] ${idx < links.length - 1 ? "border-b border-[#F9F5F0]" : ""}`}
            >
              <span className={`flex-1 text-sm ${label === "申请删除账号" ? "text-red-400" : "text-[#1A1208]"}`}>
                {label}
              </span>
              <ChevronRight size={15} className="text-[#C0B0A0]" />
            </a>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
