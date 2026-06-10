"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PhoneFrame from "@/components/PhoneFrame";

const tabs = ["全部", "新人券", "满减券", "兑换券"];

type CouponStatus = "可领取" | "已领取" | "已抢完" | "未开始";

const coupons: { id: string; amount: number; type: string; cat: string; title: string; threshold: string; validity: string; status: CouponStatus }[] = [
  { id: "1", amount: 50, type: "满减券", cat: "新人券", title: "新人专享礼券", threshold: "满 299 可用", validity: "领取后 7 天内有效", status: "可领取" },
  { id: "2", amount: 100, type: "满减券", cat: "满减券", title: "全场通用券", threshold: "满 599 可用", validity: "12-31 前有效", status: "可领取" },
  { id: "3", amount: 30, type: "满减券", cat: "满减券", title: "精华品类券", threshold: "满 199 可用", validity: "12-20 前有效", status: "已领取" },
  { id: "4", amount: 200, type: "满减券", cat: "满减券", title: "尊享大额券", threshold: "满 1299 可用", validity: "12-31 前有效", status: "已抢完" },
  { id: "5", amount: 20, type: "兑换券", cat: "兑换券", title: "面膜兑换券", threshold: "指定面膜可用", validity: "01-15 前有效", status: "未开始" },
];

const statusStyle: Record<CouponStatus, string> = {
  可领取: "bg-[#B8973A] text-white",
  已领取: "bg-[#F5EFE8] text-[#8C7B6B]",
  已抢完: "bg-[#F5EFE8] text-[#B8A898]",
  未开始: "bg-[#FFF3E6] text-[#E8975A]",
};

export default function CouponCenterPage() {
  const router = useRouter();
  const [tab, setTab] = useState("全部");
  const list = tab === "全部" ? coupons : coupons.filter((c) => c.cat === tab);

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]" aria-label="返回">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">领券中心</span>
          <Link href="/profile/coupons" className="text-xs text-[#B8973A] font-medium">我的券</Link>
        </div>

        <div className="flex gap-2 px-4 py-3 bg-white border-b border-[#F0E8DC] overflow-x-auto scrollbar-hide">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${tab === t ? "bg-[#1A1208] text-white" : "bg-[#F5EFE8] text-[#8C7B6B]"}`}>{t}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {list.map((c) => (
            <div key={c.id} className="flex bg-white rounded-2xl overflow-hidden">
              {/* 券额 */}
              <div className="w-28 shrink-0 bg-[#1A1208] text-white flex flex-col items-center justify-center relative">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-sm">¥</span>
                  <span className="text-3xl font-bold">{c.amount}</span>
                </div>
                <span className="text-[10px] text-white/60 mt-1">{c.threshold}</span>
                {/* 锯齿 */}
                <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FAF7F4]" />
              </div>
              {/* 信息 */}
              <div className="flex-1 p-3 flex flex-col justify-between border-l border-dashed border-[#E8DDD0]">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[#B8973A] bg-[#FFF7E6] px-1.5 py-0.5 rounded">{c.type}</span>
                    <p className="text-sm font-bold text-[#1A1208]">{c.title}</p>
                  </div>
                  <p className="text-[11px] text-[#8C7B6B] mt-1.5">{c.validity}</p>
                </div>
                <button disabled={c.status !== "可领取"} className={`self-end px-4 py-1.5 text-xs font-bold rounded-full ${statusStyle[c.status]}`}>
                  {c.status === "可领取" ? "立即领取" : c.status}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
