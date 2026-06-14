"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package, RefreshCw, MapPin, Phone } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const mockTracking = {
  trackingNo: "SF1234567890123",
  company: "顺丰速运",
  status: "in_transit",
  statusText: "运输中",
  estimatedDelivery: "预计今天 18:00 前送达",
  address: "上海市静安区南京西路 XXX 号",
  events: [
    { time: "2024-12-15 14:32", desc: "快件已到达【上海静安营业部】，派送员：张三（138-0000-0000）", active: true },
    { time: "2024-12-15 09:15", desc: "快件已到达【上海转运中心】，正在卸货分拣" },
    { time: "2024-12-14 22:40", desc: "快件已离开【杭州转运中心】，发往【上海转运中心】" },
    { time: "2024-12-14 18:05", desc: "快件已到达【杭州转运中心】" },
    { time: "2024-12-14 15:20", desc: "快件已从【杭州滨江营业部】发出" },
    { time: "2024-12-14 14:30", desc: "顺丰速运已揽收" },
  ],
};

const statusColors: Record<string, string> = {
  pending: "bg-[#F5EFE8] text-[#8C7B6B]",
  in_transit: "bg-[#FFF7E6] text-[#B8973A]",
  out_for_delivery: "bg-[#E8F5E9] text-[#388E3C]",
  delivered: "bg-[#F5EFE8] text-[#B8973A]",
};

export default function LogisticsPage() {
  const router = useRouter();

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        {/* 导航栏 */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">物流追踪</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <RefreshCw size={16} className="text-[#3D2B1A]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 状态头部 */}
          <div className="surface-noir rounded-2xl p-4 text-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Package size={20} className="text-[#B8973A]" />
              </div>
              <div className="flex-1">
                <div className={`inline-block text-xs px-2 py-0.5 rounded-full mb-1 ${statusColors[mockTracking.status]}`}>
                  {mockTracking.statusText}
                </div>
                <p className="text-sm font-medium">{mockTracking.estimatedDelivery}</p>
                <p className="text-xs text-white/60 mt-0.5">{mockTracking.events[0].desc}</p>
              </div>
            </div>
          </div>

          {/* 运单信息 */}
          <div className="bg-white rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-[#1A1208]">运单信息</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8C7B6B]">快递公司</span>
              <span className="font-medium text-[#1A1208]">{mockTracking.company}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8C7B6B]">运单号</span>
              <button
                className="font-medium text-[#B8973A]"
                onClick={() => navigator.clipboard?.writeText(mockTracking.trackingNo)}
              >
                {mockTracking.trackingNo}（复制）
              </button>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin size={14} className="text-[#8C7B6B] mt-0.5 shrink-0" />
              <span className="text-[#1A1208]">{mockTracking.address}</span>
            </div>
          </div>

          {/* 派件员联系 */}
          <div className="bg-[#FFF7E6] rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#1A1208]">派件员：张三</p>
              <p className="text-xs text-[#8C7B6B] mt-0.5">预计 14:30 ~ 18:00 送达</p>
            </div>
            <a href="tel:13800000000" className="w-10 h-10 rounded-full bg-[#B8973A] flex items-center justify-center">
              <Phone size={16} className="text-white" />
            </a>
          </div>

          {/* 物流时间线 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-4">物流详情</h3>
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#F0E8DC]" />
              <div className="space-y-5">
                {mockTracking.events.map((ev, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 mt-0.5 relative z-10 ${
                      ev.active ? "bg-[#B8973A] border-[#B8973A]" : "bg-white border-[#D4C0A8]"
                    }`} />
                    <div className="flex-1 pb-1">
                      <p className={`text-sm leading-relaxed ${ev.active ? "text-[#1A1208] font-medium" : "text-[#8C7B6B]"}`}>
                        {ev.desc}
                      </p>
                      <p className="text-xs text-[#B8A898] mt-1">{ev.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
