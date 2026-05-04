"use client"

import { useEffect, useRef, useState } from "react"

interface Props {
  size?: number
  className?: string
  pose?: "wave" | "happy" | "think"
}

// 阿甜 IP 形象
// 期待图片放在 /public/atian-mascot.png
// 如果图片缺失，回退到 emoji 占位（含手绘描边）
export function IPMascot({ size = 120, className = "", pose = "happy" }: Props) {
  const [imgError, setImgError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // 检查 hydration 时是否已加载失败
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) {
      setImgError(true)
    }
  }, [])

  if (imgError) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-sakura-100 border-2 border-ink ${className}`}
        style={{ width: size, height: size, boxShadow: "4px 4px 0 #2D2D2D" }}
      >
        <span style={{ fontSize: size * 0.55 }}>🙋‍♀️</span>
      </div>
    )
  }

  return (
    <img
      ref={imgRef}
      src="/atian-mascot.png"
      alt="阿甜"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      onError={() => setImgError(true)}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth === 0) setImgError(true)
      }}
    />
  )
}
