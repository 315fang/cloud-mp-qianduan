"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const mockRefunds = [
  { id: "R2024001", orderNo: "2024120800001", productName: "臻润修护精华液 30ml", image: "/images/product-serum.png", amount: 388, status: "processing", statusText: "处理中", date: "2024-12-08" },
  { id: "R2024002", orderNo: "2024110500002", productName: "焕亮嫩肤面霜 50ml", image: "/images/product-cream.png", amount: 268, status: "approved", statusText: "已退款", date: "2024-11-05" },
  { id: "R2024003", orderNo: "2024100200003", productName: "深层补水紧致面膜套装", image: "/images/product-mask.png", amount: 196, status: "rejected", statusText: "已拒绝", date: "2024-10-02" },
];

const statusStyle: Record<string, string> = {
  processing: "text-[#B8973A] bg-[#FFF7E6]",
  approved: "text-[#388E3C] bg-[#E8F5E9]",
  rejected: "text-[#D32F2F] bg-[#FFEBEE]",
};

export default function RefundListPage() {
  const router = useRouter();
  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">退款/售后</span>
          <div className="w-8" />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mockRefunds.map(r => (
            <Link key={r.id} href={`/orders/refund/${r.id}`} className="block bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#8C7B6B]">退款单号：{r.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[r.status]}`}>{r.statusText}</span>
              </div>
              <div className="flex gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F5EFE8] shrink-0">
                  <Image src={r.image} alt={r.productName} width={56} height={56} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1A1208] line-clamp-2">{r.productName}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-[#8C7B6B]">{r.date}</span>
                    <span className="text-sm font-bold text-[#B8973A]">¥{r.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
