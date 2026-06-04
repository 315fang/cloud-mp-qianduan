'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, QrCode, Zap, Check, MapPin, Phone, Clock } from 'lucide-react';
import PhoneFrame from '@/components/PhoneFrame';
import BottomNav from '@/components/BottomNav';

const mockStore = {
  name: '苏州科技大学门店',
  address: '苏州市 652+3 苏州科技大学',
  phone: '0512-62917333',
  hours: '9:00-21:00',
};

const mockPickupOrders = [
  {
    id: 'PU20240601001',
    customerName: '云肌用户',
    pickupCode: '1254658',
    items: [
      { name: '云肌精华液', qty: 1 },
      { name: '玻尿酸面膜', qty: 2 },
    ],
    amount: 298,
    status: 'pending',
    createdAt: '2024-06-01 14:30',
  },
  {
    id: 'PU20240601002',
    customerName: '小张',
    pickupCode: '8843921',
    items: [{ name: '护肤套装', qty: 1 }],
    amount: 498,
    status: 'pending',
    createdAt: '2024-06-01 13:15',
  },
  {
    id: 'PU20240531001',
    customerName: '李女士',
    pickupCode: '5621847',
    items: [
      { name: '舒缓霜', qty: 1 },
      { name: '眼霜', qty: 1 },
    ],
    amount: 168,
    status: 'completed',
    createdAt: '2024-05-31 16:45',
  },
];

export default function PickupVerifyPage() {
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyResult, setVerifyResult] = useState<typeof mockPickupOrders[0] | null>(null);
  const [completedOrders, setCompletedOrders] = useState<string[]>(['5621847']);

  const handleVerify = () => {
    const found = mockPickupOrders.find((o) => o.pickupCode === verifyCode && o.status === 'pending');
    if (found) {
      setVerifyResult(found);
    } else {
      setVerifyResult(null);
      alert('未找到该自提单或已完成');
    }
  };

  const handleComplete = (code: string) => {
    setCompletedOrders([...completedOrders, code]);
    setVerifyResult(null);
    setVerifyCode('');
  };

  const pendingCount = mockPickupOrders.filter((o) => o.status === 'pending' && !completedOrders.includes(o.pickupCode)).length;

  return (
    <PhoneFrame>
      <div className="bg-gradient-to-b from-[#FAF7F4] to-white min-h-screen">
        {/* 顶部导航 */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#E8DDD0] px-4 py-3 flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-1 text-[#8C7B6B]">
            <ChevronRight size={18} className="rotate-180" />
          </Link>
          <h1 className="text-base font-bold text-[#1A1208]">自提核销</h1>
          <div className="w-6" />
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* 门店信息卡 */}
          <div className="bg-gradient-to-br from-[#E0E7FF] to-[#F0F4FF] rounded-2xl p-4 border border-[#C7D2FE]">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-bold text-[#1A1208] mb-1">{mockStore.name}</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#4B5563]">
                    <MapPin size={14} />
                    <span>{mockStore.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#4B5563]">
                    <Phone size={14} />
                    <span>{mockStore.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#4B5563]">
                    <Clock size={14} />
                    <span>{mockStore.hours}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#4B5563] mb-1">待核销</p>
                <p className="text-2xl font-bold text-[#4F46E5]">{pendingCount}</p>
              </div>
            </div>
          </div>

          {/* 核销方式选择 */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#1A1208]">选择核销方式</label>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-2 bg-white rounded-xl py-3 border-2 border-[#B8973A] shadow-sm">
                <QrCode size={18} className="text-[#B8973A]" />
                <span className="text-sm font-medium text-[#1A1208]">扫码核销</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-white rounded-xl py-3 border border-[#E8DDD0] shadow-sm">
                <Zap size={18} className="text-[#8C7B6B]" />
                <span className="text-sm font-medium text-[#1A1208]">手动输入</span>
              </button>
            </div>
          </div>

          {/* 手动输入核销码 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DDD0]">
            <label className="text-xs font-semibold text-[#1A1208] mb-2 block">输入自提码（16位）</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 16))}
                placeholder="请输入16位自提码"
                className="flex-1 px-3 py-2.5 rounded-lg border border-[#E8DDD0] bg-[#F5EFE8] text-sm outline-none focus:border-[#B8973A]"
              />
              <button
                onClick={handleVerify}
                className="px-4 py-2.5 rounded-lg bg-[#B8973A] text-white text-sm font-medium"
              >
                查询
              </button>
            </div>
          </div>

          {/* 核销结果 */}
          {verifyResult && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-[#10B981]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-[#1A1208]">{verifyResult.customerName}</p>
                  <p className="text-xs text-[#8C7B6B] mt-1">自提码：{verifyResult.pickupCode}</p>
                </div>
                <span className="px-2 py-1 bg-[#D1FAE5] text-[#065F46] text-xs font-semibold rounded-full">可核销</span>
              </div>
              <div className="border-t border-[#E8DDD0] pt-3 mb-3">
                <p className="text-xs text-[#8C7B6B] mb-2">购买商品：</p>
                {verifyResult.items.map((item, i) => (
                  <p key={i} className="text-xs text-[#1A1208]">
                    • {item.name} × {item.qty}
                  </p>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#E8DDD0]">
                <span className="text-sm text-[#8C7B6B]">订单金额</span>
                <span className="text-lg font-bold text-[#1A1208]">¥{verifyResult.amount}</span>
              </div>
              <button
                onClick={() => handleComplete(verifyResult.pickupCode)}
                className="w-full mt-4 bg-[#10B981] text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
              >
                <Check size={16} />
                确认核销
              </button>
            </div>
          )}

          {/* 待核销列表 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DDD0]">
            <p className="text-xs font-semibold text-[#1A1208] mb-3">待核销订单</p>
            <div className="space-y-2">
              {mockPickupOrders
                .filter((o) => o.status === 'pending' && !completedOrders.includes(o.pickupCode))
                .map((order) => (
                  <div key={order.id} className="p-2.5 bg-[#F5EFE8] rounded-lg border border-[#E8DDD0]">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-medium text-[#1A1208]">{order.customerName}</span>
                      <span className="text-xs text-[#B8973A] font-mono">{order.pickupCode}</span>
                    </div>
                    <p className="text-[10px] text-[#8C7B6B] mb-1">{order.items.map((i) => i.name).join('、')}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#8C7B6B]">{order.createdAt}</span>
                      <span className="text-xs font-bold text-[#1A1208]">¥{order.amount}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* 已核销记录 */}
          {completedOrders.length > 0 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DDD0]">
              <p className="text-xs font-semibold text-[#1A1208] mb-3">已核销订单</p>
              <div className="space-y-2">
                {mockPickupOrders
                  .filter((o) => completedOrders.includes(o.pickupCode))
                  .map((order) => (
                    <div key={order.id} className="p-2.5 bg-[#F0FDF4] rounded-lg border border-[#DCFCE7] opacity-75">
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs font-medium text-[#1A1208]">{order.customerName}</span>
                        <Check size={14} className="text-[#10B981]" />
                      </div>
                      <p className="text-[10px] text-[#8C7B6B]">{order.pickupCode}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="pb-2" />
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
