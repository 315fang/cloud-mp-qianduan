"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ScanLine, Check, AlertCircle, Store, ChevronRight, Clock, ShieldAlert, MapPin } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

// 当前账号是否具备门店核销权限（门店体系人员）
const hasPermission = true;

// 当前门店范围：该账号只能核销所属门店的订单
const currentStore = {
  name: "问兰美学旗舰店（园区店）",
  address: "苏州市工业园区星海街 200 号问兰中心 1 层",
  scope: "仅可核销本门店订单",
  pendingCount: 3,
};

// 16 位核销码示例
const VALID_CODE = "8842603511794420";

const matchedOrder = {
  code: "DEP202411270006",
  customer: "李**",
  phone: "158****8888",
  items: "雪绒花修护精华 ×1",
  amount: "¥780",
  store: "问兰美学旗舰店（园区店）",
};

function formatCode(raw: string) {
  return raw.replace(/(.{4})/g, "$1 ").trim();
}

export default function VerifyConsolePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState<null | { ok: boolean; order?: typeof matchedOrder }>(null);

  // 无权限整页空态
  if (!hasPermission) {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full bg-[#1A1208]">
          <header className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center -ml-1" aria-label="返回">
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-base font-bold text-white">核销台</h1>
          </header>
          <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-5">
              <ShieldAlert size={36} className="text-[#D4AF5A]" />
            </div>
            <p className="text-base font-bold text-white">暂无核销权限</p>
            <p className="text-sm text-white/50 mt-2 leading-relaxed">
              核销功能仅向门店体系人员（店长 / 店员）开放。如需开通，请联系所属门店管理员或品牌方。
            </p>
            <button onClick={() => router.back()} className="mt-6 px-6 py-2.5 bg-[#B8973A] text-[#1A1208] text-sm font-bold rounded-full">
              返回
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  const handleVerify = () => {
    const raw = code.replace(/\s/g, "");
    if (raw.length !== 16) return;
    if (raw === VALID_CODE) {
      setVerified({ ok: true, order: matchedOrder });
    } else {
      setVerified({ ok: false });
    }
  };

  const handleConfirm = () => {
    setCode("");
    setVerified(null);
    router.push("/store/pending");
  };

  const rawLen = code.replace(/\s/g, "").length;

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#1A1208]">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A1208] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1" aria-label="返回">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">核销台</h1>
        </header>

        <div className="px-5 pb-8">
          {/* 当前门店范围卡 */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#B8973A]/20 flex items-center justify-center shrink-0">
                <Store size={17} className="text-[#D4AF5A]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">{currentStore.name}</p>
                <p className="flex items-start gap-1 text-[11px] text-white/50 mt-1">
                  <MapPin size={11} className="mt-0.5 shrink-0" /> {currentStore.address}
                </p>
                <span className="inline-block mt-2 text-[10px] text-[#D4AF5A] bg-[#B8973A]/15 px-2 py-0.5 rounded-full">
                  {currentStore.scope}
                </span>
              </div>
            </div>
            {/* 待核订单快捷入口 */}
            <button
              onClick={() => router.push("/store/pending")}
              className="w-full mt-3 pt-3 border-t border-white/10 flex items-center gap-2"
            >
              <Clock size={15} className="text-[#D4AF5A]" />
              <span className="text-xs text-white/80 flex-1 text-left">待核销订单</span>
              <span className="text-xs font-bold text-[#D4AF5A]">{currentStore.pendingCount} 单待处理</span>
              <ChevronRight size={15} className="text-white/40" />
            </button>
          </div>

          {/* 扫码区 */}
          <button className="w-full mt-5 aspect-[4/3] rounded-2xl border-2 border-dashed border-[#B8973A]/40 bg-white/5 flex flex-col items-center justify-center gap-3 active:bg-white/10 transition-colors">
            <ScanLine size={48} className="text-[#B8973A]" />
            <span className="text-sm text-white/80 font-medium">点击扫描提货二维码</span>
            <span className="text-xs text-white/40">对准客户出示的核销码</span>
          </button>

          {/* 分隔 */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/40">或手动输入 16 位核销码</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* 手动输入 16 位核销码 */}
          <div className="bg-white/5 rounded-2xl p-4">
            <input
              value={code}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                setCode(formatCode(raw));
                setVerified(null);
              }}
              placeholder="请输入 16 位核销码"
              inputMode="numeric"
              className="w-full bg-transparent text-center text-lg font-bold text-white placeholder:text-white/30 tracking-[0.15em] outline-none py-2 font-mono"
            />
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-[10px] text-white/40">{rawLen} / 16 位</span>
            </div>
            <button
              onClick={handleVerify}
              disabled={rawLen !== 16}
              className={`w-full mt-3 text-sm font-bold py-3 rounded-xl active:opacity-80 ${
                rawLen === 16 ? "bg-[#B8973A] text-[#1A1208]" : "bg-white/10 text-white/40"
              }`}
            >
              查询订单
            </button>
            <p className="text-[10px] text-white/30 text-center mt-2">演示：输入 8842 6035 1179 4420 可匹配示例订单</p>
          </div>

          {/* 查询结果 */}
          {verified?.ok && verified.order && (
            <div className="mt-5 bg-white rounded-2xl p-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F0E8DC]">
                <Check size={18} className="text-[#2D8C5E]" />
                <span className="text-sm font-bold text-[#1A1208]">找到待核销订单</span>
              </div>
              <div className="space-y-2 mt-3 text-sm">
                {[
                  ["订单号", verified.order.code],
                  ["客户", `${verified.order.customer} ${verified.order.phone}`],
                  ["商品", verified.order.items],
                  ["核销门店", verified.order.store],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <span className="text-[#8C7B6B] shrink-0">{k}</span>
                    <span className="text-[#1A1208] text-right">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-1">
                  <span className="text-[#8C7B6B]">金额</span>
                  <span className="text-base font-bold text-[#1A1208]">{verified.order.amount}</span>
                </div>
              </div>
              <button
                onClick={handleConfirm}
                className="w-full mt-4 bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3 rounded-xl active:opacity-80"
              >
                确认核销
              </button>
            </div>
          )}

          {verified && !verified.ok && (
            <div className="mt-5 bg-white rounded-2xl p-5 flex items-center gap-3">
              <AlertCircle size={20} className="text-[#E8857A] shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#1A1208]">未找到对应订单</p>
                <p className="text-xs text-[#8C7B6B] mt-0.5">请核对核销码，或确认该订单是否属于本门店</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
