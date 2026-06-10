"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Navigation,
  Crosshair,
  Copy,
  Check,
  Store,
  CalendarDays,
  ChevronUp,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

type Station = {
  id: string;
  name: string;
  tags: string[];
  address: string;
  phone: string;
  distance: string;
  hours: string;
  days: string;
  intro: string;
  available: number;
  /** 点位在地图上的相对坐标（百分比），小程序端替换为真实经纬度 */
  x: number;
  y: number;
};

const stations: Station[] = [
  {
    id: "1",
    name: "问兰美妆旗舰店",
    tags: ["旗舰店", "可自提", "支持导航"],
    address: "上海市浦东新区张江高科技园区科苑路 88 号 1 层",
    phone: "021-12345678",
    distance: "0.8km",
    hours: "10:00 - 22:00",
    days: "周一至周日",
    intro: "品牌华东首家旗舰门店，提供全线产品体验、专业肌肤检测与会员专属服务。",
    available: 3,
    x: 32,
    y: 38,
  },
  {
    id: "2",
    name: "问兰体验中心（陆家嘴）",
    tags: ["体验中心", "可自提"],
    address: "上海市浦东新区陆家嘴环路 1000 号正大广场 B1",
    phone: "021-87654321",
    distance: "2.3km",
    hours: "10:00 - 22:00",
    days: "周一至周日",
    intro: "坐落于陆家嘴核心商圈，主打沉浸式护肤体验空间，配备专属护理间。",
    available: 8,
    x: 60,
    y: 30,
  },
  {
    id: "3",
    name: "问兰专柜（静安大悦城）",
    tags: ["商场专柜"],
    address: "上海市静安区大宁路 1888 号大悦城 L3",
    phone: "021-11223344",
    distance: "5.6km",
    hours: "10:00 - 21:30",
    days: "周一至周日",
    intro: "位于静安大悦城三层，提供热销单品自提与新品首发体验。",
    available: 0,
    x: 46,
    y: 64,
  },
];

export default function PickupPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>(stations[0].id);
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const selected = stations.find((s) => s.id === selectedId) ?? stations[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSheetExpanded(true);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const comingSoon = () => {
    // 小程序端：wx.makePhoneCall / wx.openLocation 等原生能力
  };

  return (
    <PhoneFrame hideNav>
      <div className="relative h-screen bg-[#F5EFE8] overflow-hidden">
        {/* 顶部返回栏 */}
        <header className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/25 to-transparent px-4 pt-4 pb-8 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md"
            aria-label="返回"
          >
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="font-bold text-white drop-shadow">门店地图</span>
        </header>

        {/* 上半区：地图 */}
        <div className="relative h-[46%] w-full overflow-hidden">
          {/* 样式化地图底图（小程序端替换为原生 <map>） */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#E4E9E2",
              backgroundImage:
                "linear-gradient(0deg, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(135deg, #E8ECE6 0%, #DCE3DA 100%)",
              backgroundSize: "28px 28px, 28px 28px, 100% 100%",
            }}
          >
            {/* 模拟道路 */}
            <div className="absolute left-0 right-0 top-1/2 h-3 bg-white/70 -rotate-6" />
            <div className="absolute top-0 bottom-0 left-[38%] w-3 bg-white/70 rotate-3" />
            <div className="absolute left-0 right-0 top-[26%] h-2 bg-white/50 rotate-3" />
          </div>

          {/* 地图上方提示条 */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 w-[88%]">
            <div className="bg-white/95 backdrop-blur rounded-full px-4 py-2 shadow-md flex items-center gap-2">
              <MapPin size={14} className="text-[#B8973A] flex-shrink-0" />
              <p className="text-[11px] text-[#3D2B1A] leading-tight">
                已为你定位到 <span className="font-semibold">上海 · 浦东新区</span>，附近共 {stations.length} 家门店
              </p>
            </div>
          </div>

          {/* 门店点位 */}
          {stations.map((s) => {
            const active = s.id === selectedId;
            return (
              <button
                key={s.id}
                onClick={() => handleSelect(s.id)}
                className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-full transition-all"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                aria-label={s.name}
              >
                <div
                  className={`flex items-center justify-center rounded-full shadow-lg transition-all ${
                    active ? "w-10 h-10 bg-[#B8973A]" : "w-8 h-8 bg-[#1A1208]"
                  }`}
                >
                  <Store size={active ? 18 : 14} className="text-white" />
                </div>
                {/* 指针小三角 */}
                <div
                  className={`w-0 h-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent ${
                    active ? "border-t-[#B8973A]" : "border-t-[#1A1208]"
                  }`}
                />
                {active && (
                  <span className="mt-0.5 text-[10px] font-bold text-[#1A1208] bg-white/90 px-1.5 py-0.5 rounded-full whitespace-nowrap shadow">
                    {s.name}
                  </span>
                )}
              </button>
            );
          })}

          {/* 选点查最近店 按钮 */}
          <button
            onClick={() => handleSelect(stations[0].id)}
            className="absolute bottom-4 right-4 z-20 bg-white rounded-full pl-3 pr-4 py-2.5 shadow-lg flex items-center gap-1.5 active:scale-95 transition-transform"
          >
            <Crosshair size={15} className="text-[#B8973A]" />
            <span className="text-xs font-semibold text-[#1A1208]">选点查最近店</span>
          </button>
        </div>

        {/* 下半区：门店列表 */}
        <div className="relative h-[54%] bg-[#F5EFE8] rounded-t-3xl -mt-4 z-20 flex flex-col">
          <div className="px-5 pt-3 pb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1A1208]">附近门店</h2>
            <span className="text-[11px] text-[#8C7B6B]">按距离排序</span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-36 space-y-2.5">
            {stations.map((s) => {
              const active = s.id === selectedId;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelect(s.id)}
                  className={`w-full text-left bg-white rounded-2xl px-4 py-3.5 transition-all ${
                    active ? "ring-2 ring-[#B8973A]" : "ring-1 ring-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-bold text-sm text-[#1A1208]">{s.name}</span>
                        {s.available === 0 ? (
                          <span className="text-[10px] bg-red-50 text-red-400 px-1.5 py-0.5 rounded-full">暂无库存</span>
                        ) : (
                          <span className="text-[10px] bg-[#ECF6F0] text-[#2D8C5E] px-1.5 py-0.5 rounded-full">
                            可自提 {s.available} 件
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#8C7B6B] line-clamp-1 mb-1.5">{s.address}</p>
                      <div className="flex items-center gap-3 text-[11px] text-[#8C7B6B]">
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {s.hours}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-xs text-[#B8973A] font-semibold">{s.distance}</span>
                      <Navigation size={14} className="text-[#B8973A]" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 底部上拉详情卡 */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] z-40 transition-all duration-300 ${
            sheetExpanded ? "bottom-0" : "-bottom-[calc(100%-150px)]"
          }`}
        >
          {/* 抓手 + 概要（始终可见） */}
          <button
            onClick={() => setSheetExpanded((v) => !v)}
            className="w-full px-5 pt-2.5 pb-3"
            aria-label={sheetExpanded ? "收起详情" : "展开详情"}
          >
            <div className="w-10 h-1 bg-[#E8DDD0] rounded-full mx-auto mb-3" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-bold text-[#1A1208] truncate">{selected.name}</span>
                <span className="text-xs text-[#B8973A] font-semibold flex-shrink-0">{selected.distance}</span>
              </div>
              <ChevronUp
                size={18}
                className={`text-[#8C7B6B] transition-transform flex-shrink-0 ${sheetExpanded ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {/* 详情主体 */}
          <div className="px-5 pb-5 max-h-[60vh] overflow-y-auto">
            {/* 标签 */}
            <div className="flex items-center gap-1.5 flex-wrap mb-4">
              {selected.tags.map((t) => (
                <span key={t} className="text-[10px] font-medium text-[#B8973A] bg-[#F8F2E6] px-2 py-0.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            {/* 信息行 */}
            <div className="space-y-3">
              <InfoRow icon={<MapPin size={15} className="text-[#B8973A]" />} label="门店地址" value={selected.address} />
              <InfoRow icon={<Phone size={15} className="text-[#B8973A]" />} label="联系电话" value={selected.phone} />
              <InfoRow icon={<Clock size={15} className="text-[#B8973A]" />} label="营业时间" value={selected.hours} />
              <InfoRow icon={<CalendarDays size={15} className="text-[#B8973A]" />} label="营业日期" value={selected.days} />
            </div>

            {/* 门店介绍 */}
            <div className="mt-4 bg-[#FAF7F4] rounded-xl p-3.5">
              <p className="text-xs font-semibold text-[#3D2B1A] mb-1">门店介绍</p>
              <p className="text-xs text-[#8C7B6B] leading-relaxed">{selected.intro}</p>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-2 mt-5">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 rounded-full border border-[#E8DDD0] text-[#3D2B1A] text-xs font-medium flex items-center justify-center gap-1"
              >
                {copied ? <Check size={14} className="text-[#2D8C5E]" /> : <Copy size={14} />}
                {copied ? "已复制" : "复制地址"}
              </button>
              <button
                onClick={comingSoon}
                className="flex-1 py-2.5 rounded-full border border-[#E8DDD0] text-[#3D2B1A] text-xs font-medium flex items-center justify-center gap-1"
              >
                <Phone size={14} />
                联系门店
              </button>
              <button
                onClick={comingSoon}
                className="flex-1 py-2.5 rounded-full bg-[#1A1208] text-white text-xs font-bold flex items-center justify-center gap-1"
              >
                <Navigation size={14} />
                地图导航
              </button>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-full bg-[#F8F2E6] flex items-center justify-center flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-[#A89684]">{label}</p>
        <p className="text-xs text-[#1A1208] leading-snug mt-0.5">{value}</p>
      </div>
    </div>
  );
}
