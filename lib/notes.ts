// 阿甜的爆款笔记数据（Top 6 by likes, threshold ≥1000）
// 由 scripts/fetch-atian-xhs-notes.py 自动生成 — 不要手动改

// 阿甜小红书主页 URL —— 用 web 长链而不是 xhslink 短链。
// 短链（xhslink.com/m/xxx）会过期，2026-04 实测 1dHoS6mBnX3 已 404。
// 长链虽然 App 唤起体验略弱（部分场景仅打开网页版），但 user id 稳定，不过期。
export const XHS_PROFILE_URL = "https://www.xiaohongshu.com/user/profile/5e65e5720000000001004464"

export interface XHSNote {
  id: string
  cover: string // 图片路径
  title: string // 笔记标题
  likes: string // 点赞数（如 "5.2w"）
  url: string // 小红书链接
  emoji?: string // fallback 用的 emoji
  bgColor?: string // fallback 用的背景色
}

export const xhsNotes: XHSNote[] = [
  {
    id: "note-1",
    cover: "/notes/note-1.jpg",
    title: "文科生居然用AI做了自己的app！天啊！",
    likes: "2.7w",
    url: "https://www.xiaohongshu.com/discovery/item/6985a2c1000000000a031060?xsec_token=CBMSenahb2puUIw8Atx2ai3MUu9LAOZmMbx1hYngd4EKQ%3D&xsec_source=pc_user",
    emoji: "🚀",
    bgColor: "from-tian-200 to-tian-400",
  },
  {
    id: "note-2",
    cover: "/notes/note-2.jpg",
    title: "一个人做了 8 个账号，如何用一套系统指挥AI",
    likes: "2.2w",
    url: "https://www.xiaohongshu.com/discovery/item/69aab2a7000000001d0106eb?xsec_token=CBHZmm-b25hTsZVSF3MtlAaBBu7DWoWy5chBl8IcDEzVU%3D&xsec_source=pc_user",
    emoji: "✨",
    bgColor: "from-sakura-200 to-sakura-400",
  },
  {
    id: "note-3",
    cover: "/notes/note-3.jpg",
    title: "如何用AI做复杂的工作流程图？如图所示",
    likes: "1.9w",
    url: "https://www.xiaohongshu.com/discovery/item/6961a8b6000000020a039692?xsec_token=CBr7i6djT9PkfjjWZanYVm4Idf9K878_SWF3FTtQ51Jgs%3D&xsec_source=pc_user",
    emoji: "🤖",
    bgColor: "from-leaf-200 to-leaf-300",
  },
  {
    id: "note-4",
    cover: "/notes/note-4.jpg",
    title: "手把手教大家学会做自己的 Agent Skills‼️",
    likes: "1834",
    url: "https://www.xiaohongshu.com/discovery/item/69be78ba00000000210382cc?xsec_token=CBxEOZjNj5Wzs_IACiefZUc9P89CsEH_mKlrN9_A4_pdo%3D&xsec_source=pc_user",
    emoji: "💎",
    bgColor: "from-tian-100 to-sakura-200",
  },
  {
    id: "note-5",
    cover: "/notes/note-5.jpg",
    title: "啊‼️文科生完全不会代码！vibe了自己的App！",
    likes: "6801",
    url: "https://www.xiaohongshu.com/discovery/item/69cfa2d6000000022302845f?xsec_token=CBCbd0nUnwGT1uh2V1W0dfkjXODNg8Y4KUQeA7lsv-C2g%3D&xsec_source=pc_user",
    emoji: "💰",
    bgColor: "from-sakura-100 to-leaf-200",
  },
  {
    id: "note-6",
    cover: "/notes/note-6.jpg",
    title: "一个人十几个自媒体业务，都有哪些赛道？",
    likes: "4664",
    url: "https://www.xiaohongshu.com/discovery/item/690573b60000000203032734?xsec_token=CBBEW0IyNVzoLuMM22LSaUa_jGHtMbIJ_jdqqBUnVbcYo%3D&xsec_source=pc_user",
    emoji: "📈",
    bgColor: "from-tian-300 to-sakura-300",
  },
]
