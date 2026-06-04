"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3x3, Sparkles, User, MessageCircle } from "lucide-react";

const leftItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/products", label: "分类", icon: Grid3x3 },
];

const rightItems = [
  { href: "/activity", label: "活动", icon: Sparkles },
  { href: "/profile", label: "我的", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50 bg-white border-t border-[#E8DDD0]"
      aria-label="底部导航"
    >
      <div className="flex items-center justify-around h-16 px-2 relative">
        {/* 左侧两个 Tab */}
        {leftItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5 flex-1 py-1"
          >
            <span
              className={`flex items-center justify-center w-6 h-6 transition-all duration-200 ${
                isActive(href) ? "text-[#B8973A]" : "text-[#8C7B6B]"
              }`}
            >
              <Icon size={22} strokeWidth={isActive(href) ? 2 : 1.5} />
            </span>
            <span
              className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                isActive(href) ? "text-[#B8973A]" : "text-[#8C7B6B]"
              }`}
            >
              {label}
            </span>
          </Link>
        ))}

        {/* 中间突出圆形「问小兰」按钮 */}
        <div className="flex flex-col items-center gap-0.5 flex-1 -mt-6 relative z-10">
          <Link
            href="/ai"
            aria-label="问小兰 AI 助手"
            className={`flex flex-col items-center gap-1 group`}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive("/ai")
                  ? "ring-2 ring-[#B8973A] ring-offset-2 ring-offset-white"
                  : "ring-1 ring-[#B8973A]/40 group-active:ring-[#B8973A]/80"
              }`}
              style={{
                background: "rgba(245,197,24,0.08)",
                boxShadow: "0 0 12px 2px rgba(184,151,58,0.18), 0 0 0 1px rgba(184,151,58,0.12)",
              }}
            >
              <MessageCircle
                size={19}
                strokeWidth={1.3}
                className={`transition-colors duration-300 ${isActive("/ai") ? "text-[#B8973A]" : "text-[#B8973A]/70"}`}
              />
            </div>
            <span className="text-[10px] font-medium text-[#B8973A] tracking-wide">
              问小兰
            </span>
          </Link>
        </div>

        {/* 右侧两个 Tab */}
        {rightItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5 flex-1 py-1"
          >
            <span
              className={`flex items-center justify-center w-6 h-6 transition-all duration-200 ${
                isActive(href) ? "text-[#B8973A]" : "text-[#8C7B6B]"
              }`}
            >
              <Icon size={22} strokeWidth={isActive(href) ? 2 : 1.5} />
            </span>
            <span
              className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                isActive(href) ? "text-[#B8973A]" : "text-[#8C7B6B]"
              }`}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>
      <div className="h-safe-area-inset-bottom bg-white" />
    </nav>
  );
}
