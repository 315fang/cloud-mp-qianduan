"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Clock, Package } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function PendingVerifyOrdersPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const orders = [
    { code: "HX8829", customer: "李**", items: "雪绒花精华 ×1", amount: "¥780", date: "2024-12-01 14:20", pickupCode: "8829" },
    { code: "HX7733", customer: "王**", items: "焕活面霜 ×2、眼霜 ×1", amount: "¥1,560", date: "2024-12-01 11:05", pickupCode: "7733" },
    { code: "HX6612", customer: "陈**", items: "洁面慕斯 ×1", amount: "¥280", date: "2024-11-30 16:48", pickupCode: "6612" },
  ];

  const filtered = keyword
    ? orders.filter((o) => o.pickupCode.includes(keyword) || o.customer.includes(keyword))
    : orders;

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4]">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#FAF7F4]/95 backdrop-blur px-4 py-3 border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-[#1A1208]" />
          </button>
          <h1 className="text-base font-bold text-[#1A1208]">待核销订单</h1>
        </header>

        {/* 搜索 */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5">
            <Search size={16} className="text-[#A89685]" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="输入提货码或客户姓名搜索"
              className="flex-1 text-sm text-[#1A1208] placeholder:text-[#A89685] outline-none bg-transparent"
            />
          </div>
        </div>

        {/* 统计条 */}
        <div className="px-4 pb-3">
          <div className="bg-[#1A1208] rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#B8973A]" />
              <span className="text-sm text-white">待核销</span>
            </div>
            <span className="text-lg font-bold text-[#B8973A]">{orders.length} 单</span>
          </div>
        </div>

        {/* 列表 */}
        <div className="px-4 pb-5 space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl py-16 flex flex-col items-center gap-2">
              <Package size={32} className="text-[#D8CCBC]" />
              <p className="text-xs text-[#8C7B6B]">没有找到匹配的订单</p>
            </div>
          ) : (
            filtered.map((o) => (
              <div key={o.code} className="bg-white rounded-2xl p-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DC]">
                  <span className="text-xs text-[#8C7B6B]">订单号 {o.code}</span>
                  <span className="text-xs text-[#A89685]">{o.date}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1A1208]">{o.items}</p>
                    <p className="text-xs text-[#8C7B6B] mt-1">客户：{o.customer}</p>
                  </div>
                  <span className="text-base font-bold text-[#1A1208]">{o.amount}</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F0E8DC]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8C7B6B]">提货码</span>
                    <span className="text-lg font-bold text-[#B8973A] tracking-widest tabular-nums">{o.pickupCode}</span>
                  </div>
                  <button
                    onClick={() => router.push("/store/verify")}
                    className="bg-[#B8973A] text-[#1A1208] text-sm font-bold px-5 py-2 rounded-lg active:opacity-80"
                  >
                    核销
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
