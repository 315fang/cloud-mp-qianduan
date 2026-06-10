"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, TrendingUp, ShoppingBag, Users, Clock,
  ScanLine, Package, FileText, Wallet, ChevronRight, Store,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function StoreManagerPage() {
  const router = useRouter();

  const store = { name: "问兰美妆旗舰店", level: "金牌门店", manager: "李静茵" };

  const stats = [
    { label: "今日营业额", value: "¥8,420", icon: TrendingUp },
    { label: "今日订单", value: "26", icon: ShoppingBag },
    { label: "待核销", value: "3", icon: Clock },
    { label: "会员数", value: "184", icon: Users },
  ];

  const tools = [
    { icon: ScanLine, label: "核销台", href: "/store/verify", color: "#B8973A" },
    { icon: Clock, label: "待核销", href: "/store/pending", color: "#DC2626" },
    { icon: Package, label: "门店库存", href: "/store/manager", color: "#4A7CC7" },
    { icon: FileText, label: "经营报表", href: "/store/manager", color: "#059669" },
    { icon: Wallet, label: "门店结算", href: "/store/manager", color: "#B8973A" },
    { icon: Users, label: "会员管理", href: "/store/manager", color: "#6B4EC7" },
  ];

  const recentOrders = [
    { code: "HX8829", customer: "李**", amount: "¥780", status: "待核销" },
    { code: "HX8821", customer: "张**", amount: "¥1,280", status: "已完成" },
    { code: "HX8810", customer: "王**", amount: "¥360", status: "已完成" },
  ];

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4]">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A1208] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">店长工作台</h1>
        </header>

        {/* 门店信息 */}
        <div className="bg-[#1A1208] px-5 pb-6 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#B8973A] flex items-center justify-center shrink-0">
              <Store size={24} className="text-[#1A1208]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">{store.name}</h2>
                <span className="text-[10px] text-[#B8973A] border border-[#B8973A]/50 px-2 py-0.5 rounded-full">
                  {store.level}
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1">店长：{store.manager}</p>
            </div>
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
                <p className="text-xl font-bold text-[#1A1208]">{value}</p>
              </div>
            ))}
          </div>

          {/* 经营工具 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-4">经营工具</h3>
            <div className="grid grid-cols-3 gap-y-4">
              {tools.map(({ icon: Icon, label, href, color }) => (
                <Link key={label} href={href} className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <Icon size={20} style={{ color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] text-[#3D2B1A] font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* 最近订单 */}
          <div className="bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#1A1208]">最近订单</h3>
              <Link href="/store/pending" className="flex items-center gap-0.5 text-xs text-[#B8973A]">
                全部 <ChevronRight size={13} />
              </Link>
            </div>
            <div className="space-y-2">
              {recentOrders.map((o) => (
                <div key={o.code} className="flex items-center justify-between py-2 border-b border-[#F5EFE8] last:border-0">
                  <div>
                    <p className="text-sm text-[#1A1208]">{o.code}</p>
                    <p className="text-[11px] text-[#A89685] mt-0.5">客户 {o.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#1A1208]">{o.amount}</p>
                    <p className={`text-[11px] mt-0.5 ${o.status === "待核销" ? "text-[#DC2626]" : "text-[#8C7B6B]"}`}>
                      {o.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
