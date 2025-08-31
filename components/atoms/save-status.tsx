"use client"

import React from "react"

type SaveStatus = {
  savingCount: number
  lastError: string | null
  start: () => void
  finish: (ok: boolean, errMsg?: string) => void
}

const Ctx = React.createContext<SaveStatus | null>(null)

export function SaveStatusProvider({ children }: { children: React.ReactNode }) {
  const [savingCount, setSavingCount] = React.useState(0)
  const [lastError, setLastError] = React.useState<string | null>(null)

  const start = React.useCallback(() => {
    setSavingCount((c) => c + 1)
  }, [])

  const finish = React.useCallback((ok: boolean, errMsg?: string) => {
    setSavingCount((c) => Math.max(0, c - 1))
    setLastError(ok ? null : errMsg || "Failed to save")
  }, [])

  const value = React.useMemo(
    () => ({ savingCount, lastError, start, finish }),
    [savingCount, lastError, start, finish],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useSaveStatus() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error("useSaveStatus must be used within SaveStatusProvider")
  return ctx
}

export function SaveStatusBadge({ className }: { className?: string }) {
  const { savingCount, lastError } = useSaveStatus()
  const saving = savingCount > 0

  if (saving) {
    return (
      <span
        className={
          "inline-flex items-center gap-1 rounded-sm bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 " +
          (className || "")
        }
        aria-live="polite"
      >
        <svg
          className="size-3 animate-spin"
          viewBox="0 0 24 24"
          aria-hidden
          focusable="false"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        Saving…
      </span>
    )
  }

  if (lastError) {
    return (
      <span className={"inline-flex items-center gap-1 rounded-sm bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-300 " + (className || "")}>
        Error
      </span>
    )
  }

  return (
    <span className={"inline-flex items-center gap-1 rounded-sm bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 " + (className || "")}>
      Synced
    </span>
  )
}

