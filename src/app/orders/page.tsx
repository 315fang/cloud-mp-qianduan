"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Package, MapPin, CheckCircle2, Truck, CircleDot } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

type OrderStatus = "all" | "pending" | "grouping" | "paid" | "shipped" | "review" | "verify" | "completed" | "refund";

const statusTabs: { key: OrderStatus; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "pending", label: "待付款" },
  { key: "grouping", label: "待成团" },
  { key: "paid", label: "待发货" },
  { key: "shipped", label: "待收货" },
  { key: "verify", label: "待核销" },
  { key: "review", label: "待评价" },
  { key: "completed", label: "已完成" },
  { key: "refund", label: "退换货" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "待付款", color: "text-orange-500", bg: "bg-orange-50" },
  grouping: { label: "待成团", color: "text-[#C2410C]", bg: "bg-[#FFEDD5]" },
  paid: { label: "待发货", color: "text-blue-500", bg: "bg-blue-50" },
  shipped: { label: "待收货", color: "text-[#B8973A]", bg: "bg-[#F0E6C8]" },
  verify: { label: "待核销", color: "text-[#2D8C5E]", bg: "bg-[#E6F4EC]" },
  review: { label: "待评价", color: "text-[#1B7A8C]", bg: "bg-[#E4F1F4]" },
  completed: { label: "已完成", color: "text-[#8C7B6B]", bg: "bg-[#F5EFE8]" },
  refund: { label: "退款中", color: "text-red-400", bg: "bg-red-50" },
};

// 活动订单类型
const activityConfig: Record<string, { label: string; color: string; bg: string }> = {
  group: { label: "拼团订单", color: "#C2410C", bg: "#FFF1E6" },
  lottery: { label: "抽奖订单", color: "#B8973A", bg: "#FBF3E2" },
};

const logistics = [
  { time: "11-30 14:23", text: "快件已到达 上海市静安区 派送中心", active: true },
  { time: "11-30 08:47", text: "快件已从 上海浦东转运中心 发出" },
  { time: "11-29 22:15", text: "已到达 上海浦东分拨中心" },
  { time: "11-28 18:30", text: "商品已从仓库揽收，等待运输" },
];

const mockOrders = [
  {
    id: "2024112800001",
    status: "shipped" as const,
    date: "2024-11-28",
    items: [{ product: products[0], qty: 1 }, { product: products[1], qty: 1 }],
    total: 1026,
    expressNo: "SF1234567890",
    activity: null as null | "group" | "lottery",
  },
  {
    id: "2024112900008",
    status: "grouping" as const,
    date: "2024-11-29",
    items: [{ product: products[1], qty: 1 }],
    total: 658,
    expressNo: "",
    activity: "group" as const,
  },
  {
    id: "2024112700006",
    status: "verify" as const,
    date: "2024-11-27",
    items: [{ product: products[2], qty: 1 }],
    total: 368,
    expressNo: "",
    activity: null,
    verifyCode: "8842 6035 1179 4420",
  },
  {
    id: "2024112200007",
    status: "review" as const,
    date: "2024-11-22",
    items: [{ product: products[0], qty: 1 }],
    total: 528,
    expressNo: "",
    activity: "lottery" as const,
  },
  {
    id: "2024112000002",
    status: "completed" as const,
    date: "2024-11-20",
    items: [{ product: products[3], qty: 2 }],
    total: 396,
    expressNo: "",
    activity: null,
  },
  {
    id: "2024111500003",
    status: "pending" as const,
    date: "2024-11-15",
    items: [{ product: products[4], qty: 1 }],
    total: 468,
    expressNo: "",
    activity: null,
  },
  {
    id: "2024112500005",
    status: "paid" as const,
    date: "2024-11-25",
    items: [{ product: products[5], qty: 1 }],
    total: 288,
    expressNo: "",
    activity: null,
  },
  {
    id: "2024110800004",
    status: "refund" as const,
    date: "2024-11-08",
    items: [{ product: products[2], qty: 1 }],
    total: 368,
    expressNo: "",
    activity: null,
  },
];

export default function OrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<OrderStatus>("all");
  const [expandedLogistics, setExpandedLogistics] = useState<string | null>(null);
  const [confirmOrderId, setConfirmOrderId] = useState<string | null>(null);

  const filtered =
    activeTab === "all" ? mockOrders : mockOrders.filter((o) => o.status === activeTab);

  return (
    <PhoneFrame>
      {/* 顶栏 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <h1 className="text-base font-bold text-[#1A1208]">我的订单</h1>
          <div className="w-8" />
        </div>

        {/* 状态标签横滑 */}
        <div className="flex overflow-x-auto scrollbar-hide border-b border-[#E8DDD0]">
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
            <div className="w-20 h-20 rounded-full bg-[#F5EFE8] flex items-center justify-center mb-4">
              <Package size={32} strokeWidth={1} className="text-[#E8DDD0]" />
            </div>
            <p className="text-sm font-medium text-[#3D2B1A]">暂无相关订单</p>
            <p className="text-xs text-[#8C7B6B] mt-1">去挑选心仪的护肤品吧</p>
            <Link
              href="/products"
              className="mt-5 bg-[#1A1208] text-white text-sm font-medium px-10 py-3 rounded-full"
            >
              去购物
            </Link>
          </div>
        ) : (
          filtered.map((order) => {
            const sc = statusConfig[order.status];
            const isLogisticsOpen = expandedLogistics === order.id;
            return (
              <div key={order.id} className="bg-white rounded-2xl overflow-hidden">
                {/* 活动订单识别条 */}
                {order.activity && (
                  <div
                    className="flex items-center gap-1.5 px-4 py-2"
                    style={{ backgroundColor: activityConfig[order.activity].bg }}
                  >
                    <span
                      className="text-[11px] font-bold px-1.5 py-0.5 rounded"
                      style={{ color: "#fff", backgroundColor: activityConfig[order.activity].color }}
                    >
                      {activityConfig[order.activity].label}
                    </span>
                    <span className="text-[11px]" style={{ color: activityConfig[order.activity].color }}>
                      {order.activity === "group" ? "拼团成功后自动发货" : "中奖商品 · 限本人领取"}
                    </span>
                  </div>
                )}
                {/* 订单头部 */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#F9F5F0]">
                  <span className="text-[11px] text-[#8C7B6B]">订单号：{order.id}</span>
                  <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full ${sc.color} ${sc.bg}`}>
                    {sc.label}
                  </span>
                </div>

                {/* 收货地址（待收货状态展示） */}
                {order.status === "shipped" && (
                  <div className="flex items-start gap-2.5 px-4 py-3 border-b border-[#F9F5F0] bg-[#FAF7F4]">
                    <MapPin size={14} className="text-[#B8973A] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[#1A1208]">李静茵  158 2288 8888</p>
                      <p className="text-[10px] text-[#8C7B6B] mt-0.5">
                        上海市静安区南京西路 1111 号问兰大厦 101 室
                      </p>
                    </div>
                  </div>
                )}

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
                        <div className="flex justify-between mt-1.5">
                          <span className="text-sm font-bold text-[#1A1208]">¥{product.price}</span>
                          <span className="text-[11px] text-[#8C7B6B]">x{qty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 物流信息（待收货状态） */}
                {order.status === "shipped" && order.expressNo && (
                  <div className="mx-4 mb-3 border border-[#E8DDD0] rounded-xl overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between px-3 py-2.5 bg-[#F5EFE8]"
                      onClick={() =>
                        setExpandedLogistics(isLogisticsOpen ? null : order.id)
                      }
                    >
                      <div className="flex items-center gap-2">
                        <Truck size={14} className="text-[#B8973A]" />
                        <span className="text-xs font-medium text-[#1A1208]">
                          顺丰快递 {order.expressNo}
                        </span>
                      </div>
                      <ChevronRight
                        size={14}
                        className={`text-[#8C7B6B] transition-transform ${isLogisticsOpen ? "rotate-90" : ""}`}
                      />
                    </button>
                    {isLogisticsOpen && (
                      <div className="px-3 py-3 space-y-3">
                        {logistics.map((log, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              {i === 0 ? (
                                <CircleDot size={14} className="text-[#B8973A] flex-shrink-0" />
                              ) : (
                                <CheckCircle2 size={14} className="text-[#D5C9BC] flex-shrink-0" />
                              )}
                              {i < logistics.length - 1 && (
                                <div className="w-px flex-1 bg-[#E8DDD0] mt-1" style={{ minHeight: 16 }} />
                              )}
                            </div>
                            <div className="flex-1 pb-1">
                              <p className={`text-xs leading-snug ${i === 0 ? "font-semibold text-[#1A1208]" : "text-[#8C7B6B]"}`}>
                                {log.text}
                              </p>
                              <p className="text-[10px] text-[#B0A090] mt-0.5">{log.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 待付款倒计时 */}
                {order.status === "pending" && (
                  <div className="mx-4 mb-3 flex items-center gap-2 bg-orange-50 rounded-xl px-3 py-2">
                    <span className="text-xs text-orange-500">剩余付款时间：</span>
                    <span className="text-xs font-bold text-orange-500">23:45:12</span>
                  </div>
                )}

                {/* 待成团进度 */}
                {order.status === "grouping" && (
                  <div className="mx-4 mb-3 flex items-center justify-between bg-[#FFF1E6] rounded-xl px-3 py-2.5">
                    <div>
                      <p className="text-xs font-bold text-[#C2410C]">还差 1 人成团</p>
                      <p className="text-[10px] text-[#C2410C]/70 mt-0.5">剩余 11:58:30 · 邀请好友更快成团</p>
                    </div>
                    <button className="text-[11px] bg-[#C2410C] text-white px-3 py-1.5 rounded-full font-semibold">
                      邀请好友
                    </button>
                  </div>
                )}

                {/* 待核销 16 位核销码 */}
                {order.status === "verify" && "verifyCode" in order && order.verifyCode && (
                  <div className="mx-4 mb-3 bg-[#E6F4EC] rounded-xl px-3 py-3">
                    <p className="text-[11px] text-[#2D8C5E] mb-1.5">到店出示核销码（16 位）</p>
                    <p className="text-lg font-bold tracking-widest text-[#1A1208] font-mono">{order.verifyCode}</p>
                  </div>
                )}

                {/* 退款进度 */}
                {order.status === "refund" && (
                  <div className="mx-4 mb-3 bg-red-50 rounded-xl px-3 py-3">
                    <p className="text-xs font-semibold text-red-400 mb-2">退款进度</p>
                    <div className="flex items-center gap-0">
                      {["申请退款", "审核中", "退款处理", "已退款"].map((step, i) => (
                        <div key={step} className="flex items-center flex-1">
                          <div className="flex flex-col items-center flex-1">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                              i <= 1 ? "bg-red-400 text-white" : "bg-[#E8DDD0] text-[#8C7B6B]"
                            }`}>
                              {i <= 1 ? "✓" : i + 1}
                            </div>
                            <p className="text-[8px] text-[#8C7B6B] mt-1 text-center">{step}</p>
                          </div>
                          {i < 3 && (
                            <div className={`h-px flex-1 -mt-3 ${i < 1 ? "bg-red-300" : "bg-[#E8DDD0]"}`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 订单底部 */}
                <div className="px-4 py-3 border-t border-[#F9F5F0]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#8C7B6B]">{order.date}</span>
                    <span className="text-sm text-[#1A1208]">
                      共 {order.items.reduce((s, i) => s + i.qty, 0)} 件 · 合计{" "}
                      <span className="font-bold">¥{order.total}</span>
                    </span>
                  </div>

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
                        <button
                          className="text-xs border border-[#E8DDD0] text-[#3D2B1A] px-4 py-2 rounded-full"
                          onClick={() => setExpandedLogistics(
                            expandedLogistics === order.id ? null : order.id
                          )}
                        >
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
                    {order.status === "grouping" && (
                      <>
                        <button className="text-xs border border-[#E8DDD0] text-[#3D2B1A] px-4 py-2 rounded-full">
                          查看详情
                        </button>
                        <button className="text-xs bg-[#C2410C] text-white px-5 py-2 rounded-full font-semibold">
                          邀请好友拼团
                        </button>
                      </>
                    )}
                    {order.status === "verify" && (
                      <>
                        <button className="text-xs border border-[#E8DDD0] text-[#3D2B1A] px-4 py-2 rounded-full">
                          自提门店
                        </button>
                        <button className="text-xs bg-[#2D8C5E] text-white px-5 py-2 rounded-full font-semibold">
                          查看核销码
                        </button>
                      </>
                    )}
                    {order.status === "review" && (
                      <>
                        <button className="text-xs border border-[#E8DDD0] text-[#3D2B1A] px-4 py-2 rounded-full">
                          再次购买
                        </button>
                        <button className="text-xs bg-[#1B7A8C] text-white px-5 py-2 rounded-full font-semibold">
                          去评价
                        </button>
                      </>
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
