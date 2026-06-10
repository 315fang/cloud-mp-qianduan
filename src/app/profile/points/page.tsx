"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star, CheckCircle2, Zap, Crown, Gift, Snowflake, Flame, Ticket, ShoppingBag, ChevronRight } from "lucide-react";
import Link from "next/link";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

const account = { level: 2, levelName: "精英会员", balance: 1240, frozen: 180, total: 3580, nextLevel: { name: "尊享会员", threshold: 5000 } };

// 签到：连续天数与本周打卡进度
const signIn = {
  streak: 5,
  signedToday: false,
  week: [
    { day: "一", points: 5, done: true },
    { day: "二", points: 5, done: true },
    { day: "三", points: 10, done: true },
    { day: "四", points: 10, done: true },
    { day: "五", points: 15, done: true },
    { day: "六", points: 20, done: false },
    { day: "日", points: 30, done: false },
  ],
};

// 积分兑换：活动商品（取数据中的商品作演示）
const redeemGoods = products.slice(0, 4).map((p, i) => ({
  ...p,
  cost: [800, 1200, 1500, 2000][i],
}));

// 赚积分任务
const tasks = [
  { id: "t1", title: "每日签到", desc: "连续签到得更多", points: 5, done: false },
  { id: "t2", title: "完成一笔订单", desc: "消费 1 元得 1 积分", points: 100, done: false },
  { id: "t3", title: "分享好物", desc: "分享商品给好友", points: 20, done: true },
  { id: "t4", title: "完善个人资料", desc: "补全资料信息", points: 50, done: true },
  { id: "t5", title: "邀请新用户", desc: "好友注册成功", points: 200, done: false },
];

// 积分流水
const transactions = [
  { id: "x1", title: "购物消费奖励", date: "2024-12-08 14:32", points: 128 },
  { id: "x2", title: "积分抽奖消耗", date: "2024-12-07 20:15", points: -100 },
  { id: "x3", title: "每日签到", date: "2024-12-07 09:02", points: 15 },
  { id: "x4", title: "分享好物奖励", date: "2024-12-06 18:44", points: 20 },
  { id: "x5", title: "兑换优惠券", date: "2024-12-05 11:20", points: -500 },
];

export default function PointsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"tasks" | "logs" | "redeem">("tasks");
  const [signedToday, setSignedToday] = useState(signIn.signedToday);
  const progress = Math.min((account.balance / account.nextLevel.threshold) * 100, 100);

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        {/* 导航 */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">积分中心</span>
          <Link href="/lottery" className="text-xs text-[#B8973A] font-medium">去抽奖</Link>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* 主卡片 */}
          <div className="mx-4 mt-4 bg-[#1A1208] rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="px-2.5 py-0.5 bg-[#B8973A] rounded-full">
                <span className="text-[11px] font-bold text-white">Lv.{account.level} {account.levelName}</span>
              </div>
              <span className="text-white/50 text-xs">累计 {account.total.toLocaleString()} 积分</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold leading-none">{account.balance.toLocaleString()}</span>
              <span className="text-white/60 mb-0.5 text-sm">可用积分</span>
            </div>
            {/* 双口径：可用 / 冻结待入账 */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                <Snowflake size={12} className="text-[#7CA9D4]" />
                <span className="text-[11px] text-white/70">冻结待入账 {account.frozen}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                <Flame size={12} className="text-[#D4845A]" />
                <span className="text-[11px] text-white/70">已连签 {signIn.streak} 天</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/50 mb-1.5">
                <span>距离 {account.nextLevel.name} 还差 {account.nextLevel.threshold - account.balance} 积分</span>
                <span>{account.balance}/{account.nextLevel.threshold}</span>
              </div>
              <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div className="h-full bg-[#B8973A] rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>
            {/* 快捷操作 */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
              {[
                { label: "积分兑换", icon: Gift, onClick: () => setTab("redeem") },
                { label: "抽奖中心", icon: Star, href: "/lottery" },
                { label: "积分流水", icon: Crown, onClick: () => setTab("logs") },
              ].map(({ label, icon: Icon, href, onClick }) =>
                href ? (
                  <Link key={label} href={href} className="flex flex-col items-center gap-1.5">
                    <Icon size={16} className="text-[#B8973A]" />
                    <span className="text-white/70 text-[11px]">{label}</span>
                  </Link>
                ) : (
                  <button key={label} onClick={onClick} className="flex flex-col items-center gap-1.5">
                    <Icon size={16} className="text-[#B8973A]" />
                    <span className="text-white/70 text-[11px]">{label}</span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* 每日签到卡 */}
          <div className="mx-4 mt-4 bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame size={16} className="text-[#D4845A]" />
                <span className="text-sm font-bold text-[#1A1208]">每日签到</span>
                <span className="text-[11px] text-[#8C7B6B]">连续签到 {signIn.streak} 天</span>
              </div>
              <button
                onClick={() => setSignedToday(true)}
                disabled={signedToday}
                className={`text-xs font-medium px-4 py-1.5 rounded-full ${
                  signedToday ? "bg-[#F5EFE8] text-[#B8A898]" : "bg-[#B8973A] text-white"
                }`}
              >
                {signedToday ? "今日已签" : "立即签到"}
              </button>
            </div>
            <div className="flex justify-between">
              {signIn.week.map((d, i) => {
                const done = d.done || (signedToday && i === signIn.streak);
                return (
                  <div key={d.day} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      done ? "bg-[#B8973A]" : "bg-[#F5EFE8]"
                    }`}>
                      {done ? (
                        <CheckCircle2 size={15} className="text-white" />
                      ) : (
                        <span className="text-[10px] font-bold text-[#B8973A]">+{d.points}</span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8C7B6B]">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tab */}
          <div className="flex mx-4 mt-4 bg-[#F5EFE8] rounded-xl p-1">
            {[{ key: "tasks", label: "积分任务" }, { key: "logs", label: "积分流水" }, { key: "redeem", label: "积分兑换" }].map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as typeof tab)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${tab === t.key ? "bg-white text-[#1A1208] shadow-sm" : "text-[#8C7B6B]"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-4 space-y-2.5">
            {/* 赚积分任务 */}
            {tab === "tasks" && tasks.map(task => (
              <div key={task.id} className="bg-white rounded-xl px-4 py-3 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${task.done ? "bg-[#F5EFE8]" : "bg-[#FFF7E6]"}`}>
                  {task.done
                    ? <CheckCircle2 size={18} className="text-[#B8A898]" />
                    : <Zap size={18} className="text-[#B8973A]" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium leading-tight ${task.done ? "text-[#B8A898]" : "text-[#1A1208]"}`}>{task.title}</p>
                  <p className="text-xs text-[#8C7B6B] mt-0.5 truncate">{task.desc}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-sm font-bold ${task.done ? "text-[#B8A898]" : "text-[#B8973A]"}`}>+{task.points}</span>
                  <button
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium ${task.done ? "bg-[#F5EFE8] text-[#B8A898]" : "bg-[#B8973A] text-white"}`}
                    disabled={task.done}
                  >
                    {task.done ? "已完成" : "去完成"}
                  </button>
                </div>
              </div>
            ))}

            {/* 积分流水 */}
            {tab === "logs" && transactions.map(t => (
              <div key={t.id} className="bg-white rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${t.points > 0 ? "bg-[#E8F5E9]" : "bg-[#FFEBEE]"}`}>
                    <Star size={14} className={t.points > 0 ? "text-[#388E3C]" : "text-[#E57373]"} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1208]">{t.title}</p>
                    <p className="text-xs text-[#B8A898] mt-0.5">{t.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${t.points > 0 ? "text-[#388E3C]" : "text-[#E57373]"}`}>
                  {t.points > 0 ? "+" : ""}{t.points}
                </span>
              </div>
            ))}

            {/* 积分兑换 */}
            {tab === "redeem" && (
              <div className="space-y-3">
                {/* 抽奖与活动入口卡 */}
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/lottery" className="bg-[#1A1208] rounded-2xl p-4 flex flex-col gap-2">
                    <div className="w-9 h-9 rounded-full bg-[#B8973A]/20 flex items-center justify-center">
                      <Ticket size={18} className="text-[#D4AF5A]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">积分抽奖</p>
                      <p className="text-[11px] text-white/50 mt-0.5">100 积分/次 · 赢好礼</p>
                    </div>
                    <span className="text-[11px] text-[#D4AF5A] flex items-center gap-0.5">立即抽奖 <ChevronRight size={12} /></span>
                  </Link>
                  <Link href="/products?from=points" className="bg-[#FFF7E6] rounded-2xl p-4 flex flex-col gap-2 border border-[#F0E0B8]">
                    <div className="w-9 h-9 rounded-full bg-[#B8973A]/15 flex items-center justify-center">
                      <ShoppingBag size={18} className="text-[#B8973A]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1A1208]">活动商品</p>
                      <p className="text-[11px] text-[#8C7B6B] mt-0.5">积分加价购 · 限时</p>
                    </div>
                    <span className="text-[11px] text-[#B8973A] flex items-center gap-0.5">去逛逛 <ChevronRight size={12} /></span>
                  </Link>
                </div>

                {/* 可兑换商品列表 */}
                <p className="text-xs font-semibold text-[#8C7B6B] pt-1">积分好物</p>
                <div className="grid grid-cols-2 gap-3">
                  {redeemGoods.map((g) => (
                    <div key={g.id} className="bg-white rounded-2xl overflow-hidden">
                      <div className="relative w-full aspect-square bg-[#F5EFE8]">
                        <Image src={g.image} alt={g.name} fill className="object-contain p-4" />
                      </div>
                      <div className="p-3">
                        <h3 className="text-xs font-semibold text-[#1A1208] leading-tight line-clamp-1">{g.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-[#B8973A]">{g.cost} 积分</span>
                          <button
                            disabled={account.balance < g.cost}
                            className={`text-[11px] font-medium px-3 py-1 rounded-full ${
                              account.balance >= g.cost ? "bg-[#1A1208] text-white" : "bg-[#F5EFE8] text-[#B8A898]"
                            }`}
                          >
                            {account.balance >= g.cost ? "兑换" : "积分不足"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
