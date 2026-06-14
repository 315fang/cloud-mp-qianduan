"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, FileText, MapPin, ChevronRight, Copy,
  RotateCcw, Clock, CheckCircle2, Headset, Info,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function OrderAfterSalePage() {
  const router = useRouter();
  // 商家是否已配置退货寄回地址（演示可切换）
  const [hasReturnAddr, setHasReturnAddr] = useState(true);

  const order = { no: "WL202412010088", date: "2024-12-01 14:30" };

  const items = [
    { name: "问兰黄金修护精华 30ml", spec: "正装 / 1 件", price: "780", qty: 1, image: "/images/product-serum.png" },
    { name: "问兰雪绒花面霜 50g", spec: "正装 / 1 件", price: "560", qty: 1, image: "/images/product-cream.png" },
  ];

  const returnAddr = {
    name: "问兰售后服务中心",
    phone: "400-888-0066",
    address: "上海市静安区南京西路 1111 号问兰大厦 8 楼售后部",
  };

  const records = [
    { id: "SH88210", title: "仅退款 · 精华液", status: "处理中", color: "text-[#C8973A] bg-[#FFF7E6]", icon: Clock, date: "2024-12-02 09:12" },
    { id: "SH88102", title: "退货退款 · 面霜", status: "已完成", color: "text-[#5A8A5A] bg-[#EEF6EE]", icon: CheckCircle2, date: "2024-11-20 16:40" },
  ];

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4] pb-24">
        <header className="sticky top-0 z-10 flex items-center gap-3 surface-noir px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">订单售后</h1>
          <button
            onClick={() => setHasReturnAddr((v) => !v)}
            className="ml-auto text-[10px] text-white/40 underline"
          >
            演示降级
          </button>
        </header>

        {/* 订单号头部说明 */}
        <div className="surface-noir px-5 pb-6 pt-2">
          <p className="text-xs text-white/60 leading-relaxed">
            请选择需要售后的商品发起申请。一笔订单可对不同商品分别申请售后。
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[11px] text-white/50">订单号 {order.no}</span>
            <button onClick={() => alert("已复制")} className="text-[#B8973A]">
              <Copy size={12} />
            </button>
          </div>
          <p className="text-[11px] text-white/40 mt-1">下单时间 {order.date}</p>
        </div>

        <div className="px-4 py-5 space-y-4">
          {/* 商品条卡 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-3">订单商品</h3>
            <div className="space-y-3">
              {items.map((it, i) => (
                <div key={i} className="flex gap-3">
                  <img src={it.image || "/placeholder.svg"} alt={it.name} className="w-16 h-16 rounded-xl object-cover bg-[#F5EFE8] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1A1208] leading-snug line-clamp-2">{it.name}</p>
                    <p className="text-[11px] text-[#A89685] mt-1">{it.spec}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-sm font-bold text-[#1A1208]">¥{it.price}</span>
                      <Link
                        href="/orders/refund/apply"
                        className="text-xs font-medium text-[#B8973A] border border-[#B8973A]/40 px-3 py-1 rounded-full active:opacity-70"
                      >
                        申请售后
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 寄回地址卡 */}
          {hasReturnAddr ? (
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <MapPin size={15} className="text-[#B8973A]" />
                <h3 className="text-sm font-bold text-[#1A1208]">退货寄回地址</h3>
              </div>
              <div className="bg-[#FAF7F4] rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#1A1208]">{returnAddr.name}　{returnAddr.phone}</p>
                  <button onClick={() => alert("已复制")} className="text-[#B8973A]"><Copy size={13} /></button>
                </div>
                <p className="text-xs text-[#8C7B6B] mt-1 leading-relaxed">{returnAddr.address}</p>
              </div>
              <p className="text-[11px] text-[#A89685] mt-2 leading-relaxed">
                请在售后审核通过后再寄回商品，并填写真实物流单号，以便我们及时处理。
              </p>
            </div>
          ) : (
            /* 未配置寄回地址降级卡 */
            <div className="bg-[#FBF6EC] border border-[#EEDFBE] rounded-2xl p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F3E4BE] flex items-center justify-center shrink-0">
                <Info size={17} className="text-[#B8973A]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1A1208]">暂未配置寄回地址</p>
                <p className="text-xs text-[#8C7B6B] mt-1 leading-relaxed">
                  商家尚未设置退货寄回地址，请勿自行寄回商品。提交售后申请后，可联系客服获取准确寄回地址。
                </p>
                <Link
                  href="/profile/service"
                  className="inline-flex items-center gap-1 mt-2.5 text-xs font-medium text-[#B8973A]"
                >
                  <Headset size={13} /> 联系客服
                </Link>
              </div>
            </div>
          )}

          {/* 售后记录列表 */}
          <div className="bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#1A1208]">售后记录</h3>
              <Link href="/orders/refund/list" className="flex items-center gap-0.5 text-xs text-[#B8973A]">
                全部 <ChevronRight size={13} />
              </Link>
            </div>
            <div className="space-y-2">
              {records.map((r) => {
                const Icon = r.icon;
                return (
                  <Link
                    key={r.id}
                    href={`/orders/refund/${r.id}`}
                    className="flex items-center justify-between py-2.5 border-b border-[#F5EFE8] last:border-0 active:opacity-70"
                  >
                    <div className="flex items-center gap-2.5">
                      <RotateCcw size={15} className="text-[#8C7B6B]" />
                      <div>
                        <p className="text-sm text-[#1A1208]">{r.title}</p>
                        <p className="text-[11px] text-[#A89685] mt-0.5">#{r.id} · {r.date}</p>
                      </div>
                    </div>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${r.color}`}>
                      <Icon size={11} /> {r.status}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* 底部双动作 */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-white border-t border-[#F0E8DC] px-4 py-3 flex gap-3">
          <Link
            href={`/orders/${order.no}`}
            className="flex-1 border border-[#E5DDD0] text-[#3D2B1A] text-sm font-medium py-3 rounded-xl flex items-center justify-center gap-1.5 active:opacity-70"
          >
            <FileText size={16} /> 查看订单详情
          </Link>
          <Link
            href="/orders/refund/apply"
            className="flex-1 bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3 rounded-xl flex items-center justify-center active:opacity-80"
          >
            申请售后
          </Link>
        </div>
      </div>
    </PhoneFrame>
  );
}
