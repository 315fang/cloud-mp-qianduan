import type { ReactNode } from "react";

/**
 * 鎏金会员卡式 Hero 容器。
 * 用于替代分销资金类页面中"纯黑大色块 + 白字"的同质化头部。
 * 提供：深棕鎏金渐变底、雕版同心环纹、烫金品牌水印、金色内描边与品牌行。
 * 具体的金额、统计、按钮等内容通过 children 注入。
 */
export default function GoldHeroCard({
  brand = "问兰",
  sub = "WENLAN",
  badge,
  watermark = "兰",
  children,
}: {
  brand?: string;
  sub?: string;
  badge?: ReactNode;
  watermark?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#FAF7F4] px-4 pt-1 pb-2">
      <div
        className="relative rounded-[26px] overflow-hidden px-6 pt-5 pb-6"
        style={{
          background: "linear-gradient(135deg,#3A2A18 0%,#1F1509 46%,#241A10 100%)",
          boxShadow: "0 16px 34px -12px rgba(26,18,8,0.55)",
        }}
      >
        {/* 雕版同心环纹 */}
        <svg
          className="absolute -right-14 -top-14 w-52 h-52 opacity-[0.10]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="#E7C977"
          aria-hidden="true"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx="100" cy="100" r={18 + i * 11} strokeWidth="0.6" />
          ))}
        </svg>
        {/* 右上金色光晕 */}
        <div
          className="absolute -top-8 -right-6 w-36 h-36 rounded-full"
          style={{ background: "radial-gradient(circle,#D4AF5A,transparent 68%)", opacity: 0.22 }}
        />
        {/* 烫金水印印记 */}
        <span className="absolute -bottom-3 right-4 text-[120px] leading-none font-serif text-[#E7C977]/[0.07] select-none pointer-events-none">
          {watermark}
        </span>
        {/* 金色内描边 */}
        <div className="absolute inset-[7px] rounded-[20px] border border-[#E7C977]/15 pointer-events-none" />

        {/* 品牌行 */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="w-8 h-8 rounded-full border border-[#E7C977]/50 flex items-center justify-center font-serif text-sm text-[#E7C977]"
              style={{ background: "rgba(231,201,119,0.08)" }}
            >
              {watermark}
            </span>
            <div className="leading-tight">
              <p className="text-[12px] font-bold text-[#F1E4C4] tracking-wide">{brand}</p>
              <p className="text-[9px] text-[#C9B68C]/70 tracking-[0.22em] mt-0.5">{sub}</p>
            </div>
          </div>
          {badge}
        </div>

        {/* 内容区 */}
        <div className="relative mt-5">{children}</div>
      </div>
    </div>
  );
}

/** 金色细分隔线，供 Hero 内容区使用 */
export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px ${className}`}
      style={{ background: "linear-gradient(to right,transparent,rgba(231,201,119,0.45),transparent)" }}
    />
  );
}
