"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

const sections = [
  { title: "一、信息收集", content: "我们收集您在注册、购买及使用服务过程中主动提供的信息，包括姓名、手机号码、收货地址、支付信息等。我们同样收集您在使用我们服务时自动产生的信息，如浏览记录、购买记录、设备信息等。" },
  { title: "二、信息使用", content: "我们使用您的个人信息用于：处理订单和提供客户服务；个性化您的使用体验及商品推荐；发送重要通知（如订单状态、活动提醒）；改进我们的产品和服务；遵守适用的法律法规要求。" },
  { title: "三、信息共享", content: "我们不会向任何第三方出售您的个人信息。我们仅在以下情况下共享信息：与物流服务商共享配送所需信息；与支付机构共享支付所需信息；经您授权的第三方服务；法律法规要求的情形。" },
  { title: "四、信息保护", content: "我们采用符合行业标准的安全技术和程序保护您的个人信息，防止未授权访问、使用或披露。您的支付信息通过加密通道传输，我们不保存完整的支付卡号。" },
  { title: "五、您的权利", content: "您有权访问、更正或删除您的个人信息。您可以在「个人中心 - 设置」中管理您的账户信息，或通过客服申请注销账户。账户注销后，相关数据将在 30 天内删除。" },
  { title: "六、Cookie 使用", content: "我们使用 Cookie 和类似技术来记录您的偏好设置、分析使用情况，并为您提供更好的体验。您可以通过浏览器设置拒绝 Cookie，但这可能影响部分功能的使用。" },
  { title: "七、未成年人保护", content: "我们的服务面向 18 周岁及以上用户。如果您是未成年人，请在监护人陪同下使用本服务。我们不会故意收集未成年人的个人信息。" },
  { title: "八、政策更新", content: "我们可能适时更新本隐私政策。政策重大变更时，我们将通过应用内通知或其他显著方式告知您。继续使用我们的服务即表示您同意最新版本的隐私政策。" },
];

export default function PrivacyPage() {
  const router = useRouter();
  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-[#FAF7F4]">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white border-b border-[#F0E8DC]">
          <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <ArrowLeft size={18} className="text-[#1A1208]" />
          </button>
          <span className="flex-1 text-center text-base font-bold text-[#1A1208]">隐私政策</span>
          <div className="w-8" />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-2xl p-5 space-y-5">
            <div className="pb-4 border-b border-[#F0E8DC]">
              <h1 className="text-base font-bold text-[#1A1208]">问兰隐私政策</h1>
              <p className="text-xs text-[#8C7B6B] mt-1">更新日期：2024 年 12 月 1 日 &nbsp;|&nbsp; 生效日期：2024 年 12 月 1 日</p>
              <p className="text-sm text-[#3D2B1A] mt-3 leading-relaxed">
                问兰（以下简称"我们"）深知个人信息对您的重要性，我们将按照法律法规要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。
              </p>
            </div>
            {sections.map(s => (
              <div key={s.title} className="space-y-2">
                <h2 className="text-sm font-bold text-[#1A1208]">{s.title}</h2>
                <p className="text-sm text-[#3D2B1A] leading-relaxed">{s.content}</p>
              </div>
            ))}
            <div className="pt-4 border-t border-[#F0E8DC] text-xs text-[#B8A898] leading-relaxed">
              如您对本隐私政策有任何疑问，请通过客服联系我们：service@yunji.com
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
