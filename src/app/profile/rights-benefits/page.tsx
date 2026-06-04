'use client';

import Link from 'next/link';
import { ChevronRight, Zap, Gift, Crown, TrendingUp, Users, Lock } from 'lucide-react';
import PhoneFrame from '@/components/PhoneFrame';
import BottomNav from '@/components/BottomNav';

const memberLevels = [
  {
    level: 'Lv.0',
    name: 'VIP用户',
    icon: '👤',
    color: '#6B7280',
    current: false,
    growth: 0,
    nextLevel: 100,
    benefits: ['订单优先处理', '专属客服支持', '生日礼物'],
  },
  {
    level: 'Lv.1',
    name: '初级会员',
    icon: '⭐',
    color: '#D4AF5A',
    current: false,
    growth: 100,
    nextLevel: 500,
    benefits: [
      '订单优先处理',
      '专属客服支持',
      '生日礼物',
      '每月返利 3%',
      '优先参加新品发布',
      '积分兑换商城',
    ],
  },
  {
    level: 'Lv.2',
    name: '高级会员',
    icon: '⭐⭐',
    color: '#F59E0B',
    current: true,
    growth: 2480,
    nextLevel: 5000,
    benefits: [
      '所有初级权益',
      '每月返利 5%',
      '专属优惠券',
      '品牌新品抢先体验',
      '定期美学分享会',
      '专属推荐人福利',
    ],
  },
  {
    level: 'Lv.3',
    name: '推广合伙人',
    icon: '👥',
    color: '#EC4899',
    current: false,
    growth: 5000,
    nextLevel: 22066,
    benefits: [
      '所有高级权益',
      '每月返利 8%',
      '独立推广后台',
      '团队管理工具',
      '分销数据报表',
      '季度奖励计划',
    ],
  },
  {
    level: 'Lv.4',
    name: '运营合伙人',
    icon: '🏆',
    color: '#8B5CF6',
    current: false,
    growth: 22066,
    nextLevel: 100000,
    benefits: [
      '所有推广权益',
      '每月返利 12%',
      '品牌方直接对接',
      '区域运营支持',
      '年度分红计划',
      'VIP线下活动邀约',
    ],
  },
];

const identityBenefits = [
  { icon: '🎁', title: '等级专属礼物', desc: '生日月份获得等级对应礼物' },
  { icon: '💰', title: '返利福利', desc: '根据等级享受订单返利' },
  { icon: '🎫', title: '优惠券', desc: '定期发放等级专属优惠券' },
  { icon: '⏰', title: '优先权', desc: '优先参加品牌活动和新品发布' },
  { icon: '👥', title: '社群权益', desc: '加入等级对应的VIP群组' },
  { icon: '📊', title: '数据支持', desc: '获得运营数据报表和分析' },
];

export default function RightsBenefitsPage() {
  const currentLevel = memberLevels.find((l) => l.current);
  const nextLevel = memberLevels.find((l) => l.level === 'Lv.3');
  const progressPercent = currentLevel
    ? ((currentLevel.growth - (currentLevel.growth === 0 ? 0 : 100)) / 
       (currentLevel.nextLevel - (currentLevel.growth === 0 ? 0 : 100))) * 100
    : 0;

  return (
    <PhoneFrame>
      <div className="bg-gradient-to-b from-[#FAF7F4] to-white min-h-screen">
        {/* 顶部导航 */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#E8DDD0] px-4 py-3 flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-1 text-[#8C7B6B]">
            <ChevronRight size={18} className="rotate-180" />
          </Link>
          <h1 className="text-base font-bold text-[#1A1208]">权益中心</h1>
          <div className="w-6" />
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* 当前身份卡 */}
          {currentLevel && (
            <div
              className="rounded-2xl p-4 text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${currentLevel.color} 0%, ${currentLevel.color}CC 100%)` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-3xl mb-2">{currentLevel.icon}</p>
                  <p className="text-sm opacity-90">当前身份</p>
                  <h2 className="text-lg font-bold mt-1">{currentLevel.name}</h2>
                </div>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold">当前</span>
              </div>

              {/* 进度条 */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs opacity-90">成长进度</span>
                  <span className="text-xs font-semibold">{currentLevel.growth} / {currentLevel.nextLevel}</span>
                </div>
                <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all"
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  />
                </div>
                <p className="text-xs opacity-90 mt-2">还需 {currentLevel.nextLevel - currentLevel.growth} 成长值即可升级为高级会员</p>
              </div>
            </div>
          )}

          {/* 身份权益 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DDD0]">
            <h3 className="text-xs font-semibold text-[#1A1208] mb-3 flex items-center gap-1">
              <Crown size={14} className="text-[#F59E0B]" />
              {currentLevel?.name}权益
            </h3>
            <div className="space-y-2">
              {currentLevel?.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-[#F5EFE8] rounded-lg">
                  <Zap size={14} className="text-[#B8973A] flex-shrink-0" />
                  <span className="text-xs text-[#1A1208]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 升级路径 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DDD0]">
            <h3 className="text-xs font-semibold text-[#1A1208] mb-3">完整升级路线</h3>
            <div className="space-y-2">
              {memberLevels.map((level, i) => (
                <div key={level.level} className="flex items-center gap-2">
                  <div
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: level.color, minWidth: '48px', textAlign: 'center' }}
                  >
                    {level.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#1A1208]">{level.name}</p>
                    <p className="text-[10px] text-[#8C7B6B]">成长值：{level.growth} - {level.nextLevel}</p>
                  </div>
                  {level.current && <span className="text-[10px] text-[#B8973A] font-semibold">当前</span>}
                </div>
              ))}
            </div>
          </div>

          {/* 身份权益说明 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DDD0]">
            <h3 className="text-xs font-semibold text-[#1A1208] mb-3 flex items-center gap-1">
              <Gift size={14} className="text-[#EC4899]" />
              身份权益说明
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {identityBenefits.map((benefit, i) => (
                <div key={i} className="p-2 bg-[#F5EFE8] rounded-lg">
                  <p className="text-lg mb-1">{benefit.icon}</p>
                  <p className="text-xs font-medium text-[#1A1208] mb-0.5">{benefit.title}</p>
                  <p className="text-[10px] text-[#8C7B6B]">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DDD0]">
            <h3 className="text-xs font-semibold text-[#1A1208] mb-3">常见问题</h3>
            <div className="space-y-2.5 text-[10px]">
              <div>
                <p className="font-medium text-[#1A1208] mb-1">成长值如何获取？</p>
                <p className="text-[#8C7B6B]">购买商品、参与分享、邀请好友等活动都可获得成长值。</p>
              </div>
              <div>
                <p className="font-medium text-[#1A1208] mb-1">等级会自动降级吗？</p>
                <p className="text-[#8C7B6B]">不会。成长值达到要求后永久保留该等级，等级只升不降。</p>
              </div>
              <div>
                <p className="font-medium text-[#1A1208] mb-1">权益有过期时间吗？</p>
                <p className="text-[#8C7B6B]">等级权益终身有效。部分活动和优惠券会根据规则设定有效期。</p>
              </div>
            </div>
          </div>

          <div className="pb-2" />
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
