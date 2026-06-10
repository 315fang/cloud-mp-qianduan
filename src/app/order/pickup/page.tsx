"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Phone, Navigation, Copy, Check, Clock, QrCode, ShieldAlert, PackageX, AlertCircle, RefreshCw } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const credential = {
  status: "待提货" as "待发货" | "待提货" | "已核销",
  code: "8472 3915 6024",
  orderId: "ORD202412080012",
  pickupDeadline: "2024-12-15 前",
  store: { name: "问兰美学旗舰店（园区店）", address: "苏州市工业园区星海街 200 号问兰中心 1 层", phone: "0512-62917333" },
};

type PageState = "ready" | "error";

export default function PickupPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  // 凭证状态（演示可切换）：待发货不可核销
  const [status, setStatus] = useState<typeof credential.status>(credential.status);
  // 整页运行态（演示可切换）：ready / error（加载失败或无权查看）
  const [pageState, setPageState] = useState<PageState>("ready");
  const verified = status === "已核销";
  const notShipped = status === "待发货";

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
          <button
            onClick={() => {
              // 演示循环：待提货 -> 待发货 -> 加载失败 -> 待提货
              if (pageState === "error") { setPageState("ready"); setStatus("待提货"); }
              else if (notShipped) { setPageState("error"); }
              else { setStatus("待发货"); }
            }}
            className="text-[10px] text-[#A89685] underline w-8 text-right"
          >
            演示
          </button>
        </div>

        {pageState === "error" ? (
          /* 整页加载失败 / 无权查看异常态 */
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="w-20 h-20 rounded-3xl bg-[#FBEDEC] flex items-center justify-center mb-5">
              <AlertCircle size={36} className="text-[#B5564E]" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-bold text-[#1A1208]">凭证加载失败</h2>
            <p className="text-sm text-[#8C7B6B] mt-2.5 leading-relaxed">
              凭证信息加载失败，或您没有查看该提货凭证的权限。请确认登录账号后重试，或联系客服处理。
            </p>
            <button
              onClick={() => { setPageState("ready"); setStatus("待提货"); }}
              className="mt-6 flex items-center gap-1.5 bg-[#1A1208] text-white text-sm font-bold px-8 py-3 rounded-xl active:opacity-80"
            >
              <RefreshCw size={15} /> 重新加载
            </button>
            <button onClick={() => router.back()} className="mt-3 text-sm text-[#8C7B6B]">
              返回上一页
            </button>
          </div>
        ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 状态 */}
          <div className="flex flex-col items-center gap-2">
            <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${
              verified
                ? "bg-[#F5EFE8] text-[#8C7B6B]"
                : notShipped
                ? "bg-[#FBF0E6] text-[#B8763A]"
                : "bg-[#E8F5EC] text-[#3D8B5F]"
            }`}>
              {status}
            </span>
            {notShipped && (
              <div className="flex items-center gap-1.5 bg-[#FBF0E6] text-[#B8763A] text-xs px-3 py-1.5 rounded-full">
                <PackageX size={13} />
                <span>商家未发货，暂不可核销，请等待发货后再到店核销</span>
              </div>
            )}
          </div>

          {/* 凭证票券 */}
          <div className="relative">
            {/* 顶部金边票头 */}
            <div className="rounded-t-2xl px-6 pt-5 pb-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#3A2A18 0%,#1F1509 50%,#241A10 100%)" }}>
              {/* 雕版同心纹 */}
              <svg className="absolute -right-10 -top-10 w-40 h-40 opacity-[0.10]" viewBox="0 0 200 200" fill="none" stroke="#E7C977" aria-hidden="true">
                {Array.from({ length: 6 }).map((_, i) => (
                  <circle key={i} cx="100" cy="100" r={20 + i * 13} strokeWidth="0.6" />
                ))}
              </svg>
              <span className="absolute -bottom-4 right-3 text-[88px] leading-none font-serif text-[#E7C977]/[0.07] select-none pointer-events-none">兰</span>

              <div className="relative flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border border-[#E7C977]/50 flex items-center justify-center font-serif text-[11px] text-[#E7C977]" style={{ background: "rgba(231,201,119,0.08)" }}>兰</span>
                <p className="text-[11px] font-bold text-[#F1E4C4] tracking-wide">问兰提货凭证</p>
              </div>
              <p className="relative text-center text-[11px] text-[#C9B68C]/70 mt-4 tracking-wider">向门店店员出示核销码</p>
              <div className="relative text-center mt-2">
                <span className="text-[32px] font-bold tracking-[0.12em] bg-gradient-to-b from-[#F8EBC6] to-[#CDA047] bg-clip-text text-transparent" style={{ filter: verified || notShipped ? "blur(6px)" : "none" }}>
                  {credential.code}
                </span>
              </div>
              {verified && <p className="relative text-center text-xs text-[#E7C977] mt-2">该凭证已核销</p>}
              {notShipped && <p className="relative text-center text-xs text-[#E7C977] mt-2">商家发货后核销码生效</p>}
            </div>

            {/* 撕裂线 + 两侧缺口 */}
            <div className="relative h-0">
              <span className="absolute -left-2 -top-2.5 w-5 h-5 rounded-full bg-[#FAF7F4]" />
              <span className="absolute -right-2 -top-2.5 w-5 h-5 rounded-full bg-[#FAF7F4]" />
            </div>

            {/* 票根信息 */}
            <div className="bg-white rounded-b-2xl px-6 pt-5 pb-5 border-t-2 border-dashed border-[#EAD9B8]">
              <div className="flex items-center justify-between text-xs text-[#8C7B6B]">
                <span>订单号 {credential.orderId}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {credential.pickupDeadline}</span>
              </div>
              <button onClick={handleCopy} className="w-full mt-4 py-2.5 bg-[#1A1208] rounded-xl text-sm font-bold text-[#F1E4C4] flex items-center justify-center gap-2">
                {copied ? <><Check size={15} /> 已复制</> : <><Copy size={15} /> 复制核销码</>}
              </button>
            </div>
          </div>

          {/* 出示二维码 */}
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center">
            <p className="text-sm font-bold text-[#1A1208] mb-1">出示二维码</p>
            <p className="text-[11px] text-[#8C7B6B] mb-4">店员扫码即可完成核销</p>
            <div className={`w-44 h-44 rounded-2xl bg-[#FAF7F4] border border-[#F0E8DC] flex items-center justify-center ${verified || notShipped ? "opacity-40" : ""}`}>
              <QrCode size={140} className="text-[#1A1208]" strokeWidth={1} style={{ filter: verified || notShipped ? "blur(4px)" : "none" }} />
            </div>
            <p className="text-xs text-[#8C7B6B] mt-4 tracking-[0.1em]">{credential.code}</p>
            {verified && <p className="text-xs text-[#B85A2A] mt-1">该二维码已核销</p>}
            {notShipped && <p className="text-xs text-[#B8763A] mt-1">商家发货后二维码生效</p>}
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

          {/* 仅限该门店核销说明 */}
          <div className="bg-[#FBF5E6] rounded-2xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F3E4BE] flex items-center justify-center shrink-0">
              <ShieldAlert size={18} className="text-[#B8973A]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1208]">仅限该门店核销</p>
              <p className="text-xs text-[#8C7B6B] leading-relaxed mt-1">
                本凭证只能在下单时选定的
                <span className="text-[#1A1208] font-medium">「{credential.store.name}」</span>
                核销使用，其他门店无法代为核销。如需更换提货门店，请联系在线客服处理。
              </p>
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
        )}
      </div>
    </PhoneFrame>
  );
}
