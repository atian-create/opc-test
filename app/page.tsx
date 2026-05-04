"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Sparkles, Clock, Users, Award } from "lucide-react"
import { IPMascot } from "@/components/ip-mascot"
import { NoteCarousel } from "@/components/note-carousel"
import { PersonalityPreviewCard } from "@/components/personality-preview-card"
import { useQuizStore } from "@/lib/store"
import { XHS_PROFILE_URL } from "@/lib/notes"

export default function HomePage() {
  const reset = useQuizStore((s) => s.reset)
  const [counter, setCounter] = useState(0)

  // 假数据：已测试人数（从 12345 开始随机增长）
  useEffect(() => {
    setCounter(12345 + Math.floor(Math.random() * 100))
    const t = setInterval(() => setCounter((c) => c + 1), 8000)
    return () => clearInterval(t)
  }, [])

  return (
    <main className="min-h-screen flex flex-col">
      {/* Top brand bar — 品牌一体化文案左 + 小红书 CTA 右 */}
      <header className="border-b-2 border-ink/10 px-4 md:px-6 py-3 flex items-center justify-between gap-3">
        <span className="text-base sm:text-lg md:text-xl font-bold whitespace-nowrap">
          🍊 阿甜的一人公司测评
        </span>
        <a
          href={XHS_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-doodle inline-flex items-center gap-1.5 bg-[#FF2741] hover:bg-[#E61C36] text-white px-3 md:px-5 py-2 md:py-2.5 rounded-full font-bold text-xs sm:text-sm md:text-base transition-colors group flex-shrink-0"
        >
          <span className="text-base">📕</span>
          <span>小红书</span>
          <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 bg-white/25 rounded-full text-xs">
            <span>10w+</span>
            <span>粉丝</span>
          </span>
          <span className="text-sm group-hover:translate-x-0.5 transition-transform">→</span>
        </a>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center max-w-3xl mx-auto">
        {/* Mascot */}
        <div className="mb-6 animate-bounce-slow">
          <IPMascot size={180} />
        </div>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sakura-100 text-sakura-500 text-sm font-medium mb-6 card-doodle">
          <Sparkles className="w-4 h-4" />
          <span>16 道题 · 12 种型人格 · 一次测出</span>
        </div>

        {/* H1 —— 2 行节奏：第 1 行"你是哪种"，第 2 行"一人公司型人格？"
              （"一人公司"绿色高亮）。text-4xl 在 ≥360px 屏能一行放下第 2 行。 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
          你是哪种
          <br />
          <span className="relative inline-block">
            <span className="relative z-10 text-tian-500">一人公司</span>
            <span className="absolute bottom-1 left-0 right-0 h-3 bg-leaf-300/60 -z-0" />
          </span>
          型人格？
        </h1>

        {/* Subhead */}
        <p className="text-lg text-ink/70 mb-2 max-w-xl">
          16 道扎心的题，看清你做一人公司的真实模样。
        </p>
        <p className="text-sm text-ink/50 mb-8">
          完美打磨怪？AI 工具狂？还是 All in 永动机？
        </p>

        {/* CTA */}
        <Link
          href="/quiz"
          onClick={() => reset()}
          className="btn-doodle inline-flex items-center gap-3 px-10 py-5 bg-tian-500 text-white text-xl font-bold rounded-2xl hover:bg-tian-600 transition-colors mb-8"
        >
          <span>开始测试</span>
          <span className="text-2xl">→</span>
        </Link>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ink/60">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span className="money">{counter.toLocaleString()}</span>
            <span>人已测过</span>
          </div>
          <div className="w-px h-4 bg-ink/20" />
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>用时 3 分钟</span>
          </div>
          <div className="w-px h-4 bg-ink/20" />
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>免费</span>
          </div>
        </div>
      </section>

      {/* Xiaohongshu screenshot carousel — credibility */}
      <NoteCarousel />

      {/* Personality preview grid */}
      <section className="px-6 py-12 bg-cream/50 border-t-2 border-ink/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">12 种型人格抢先看</h2>
          <p className="text-center text-ink/60 mb-8 text-sm">
            你会成为哪一个？
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {previewPersonalities.map((p) => (
              <PersonalityPreviewCard key={p.code} code={p.code} name={p.name} emoji={p.emoji} />
            ))}
          </div>
        </div>
      </section>

      {/* Why this test */}
      <section className="px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">为什么要测这个？</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card-doodle bg-white rounded-2xl p-5">
              <div className="text-3xl mb-2">🪞</div>
              <h3 className="font-bold mb-1">看清自己</h3>
              <p className="text-sm text-ink/70">你以为的你，和真实的你，往往差很远。</p>
            </div>
            <div className="card-doodle bg-sakura-50 rounded-2xl p-5">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold mb-1">找到陷阱</h3>
              <p className="text-sm text-ink/70">每种型人格都有「死循环」，提前规避。</p>
            </div>
            <div className="card-doodle bg-leaf-50 rounded-2xl p-5">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-bold mb-1">找到搭子</h3>
              <p className="text-sm text-ink/70">每种型人格都有「最佳互补型」。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA repeat */}
      <section className="px-6 py-12 text-center">
        <Link
          href="/quiz"
          onClick={() => reset()}
          className="btn-doodle inline-flex items-center gap-3 px-10 py-5 bg-ink text-white text-xl font-bold rounded-2xl hover:bg-ink/90 transition-colors"
        >
          <span>来吧，3 分钟看清自己</span>
          <span className="text-2xl">→</span>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-ink/10 px-6 py-6 text-center text-xs text-ink/50">
        Made with 🍊 by 阿甜 · 一人公司型人格测评 v1.0
      </footer>
    </main>
  )
}

const previewPersonalities = [
  { code: "OPXF", name: "完美打磨怪", emoji: "🛠️" },
  { code: "OPXM", name: "KPI 自虐狂", emoji: "📊" },
  { code: "OPZF", name: "明日复明日", emoji: "📅" },
  { code: "OPZM", name: "变现幻想家", emoji: "💭" },
  { code: "OSXF", name: "后台焦虑党", emoji: "📱" },
  { code: "OSXM", name: "All in 永动机", emoji: "🚀" },
  { code: "OSZF", name: "佛系无为派", emoji: "🧘" },
  { code: "MPXF", name: "爆款复刻人", emoji: "🔍" },
  { code: "MPZM", name: "课程囤积癖", emoji: "📚" },
  { code: "MSXF", name: "玄学算法党", emoji: "🔮" },
  { code: "MSXM", name: "赛道横跳侠", emoji: "🦘" },
  { code: "MSZM", name: "AI 工具狂", emoji: "🤖" },
]
