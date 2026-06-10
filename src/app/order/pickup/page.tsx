"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Phone, Navigation, Copy, Check, Clock } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const credential = {
  status: "待提货" as "待提货" | "已核销",
  code: "8472 3915 6024",
  orderId: "ORD202412080012",
  pickupDeadline: "2024-12-15 前",
  store: { name: "问兰美学旗舰店（园区店）", address: "苏州市工业园区星海街 200 号问兰中心 1 层", phone: "0512-62917333" },
};

export default function PickupPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const verified = credential.status === "已核销";

  const handleCopy = () => {
    navigator.clipboard?.writeText(credential.code.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PhoneFrame hideNav>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]" aria-label="返回">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">提货凭证</span>
          <span className="w-8" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 状态 */}
          <div className="flex items-center justify-center">
            <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${verified ? "bg-[#F5EFE8] text-[#8C7B6B]" : "bg-[#E8F5EC] text-[#3D8B5F]"}`}>
              {credential.status}
            </span>
          </div>

          {/* 凭证大卡 */}
          <div className="bg-[#1A1208] rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #D4AF5A, transparent 70%)" }} />
            <p className="text-center text-xs text-white/60 mb-3">向门店店员出示核销码</p>
            <div className="text-center my-2">
              <span className="text-3xl font-bold tracking-[0.15em]" style={{ filter: verified ? "blur(6px)" : "none" }}>{credential.code}</span>
            </div>
            {verified && <p className="text-center text-xs text-[#D4AF5A] mt-2">该凭证已核销</p>}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10 text-xs text-white/60">
              <span>订单号 {credential.orderId}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {credential.pickupDeadline}</span>
            </div>
            <button onClick={handleCopy} className="w-full mt-4 py-2.5 bg-[#B8973A] rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              {copied ? <><Check size={15} /> 已复制</> : <><Copy size={15} /> 复制核销码</>}
            </button>
          </div>

          {/* 门店信息 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-3">提货门店</h3>
            <p className="text-sm font-medium text-[#1A1208]">{credential.store.name}</p>
            <div className="flex items-start gap-2 mt-2">
              <MapPin size={15} className="text-[#8C7B6B] shrink-0 mt-0.5" />
              <span className="text-xs text-[#8C7B6B] leading-relaxed">{credential.store.address}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Phone size={15} className="text-[#8C7B6B] shrink-0" />
              <span className="text-xs text-[#8C7B6B]">{credential.store.phone}</span>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2.5 bg-[#F5EFE8] text-[#1A1208] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
                <Navigation size={14} /> 导航前往
              </button>
              <button className="flex-1 py-2.5 bg-[#F5EFE8] text-[#1A1208] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
                <Phone size={14} /> 联系门店
              </button>
            </div>
          </div>

          {/* 使用说明 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-2">使用规则</h3>
            <ul className="space-y-1.5 text-xs text-[#8C7B6B] leading-relaxed">
              <li>· 请于 {credential.pickupDeadline} 到店提货，逾期凭证将失效</li>
              <li>· 提货时请向店员出示核销码或复制码</li>
              <li>· 每个核销码仅限使用一次</li>
              <li>· 如需改期或退货，请联系在线客服</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
