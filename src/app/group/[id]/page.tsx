"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Users, Clock, Share2, CheckCircle2 } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

const product = products[1];
const groupActivity = {
  id: "1",
  groupPrice: 328,
  originalPrice: 428,
  minMembers: 3,
  currentMembers: 2,
  endTime: new Date(Date.now() + 23 * 3600 * 1000 + 1800000),
  members: [
    { name: "王团长", isLeader: true, avatar: null },
    { name: "陈女士", isLeader: false, avatar: null },
  ],
};

export default function GroupDetailPage() {
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const needed = groupActivity.minMembers - groupActivity.currentMembers;

  const hours = Math.floor((groupActivity.endTime.getTime() - Date.now()) / 3600000);
  const mins = Math.floor(((groupActivity.endTime.getTime() - Date.now()) % 3600000) / 60000);

  return (
    <PhoneFrame>
      <div className="min-h-screen bg-[#F5EFE8] flex flex-col">
        <div className="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="font-bold text-[#1A1208]">拼团详情</span>
        </div>

        <div className="flex-1 overflow-y-auto pb-32 space-y-3 p-4">
          {/* 倒计时提示 */}
          <div className="surface-noir rounded-2xl px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Clock size={15} className="text-[#B8973A]" />
              <span className="text-sm">拼团剩余时间</span>
            </div>
            <span className="text-[#B8973A] font-bold text-sm">{hours}小时 {mins}分钟</span>
          </div>

          {/* 商品卡 */}
          <div className="bg-white rounded-2xl p-4 flex gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#F5EFE8]">
              <Image src={product.image} alt={product.name} width={96} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#1A1208] text-sm">{product.name}</p>
              <p className="text-[#8C7B6B] text-xs mt-0.5">{product.subtitle}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-xl font-bold text-[#B8973A]">¥{groupActivity.groupPrice}</span>
                <span className="text-sm text-[#C4A882] line-through">¥{groupActivity.originalPrice}</span>
              </div>
              <p className="text-xs text-[#8C7B6B] mt-1">{groupActivity.minMembers}人拼团 · 还差 {needed} 人</p>
            </div>
          </div>

          {/* 拼团成员 */}
          <div className="bg-white rounded-2xl px-4 py-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-bold text-[#1A1208]">团员 ({groupActivity.currentMembers}/{groupActivity.minMembers})</p>
              <span className="text-xs text-[#B8973A]">还差 {needed} 人成团</span>
            </div>
            <div className="flex gap-3">
              {groupActivity.members.map((m) => (
                <div key={m.name} className="flex flex-col items-center gap-1.5">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#F0E8DC] flex items-center justify-center">
                      <Users size={20} className="text-[#B8973A]" />
                    </div>
                    {m.isLeader && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#B8973A] text-white text-[9px] px-1.5 rounded-full">团长</span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#3D2B1A]">{m.name}</span>
                </div>
              ))}
              {Array.from({ length: needed }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#E8DDD0] flex items-center justify-center">
                    <span className="text-[#C4A882] text-2xl font-light">+</span>
                  </div>
                  <span className="text-[10px] text-[#C4A882]">待加入</span>
                </div>
              ))}
            </div>
          </div>

          {/* 成功后权益 */}
          <div className="bg-white rounded-2xl px-4 py-4">
            <p className="text-sm font-bold text-[#1A1208] mb-3">成团后您将获得</p>
            <div className="space-y-2.5">
              {[
                `以 ¥${groupActivity.groupPrice} 优惠价购买（节省 ¥${groupActivity.originalPrice - groupActivity.groupPrice}）`,
                "赠送 200 积分",
                "免费顺丰包邮",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#B8973A] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-[#3D2B1A]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 活动规则 */}
          <div className="bg-white rounded-2xl px-4 py-4">
            <p className="text-sm font-bold text-[#1A1208] mb-2">活动规则</p>
            <div className="text-xs text-[#8C7B6B] space-y-1.5 leading-relaxed">
              <p>1. 参团后需在活动期内凑齐 {groupActivity.minMembers} 人，方可成团并发货。</p>
              <p>2. 未成团时自动退款，无需手动申请。</p>
              <p>3. 每人限购一份，不可叠加其他优惠。</p>
              <p>4. 拼团商品不支持退换货，请确认后再下单。</p>
            </div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#F0E8DC] px-4 py-3 flex gap-2">
          <button className="w-11 h-11 rounded-full border border-[#E8DDD0] flex items-center justify-center flex-shrink-0">
            <Share2 size={18} className="text-[#3D2B1A]" />
          </button>
          <button
            onClick={() => setJoined(true)}
            className={`flex-1 py-3 rounded-full text-sm font-bold transition-colors ${joined ? "bg-[#F0E8DC] text-[#B8973A]" : "bg-[#B8973A] text-white"}`}
          >
            {joined ? "已参团 · 等待成团" : `参团 ¥${groupActivity.groupPrice}`}
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
