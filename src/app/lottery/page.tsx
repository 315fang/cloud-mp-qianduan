"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Gift, Trophy } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const PRIZES = [
  { id: 1, name: "精华小样", type: "product", emoji: "✨" },
  { id: 2, name: "50积分", type: "points", emoji: "⭐" },
  { id: 3, name: "9折优惠券", type: "coupon", emoji: "🎫" },
  { id: 4, name: "谢谢参与", type: "empty", emoji: "🌸" },
  { id: 5, name: "面霜小样", type: "product", emoji: "💧" },
  { id: 6, name: "100积分", type: "points", emoji: "⭐" },
  { id: 7, name: "免邮券", type: "coupon", emoji: "📦" },
  { id: 8, name: "谢谢参与", type: "empty", emoji: "🌸" },
];

const COST = 100;

const mockRecords = [
  { name: "用户 183****8821", prize: "精华小样", time: "2分钟前" },
  { name: "用户 186****2233", prize: "100积分", time: "5分钟前" },
  { name: "用户 139****5544", prize: "9折优惠券", time: "8分钟前" },
];

export default function LotteryPage() {
  const router = useRouter();
  const [points, setPoints] = useState(680);
  const [spinning, setSpinning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [wonPrize, setWonPrize] = useState<typeof PRIZES[0] | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [records, setRecords] = useState(mockRecords);

  const handleDraw = () => {
    if (points < COST) { alert("积分不足，无法抽奖"); return; }
    if (spinning) return;
    setWonPrize(null);
    setShowResult(false);
    setSpinning(true);
    setPoints(p => p - COST);

    const targetIndex = Math.floor(Math.random() * PRIZES.length);
    let current = 0;
    let speed = 120;
    let count = 0;
    const total = 24 + targetIndex;

    const step = () => {
      current = (current + 1) % PRIZES.length;
      setActiveIndex(current);
      count++;
      if (count < total - 8) {
        speed = 80;
      } else {
        speed = 80 + (count - (total - 8)) * 30;
      }
      if (count < total) {
        setTimeout(step, speed);
      } else {
        setActiveIndex(targetIndex);
        setSpinning(false);
        setWonPrize(PRIZES[targetIndex]);
        setShowResult(true);
        setRecords(prev => [
          { name: "您", prize: PRIZES[targetIndex].name, time: "刚刚" },
          ...prev.slice(0, 4),
        ]);
      }
    };
    setTimeout(step, speed);
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#1A1208] overflow-hidden">
        {/* 导航 */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-white">积分抽奖</span>
          <div className="w-8" />
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* 积分头部 */}
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-2">
              <Star size={14} className="text-[#B8973A]" fill="#B8973A" />
              <span className="text-white font-bold">{points}</span>
              <span className="text-white/60 text-sm">积分</span>
            </div>
            <span className="text-white/60 text-sm">每次消耗 {COST} 积分</span>
          </div>

          {/* 转盘 */}
          <div className="px-6 py-2">
            <div className="bg-[#2A1E0E] rounded-2xl p-4 relative">
              {/* 转盘格子 3x3，中间为按钮 */}
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2, 7, -1, 3, 6, 5, 4].map((idx, pos) => {
                  if (idx === -1) {
                    return (
                      <button
                        key="center"
                        onClick={handleDraw}
                        disabled={spinning || points < COST}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                          spinning ? "bg-[#B8973A]/60" : points < COST ? "bg-white/10" : "bg-[#B8973A] active:scale-95"
                        }`}
                      >
                        <Gift size={20} className="text-white" />
                        <span className="text-white text-[11px] font-bold leading-tight">
                          {spinning ? "抽奖中" : "立即抽奖"}
                        </span>
                      </button>
                    );
                  }
                  const prize = PRIZES[idx];
                  const isActive = activeIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-75 ${
                        isActive ? "bg-[#B8973A] scale-105" : "bg-[#3D2B1A]"
                      }`}
                    >
                      <span className="text-lg">{prize.emoji}</span>
                      <span className={`text-[10px] text-center leading-tight ${isActive ? "text-white font-bold" : "text-white/70"}`}>
                        {prize.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 获奖弹窗 */}
          {showResult && wonPrize && (
            <div className="mx-4 mt-4 bg-[#FFF7E6] rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B8973A] flex items-center justify-center shrink-0">
                <Trophy size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A1208]">恭喜获得：{wonPrize.name}</p>
                <p className="text-xs text-[#8C7B6B] mt-0.5">奖励已发放至您的账户</p>
              </div>
            </div>
          )}

          {/* 奖品说明 */}
          <div className="px-4 mt-4">
            <h3 className="text-sm font-bold text-white mb-3">可获得的奖品</h3>
            <div className="grid grid-cols-4 gap-2">
              {PRIZES.filter(p => p.type !== "empty").map(p => (
                <div key={p.id} className="bg-[#2A1E0E] rounded-xl p-2 flex flex-col items-center gap-1">
                  <span className="text-xl">{p.emoji}</span>
                  <span className="text-[10px] text-white/70 text-center">{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 中奖记录 */}
          <div className="px-4 mt-4 pb-4">
            <h3 className="text-sm font-bold text-white mb-3">中奖动态</h3>
            <div className="space-y-2">
              {records.map((r, i) => (
                <div key={i} className="flex items-center justify-between bg-[#2A1E0E] rounded-xl px-3 py-2.5">
                  <span className="text-xs text-white/70">{r.name} 获得了</span>
                  <span className="text-xs text-[#B8973A] font-medium">{r.prize}</span>
                  <span className="text-xs text-white/40">{r.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
