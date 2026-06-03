"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Package } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

type OrderStatus = "all" | "pending" | "paid" | "shipped" | "completed" | "refund";

const statusTabs: { key: OrderStatus; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "pending", label: "待付款" },
  { key: "paid", label: "待发货" },
  { key: "shipped", label: "待收货" },
  { key: "completed", label: "已完成" },
  { key: "refund", label: "退换货" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "待付款", color: "text-orange-500", bg: "bg-orange-50" },
  paid: { label: "待发货", color: "text-blue-500", bg: "bg-blue-50" },
  shipped: { label: "待收货", color: "text-[#B8973A]", bg: "bg-[#F0E6C8]" },
  completed: { label: "已完成", color: "text-[#8C7B6B]", bg: "bg-[#F5EFE8]" },
  refund: { label: "退款中", color: "text-red-400", bg: "bg-red-50" },
};

const mockOrders = [
  {
    id: "2024112800001",
    status: "shipped" as const,
    date: "2024-11-28",
    items: [{ product: products[0], qty: 1 }, { product: products[1], qty: 1 }],
    total: 1026,
    expressNo: "SF1234567890",
  },
  {
    id: "2024112000002",
    status: "completed" as const,
    date: "2024-11-20",
    items: [{ product: products[3], qty: 2 }],
    total: 396,
    expressNo: "",
  },
  {
    id: "2024111500003",
    status: "pending" as const,
    date: "2024-11-15",
    items: [{ product: products[4], qty: 1 }],
    total: 468,
    expressNo: "",
  },
  {
    id: "2024112500005",
    status: "paid" as const,
    date: "2024-11-25",
    items: [{ product: products[5], qty: 1 }],
    total: 288,
    expressNo: "",
  },
  {
    id: "2024110800004",
    status: "refund" as const,
    date: "2024-11-08",
    items: [{ product: products[2], qty: 1 }],
    total: 368,
    expressNo: "",
  },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("all");

  const filtered =
    activeTab === "all" ? mockOrders : mockOrders.filter((o) => o.status === activeTab);

  return (
    <PhoneFrame>
      {/* 顶栏 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <Link href="/profile" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </Link>
          <h1 className="text-base font-bold text-[#1A1208]">我的订单</h1>
          <div className="w-8" />
        </div>

        {/* 状态标签横滑 */}
        <div className="flex border-b border-[#E8DDD0]">
          {statusTabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-shrink-0 text-[12px] px-4 py-2.5 font-medium border-b-2 transition-all ${
                activeTab === key
                  ? "border-[#B8973A] text-[#B8973A]"
                  : "border-transparent text-[#8C7B6B]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="px-4 py-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#8C7B6B]">
            <Package size={48} strokeWidth={1} className="mb-4 text-[#E8DDD0]" />
            <p className="text-sm">暂无相关订单</p>
            <Link
              href="/products"
              className="mt-4 bg-[#1A1208] text-white text-sm font-medium px-8 py-2.5 rounded-full"
            >
              去购物
            </Link>
          </div>
        ) : (
          filtered.map((order) => {
            const sc = statusConfig[order.status];
            return (
              <div key={order.id} className="bg-white rounded-2xl overflow-hidden">
                {/* 订单头部 */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#F9F5F0]">
                  <div>
                    <span className="text-[11px] text-[#8C7B6B]">订单号：{order.id}</span>
                  </div>
                  <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full ${sc.color} ${sc.bg}`}>
                    {sc.label}
                  </span>
                </div>

                {/* 商品列表 */}
                <div className="px-4 py-3 space-y-3">
                  {order.items.map(({ product, qty }) => (
                    <div key={product.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F5EFE8] flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-1.5"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1A1208] line-clamp-1">{product.name}</p>
                        <p className="text-[11px] text-[#8C7B6B] mt-0.5">{product.subtitle}</p>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm font-bold text-[#1A1208]">¥{product.price}</span>
                          <span className="text-[11px] text-[#8C7B6B]">x{qty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 订单底部 */}
                <div className="px-4 py-3 border-t border-[#F9F5F0]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#8C7B6B]">{order.date}</span>
                    <span className="text-sm text-[#1A1208]">
                      共 {order.items.reduce((s, i) => s + i.qty, 0)} 件 · 合计{" "}
                      <span className="font-bold">¥{order.total}</span>
                    </span>
                  </div>

                  {order.expressNo && (
                    <div className="flex items-center gap-1.5 bg-[#F5EFE8] rounded-xl px-3 py-2 mb-3">
                      <Package size={14} className="text-[#B8973A]" />
                      <span className="text-xs text-[#3D2B1A]">快递单号：{order.expressNo}</span>
                      <ChevronRight size={13} className="text-[#8C7B6B] ml-auto" />
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex gap-2 justify-end">
                    {order.status === "pending" && (
                      <>
                        <button className="text-xs border border-[#E8DDD0] text-[#3D2B1A] px-4 py-2 rounded-full">
                          取消订单
                        </button>
                        <button className="text-xs bg-[#1A1208] text-white px-5 py-2 rounded-full font-semibold">
                          立即付款
                        </button>
                      </>
                    )}
                    {order.status === "shipped" && (
                      <>
                        <button className="text-xs border border-[#E8DDD0] text-[#3D2B1A] px-4 py-2 rounded-full">
                          查看物流
                        </button>
                        <button className="text-xs bg-[#1A1208] text-white px-5 py-2 rounded-full font-semibold">
                          确认收货
                        </button>
                      </>
                    )}
                    {order.status === "completed" && (
                      <>
                        <button className="text-xs border border-[#E8DDD0] text-[#3D2B1A] px-4 py-2 rounded-full">
                          申请售后
                        </button>
                        <button className="text-xs bg-[#B8973A] text-white px-5 py-2 rounded-full font-semibold">
                          再次购买
                        </button>
                      </>
                    )}
                    {order.status === "paid" && (
                      <button className="text-xs border border-[#E8DDD0] text-[#3D2B1A] px-4 py-2 rounded-full">
                        催发货
                      </button>
                    )}
                    {order.status === "refund" && (
                      <button className="text-xs border border-[#E8DDD0] text-[#3D2B1A] px-4 py-2 rounded-full">
                        查看进度
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </PhoneFrame>
  );
}
