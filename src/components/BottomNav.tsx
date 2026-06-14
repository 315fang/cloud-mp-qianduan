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
        <div className="flex-1 flex flex-col items-center relative" style={{ marginTop: "-28px" }}>
          <Link
            href="/ai"
            aria-label="问小兰 AI 助手"
            className="flex flex-col items-center gap-1 group"
          >
            {/* 外圈光晕 */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-md opacity-40 transition-opacity duration-300 group-active:opacity-70"
                style={{ background: "radial-gradient(circle, #D4AF5A, transparent 70%)", transform: "scale(1.3)" }}
              />
              {/* 圆形主体 */}
              <div
                className={`relative w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 group-active:scale-95 ${
                  isActive("/ai") ? "ring-[1.5px] ring-white/60 ring-offset-1 ring-offset-[#C9A43A]" : ""
                }`}
                style={{
                  background: "linear-gradient(145deg, #D4AF5A 0%, #B8973A 60%, #9A7D28 100%)",
                  boxShadow: "0 4px 14px rgba(184,151,58,0.45), 0 1px 3px rgba(0,0,0,0.12)",
                }}
              >
                <MessageCircle size={20} strokeWidth={1.6} className="text-white drop-shadow-sm" />
              </div>
            </div>
            <span className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${isActive("/ai") ? "text-[#B8973A]" : "text-[#8C7B6B]"}`}>
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
