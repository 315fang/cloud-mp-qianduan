"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  TrendingUp,
  Wallet,
  Users,
  ChevronRight,
  Star,
  Package,
  BookImage,
  Bell,
  Copy,
  Check,
  BarChart3,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

const kpiCards = [
  { label: "本月佣金", value: "¥1,280.00", sub: "较上月 +18%", color: "#B8973A", bg: "#FBF5E6" },
  { label: "钱包余额", value: "¥3,420.50", sub: "可提现", color: "#2D8C5E", bg: "#E8F5EE" },
  { label: "累计佣金", value: "¥28,640", sub: "自加入以来", color: "#4A7CC7", bg: "#EBF1FB" },
  { label: "团队人数", value: "16人", sub: "L1: 12 · L2: 4", color: "#B85A2A", bg: "#FBF0E8" },
];

const teamRank = [
  { rank: 1, name: "林*燕", sales: "¥12,400", commission: "¥620", level: "L2" },
  { rank: 2, name: "张*华", sales: "¥9,800", commission: "¥490", level: "L2" },
  { rank: 3, name: "王*静", sales: "¥7,200", commission: "¥360", level: "L1" },
  { rank: 4, name: "赵*丽", sales: "¥5,600", commission: "¥280", level: "L1" },
  { rank: 5, name: "陈*芳", sales: "¥4,100", commission: "¥205", level: "L1" },
];

const recentOrders = [
  { id: "YJ20241201001", product: "焕活精华液 30ml", amount: "¥780", commission: "¥78", time: "今天 14:32", status: "已结算" },
  { id: "YJ20241130008", product: "紧致赋活面霜", amount: "¥980", commission: "¥98", time: "昨天 10:15", status: "冻结中" },
  { id: "YJ20241129003", product: "入门精萃水乳套组", amount: "¥580", commission: "¥58", time: "11-29 09:45", status: "已结算" },
];

export default function DistributorPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const inviteCode = "YJ2024001";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <PhoneFrame>
      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1A1208]">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10"
          aria-label="返回"
        >
          <ArrowLeft size={17} className="text-white" />
        </button>
        <span className="text-sm font-bold text-white tracking-wide">分销工作台</span>
        <Link href="/profile/notifications" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 relative">
          <Bell size={16} className="text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#B8973A] rounded-full" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#FAF7F4]">
        {/* 等级横幅 */}
        <div className="bg-[#1A1208] px-5 pt-1 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-base">问兰用户</span>
                <span className="text-[10px] font-semibold text-[#B8973A] border border-[#B8973A]/50 px-2 py-0.5 rounded-full">
                  L2 高级经销商
                </span>
              </div>
              <p className="text-xs text-white/50 mt-1">经销商编号：DLR-2024-0088</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/40">本月业绩</p>
              <p className="text-lg font-bold text-[#D4AF5A]">¥24,800</p>
              <p className="text-[10px] text-white/40">目标 ¥30,000</p>
            </div>
          </div>
          {/* 进度条 */}
          <div className="mt-3">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#B8973A] to-[#D4AF5A] rounded-full" style={{ width: "82%" }} />
            </div>
            <p className="text-[10px] text-white/30 mt-1">距离 L3 白金还差 ¥5,200</p>
          </div>
        </div>

        {/* KPI 卡片网格 */}
        <div className="px-4 -mt-3 grid grid-cols-2 gap-3">
          {kpiCards.map(({ label, value, sub, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-[11px] text-[#8C7B6B] mb-1">{label}</p>
              <p className="text-lg font-bold text-[#1A1208] leading-tight">{value}</p>
              <p className="text-[10px] mt-1 font-medium" style={{ color }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* 快捷操作 */}
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl p-4">
            <p className="text-xs font-bold text-[#1A1208] mb-3 tracking-wide">快捷操作</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: TrendingUp, label: "佣金明细", href: "/distributor/commission" },
                { icon: Wallet, label: "我的钱包", href: "/distributor/wallet" },
                { icon: Users, label: "我的团队", href: "/distributor/team" },
                { icon: BookImage, label: "推广素材", href: "/distributor/materials" },
                { icon: ShoppingBag, label: "选品下单", href: "/products" },
                { icon: BarChart3, label: "佣金日志", href: "/distributor/commission-logs" },
                { icon: Star, label: "分销规则", href: "/distributor/rules" },
                { icon: Package, label: "申请经销", href: "/distributor/apply" },
              ].map(({ icon: Icon, label, href }) => (
                <Link key={label} href={href} className="flex flex-col items-center gap-1.5">
                  <div className="w-11 h-11 rounded-full bg-[#F5EFE8] flex items-center justify-center">
                    <Icon size={18} className="text-[#B8973A]" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] text-[#3D2B1A] font-medium text-center leading-tight">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 邀请码 */}
        <div className="px-4 mt-4">
          <div className="bg-[#1A1208] rounded-2xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] tracking-widest text-[#B8973A] font-semibold">我的专属邀请码</p>
              <p className="text-xl font-bold text-white mt-1 tracking-widest">{inviteCode}</p>
              <p className="text-[10px] text-white/40 mt-0.5">好友用此码注册可绑定至您的团队</p>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-[#B8973A] text-white text-xs font-medium px-4 py-2.5 rounded-full flex-shrink-0 transition-all"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "已复制" : "复制"}
            </button>
          </div>
        </div>

        {/* 团队排行 */}
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0E8DC]">
              <div className="flex items-center gap-2">
                <Users size={15} className="text-[#B8973A]" />
                <span className="text-sm font-bold text-[#1A1208]">团队排行（本月）</span>
              </div>
              <Link href="/distributor/team" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
                全部 <ChevronRight size={13} />
              </Link>
            </div>
            <div className="divide-y divide-[#F9F5F0]">
              {teamRank.map(({ rank, name, sales, commission, level }) => (
                <div key={rank} className="flex items-center gap-3 px-4 py-3">
                  <span className={`text-sm font-bold w-5 text-center ${rank <= 3 ? "text-[#B8973A]" : "text-[#C0B0A0]"}`}>
                    {rank}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#F5EFE8] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#B8973A]">{name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A1208]">{name}</p>
                    <p className="text-[10px] text-[#8C7B6B]">销售额 {sales}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-[#2D8C5E]">{commission}</p>
                    <span className="text-[9px] text-[#8C7B6B] border border-[#E8DDD0] rounded-full px-1.5 py-0.5">{level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 近期佣金订单 */}
        <div className="px-4 mt-4 mb-4">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0E8DC]">
              <div className="flex items-center gap-2">
                <TrendingUp size={15} className="text-[#B8973A]" />
                <span className="text-sm font-bold text-[#1A1208]">近期佣金记录</span>
              </div>
              <Link href="/distributor/commission" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
                全部 <ChevronRight size={13} />
              </Link>
            </div>
            <div className="divide-y divide-[#F9F5F0]">
              {recentOrders.map(({ id, product, amount, commission, time, status }) => (
                <div key={id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1A1208] truncate">{product}</p>
                      <p className="text-[10px] text-[#8C7B6B] mt-0.5">订单 {id} · {time}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-bold text-[#B8973A]">+{commission}</p>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                        status === "已结算"
                          ? "bg-[#E8F5EE] text-[#2D8C5E]"
                          : "bg-[#FBF5E6] text-[#B8973A]"
                      }`}>
                        {status}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#8C7B6B] mt-1">订单金额 {amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
