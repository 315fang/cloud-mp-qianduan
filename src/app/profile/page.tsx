
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
      {/* 1. 黑金会员卡 */}
      <div
        className="relative mx-3 mt-3 rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1A1208 0%, #2E2010 40%, #1A1208 70%, #0E0B04 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        }}
      >
        {/* 装饰光圈 */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #D4AF5A, transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #B8973A, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative px-5 pt-5 pb-5">
          {/* 右上角设置 */}
          <Link
            href="/profile/settings"
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10"
            aria-label="设置"
          >
            <Settings size={15} className="text-white/80" strokeWidth={1.5} />
          </Link>

          {/* 头像 + 昵称 + 会员号 */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border border-[#B8973A]/40"
              style={{ background: "linear-gradient(135deg, #2E2010, #3D2B1A)" }}
            >
              <span className="text-xl font-bold text-[#D4AF5A]">云</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">云肌用户</span>
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full font-medium tracking-wide"
                  style={{
                    background: "linear-gradient(90deg, #D4AF5A, #B8973A)",
                    color: "#1A1208",
                  }}
                >
                  黄金会员
                </span>
              </div>
              <p className="text-[11px] text-white/40 mt-0.5 font-mono tracking-wider">NO. 2024 0001</p>
            </div>
          </div>

          {/* 成长值进度条 */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-[#D4AF5A]/80">成长值 2,480</span>
              <span className="text-[10px] text-white/40">距铂金还差 520</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: "82%",
                  background: "linear-gradient(90deg, #B8973A, #D4AF5A)",
                }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-white/30">黄金</span>
              <span className="text-[9px] text-white/30">铂金</span>
            </div>
          </div>

          {/* 资产四格 */}
          <div className="grid grid-cols-4 divide-x divide-white/10 border-t border-white/10 pt-4">
            {assets.map(({ label, value, href }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-0.5">
                <span className="text-sm font-bold text-[#D4AF5A]">{value}</span>
                <span className="text-[10px] text-white/50">{label}</span>
              </Link>
            ))}
          </div>
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
