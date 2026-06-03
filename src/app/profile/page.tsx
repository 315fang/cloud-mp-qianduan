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
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const orderTabs = [
  { label: "待付款", icon: Clock, href: "/orders?status=pending" },
  { label: "待发货", icon: Package, href: "/orders?status=paid" },
  { label: "待收货", icon: Truck, href: "/orders?status=shipped" },
  { label: "退换货", icon: RotateCcw, href: "/orders?status=refund" },
];

const menuItems = [
  {
    group: "我的服务",
    items: [
      { icon: Heart, label: "我的收藏", href: "/profile/favorites", badge: "12" },
      { icon: Gift, label: "优惠券", href: "/profile/coupons", badge: "3张可用" },
      { icon: Star, label: "积分中心", href: "/profile/points", badge: "1,280积分" },
      { icon: MapPin, label: "收货地址", href: "/profile/address", badge: "" },
    ],
  },
  {
    group: "帮助与设置",
    items: [
      { icon: Bell, label: "消息通知", href: "/profile/notifications", badge: "" },
      { icon: HelpCircle, label: "帮助中心", href: "/profile/help", badge: "" },
      { icon: ShieldCheck, label: "隐私设置", href: "/profile/privacy", badge: "" },
      { icon: Settings, label: "账号设置", href: "/profile/settings", badge: "" },
    ],
  },
];

export default function ProfilePage() {
  return (
    <PhoneFrame>
      {/* 顶部用户信息区 */}
      <div className="bg-[#1A1208] px-5 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-[#F0E6C8] flex items-center justify-center">
              <span className="text-2xl font-bold text-[#B8973A]">云</span>
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#B8973A] rounded-full flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">V</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white">云肌用户</h2>
            <p className="text-xs text-white/60 mt-0.5">云肌会员 · 黄金等级</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="h-1 rounded-full bg-white/20 flex-1">
                <div className="h-1 rounded-full bg-[#B8973A] w-3/5" />
              </div>
              <span className="text-[10px] text-white/40">距铂金 600积分</span>
            </div>
          </div>
          <Link href="/profile/settings" className="text-white/60">
            <Settings size={20} strokeWidth={1.5} />
          </Link>
        </div>

        {/* 数据统计 */}
        <div className="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/10">
          {[
            { label: "关注", value: "23" },
            { label: "粉丝", value: "8" },
            { label: "收藏", value: "12" },
            { label: "积分", value: "1,280" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-base font-bold text-white">{value}</p>
              <p className="text-[10px] text-white/50 mt-0.5">{label}</p>
            </div>
          ))}
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
            {orderTabs.map(({ label, icon: Icon, href }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#F5EFE8] flex items-center justify-center">
                  <Icon size={18} className="text-[#B8973A]" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] text-[#3D2B1A] font-medium">{label}</span>
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
                  className={`flex items-center gap-3 px-4 py-3.5 ${
                    idx < items.length - 1 ? "border-b border-[#F9F5F0]" : ""
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#F5EFE8] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#B8973A]" strokeWidth={1.5} />
                  </div>
                  <span className="flex-1 text-sm text-[#1A1208] font-medium">{label}</span>
                  {badge && (
                    <span className="text-[11px] text-[#B8973A] font-medium">{badge}</span>
                  )}
                  <ChevronRight size={15} className="text-[#C0B0A0]" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* 品牌信息卡 */}
        <div className="bg-[#1A1208] rounded-2xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-[#B8973A] font-medium">CLOUD BEAUTY</p>
            <p className="text-sm font-semibold text-white mt-0.5">邀请好友得礼品</p>
            <p className="text-xs text-white/50 mt-0.5">每邀请一位好友享 ¥30 奖励</p>
          </div>
          <button className="bg-[#B8973A] text-white text-xs font-medium px-4 py-2 rounded-full">
            立即邀请
          </button>
        </div>

        <div className="pb-2" />
      </div>
    </PhoneFrame>
  );
}
