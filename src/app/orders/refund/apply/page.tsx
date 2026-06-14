"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ChevronDown, ChevronRight, Upload } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const REASONS = ["质量问题", "描述不符", "尺寸/规格不对", "商品破损", "未收到货", "不想要了", "其他"];

export default function RefundApplyPage() {
  const router = useRouter();
  const [type, setType] = useState<"refund_only" | "return_refund">("refund_only");
  const [reasonIndex, setReasonIndex] = useState(-1);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("388.00");
  const [submitted, setSubmitted] = useState(false);
  const maxAmount = 388.0;

  const handleSubmit = () => {
    if (reasonIndex < 0) { alert("请选择退款原因"); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full bg-[#FAF7F4] items-center justify-center gap-4 p-6">
          <div className="w-16 h-16 rounded-full bg-[#FFF7E6] flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B8973A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h2 className="text-lg font-bold text-[#1A1208]">退款申请已提交</h2>
          <p className="text-sm text-[#8C7B6B] text-center">预计 3-5 个工作日内处理，请耐心等待。退款将原路退回。</p>
          <button onClick={() => router.replace("/orders")} className="mt-4 w-full py-3 bg-[#1A1208] rounded-xl text-white text-sm font-medium">
            查看退款进度
          </button>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">申请退款</span>
          <div className="w-8" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 商品信息 */}
          <div className="bg-white rounded-2xl p-4 flex gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F5EFE8] shrink-0">
              <Image src="/images/product-serum.png" alt="商品" width={64} height={64} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1A1208]">臻润修护精华液 30ml</p>
              <p className="text-xs text-[#8C7B6B] mt-1">已支付 ¥{maxAmount.toFixed(2)}</p>
            </div>
          </div>

          {/* 退款类型 */}
          <div className="bg-white rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-[#1A1208]">退款类型</h3>
            {[
              { value: "refund_only" as const, label: "仅退款", desc: "无需退货，直接退款到账户" },
              { value: "return_refund" as const, label: "退货退款", desc: "寄回商品后退款，运费自理" },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setType(opt.value)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all ${
                  type === opt.value ? "border-[#B8973A] bg-[#FFF7E6]" : "border-[#F0E8DC]"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${
                  type === opt.value ? "border-[#B8973A]" : "border-[#D4C0A8]"
                }`}>
                  {type === opt.value && <div className="w-2 h-2 rounded-full bg-[#B8973A]" />}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-[#1A1208]">{opt.label}</p>
                  <p className="text-xs text-[#8C7B6B] mt-0.5">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* 退款原因 */}
          <div className="bg-white rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-[#1A1208]">退款原因</h3>
            <div className="grid grid-cols-2 gap-2">
              {REASONS.map((r, i) => (
                <button
                  key={r}
                  onClick={() => setReasonIndex(i)}
                  className={`text-sm py-2 px-3 rounded-lg border text-left transition-all ${
                    reasonIndex === i ? "border-[#B8973A] bg-[#FFF7E6] text-[#B8973A]" : "border-[#F0E8DC] text-[#3D2B1A]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* 退款说明 */}
          <div className="bg-white rounded-2xl p-4 space-y-2">
            <h3 className="text-sm font-bold text-[#1A1208]">退款说明（选填）</h3>
            <textarea
              className="w-full bg-[#F5EFE8] rounded-xl px-3 py-2.5 text-sm text-[#1A1208] placeholder:text-[#B8A898] outline-none resize-none"
              rows={3}
              placeholder="请描述您遇到的问题，有助于我们快速处理"
              value={description}
              maxLength={200}
              onChange={e => setDescription(e.target.value)}
            />
            <p className="text-right text-xs text-[#B8A898]">{description.length}/200</p>
          </div>

          {/* 上传凭证 */}
          <div className="bg-white rounded-2xl p-4 space-y-2">
            <h3 className="text-sm font-bold text-[#1A1208]">上传凭证（选填）</h3>
            <div className="flex gap-2">
              <button className="w-16 h-16 rounded-xl border-2 border-dashed border-[#D4C0A8] flex flex-col items-center justify-center gap-1">
                <Upload size={16} className="text-[#B8A898]" />
                <span className="text-[10px] text-[#B8A898]">添加图片</span>
              </button>
            </div>
          </div>

          {/* 退款金额 */}
          <div className="bg-white rounded-2xl p-4 space-y-2">
            <h3 className="text-sm font-bold text-[#1A1208]">退款金额</h3>
            <div className="flex items-center gap-2 bg-[#F5EFE8] rounded-xl px-3 py-2.5">
              <span className="text-[#B8973A] font-bold">¥</span>
              <input
                className="flex-1 bg-transparent text-base font-bold text-[#B8973A] outline-none"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                max={maxAmount}
              />
              <span className="text-xs text-[#8C7B6B]">最多 ¥{maxAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 bg-white border-t border-[#F0E8DC]">
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 bg-[#1A1208] text-white rounded-xl text-sm font-bold"
          >
            提交退款申请
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
