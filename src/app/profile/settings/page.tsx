"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function SettingsPage() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const rows = [
    { label: "账号与安全", desc: "手机号、密码设置", action: () => {} },
    { label: "实名认证", desc: "已认证", action: () => {} },
    { label: "隐私设置", desc: "", action: () => router.push("/profile/privacy") },
    { label: "帮助中心", desc: "", action: () => router.push("/profile/help") },
    { label: "关于云肌", desc: "v1.0.0", action: () => {} },
    { label: "清除缓存", desc: "12.5 MB", action: () => {} },
  ];

  return (
    <PhoneFrame hideNav>
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]"
        >
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </button>
        <h1 className="text-base font-bold text-[#1A1208]">设置</h1>
        <div className="w-8" />
      </header>

      <div className="px-4 space-y-3 pb-8">
        {/* 通知设置 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <p className="text-xs font-semibold text-[#8C7B6B] px-4 py-2.5 border-b border-[#F9F5F0]">通知设置</p>
          {[
            { label: "推送通知", value: pushEnabled, set: setPushEnabled },
            { label: "短信通知", value: smsEnabled, set: setSmsEnabled },
          ].map(({ label, value, set }, idx, arr) => (
            <div
              key={label}
              className={`flex items-center px-4 py-3.5 ${idx < arr.length - 1 ? "border-b border-[#F9F5F0]" : ""}`}
            >
              <span className="flex-1 text-sm text-[#1A1208]">{label}</span>
              <button
                onClick={() => set(!value)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  value ? "bg-[#1A1208]" : "bg-[#D5C9BC]"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                    value ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* 其他设置 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          {rows.map(({ label, desc, action }, idx) => (
            <button
              key={label}
              onClick={action}
              className={`w-full flex items-center px-4 py-3.5 active:bg-[#FAF7F4] transition-colors text-left ${
                idx < rows.length - 1 ? "border-b border-[#F9F5F0]" : ""
              }`}
            >
              <span className="flex-1 text-sm text-[#1A1208]">{label}</span>
              {desc && <span className="text-xs text-[#8C7B6B] mr-2">{desc}</span>}
              <ChevronRight size={15} className="text-[#C0B0A0]" />
            </button>
          ))}
        </div>

        {/* 退出登录 */}
        <button className="w-full bg-white rounded-2xl py-4 text-sm font-semibold text-red-400">
          退出登录
        </button>
      </div>
    </PhoneFrame>
  );
}
