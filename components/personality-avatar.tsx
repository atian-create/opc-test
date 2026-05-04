"use client"

import { useEffect, useRef, useState } from "react"

interface Props {
  code: string
  emoji: string
  size?: number
}

// 结果页大头像，优先用切割后的人格图
export function PersonalityAvatar({ code, emoji, size = 240 }: Props) {
  const [imgError, setImgError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) {
      setImgError(true)
    }
  }, [])

  if (imgError) {
    return <span style={{ fontSize: size * 0.4 }}>{emoji}</span>
  }

  return (
    <img
      ref={imgRef}
      src={`/personalities/${code}.png`}
      alt={code}
      style={{ width: size, height: size }}
      className="object-contain"
      onError={() => setImgError(true)}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth === 0) setImgError(true)
      }}
    />
  )
}
