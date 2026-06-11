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
  Truck,
  RotateCcw,
  Clock,
  ShoppingBag,
  ScanLine,
  History,
  Sparkles,
  Camera,
  LayoutDashboard,
  TrendingUp,
  Coins,
  ArrowDownToLine,
  Lock,
  FileText,
  Scissors,
  Crown,
  Award,
  PiggyBank,
  Headphones,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import { products } from "@/lib/data";

const orderTabs = [
  { label: "待付款", icon: Clock, href: "/orders?status=pending", badge: "1" },
  { label: "待发货", icon: Package, href: "/orders?status=paid", badge: "" },
  { label: "待收货", icon: Truck, href: "/orders?status=shipped", badge: "2" },
  { label: "待评价", icon: Star, href: "/orders?status=review", badge: "1" },
  { label: "退换货", icon: RotateCcw, href: "/orders?status=refund", badge: "1" },
];

// 核心资产（唯一出处：积分 / 货款 / 佣金 / 奖励存款）
const assetCards = [
  { label: "我的积分", value: "1,280", sub: "距铂金 720", href: "/profile/points", color: "#B85A2A" },
  { label: "货款余额", value: "¥16,000", sub: "代理进货", href: "/distributor/goods-balance", color: "#B8973A" },
  { label: "可提佣金", value: "¥480", sub: "分销佣金", href: "/distributor/commission", color: "#2D8C5E" },
  { label: "奖励存款", value: "¥2,360", sub: "待解锁", href: "/profile/deposit", color: "#4A7CC7" },
];

// 高频服务宫格（4×2，一眼可达）
const serviceGrid = [
  { icon: Heart, label: "我的收藏", href: "/profile/collection", badge: "12" },
  { icon: Gift, label: "优惠券", href: "/profile/coupons", badge: "3" },
  { icon: MapPin, label: "收货地址", href: "/profile/address", badge: "" },
  { icon: FileText, label: "我的评价", href: "/profile/reviews", badge: "" },
  { icon: History, label: "浏览足迹", href: "/profile/collection?tab=history", badge: "" },
  { icon: Scissors, label: "砍价活动", href: "/slash", badge: "" },
  { icon: ScanLine, label: "自提站点", href: "/pickup", badge: "" },
  { icon: Bell, label: "消息通知", href: "/profile/notifications", badge: "3" },
];

// 低频精选列表（单组，每项唯一）
const moreItems = [
  { icon: Crown, label: "会员中心", href: "/profile/member", badge: "黄金" },
  { icon: Award, label: "身份权益", href: "/profile/rights", badge: "" },
  { icon: PiggyBank, label: "基金贡献", href: "/distributor/fund-pool", badge: "" },
  { icon: Headphones, label: "专属客服", href: "/profile/service", badge: "" },
  { icon: HelpCircle, label: "帮助中心", href: "/profile/help", badge: "" },
  { icon: Settings, label: "账号与安全", href: "/profile/settings", badge: "" },
];

// 购物袋摘要（取前几件商品作缩略展示）
const bagItems = products.slice(0, 3);
const bagCount = bagItems.length;
const bagTotal = bagItems.reduce((sum, p) => sum + p.price, 0);

export default function ProfilePage() {
  return (
    <PhoneFrame>
      {/* 顶部用户信息区：香槟浅色面板，深色仅作文字（苹果式克制） */}
      <div className="relative surface-champagne px-5 pt-8 pb-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#B8973A]/8 -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative flex items-start gap-4">
          {/* 头像 */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-[#E2D3B4] shadow-sm">
              <span className="font-luxury text-2xl text-[#B8973A]">问</span>
            </div>
            <Link href="/profile/edit" className="absolute bottom-0 right-0 w-5 h-5 bg-[#B8973A] rounded-full flex items-center justify-center" aria-label="编辑资料">
              <Camera size={10} className="text-white" />
            </Link>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-luxury text-lg text-[#1A1208]">问兰用户</h2>
              <span className="text-[10px] font-medium text-[#8C6B1F] bg-[#F0E6C8] px-2 py-0.5 rounded-full">
                黄金会员
              </span>
              <span className="text-[10px] font-medium text-[#3D6B9E] bg-[#E4EDF6] px-2 py-0.5 rounded-full">
                L2 高级经销商
              </span>
            </div>
            <p className="text-xs text-[#8C7B6B] mt-0.5">ID：YJ2024001280</p>
            {/* 等级进度（积分唯一出现在此与资产卡） */}
            <div className="mt-2.5">
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-[#8C6B1F] font-medium">黄金 1,280积分</span>
                <span className="text-[#B0A18C]">铂金 2,000积分</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#E8DCC4] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#B8973A] to-[#D4AF5A]" style={{ width: "64%" }} />
              </div>
            </div>
            {/* 会员礼遇一行收纳（原独立横幅合并至此） */}
            <Link href="/profile/member" className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] text-[#8C6B1F] font-medium">
              <Sparkles size={11} />
              会员专属礼遇 · 每月礼品 · 积分加速
              <ChevronRight size={11} />
            </Link>
          </div>

          <Link href="/profile/settings" className="text-[#B0A18C] flex-shrink-0 mt-1" aria-label="设置">
            <Settings size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* 资产卡（四格）- 悬浮于顶部区域，资金信息唯一出处 */}
      <div className="px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0E8DC]">
            <div className="flex items-center gap-2">
              <Coins size={15} className="text-[#B8973A]" />
              <span className="text-sm font-bold text-[#1A1208]">我的资产</span>
            </div>
            <Link href="/distributor/wallet" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              提现 <ArrowDownToLine size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-4 divide-x divide-[#F0E8DC] py-3">
            {assetCards.map(({ label, value, sub, href, color }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-0.5 py-1 px-1">
                <span className="text-sm font-bold" style={{ color }}>{value}</span>
                <span className="text-[10px] text-[#1A1208] font-medium">{label}</span>
                <span className="text-[9px] text-[#8C7B6B]">{sub}</span>
              </Link>
            ))}
          </div>
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
          <div className="grid grid-cols-5 py-4">
            {orderTabs.map(({ label, icon: Icon, href, badge }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-2 relative">
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

        {/* 购物袋摘要卡 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0E8DC]">
            <div className="flex items-center gap-2">
              <ShoppingBag size={15} className="text-[#B8973A]" />
              <span className="text-sm font-bold text-[#1A1208]">我的购物袋</span>
              {bagCount > 0 && (
                <span className="text-[10px] text-[#8C7B6B]">共 {bagCount} 件</span>
              )}
            </div>
            <Link href="/cart" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              {bagCount > 0 ? "去结算" : "去逛逛"} <ChevronRight size={13} />
            </Link>
          </div>
          {bagCount > 0 ? (
            <Link href="/cart" className="flex items-center gap-3 px-4 py-3.5">
              <div className="flex -space-x-3">
                {bagItems.map((p) => (
                  <div key={p.id} className="w-12 h-12 rounded-xl overflow-hidden bg-[#F5EFE8] border-2 border-white">
                    <Image src={p.image} alt={p.name} width={48} height={48} className="object-contain w-full h-full p-1" />
                  </div>
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#1A1208] font-medium line-clamp-1">{bagItems[0].name}</p>
                <p className="text-[11px] text-[#8C7B6B] mt-0.5">等 {bagCount} 件商品</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[10px] text-[#8C7B6B]">合计</p>
                <p className="text-base font-bold text-[#B8973A]">¥{bagTotal.toLocaleString()}</p>
              </div>
            </Link>
          ) : (
            <div className="flex flex-col items-center py-6">
              <ShoppingBag size={32} strokeWidth={1} className="text-[#E8DDD0] mb-2" />
              <p className="text-xs text-[#8C7B6B]">购物袋还是空的，去挑选心仪好物吧</p>
            </div>
          )}
        </div>

        {/* 工作台双入口（同等视觉重量的白卡，仅以图标底色区分） */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/distributor" className="bg-white rounded-2xl p-4 flex flex-col gap-2 border border-[#F0E8DC]">
            <div className="w-9 h-9 rounded-full bg-[#F0E6C8] flex items-center justify-center">
              <TrendingUp size={17} className="text-[#8C6B1F]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1208]">分销工作台</p>
              <p className="text-[11px] text-[#8C7B6B] mt-0.5">本月佣金 ¥1,280</p>
            </div>
            <span className="text-[11px] text-[#B8973A] flex items-center gap-0.5">
              进入 <ChevronRight size={12} />
            </span>
          </Link>
          <Link href="/store/manager" className="bg-white rounded-2xl p-4 flex flex-col gap-2 border border-[#F0E8DC]">
            <div className="w-9 h-9 rounded-full bg-[#F5EFE8] flex items-center justify-center">
              <LayoutDashboard size={17} className="text-[#B8973A]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1208]">店长工作台</p>
              <p className="text-[11px] text-[#8C7B6B] mt-0.5">自提核销 · 库存管理</p>
            </div>
            <span className="text-[11px] text-[#B8973A] flex items-center gap-0.5">
              进入 <ChevronRight size={12} />
            </span>
          </Link>
        </div>

        {/* 我的服务宫格（高频功能 4×2，替代原 23 行列表） */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <p className="text-sm font-bold text-[#1A1208] px-4 pt-3.5 pb-1">我的服务</p>
          <div className="grid grid-cols-4 gap-y-4 px-2 py-4">
            {serviceGrid.map(({ icon: Icon, label, href, badge }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-1.5 relative">
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

        {/* 更多服务（低频精选，单组六行） */}
        <div className="bg-white rounded-2xl overflow-hidden">
          {moreItems.map(({ icon: Icon, label, href, badge }, idx) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-4 py-3.5 active:bg-[#FAF7F4] transition-colors ${
                idx < moreItems.length - 1 ? "border-b border-[#F9F5F0]" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-[#F5EFE8] flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-[#B8973A]" strokeWidth={1.5} />
              </div>
              <span className="flex-1 text-sm text-[#1A1208] font-medium">{label}</span>
              {badge && <span className="text-[11px] font-medium text-[#B8973A]">{badge}</span>}
              <ChevronRight size={15} className="text-[#C0B0A0]" />
            </Link>
          ))}
        </div>

        {/* 隐私保护提示 */}
        <div className="flex items-center gap-2 px-2">
          <Lock size={12} className="text-[#8C7B6B]" />
          <p className="text-[10px] text-[#8C7B6B]">您的个人信息已受到严格保护 · 问兰护肤</p>
        </div>

        {/* 邀请好友 */}
        <div className="surface-noir rounded-2xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-[#B8973A] font-medium">WENLAN BEAUTY</p>
            <p className="text-sm font-semibold text-white mt-0.5">邀请好友得礼品</p>
            <p className="text-xs text-white/50 mt-0.5">每邀请一位好友享 ¥30 奖励</p>
          </div>
          <Link href="/distributor/invite" className="bg-[#B8973A] text-white text-xs font-medium px-4 py-2 rounded-full flex-shrink-0">
            立即邀请
          </Link>
        </div>

        <div className="pb-2" />
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
