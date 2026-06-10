"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Crown, Check, Users, ChevronRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const levels = [
  {
    level: 1, name: "普通会员", brief: "注册即享，开启美学之旅", current: false, passed: true,
    perks: ["每单消费 1 积分/元", "生日双倍积分", "积分商城兑换", "专属新人礼包"],
    isDistributor: false,
  },
  {
    level: 2, name: "精英会员", brief: "累计成长值 3000，尊享专属折扣", current: true, passed: false,
    perks: ["每单消费 1.5 积分/元", "全场 9.5 折", "专属客服通道", "优先发货", "生日三倍积分"],
    isDistributor: false,
  },
  {
    level: 3, name: "高级推广员", brief: "开通分销资格，享团队佣金", current: false, passed: false,
    perks: ["直推佣金 15%", "团队分佣 5%", "专属推广素材", "货款账户", "团队管理工具"],
    isDistributor: true,
  },
  {
    level: 4, name: "运营合伙人", brief: "顶级身份，享全链路收益", current: false, passed: false,
    perks: ["直推佣金 25%", "团队分佣 10%", "基金池分红", "区域运营权益", "专属培训"],
    isDistributor: true,
  },
];

const faqs = [
  { q: "成长值如何获得？", a: "消费、签到、评价、邀请好友均可累计成长值，成长值决定消费等级。" },
  { q: "分销身份如何开通？", a: "达到精英会员后，可在分销中心提交合伙人申请，审核通过即开通。" },
  { q: "佣金、货款在哪里查看？", a: "所有团队收益、佣金、货款明细均在「团队中心」统一查看与管理。" },
  { q: "等级会降级吗？", a: "消费等级按自然年累计，分销等级根据团队业绩动态评定。" },
];

export default function RightsPage() {
  const router = useRouter();
  const [active, setActive] = useState(2);
  const cur = levels.find((l) => l.level === active)!;

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]" aria-label="返回">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">身份权益说明</span>
          <span className="w-8" />
        </div>

        {/* 等级切换 Tabs */}
        <div className="flex gap-2 px-4 py-3 bg-white border-b border-[#F0E8DC] overflow-x-auto scrollbar-hide">
          {levels.map((l) => (
            <button
              key={l.level}
              onClick={() => setActive(l.level)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${active === l.level ? "bg-[#1A1208] text-white" : "bg-[#F5EFE8] text-[#8C7B6B]"}`}
            >
              Lv{l.level} {l.name}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto pb-6">
          {/* 当前等级大卡 */}
          <div className={`mx-4 mt-4 rounded-2xl p-5 ${cur.level >= 3 ? "bg-[#1A1208] text-white" : "bg-white"}`}>
            <div className="flex items-center gap-2 mb-2">
              <Crown size={20} className="text-[#D4AF5A]" />
              <span className={`text-lg font-bold ${cur.level >= 3 ? "text-white" : "text-[#1A1208]"}`}>Lv.{cur.level} {cur.name}</span>
              {cur.current && <span className="ml-auto text-[10px] bg-[#B8973A] text-white px-2 py-0.5 rounded-full">当前等级</span>}
              {cur.passed && <span className="ml-auto text-[10px] text-[#8C7B6B]">已达成</span>}
              {!cur.current && !cur.passed && <span className="ml-auto text-[10px] text-[#B8973A]">待解锁</span>}
            </div>
            <p className={`text-xs ${cur.level >= 3 ? "text-white/60" : "text-[#8C7B6B]"}`}>{cur.brief}</p>
          </div>

          {/* 特权概览 */}
          <div className="mx-4 mt-4 bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-3">特权概览</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {cur.perks.map((p) => (
                <div key={p} className="flex items-start gap-2 p-2.5 bg-[#FAF7F4] rounded-xl">
                  <Check size={14} className="text-[#B8973A] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#3D2B1A] leading-snug">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 团队经营说明（分销等级） */}
          {cur.isDistributor && (
            <div className="mx-4 mt-4 bg-[#FFF7E6] rounded-2xl p-4 flex items-start gap-3">
              <Users size={18} className="text-[#B8973A] shrink-0 mt-0.5" />
              <p className="text-xs text-[#8C5A1A] leading-relaxed">
                该等级为分销身份，团队成员、佣金收益、货款账户等经营数据请前往「团队中心」查看与管理。
              </p>
            </div>
          )}

          {/* 升级路线图 */}
          <div className="mx-4 mt-4 bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-4">升级路线</h3>
            <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
              {levels.map((l, i) => (
                <div key={l.level} className="flex items-center shrink-0">
                  <div className="flex flex-col items-center gap-1.5 w-16">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${l.current ? "bg-[#B8973A] text-white" : l.passed ? "bg-[#1A1208] text-white" : "bg-[#F5EFE8] text-[#B8A898]"}`}>
                      {l.level}
                    </div>
                    <span className={`text-[10px] text-center leading-tight ${l.current ? "text-[#B8973A] font-bold" : "text-[#8C7B6B]"}`}>{l.name}</span>
                  </div>
                  {i < levels.length - 1 && <div className="w-6 h-0.5 bg-[#E8DDD0]" />}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mx-4 mt-4 bg-white rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-[#1A1208]">常见问题</h3>
            {faqs.map((f) => (
              <div key={f.q} className="pb-3 border-b border-[#F0E8DC] last:border-0 last:pb-0">
                <p className="text-sm font-medium text-[#1A1208] mb-1">{f.q}</p>
                <p className="text-xs text-[#8C7B6B] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
