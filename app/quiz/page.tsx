"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { questions } from "@/lib/questions"
import { useQuizStore, cn } from "@/lib/store"
import { calculateResult } from "@/lib/scoring"
import { IPMascot } from "@/components/ip-mascot"

export default function QuizPage() {
  const router = useRouter()
  const { answers, currentQuestion, setAnswer, nextQuestion, prevQuestion } = useQuizStore()

  const total = questions.length
  const q = questions[currentQuestion]
  const isLast = currentQuestion === total - 1
  const progress = ((currentQuestion + 1) / total) * 100

  const handleSelect = (optionIndex: number) => {
    setAnswer(q.id, optionIndex)
    setTimeout(() => {
      if (isLast) {
        // 计算结果，跳到结果页
        const finalAnswers = { ...useQuizStore.getState().answers, [q.id]: optionIndex }
        const result = calculateResult(finalAnswers)
        router.push(`/result/${result.code}`)
      } else {
        nextQuestion()
      }
    }, 300)
  }

  const dimensionLabel: Record<string, { label: string; color: string }> = {
    A: { label: "创造模式", color: "bg-tian-100 text-tian-700" },
    B: { label: "执行节奏", color: "bg-sakura-100 text-sakura-500" },
    C: { label: "内驱动力", color: "bg-leaf-100 text-leaf-400" },
    D: { label: "项目模式", color: "bg-cream text-ink" },
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Top bar with progress */}
      <header className="px-6 py-4 border-b-2 border-ink/10 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <Link href="/" className="text-sm text-ink/60 hover:text-ink flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              退出
            </Link>
            <div className="text-sm font-bold text-ink/70">
              <span className="text-tian-500">{currentQuestion + 1}</span> / {total}
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-2 bg-ink/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-tian-400 to-sakura-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Question */}
      <section className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Mini mascot watching */}
          <div className="flex justify-center mb-6">
            <IPMascot size={80} />
          </div>

          {/* Dimension tag */}
          <div className="flex justify-center mb-4">
            <span
              className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-medium",
                dimensionLabel[q.dimension].color
              )}
            >
              维度 {q.dimension} · {dimensionLabel[q.dimension].label}
            </span>
          </div>

          {/* Question text —— 固定容器高度（容纳 2 行），让短题/长题切换时下方选项位置不跳 */}
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 leading-tight animate-fade-in flex items-center justify-center min-h-[5rem] md:min-h-[6rem]">
            {q.text}
          </h1>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const selected = answers[q.id] === idx
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    "w-full text-left p-5 rounded-2xl bg-white card-doodle transition-all",
                    "hover:bg-tian-50 hover:translate-x-1",
                    selected && "bg-tian-100 scale-[1.02]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "flex-shrink-0 w-11 h-11 md:w-9 md:h-9 rounded-full border-2 border-ink flex items-center justify-center font-bold md:text-sm",
                        selected && "bg-ink text-white"
                      )}
                    >
                      {["A", "B", "C", "D"][idx]}
                    </span>
                    <span className="text-base font-medium leading-relaxed">{opt.text}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Prev */}
          <div className="mt-8 text-center">
            {currentQuestion > 0 && (
              <button
                onClick={prevQuestion}
                className="text-sm text-ink/50 hover:text-ink"
              >
                ← 上一题
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer hint */}
      <footer className="px-6 py-4 text-center text-xs text-ink/40">
        点击选项自动进入下一题 · 答完自动算结果
      </footer>
    </main>
  )
}
