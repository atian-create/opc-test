"use client"

import { useEffect, useRef, useState } from "react"

interface Props {
  size?: number
  className?: string
}

// 小助理微信二维码（与 freedom.midao.site 共用 /public/qrcode.jpg）
export function WechatQR({ size = 220, className = "" }: Props) {
  const [imgError, setImgError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) {
      setImgError(true)
    }
  }, [])

  if (imgError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-leaf-50 rounded-lg ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-5xl mb-2">📱</span>
        <span className="text-sm text-ink/60">二维码占位</span>
        <span className="text-[10px] text-ink/40 mt-1">把图保存到</span>
        <span className="text-[10px] text-ink/40 font-mono">/public/qrcode.jpg</span>
      </div>
    )
  }

  return (
    <img
      ref={imgRef}
      src="/qrcode.jpg"
      alt="小助理微信二维码"
      width={size}
      height={size}
      className={`block max-w-full h-auto ${className}`}
      onError={() => setImgError(true)}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth === 0) setImgError(true)
      }}
    />
  )
}
