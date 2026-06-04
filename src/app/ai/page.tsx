"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "你好！我是小兰，你的专属护肤顾问。无论是肤质分析、产品推荐还是护肤疑问，都可以问我哦~",
  },
];

const quickQuestions = [
  "我适合用哪款精华？",
  "如何改善毛孔粗大？",
  "混合肌怎么护肤？",
  "眼霜怎么正确使用？",
];

const mockReplies: Record<string, string> = {
  "我适合用哪款精华？": "根据你的肌肤状态，我推荐「云肌黄金修护精华」，富含玻色因和烟酰胺，主打提亮抗老，适合日常维稳使用。每天早晚各一次，3 到 4 滴按压全脸即可。",
  "如何改善毛孔粗大？": "改善毛孔需要坚持做好以下几点：①彻底清洁，避免皮脂堆积；②使用含水杨酸或烟酰胺成分的产品；③严格防晒，紫外线会让毛孔更明显。我们的「净颜收毛孔精华水」非常适合你。",
  "混合肌怎么护肤？": "混合肌护肤的核心是「分区护理」。T区控油，用轻薄质地的保湿水；两颊补水，可以叠加一点面霜。避免全脸使用太厚重的产品。",
  "眼霜怎么正确使用？": "眼霜用量是绿豆大小即可，不需要太多。用无名指轻轻点按眼周，从眼尾到眼头方向轻弹吸收，避免大力拉扯。早晚各一次，坚持使用效果更明显。",
};

export default function AiPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply =
        mockReplies[text] ||
        "感谢你的提问！这个问题很专业，小兰正在为你查阅资料，建议你也可以点击下方商品了解详情，或联系我们的人工客服获取更专业的解答。";
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", text: reply },
      ]);
      setLoading(false);
    }, 900);
  };

  return (
    <PhoneFrame>
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 bg-[#1A1208] px-4 pt-3 pb-3 flex items-center gap-3">
        <Link href="/" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10">
          <ArrowLeft size={18} className="text-white" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <div className="w-8 h-8 rounded-full bg-[#B8973A] flex items-center justify-center">
            <Sparkles size={15} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">问小兰</p>
            <p className="text-[10px] text-[#B8973A]">AI 护肤顾问 · 在线</p>
          </div>
        </div>
      </header>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-36">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-[#B8973A] flex items-center justify-center flex-shrink-0 mb-0.5">
                <Sparkles size={13} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#1A1208] text-white rounded-br-sm"
                  : "bg-white text-[#1A1208] rounded-bl-sm shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-full bg-[#B8973A] flex items-center justify-center flex-shrink-0">
              <Sparkles size={13} className="text-white" />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#B8973A] animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* 快捷提问 + 输入框 */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-[#FAF7F4] border-t border-[#E8DDD0] px-4 pt-3 pb-3 z-40">
        {/* 快捷问题 */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="flex-shrink-0 text-[11px] text-[#B8973A] border border-[#B8973A]/40 bg-white rounded-full px-3 py-1.5 font-medium active:bg-[#F5EFE8] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
        {/* 输入框 */}
        <div className="flex items-center gap-2 bg-white rounded-full border border-[#E8DDD0] px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="问小兰你的护肤问题..."
            className="flex-1 text-sm bg-transparent outline-none text-[#1A1208] placeholder:text-[#C0B0A0]"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-full bg-[#1A1208] flex items-center justify-center disabled:opacity-40 active:scale-95 transition-transform flex-shrink-0"
            aria-label="发送"
          >
            <Send size={14} className="text-[#D4AF5A]" />
          </button>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
