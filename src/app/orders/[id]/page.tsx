"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, MapPin, Package, Truck, CheckCircle2, Clock,
  ChevronRight, Copy, RotateCcw, Star,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

const order = {
  id: "2024120100001",
  status: "shipped" as "pending" | "paid" | "shipped" | "completed" | "refund",
  date: "2024-12-01 14:32",
  paidAt: "2024-12-01 14:35",
  confirmedAt: "2024-12-02 09:00",
  shippedAt: "2024-12-02 16:20",
  completedAt: null as string | null,
  expressNo: "SF1234567890",
  expressCompany: "顺丰速运",
  address: {
    name: "李女士",
    phone: "138****8888",
    province: "上海市",
    city: "浦东新区",
    district: "张江镇",
    detail: "科苑路XXX号XX楼",
  },
  items: [
    { product: products[0], qty: 1, spec: "30ml / 标准版" },
    { product: products[1], qty: 2, spec: "50g / 标准版" },
  ],
  subtotal: 1454,
  shipping: 0,
  discount: 50,
  total: 1404,
  orderNo: "YJ20241201001",
  payMethod: "微信支付",
  remark: "请尽快发货，谢谢",
};

const statusMap: Record<string, string> = {
  pending: "待付款",
  paid: "待确认",
  agent_confirmed: "备货中",
  shipped: "已发货",
  completed: "已完成",
  cancelled: "已取消",
};

const statusDescMap: Record<string, string> = {
  pending: "请在30分钟内完成支付",
  paid: "商家正在确认订单",
  agent_confirmed: "商家正在备货，请耐心等待",
  shipped: "您的包裹正在飞奔，请注意查收",
  completed: "交易已完成，感谢您的信任",
  cancelled: "订单已取消",
};

const steps = [
  { label: "下单", done: true },
  { label: "付款", done: !!order.paidAt },
  { label: "确认", done: !!order.confirmedAt },
  { label: "发货", done: !!order.shippedAt },
  { label: "完成", done: !!order.completedAt },
];

export default function OrderDetailPage() {
  const router = useRouter();

  return (
    <PhoneFrame>
      <div className="min-h-screen bg-[#F5EFE8] flex flex-col">
        {/* 顶栏 */}
        <div className="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="font-bold text-[#1A1208]">订单详情</span>
        </div>

        <div className="flex-1 overflow-y-auto pb-28 space-y-3 p-4">
          {/* 状态卡 */}
          <div className="surface-noir rounded-2xl px-5 py-5">
            <p className="text-white text-lg font-bold">{statusMap[order.status]}</p>
            <p className="text-[#C4A882] text-xs mt-1">{statusDescMap[order.status]}</p>
            {order.expressNo && (
              <div className="mt-3 flex items-center gap-2">
                <Link href={`/logistics/${order.expressNo}`} className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5 text-white text-xs">
                  <Truck size={13} />
                  {order.expressCompany} {order.expressNo}
                  <ChevronRight size={12} />
                </Link>
              </div>
            )}
          </div>

          {/* 进度条 */}
          <div className="bg-white rounded-2xl px-5 py-4">
            <div className="flex items-center">
              {steps.map((step, i) => (
                <div key={step.label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step.done ? "bg-[#B8973A] text-white" : "bg-[#F0E8DC] text-[#C4A882]"}`}>
                      {step.done ? <CheckCircle2 size={14} strokeWidth={2.5} /> : i + 1}
                    </div>
                    <span className={`text-[10px] ${step.done ? "text-[#B8973A] font-medium" : "text-[#C4A882]"}`}>{step.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mb-4 mx-1 ${steps[i + 1].done ? "bg-[#B8973A]" : "bg-[#F0E8DC]"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 收货地址 */}
          <div className="bg-white rounded-2xl px-4 py-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F5EFE8] flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={16} className="text-[#B8973A]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-sm text-[#1A1208]">{order.address.name}</span>
                  <span className="text-sm text-[#3D2B1A]">{order.address.phone}</span>
                </div>
                <p className="text-xs text-[#8C7B6B] leading-relaxed">
                  {order.address.province} {order.address.city} {order.address.district} {order.address.detail}
                </p>
              </div>
            </div>
          </div>

          {/* 商品列表 */}
          <div className="bg-white rounded-2xl px-4 py-4">
            <p className="text-sm font-bold text-[#1A1208] mb-3">商品信息</p>
            <div className="space-y-3">
              {order.items.map(({ product, qty, spec }) => (
                <Link href={`/products/${product.id}`} key={product.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#F5EFE8]">
                    <Image src={product.image} alt={product.name} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A1208] line-clamp-1">{product.name}</p>
                    <p className="text-xs text-[#8C7B6B] mt-0.5">{spec}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-[#B8973A]">¥{product.price}</span>
                      <span className="text-xs text-[#8C7B6B]">x{qty}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 价格明细 */}
          <div className="bg-white rounded-2xl px-4 py-4">
            <p className="text-sm font-bold text-[#1A1208] mb-3">价格明细</p>
            <div className="space-y-2">
              {[
                { label: "商品小计", value: `¥${order.subtotal}` },
                { label: "运费", value: order.shipping === 0 ? "免运费" : `¥${order.shipping}` },
                { label: "优惠券", value: `-¥${order.discount}`, red: true },
              ].map(({ label, value, red }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-[#8C7B6B]">{label}</span>
                  <span className={red ? "text-red-500" : "text-[#3D2B1A]"}>{value}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#F0E8DC]">
                <span className="text-[#1A1208]">实付款</span>
                <span className="text-[#B8973A] text-base">¥{order.total}</span>
              </div>
            </div>
          </div>

          {/* 订单信息 */}
          <div className="bg-white rounded-2xl px-4 py-4">
            <p className="text-sm font-bold text-[#1A1208] mb-3">订单信息</p>
            <div className="space-y-2">
              {[
                { label: "订单编号", value: order.orderNo, copy: true },
                { label: "下单时间", value: order.date },
                { label: "支付方式", value: order.payMethod },
                { label: "备注", value: order.remark || "无" },
              ].map(({ label, value, copy }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-[#8C7B6B] flex-shrink-0">{label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#3D2B1A] text-xs text-right max-w-[180px] truncate">{value}</span>
                    {copy && (
                      <button className="text-[#B8973A]">
                        <Copy size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#F0E8DC] px-4 py-3 flex gap-2">
          <Link href={`/orders/${order.id}/aftersale`} className="flex-1 py-2.5 rounded-full border border-[#E8DDD0] text-[#3D2B1A] text-sm font-medium text-center flex items-center justify-center gap-1">
            <RotateCcw size={14} />
            售后
          </Link>
          {order.status === "shipped" && (
            <button className="flex-1 py-2.5 rounded-full border border-[#E8DDD0] text-[#3D2B1A] text-sm font-medium">
              确认收货
            </button>
          )}
          {order.status === "completed" && (
            <Link href={`/order/review?orderId=${order.id}`} className="flex-1 py-2.5 rounded-full bg-[#1A1208] text-white text-sm font-medium flex items-center justify-center gap-1">
              <Star size={14} />
              评价晒单
            </Link>
          )}
          {order.status === "pending" && (
            <button className="flex-1 py-2.5 rounded-full bg-[#B8973A] text-white text-sm font-bold">
              立即付款
            </button>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
