'use client';

import Link from 'next/link';
import { ChevronRight, TrendingUp, Users, Package, Clock, DollarSign, Eye, BarChart3, Calendar, ArrowUpRight } from 'lucide-react';
import PhoneFrame from '@/components/PhoneFrame';
import BottomNav from '@/components/BottomNav';

const mockStats = {
  todaySales: 1248,
  todayOrders: 23,
  todayVisitors: 856,
  monthSales: 28640,
  monthOrders: 412,
  conversionRate: 2.68,
  avgOrderValue: 125,
};

const quickActions = [
  { icon: Package, label: '待发货', count: 8, color: '#F59E0B', href: '/orders?status=paid' },
  { icon: Clock, label: '待收货', count: 5, color: '#06B6D4', href: '/orders?status=shipped' },
  { icon: Eye, label: '浏览量', count: 856, color: '#8B5CF6', href: '#' },
  { icon: Users, label: '粉丝', count: 342, color: '#EC4899', href: '/distributor/team' },
];

const chartData = [
  { date: '周一', sales: 420, orders: 12 },
  { date: '周二', sales: 580, orders: 16 },
  { date: '周三', sales: 520, orders: 14 },
  { date: '周四', sales: 690, orders: 19 },
  { date: '周五', sales: 780, orders: 22 },
  { date: '周六', sales: 890, orders: 25 },
  { date: '周日', sales: 1248, orders: 23 },
];

export default function ManagerWorkstationPage() {
  return (
    <PhoneFrame>
      <div className="bg-gradient-to-b from-[#FAF7F4] to-white">
        {/* 顶部导航 */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#E8DDD0] px-4 py-3 flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-1 text-[#8C7B6B]">
            <ChevronRight size={18} className="rotate-180" />
          </Link>
          <h1 className="text-base font-bold text-[#1A1208]">店长工作台</h1>
          <div className="w-6" />
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* 核心指标卡 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DDD0]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#8C7B6B] font-medium">本日销售概览</span>
              <Link href="#" className="text-[11px] text-[#B8973A]">周期切换</Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gradient-to-br from-[#FEF3E2] to-[#FAE8D0] rounded-xl p-3">
                <p className="text-[10px] text-[#8C7B6B] mb-1">销售额</p>
                <p className="text-lg font-bold text-[#DC2626]">¥{mockStats.todaySales}</p>
              </div>
              <div className="bg-gradient-to-br from-[#E0F2FE] to-[#CCE7FC] rounded-xl p-3">
                <p className="text-[10px] text-[#8C7B6B] mb-1">订单数</p>
                <p className="text-lg font-bold text-[#0891B2]">{mockStats.todayOrders}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-xl p-3">
                <p className="text-[10px] text-[#8C7B6B] mb-1">转化率</p>
                <p className="text-lg font-bold text-[#059669]">{mockStats.conversionRate}%</p>
              </div>
            </div>
          </div>

          {/* 快捷操作 */}
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ icon: Icon, label, count, color, href }) => (
              <Link
                key={label}
                href={href}
                className="bg-white rounded-xl p-3 shadow-sm border border-[#E8DDD0] flex items-center gap-2.5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                  <Icon size={18} strokeWidth={1.5} style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-[#8C7B6B]">{label}</p>
                  <p className="text-sm font-bold text-[#1A1208]">{count}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* 本周销售趋势 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DDD0]">
            <p className="text-xs font-medium text-[#1A1208] mb-3">本周销售趋势</p>
            <div className="flex items-end justify-between h-24 gap-1">
              {chartData.map((item, i) => {
                const maxSales = Math.max(...chartData.map((d) => d.sales));
                const height = (item.sales / maxSales) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md transition-all"
                      style={{
                        height: `${height}%`,
                        background: `linear-gradient(180deg, #D4AF5A, #B8973A)`,
                        minHeight: '4px',
                      }}
                    />
                    <span className="text-[9px] text-[#8C7B6B]">{item.date.slice(0, 1)}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 pt-3 border-t border-[#E8DDD0]">
              <div className="text-center">
                <p className="text-[10px] text-[#8C7B6B]">周均销售</p>
                <p className="text-xs font-bold text-[#1A1208] mt-0.5">¥742</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#8C7B6B]">周均订单</p>
                <p className="text-xs font-bold text-[#1A1208] mt-0.5">18.7</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#8C7B6B]">环比增长</p>
                <p className="text-xs font-bold text-[#DC2626] mt-0.5">+12.4%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#8C7B6B]">同比增长</p>
                <p className="text-xs font-bold text-[#059669] mt-0.5">+28.6%</p>
              </div>
            </div>
          </div>

          {/* 月度对比 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DDD0]">
            <p className="text-xs font-medium text-[#1A1208] mb-4">本月数据对比</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <DollarSign size={16} className="text-[#B8973A]" strokeWidth={1.5} />
                  <span className="text-xs text-[#8C7B6B]">月销售额</span>
                </div>
                <span className="text-sm font-bold text-[#1A1208]">¥{mockStats.monthSales}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <Package size={16} className="text-[#0891B2]" strokeWidth={1.5} />
                  <span className="text-xs text-[#8C7B6B]">月订单数</span>
                </div>
                <span className="text-sm font-bold text-[#1A1208]">{mockStats.monthOrders}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <BarChart3 size={16} className="text-[#059669]" strokeWidth={1.5} />
                  <span className="text-xs text-[#8C7B6B]">客单价</span>
                </div>
                <span className="text-sm font-bold text-[#1A1208]">¥{mockStats.avgOrderValue}</span>
              </div>
            </div>
          </div>

          {/* 快速链接 */}
          <div className="space-y-2">
            <Link href="/orders" className="block bg-white rounded-xl p-3 shadow-sm border border-[#E8DDD0] flex items-center justify-between">
              <span className="text-sm text-[#1A1208] font-medium">查看所有订单</span>
              <ChevronRight size={16} className="text-[#B8973A]" />
            </Link>
            <Link href="/distributor" className="block bg-white rounded-xl p-3 shadow-sm border border-[#E8DDD0] flex items-center justify-between">
              <span className="text-sm text-[#1A1208] font-medium">我的分销数据</span>
              <ChevronRight size={16} className="text-[#B8973A]" />
            </Link>
          </div>

          <div className="pb-2" />
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
