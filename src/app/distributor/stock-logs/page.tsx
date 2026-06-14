"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package, TrendingUp, TrendingDown } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const logs = [
  { id: 1, type: "in", productName: "臻润修护精华液 30ml", qty: 20, remainQty: 20, date: "2024-12-10 10:30", note: "采购入仓" },
  { id: 2, type: "out", productName: "臻润修护精华液 30ml", qty: -3, remainQty: 17, date: "2024-12-11 14:22", note: "订单出库 #2024121100001" },
  { id: 3, type: "in", productName: "焕亮嫩肤面霜 50ml", qty: 15, remainQty: 15, date: "2024-12-12 09:15", note: "采购入仓" },
  { id: 4, type: "out", productName: "焕亮嫩肤面霜 50ml", qty: -2, remainQty: 13, date: "2024-12-12 16:40", note: "订单出库 #2024121200003" },
  { id: 5, type: "out", productName: "臻润修护精华液 30ml", qty: -5, remainQty: 12, date: "2024-12-13 11:05", note: "订单出库 #2024121300007" },
  { id: 6, type: "in", productName: "深层补水面膜 5片装", qty: 30, remainQty: 30, date: "2024-12-14 08:50", note: "采购入仓" },
];

export default function StockLogsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "in" | "out">("all");

  const filtered = filter === "all" ? logs : logs.filter(l => l.type === filter);

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">库存明细</span>
          <div className="w-8" />
        </div>

        {/* 筛选 */}
        <div className="flex gap-2 px-4 py-3 bg-white border-b border-[#F0E8DC]">
          {[{ key: "all", label: "全部" }, { key: "in", label: "入库" }, { key: "out", label: "出库" }].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as "all" | "in" | "out")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filter === f.key ? "bg-[#1A1208] text-white" : "bg-[#F5EFE8] text-[#3D2B1A]"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.map(log => (
            <div key={log.id} className="bg-white rounded-xl px-4 py-3 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${log.type === "in" ? "bg-[#E8F5E9]" : "bg-[#FFEBEE]"}`}>
                {log.type === "in"
                  ? <TrendingUp size={16} className="text-[#388E3C]" />
                  : <TrendingDown size={16} className="text-[#E57373]" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1A1208] truncate">{log.productName}</p>
                <p className="text-xs text-[#8C7B6B] mt-0.5">{log.note}</p>
                <p className="text-xs text-[#B8A898] mt-0.5">{log.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-bold ${log.type === "in" ? "text-[#388E3C]" : "text-[#E57373]"}`}>
                  {log.type === "in" ? "+" : ""}{log.qty}
                </p>
                <p className="text-xs text-[#8C7B6B] mt-0.5">余 {log.remainQty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
