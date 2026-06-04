import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "云肌 · 轻奢护肤",
  description: "精选轻奢护肤品，焕活肌肤自然光泽。发现属于你的美丽仪式。",
  keywords: "护肤, 轻奢, 精华, 面霜, 护肤品",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FAF7F4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="bg-[#FAF7F4]">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
