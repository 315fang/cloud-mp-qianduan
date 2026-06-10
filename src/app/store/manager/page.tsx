"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, TrendingUp, ShoppingBag, Users, Clock,
  ScanLine, Package, FileText, Wallet, Store,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import {
  TodayTasks, PurchaseForm, InventoryList, StockChanges,
  PurchaseRecords, VerifiedHistory, StoreProfile,
} from "@/components/store/ManagerSections";

type Tab = "overview" | "inventory" | "purchase" | "store";

export default function StoreManagerPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  // 是否已被平台指派为店长（演示可切换）
  const [isManager, setIsManager] = useState(true);

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
    { icon: Package, label: "门店库存", action: () => setTab("inventory"), color: "#4A7CC7" },
    { icon: FileText, label: "采购申请", action: () => setTab("purchase"), color: "#059669" },
    { icon: Wallet, label: "门店结算", href: "/store/manager", color: "#B8973A" },
    { icon: Users, label: "会员管理", href: "/store/manager", color: "#6B4EC7" },
  ];

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "概览" },
    { key: "inventory", label: "库存" },
    { key: "purchase", label: "采购" },
    { key: "store", label: "门店" },
  ];

  return (
    <PhoneFrame>
      {!isManager ? (
        <div className="min-h-full bg-[#FAF7F4] flex flex-col">
          <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#FAF7F4] px-4 py-3">
            <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
              <ArrowLeft size={20} className="text-[#3D2B1A]" />
            </button>
            <h1 className="text-base font-bold text-[#1A1208]">店长工作台</h1>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center -mt-10">
            <div className="w-20 h-20 rounded-3xl bg-[#F0E8DC] flex items-center justify-center mb-6">
              <Store size={38} className="text-[#B8973A]" strokeWidth={1.4} />
            </div>
            <h2 className="text-lg font-bold text-[#1A1208]">当前账号未被指派为店长</h2>
            <p className="text-sm text-[#8C7B6B] leading-relaxed mt-3 max-w-[260px]">
              店长与门店的绑定由平台统一完成，绑定后这里才会显示门店工作台与经营数据。
            </p>
            <div className="mt-6 w-full max-w-[280px] bg-white rounded-2xl p-4 text-left">
              <p className="text-xs font-bold text-[#1A1208] mb-2">如何成为店长？</p>
              <ul className="space-y-1.5 text-[11px] text-[#8C7B6B] leading-relaxed">
                <li>· 联系您所属的区域负责人提交申请</li>
                <li>· 由平台审核并完成门店绑定</li>
                <li>· 绑定成功后重新进入本页即可使用</li>
              </ul>
            </div>
            <button
              onClick={() => router.push("/profile")}
              className="mt-6 bg-[#1A1208] text-white text-sm font-medium px-8 py-3 rounded-full"
            >
              返回我的
            </button>
            {/* 演示用：切换为已指派状态 */}
            <button
              onClick={() => setIsManager(true)}
              className="mt-3 text-[11px] text-[#B8973A] underline"
            >
              （演示）切换为已指派店长
            </button>
          </div>
        </div>
      ) : (
      <div className="min-h-full bg-[#FAF7F4]">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A1208] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">店长工作台</h1>
          <button
            onClick={() => setIsManager(false)}
            className="ml-auto text-[10px] text-white/40 underline"
          >
            演示空态
          </button>
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

        {/* Tab 切换 */}
        <div className="sticky top-[52px] z-10 bg-[#FAF7F4] px-4 pt-4">
          <div className="flex bg-white rounded-xl p-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${
                  tab === t.key ? "bg-[#B8973A] text-[#1A1208]" : "text-[#8C7B6B]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-4 space-y-4">
          {tab === "overview" && (
            <>
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

              <TodayTasks />

              {/* 经营工具 */}
              <div className="bg-white rounded-2xl p-4">
                <h3 className="text-sm font-bold text-[#1A1208] mb-4">经营工具</h3>
                <div className="grid grid-cols-3 gap-y-4">
                  {tools.map(({ icon: Icon, label, href, action, color }) => {
                    const inner = (
                      <>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                          <Icon size={20} style={{ color }} strokeWidth={1.5} />
                        </div>
                        <span className="text-[11px] text-[#3D2B1A] font-medium">{label}</span>
                      </>
                    );
                    return href ? (
                      <Link key={label} href={href} className="flex flex-col items-center gap-1.5">{inner}</Link>
                    ) : (
                      <button key={label} onClick={action} className="flex flex-col items-center gap-1.5">{inner}</button>
                    );
                  })}
                </div>
              </div>

              <VerifiedHistory />
            </>
          )}

          {tab === "inventory" && (
            <>
              <InventoryList />
              <StockChanges />
            </>
          )}

          {tab === "purchase" && (
            <>
              <PurchaseForm />
              <PurchaseRecords />
            </>
          )}

          {tab === "store" && <StoreProfile />}
        </div>
      </div>
      )}
    </PhoneFrame>
  );
}
