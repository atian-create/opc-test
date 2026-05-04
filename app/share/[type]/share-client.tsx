"use client"

import Link from "next/link"
import { getPersonality } from "@/lib/personalities"
import { IPMascot } from "@/components/ip-mascot"
import { PersonalityAvatar } from "@/components/personality-avatar"
import { XHS_PROFILE_URL } from "@/lib/notes"
import { Share2, Copy, Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// clipboard 状态：'idle' 待复制 | 'success' 复制成功 | 'manual' 自动复制失败需手动
type CopyStatus = "idle" | "success" | "manual"

type PillOverlay = {
  color: string
  fontFamily: string
  fontSize: number
  fontStyle: string
  fontWeight: string
  height: number
  left: number
  text: string
  top: number
  width: number
}

export default function ShareClient({ type }: { type: string }) {
  const personality = getPersonality(type.toUpperCase())
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle")
  const [pageUrl, setPageUrl] = useState("")
  const cardRef = useRef<HTMLDivElement>(null)
  const [shareImg, setShareImg] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    setPageUrl(window.location.origin + `/result/${personality.code}`)
  }, [personality.code])

  // 生成分享图：桌面直接下载，移动端塞回页面让用户长按保存。
  // iOS Safari/微信 X5 经常忽略 <a download>，必须分两条路径。
  const generateShareImage = async () => {
    if (!cardRef.current || generating) return
    setGenerating(true)
    setShareImg(null)
    try {
      // 防竞态：等卡片内所有 <img> 加载完，否则首次点击会拍到空图（PersonalityAvatar 是异步加载）
      const imgs = Array.from(cardRef.current.querySelectorAll("img"))
      await Promise.all(
        imgs.map((img) =>
          img.complete && img.naturalWidth > 0
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                const done = () => resolve()
                img.addEventListener("load", done, { once: true })
                img.addEventListener("error", done, { once: true })
              })
        )
      )

      const cardRect = cardRef.current.getBoundingClientRect()
      const pillOverlays: PillOverlay[] = Array.from(cardRef.current.querySelectorAll<HTMLElement>("[data-pill]")).flatMap((pill) => {
        const label = pill.querySelector<HTMLElement>("[data-pill-label]")
        const text = label?.textContent?.trim() ?? pill.textContent?.trim() ?? ""
        if (!text) return []

        const rect = pill.getBoundingClientRect()
        const styles = getComputedStyle(label ?? pill)
        return [{
          color: styles.color,
          fontFamily: styles.fontFamily,
          fontSize: Number.parseFloat(styles.fontSize) || 12,
          fontStyle: styles.fontStyle || "normal",
          fontWeight: styles.fontWeight || "400",
          height: rect.height,
          left: rect.left - cardRect.left,
          text,
          top: rect.top - cardRect.top,
          width: rect.width,
        }]
      })

      const html2canvas = (await import("html2canvas")).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#FFF8F1", // cream，避免透明背景在某些 viewer 里变黑
        scale: 2,
        useCORS: true,
        logging: false,
        onclone: (doc) => {
          // html2canvas 1.4.1 已识别 inline-flex，但 Safari/CJK 文本仍会在 canvas
          // 基线计算里偏下；截图时先把 pill 文本藏掉，稍后在最终 canvas 上手动居中重绘。
          doc.querySelectorAll<HTMLElement>("[data-pill-label]").forEach((label) => {
            label.style.color = "transparent"
            label.style.textShadow = "none"
          })
        },
      })

      const ctx = canvas.getContext("2d")
      if (ctx && pillOverlays.length > 0 && cardRect.width > 0) {
        const renderScale = canvas.width / cardRect.width
        ctx.save()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        pillOverlays.forEach((pill) => {
          ctx.fillStyle = pill.color
          ctx.font = `${pill.fontStyle} ${pill.fontWeight} ${pill.fontSize * renderScale}px ${pill.fontFamily}`
          ctx.fillText(
            pill.text,
            (pill.left + pill.width / 2) * renderScale,
            (pill.top + pill.height / 2) * renderScale
          )
        })

        ctx.restore()
      }

      const dataUrl = canvas.toDataURL("image/png")
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      if (isMobile) {
        setShareImg(dataUrl)
      } else {
        const a = document.createElement("a")
        a.href = dataUrl
        a.download = `${personality.code}-${personality.name}.png`
        a.click()
      }
    } catch (e) {
      console.error("生成分享图失败", e)
      alert("生成失败，请直接截屏卡片代替")
    } finally {
      setGenerating(false)
    }
  }

  // 三层降级：navigator.clipboard → execCommand → 让用户手动长按
  // 微信内嵌 Webview 在多数情况下会 reject 新 Clipboard API，必须 fallback。
  const copyLink = async () => {
    // Layer 1: 现代 API（HTTPS + 白名单域）
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(pageUrl)
        setCopyStatus("success")
        setTimeout(() => setCopyStatus("idle"), 2000)
        return
      } catch {
        // 落到 layer 2
      }
    }

    // Layer 2: 老 execCommand（微信 X5 / 旧 iOS Safari 仍支持）
    const ta = document.createElement("textarea")
    ta.value = pageUrl
    ta.setAttribute("readonly", "")
    ta.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;"
    document.body.appendChild(ta)
    ta.select()
    ta.setSelectionRange(0, pageUrl.length)
    let ok = false
    try {
      ok = document.execCommand("copy")
    } catch {
      ok = false
    }
    document.body.removeChild(ta)

    if (ok) {
      setCopyStatus("success")
      setTimeout(() => setCopyStatus("idle"), 2000)
    } else {
      // Layer 3: 都失败 → 暴露链接让用户手动长按选中
      setCopyStatus("manual")
    }
  }

  return (
    <main className="min-h-screen">
      {/* Top brand bar with Xiaohongshu CTA */}
      <header className="px-4 md:px-6 py-3 border-b-2 border-ink/10 sticky top-0 bg-cream/95 backdrop-blur z-10">
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

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Header */}
        <Link href={`/result/${personality.code}`} className="text-sm text-ink/60 mb-4 inline-block">
          ← 返回结果
        </Link>

        {/* Share card preview */}
        <div
          ref={cardRef}
          className="card-doodle bg-gradient-to-br from-tian-100 via-sakura-50 to-leaf-50 rounded-3xl p-8 mb-6"
        >
          <div className="flex justify-center mb-4">
            <PersonalityAvatar code={personality.code} emoji={personality.emoji} size={160} />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-black mb-2">
              我是 <span className="text-tian-500">{personality.name}</span>
            </h2>
            <p className="text-base text-ink/70 italic mb-4">「{personality.tagline}」</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {personality.bestFit.slice(0, 3).map((f) => (
                <span
                  key={f}
                  data-pill
                  className="inline-flex items-center px-3 py-1.5 bg-white/60 rounded-full text-xs leading-none"
                >
                  <span data-pill-label className="block leading-none">
                    {f}
                  </span>
                </span>
              ))}
            </div>
            <div className="text-xs text-ink/60 pt-4 border-t border-ink/10">
              一人公司型人格测评 · opc.atian.vip
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="space-y-3">
          <button
            onClick={copyLink}
            className="btn-doodle w-full bg-tian-500 text-white p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3"
          >
            {copyStatus === "success" ? "已复制！发给朋友吧 ✨" : (
              <>
                <Copy className="w-5 h-5" />
                复制测试链接
              </>
            )}
          </button>

          {/* manual fallback：自动复制失败时显示，让用户长按选中链接 */}
          {copyStatus === "manual" && (
            <div className="card-doodle bg-sakura-50 rounded-2xl p-4 text-sm">
              <div className="font-bold text-sakura-500 mb-2">⚠️ 微信浏览器拦了一下，请手动复制：</div>
              <input
                readOnly
                value={pageUrl}
                onFocus={(e) => e.currentTarget.select()}
                className="w-full px-3 py-2 bg-white rounded-lg border-2 border-ink/20 text-xs font-mono select-all"
              />
              <div className="text-xs text-ink/60 mt-2">长按上方链接 → 全选 → 复制</div>
            </div>
          )}

          <button
            onClick={generateShareImage}
            disabled={generating}
            className="btn-doodle w-full bg-white p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-60"
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                生成中…
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5" />
                生成分享图（小红书可发）
              </>
            )}
          </button>

          {/* 生成的分享图 —— 移动端长按保存到相册 */}
          {shareImg && (
            <div className="card-doodle bg-white rounded-2xl p-4 text-center">
              <div className="text-sm font-bold text-tian-600 mb-2">
                ✨ 长按图片 → 保存到相册
              </div>
              <img
                src={shareImg}
                alt="分享图"
                className="w-full rounded-xl border-2 border-ink/10"
              />
              <div className="text-xs text-ink/50 mt-2">
                保存后到小红书/朋友圈发图即可
              </div>
            </div>
          )}

          <Link
            href="/"
            className="btn-doodle w-full bg-ink text-white p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 mt-6"
          >
            🔄 让朋友也来测「他是哪种一人公司」
          </Link>
        </div>

        {/* Tips */}
        <div className="mt-8 card-doodle bg-cream rounded-2xl p-5 text-sm text-ink/70">
          <div className="font-bold mb-2">💡 玩法建议</div>
          <ul className="space-y-2">
            <li>• <strong>发小红书</strong>：标题「测了一下，原来我是 {personality.name}…」</li>
            <li>• <strong>发朋友圈</strong>：配上结果图，让朋友猜你是哪个</li>
            <li>• <strong>发给搭子</strong>：让你怀疑是 {personality.name} 的朋友也测一下</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
