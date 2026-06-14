"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const questions = [
  { id: 1, type: "single", question: "您的肤质是？", options: ["干性", "油性", "混合性", "中性", "敏感性"] },
  { id: 2, type: "multi", question: "您主要的护肤诉求是？（可多选）", options: ["补水保湿", "美白提亮", "抗衰紧致", "控油祛痘", "修护屏障", "淡化痘印"] },
  { id: 3, type: "single", question: "您的月均护肤预算是？", options: ["300元以内", "300-600元", "600-1000元", "1000元以上"] },
  { id: 4, type: "single", question: "您最关注护肤品的哪个方面？", options: ["成分安全性", "品牌知名度", "效果口碑", "价格性价比", "包装设计"] },
];

export default function QuestionnairePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const selectSingle = (qId: number, opt: string) =>
    setAnswers(a => ({ ...a, [qId]: opt }));

  const toggleMulti = (qId: number, opt: string) =>
    setAnswers(a => {
      const cur = (a[qId] as string[]) || [];
      return { ...a, [qId]: cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt] };
    });

  const allAnswered = questions.every(q => {
    const ans = answers[q.id];
    return q.type === "multi" ? (ans as string[])?.length > 0 : !!ans;
  });

  if (submitted) {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full bg-[#FAF7F4] items-center justify-center gap-5 p-6">
          <div className="w-16 h-16 rounded-full bg-[#FFF7E6] flex items-center justify-center">
            <CheckCircle2 size={32} className="text-[#B8973A]" />
          </div>
          <h2 className="text-lg font-bold text-[#1A1208]">感谢您的反馈！</h2>
          <p className="text-sm text-[#8C7B6B] text-center leading-relaxed">
            我们已收到您的肤质报告，将为您推荐最适合的护肤方案。<br />          积分 +25 已发放至您的账户。
          </p>
          <button onClick={() => router.replace("/")} className="w-full py-3.5 bg-[#1A1208] text-white rounded-xl text-sm font-bold">
            去首页看看推荐
          </button>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">肌肤测评问卷</span>
          <span className="text-xs text-[#B8973A]">+25积分</span>
        </div>

        {/* 进度条 */}
        <div className="px-4 py-2 bg-white border-b border-[#F0E8DC]">
          <div className="flex justify-between text-xs text-[#8C7B6B] mb-1.5">
            <span>填写进度</span>
            <span>{Object.keys(answers).length}/{questions.length}</span>
          </div>
          <div className="h-1 bg-[#F0E8DC] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B8973A] rounded-full transition-all"
              style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {questions.map((q, qi) => (
            <div key={q.id} className="bg-white rounded-2xl p-4">
              <p className="text-sm font-bold text-[#1A1208] mb-3">
                <span className="text-[#B8973A] mr-1">{qi + 1}.</span>{q.question}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map(opt => {
                  const sel = q.type === "single"
                    ? answers[q.id] === opt
                    : ((answers[q.id] as string[]) || []).includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => q.type === "single" ? selectSingle(q.id, opt) : toggleMulti(q.id, opt)}
                      className={`text-sm py-2.5 px-3 rounded-xl border text-left transition-all ${
                        sel ? "border-[#B8973A] bg-[#FFF7E6] text-[#B8973A] font-medium" : "border-[#F0E8DC] text-[#3D2B1A]"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-4 bg-white border-t border-[#F0E8DC]">
          <button
            onClick={() => allAnswered && setSubmitted(true)}
            className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${
              allAnswered ? "bg-[#1A1208] text-white" : "bg-[#F0E8DC] text-[#B8A898] cursor-not-allowed"
            }`}
          >
            提交问卷（领取 25 积分）
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
