"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Users, Copy, Share2, ChevronRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

const product = products[0];
const slashActivity = {
  id: "1",
  originalPrice: 598,
  slashPrice: 299,
  currentPrice: 420,
  progress: 65,
  endTime: new Date(Date.now() + 48 * 3600 * 1000),
  targetCount: 5,
  slashedCount: 3,
  helpers: [
    { name: "张女士", amount: 58, avatar: null },
    { name: "王先生", amount: 72, avatar: null },
    { name: "李女士", amount: 48, avatar: null },
  ],
};

export default function SlashDetailPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const remaining = slashActivity.originalPrice - slashActivity.currentPrice;
  const needed = slashActivity.targetCount - slashActivity.slashedCount;

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <PhoneFrame>
      <div className="min-h-screen bg-[#F5EFE8] flex flex-col">
        <div className="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="font-bold text-[#1A1208]">砍价详情</span>
        </div>

        <div className="flex-1 overflow-y-auto pb-32 space-y-3 p-4">
          {/* 商品卡 */}
          <div className="bg-white rounded-2xl p-4 flex gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#F5EFE8]">
              <Image src={product.image} alt={product.name} width={96} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#1A1208] text-sm leading-snug">{product.name}</p>
              <p className="text-[#8C7B6B] text-xs mt-0.5">{product.subtitle}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-xl font-bold text-[#B8973A]">¥{slashActivity.currentPrice}</span>
                <span className="text-sm text-[#C4A882] line-through">¥{slashActivity.originalPrice}</span>
              </div>
              <p className="text-xs text-[#8C7B6B] mt-1">已砍 ¥{remaining} · 还需 {needed} 人帮砍</p>
            </div>
          </div>

          {/* 进度 */}
          <div className="bg-white rounded-2xl px-5 py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-[#1A1208]">砍价进度</span>
              <span className="text-xs text-[#B8973A]">{slashActivity.progress}%</span>
            </div>
            <div className="h-2 bg-[#F0E8DC] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#B8973A] to-[#D4AF5A] rounded-full" style={{ width: `${slashActivity.progress}%` }} />
            </div>
            <div className="flex justify-between text-xs text-[#8C7B6B] mt-1.5">
              <span>目标价 ¥{slashActivity.slashPrice}</span>
              <span>还差 ¥{slashActivity.currentPrice - slashActivity.slashPrice}</span>
            </div>
          </div>

          {/* 帮砍记录 */}
          <div className="bg-white rounded-2xl px-4 py-4">
            <p className="text-sm font-bold text-[#1A1208] mb-3">帮砍记录</p>
            <div className="space-y-3">
              {slashActivity.helpers.map((h) => (
                <div key={h.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F0E8DC] flex items-center justify-center">
                      <Users size={16} className="text-[#B8973A]" />
                    </div>
                    <span className="text-sm text-[#3D2B1A]">{h.name}</span>
                  </div>
                  <span className="text-sm font-bold text-[#B8973A]">砍掉 ¥{h.amount}</span>
                </div>
              ))}
              {Array.from({ length: needed }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border-2 border-dashed border-[#E8DDD0] flex items-center justify-center">
                    <span className="text-[#C4A882] text-lg">+</span>
                  </div>
                  <span className="text-sm text-[#C4A882]">等待好友帮砍...</span>
                </div>
              ))}
            </div>
          </div>

          {/* 邀请卡 */}
          <div className="bg-[#1A1208] rounded-2xl px-5 py-4">
            <p className="text-white font-bold mb-1">邀请好友帮砍价</p>
            <p className="text-[#C4A882] text-xs mb-3">再邀请 {needed} 位好友帮砍，即可达到最低价</p>
            <button onClick={handleCopy} className="w-full bg-[#B8973A] text-white py-2.5 rounded-full text-sm font-bold flex items-center justify-center gap-2">
              <Copy size={15} />
              {copied ? "链接已复制" : "复制砍价链接"}
            </button>
          </div>

          {/* 活动规则 */}
          <div className="bg-white rounded-2xl px-4 py-4">
            <button className="w-full flex justify-between items-center text-sm">
              <span className="font-bold text-[#1A1208]">活动规则</span>
              <ChevronRight size={16} className="text-[#8C7B6B]" />
            </button>
            <div className="mt-2 text-xs text-[#8C7B6B] space-y-1.5 leading-relaxed">
              <p>1. 发起砍价后，分享链接邀请好友帮砍，每位好友可砍一刀。</p>
              <p>2. 达到砍价目标价后，可以用最低价购买该商品。</p>
              <p>3. 活动期间每人只能发起一次砍价，帮砍不限次数。</p>
              <p>4. 砍价活动有效期 48 小时，到期自动失效。</p>
            </div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#F0E8DC] px-4 py-3 flex gap-2">
          <button className="flex-1 py-3 rounded-full border border-[#E8DDD0] text-sm font-medium text-[#3D2B1A] flex items-center justify-center gap-1.5">
            <Share2 size={15} />
            分享给好友
          </button>
          <button className="flex-1 py-3 rounded-full bg-[#B8973A] text-white text-sm font-bold">
            立即购买 ¥{slashActivity.currentPrice}
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
