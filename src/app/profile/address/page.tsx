"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Plus, Check, Trash2, Edit2 } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const initialAddresses = [
  {
    id: 1,
    name: "李静茵",
    phone: "158 2288 8888",
    address: "上海市静安区南京西路 1111 号问兰大厦 101 室",
    isDefault: true,
  },
  {
    id: 2,
    name: "王晓明",
    phone: "139 7777 8888",
    address: "北京市朝阳区三里屯路 19 号 B 座 2201",
    isDefault: false,
  },
];

export default function AddressPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState(initialAddresses);

  const setDefault = (id: number) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const removeAddress = (id: number) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <PhoneFrame hideNav>
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]"
        >
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </button>
        <h1 className="text-base font-bold text-[#1A1208]">收货地址</h1>
        <div className="w-8" />
      </header>

      <div className="px-4 py-4 space-y-3 pb-28">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white rounded-2xl px-4 py-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F5EFE8] flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={16} className="text-[#B8973A]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#1A1208]">{addr.name}</span>
                  <span className="text-sm text-[#8C7B6B]">{addr.phone}</span>
                  {addr.isDefault && (
                    <span className="text-[9px] text-white bg-[#B8973A] px-1.5 py-0.5 rounded-full font-medium">
                      默认
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#8C7B6B] mt-1 leading-relaxed">{addr.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#F9F5F0]">
              {!addr.isDefault && (
                <button
                  onClick={() => setDefault(addr.id)}
                  className="flex items-center gap-1 text-xs text-[#8C7B6B]"
                >
                  <Check size={13} />
                  设为默认
                </button>
              )}
              <button className="flex items-center gap-1 text-xs text-[#8C7B6B] ml-auto">
                <Edit2 size={13} />
                编辑
              </button>
              <button
                onClick={() => removeAddress(addr.id)}
                className="flex items-center gap-1 text-xs text-red-400"
              >
                <Trash2 size={13} />
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#E8DDD0] px-5 py-4 z-50">
        <button className="w-full bg-[#1A1208] text-white text-sm font-bold py-4 rounded-full flex items-center justify-center gap-2">
          <Plus size={16} />
          新增收货地址
        </button>
      </div>
    </PhoneFrame>
  );
}
