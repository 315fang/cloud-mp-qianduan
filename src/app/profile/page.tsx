
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
  RotateCcw,
  ShoppingCart,
  TrendingUp,
  Store,
  CheckCircle2,
  Crown,
  BookOpen,
  Briefcase,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

const assets = [
  { label: "待结算", value: "480", href: "/distributor/commission" },
  { label: "可提现", value: "3,420", href: "/distributor/wallet" },
  { label: "我的积分", value: "1,280", href: "/profile/points" },
  { label: "团队人数", value: "16", href: "/distributor/team" },
];

const orderTabs = [
  { label: "待付款", icon: Clock, href: "/orders?status=pending", badge: "1" },
  { label: "待发货", icon: Package, href: "/orders?status=paid", badge: "" },
  { label: "待收货", icon: Truck, href: "/orders?status=shipped", badge: "2" },
  { label: "购物车", icon: ShoppingCart, href: "/cart", badge: "" },
  { label: "售后", icon: RotateCcw, href: "/orders/refund/list", badge: "1" },
];

const serviceItems = [
  { icon: MapPin, label: "地址管理", href: "/profile/address", color: "#E8573A" },
  { icon: Gift, label: "优惠券", href: "/profile/coupons", color: "#F59E0B" },
  { icon: Star, label: "积分中心", href: "/profile/points", color: "#B8973A" },
  { icon: Bell, label: "消息通知", href: "/profile/notifications", color: "#7C4AC7", badge: "3" },
  { icon: Store, label: "店长工作台", href: "/distributor/manager", color: "#DC2626" },
  { icon: CheckCircle2, label: "自提核销", href: "/distributor/pickup-verify", color: "#059669" },
  { icon: Crown, label: "权益中心", href: "/profile/rights-benefits", color: "#7C3AED" },
  { icon: Headphones, label: "专属客服", href: "/profile/customer-service", color: "#0891B2" },
  { icon: BookOpen, label: "品牌故事", href: "/profile/brand-story", color: "#92400E" },
  { icon: Briefcase, label: "购物袋", href: "/profile/shopping-bags", color: "#E8573A" },
  { icon: Users, label: "我的团队", href: "/distributor/team", color: "#4A7CC7" },
  { icon: TrendingUp, label: "分佣中心", href: "/distributor", color: "#B85A2A" },
  { icon: Settings, label: "设置", href: "/profile/settings", color: "#8C7B6B" },
];

export default function ProfilePage() {
  return (
    <PhoneFrame>
      {/* 顶部大图背景区 */}
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src="/images/banner-2.png"
          alt="个人中心背景"
          fill
          className="object-cover"
          priority
        />
        {/* 渐变遮罩，下半部渐出 */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(250,247,244,0) 55%, #FAF7F4 100%)",
          }}
        />
        {/* 右上角设置按钮 */}
        <Link
          href="/profile/settings"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full"
          style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(6px)" }}
          aria-label="设置"
        >
          <Settings size={15} className="text-white" strokeWidth={1.5} />
        </Link>
      </div>

      {/* 会员卡 - 上移覆盖照片底部 */}
      <div className="px-3 -mt-10 relative z-10">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #F8F1E4 0%, #EDD9BC 45%, #F0E4CC 75%, #F8F0E4 100%)",
            boxShadow: "0 8px 28px rgba(184,151,58,0.18)",
            border: "1px solid rgba(184,151,58,0.22)",
          }}
        >
          {/* 装饰光圈 */}
          <div
            className="absolute -top-6 -right-6 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(212,175,90,0.22), transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative px-5 pt-5 pb-5">
            {/* 头像 + 昵称 + 会员号 */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #EDD9BC, #D4AF5A)",
                  boxShadow: "0 3px 10px rgba(184,151,58,0.35)",
                }}
              >
                <span className="text-xl font-bold text-[#6B4E1A]">云</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#3D2B1A]">云肌用户</span>
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full font-semibold tracking-wide"
                    style={{ background: "linear-gradient(90deg, #B8973A, #D4AF5A)", color: "#fff" }}
                  >
                    黄金会员
                  </span>
                </div>
                <p className="text-[11px] text-[#8C7B6B] mt-0.5 font-mono tracking-wider">NO. 2024 0001</p>
                <p className="text-[10px] text-[#B8973A] mt-0.5">完善信息可获得奖励 &gt;</p>
              </div>
            </div>

            {/* 资产三格 */}
            <div className="grid grid-cols-4 divide-x divide-[#B8973A]/20 border-t border-[#B8973A]/18 pt-3 mb-4">
              {assets.map(({ label, value, href }) => (
                <Link key={label} href={href} className="flex flex-col items-center gap-0.5">
                  <span className="text-sm font-bold text-[#8C6E2A]">{value}</span>
                  <span className="text-[10px] text-[#A08050]">{label}</span>
                </Link>
              ))}
            </div>

            {/* 成长值进度条 */}
            <div>
              <div className="h-1.5 rounded-full bg-[#B8973A]/15 overflow-hidden mb-1">
                <div
                  className="h-full rounded-full"
                  style={{ width: "82%", background: "linear-gradient(90deg, #B8973A, #D4AF5A)" }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-[#A08050]">再获得 <span className="text-[#8C6E2A] font-semibold">520 成长值</span> 可升级为铂金会员</span>
                <span className="text-[9px] text-[#A08050]">2480/3000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 space-y-3 pt-3">
        {/* 我的订单 */}
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

        {/* 我的服务 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-4 pt-3 pb-1 border-b border-[#F0E8DC]">
            <span className="text-sm font-bold text-[#1A1208]">我的服务</span>
          </div>
          <div className="grid grid-cols-4 gap-y-4 px-4 py-4">
            {serviceItems.map(({ icon: Icon, label, href, color, badge }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-1.5">
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
