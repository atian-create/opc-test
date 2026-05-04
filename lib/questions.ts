import { Question } from "./types"

// 16 道测试题
// 维度 A: 创造模式（原创 O / 借鉴 M）
// 维度 B: 执行节奏（完美 P / 出活 S）
// 维度 C: 内驱动力（焦虑 X / 佛系 Z）
// 维度 D: 项目模式（单点 F / 多线 M）
//
// 打分约定：每题正分代表"前者"（O/P/X/F），负分代表"后者"（M/S/Z/M）
// A 维度 > 0 → O，否则 M（以此类推）

export const questions: Question[] = [
  // ===== 维度 A：创造模式 =====
  {
    id: 1,
    dimension: "A",
    text: "想做新内容，你的第一反应是？",
    options: [
      { text: "翻自己的灵感笔记，从生活里找原创角度", dimension: "A", score: 2 },
      { text: "复盘自己以前做过什么，找延伸方向", dimension: "A", score: 1 },
      { text: "刷小红书爆款，看现在流行什么", dimension: "A", score: -1 },
      { text: "直接翻爆款合集，找一篇直接模仿", dimension: "A", score: -2 },
    ],
  },
  {
    id: 2,
    dimension: "A",
    text: "看到别人爆款的瞬间，你内心的 OS：",
    options: [
      { text: "「这个角度好，但我会用完全不同的方式做」", dimension: "A", score: 2 },
      { text: "「不错，能给我点启发」", dimension: "A", score: 1 },
      { text: "「我也能做，加点自己的东西就行」", dimension: "A", score: -1 },
      { text: "「完美，今晚就排版抄一下」", dimension: "A", score: -2 },
    ],
  },
  {
    id: 3,
    dimension: "A",
    text: "你制作内容时最常用的工具是？",
    options: [
      { text: "一张白纸 + 一支笔，从 0 开始想", dimension: "A", score: 2 },
      { text: "Notion 模板 + AI 辅助大纲", dimension: "A", score: 1 },
      { text: "收藏夹里的爆款拆解笔记", dimension: "A", score: -1 },
      { text: "别人卖的「爆款 SOP」模板包", dimension: "A", score: -2 },
    ],
  },
  {
    id: 4,
    dimension: "A",
    text: "朋友说「你的内容很有你的味道」，你：",
    options: [
      { text: "那当然，我就是要独一无二", dimension: "A", score: 2 },
      { text: "嗯还行，但我想再独特一些", dimension: "A", score: 1 },
      { text: "啊？其实我参考了 XXX", dimension: "A", score: -1 },
      { text: "谢谢，其实不少是改的爆款模板", dimension: "A", score: -2 },
    ],
  },

  // ===== 维度 B：执行节奏 =====
  {
    id: 5,
    dimension: "B",
    text: "一篇笔记从写完到发出去要多久？",
    options: [
      { text: "3 天起步，要反复改到满意", dimension: "B", score: 2 },
      { text: "1 天，至少打磨 3 遍", dimension: "B", score: 1 },
      { text: "2 小时，看一遍能发就发", dimension: "B", score: -1 },
      { text: "写完直接发，不看回放", dimension: "B", score: -2 },
    ],
  },
  {
    id: 6,
    dimension: "B",
    text: "你的草稿箱里有多少篇没发的内容？",
    options: [
      { text: "50+ 篇，每篇都「差点意思」", dimension: "B", score: 2 },
      { text: "10-30 篇，等灵感再补完", dimension: "B", score: 1 },
      { text: "几篇，准备发了", dimension: "B", score: -1 },
      { text: "零，写完就发", dimension: "B", score: -2 },
    ],
  },
  {
    id: 7,
    dimension: "B",
    text: "Logo / 封面 / 排版你会改几版？",
    options: [
      { text: "改到第 47 版还在改", dimension: "B", score: 2 },
      { text: "5-10 版能定", dimension: "B", score: 1 },
      { text: "2-3 版差不多就行", dimension: "B", score: -1 },
      { text: "一稿过，能用就行", dimension: "B", score: -2 },
    ],
  },
  {
    id: 8,
    dimension: "B",
    text: "别人催你发产品 / 课程时你的反应：",
    options: [
      { text: "「再等等，还没准备好」", dimension: "B", score: 2 },
      { text: "「下个月发，我再优化下」", dimension: "B", score: 1 },
      { text: "「好，下周发」", dimension: "B", score: -1 },
      { text: "「今晚就上，先发再说」", dimension: "B", score: -2 },
    ],
  },

  // ===== 维度 C：内驱动力 =====
  {
    id: 9,
    dimension: "C",
    text: "一条笔记数据扑街，你的第二天：",
    options: [
      { text: "失眠 + 复盘到凌晨，怀疑人生", dimension: "C", score: 2 },
      { text: "难受半天，去看大数据找原因", dimension: "C", score: 1 },
      { text: "哦，那再发一条试试", dimension: "C", score: -1 },
      { text: "流量是缘分，照常过日子", dimension: "C", score: -2 },
    ],
  },
  {
    id: 10,
    dimension: "C",
    text: "你多久看一次数据后台？",
    options: [
      { text: "5 分钟一次，没法工作", dimension: "C", score: 2 },
      { text: "每隔 1-2 小时刷一下", dimension: "C", score: 1 },
      { text: "一天看 1-2 次", dimension: "C", score: -1 },
      { text: "一周看一次，懒得看", dimension: "C", score: -2 },
    ],
  },
  {
    id: 11,
    dimension: "C",
    text: "一周没出新内容，你的感受：",
    options: [
      { text: "焦虑到整夜睡不着", dimension: "C", score: 2 },
      { text: "紧张，要尽快补上", dimension: "C", score: 1 },
      { text: "还行，下周补回来", dimension: "C", score: -1 },
      { text: "状态不好不强迫自己", dimension: "C", score: -2 },
    ],
  },
  {
    id: 12,
    dimension: "C",
    text: "看到同行做得比你好，你的内心：",
    options: [
      { text: "「完了完了我要被超过了」", dimension: "C", score: 2 },
      { text: "「得加油了，不能落后」", dimension: "C", score: 1 },
      { text: "「他厉害，学一下他的方法」", dimension: "C", score: -1 },
      { text: "「他做他的，我做我的」", dimension: "C", score: -2 },
    ],
  },

  // ===== 维度 D：项目模式 =====
  {
    id: 13,
    dimension: "D",
    text: "你目前手上同时在推进的项目数：",
    options: [
      { text: "1 个，all in 这一件事", dimension: "D", score: 2 },
      { text: "2 个，主项目 + 小副业", dimension: "D", score: 1 },
      { text: "3-4 个，每个都在跑", dimension: "D", score: -1 },
      { text: "5+ 个，每个都「快上线了」", dimension: "D", score: -2 },
    ],
  },
  {
    id: 14,
    dimension: "D",
    text: "看到一个新机会（新平台 / 新工具 / 新赛道）：",
    options: [
      { text: "不动，做好手上的事最重要", dimension: "D", score: 2 },
      { text: "观察 3 个月再决定", dimension: "D", score: 1 },
      { text: "抽时间试一下，万一是机会呢", dimension: "D", score: -1 },
      { text: "立刻开账号入坑，先占坑再说", dimension: "D", score: -2 },
    ],
  },
  {
    id: 15,
    dimension: "D",
    text: "你 2026 年的核心目标是？",
    options: [
      { text: "把 1 件事做到极致", dimension: "D", score: 2 },
      { text: "主线做深，副线试 1 个", dimension: "D", score: 1 },
      { text: "同时跑 3 个赛道，看哪个出来", dimension: "D", score: -1 },
      { text: "多平台 + 多产品，全面开花", dimension: "D", score: -2 },
    ],
  },
  {
    id: 16,
    dimension: "D",
    text: "你的人生信条更接近：",
    options: [
      { text: "一生只做一件事", dimension: "D", score: 2 },
      { text: "一年专注一个主目标", dimension: "D", score: 1 },
      { text: "多线作战才有安全感", dimension: "D", score: -1 },
      { text: "不试就没机会，能多就多", dimension: "D", score: -2 },
    ],
  },
]
