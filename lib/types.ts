// 测评类型定义

export type DimA = "O" | "M" // 创造模式：原创 / 借鉴
export type DimB = "P" | "S" // 执行节奏：完美 / 出活
export type DimC = "X" | "Z" // 内驱动力：焦虑 / 佛系
export type DimD = "F" | "M" // 项目模式：单点 / 多线

// 4 字母签名（如 OPXF）
export type PersonaCode = string

export type Dimension = "A" | "B" | "C" | "D"

export interface QuestionOption {
  text: string
  dimension: Dimension
  score: number // -2, -1, +1, +2
}

export interface Question {
  id: number
  dimension: Dimension
  text: string
  options: QuestionOption[]
}

export interface DimensionScores {
  A: number
  B: number
  C: number
  D: number
}

export interface Personality {
  code: PersonaCode
  name: string
  englishName: string
  emoji: string
  tagline: string
  description: string
  strengths: string[]
  pitfalls: string[]
  bestFit: string[]
  matchPersona: PersonaCode // 互补搭子
  rarity: number // 占比百分比，假数据用
  color: string // 主色调
  bgGradient: string // 背景渐变
}

export interface QuizResult {
  scores: DimensionScores
  code: PersonaCode
  personality: Personality
}
