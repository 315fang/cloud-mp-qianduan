"use client";

import { useState } from "react";
import {
  Clock, Package, FileText, ScanLine, Search, Plus, Minus,
  ArrowUpRight, ArrowDownRight, CheckCircle2, Users, Store, Send,
} from "lucide-react";

const gold = "#B8973A";

/* 今日处理卡区 */
export function TodayTasks() {
  const tasks = [
    { label: "待核销订单", value: "3", icon: ScanLine, color: "#DC2626" },
    { label: "待发货自提", value: "5", icon: Package, color: gold },
    { label: "采购待审核", value: "2", icon: FileText, color: "#4A7CC7" },
    { label: "库存预警", value: "4", icon: Clock, color: "#D97706" },
  ];
  return (
    <div className="bg-white rounded-2xl p-4">
      <h3 className="text-sm font-bold text-[#1A1208] mb-3">今日处理</h3>
      <div className="grid grid-cols-2 gap-2">
        {tasks.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="flex items-center gap-3 bg-[#FAF7F4] rounded-xl p-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
              <Icon size={17} style={{ color }} />
            </div>
            <div>
              <p className="text-lg font-bold text-[#1A1208] leading-none">{value}</p>
              <p className="text-[11px] text-[#8C7B6B] mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 采购申请表单 */
export function PurchaseForm() {
  const [sku, setSku] = useState("问兰黄金修护精华 30ml");
  const [qty, setQty] = useState(10);
  return (
    <div className="bg-white rounded-2xl p-4">
      <h3 className="text-sm font-bold text-[#1A1208] mb-3">发起采购申请</h3>
      <label className="text-xs text-[#8C7B6B]">采购商品</label>
      <select
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        className="w-full mt-1 mb-3 bg-[#F5EFE8] rounded-xl px-3 py-2.5 text-sm text-[#1A1208] outline-none"
      >
        <option>问兰黄金修护精华 30ml</option>
        <option>问兰雪绒花面霜 50g</option>
        <option>问兰焕活柔肤水 120ml</option>
      </select>
      <label className="text-xs text-[#8C7B6B]">采购数量</label>
      <div className="flex items-center gap-3 mt-1 mb-4">
        <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-lg bg-[#F5EFE8] flex items-center justify-center">
          <Minus size={15} className="text-[#3D2B1A]" />
        </button>
        <span className="text-base font-bold text-[#1A1208] tabular-nums w-10 text-center">{qty}</span>
        <button onClick={() => setQty(qty + 1)} className="w-9 h-9 rounded-lg bg-[#F5EFE8] flex items-center justify-center">
          <Plus size={15} className="text-[#3D2B1A]" />
        </button>
      </div>
      <button
        onClick={() => alert("功能开发中")}
        className="w-full bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 active:opacity-80"
      >
        <Send size={15} /> 提交采购申请
      </button>
    </div>
  );
}

/* 库存筛选 + SKU 卡片 */
export function InventoryList() {
  const [filter, setFilter] = useState<"all" | "low">("all");
  const skus = [
    { name: "问兰黄金修护精华 30ml", code: "SKU-8801", stock: 42, low: false },
    { name: "问兰雪绒花面霜 50g", code: "SKU-8802", stock: 6, low: true },
    { name: "问兰焕活柔肤水 120ml", code: "SKU-8803", stock: 28, low: false },
    { name: "问兰净颜洁面乳 100g", code: "SKU-8804", stock: 3, low: true },
  ];
  const list = filter === "all" ? skus : skus.filter((s) => s.low);
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[#1A1208]">门店库存</h3>
        <div className="flex bg-[#F5EFE8] rounded-lg p-0.5">
          {[{ k: "all" as const, l: "全部" }, { k: "low" as const, l: "预警" }].map((t) => (
            <button
              key={t.k}
              onClick={() => setFilter(t.k)}
              className={`px-3 py-1 text-[11px] font-medium rounded-md ${filter === t.k ? "bg-[#B8973A] text-[#1A1208]" : "text-[#8C7B6B]"}`}
            >
              {t.l}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 bg-[#FAF7F4] rounded-lg px-3 py-2 mb-3">
        <Search size={14} className="text-[#A89685]" />
        <input placeholder="搜索商品 / SKU" className="flex-1 bg-transparent text-xs text-[#1A1208] outline-none placeholder:text-[#C8BAA8]" />
      </div>
      <div className="space-y-2">
        {list.map((s) => (
          <div key={s.code} className="flex items-center justify-between py-2 border-b border-[#F5EFE8] last:border-0">
            <div>
              <p className="text-sm text-[#1A1208] leading-snug">{s.name}</p>
              <p className="text-[11px] text-[#A89685] mt-0.5">{s.code}</p>
            </div>
            <div className="text-right">
              <p className={`text-base font-bold tabular-nums ${s.low ? "text-[#DC2626]" : "text-[#1A1208]"}`}>{s.stock}</p>
              <p className="text-[10px] text-[#A89685]">{s.low ? "库存偏低" : "库存充足"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 最近库存变动 */
export function StockChanges() {
  const logs = [
    { type: "in", title: "采购入库 · 精华液", qty: "+20", date: "12-01 10:24" },
    { type: "out", title: "核销出库 · 面霜", qty: "-2", date: "12-01 09:12" },
    { type: "out", title: "核销出库 · 柔肤水", qty: "-1", date: "11-30 18:40" },
    { type: "in", title: "调拨入库 · 洁面乳", qty: "+10", date: "11-30 14:05" },
  ];
  return (
    <div className="bg-white rounded-2xl p-4">
      <h3 className="text-sm font-bold text-[#1A1208] mb-3">最近库存变动</h3>
      <div className="space-y-2">
        {logs.map((l, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-[#F5EFE8] last:border-0">
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${l.type === "in" ? "bg-[#EEF6EE]" : "bg-[#FBEDEC]"}`}>
                {l.type === "in" ? <ArrowUpRight size={13} className="text-[#5A8A5A]" /> : <ArrowDownRight size={13} className="text-[#B5564E]" />}
              </div>
              <div>
                <p className="text-sm text-[#1A1208]">{l.title}</p>
                <p className="text-[11px] text-[#A89685] mt-0.5">{l.date}</p>
              </div>
            </div>
            <span className={`text-sm font-bold tabular-nums ${l.type === "in" ? "text-[#5A8A5A]" : "text-[#B5564E]"}`}>{l.qty}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 采购申请记录 */
export function PurchaseRecords() {
  const recs = [
    { no: "CG8821", item: "黄金修护精华 ×10", status: "审核中", color: "text-[#C8973A] bg-[#FFF7E6]", date: "12-01" },
    { no: "CG8810", item: "雪绒花面霜 ×20", status: "已通过", color: "text-[#5A8A5A] bg-[#EEF6EE]", date: "11-28" },
    { no: "CG8792", item: "净颜洁面乳 ×15", status: "已驳回", color: "text-[#B5564E] bg-[#FBEDEC]", date: "11-25" },
  ];
  return (
    <div className="bg-white rounded-2xl p-4">
      <h3 className="text-sm font-bold text-[#1A1208] mb-3">采购申请记录</h3>
      <div className="space-y-2">
        {recs.map((r) => (
          <div key={r.no} className="flex items-center justify-between py-2 border-b border-[#F5EFE8] last:border-0">
            <div>
              <p className="text-sm text-[#1A1208]">{r.item}</p>
              <p className="text-[11px] text-[#A89685] mt-0.5">#{r.no} · {r.date}</p>
            </div>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${r.color}`}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 已核销订单历史 */
export function VerifiedHistory() {
  const orders = [
    { code: "HX8821", customer: "李**", amount: "¥780", date: "12-01 09:12" },
    { code: "HX8810", customer: "张**", amount: "¥1,280", date: "11-30 16:40" },
    { code: "HX8792", customer: "王**", amount: "¥360", date: "11-30 11:05" },
  ];
  return (
    <div className="bg-white rounded-2xl p-4">
      <h3 className="text-sm font-bold text-[#1A1208] mb-3">已核销订单</h3>
      <div className="space-y-2">
        {orders.map((o) => (
          <div key={o.code} className="flex items-center justify-between py-2 border-b border-[#F5EFE8] last:border-0">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#5A8A5A]" />
              <div>
                <p className="text-sm text-[#1A1208]">{o.code}</p>
                <p className="text-[11px] text-[#A89685] mt-0.5">客户 {o.customer} · {o.date}</p>
              </div>
            </div>
            <span className="text-sm font-bold text-[#1A1208]">{o.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 门店资料与成员统计 */
export function StoreProfile() {
  const members = [
    { name: "李静茵", role: "店长", count: "" },
    { name: "周敏", role: "核销员", count: "" },
    { name: "孙琳", role: "导购", count: "" },
  ];
  const stats = [
    { label: "门店成员", value: "3" },
    { label: "本月新增会员", value: "28" },
    { label: "累计核销", value: "412" },
  ];
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center gap-1.5 mb-3">
        <Store size={15} className="text-[#B8973A]" />
        <h3 className="text-sm font-bold text-[#1A1208]">门店资料</h3>
      </div>
      <div className="bg-[#FAF7F4] rounded-xl p-3 mb-3 space-y-1.5 text-xs">
        <div className="flex justify-between"><span className="text-[#8C7B6B]">门店名称</span><span className="text-[#3D2B1A]">问兰美妆旗舰店</span></div>
        <div className="flex justify-between"><span className="text-[#8C7B6B]">门店编号</span><span className="text-[#3D2B1A]">MD-0086</span></div>
        <div className="flex justify-between"><span className="text-[#8C7B6B]">营业时间</span><span className="text-[#3D2B1A]">10:00 - 22:00</span></div>
        <div className="flex justify-between"><span className="text-[#8C7B6B]">门店地址</span><span className="text-[#3D2B1A] text-right max-w-[60%]">上海市静安区南京西路 1111 号</span></div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#FAF7F4] rounded-xl p-2.5 text-center">
            <p className="text-base font-bold text-[#1A1208] tabular-nums">{s.value}</p>
            <p className="text-[10px] text-[#8C7B6B] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mb-2">
        <Users size={14} className="text-[#B8973A]" />
        <span className="text-xs font-bold text-[#1A1208]">成员列表</span>
      </div>
      <div className="space-y-1.5">
        {members.map((m) => (
          <div key={m.name} className="flex items-center gap-2.5 py-1">
            <div className="w-8 h-8 rounded-full bg-[#F0E6C8] flex items-center justify-center text-xs font-bold text-[#B8973A]">{m.name[0]}</div>
            <span className="text-sm text-[#1A1208] flex-1">{m.name}</span>
            <span className="text-[11px] text-[#8C7B6B]">{m.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
