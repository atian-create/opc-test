"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Sparkles, Share2, RotateCcw, CheckCircle2, AlertTriangle, Target, UserPlus } from "lucide-react"
import { getPersonality } from "@/lib/personalities"
import { dimensionNames } from "@/lib/scoring"
import { useQuizStore, cn } from "@/lib/store"
import { calculateScores } from "@/lib/scoring"
import { IPMascot } from "@/components/ip-mascot"
import { WechatQR } from "@/components/wechat-qr"
import { PersonalityAvatar } from "@/components/personality-avatar"
import { XHS_PROFILE_URL } from "@/lib/notes"

export default function ResultClient({ type }: { type: string }) {
  const personality = getPersonality(type.toUpperCase())
  const matchPersonality = getPersonality(personality.matchPersona)
  const { answers, reset } = useQuizStore()
  const scores = calculateScores(answers)

  // SSG 时 store 不存在，所有访客先按"未做过"渲染（hydration 一致），
  // mount 后再判定。store 不持久化，刷新 = 重新成新访客（已与产品对齐）。
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(true), [])
  const isOwner = hasMounted && Object.keys(answers).length > 0

  return (
    <main className="min-h-screen pb-20">
      {/* Top bar */}
      <header className="px-4 md:px-6 py-3 border-b-2 border-ink/10">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <Link href="/" className="text-base sm:text-lg md:text-xl font-bold whitespace-nowrap">
            🍊 阿甜的一人公司测评
          </Link>
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
        </div>
      </header>

      {/* Hero result */}
      <section className="px-6 py-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Rarity badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ink text-white text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>仅 {personality.rarity}% 的人是这型</span>
          </div>

          {/* Personality avatar (real cartoon) */}
          <div className="flex items-center justify-center mb-4">
            <PersonalityAvatar code={personality.code} emoji={personality.emoji} size={240} />
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-6xl font-black mb-2">
            <span className="text-tian-500">{personality.name}</span>
          </h1>
          <p className="text-lg text-ink/60 italic mb-6">{personality.englishName}</p>

          {/* Tagline */}
          <div className="inline-block px-6 py-3 bg-leaf-100 rounded-2xl card-doodle mb-8">
            <span className="text-lg font-bold">「{personality.tagline}」</span>
          </div>

          {/* Description */}
          <div className="card-doodle bg-white rounded-3xl p-6 md:p-8 text-left max-w-2xl mx-auto">
            <p className="text-base md:text-lg leading-relaxed text-ink/80">
              {personality.description}
            </p>
          </div>
        </div>
      </section>

      {/* Radar / Dimension Scores —— 仅本人（做过 quiz）看到 */}
      {isOwner ? (
        <section className="px-6 py-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>📊</span> 你的 4 维度分布
            </h2>
            <div className="card-doodle bg-white rounded-3xl p-6 space-y-5">
              {(["A", "B", "C", "D"] as const).map((dim) => {
                const score = scores[dim]
                const isPositive = score >= 0
                const absScore = Math.abs(score)
                const percent = Math.round((absScore / 8) * 100)
                const dimInfo = dimensionNames[dim]
                return (
                  <div key={dim}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold">{dimInfo.label}</span>
                      <span
                        className={cn(
                          "text-sm font-bold px-2.5 py-0.5 rounded-full",
                          isPositive
                            ? "bg-tian-100 text-tian-700"
                            : "bg-sakura-100 text-sakura-500"
                        )}
                      >
                        {isPositive ? dimInfo.positive : dimInfo.negative} · {percent}%
                      </span>
                    </div>
                    <div className="relative h-3 bg-ink/5 rounded-full overflow-hidden">
                      <div className="absolute inset-y-0 left-1/2 w-px bg-ink/20" />
                      <div
                        className={cn(
                          "absolute inset-y-0 transition-all duration-700 rounded-full",
                          isPositive ? "right-1/2 bg-tian-400" : "left-1/2 bg-sakura-400"
                        )}
                        style={{ width: `${percent / 2}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5 text-[11px] text-ink/40">
                      <span>← {dimInfo.positive}</span>
                      <span>{dimInfo.negative} →</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : (
        /* 新访客（朋友分享过来 / 直接打开链接） —— 引导去主页测试 */
        <section className="px-6 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="card-doodle bg-gradient-to-br from-tian-50 via-sakura-50 to-leaf-50 rounded-3xl p-6 md:p-8 text-center">
              <div className="text-4xl mb-3">👀</div>
              <h2 className="text-xl md:text-2xl font-black mb-2 leading-tight">
                想看你是哪种<span className="text-tian-500">一人公司型人格</span>？
              </h2>
              <p className="text-base text-ink/70 mb-5 leading-relaxed">
                这是你朋友的画像。<br className="sm:hidden" />
                你可能完全是另一种人 —— 测一次看看？
              </p>
              <Link
                href="/"
                onClick={() => reset()}
                className="btn-doodle inline-flex items-center gap-2 bg-tian-500 hover:bg-tian-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors"
              >
                <span>3 分钟测一次</span>
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Strengths */}
      <section className="px-6 py-6">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
          <div className="card-doodle bg-leaf-50 rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-leaf-400">
              <CheckCircle2 className="w-5 h-5" />
              你的 3 大优势
            </h2>
            <ul className="space-y-3">
              {personality.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-base">
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-doodle bg-sakura-50 rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-sakura-500">
              <AlertTriangle className="w-5 h-5" />
              你的 3 大陷阱
            </h2>
            <ul className="space-y-3">
              {personality.pitfalls.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-base">
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Best fit */}
      <section className="px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="card-doodle bg-tian-50 rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-tian-600">
              <Target className="w-5 h-5" />
              适合你的赛道
            </h2>
            <div className="flex flex-wrap gap-2">
              {personality.bestFit.map((f, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white rounded-full card-doodle text-sm font-medium"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Match persona */}
      <section className="px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="card-doodle bg-white rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-sakura-500" />
              你最佳的搭子是
            </h2>
            <Link
              href={`/result/${matchPersonality.code}`}
              className="block p-5 bg-cream rounded-2xl card-doodle hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-20 h-20">
                  <PersonalityAvatar code={matchPersonality.code} emoji={matchPersonality.emoji} size={80} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-bold">{matchPersonality.name}</div>
                  <div className="text-sm text-ink/60 italic">「{matchPersonality.tagline}」</div>
                </div>
                <span className="text-tian-500 text-2xl">→</span>
              </div>
            </Link>
            <p className="mt-3 text-sm text-ink/60">
              💡 把这个测试发给你怀疑是 {matchPersonality.name} 的朋友，看看他是不是。
            </p>
          </div>
        </div>
      </section>

      {/* CTA: WeChat QR */}
      <section className="px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="card-doodle bg-gradient-to-br from-tian-100 via-sakura-50 to-leaf-50 rounded-3xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* Left: Text */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/70 rounded-full text-xs font-bold text-tian-600 mb-3">
                  🎁 测试结果不止这些
                </div>
                <h2 className="text-2xl md:text-3xl font-black mb-3 leading-tight">
                  想知道你的型人格
                  <br />
                  <span className="text-tian-500">具体怎么破局</span>？
                </h2>
                <p className="text-base text-ink/70 mb-4 leading-relaxed">
                  扫码加小助理微信，免费送你 ——
                </p>
                <ul className="text-sm space-y-1.5 mb-4">
                  <li className="flex items-start gap-2">
                    <span>✨</span>
                    <span><strong>专属人格行动手册</strong>（30 天破局方案）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🤝</span>
                    <span>一人公司 / 自由职业的<strong>完整变现路径</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>📚</span>
                    <span>我做一人公司 2 年的<strong>真实复盘资料</strong></span>
                  </li>
                </ul>
                <p className="text-xs text-ink/50">
                  备注「测评 + 你的型人格」，秒通过
                </p>
              </div>

              {/* Right: QR Code */}
              <div className="flex flex-col items-center">
                <div className="card-doodle bg-white rounded-2xl p-4">
                  <WechatQR size={220} />
                </div>
                <p className="mt-3 text-sm font-bold text-ink/70">微信号：t77296403</p>
                <p className="text-xs text-ink/50">长按识别二维码 · 备注「测评 + 你的型人格」</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share + reset —— 新访客只看 reset（share 错位：分享别人的人格无意义） */}
      <section className="px-6 py-6">
        <div className={cn("max-w-3xl mx-auto grid gap-4", isOwner && "md:grid-cols-2")}>
          {isOwner && (
            <Link
              href={`/share/${personality.code}`}
              className="card-doodle bg-ink text-white rounded-2xl p-5 flex items-center gap-3 hover:bg-ink/90 transition-colors"
            >
              <Share2 className="w-6 h-6" />
              <div>
                <div className="font-bold">让朋友看看你眼中的我</div>
                <div className="text-xs opacity-70">关系链激活：朋友测我=回流粉丝</div>
              </div>
            </Link>
          )}
          <Link
            href="/"
            onClick={() => reset()}
            className="card-doodle bg-white rounded-2xl p-5 flex items-center gap-3 hover:bg-cream transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
            <div>
              <div className="font-bold">{isOwner ? "重新测一次" : "我也来测一次"}</div>
              <div className="text-xs text-ink/60">
                {isOwner ? "看看不同选择会变成谁" : "看看你是哪种一人公司型人格"}
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-xs text-ink/40">
        Made with 🍊 by 阿甜 · 一人公司型人格测评 v1.0
      </footer>
    </main>
  )
}
