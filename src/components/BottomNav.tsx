"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3x3, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/products", label: "分类", icon: Grid3x3 },
  { href: "/cart", label: "购物车", icon: ShoppingCart },
  { href: "/profile", label: "我的", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalCount } = useCart();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50 bg-white border-t border-[#E8DDD0]">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 min-w-[56px] py-1"
            >
              <span
                className={`relative flex items-center justify-center w-6 h-6 transition-all duration-200 ${
                  isActive ? "text-[#B8973A]" : "text-[#8C7B6B]"
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                {href === "/cart" && totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-[#B8973A] rounded-full text-white text-[9px] flex items-center justify-center font-medium px-0.5">
                    {totalCount > 99 ? "99+" : totalCount}
                  </span>
                )}
              </span>
              <span
                className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive ? "text-[#B8973A]" : "text-[#8C7B6B]"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="h-safe-area-inset-bottom bg-white" />
    </nav>
  );
}
