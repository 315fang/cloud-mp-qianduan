"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, TrendingUp, ShoppingBag, Users, Calendar } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function TeamMemberDetailPage() {
  const router = useRouter();

  const member = {
    name: "陈思琪",
    avatar: "陈",
    level: "L1 推广员",
    phone: "138 **** 6688",
    joinDate: "2024-09-15",
    isActive: true,
  };

  const stats = [
    { label: "本月销售额", value: "¥12,480", icon: TrendingUp },
    { label: "本月订单", value: "38", icon: ShoppingBag },
    { label: "下级人数", value: "6", icon: Users },
    { label: "加入天数", value: "78", icon: Calendar },
  ];

  const contribution = [
    { month: "2024-11", sales: "¥12,480", commission: "¥624", orders: 38 },
    { month: "2024-10", sales: "¥9,860", commission: "¥493", orders: 29 },
    { month: "2024-09", sales: "¥4,200", commission: "¥210", orders: 12 },
  ];

  const subMembers = [
    { name: "赵**", level: "推广员", sales: "¥3,200" },
    { name: "孙**", level: "推广员", sales: "¥1,800" },
    { name: "周**", level: "会员", sales: "¥680" },
  ];

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4]">
        <header className="sticky top-0 z-10 flex items-center gap-3 surface-noir px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">成员详情</h1>
        </header>

        {/* 成员信息 */}
        <div className="surface-noir px-5 pb-6 pt-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#F0E6C8] flex items-center justify-center text-2xl font-bold text-[#B8973A] shrink-0">
              {member.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{member.name}</h2>
                <span className="text-[10px] text-[#B8973A] border border-[#B8973A]/50 px-2 py-0.5 rounded-full">
                  {member.level}
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1">{member.phone}</p>
              <p className="text-[11px] text-white/40 mt-0.5">加入于 {member.joinDate}</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Phone size={18} className="text-[#B8973A]" />
            </button>
          </div>
        </div>

        <div className="px-4 py-5 space-y-4">
          {/* 数据概览 */}
          <div className="grid grid-cols-2 gap-2">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white rounded-2xl p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Icon size={14} className="text-[#B8973A]" />
                  <span className="text-xs text-[#8C7B6B]">{label}</span>
                </div>
                <p className="text-lg font-bold text-[#1A1208]">{value}</p>
              </div>
            ))}
          </div>

          {/* 贡献明细 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-3">业绩贡献</h3>
            <div className="space-y-3">
              {contribution.map((c) => (
                <div key={c.month} className="flex items-center justify-between pb-3 border-b border-[#F0E8DC] last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-[#1A1208]">{c.month}</p>
                    <p className="text-[11px] text-[#A89685] mt-0.5">{c.orders} 笔订单</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#1A1208]">{c.sales}</p>
                    <p className="text-[11px] text-[#B8973A] mt-0.5">贡献佣金 {c.commission}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 下级成员 */}
          <div className="bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#1A1208]">下级成员</h3>
              <span className="text-xs text-[#8C7B6B]">共 {subMembers.length} 人</span>
            </div>
            <div className="space-y-2">
              {subMembers.map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-1">
                  <div className="w-8 h-8 rounded-full bg-[#F5EFE8] flex items-center justify-center text-xs font-bold text-[#8C7B6B] shrink-0">
                    {s.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#1A1208]">{s.name}</p>
                    <p className="text-[11px] text-[#A89685]">{s.level}</p>
                  </div>
                  <span className="text-xs text-[#8C7B6B]">{s.sales}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
