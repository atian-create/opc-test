import { Question, DimensionScores, PersonaCode, QuizResult, Dimension } from "./types"
import { questions } from "./questions"
import { getPersonality, mergeBoundaryCode } from "./personalities"

// 计算各维度得分
export function calculateScores(answers: Record<number, number>): DimensionScores {
  const scores: DimensionScores = { A: 0, B: 0, C: 0, D: 0 }

  questions.forEach((q) => {
    const answerIndex = answers[q.id]
    if (answerIndex === undefined) return
    const option = q.options[answerIndex]
    if (option) {
      scores[option.dimension] += option.score
    }
  })

  return scores
}

// 根据分数得出 4 字母签名（边界型自动归并到核心人格，对外只暴露 12 种 code）
export function scoresToCode(scores: DimensionScores): PersonaCode {
  const a = scores.A >= 0 ? "O" : "M"
  const b = scores.B >= 0 ? "P" : "S"
  const c = scores.C >= 0 ? "X" : "Z"
  const d = scores.D >= 0 ? "F" : "M"
  const raw = `${a}${b}${c}${d}` as PersonaCode
  return mergeBoundaryCode(raw)
}

// 完整算法：从答案到结果
export function calculateResult(answers: Record<number, number>): QuizResult {
  const scores = calculateScores(answers)
  const code = scoresToCode(scores)
  const personality = getPersonality(code)
  return { scores, code, personality }
}

// 维度强度（绝对值）转百分比，用于雷达图
export function scoreToPercent(score: number): number {
  // 范围 -8 ~ +8，转为 0~100
  return Math.round(((score + 8) / 16) * 100)
}

// 维度名称
export const dimensionNames: Record<Dimension, { positive: string; negative: string; label: string }> = {
  A: { positive: "原创派", negative: "借鉴派", label: "创造模式" },
  B: { positive: "完美主义", negative: "出活优先", label: "执行节奏" },
  C: { positive: "焦虑驱动", negative: "佛系驱动", label: "内驱动力" },
  D: { positive: "单点深耕", negative: "多线并发", label: "项目模式" },
}
