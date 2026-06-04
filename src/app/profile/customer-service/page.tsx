'use client';

import Link from 'next/link';
import { ChevronRight, Phone, MessageCircle, Copy, Clock, Users } from 'lucide-react';
import PhoneFrame from '@/components/PhoneFrame';
import BottomNav from '@/components/BottomNav';

const customerServiceTeam = [
  {
    id: 1,
    name: '小兰',
    role: '云肌专属顾问',
    status: '在线',
    avatar: '🧑‍💼',
    phone: '0512-62917333',
    wechat: 'zcx2026520',
    hours: '9:00-21:00',
    tags: ['产品咨询', '订单跟进', '售后处理'],
  },
  {
    id: 2,
    name: '若兰',
    role: '云肌客服',
    status: '离线',
    avatar: '👩‍💼',
    phone: '0512-62917334',
    wechat: 'yunji_service',
    hours: '10:00-22:00',
    tags: ['售后退款', '投诉处理'],
  },
];

export default function CustomerServicePage() {
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`已复制${label}：${text}`);
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <PhoneFrame>
      <div className="bg-gradient-to-b from-[#FAF7F4] to-white min-h-screen">
        {/* 顶部导航 */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#E8DDD0] px-4 py-3 flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-1 text-[#8C7B6B]">
            <ChevronRight size={18} className="rotate-180" />
          </Link>
          <h1 className="text-base font-bold text-[#1A1208]">专属客服</h1>
          <div className="w-6" />
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* 服务提示卡 */}
          <div className="bg-gradient-to-r from-[#FEF3E2] to-[#FFF7ED] rounded-2xl p-4 border border-[#FED7AA]">
            <p className="text-xs text-[#92400E] mb-1 font-medium">💡 温馨提示</p>
            <p className="text-xs text-[#B45309]">
              我们的云肌专属顾问会为您提供产品咨询、订单跟进和售后支持。工作时间内会优先响应，感谢您的耐心。
            </p>
          </div>

          {/* 客服团队成员 */}
          {customerServiceTeam.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DDD0]">
              {/* 客服头部 */}
              <div className="flex items-start gap-3 mb-4">
                <div className="text-3xl">{member.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-[#1A1208]">{member.name}</span>
                    <span
                      className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: member.status === '在线' ? '#D1FAE5' : '#F3F4F6',
                        color: member.status === '在线' ? '#065F46' : '#6B7280',
                      }}
                    >
                      {member.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#8C7B6B]">{member.role}</p>
                  <p className="text-[10px] text-[#8C7B6B] mt-0.5 flex items-center gap-1">
                    <Clock size={12} />
                    {member.hours}
                  </p>
                </div>
              </div>

              {/* 服务标签 */}
              <div className="flex flex-wrap gap-1.5 mb-4 pb-4 border-b border-[#E8DDD0]">
                {member.tags.map((tag) => (
                  <span key={tag} className="text-[10px] bg-[#F5EFE8] text-[#8C7B6B] px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* 联系方式 */}
              <div className="space-y-2.5">
                {/* 电话 */}
                <div className="flex items-center justify-between p-2.5 bg-[#F5EFE8] rounded-lg">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[#E8573A]" />
                    <span className="text-xs text-[#1A1208] font-mono">{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCall(member.phone)}
                      className="p-1.5 bg-[#E8573A] text-white rounded-lg"
                      title="拨打电话"
                    >
                      <Phone size={12} />
                    </button>
                    <button
                      onClick={() => handleCopyText(member.phone, '电话')}
                      className="p-1.5 bg-[#B8973A] text-white rounded-lg"
                      title="复制电话"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                </div>

                {/* 微信 */}
                <div className="flex items-center justify-between p-2.5 bg-[#F5EFE8] rounded-lg">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-[#10B981]" />
                    <span className="text-xs text-[#1A1208] font-mono">{member.wechat}</span>
                  </div>
                  <button
                    onClick={() => handleCopyText(member.wechat, '微信')}
                    className="p-1.5 bg-[#10B981] text-white rounded-lg"
                    title="复制微信"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>

              {/* 快捷按钮 */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={() => handleCall(member.phone)}
                  className="py-2.5 bg-[#E8573A] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1"
                >
                  <Phone size={14} />
                  立即拨打
                </button>
                <button
                  onClick={() => handleCopyText(member.wechat, '微信号')}
                  className="py-2.5 bg-[#10B981] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1"
                >
                  <Copy size={14} />
                  复制微信
                </button>
              </div>
            </div>
          ))}

          {/* 常见问题 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DDD0]">
            <p className="text-xs font-semibold text-[#1A1208] mb-3">常见问题</p>
            <div className="space-y-2">
              <Link href="#" className="flex items-center justify-between p-2.5 bg-[#F5EFE8] rounded-lg hover:bg-[#EFE6D8]">
                <span className="text-xs text-[#1A1208]">如何查看订单进度？</span>
                <ChevronRight size={14} className="text-[#8C7B6B]" />
              </Link>
              <Link href="#" className="flex items-center justify-between p-2.5 bg-[#F5EFE8] rounded-lg hover:bg-[#EFE6D8]">
                <span className="text-xs text-[#1A1208]">支持哪些退货方式？</span>
                <ChevronRight size={14} className="text-[#8C7B6B]" />
              </Link>
              <Link href="#" className="flex items-center justify-between p-2.5 bg-[#F5EFE8] rounded-lg hover:bg-[#EFE6D8]">
                <span className="text-xs text-[#1A1208]">产品过敏怎么办？</span>
                <ChevronRight size={14} className="text-[#8C7B6B]" />
              </Link>
            </div>
          </div>

          {/* 在线咨询 */}
          <div className="bg-gradient-to-r from-[#E0E7FF] to-[#F0F4FF] rounded-2xl p-4 border border-[#C7D2FE]">
            <p className="text-xs font-medium text-[#1A1208] mb-2">快速通道</p>
            <button className="w-full py-2.5 bg-[#4F46E5] text-white text-sm font-medium rounded-lg">
              启动在线咨询
            </button>
          </div>

          <div className="pb-2" />
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
