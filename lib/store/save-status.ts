"use client"

import { create } from 'zustand'

type SaveStatusState = {
  savingCount: number
  lastError: string | null
  start: () => void
  finish: (ok: boolean, errMsg?: string) => void
}

export const useSaveStatusStore = create<SaveStatusState>((set) => ({
  savingCount: 0,
  lastError: null,
  start: () => set((s) => ({ savingCount: s.savingCount + 1 })),
  finish: (ok, errMsg) =>
    set((s) => ({
      savingCount: Math.max(0, s.savingCount - 1),
      lastError: ok ? null : errMsg || 'Failed to save',
    })),
}))

