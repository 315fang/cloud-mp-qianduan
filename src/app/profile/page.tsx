import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Package,
  Heart,
  MapPin,
  Gift,
  Star,
  Settings,
  HelpCircle,
  Bell,
  ShieldCheck,
  Truck,
  RotateCcw,
  Clock,
  History,
  Sparkles,
  BadgePercent,
  Camera,
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Users,
  BookImage,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

const orderTabs = [
  { label: "待付款", icon: Clock, href: "/orders?status=pending", badge: "1" },
  { label: "待发货", icon: Package, href: "/orders?status=paid", badge: "" },
  { label: "待收货", icon: Truck, href: "/orders?status=shipped", badge: "2" },
  { label: "退换货", icon: RotateCcw, href: "/orders?status=refund", badge: "" },
];

const menuItems = [
  {
    group: "我的服务",
    items: [
      { icon: Heart, label: "我的收藏", href: "/profile/favorites", badge: "12" },
      { icon: History, label: "浏览足迹", href: "/profile/history", badge: "" },
      { icon: Gift, label: "优惠券", href: "/profile/coupons", badge: "3张可用" },
      { icon: Star, label: "积分中心", href: "/profile/points", badge: "1,280积分" },
      { icon: MapPin, label: "收货地址", href: "/profile/address", badge: "" },
    ],
  },
  {
    group: "帮助与设置",
    items: [
      { icon: Bell, label: "消息通知", href: "/profile/notifications", badge: "3" },
      { icon: HelpCircle, label: "帮助中心", href: "/profile/help", badge: "" },
      { icon: ShieldCheck, label: "隐私设置", href: "/profile/privacy", badge: "" },
      { icon: Settings, label: "账号设置", href: "/profile/settings", badge: "" },
    ],
  },
];

const footprints = products.slice(0, 4);

export default function ProfilePage() {
  return (
    <PhoneFrame>
      {/* 顶部用户信息区 */}
      <div className="relative bg-[#1A1208] px-5 pt-8 pb-8 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#B8973A]/10 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-[#B8973A]/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative flex items-start gap-4">
          {/* 头像 */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#F0E6C8] flex items-center justify-center border-2 border-[#B8973A]/40">
              <span className="text-2xl font-bold text-[#B8973A]">云</span>
            </div>
            <button className="absolute bottom-0 right-0 w-5 h-5 bg-[#B8973A] rounded-full flex items-center justify-center" aria-label="更换头像">
              <Camera size={10} className="text-white" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">云肌用户</h2>
              <span className="text-[10px] font-medium text-[#B8973A] border border-[#B8973A]/50 px-2 py-0.5 rounded-full">
                黄金会员
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">ID：YJ2024001280</p>
            {/* 等级进度条 */}
            <div className="mt-2.5">
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-[#B8973A]">黄金 1,280积分</span>
                <span className="text-white/40">铂金 2,000积分</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#B8973A] to-[#D4AF5A]" style={{ width: "64%" }} />
              </div>
            </div>
          </div>

          <Link href="/profile/settings" className="text-white/40 flex-shrink-0 mt-1">
            <Settings size={18} strokeWidth={1.5} />
          </Link>
        </div>

        {/* 数据统计 */}
        <div className="relative grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/10">
          {[
            { label: "关注", value: "23" },
            { label: "粉丝", value: "8" },
            { label: "收藏", value: "12" },
            { label: "积分", value: "1,280" },
          ].map(({ label, value }) => (
            <button key={label} className="text-center">
              <p className="text-base font-bold text-white">{value}</p>
              <p className="text-[10px] text-white/40 mt-0.5">{label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 会员权益卡 */}
      <div className="px-4 -mt-3 relative z-10">
        <div className="bg-gradient-to-r from-[#3D2B1A] to-[#2A1D10] rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-lg">
          <Sparkles size={18} className="text-[#D4AF5A] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-bold text-[#D4AF5A]">会员专属权益</p>
            <p className="text-[10px] text-white/50 mt-0.5">每月礼品 · 积分加速 · 专属折扣</p>
          </div>
          <button className="text-xs text-[#D4AF5A] border border-[#D4AF5A]/40 px-3 py-1.5 rounded-full font-medium flex-shrink-0">
            查看权益
          </button>
        </div>
      </div>

      <div className="px-4 space-y-4 py-4">
        {/* 我的订单 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0E8DC]">
            <span className="text-sm font-bold text-[#1A1208]">我的订单</span>
            <Link href="/orders" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              查看全部 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-4 py-4">
            {orderTabs.map(({ label, icon: Icon, href, badge }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-2 relative">
                <div className="relative w-11 h-11 rounded-full bg-[#F5EFE8] flex items-center justify-center">
                  <Icon size={18} className="text-[#B8973A]" strokeWidth={1.5} />
                  {badge && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-[#B8973A] rounded-full text-white text-[9px] flex items-center justify-center px-1 font-medium">
                      {badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#3D2B1A] font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 优惠券快捷入口 */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/profile/coupons"
            className="bg-white rounded-2xl px-4 py-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F5EFE8] flex items-center justify-center flex-shrink-0">
              <BadgePercent size={18} className="text-[#B8973A]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1208]">优惠券</p>
              <p className="text-[10px] text-[#B8973A] mt-0.5 font-medium">3张可用</p>
            </div>
          </Link>
          <Link
            href="/profile/points"
            className="bg-white rounded-2xl px-4 py-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F5EFE8] flex items-center justify-center flex-shrink-0">
              <Star size={18} className="text-[#B8973A]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1208]">积分</p>
              <p className="text-[10px] text-[#B8973A] mt-0.5 font-medium">1,280 积分</p>
            </div>
          </Link>
        </div>

        {/* 浏览足迹 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F9F5F0]">
            <div className="flex items-center gap-2">
              <History size={15} className="text-[#B8973A]" />
              <span className="text-sm font-bold text-[#1A1208]">浏览足迹</span>
            </div>
            <Link href="/profile/history" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              全部 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="p-3 flex gap-3">
            {footprints.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F5EFE8]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <p className="text-[10px] text-[#3D2B1A] font-semibold text-center line-clamp-1 w-full">
                  ¥{product.price}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* 功能菜单 */}
        {menuItems.map(({ group, items }) => (
          <div key={group} className="bg-white rounded-2xl overflow-hidden">
            <p className="text-[11px] font-semibold text-[#8C7B6B] tracking-wider px-4 py-2.5 border-b border-[#F0E8DC]">
              {group}
            </p>
            <div>
              {items.map(({ icon: Icon, label, href, badge }, idx) => (
                <Link
                  key={label}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3.5 active:bg-[#FAF7F4] transition-colors ${
                    idx < items.length - 1 ? "border-b border-[#F9F5F0]" : ""
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#F5EFE8] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#B8973A]" strokeWidth={1.5} />
                  </div>
                  <span className="flex-1 text-sm text-[#1A1208] font-medium">{label}</span>
                  {badge && (
                    <span className={`text-[11px] font-medium ${
                      /^\d+$/.test(badge)
                        ? "w-5 h-5 bg-[#B8973A] text-white rounded-full flex items-center justify-center text-[9px]"
                        : "text-[#B8973A]"
                    }`}>
                      {badge}
                    </span>
                  )}
                  <ChevronRight size={15} className="text-[#C0B0A0]" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* 分销工作台入口 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0E8DC]">
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-[#B8973A]" />
              <span className="text-sm font-bold text-[#1A1208]">我的分销</span>
            </div>
            <Link href="/distributor" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              工作台 <ChevronRight size={13} />
            </Link>
          </div>
          {/* 分销数据速览 */}
          <div className="grid grid-cols-3 divide-x divide-[#F0E8DC] px-1 py-3">
            {[
              { label: "本月佣金", value: "¥1,280", href: "/distributor/commission" },
              { label: "钱包余额", value: "¥3,420", href: "/distributor/wallet" },
              { label: "我的团队", value: "16人", href: "/distributor" },
            ].map(({ label, value, href }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-0.5 py-1">
                <span className="text-base font-bold text-[#1A1208]">{value}</span>
                <span className="text-[10px] text-[#8C7B6B]">{label}</span>
              </Link>
            ))}
          </div>
          {/* 快捷入口 */}
          <div className="grid grid-cols-4 gap-2 px-4 pb-4">
            {[
              { icon: LayoutDashboard, label: "工作台", href: "/distributor" },
              { icon: Wallet, label: "我的钱包", href: "/distributor/wallet" },
              { icon: TrendingUp, label: "佣金明细", href: "/distributor/commission" },
              { icon: BookImage, label: "素材中心", href: "/distributor/materials" },
            ].map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-1.5">
                <div className="w-11 h-11 rounded-full bg-[#F5EFE8] flex items-center justify-center">
                  <Icon size={18} className="text-[#B8973A]" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] text-[#3D2B1A] font-medium text-center">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 邀请好友 */}
        <div className="bg-[#1A1208] rounded-2xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-[#B8973A] font-medium">CLOUD BEAUTY</p>
            <p className="text-sm font-semibold text-white mt-0.5">邀请好友得礼品</p>
            <p className="text-xs text-white/50 mt-0.5">每邀请一位好友享 ¥30 奖励</p>
          </div>
          <button className="bg-[#B8973A] text-white text-xs font-medium px-4 py-2 rounded-full flex-shrink-0">
            立即邀请
          </button>
        </div>

        <div className="pb-2" />
      </div>
    </PhoneFrame>
  );
}
