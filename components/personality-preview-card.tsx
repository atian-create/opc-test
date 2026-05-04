"use client"

import { useEffect, useRef, useState } from "react"

interface Props {
  code: string
  name: string
  emoji: string
}

// 12 人格预览卡（首页用）
// 期待图片：/public/personalities/{code}.png
export function PersonalityPreviewCard({ code, name, emoji }: Props) {
  const [imgError, setImgError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) {
      setImgError(true)
    }
  }, [])

  return (
    <div className="card-doodle bg-white rounded-2xl overflow-hidden text-center hover:scale-105 transition-transform">
      {/* Image */}
      <div className="aspect-square bg-cream/50 flex items-center justify-center overflow-hidden">
        {imgError ? (
          <span className="text-5xl">{emoji}</span>
        ) : (
          <img
            ref={imgRef}
            src={`/personalities/${code}.png`}
            alt={name}
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
            onLoad={(e) => {
              if (e.currentTarget.naturalWidth === 0) setImgError(true)
            }}
          />
        )}
      </div>
      {/* Name */}
      <div className="py-2 px-2 border-t-2 border-ink/10">
        <div className="text-sm font-bold text-ink truncate">{name}</div>
      </div>
    </div>
  )
}
