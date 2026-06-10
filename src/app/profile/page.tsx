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
  ShoppingBag,
  ScanLine,
  History,
  Sparkles,
  BadgePercent,
  Camera,
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Users,
  BookImage,
  Coins,
  ArrowDownToLine,
  Lock,
  MessageCircle,
  FileText,
  Scissors,
  Crown,
  Award,
  PiggyBank,
  Coins as CoinsIcon,
  KeyRound,
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

// 核心资产数据（我的积分 / 货款余额 / 可提佣金 / 奖励存款 同一层）
const assetCards = [
  { label: "我的积分", value: "1,280", sub: "距铂金 720", href: "/profile/points", color: "#B85A2A" },
  { label: "货款余额", value: "¥16,000", sub: "代理进货", href: "/distributor/goods-balance", color: "#B8973A" },
  { label: "可提佣金", value: "¥480", sub: "分销佣金", href: "/distributor/commission", color: "#2D8C5E" },
  { label: "奖励存款", value: "¥2,360", sub: "待解锁", href: "/profile/deposit", color: "#4A7CC7" },
];

const menuItems = [
  {
    group: "我的服务",
    items: [
      { icon: Heart, label: "我的收藏", href: "/profile/collection", badge: "12" },
      { icon: History, label: "浏览足迹", href: "/profile/collection?tab=history", badge: "" },
      { icon: Gift, label: "优惠券", href: "/profile/coupons", badge: "3张" },
      { icon: Star, label: "积分中心", href: "/profile/points", badge: "1,280" },
      { icon: MapPin, label: "收货地址", href: "/profile/address", badge: "" },
      { icon: Scissors, label: "砍价活动", href: "/slash", badge: "" },
    ],
  },
  {
    group: "会员与资金",
    items: [
      { icon: Crown, label: "会员中心", href: "/profile/member", badge: "黄金" },
      { icon: Award, label: "身份权益", href: "/profile/rights", badge: "" },
      { icon: PiggyBank, label: "押金订单", href: "/profile/deposit", badge: "" },
      { icon: CoinsIcon, label: "货款余额", href: "/distributor/goods-balance", badge: "" },
      { icon: PiggyBank, label: "基金贡献", href: "/distributor/fund-pool", badge: "" },
    ],
  },
  {
    group: "门店与核销",
    items: [
      { icon: LayoutDashboard, label: "店长工作台", href: "/store/manager", badge: "" },
      { icon: ScanLine, label: "自提核销", href: "/store/verify", badge: "" },
      { icon: MapPin, label: "自提站点", href: "/pickup", badge: "" },
      { icon: Sparkles, label: "品牌推荐", href: "/brand", badge: "" },
    ],
  },
  {
    group: "帮助与反馈",
    items: [
      { icon: Headphones, label: "专属客服", href: "/profile/service", badge: "" },
      { icon: MessageCircle, label: "联系客服", href: "/profile/help", badge: "" },
      { icon: FileText, label: "我的评价", href: "/profile/reviews", badge: "" },
      { icon: Bell, label: "消息通知", href: "/profile/notifications", badge: "3" },
      { icon: HelpCircle, label: "帮助中心", href: "/profile/help", badge: "" },
    ],
  },
  {
    group: "账号与安全",
    items: [
      { icon: KeyRound, label: "业务密码", href: "/profile/biz-password", badge: "" },
      { icon: ShieldCheck, label: "隐私设置", href: "/profile/privacy", badge: "" },
      { icon: Settings, label: "账号设置", href: "/profile/settings", badge: "" },
    ],
  },
];

const footprints = products.slice(0, 4);

// 购物袋摘要（取前几件商品作缩略展示）
const bagItems = products.slice(0, 3);
const bagCount = bagItems.length;
const bagTotal = bagItems.reduce((sum, p) => sum + p.price, 0);

export default function ProfilePage() {
  return (
    <PhoneFrame>
      {/* 顶部用户信息区 */}
      <div className="relative bg-[#1A1208] px-5 pt-8 pb-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#B8973A]/10 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#B8973A]/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative flex items-start gap-4">
          {/* 头像 */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#F0E6C8] flex items-center justify-center border-2 border-[#B8973A]/40">
              <span className="text-2xl font-bold text-[#B8973A]">问</span>
            </div>
            <Link href="/profile/edit" className="absolute bottom-0 right-0 w-5 h-5 bg-[#B8973A] rounded-full flex items-center justify-center" aria-label="编辑资料">
              <Camera size={10} className="text-white" />
            </Link>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-white">问兰用户</h2>
              <span className="text-[10px] font-medium text-[#B8973A] border border-[#B8973A]/50 px-2 py-0.5 rounded-full">
                黄金会员
              </span>
              <span className="text-[10px] font-medium text-[#7CA9D4] border border-[#7CA9D4]/40 px-2 py-0.5 rounded-full">
                L2 高级经销商
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">ID：YJ2024001280</p>
            {/* 等级进度 */}
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
            { label: "关注", value: "23", href: "#" },
            { label: "粉丝", value: "8", href: "#" },
            { label: "收藏", value: "12", href: "/profile/collection" },
            { label: "积分", value: "1,280", href: "/profile/points" },
          ].map(({ label, value, href }) => (
            <Link key={label} href={href} className="text-center">
              <p className="text-base font-bold text-white">{value}</p>
              <p className="text-[10px] text-white/40 mt-0.5">{label}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* 资产卡（四格）- 悬浮于顶部区域 */}
      <div className="px-4 -mt-5 relative z-10">
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
        {/* 会员权益卡 */}
        <Link href="/profile/member" className="bg-gradient-to-r from-[#3D2B1A] to-[#2A1D10] rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow">
          <Sparkles size={18} className="text-[#D4AF5A] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-bold text-[#D4AF5A]">会员专属权益</p>
            <p className="text-[10px] text-white/50 mt-0.5">每月礼品 · 积分加速 · 专属折扣</p>
          </div>
          <span className="text-xs text-[#D4AF5A] border border-[#D4AF5A]/40 px-3 py-1.5 rounded-full font-medium flex-shrink-0">
            查看权益
          </span>
        </Link>

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
          <div className="grid grid-cols-3 divide-x divide-[#F0E8DC] py-3 px-1">
            {[
              { label: "本月佣金", value: "¥1,280", href: "/distributor/commission" },
              { label: "钱包余额", value: "¥3,420", href: "/distributor/wallet" },
              { label: "我的团队", value: "16人", href: "/distributor/team" },
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

        {/* 浏览足迹 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F9F5F0]">
            <div className="flex items-center gap-2">
              <History size={15} className="text-[#B8973A]" />
              <span className="text-sm font-bold text-[#1A1208]">浏览足迹</span>
            </div>
            <Link href="/profile/collection?tab=history" className="flex items-center gap-0.5 text-[12px] text-[#B8973A]">
              全部 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="p-3 flex gap-3">
            {footprints.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F5EFE8]">
                  <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
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
                        ? "w-5 h-5 bg-[#E8573A] text-white rounded-full flex items-center justify-center text-[9px]"
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

        {/* 隐私保护提示 */}
        <div className="flex items-center gap-2 px-2">
          <Lock size={12} className="text-[#8C7B6B]" />
            <p className="text-[10px] text-[#8C7B6B]">您的个人信息已受到严格保护 · 问兰护肤</p>
        </div>

        {/* 邀请好友 */}
        <div className="bg-[#1A1208] rounded-2xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-[#B8973A] font-medium">CLOUD BEAUTY</p>
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
