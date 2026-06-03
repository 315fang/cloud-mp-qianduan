"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    id: 1,
    image: "/images/banner-1.png",
    tag: "年度臻选",
    title: "焕颜臻萃精华",
    subtitle: "黄金因子 · 28日焕亮",
    href: "/products/1",
  },
  {
    id: 2,
    image: "/images/banner-2.png",
    tag: "限时特惠",
    title: "明星护肤套组",
    subtitle: "一站式轻奢护肤体验",
    href: "/products",
  },
  {
    id: 3,
    image: "/images/banner-3.png",
    tag: "新品上市",
    title: "轻透防晒系列",
    subtitle: "SPF50+ · 自然裸肌感",
    href: "/products/6",
  },
];

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-b-[24px]">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.href}
            className="relative w-full flex-shrink-0 aspect-[4/3] block"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority={banner.id === 1}
            />
            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {/* 文字内容 */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block text-[10px] font-medium tracking-[0.15em] text-[#D4AF5A] border border-[#D4AF5A]/60 px-2.5 py-1 rounded-full mb-2">
                {banner.tag}
              </span>
              <h2 className="text-xl font-bold text-white leading-tight">{banner.title}</h2>
              <p className="text-sm text-white/80 mt-0.5">{banner.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 指示点 */}
      <div className="absolute bottom-4 right-5 flex gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-4 h-1.5 bg-[#D4AF5A]"
                : "w-1.5 h-1.5 bg-white/50"
            }`}
            aria-label={`切换到第${i + 1}张`}
          />
        ))}
      </div>
    </div>
  );
}
