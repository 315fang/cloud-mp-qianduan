import BottomNav from "./BottomNav";

type Props = {
  children: React.ReactNode;
  hideNav?: boolean;
};

export default function PhoneFrame({ children, hideNav = false }: Props) {
  return (
    <div className="min-h-screen bg-[#E8DDD0] flex items-start justify-center py-0 md:py-8">
      <div className="relative w-full max-w-[390px] min-h-screen md:min-h-[844px] bg-[#FAF7F4] md:rounded-[44px] md:shadow-2xl overflow-hidden">
        {/* 状态栏 */}
        <div className="hidden md:flex items-center justify-between px-8 py-3 bg-[#FAF7F4] sticky top-0 z-40">
          <span className="text-xs font-semibold text-[#1A1208]">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2.5 border border-[#1A1208] rounded-sm relative">
              <div className="absolute inset-0.5 right-1 bg-[#1A1208] rounded-sm" />
              <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-[#1A1208] rounded-r-sm" />
            </div>
          </div>
        </div>
        {/* 页面内容 */}
        <main className={hideNav ? "" : "pb-20"}>
          {children}
        </main>
        {/* 底部导航 */}
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}
