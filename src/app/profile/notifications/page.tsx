"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Bell } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const notifications = [
  { id: 1, title: "您的订单已发货", desc: "焕颜臻萃精华 · 顺丰快递 SF1234567890", time: "刚刚", unread: true },
  { id: 2, title: "限时特惠开始啦！", desc: "本周精华、面霜最高直降 ¥180，速来抢购", time: "1小时前", unread: true },
  { id: 3, title: "您有 3 张优惠券即将到期", desc: "有效期至 2024-12-15，请尽快使用", time: "昨天", unread: true },
  { id: 4, title: "评价有礼，获得 25 积分", desc: "感谢您对「轻盈保湿面霜」的评价", time: "3天前", unread: false },
  { id: 5, title: "新品上市通知", desc: "玫瑰焕亮精华系列正式发布，立享首发折扣", time: "1周前", unread: false },
];

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <PhoneFrame hideNav>
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/95 backdrop-blur-sm flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]"
        >
          <ArrowLeft size={18} className="text-[#1A1208]" />
        </button>
        <h1 className="text-base font-bold text-[#1A1208]">消息通知</h1>
        <button className="text-xs text-[#B8973A] font-medium">全部已读</button>
      </header>

      <div className="px-4 py-4 space-y-2">
        {notifications.map(({ id, title, desc, time, unread }) => (
          <div key={id} className={`bg-white rounded-2xl px-4 py-4 flex gap-3 ${unread ? "border-l-2 border-[#B8973A]" : ""}`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${unread ? "bg-[#F0E6C8]" : "bg-[#F5EFE8]"}`}>
              <Bell size={16} className={unread ? "text-[#B8973A]" : "text-[#C0B0A0]"} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className={`text-sm font-semibold leading-tight ${unread ? "text-[#1A1208]" : "text-[#8C7B6B]"}`}>
                  {title}
                </p>
                <span className="text-[10px] text-[#8C7B6B] flex-shrink-0">{time}</span>
              </div>
              <p className="text-xs text-[#8C7B6B] mt-1 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}
