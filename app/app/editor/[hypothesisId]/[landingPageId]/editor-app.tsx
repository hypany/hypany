"use client"

import { useEffect, useMemo } from 'react'
import { useMutation } from '@tanstack/react-query'
import { getClientApi } from '@/app/api/client'
import type { PageDocument } from '@/lib/page-document'
import { emptyDocument } from '@/lib/page-document'
import { toast } from '@/lib/use-toast'
import { useEditorStore } from '@/lib/store/editor'
import EditorCanvas from './editor-canvas'
import LibraryPanel from './library'
import InspectorPanel from './inspector'

export default function EditorApp({
  landingPageId,
  hypothesisId,
  initialDoc,
  previewUrl: _previewUrl,
}: {
  landingPageId: string
  hypothesisId: string
  initialDoc: PageDocument | null
  previewUrl: string | null
}) {
  const baseDoc = useMemo(() => initialDoc ?? emptyDocument(), [initialDoc])
  const doc = useEditorStore((s) => s.doc)
  const setDoc = useEditorStore((s) => s.setDoc)
  // Controls moved to header
  const dirty = useEditorStore((s) => s.dirty)
  const markSaved = useEditorStore((s) => s.markSaved)

  const api = getClientApi()

  const saveMutation = useMutation({
    mutationFn: async () => {
      return api.v1['landing-pages']
        ['by-id']({ landingPageId })
        ['document']
        .put({ doc: JSON.stringify(doc) })
    },
    onSuccess: () => {
      // Silent success; only mark clean
      markSaved()
    },
    onError: () => {
      toast({ title: 'Failed to save draft', variant: 'error' })
    },
  })

  // Publish handled elsewhere (header actions or dedicated button)

  // Initialize store doc on mount
  useEffect(() => {
    setDoc(baseDoc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Autosave on doc changes (debounced)
  useEffect(() => {
    if (!dirty) return
    const id = setTimeout(() => {
      if (!saveMutation.isPending) saveMutation.mutate()
    }, 800)
    return () => clearTimeout(id)
  }, [doc, dirty])

  // Keyboard shortcuts: delete, duplicate, save, escape
  useEffect(() => {
    function isTypingTarget(el: EventTarget | null): boolean {
      if (!el || !(el as Element).closest) return false
      const elem = el as Element
      if (elem.closest('input, textarea, [contenteditable="true"]')) return true
      const role = elem.getAttribute && elem.getAttribute('role')
      return role === 'textbox'
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return
      const meta = e.ctrlKey || e.metaKey
      if (meta && e.key.toLowerCase() === 's') {
        e.preventDefault()
        if (!saveMutation.isPending) saveMutation.mutate()
        return
      }
      const selectedId = useEditorStore.getState().selectedId
      if (!selectedId) return
      if (meta && e.key.toLowerCase() === 'd') {
        e.preventDefault()
        useEditorStore.getState().duplicateNode(selectedId)
        return
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        useEditorStore.getState().removeNode(selectedId)
        return
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        useEditorStore.getState().select(null)
        return
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [saveMutation])

  return (
    <div className='flex min-h-[calc(100dvh-4rem)] gap-4'>
      {/* Library */}
      <aside className='hidden w-64 shrink-0 rounded border p-3 dark:border-gray-800 md:block'>
        <LibraryPanel />
      </aside>

      {/* Canvas */}
      <div className='flex min-w-0 flex-1 flex-col rounded border dark:border-gray-800'>
        <EditorCanvas />
      </div>

      {/* Inspector */}
      <aside className='hidden w-80 shrink-0 rounded border p-3 dark:border-gray-800 lg:block'>
        <div className='mb-2 text-sm font-semibold'>Inspector</div>
        <InspectorPanel hypothesisId={hypothesisId} />
      </aside>
    </div>
  )
}
