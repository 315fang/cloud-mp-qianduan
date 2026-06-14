"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Plus, Check } from "lucide-react";
import Image from "next/image";
import PhoneFrame from "@/components/PhoneFrame";

const product = { name: "焕颜臻萃精华", spec: "30ml", image: "/images/product-serum.png" };
const quickTags = ["质地好", "包装精美", "物流快", "补水效果好", "性价比高", "回购了"];

export default function ReviewPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<number[]>([]);
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (t: string) => setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  if (submitted) {
    return (
      <PhoneFrame hideNav>
        <div className="flex flex-col items-center justify-center h-[80vh] px-6">
          <div className="w-16 h-16 rounded-full bg-[#E8F5EC] flex items-center justify-center mb-4">
            <Check size={32} className="text-[#3D8B5F]" />
          </div>
          <h2 className="text-lg font-bold text-[#1A1208]">评价提交成功</h2>
          <p className="text-sm text-[#8C7B6B] mt-2 text-center">感谢你的反馈，已奖励 30 积分</p>
          <button onClick={() => router.push("/profile")} className="mt-6 px-8 py-3 bg-[#B8973A] text-white text-sm font-bold rounded-xl">返回我的</button>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame hideNav>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]" aria-label="返回">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">发表评价</span>
          <span className="w-8" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* 商品信息 */}
          <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#F5EFE8] shrink-0">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A1208]">{product.name}</p>
              <p className="text-xs text-[#8C7B6B] mt-0.5">{product.spec}</p>
            </div>
          </div>

          {/* 星级评分 */}
          <div className="bg-white rounded-2xl p-4">
            <p className="text-sm font-bold text-[#1A1208] mb-3">商品评分</p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRating(n)} aria-label={`${n} 星`}>
                  <Star size={30} className={n <= rating ? "fill-[#FFB800] text-[#FFB800]" : "text-[#E0D5C5]"} />
                </button>
              ))}
              {rating > 0 && <span className="ml-2 text-xs text-[#B8973A]">{["", "很差", "一般", "还行", "满意", "超赞"][rating]}</span>}
            </div>
          </div>

          {/* 评价输入 */}
          <div className="bg-white rounded-2xl p-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="分享你的使用感受，帮助更多人挑选好物～"
              rows={4}
              className="w-full text-sm text-[#1A1208] bg-[#FAF7F4] rounded-xl p-3 outline-none resize-none placeholder:text-[#B8A898]"
            />
            {/* 快捷标签 */}
            <div className="flex flex-wrap gap-2 mt-3">
              {quickTags.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`text-xs px-3 py-1.5 rounded-full border ${tags.includes(t) ? "border-[#B8973A] bg-[#FFF7E6] text-[#B8973A]" : "border-[#E8DDD0] text-[#8C7B6B]"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 图片上传 */}
          <div className="bg-white rounded-2xl p-4">
            <p className="text-sm font-bold text-[#1A1208] mb-3">上传图片</p>
            <div className="grid grid-cols-3 gap-2">
              {images.map((i) => (
                <div key={i} className="aspect-square rounded-xl bg-[#F5EFE8] flex items-center justify-center">
                  <Image src={product.image} alt="" width={80} height={80} className="w-full h-full object-cover rounded-xl" />
                </div>
              ))}
              {images.length < 9 && (
                <button onClick={() => setImages([...images, images.length])} className="aspect-square rounded-xl border-2 border-dashed border-[#E0D5C5] flex flex-col items-center justify-center gap-1 text-[#B8A898]">
                  <Plus size={20} />
                  <span className="text-[10px]">{images.length}/9</span>
                </button>
              )}
            </div>
          </div>

          {/* 匿名开关 */}
          <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
            <span className="text-sm text-[#1A1208]">匿名评价</span>
            <button
              onClick={() => setAnonymous(!anonymous)}
              className={`w-11 h-6 rounded-full transition-colors relative ${anonymous ? "bg-[#B8973A]" : "bg-[#E0D5C5]"}`}
              aria-label="匿名开关"
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${anonymous ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>

        {/* 提交 */}
        <div className="px-4 py-3 bg-white border-t border-[#F0E8DC]">
          <button
            onClick={() => rating > 0 && setSubmitted(true)}
            disabled={rating === 0}
            className={`w-full py-3 text-sm font-bold rounded-xl ${rating > 0 ? "bg-[#B8973A] text-white" : "bg-[#E8DDD0] text-[#8C7B6B]"}`}
          >
            {rating === 0 ? "请先评分" : "提交评价"}
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
