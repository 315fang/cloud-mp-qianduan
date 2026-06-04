'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Share2, Heart, MessageCircle } from 'lucide-react';
import PhoneFrame from '@/components/PhoneFrame';
import BottomNav from '@/components/BottomNav';

const brandStories = [
  {
    id: 1,
    title: '八宝的"镜像见面会"｜苏州线下见面会圆满落幕',
    desc: '269位粉丝齐聚苏州，见证云肌品牌的温暖故事。这个周末，我们与粉丝们一起分享了美的秘密。',
    image: '/images/banner-2.png',
    date: '2024年5月28日',
    reads: 8420,
    likes: 2156,
    category: '品牌活动',
    liked: false,
  },
  {
    id: 2,
    title: '产品故事｜如何护肤？专业皮肤科医生告诉你',
    desc: '云肌携手皮肤科医生，为你揭示正确护肤的秘诀。科学护肤，从了解肌肤开始。',
    image: '/images/banner-2.png',
    date: '2024年5月15日',
    reads: 5342,
    likes: 1203,
    category: '产品知识',
    liked: false,
  },
  {
    id: 3,
    title: '创始人对话｜云肌如何诞生？',
    desc: '从一个想法到一个品牌，创始人讲述云肌背后的故事。一切都源于对美的执着追求。',
    image: '/images/banner-2.png',
    date: '2024年5月01日',
    reads: 3210,
    likes: 892,
    category: '品牌故事',
    liked: false,
  },
  {
    id: 4,
    title: '用户故事｜她的护肤蜕变',
    desc: '真实的用户，真实的蜕变。来看看云肌如何改变了她的肌肤状态。',
    image: '/images/banner-2.png',
    date: '2024年4月20日',
    reads: 6780,
    likes: 1547,
    category: '用户故事',
    liked: false,
  },
];

export default function BrandStoryPage() {
  return (
    <PhoneFrame>
      <div className="bg-gradient-to-b from-[#FAF7F4] to-white min-h-screen">
        {/* 顶部导航 */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#E8DDD0] px-4 py-3 flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-1 text-[#8C7B6B]">
            <ChevronRight size={18} className="rotate-180" />
          </Link>
          <h1 className="text-base font-bold text-[#1A1208]">品牌故事</h1>
          <div className="w-6" />
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* 品牌介绍卡 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DDD0]">
            <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-[#E8DDD0]">
              <Image
                src="/images/banner-2.png"
                alt="云肌品牌"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-sm font-bold text-[#1A1208] mb-2">CLOUD BEAUTY · 云肌</h2>
            <p className="text-xs text-[#8C7B6B] leading-relaxed mb-3">
              云肌是一个专注于护肤品研发与分享的新品牌。我们相信，美肌源于科学，而非盲目跟风。通过与皮肤科医生、护肤博主的合作，为每一位用户提供专业、有效、温和的护肤解决方案。
            </p>
            <div className="flex items-center gap-4 pt-3 border-t border-[#E8DDD0]">
              <div className="text-center">
                <p className="text-[10px] text-[#8C7B6B]">粉丝</p>
                <p className="text-sm font-bold text-[#1A1208] mt-0.5">2.3w</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#8C7B6B]">分享</p>
                <p className="text-sm font-bold text-[#1A1208] mt-0.5">342</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#8C7B6B]">内容</p>
                <p className="text-sm font-bold text-[#1A1208] mt-0.5">127</p>
              </div>
              <button className="flex-1 py-2 bg-[#B8973A] text-white text-xs font-medium rounded-lg">
                关注品牌
              </button>
            </div>
          </div>

          {/* 分类筛选 */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['全部', '品牌活动', '产品知识', '品牌故事', '用户故事'].map((cat) => (
              <button
                key={cat}
                className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  cat === '全部'
                    ? 'bg-[#B8973A] text-white'
                    : 'bg-white text-[#8C7B6B] border border-[#E8DDD0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 品牌故事列表 */}
          <div className="space-y-3">
            {brandStories.map((story) => (
              <div key={story.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8DDD0]">
                <div className="flex gap-3 p-3">
                  {/* 左侧缩略图 */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#E8DDD0] flex-shrink-0">
                    <Image
                      src={story.image}
                      alt={story.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 右侧内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-xs font-bold text-[#1A1208] line-clamp-2">{story.title}</h3>
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded font-semibold whitespace-nowrap flex-shrink-0"
                        style={{
                          backgroundColor: {
                            '品牌活动': '#FEF3E2',
                            '产品知识': '#E0E7FF',
                            '品牌故事': '#FCE7F3',
                            '用户故事': '#F0FDF4',
                          }[story.category] || '#F5EFE8',
                          color: {
                            '品牌活动': '#B45309',
                            '产品知识': '#4F46E5',
                            '品牌故事': '#BE185D',
                            '用户故事': '#16A34A',
                          }[story.category] || '#8C7B6B',
                        }}
                      >
                        {story.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8C7B6B] line-clamp-1 mb-1.5">{story.desc}</p>
                    <div className="flex items-center justify-between text-[9px] text-[#A08050]">
                      <span>{story.date}</span>
                      <div className="flex gap-2">
                        <span>{story.reads}次阅读</span>
                        <span>{story.likes}个赞</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 底部操作栏 */}
                <div className="flex items-center justify-between px-3 py-2 border-t border-[#E8DDD0] bg-[#F5EFE8]">
                  <button className="flex items-center gap-1 text-xs text-[#8C7B6B]">
                    <Heart size={14} />
                    赞
                  </button>
                  <button className="flex items-center gap-1 text-xs text-[#8C7B6B]">
                    <MessageCircle size={14} />
                    评论
                  </button>
                  <button className="flex items-center gap-1 text-xs text-[#8C7B6B]">
                    <Share2 size={14} />
                    分享
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 底部内容加载 */}
          <div className="text-center py-4">
            <p className="text-xs text-[#8C7B6B] mb-3">已加载全部内容</p>
            <button className="px-4 py-2 bg-white text-[#B8973A] text-xs font-medium rounded-lg border border-[#B8973A]">
              返回顶部
            </button>
          </div>

          <div className="pb-2" />
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
