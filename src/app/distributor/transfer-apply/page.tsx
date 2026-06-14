"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

type St = "approved" | "reviewing" | "rejected";

export default function TransferApplyPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | "in" | "out">("all");

  const records: {
    dir: "in" | "out"; target: string; amount: string; status: St;
    source: string; applyAt: string; reviewAt: string; no: string; note: string;
  }[] = [
    {
      dir: "in", target: "李静茵（上级）", amount: "5,000.00", status: "approved",
      source: "合伙人邀约划拨", applyAt: "2024-12-01 10:24", reviewAt: "2024-12-01 10:30",
      no: "HB202412010001", note: "邀约通过，货款已划拨到账",
    },
    {
      dir: "out", target: "陈雅琳（下级）", amount: "3,000.00", status: "reviewing",
      source: "团队扶持划拨", applyAt: "2024-11-30 18:12", reviewAt: "—",
      no: "HB202411300042", note: "等待平台审核",
    },
    {
      dir: "out", target: "王晓（下级）", amount: "2,000.00", status: "rejected",
      source: "团队扶持划拨", applyAt: "2024-11-28 09:40", reviewAt: "2024-11-28 11:20",
      no: "HB202411280018", note: "余额不足，申请已驳回",
    },
  ];

  const meta = (s: St) => ({
    approved: { label: "已通过", color: "text-[#5A8A5A] bg-[#EEF6EE]" },
    reviewing: { label: "审核中", color: "text-[#C8973A] bg-[#FFF7E6]" },
    rejected: { label: "已驳回", color: "text-[#B5564E] bg-[#FBEDEC]" },
  }[s]);

  const tabs = [
    { key: "all" as const, label: "全部" },
    { key: "in" as const, label: "转入" },
    { key: "out" as const, label: "转出" },
  ];

  const filtered = tab === "all" ? records : records.filter((r) => r.dir === tab);

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4] pb-8">
        <header className="sticky top-0 z-10 flex items-center gap-3 surface-noir px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">货款划拨申请</h1>
        </header>

        <div className="surface-noir px-5 pb-5 pt-2">
          <p className="text-xs text-white/60 leading-relaxed">
            货款划拨申请需平台审核，审核通过后款项才会转入对应账户。
          </p>
        </div>

        <div className="px-4 py-5">
          {/* 筛选 */}
          <div className="flex bg-white rounded-xl p-1 mb-4">
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

          {/* 申请记录 */}
          <div className="space-y-3">
            {filtered.map((r, i) => {
              const m = meta(r.status);
              return (
                <div key={i} className="bg-white rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${r.dir === "in" ? "bg-[#EEF6EE]" : "bg-[#FBEDEC]"}`}>
                        {r.dir === "in"
                          ? <ArrowDownLeft size={15} className="text-[#5A8A5A]" />
                          : <ArrowUpRight size={15} className="text-[#B5564E]" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1A1208]">{r.dir === "in" ? "转入" : "转出"} · {r.target}</p>
                        <p className="text-[11px] text-[#A89685] mt-0.5">{r.source}</p>
                      </div>
                    </div>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${m.color}`}>{m.label}</span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F5EFE8]">
                    <span className="text-xs text-[#8C7B6B]">划拨金额</span>
                    <span className={`text-base font-bold tabular-nums ${r.dir === "in" ? "text-[#5A8A5A]" : "text-[#B5564E]"}`}>
                      {r.dir === "in" ? "+" : "-"}¥{r.amount}
                    </span>
                  </div>

                  {/* 高密度信息区 */}
                  <div className="mt-3 bg-[#FAF7F4] rounded-xl p-3 space-y-1.5 text-[11px]">
                    <InfoLine label="申请单号" value={r.no} />
                    <InfoLine label="申请时间" value={r.applyAt} />
                    <InfoLine label="审核时间" value={r.reviewAt} />
                    <InfoLine label="审核说明" value={r.note} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-[#A89685] shrink-0">{label}</span>
      <span className="text-[#3D2B1A] text-right">{value}</span>
    </div>
  );
}
