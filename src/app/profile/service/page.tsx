"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Headset, MessageCircle, Phone, Clock, UserCheck,
  Copy, ChevronRight, Mail, MessageSquare,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

export default function ServicePage() {
  const router = useRouter();

  const channels = [
    { icon: Phone, label: "客服热线", value: "400-888-0066" },
    { icon: MessageSquare, label: "企业微信", value: "wenlan-vip" },
    { icon: Mail, label: "邮件支持", value: "vip@wenlan.com" },
    { icon: MessageCircle, label: "在线留言", value: "随时反馈" },
  ];

  const faqs = [
    "如何申请退换货？",
    "订单多久能发货？",
    "如何成为分销合伙人？",
    "积分如何使用与兑换？",
    "门店自提如何核销？",
  ];

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4] pb-8">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A1208] px-4 py-3">
          <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-base font-bold text-white">专属客服</h1>
        </header>

        {/* 头图区 */}
        <div className="bg-[#1A1208] px-5 pb-7 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#B8973A] flex items-center justify-center shrink-0">
              <Headset size={28} className="text-[#1A1208]" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#B8973A] uppercase mb-1">Concierge Service</p>
              <h2 className="text-xl font-light text-white">您的专属顾问随时待命</h2>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 space-y-4">
          {/* 推荐联系渠道大卡 */}
          <div className="bg-white rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-[#B8973A] bg-[#F5EFE8] px-2 py-0.5 rounded-full flex items-center gap-1">
                <UserCheck size={11} /> 人工优先
              </span>
              <span className="text-xs font-medium text-[#5A8A5A] bg-[#EEF6EE] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock size={11} /> 9:00 - 22:00 在线
              </span>
            </div>
            <h3 className="text-base font-bold text-[#1A1208] mt-3">当前推荐：在线客服</h3>
            <p className="text-xs text-[#8C7B6B] mt-1 leading-relaxed">
              工作时间内平均 30 秒接入人工客服，为您处理订单、售后、分销等问题。
            </p>
            <button
              onClick={() => alert("功能开发中")}
              className="w-full mt-4 bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:opacity-80"
            >
              <MessageCircle size={16} /> 立即咨询在线客服
            </button>
            <button
              onClick={() => alert("功能开发中")}
              className="w-full mt-2 border border-[#E5DDD0] text-[#3D2B1A] text-sm font-medium py-3 rounded-xl flex items-center justify-center gap-2 active:opacity-70"
            >
              <Phone size={16} /> 拨打客服热线
            </button>
          </div>

          {/* 联系方式宫格 */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#1A1208] mb-3">更多联系方式</h3>
            <div className="grid grid-cols-2 gap-2">
              {channels.map(({ icon: Icon, label, value }) => (
                <button
                  key={label}
                  onClick={() => alert("功能开发中")}
                  className="flex items-center gap-2.5 bg-[#FAF7F4] rounded-xl p-3 active:opacity-70"
                >
                  <div className="w-9 h-9 rounded-full bg-[#F0E6C8] flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[#B8973A]" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[11px] text-[#8C7B6B]">{label}</p>
                    <p className="text-xs font-medium text-[#1A1208] truncate">{value}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 常见问题 */}
          <div className="bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-[#1A1208]">常见问题</h3>
              <Link href="/profile/help" className="flex items-center gap-0.5 text-xs text-[#B8973A]">
                帮助中心 <ChevronRight size={13} />
              </Link>
            </div>
            <div className="divide-y divide-[#F5EFE8]">
              {faqs.map((q) => (
                <Link
                  key={q}
                  href="/profile/help"
                  className="flex items-center justify-between py-3 active:opacity-70"
                >
                  <span className="text-sm text-[#3D2B1A]">{q}</span>
                  <ChevronRight size={15} className="text-[#C8BAA8] shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
