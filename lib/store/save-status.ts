'use client'

import { create } from 'zustand'

type SaveStatusState = {
  savingCount: number
  lastError: string | null
  start: () => void
  finish: (ok: boolean, errMsg?: string) => void
}

export const useSaveStatusStore = create<SaveStatusState>((set) => ({
  finish: (ok, errMsg) =>
    set((s) => ({
      lastError: ok ? null : errMsg || 'Failed to save',
      savingCount: Math.max(0, s.savingCount - 1),
    })),
  lastError: null,
  savingCount: 0,
  start: () => set((s) => ({ savingCount: s.savingCount + 1 })),
}))
