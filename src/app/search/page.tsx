"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search, X, TrendingUp, Clock, Trash2 } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { products } from "@/lib/data";

const HOT_KEYWORDS = ["玻尿酸精华", "抗衰面霜", "烟酰胺精华", "美白水乳套装", "防晒霜SPF50", "深层补水面膜", "敏感肌修护", "视黄醇眼霜"];
const DEFAULT_HISTORY = ["臻润精华", "焕亮面霜", "积雪草修护"];

export default function SearchPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState("");
  const [history, setHistory] = useState<string[]>(DEFAULT_HISTORY);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<typeof products>([]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const doSearch = (kw: string) => {
    if (!kw.trim()) return;
    setHasSearched(true);
    const filtered = products.filter(p =>
      p.name.includes(kw) || p.category.includes(kw) || (p.subtitle?.includes(kw) ?? false)
    );
    setResults(filtered);
    if (!history.includes(kw)) setHistory(prev => [kw, ...prev].slice(0, 8));
  };

  const onClear = () => { setKeyword(""); setHasSearched(false); setResults([]); };
  const onClearHistory = () => setHistory([]);

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        {/* 搜索栏 */}
        <div className="flex items-center gap-3 px-4 pt-3 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="shrink-0">
            <ArrowLeft size={20} className="text-[#3D2B1A]" />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-[#F5EFE8] rounded-full px-4 py-2">
            <Search size={15} className="text-[#8C7B6B]" />
            <input
              ref={inputRef}
              className="flex-1 bg-transparent text-sm text-[#1A1208] placeholder:text-[#B8A898] outline-none"
              placeholder="搜索您心仪的商品"
              value={keyword}
              onChange={e => { setKeyword(e.target.value); if (!e.target.value) { setHasSearched(false); setResults([]); } }}
              onKeyDown={e => e.key === "Enter" && doSearch(keyword)}
            />
            {keyword && (
              <button onClick={onClear}><X size={14} className="text-[#8C7B6B]" /></button>
            )}
          </div>
          <button className="text-sm text-[#B8973A] shrink-0" onClick={() => router.back()}>取消</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {!hasSearched && (
            <div className="p-4 space-y-6">
              {/* 热门推荐 */}
              <div>
                <h3 className="text-sm font-bold text-[#1A1208] mb-3">热门推荐</h3>
                <div className="space-y-0">
                  {HOT_KEYWORDS.map((kw, i) => (
                    <button
                      key={kw}
                      onClick={() => { setKeyword(kw); doSearch(kw); }}
                      className="w-full flex items-center gap-3 py-3 border-b border-[#F5EFE8] last:border-0"
                    >
                      <span className={`w-5 text-sm font-bold ${i < 3 ? "text-[#B8973A]" : "text-[#B8A898]"}`}>{i + 1}</span>
                      <span className="flex-1 text-left text-sm text-[#1A1208]">{kw}</span>
                      {i < 2 && <TrendingUp size={14} className="text-[#E57373]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 搜索历史 */}
              {history.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-[#1A1208]">搜索历史</h3>
                    <button onClick={onClearHistory}><Trash2 size={15} className="text-[#B8A898]" /></button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {history.map(kw => (
                      <button
                        key={kw}
                        onClick={() => { setKeyword(kw); doSearch(kw); }}
                        className="flex items-center gap-1.5 bg-[#F5EFE8] rounded-full px-3 py-1.5 text-sm text-[#3D2B1A]"
                      >
                        <Clock size={12} className="text-[#8C7B6B]" />
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {hasSearched && (
            <div className="p-4">
              {results.length > 0 && (
                <p className="text-xs text-[#8C7B6B] mb-3">为您找到 {results.length} 件商品</p>
              )}
              {results.length > 0 ? (
                <div className="space-y-3">
                  {results.map(p => (
                    <Link key={p.id} href={`/products/${p.id}`} className="flex gap-3 bg-white rounded-xl p-3">
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#F5EFE8]">
                        <Image src={p.image} alt={p.name} width={80} height={80} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1A1208] line-clamp-2">{p.name}</p>
                        <p className="text-xs text-[#8C7B6B] mt-1 line-clamp-1">{p.subtitle}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-base font-bold text-[#B8973A]">¥{p.price}</span>
                          {p.sales && <span className="text-xs text-[#8C7B6B]">月销 {p.sales}+</span>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center py-16 gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#F5EFE8] flex items-center justify-center">
                    <Search size={28} className="text-[#D4C0A8]" />
                  </div>
                  <p className="text-sm font-medium text-[#3D2B1A]">未发现匹配商品</p>
                  <p className="text-xs text-[#8C7B6B]">换个词试试，也许会有惊喜</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
