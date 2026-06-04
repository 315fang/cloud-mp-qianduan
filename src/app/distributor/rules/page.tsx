"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";

const faqs = [
  { q: "如何成为分销商？", a: "在「我的」页面点击「申请经销商」，选择对应等级后按提示完成申请即可。审核通过后即可开始分销。" },
  { q: "佣金什么时候到账？", a: "订单完成后（买家确认收货后 7 天），佣金进入「待结算」状态。每月 1 日自动结算上月到期佣金至钱包。" },
  { q: "如何提现？", a: "钱包余额满 100 元即可申请提现，工作日 1-3 天到账（微信/银行卡）。" },
  { q: "退款会影响佣金吗？", a: "若买家申请退款且退款成功，对应订单的佣金将不予计算或从账户扣除（如已结算）。" },
  { q: "等级是永久的吗？", a: "等级有效期为自然年，每年 1 月 1 日根据上一年度的累计销售额重新评级。" },
];

const levels = [
  { name: "L1 普通经销商", commission1: "8%", commission2: "3%", commission3: "—", threshold: "¥0 入门" },
  { name: "L2 高级经销商", commission1: "10%", commission2: "5%", commission3: "2%", threshold: "¥2,000/月" },
  { name: "L3 战略经销商", commission1: "12%", commission2: "6%", commission3: "3%", threshold: "¥10,000/月" },
];

export default function DistributorRulesPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">分销规则</span>
          <div className="w-8" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 核心规则 */}
          <div className="bg-[#1A1208] rounded-2xl p-5 text-white space-y-3">
            <h2 className="font-bold text-base text-[#B8973A]">分销体系说明</h2>
            <p className="text-sm text-white/80 leading-relaxed">
              云肌采用三层分销体系。您分享商品后，通过您的专属链接/二维码产生的订单，按等级比例计算直销佣金。您的直接下级的销售额，您还可获得相应的团队分佣。
            </p>
          </div>

          {/* 等级对比表 */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F0E8DC]">
              <h3 className="text-sm font-bold text-[#1A1208]">等级佣金对比</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-[#F5EFE8]">
                  <tr>
                    <th className="px-3 py-2.5 text-left text-[#3D2B1A] font-semibold">等级</th>
                    <th className="px-3 py-2.5 text-center text-[#3D2B1A] font-semibold">直销</th>
                    <th className="px-3 py-2.5 text-center text-[#3D2B1A] font-semibold">二级</th>
                    <th className="px-3 py-2.5 text-center text-[#3D2B1A] font-semibold">三级</th>
                    <th className="px-3 py-2.5 text-right text-[#3D2B1A] font-semibold">门槛</th>
                  </tr>
                </thead>
                <tbody>
                  {levels.map((l, i) => (
                    <tr key={l.name} className={i % 2 === 0 ? "" : "bg-[#FAF7F4]"}>
                      <td className="px-3 py-3 font-medium text-[#1A1208]">{l.name}</td>
                      <td className="px-3 py-3 text-center text-[#B8973A] font-bold">{l.commission1}</td>
                      <td className="px-3 py-3 text-center text-[#B8973A] font-bold">{l.commission2}</td>
                      <td className="px-3 py-3 text-center text-[#B8973A] font-bold">{l.commission3}</td>
                      <td className="px-3 py-3 text-right text-[#8C7B6B]">{l.threshold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 结算规则 */}
          <div className="bg-white rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-[#1A1208]">结算规则</h3>
            {[
              { step: "1", title: "订单产生", desc: "买家通过您的分享链接下单，佣金进入冻结状态" },
              { step: "2", title: "订单完成", desc: "买家确认收货后 7 天，佣金变为可结算" },
              { step: "3", title: "自动结算", desc: "每月 1 日结算上月到期佣金，打入钱包余额" },
              { step: "4", title: "申请提现", desc: "余额满 ¥100 可申请提现，1-3 个工作日到账" },
            ].map(item => (
              <div key={item.step} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#B8973A] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-[11px] font-bold">{item.step}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1208]">{item.title}</p>
                  <p className="text-xs text-[#8C7B6B] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F0E8DC]">
              <h3 className="text-sm font-bold text-[#1A1208]">常见问题</h3>
            </div>
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[#F0E8DC] last:border-0">
                <button
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-medium text-[#1A1208] flex-1 pr-3">{faq.q}</span>
                  <ChevronDown size={16} className={`text-[#8C7B6B] transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-[#8C7B6B] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
