"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const skinTypes = ["干性", "油性", "混合性", "中性", "敏感性"];
const skinConcerns = ["补水保湿", "美白提亮", "抗皱紧致", "控油祛痘", "修护屏障", "淡斑祛黄", "舒缓敏感", "抗氧化"];
const ageGroups = ["18岁以下", "18-25岁", "26-35岁", "36-45岁", "45岁以上"];
const budgets = ["100元以内", "100-300元", "300-600元", "600-1000元", "1000元以上"];

export default function PreferencesPage() {
  const router = useRouter();
  const [skinType, setSkinType] = useState("混合性");
  const [concerns, setConcerns] = useState<string[]>(["补水保湿", "美白提亮"]);
  const [ageGroup, setAgeGroup] = useState("26-35岁");
  const [budget, setBudget] = useState("300-600元");
  const [saved, setSaved] = useState(false);

  function toggleConcern(c: string) {
    setConcerns((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => router.back(), 1000);
  }

  return (
    <PhoneFrame>
      <div className="min-h-screen bg-[#F5EFE8] flex flex-col">
        <div className="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="font-bold text-[#1A1208]">肌肤偏好设置</span>
        </div>

        <div className="flex-1 overflow-y-auto pb-28 space-y-4 p-4">
          <p className="text-xs text-[#8C7B6B] leading-relaxed">根据您的肌肤情况，我们将为您精准推荐适合的护肤产品</p>

          {/* 肤质 */}
          <div className="bg-white rounded-2xl px-4 py-4">
            <p className="text-sm font-bold text-[#1A1208] mb-3">我的肤质</p>
            <div className="flex flex-wrap gap-2">
              {skinTypes.map((t) => (
                <button key={t} onClick={() => setSkinType(t)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${skinType === t ? "bg-[#1A1208] text-white" : "bg-[#F5EFE8] text-[#3D2B1A]"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 肌肤困扰（多选） */}
          <div className="bg-white rounded-2xl px-4 py-4">
            <p className="text-sm font-bold text-[#1A1208] mb-1">肌肤困扰</p>
            <p className="text-xs text-[#8C7B6B] mb-3">可多选</p>
            <div className="flex flex-wrap gap-2">
              {skinConcerns.map((c) => (
                <button key={c} onClick={() => toggleConcern(c)}
                  className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1 ${concerns.includes(c) ? "bg-[#B8973A] text-white" : "bg-[#F5EFE8] text-[#3D2B1A]"}`}>
                  {concerns.includes(c) && <Check size={12} />}
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 年龄段 */}
          <div className="bg-white rounded-2xl px-4 py-4">
            <p className="text-sm font-bold text-[#1A1208] mb-3">年龄段</p>
            <div className="flex flex-wrap gap-2">
              {ageGroups.map((a) => (
                <button key={a} onClick={() => setAgeGroup(a)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${ageGroup === a ? "bg-[#1A1208] text-white" : "bg-[#F5EFE8] text-[#3D2B1A]"}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* 预算偏好 */}
          <div className="bg-white rounded-2xl px-4 py-4">
            <p className="text-sm font-bold text-[#1A1208] mb-3">单品预算</p>
            <div className="flex flex-wrap gap-2">
              {budgets.map((b) => (
                <button key={b} onClick={() => setBudget(b)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${budget === b ? "bg-[#1A1208] text-white" : "bg-[#F5EFE8] text-[#3D2B1A]"}`}>
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#F0E8DC] px-4 py-3">
          <button onClick={handleSave}
            className={`w-full py-3 rounded-full text-sm font-bold transition-all ${saved ? "bg-[#B8973A] text-white" : "bg-[#1A1208] text-white"}`}>
            {saved ? "已保存，正在返回..." : "保存偏好设置"}
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
