import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "你是哪种一人公司型人格？| 阿甜出品",
  description: "16 道题，测出你的一人公司型人格。MBTI 风格的创业者自我认知工具。",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="paper-bg min-h-screen">{children}</body>
    </html>
  )
}
