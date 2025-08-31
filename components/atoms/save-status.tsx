"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { useSaveStatusStore } from "@/lib/store/save-status"

export function SaveStatusBadge({ className }: { className?: string }) {
  const savingCount = useSaveStatusStore((s) => s.savingCount)
  const lastError = useSaveStatusStore((s) => s.lastError)
  const pathname = usePathname()
  const onHypothesis = /^\/app\/hypotheses\/[^/]+$/.test(pathname || "")
  if (!onHypothesis) return null

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
        <svg className="size-3 animate-spin" viewBox="0 0 24 24" aria-hidden focusable="false">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
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
