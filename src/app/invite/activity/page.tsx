"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Gift,
  ShieldCheck,
  Sparkles,
  Share2,
  Phone,
  Lock,
  Loader2,
  AlertCircle,
  UserPlus,
  ClipboardList,
  PartyPopper,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

// 邀请人信息（实际由 URL 参数 / 后端解析）
const inviter = {
  name: "李静茵",
  avatar: "李",
  level: "金牌合伙人",
  title: "诚邀你成为问兰品鉴官",
  subtitle: "定向邀约 · 名额有限，凭专属链接加入",
  phone: "138••••6022",
};

const perks = [
  { icon: Gift, title: "新人专享礼包", desc: "加入即领 ¥50 无门槛券 + 正装小样" },
  { icon: Sparkles, title: "品鉴官权益", desc: "新品优先体验，专属折扣价" },
  { icon: ShieldCheck, title: "成长激励", desc: "推荐好友得积分，兑换品牌好礼" },
];

const flow = [
  { icon: UserPlus, title: "接受邀约", desc: "确认邀请人并提交加入申请" },
  { icon: ClipboardList, title: "完善资料", desc: "填写联系方式，等待审核通过" },
  { icon: PartyPopper, title: "解锁权益", desc: "成为品鉴官，立享专属福利" },
];

function ActivityInviteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // mode: share=自己打开分享给好友 / accept=他人打开接受邀约
  const mode = searchParams.get("mode") === "accept" ? "accept" : "share";
  // state: loading / expired / ok
  const pageState = searchParams.get("state") ?? "ok";
  // 是否拥有分享权限（实际由后端身份判定）
  const canShare = searchParams.get("share") !== "off";

  const [submitted, setSubmitted] = useState(false);
  const [shared, setShared] = useState(false);

  // 加载中状态
  if (pageState === "loading") {
    return (
      <PhoneFrame hideNav>
        <div className="min-h-full bg-[#1A1208] flex flex-col items-center justify-center gap-4">
          <Loader2 size={36} className="text-[#B8973A] animate-spin" />
          <p className="text-sm text-white/60">正在加载邀约信息…</p>
        </div>
      </PhoneFrame>
    );
  }

  // 邀约失效状态
  if (pageState === "expired") {
    return (
      <PhoneFrame hideNav>
        <div className="min-h-full bg-[#1A1208] flex flex-col items-center justify-center px-8 text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
            <AlertCircle size={32} className="text-[#B8973A]" />
          </div>
          <div>
            <p className="text-base font-bold text-white">邀约已失效</p>
            <p className="text-sm text-white/50 mt-2 leading-relaxed">
              该邀约链接已过期或名额已满，
              <br />
              请联系邀请人重新获取。
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="mt-2 px-8 py-3 rounded-full bg-[#B8973A] text-[#1A1208] text-sm font-bold"
          >
            返回首页
          </button>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame hideNav>
      <div className="min-h-full bg-[#1A1208] flex flex-col">
        {/* 顶部返回 */}
        <button
          onClick={() => router.back()}
          className="absolute top-12 left-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/10"
          aria-label="返回"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>

        {/* Hero：邀请人信息 */}
        <div className="px-6 pt-14 pb-7 text-center">
          <p className="text-[10px] tracking-[0.4em] text-[#B8973A] uppercase mb-4">Wenlan Beauty · 问兰</p>
          <div className="w-20 h-20 rounded-full bg-[#F0E6C8] flex items-center justify-center text-3xl font-bold text-[#B8973A] mx-auto mb-3">
            {inviter.avatar}
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-lg font-bold text-white">{inviter.name}</h2>
            <span className="text-[10px] text-[#B8973A] border border-[#B8973A]/50 px-2 py-0.5 rounded-full">
              {inviter.level}
            </span>
          </div>
          <h1 className="text-base font-bold text-white">{inviter.title}</h1>
          <p className="text-sm text-white/60 mt-1">{inviter.subtitle}</p>
          <div className="inline-flex items-center gap-1.5 mt-3 text-[11px] text-white/40">
            <Phone size={12} />
            <span>邀请人联系方式：{inviter.phone}</span>
          </div>
        </div>

        {/* 下半区白底 */}
        <div className="flex-1 bg-[#FAF7F4] rounded-t-3xl px-5 pt-6 pb-8">
          {/* 权益卡 */}
          <h3 className="text-base font-bold text-[#1A1208] mb-1">加入后你可以获得</h3>
          <p className="text-xs text-[#8C7B6B] mb-4">专属品鉴官身份，解锁多重福利</p>
          <div className="space-y-3">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#F5EFE8] flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-[#B8973A]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#1A1208]">{title}</p>
                  <p className="text-xs text-[#8C7B6B] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 流程说明 */}
          <h3 className="text-base font-bold text-[#1A1208] mt-7 mb-4">三步加入</h3>
          <div className="bg-white rounded-2xl p-4">
            {flow.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#1A1208] flex items-center justify-center">
                    <Icon size={16} className="text-[#B8973A]" />
                  </div>
                  {i < flow.length - 1 && <div className="w-px h-7 bg-[#E8DDD0] my-1" />}
                </div>
                <div className="flex-1 pb-1">
                  <p className="text-sm font-bold text-[#1A1208]">
                    <span className="text-[#B8973A] mr-1">{i + 1}.</span>
                    {title}
                  </p>
                  <p className="text-xs text-[#8C7B6B] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 中段双态卡 */}
          {mode === "share" ? (
            // 自己打开：分享给好友卡
            <div className="mt-7 bg-white rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Share2 size={17} className="text-[#B8973A]" />
                <h3 className="text-base font-bold text-[#1A1208]">分享给好友</h3>
              </div>
              {canShare ? (
                <>
                  <div className="bg-[#FBF5E6] rounded-xl px-4 py-3 flex items-start gap-2 mb-4">
                    <ShieldCheck size={14} className="text-[#B8973A] mt-0.5 shrink-0" />
                    <p className="text-[11px] text-[#8C7B6B] leading-relaxed">
                      你拥有定向邀约权限，可将专属链接分享给好友。好友通过你的链接加入后，将与你建立邀约关系。
                    </p>
                  </div>
                  <button
                    onClick={() => setShared(true)}
                    className="w-full bg-[#B8973A] text-[#1A1208] text-sm font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:opacity-80"
                  >
                    {shared ? (
                      <>
                        <Check size={18} /> 已生成分享，请在微信中转发
                      </>
                    ) : (
                      <>
                        <Share2 size={16} /> 分享专属邀约链接
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-[#A89685] text-center mt-3">
                    分享动作由微信原生能力完成
                  </p>
                </>
              ) : (
                // 不可分享态
                <div className="text-center py-3">
                  <div className="w-12 h-12 rounded-full bg-[#F5EFE8] flex items-center justify-center mx-auto mb-3">
                    <Lock size={22} className="text-[#A89685]" />
                  </div>
                  <p className="text-sm font-medium text-[#3D2B1A]">暂无分享权限</p>
                  <p className="text-[11px] text-[#8C7B6B] mt-1.5 leading-relaxed px-2">
                    当前身份不支持发起定向邀约，
                    <br />
                    升级为合伙人后即可解锁分享。
                  </p>
                  <button
                    onClick={() => router.push("/distributor/promotion-progress")}
                    className="mt-4 px-6 py-2.5 rounded-full border border-[#B8973A] text-[#B8973A] text-xs font-bold"
                  >
                    查看升级条件
                  </button>
                </div>
              )}
            </div>
          ) : (
            // 他人打开：接受定向邀约卡
            <div className="mt-7 bg-white rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <UserPlus size={17} className="text-[#B8973A]" />
                <h3 className="text-base font-bold text-[#1A1208]">接受定向邀约</h3>
              </div>
              <div className="bg-[#FBF5E6] rounded-xl px-4 py-3 flex items-start gap-2 mb-4">
                <AlertCircle size={14} className="text-[#B8973A] mt-0.5 shrink-0" />
                <p className="text-[11px] text-[#8C7B6B] leading-relaxed">
                  你正在接受 <span className="text-[#1A1208] font-medium">{inviter.name}</span> 的定向邀约。提交申请后将进入审核，通过后正式成为品鉴官。
                </p>
              </div>
              <button
                onClick={() => setSubmitted(true)}
                disabled={submitted}
                className={`w-full text-sm font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-opacity ${
                  submitted ? "bg-[#B8973A]/60 text-[#1A1208]" : "bg-[#B8973A] text-[#1A1208] active:opacity-80"
                }`}
              >
                {submitted ? (
                  <>
                    <Check size={18} /> 申请已提交，等待审核
                  </>
                ) : (
                  "提交加入申请"
                )}
              </button>
              <p className="text-[11px] text-[#A89685] text-center mt-3 leading-relaxed">
                提交即代表同意《问兰用户协议》与《隐私政策》
                <br />
                邀约关系最终以后端审核结果为准
              </p>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function ActivityInvitePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1A1208]" />}>
      <ActivityInviteContent />
    </Suspense>
  );
}
