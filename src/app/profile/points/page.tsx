"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, CheckCircle2, Zap, Crown, Gift } from "lucide-react";
import Link from "next/link";
import PhoneFrame from "@/components/PhoneFrame";

const account = { level: 2, levelName: "精英会员", balance: 1240, total: 3580, nextLevel: { name: "尊享会员", threshold: 5000 } };

const tasks = [
  { id: 1, title: "每日签到", desc: "连续签到第 5 天", points: 20, done: false },
  { id: 2, title: "完成一笔订单", desc: "完成购买并确认收货", points: 50, done: true },
  { id: 3, title: "评价商品", desc: "对已购商品发表评价", points: 30, done: false },
  { id: 4, title: "邀请好友注册", desc: "好友完成首单后生效", points: 100, done: false },
  { id: 5, title: "分享商品", desc: "分享至社交平台", points: 10, done: true },
  { id: 6, title: "完善个人资料", desc: "填写生日等信息", points: 30, done: true },
];

const transactions = [
  { id: 1, title: "确认收货奖励", points: +50, date: "2024-12-10" },
  { id: 2, title: "每日签到", points: +20, date: "2024-12-09" },
  { id: 3, title: "积分抽奖消耗", points: -100, date: "2024-12-08" },
  { id: 4, title: "评价商品奖励", points: +30, date: "2024-12-07" },
  { id: 5, title: "积分抽奖消耗", points: -100, date: "2024-12-05" },
  { id: 6, title: "邀请好友奖励", points: +100, date: "2024-12-03" },
  { id: 7, title: "购物消费奖励", points: +388, date: "2024-11-28" },
];

const privileges = [
  { level: 1, name: "普通会员", color: "#8C7B6B", bg: "#FAF7F4", perks: ["每单消费 1 积分/元", "生日双倍积分", "积分商城兑换"] },
  { level: 2, name: "精英会员", color: "#B8973A", bg: "#FFF7E6", perks: ["每单消费 1.5 积分/元", "生日三倍积分", "专属客服通道", "优先发货"] },
  { level: 3, name: "尊享会员", color: "#D4AF5A", bg: "#1A1208", perks: ["每单消费 2 积分/元", "生日五倍积分", "专属礼品包装", "VIP 专属活动", "免费顺丰包邮"] },
];

export default function PointsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"tasks" | "logs" | "privileges">("tasks");
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
                { label: "积分兑换", icon: Gift, href: "/profile/coupons" },
                { label: "抽奖中心", icon: Star, href: "/lottery" },
                { label: "等级特权", icon: Crown, onClick: () => setTab("privileges") },
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

          {/* Tab */}
          <div className="flex mx-4 mt-4 bg-[#F5EFE8] rounded-xl p-1">
            {[{ key: "tasks", label: "赚积分" }, { key: "logs", label: "积分流水" }, { key: "privileges", label: "等级特权" }].map(t => (
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

            {/* 等级特权 */}
            {tab === "privileges" && privileges.map(lv => (
              <div
                key={lv.level}
                className={`rounded-2xl overflow-hidden border-2 ${account.level === lv.level ? "border-[#B8973A]" : "border-transparent"}`}
              >
                <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: lv.bg }}>
                  <Crown size={16} style={{ color: lv.color }} />
                  <span className="font-bold text-sm" style={{ color: lv.level === 3 ? "#D4AF5A" : lv.color }}>
                    Lv.{lv.level} {lv.name}
                  </span>
                  {account.level === lv.level && (
                    <span className="ml-auto text-[10px] bg-[#B8973A] text-white px-2 py-0.5 rounded-full">当前等级</span>
                  )}
                  {account.level < lv.level && (
                    <span className="ml-auto text-[10px] text-[#8C7B6B]">待解锁</span>
                  )}
                </div>
                <div className="bg-white px-4 py-3 space-y-2">
                  {lv.perks.map(perk => (
                    <div key={perk} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className={account.level >= lv.level ? "text-[#B8973A]" : "text-[#D4C0A8]"} />
                      <span className={`text-xs ${account.level >= lv.level ? "text-[#3D2B1A]" : "text-[#B8A898]"}`}>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
