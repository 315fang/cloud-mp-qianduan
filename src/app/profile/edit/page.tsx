"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, ChevronRight, Check, X, Lock, Sparkles } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

type Sheet = "avatar" | "nickname" | "realname" | null;

const avatarOptions = ["问", "兰", "美", "雅", "馨", "悦"];

export default function ProfileEditPage() {
  const router = useRouter();
  const isFirstLogin = true;

  const [avatar, setAvatar] = useState("问");
  const [nickname, setNickname] = useState("");
  const [realname, setRealname] = useState("");
  const [sheet, setSheet] = useState<Sheet>(null);

  const [tempNick, setTempNick] = useState("");
  const [tempReal, setTempReal] = useState("");

  // 首次登录只需完成"半套"：昵称必填即可；真实姓名提货前再补
  const completed = nickname.trim() !== "";
  const fullCompleted = nickname.trim() !== "" && realname.trim() !== "";

  const openNick = () => { setTempNick(nickname); setSheet("nickname"); };
  const openReal = () => { setTempReal(realname); setSheet("realname"); };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#FAF7F4] pb-24">
        <header className="sticky top-0 z-10 flex items-center gap-3 surface-noir px-4 py-3">
          {isFirstLogin ? (
            <span className="flex items-center gap-1.5 -ml-0.5 px-2.5 py-1 rounded-full bg-[#B8973A]/15 border border-[#B8973A]/30">
              <Lock size={12} className="text-[#B8973A]" />
              <span className="text-[11px] font-medium text-[#B8973A]">首次登录 · 不可跳过</span>
            </span>
          ) : (
            <button onClick={() => router.back()} className="flex items-center justify-center w-8 h-8 -ml-1">
              <ArrowLeft size={20} className="text-white" />
            </button>
          )}
          <h1 className="text-base font-bold text-white">{isFirstLogin ? "完善资料" : "编辑资料"}</h1>
        </header>

        {/* 首次登录引导条 */}
        {isFirstLogin && (
          <div className="surface-noir px-5 pb-5 pt-1">
            <div className="flex items-start gap-2 bg-[#B8973A]/15 border border-[#B8973A]/30 rounded-xl p-3">
              <Sparkles size={16} className="text-[#B8973A] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#B8973A]">欢迎加入问兰</p>
                <p className="text-[11px] text-white/60 mt-0.5 leading-relaxed">
                  首次登录只需设置昵称即可开始使用，补全全部资料可领 25 积分。
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 py-5 space-y-3">
          {/* 头像 */}
          <button
            onClick={() => setSheet("avatar")}
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between active:opacity-80"
          >
            <span className="text-sm text-[#1A1208]">头像</span>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#F0E6C8] flex items-center justify-center text-lg font-bold text-[#B8973A]">
                  {avatar}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#B8973A] flex items-center justify-center border-2 border-white">
                  <Camera size={10} className="text-[#1A1208]" />
                </div>
              </div>
              <ChevronRight size={16} className="text-[#C8BAA8]" />
            </div>
          </button>

          {/* 昵称 */}
          <button
            onClick={openNick}
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between active:opacity-80"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-[#1A1208]">昵称</span>
              {isFirstLogin && <Lock size={12} className="text-[#B8973A]" />}
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm ${nickname ? "text-[#1A1208]" : "text-[#C8BAA8]"}`}>
                {nickname || "请填写昵称"}
              </span>
              <ChevronRight size={16} className="text-[#C8BAA8]" />
            </div>
          </button>

          {/* 真实姓名 */}
          <button
            onClick={openReal}
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between active:opacity-80"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-[#1A1208]">真实姓名</span>
              <span className="text-[10px] text-[#B0A18C] bg-[#F5EFE8] px-1.5 py-0.5 rounded-full">选填</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm ${realname ? "text-[#1A1208]" : "text-[#C8BAA8]"}`}>
                {realname || "提货前补填即可"}
              </span>
              <ChevronRight size={16} className="text-[#C8BAA8]" />
            </div>
          </button>

          <p className="text-[11px] text-[#A89685] px-1 leading-relaxed">
            真实姓名用于实名核验与提货凭证，提交后不可频繁修改，请确保填写真实有效信息。
          </p>
        </div>

        {/* 底部固定按钮 */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-white border-t border-[#F0E8DC] px-4 py-3">
          {isFirstLogin && !completed && (
            <p className="flex items-center justify-center gap-1 text-[11px] text-[#B8973A] mb-2">
              <Lock size={11} /> 请先设置昵称，完成后即可进入
            </p>
          )}
          {isFirstLogin && completed && !fullCompleted && (
            <p className="flex items-center justify-center gap-1 text-[11px] text-[#8C7B6B] mb-2">
              <Sparkles size={11} className="text-[#B8973A]" /> 补全真实姓名可领 25 积分，也可稍后再填
            </p>
          )}
          <button
            disabled={!completed}
            onClick={() => alert("功能开发中")}
            className={`w-full text-sm font-bold py-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
              completed
                ? "bg-[#B8973A] text-[#1A1208] active:opacity-80"
                : "bg-[#EDE4D6] text-[#B0A18C] border border-dashed border-[#D6C4A0]"
            }`}
          >
            {completed ? (
              fullCompleted ? "完成，开始使用（+25 积分）" : "开始使用"
            ) : (
              <>
                <Lock size={15} /> 请先设置昵称
              </>
            )}
          </button>
        </div>

        {/* 头像选择弹层 */}
        {sheet === "avatar" && (
          <SheetWrap title="选择头像" onClose={() => setSheet(null)}>
            <div className="grid grid-cols-3 gap-3 mb-2">
              {avatarOptions.map((a) => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={`aspect-square rounded-2xl flex items-center justify-center text-2xl font-bold transition-all ${
                    avatar === a
                      ? "bg-[#F0E6C8] text-[#B8973A] ring-2 ring-[#B8973A]"
                      : "bg-[#F5EFE8] text-[#8C7B6B]"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <button className="w-full flex items-center justify-center gap-2 border border-dashed border-[#C8BAA8] text-[#8C7B6B] text-sm py-3 rounded-xl mb-3">
              <Camera size={16} /> 从相册上传
            </button>
            <SheetConfirm onClick={() => setSheet(null)} />
          </SheetWrap>
        )}

        {/* 昵称弹层 */}
        {sheet === "nickname" && (
          <SheetWrap title="修改昵称" onClose={() => setSheet(null)}>
            <input
              autoFocus
              value={tempNick}
              onChange={(e) => setTempNick(e.target.value)}
              maxLength={16}
              placeholder="请输入昵称（最多16字）"
              className="w-full bg-[#F5EFE8] rounded-xl px-4 py-3 text-sm text-[#1A1208] outline-none mb-1"
            />
            <p className="text-[11px] text-[#A89685] text-right mb-3">{tempNick.length}/16</p>
            <SheetConfirm onClick={() => { setNickname(tempNick.trim()); setSheet(null); }} />
          </SheetWrap>
        )}

        {/* 真实姓名弹层 */}
        {sheet === "realname" && (
          <SheetWrap title="填写真实姓名" onClose={() => setSheet(null)}>
            <input
              autoFocus
              value={tempReal}
              onChange={(e) => setTempReal(e.target.value)}
              maxLength={20}
              placeholder="请输入身份证上的真实姓名"
              className="w-full bg-[#F5EFE8] rounded-xl px-4 py-3 text-sm text-[#1A1208] outline-none mb-1"
            />
            <p className="text-[11px] text-[#A89685] mb-3">姓名将用于实名核验，请确保真实有效。</p>
            <SheetConfirm onClick={() => { setRealname(tempReal.trim()); setSheet(null); }} />
          </SheetWrap>
        )}
      </div>
    </PhoneFrame>
  );
}

function SheetWrap({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 max-w-[420px] mx-auto">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5 pb-7">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#1A1208]">{title}</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F5EFE8]">
            <X size={15} className="text-[#8C7B6B]" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function SheetConfirm({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#B8973A] text-[#1A1208] text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:opacity-80"
    >
      <Check size={16} /> 确定
    </button>
  );
}
