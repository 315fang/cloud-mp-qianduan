"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

const productCategories = [
  { name: "精华液", items: ["焕活修护精华液 ¥599", "柔和焕肤精华 ¥428", "晶透亮肤精露 ¥498"] },
  { name: "面膜", items: ["深层补水面膜 ¥68", "焕颜提亮面膜 ¥75", "舒缓修护面膜 ¥72"] },
  { name: "乳液", items: ["轻透保湿乳液 ¥328", "深层滋养乳液 ¥368", "高效修护乳液 ¥398"] },
];

export default function CustomChoicePage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <PhoneFrame>
      {/* 顶部 */}
      <header className="sticky top-0 z-40 bg-gradient-to-b from-[#2A4A2A] to-[#3A5A3A]/50 text-white backdrop-blur-sm px-4 py-3 border-b border-[#5FA86C]/20">
        <div className="flex items-center justify-between">
          <Link href="/activity" className="flex items-center">
            <ChevronLeft size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛍</span>
            <h1 className="text-base font-bold">特惠随心选</h1>
          </div>
          <div className="w-6" />
        </div>
      </header>

      <div className="px-4 py-4 space-y-4 pb-20">
        {/* 活动介绍 */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2A4A2A] to-[#3A5A3A] text-white border border-[#5FA86C]/30">
          <p className="text-sm font-semibold mb-2">DIY组合，享受优惠</p>
          <p className="text-xs leading-relaxed">
            在3个品类中自由选择产品，组成专属组合套装。满足条件即可享受组合优惠价。
          </p>
        </div>

        {/* 选品区域 */}
        <section className="space-y-3">
          <p className="text-sm font-semibold text-[#1A1208]">选择产品</p>
          {productCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <h3 className="text-xs font-semibold text-[#8C7B6B] px-1">{category.name}</h3>
              <div className="space-y-1.5">
                {category.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleItem(item)}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left text-xs ${
                      selectedItems.includes(item)
                        ? "bg-[#E8F5EE] border-[#5FA86C]"
                        : "bg-white border-[#E8DDD0] hover:border-[#B8973A]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={selectedItems.includes(item) ? "text-[#2D8C5E] font-semibold" : "text-[#1A1208]"}>
                        {item}
                      </span>
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedItems.includes(item)
                          ? "bg-[#5FA86C] border-[#5FA86C]"
                          : "border-[#D4AF5A]"
                      }`}>
                        {selectedItems.includes(item) && <span className="text-white text-sm">✓</span>}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* 优惠计算 */}
        <div className="sticky bottom-20 p-4 rounded-2xl bg-gradient-to-r from-[#2A4A2A]/10 to-[#3A5A3A]/10 border border-[#5FA86C]/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8C7B6B]">已选产品</span>
            <span className="text-base font-bold text-[#2D8C5E]">{selectedItems.length} 件</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#8C7B6B]">预计优惠</span>
            <span className="text-lg font-bold text-[#2D8C5E]">¥98</span>
          </div>
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[#5FA86C] to-[#2D8C5E] text-white text-sm font-bold hover:shadow-lg transition-shadow">
            <ShoppingCart size={14} className="inline mr-1" />
            确认组合 (3件享至少88折)
          </button>
        </div>

        {/* 活动规则 */}
        <div className="p-4 rounded-2xl bg-[#E8F5EE] border border-[#5FA86C]/20">
          <p className="text-xs font-semibold text-[#2D8C5E] mb-2">活动规则</p>
          <ul className="text-xs text-[#3A5A3A] space-y-1">
            <li>• 3件组合享 88 折优惠</li>
            <li>• 4件组合享 85 折优惠</li>
            <li>• 5件及以上享 8 折优惠</li>
            <li>• 每个品类最多选1件</li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
