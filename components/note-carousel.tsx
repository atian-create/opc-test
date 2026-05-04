"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, ExternalLink } from "lucide-react"
import { xhsNotes, XHSNote, XHS_PROFILE_URL } from "@/lib/notes"

export function NoteCarousel() {
  return (
    <section className="px-4 md:px-6 py-12 bg-gradient-to-b from-cream/40 to-cream/0">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-6 px-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-tian-100 rounded-full text-xs font-bold text-tian-600 mb-2">
              📕 我的小红书爆款
            </div>
            <h2 className="text-2xl md:text-3xl font-black">
              <span className="text-tian-500">跳转</span>看我的视频内容
            </h2>
            <p className="text-sm text-ink/60 mt-1">
              点击任意一条直接跳转小红书
            </p>
          </div>
          <a
            href={XHS_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-sm text-tian-600 hover:text-tian-700 font-bold"
          >
            看更多 →
          </a>
        </div>

        {/* Horizontal scroll carousel */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-2">
            {xhsNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>

          {/* Scroll hint gradients */}
          <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-cream to-transparent pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-cream to-transparent pointer-events-none md:hidden" />
        </div>

        {/* Mobile see more */}
        <div className="md:hidden text-center mt-4">
          <a
            href={XHS_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-tian-600 font-bold"
          >
            👉 在小红书看更多
          </a>
        </div>
      </div>
    </section>
  )
}

function NoteCard({ note }: { note: XHSNote }) {
  const [imgError, setImgError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) {
      setImgError(true)
    }
  }, [])

  return (
    <a
      href={note.url}
      target="_blank"
      rel="noopener noreferrer"
      className="snap-center flex-shrink-0 w-44 md:w-52 group"
    >
      <div className="card-doodle bg-white rounded-2xl overflow-hidden hover:scale-105 transition-transform">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-cream">
          {imgError ? (
            <div
              className={`w-full h-full bg-gradient-to-br ${note.bgColor || "from-tian-200 to-tian-400"} flex items-center justify-center`}
            >
              <div className="text-center px-3">
                <div className="text-6xl mb-2">{note.emoji || "📝"}</div>
                <div className="text-xs text-white/80 font-mono">封面占位</div>
              </div>
            </div>
          ) : (
            <img
              ref={imgRef}
              src={note.cover}
              alt={note.title}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              onLoad={(e) => {
                if (e.currentTarget.naturalWidth === 0) setImgError(true)
              }}
            />
          )}
          {/* Likes badge */}
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur rounded-full flex items-center gap-1 text-white text-xs font-bold">
            <Heart className="w-3 h-3 fill-[#FF2741] text-[#FF2741]" />
            <span>{note.likes}</span>
          </div>
        </div>
        {/* Title */}
        <div className="p-3">
          <p className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-tian-600 transition-colors">
            {note.title}
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-ink/40">
            <span>📕 小红书</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </a>
  )
}
