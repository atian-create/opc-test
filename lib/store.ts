"use client"

import { create } from "zustand"

interface QuizStore {
  answers: Record<number, number> // questionId -> optionIndex
  currentQuestion: number
  setAnswer: (questionId: number, optionIndex: number) => void
  nextQuestion: () => void
  prevQuestion: () => void
  reset: () => void
  jumpTo: (index: number) => void
}

export const useQuizStore = create<QuizStore>((set) => ({
  answers: {},
  currentQuestion: 0,
  setAnswer: (questionId, optionIndex) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionIndex },
    })),
  nextQuestion: () => set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
  prevQuestion: () =>
    set((state) => ({ currentQuestion: Math.max(0, state.currentQuestion - 1) })),
  jumpTo: (index) => set({ currentQuestion: index }),
  reset: () => set({ answers: {}, currentQuestion: 0 }),
}))

// utils
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
