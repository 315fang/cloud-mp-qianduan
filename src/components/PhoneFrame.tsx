import BottomNav from "./BottomNav";

type Props = {
  children: React.ReactNode;
  hideNav?: boolean;
};

export default function PhoneFrame({ children, hideNav = false }: Props) {
  return (
    <div className="min-h-screen bg-[#E8DDD0] flex items-start justify-center py-0 md:py-8">
      <div className="relative w-full max-w-[390px] min-h-screen md:min-h-[844px] bg-[#FAF7F4] md:rounded-[44px] md:shadow-2xl overflow-hidden">
        {/* 状态栏：始终可见 */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#FAF7F4]">
          <span className="text-xs font-semibold text-[#1A1208]">9:41</span>
          {/* 动态岛 / 刘海（桌面端模拟） */}
          <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#1A1208] rounded-full" />
          {/* 右侧状态图标 */}
          <div className="flex items-center gap-1.5">
            {/* 信号 */}
            <div className="flex items-end gap-0.5">
              {[3, 5, 7, 9].map((h) => (
                <div
                  key={h}
                  className="w-0.5 bg-[#1A1208] rounded-sm"
                  style={{ height: h }}
                />
              ))}
            </div>
            {/* WiFi */}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M7 8.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" fill="#1A1208"/>
              <path d="M4.5 6.5a3.5 3.5 0 0 1 5 0" stroke="#1A1208" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M2 4a6.5 6.5 0 0 1 10 0" stroke="#1A1208" strokeWidth="1.2" strokeLinecap="round" opacity=".5"/>
            </svg>
            {/* 电池 */}
            <div className="w-5 h-2.5 border border-[#1A1208] rounded-sm relative">
              <div className="absolute inset-[1.5px] right-[3px] bg-[#1A1208] rounded-[1px]" />
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
