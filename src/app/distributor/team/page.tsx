"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  ChevronRight,
  Search,
  TrendingUp,
  Crown,
  UserPlus,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

// 团队成员数据
const allMembers = [
  { id: "1", name: "林*燕", phone: "138****8812", level: "L2", joinDate: "2024-03", sales: 12400, commission: 620, status: "活跃", avatar: "林" },
  { id: "2", name: "张*华", phone: "139****4421", level: "L2", joinDate: "2024-04", sales: 9800, commission: 490, status: "活跃", avatar: "张" },
  { id: "3", name: "王*静", phone: "135****7730", level: "L1", joinDate: "2024-05", sales: 7200, commission: 360, status: "活跃", avatar: "王" },
  { id: "4", name: "赵*丽", phone: "136****2290", level: "L1", joinDate: "2024-06", sales: 5600, commission: 280, status: "活跃", avatar: "赵" },
  { id: "5", name: "陈*芳", phone: "137****5518", level: "L1", joinDate: "2024-06", sales: 4100, commission: 205, status: "活跃", avatar: "陈" },
  { id: "6", name: "刘*明", phone: "133****9934", level: "L1", joinDate: "2024-07", sales: 2800, commission: 140, status: "活跃", avatar: "刘" },
  { id: "7", name: "李*雯", phone: "134****1123", level: "L1", joinDate: "2024-08", sales: 1500, commission: 75, status: "新人", avatar: "李" },
  { id: "8", name: "孙*磊", phone: "138****6677", level: "L1", joinDate: "2024-09", sales: 800, commission: 40, status: "新人", avatar: "孙" },
  { id: "9", name: "周*云", phone: "139****2234", level: "L1", joinDate: "2024-10", sales: 400, commission: 20, status: "不活跃", avatar: "周" },
  { id: "10", name: "吴*婷", phone: "135****8890", level: "L1", joinDate: "2024-11", sales: 200, commission: 10, status: "不活跃", avatar: "吴" },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  活跃: { bg: "#E8F5EE", text: "#2D8C5E" },
  新人: { bg: "#EBF1FB", text: "#4A7CC7" },
  不活跃: { bg: "#F5EFE8", text: "#8C7B6B" },
};

const levelColors: Record<string, string> = {
  L2: "#B8973A",
  L1: "#8C7B6B",
};

const tabs = ["全部 (10)", "L2 (2)", "L1 (8)", "不活跃 (2)"];

export default function TeamPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");

  const filtered = allMembers.filter((m) => {
    const matchTab =
      activeTab === 0
        ? true
        : activeTab === 1
        ? m.level === "L2"
        : activeTab === 2
        ? m.level === "L1"
        : m.status === "不活跃";
    const matchQuery = query.trim()
      ? m.name.replace(/\*/g, "").includes(query.trim())
      : true;
    return matchTab && matchQuery;
  });

  const totalSales = allMembers.reduce((s, m) => s + m.sales, 0);
  const totalCommission = allMembers.reduce((s, m) => s + m.commission, 0);

  return (
    <PhoneFrame hideNav>
      {/* 顶部 */}
      <div className="bg-[#1A1208] px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10"
            aria-label="返回"
          >
            <ArrowLeft size={17} className="text-white" />
          </button>
          <span className="text-sm font-bold text-white">我的团队</span>
          <button
            onClick={() => router.push("/distributor/invite")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#B8973A]"
            aria-label="邀请"
          >
            <UserPlus size={15} className="text-white" />
          </button>
        </div>

        {/* 团队数据卡 */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "团队总人数", value: "16人", icon: Users },
            { label: "本月业绩", value: `¥${(totalSales / 100).toFixed(0)}w`, icon: TrendingUp },
            { label: "本月佣金", value: `¥${totalCommission}`, icon: Crown },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white/10 rounded-2xl p-3 text-center">
              <Icon size={16} className="text-[#B8973A] mx-auto mb-1" strokeWidth={1.5} />
              <p className="text-base font-bold text-white">{value}</p>
              <p className="text-[10px] text-white/50 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#FAF7F4] flex-1 overflow-y-auto">
        {/* 搜索栏 */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 border border-[#E8DDD0]">
            <Search size={14} className="text-[#8C7B6B]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索成员姓名..."
              className="flex-1 text-[13px] text-[#1A1208] bg-transparent outline-none placeholder:text-[#8C7B6B]"
            />
          </div>
        </div>

        {/* 分类Tab */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-shrink-0 text-xs font-medium px-4 py-1.5 rounded-full transition-all ${
                activeTab === i ? "bg-[#1A1208] text-white" : "bg-white text-[#3D2B1A] border border-[#E8DDD0]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 成员列表 */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-2xl overflow-hidden divide-y divide-[#F9F5F0]">
            {filtered.length === 0 ? (
              <div className="py-16 flex flex-col items-center text-[#8C7B6B]">
                <Users size={40} strokeWidth={1} className="text-[#E8DDD0] mb-3" />
                <p className="text-sm">暂无成员</p>
              </div>
            ) : (
              filtered.map((member) => {
                const statusStyle = statusColors[member.status] || statusColors.活跃;
                return (
                  <Link key={member.id} href={`/distributor/team/${member.id}`} className="flex items-center gap-3 px-4 py-3 active:bg-[#FAF7F4] transition-colors">
                    {/* 头像 */}
                    <div className="w-10 h-10 rounded-full bg-[#F5EFE8] flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold" style={{ color: levelColors[member.level] || "#8C7B6B" }}>
                        {member.avatar}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-[#1A1208]">{member.name}</p>
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border"
                          style={{ color: levelColors[member.level], borderColor: levelColors[member.level] + "66" }}
                        >
                          {member.level}
                        </span>
                        <span
                          className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                          style={{ background: statusStyle.bg, color: statusStyle.text }}
                        >
                          {member.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#8C7B6B] mt-0.5">{member.phone} · 加入 {member.joinDate}</p>
                      <p className="text-[10px] text-[#8C7B6B]">
                        本月销售 <span className="text-[#1A1208] font-medium">¥{member.sales.toLocaleString()}</span>
                        {" · "}产生佣金 <span className="text-[#2D8C5E] font-medium">¥{member.commission}</span>
                      </p>
                    </div>

                    <ChevronRight size={15} className="text-[#C0B0A0] flex-shrink-0" />
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
