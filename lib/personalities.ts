import { Personality, PersonaCode } from "./types"

// 12 种一人公司型人格
// 签名编码：4 字母（如 OPXF）
// O/M = 创造模式 | P/S = 执行节奏 | X/Z = 内驱动力 | F/M = 项目模式

export const personalities: Record<PersonaCode, Personality> = {
  OPXF: {
    code: "OPXF",
    name: "完美打磨怪",
    englishName: "The Perfection Polisher",
    emoji: "🛠️",
    tagline: "再让我打磨最后一遍",
    description:
      "你是一人公司圈的「死磕派艺术家」。任何作品到你手里都得抛光、打磨、再抛光。你看不下去 60 分的产品，宁可不发也不发不完美的。但你最大的敌人不是别人，而是「永远没有最完美」。",
    strengths: [
      "✨ 作品质量极高，自带辨识度",
      "🎯 用户口碑极强，转化率高",
      "🏗️ 做的是能放 5 年的内容",
    ],
    pitfalls: [
      "⏰ 永远在「快上线了」却永远没上线",
      "💸 错失大量市场窗口期",
      "😰 自我消耗大，容易 burnout",
    ],
    bestFit: ["精品课程", "高客单服务", "作品集型 IP", "深度长视频"],
    matchPersona: "OSXM", // All in 永动机帮你 ship
    rarity: 8,
    color: "#FF6B4A",
    bgGradient: "from-tian-50 to-tian-100",
  },
  OPXM: {
    code: "OPXM",
    name: "KPI 自虐狂",
    englishName: "The Self-Tormenter",
    emoji: "📊",
    tagline: "我怎么这么没用",
    description:
      "你是创业届的「自我审判大师」。给自己定每周 7 条视频、月入 10 万的 KPI，第三天就崩溃，然后陷入「我怎么这么没用」的精神内耗。其实你已经做得很好了，是你自己对自己太狠。",
    strengths: [
      "⚡ 执行力强，目标感清晰",
      "📈 数据敏感，迭代快",
      "🔥 内驱力极强，不需要外部 push",
    ],
    pitfalls: [
      "🪞 自我评价过低，看不到自己的进步",
      "💔 容易 burnout 后躺平",
      "⚠️ 把焦虑当动力，长期会 break",
    ],
    bestFit: ["训练营式产品", "高强度更新型 IP", "陪跑社群"],
    matchPersona: "OSZF", // 佛系无为派让你冷静
    rarity: 12,
    color: "#FF4585",
    bgGradient: "from-sakura-50 to-sakura-100",
  },
  OPZF: {
    code: "OPZF",
    name: "明日复明日",
    englishName: "The Tomorrow Hero",
    emoji: "📅",
    tagline: "今天先休息，明天再卷",
    description:
      "你是「永远的明日之星」。to-do list 永远是同样 5 条，草稿箱里躺着 200 篇没发的笔记。你不是不想做，你只是觉得「明天状态会更好」。但你心里清楚——明天的你也会这么想。",
    strengths: [
      "🧘 心态平稳，不焦虑",
      "💡 灵感储备丰富",
      "🎨 一旦动手，作品质量很高",
    ],
    pitfalls: [
      "⏳ 永远在「准备」，从不在「发布」",
      "🌫️ 容易陷入「囤积型自我感动」",
      "💼 长期不交付 = 没有商业反馈",
    ],
    bestFit: ["低频高质 IP", "作品慢工型创作者", "顾问型一人公司"],
    matchPersona: "OSXM", // All in 永动机帮你 ship
    rarity: 14,
    color: "#A3E635",
    bgGradient: "from-leaf-50 to-leaf-100",
  },
  OPZM: {
    code: "OPZM",
    name: "变现幻想家",
    englishName: "The Monetization Dreamer",
    emoji: "💭",
    tagline: "这个模式太香了",
    description:
      "你是商业模式画图大王。还没开始做就已经算完月入 10 万、年入百万的财务模型。商业模式 PPT 画了 8 版，财务表格 30 张，但实际收入还是 0。你享受的是「设计未来」本身。",
    strengths: [
      "🧠 战略思维强，看得远",
      "📐 商业模型设计能力突出",
      "🌟 善于识别机会窗口",
    ],
    pitfalls: [
      "🪂 永远在画饼，从不落地",
      "📊 用 Excel 替代了真实试错",
      "💰 实际收入和幻想收入差 10 倍",
    ],
    bestFit: ["咨询型一人公司", "商业操盘手", "投资观察家"],
    matchPersona: "OSXF", // 后台焦虑党帮你看真实数据
    rarity: 6,
    color: "#FF6B9D",
    bgGradient: "from-sakura-50 to-tian-50",
  },
  OSXF: {
    code: "OSXF",
    name: "后台焦虑党",
    englishName: "The Analytics Addict",
    emoji: "📱",
    tagline: "为什么这条没爆",
    description:
      "你是数据后台的常住居民。5 分钟刷一次数据，涨 3 个粉激动半天，掉 1 个粉破防一周。算法变了你比平台运营还紧张。你已经做得很好了，但你看不到，因为你只盯着没起来的那条。",
    strengths: [
      "📊 数据敏感度极强",
      "🚀 迭代速度快，知道什么爆什么不爆",
      "🎯 用户洞察精准",
    ],
    pitfalls: [
      "😰 情绪被算法绑架",
      "🔄 容易陷入「短期主义」",
      "🌪️ 焦虑型创作，长期难持续",
    ],
    bestFit: ["流量型 IP", "MCN 化运营", "短视频博主"],
    matchPersona: "OSZF", // 佛系无为派让你 chill
    rarity: 18,
    color: "#FF8B72",
    bgGradient: "from-tian-100 to-sakura-100",
  },
  OSXM: {
    code: "OSXM",
    name: "All in 永动机",
    englishName: "The Eternal All-In",
    emoji: "🚀",
    tagline: "这次我真的 All in 了",
    description:
      "你是「All in 重度患者」。每隔 3 个月会在朋友圈发一次「这次我真的 All in 了」。上次 All in 是 AI 写作，这次是短视频，下次可能是播客。你充满激情，问题是激情持续时间太短。",
    strengths: [
      "🔥 行动力爆表，说做就做",
      "🌊 浪潮感知敏锐，永远在最新赛道",
      "🎢 高能量带动团队和用户",
    ],
    pitfalls: [
      "🔄 切换太快，每个项目都没做透",
      "💔 让早期粉丝困惑「你到底做啥的」",
      "⚡ 透支精力，三月一崩",
    ],
    bestFit: ["跨平台 IP", "AI 早期玩家", "投资性创作者"],
    matchPersona: "OPXF", // 完美打磨怪让你慢下来
    rarity: 10,
    color: "#E5512E",
    bgGradient: "from-tian-100 to-tian-200",
  },
  OSZF: {
    code: "OSZF",
    name: "佛系无为派",
    englishName: "The Zen Founder",
    emoji: "🧘",
    tagline: "随缘，不强求",
    description:
      "你是创业届的得道高僧。半年没更新心如止水，朋友催更你说「一切都是最好的安排」。你不焦虑、不卷、不规划，但奇怪的是，你的内容反而越来越有人看——因为你本身就是稀缺品。",
    strengths: [
      "🌿 心态稳定，长期主义者",
      "💎 内容自带稀缺感",
      "🌊 不被算法绑架，自由度高",
    ],
    pitfalls: [
      "💼 商业化推进慢",
      "🐢 错过快速增长窗口",
      "🌫️ 容易被解读为「不努力」",
    ],
    bestFit: ["生活方式 IP", "深度长内容", "高客单咨询"],
    matchPersona: "OSXF", // 后台焦虑党帮你看市场
    rarity: 7,
    color: "#86C619",
    bgGradient: "from-leaf-50 to-leaf-100",
  },
  OSZM: {
    code: "OSZM",
    name: "变现幻想家",
    englishName: "The Monetization Dreamer",
    emoji: "💭",
    tagline: "这个模式太香了",
    description:
      "（边界型，归并到 OPZM 变现幻想家）",
    strengths: ["🧠 战略思维强", "📐 商业模型设计强", "🌟 善于识别机会"],
    pitfalls: ["🪂 永远在画饼", "📊 用 Excel 替代试错", "💰 收入和幻想差 10 倍"],
    bestFit: ["咨询型一人公司", "商业操盘手"],
    matchPersona: "OSXF",
    rarity: 6,
    color: "#FF6B9D",
    bgGradient: "from-sakura-50 to-tian-50",
  },
  MPXF: {
    code: "MPXF",
    name: "爆款复刻人",
    englishName: "The Viral Cloner",
    emoji: "🔍",
    tagline: "这个我也能写",
    description:
      "你是爆款界的「拆解大王」。看到任何爆款必拆，收藏夹有 200 篇方法论笔记，分类整齐。你执行力极强，会把别人的爆款做出 90 分版本。但你的风格永远在「找」，因为你借鉴的太多了。",
    strengths: [
      "🎯 爆款嗅觉敏锐",
      "⚡ 复刻能力强，速度快",
      "📚 方法论积累深厚",
    ],
    pitfalls: [
      "🪞 个人风格弱，难形成辨识度",
      "🔁 永远在追，难以引领",
      "📉 同质化严重，长期会被淹没",
    ],
    bestFit: ["MCN 操盘手", "矩阵号运营", "短期变现型创作者"],
    matchPersona: "OPXF", // 完美打磨怪给你原创锚点
    rarity: 16,
    color: "#FFB09E",
    bgGradient: "from-tian-100 to-cream",
  },
  MPXM: {
    code: "MPXM",
    name: "爆款复刻人",
    englishName: "The Viral Cloner",
    emoji: "🔍",
    tagline: "这个我也能写",
    description: "（边界型，归并到 MPXF 爆款复刻人）",
    strengths: ["🎯 爆款嗅觉敏锐", "⚡ 复刻能力强", "📚 方法论积累"],
    pitfalls: ["🪞 风格弱", "🔁 永远在追", "📉 同质化"],
    bestFit: ["MCN 操盘手", "矩阵号运营"],
    matchPersona: "OPXF",
    rarity: 16,
    color: "#FFB09E",
    bgGradient: "from-tian-100 to-cream",
  },
  MPZF: {
    code: "MPZF",
    name: "课程囤积癖",
    englishName: "The Course Hoarder",
    emoji: "📚",
    tagline: "学完这个课就开搞",
    description: "（边界型，归并到 MPZM 课程囤积癖）",
    strengths: ["📖 学习意愿强", "🧰 工具/方法论库丰富", "🎓 知识结构完整"],
    pitfalls: ["📦 学了不用", "🚪 永远在「准备好之前」", "💸 课程开销大"],
    bestFit: ["知识型 IP", "教育博主"],
    matchPersona: "OSXM",
    rarity: 13,
    color: "#FFC9DC",
    bgGradient: "from-sakura-50 to-cream",
  },
  MPZM: {
    code: "MPZM",
    name: "课程囤积癖",
    englishName: "The Course Hoarder",
    emoji: "📚",
    tagline: "学完这个课就开搞",
    description:
      "你是知识星球的金牌客户。同时加了 38 个，一个没看完。你看完目录就觉得自己学会了，于是又去买下一个。你的本质问题不是不爱学，是「学习」本身已经替代了「行动」。",
    strengths: [
      "📖 学习意愿和能力都极强",
      "🧰 工具 / 方法论库极其丰富",
      "🎓 知识结构完整，能讲明白",
    ],
    pitfalls: [
      "📦 学了不用，大量沉默成本",
      "🚪 永远停在「准备好之前」",
      "💸 课程开销大，回报低",
    ],
    bestFit: ["知识型 IP", "教育博主", "教练 / 顾问"],
    matchPersona: "OSXM", // All in 永动机帮你停止学，开始做
    rarity: 13,
    color: "#FFC9DC",
    bgGradient: "from-sakura-100 to-cream",
  },
  MSXF: {
    code: "MSXF",
    name: "玄学算法党",
    englishName: "The Algorithm Mystic",
    emoji: "🔮",
    tagline: "今天算法不行",
    description:
      "你是玄学修行者，账号教派的虔诚信徒。发布时间精确到秒，深信「周三下午 3 点最容易爆」「不能在饭点发」。任何笔记不爆都是算法的锅，从不质疑自己的内容。",
    strengths: [
      "🔬 对平台机制研究深",
      "📅 节奏感稳定，发布有规律",
      "🤝 同行人脉广（一起做玄学）",
    ],
    pitfalls: [
      "🌫️ 把不可控因素当核心",
      "🔮 容易陷入伪科学循环",
      "⏰ 错过真正应该优化的内容质量",
    ],
    bestFit: ["流量型博主", "MCN 旗下账号", "矩阵运营"],
    matchPersona: "OPXF", // 完美打磨怪让你回归内容
    rarity: 9,
    color: "#FFA0BE",
    bgGradient: "from-sakura-100 to-cream",
  },
  MSXM: {
    code: "MSXM",
    name: "赛道横跳侠",
    englishName: "The Pivot Master",
    emoji: "🦘",
    tagline: "这个赛道更适合我",
    description:
      "你是赛道届的网红。上周抖音、这周小红书、下周想 YouTube。看到别人做啥就想做啥，半成品文件夹有 80 个。你不是没毅力，你只是「下一个一定行」的信徒。",
    strengths: [
      "🌍 视野开阔，多平台经验丰富",
      "⚡ 适应能力强，新工具上手快",
      "🎲 试错速度快",
    ],
    pitfalls: [
      "🌪️ 没有任何账号能做起来",
      "💼 缺乏深度积累",
      "🪞 个人定位永远模糊",
    ],
    bestFit: ["平台测评型 IP", "工具评测博主", "趋势观察者"],
    matchPersona: "OPXF", // 完美打磨怪让你聚焦
    rarity: 11,
    color: "#FF8B72",
    bgGradient: "from-tian-100 to-sakura-100",
  },
  MSZF: {
    code: "MSZF",
    name: "佛系无为派",
    englishName: "The Zen Founder",
    emoji: "🧘",
    tagline: "随缘，不强求",
    description: "（边界型，归并到 OSZF 佛系无为派）",
    strengths: ["🌿 心态稳", "💎 稀缺感强", "🌊 不被算法绑架"],
    pitfalls: ["💼 商业化慢", "🐢 错过窗口", "🌫️ 易被误读"],
    bestFit: ["生活方式 IP", "深度长内容"],
    matchPersona: "OSXF",
    rarity: 7,
    color: "#86C619",
    bgGradient: "from-leaf-50 to-leaf-100",
  },
  MSZM: {
    code: "MSZM",
    name: "AI 工具狂",
    englishName: "The Tool Hoarder",
    emoji: "🤖",
    tagline: "等 AGI 来我就财富自由",
    description:
      "你是 AI 早期信徒。Claude / GPT / Cursor 全开会员，每个新品 launch day 必试。你画了 14 张 AI 工作流图但一张没真正落地。你坚信 AGI 来了你就能躺赢，但 AGI 来之前你得先有内容。",
    strengths: [
      "🚀 工具栈最先进",
      "🧠 AI 认知超前同行 6 个月",
      "🛠️ 工作流设计能力强",
    ],
    pitfalls: [
      "🛒 工具买齐了，产品 0 个",
      "📐 工作流图比作品多",
      "⏳ 总在等「下一个更好的工具」",
    ],
    bestFit: ["AI 工具评测", "工作流型 IP", "AI 教育博主"],
    matchPersona: "OPXF", // 完美打磨怪让你 ship
    rarity: 10,
    color: "#A3E635",
    bgGradient: "from-leaf-100 to-tian-50",
  },
}

// 边界型人格归并表：4 维 × 2 = 16 种 code，但产品只暴露 12 个核心人格（含切图与完整文案）。
// 这 4 个边界型在分数刚好落到次要象限时产生，统一归并到风格最接近的核心人格。
const BOUNDARY_MERGE: Partial<Record<PersonaCode, PersonaCode>> = {
  OSZM: "OPZM", // → 变现幻想家
  MPXM: "MPXF", // → 爆款复刻人
  MPZF: "MPZM", // → 课程囤积癖
  MSZF: "OSZF", // → 佛系无为派
}

export function mergeBoundaryCode(code: PersonaCode): PersonaCode {
  return BOUNDARY_MERGE[code] ?? code
}

// 获取人格（带边界归并）
export function getPersonality(code: PersonaCode): Personality {
  const merged = mergeBoundaryCode(code)
  return personalities[merged] || personalities["OSXF"]
}

// 获取所有 12 个核心人格
export const corePersonalityCodes: PersonaCode[] = [
  "OPXF",
  "OPXM",
  "OPZF",
  "OPZM",
  "OSXF",
  "OSXM",
  "OSZF",
  "MPXF",
  "MPZM",
  "MSXF",
  "MSXM",
  "MSZM",
]
