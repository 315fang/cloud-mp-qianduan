"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const posts = [
  {
    id: "p1", author: "芳芳的护肤笔记", avatar: "/images/product-cream.png", time: "2小时前",
    content: "用了三周的臻润精华，皮肤状态真的好了很多！早晨起来脸颊不再紧绷，而且整体气色也亮了，姐妹们可以冲！",
    images: ["/images/product-serum.png", "/images/product-cream.png"],
    likes: 128, comments: 23, productId: "1", productName: "臻润修护精华液 30ml",
  },
  {
    id: "p2", author: "护肤控小雨", avatar: "/images/product-toner.png", time: "昨天",
    content: "买了焕亮面霜作为换季补货，质地超级轻盈，今年秋天不怕干了🍂 顺带拍了一组氛围感照，分享给大家～",
    images: ["/images/product-cream.png"],
    likes: 89, comments: 11, productId: "2", productName: "焕亮嫩肤面霜 50ml",
  },
  {
    id: "p3", author: "美妆研究员", avatar: "/images/product-eye.png", time: "3天前",
    content: "修护眼霜真的是我近期最爱的单品，细纹淡了不少，早晚都在用。成分表很干净，敏感肌也能放心入。",
    images: ["/images/product-eye.png", "/images/product-serum.png", "/images/product-cream.png"],
    likes: 312, comments: 47, productId: "5", productName: "修护精华眼霜 15ml",
  },
];

export default function FeedPage() {
  const router = useRouter();
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => setLiked(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleSave = (id: string) => setSaved(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">种草动态</span>
          <div className="w-8" />
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#F0E8DC]">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-4">
              {/* 作者信息 */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#F5EFE8] shrink-0">
                  <Image src={post.avatar} alt={post.author} width={36} height={36} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1A1208]">{post.author}</p>
                  <p className="text-xs text-[#B8A898]">{post.time}</p>
                </div>
                <button className="text-xs border border-[#E8DDD0] text-[#3D2B1A] px-3 py-1 rounded-full">关注</button>
              </div>

              {/* 内容 */}
              <p className="text-sm text-[#3D2B1A] leading-relaxed mb-3">{post.content}</p>

              {/* 图片 */}
              {post.images.length > 0 && (
                <div className={`grid gap-1.5 mb-3 ${post.images.length === 1 ? "grid-cols-1" : post.images.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                  {post.images.map((img, i) => (
                    <div key={i} className={`overflow-hidden rounded-xl bg-[#F5EFE8] ${post.images.length === 1 ? "aspect-[4/3]" : "aspect-square"}`}>
                      <Image src={img} alt="" width={200} height={200} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* 关联商品 */}
              <Link href={`/products/${post.productId}`} className="flex items-center gap-2 bg-[#F5EFE8] rounded-xl px-3 py-2 mb-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shrink-0">
                  <Image src={post.images[0]} alt={post.productName} width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-[#3D2B1A] flex-1 truncate">{post.productName}</span>
                <span className="text-xs text-[#B8973A] shrink-0">查看 &rsaquo;</span>
              </Link>

              {/* 互动栏 */}
              <div className="flex items-center gap-5">
                <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5">
                  <Heart size={16} className={liked.has(post.id) ? "fill-[#E57373] text-[#E57373]" : "text-[#8C7B6B]"} />
                  <span className="text-xs text-[#8C7B6B]">{post.likes + (liked.has(post.id) ? 1 : 0)}</span>
                </button>
                <button className="flex items-center gap-1.5">
                  <MessageCircle size={16} className="text-[#8C7B6B]" />
                  <span className="text-xs text-[#8C7B6B]">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5">
                  <Share2 size={16} className="text-[#8C7B6B]" />
                </button>
                <button onClick={() => toggleSave(post.id)} className="ml-auto">
                  <Bookmark size={16} className={saved.has(post.id) ? "fill-[#B8973A] text-[#B8973A]" : "text-[#8C7B6B]"} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
