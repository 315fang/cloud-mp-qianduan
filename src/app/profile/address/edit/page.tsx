"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function AddressEditPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", region: "", detail: "", isDefault: false });
  const set = (k: keyof typeof form, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const valid = form.name && form.phone.length === 11 && form.region && form.detail;

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">新增地址</span>
          <div className="w-8" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="bg-white rounded-2xl overflow-hidden divide-y divide-[#F0E8DC]">
            {[
              { label: "收货人", key: "name", placeholder: "请输入姓名", type: "text" },
              { label: "手机号码", key: "phone", placeholder: "请输入手机号", type: "tel" },
            ].map(({ label, key, placeholder, type }) => (
              <div key={key} className="flex items-center px-4 py-3.5 gap-3">
                <span className="text-sm text-[#8C7B6B] w-16 shrink-0">{label}</span>
                <input
                  className="flex-1 text-sm text-[#1A1208] placeholder:text-[#D4C0A8] outline-none bg-transparent"
                  placeholder={placeholder}
                  type={type}
                  value={form[key as "name" | "phone"]}
                  onChange={e => set(key as "name" | "phone", e.target.value)}
                />
              </div>
            ))}
            <div className="flex items-center px-4 py-3.5 gap-3">
              <span className="text-sm text-[#8C7B6B] w-16 shrink-0">所在地区</span>
              <input
                className="flex-1 text-sm text-[#1A1208] placeholder:text-[#D4C0A8] outline-none bg-transparent"
                placeholder="省 / 市 / 区"
                value={form.region}
                onChange={e => set("region", e.target.value)}
              />
            </div>
            <div className="flex items-start px-4 py-3.5 gap-3">
              <span className="text-sm text-[#8C7B6B] w-16 shrink-0 mt-0.5">详细地址</span>
              <textarea
                className="flex-1 text-sm text-[#1A1208] placeholder:text-[#D4C0A8] outline-none bg-transparent resize-none"
                placeholder="街道、楼栋、门牌号等"
                rows={2}
                value={form.detail}
                onChange={e => set("detail", e.target.value)}
              />
            </div>
          </div>

          {/* 设为默认 */}
          <div className="bg-white rounded-2xl px-4 py-3.5 flex items-center justify-between">
            <span className="text-sm text-[#1A1208]">设为默认地址</span>
            <button
              onClick={() => set("isDefault", !form.isDefault)}
              className={`w-11 h-6 rounded-full transition-all relative ${form.isDefault ? "bg-[#B8973A]" : "bg-[#D4C0A8]"}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.isDefault ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        </div>

        <div className="px-4 py-4 bg-white border-t border-[#F0E8DC]">
          <button
            onClick={() => valid && router.back()}
            className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${valid ? "bg-[#1A1208] text-white" : "bg-[#F0E8DC] text-[#B8A898]"}`}
          >
            保存地址
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
