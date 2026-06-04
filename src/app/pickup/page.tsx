"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Phone, Clock, ChevronRight, Navigation } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const stations = [
  {
    id: "1", name: "云肌美妆旗舰店", address: "上海市浦东新区张江高科技园区科苑路XXX号",
    phone: "021-12345678", distance: "0.8km", hours: "10:00-22:00", available: 3,
  },
  {
    id: "2", name: "云肌体验中心（陆家嘴）", address: "上海市浦东新区陆家嘴环路XXX号正大广场B1",
    phone: "021-87654321", distance: "2.3km", hours: "10:00-22:00", available: 8,
  },
  {
    id: "3", name: "云肌专柜（静安大悦城）", address: "上海市静安区大宁路XXX号大悦城L3",
    phone: "021-11223344", distance: "5.6km", hours: "10:00-21:30", available: 0,
  },
];

export default function PickupPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <PhoneFrame>
      <div className="min-h-screen bg-[#F5EFE8] flex flex-col">
        <div className="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="font-bold text-[#1A1208]">选择自提门店</span>
        </div>

        {/* 地图占位 */}
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden bg-[#E8DDD0] h-44 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={28} className="text-[#B8973A] mx-auto mb-1" />
            <p className="text-xs text-[#8C7B6B]">地图加载中</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-24 space-y-3 p-4">
          {stations.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`w-full text-left bg-white rounded-2xl px-4 py-4 transition-all ${selected === s.id ? "ring-2 ring-[#B8973A]" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-[#1A1208]">{s.name}</span>
                    {s.available === 0 && (
                      <span className="text-[10px] bg-red-50 text-red-400 px-1.5 py-0.5 rounded-full">暂无库存</span>
                    )}
                  </div>
                  <p className="text-xs text-[#8C7B6B] mb-2">{s.address}</p>
                  <div className="flex items-center gap-4 text-xs text-[#8C7B6B]">
                    <span className="flex items-center gap-1"><Clock size={11} />{s.hours}</span>
                    <span className="flex items-center gap-1"><Phone size={11} />{s.phone}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs text-[#B8973A] font-medium">{s.distance}</span>
                  <Navigation size={14} className="text-[#B8973A]" />
                </div>
              </div>
              {s.available > 0 && (
                <p className="text-xs text-green-600 mt-2">库存充足，可自提 {s.available} 件</p>
              )}
            </button>
          ))}
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#F0E8DC] px-4 py-3">
          <button
            disabled={!selected}
            className={`w-full py-3 rounded-full text-sm font-bold transition-colors ${selected ? "bg-[#1A1208] text-white" : "bg-[#F0E8DC] text-[#C4A882]"}`}
          >
            确认选择门店
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
