
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Gift,
  Bell,
  Settings,
  Headphones,
  Star,
  Users,
  Clock,
  Package,
  Truck,
  CheckCircle,
  RotateCcw,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

// 资产数据（4格）
const assets = [
  { label: "待结算", value: "480.00", href: "/distributor/commission" },
  { label: "可提现", value: "3,420", href: "/distributor/wallet" },
  { label: "我的积分", value: "1,280", href: "/profile/points" },
  { label: "团队人数", value: "16", href: "/distributor/team" },
];

// 订单快捷入口（5格）
const orderTabs = [
  { label: "待付款", icon: Clock, href: "/orders?status=pending", badge: "1" },
  { label: "待发货", icon: Package, href: "/orders?status=paid", badge: "" },
  { label: "待收货", icon: Truck, href: "/orders?status=shipped", badge: "2" },
  { label: "已完成", icon: CheckCircle, href: "/orders?status=completed", badge: "" },
  { label: "售后", icon: RotateCcw, href: "/orders/refund/list", badge: "1" },
];

// 服务宫格（2行4列，8个）
const serviceItems = [
  { icon: MapPin, label: "地址管理", href: "/profile/address", color: "#E8573A" },
  { icon: Gift, label: "优惠券", href: "/profile/coupons", color: "#F59E0B" },
  { icon: Star, label: "积分中心", href: "/profile/points", color: "#B8973A" },
  { icon: Bell, label: "消息通知", href: "/profile/notifications", color: "#7C4AC7", badge: "3" },
  { icon: Users, label: "我的团队", href: "/distributor/team", color: "#4A7CC7" },
  { icon: Headphones, label: "在线客服", href: "/profile/help", color: "#2D8C5E" },
  { icon: ChevronRight, label: "分佣中心", href: "/distributor", color: "#B85A2A" },
  { icon: Settings, label: "设置", href: "/profile/settings", color: "#8C7B6B" },
];

export default function ProfilePage() {
  return (
    <PhoneFrame>
      {/* 1. 顶部背景图 */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src="/images/banner-2.png"
          alt="个人中心背景"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />

        {/* 右上角设置 */}
        <Link
          href="/profile/settings"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
          aria-label="设置"
        >
          <Settings size={16} className="text-white" strokeWidth={1.5} />
        </Link>
      </div>

      {/* 2. 白色卡片 - 悬浮覆盖背景 */}
      <div className="relative -mt-10 mx-3 bg-white rounded-2xl shadow-lg px-5 pt-5 pb-4">
        {/* 头像 + 昵称 + 等级 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-[#F0E6C8] flex items-center justify-center border-2 border-[#B8973A]/40 flex-shrink-0">
            <span className="text-xl font-bold text-[#B8973A]">云</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-[#1A1208]">云肌用户</span>
              <span className="text-[10px] text-[#B8973A] border border-[#B8973A]/50 px-2 py-0.5 rounded-full font-medium">
                黄金会员
              </span>
            </div>
            <p className="text-xs text-[#8C7B6B] mt-0.5">完善信息可获得奖励 &gt;</p>
          </div>
        </div>

        {/* 资产四格 */}
        <div className="grid grid-cols-4 divide-x divide-[#F0E8DC] border-t border-[#F0E8DC] pt-4">
          {assets.map(({ label, value, href }) => (
            <Link key={label} href={href} className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-bold text-[#1A1208]">{value}</span>
              <span className="text-[10px] text-[#8C7B6B]">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-3 space-y-3 pt-3">
        {/* 3. 我的订单 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0E8DC]">
            <span className="text-sm font-bold text-[#1A1208]">我的订单</span>
            <Link href="/orders" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              全部 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-5 py-4 px-2">
            {orderTabs.map(({ label, icon: Icon, href, badge }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-2">
                <div className="relative w-11 h-11 rounded-full bg-[#F5EFE8] flex items-center justify-center">
                  <Icon size={18} className="text-[#B8973A]" strokeWidth={1.5} />
                  {badge && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-[#E8573A] rounded-full text-white text-[9px] flex items-center justify-center px-1 font-medium">
                      {badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#3D2B1A] font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 4. 我的服务 - 2行4列宫格 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-4 pt-3 pb-1 border-b border-[#F0E8DC]">
            <span className="text-sm font-bold text-[#1A1208]">我的服务</span>
          </div>
          <div className="grid grid-cols-4 gap-y-4 px-4 py-4">
            {serviceItems.map(({ icon: Icon, label, href, color, badge }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-1.5 relative">
                <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                  <Icon size={20} strokeWidth={1.5} style={{ color }} />
                  {badge && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-[#E8573A] rounded-full text-white text-[9px] flex items-center justify-center px-1 font-medium">
                      {badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#3D2B1A] font-medium text-center">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="pb-2" />
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
