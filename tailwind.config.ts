import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  // 让 hover: utility 自动 wrap @media (hover: hover)，
  // 触屏设备完全不触发 :hover —— 修 mobile "tap 后 hover 状态粘住直到点别处" 的经典 bug。
  // (Tailwind 官方推荐设置；4.x 默认开启。)
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // 阿甜 IP 配色：主橘 + 樱花粉 + 草绿
        tian: {
          50: "#FFF7F5",
          100: "#FFE8E2",
          200: "#FFD0C4",
          300: "#FFB09E",
          400: "#FF8B72",
          500: "#FF6B4A", // 主色（品牌橘）
          600: "#E5512E",
          700: "#CC3D1A",
        },
        sakura: {
          50: "#FFF5F8",
          100: "#FFE5EE",
          200: "#FFC9DC",
          300: "#FFA0BE",
          400: "#FF6B9D", // 衣服粉
          500: "#FF4585",
        },
        leaf: {
          50: "#F4FCE3",
          100: "#E8F8C4",
          200: "#D4F08B",
          300: "#A3E635", // 眼镜绿
          400: "#86C619",
        },
        cream: "#FFF9F0",
        ink: "#2D2D2D",
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Microsoft YaHei"', "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-slow": "bounceSlow 2s infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        bounceSlow: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        wiggle: { "0%,100%": { transform: "rotate(-3deg)" }, "50%": { transform: "rotate(3deg)" } },
      },
    },
  },
  plugins: [],
}
export default config
