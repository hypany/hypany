"use client"

import { useEffect, useMemo } from 'react'
import { useMutation } from '@tanstack/react-query'
import { getClientApi } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import type { PageDocument } from '@/lib/page-document'
import { emptyDocument } from '@/lib/page-document'
import { toast } from '@/lib/use-toast'
import { useEditorStore } from '@/lib/store/editor'
import EditorCanvas from './editor-canvas'
import LibraryPanel from './library'
import InspectorPanel from './inspector'
import VersionsPanel from './versions'

export default function EditorApp({
  landingPageId,
  hypothesisId,
  initialDoc,
  previewUrl,
}: {
  landingPageId: string
  hypothesisId: string
  initialDoc: PageDocument | null
  previewUrl: string | null
}) {
  const baseDoc = useMemo(() => initialDoc ?? emptyDocument(), [initialDoc])
  const doc = useEditorStore((s) => s.doc)
  const setDoc = useEditorStore((s) => s.setDoc)
  const zoom = useEditorStore((s) => s.zoom)
  const setZoom = useEditorStore((s) => s.setZoom)
  const breakpoint = useEditorStore((s) => s.breakpoint)
  const setBreakpoint = useEditorStore((s) => s.setBreakpoint)
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
      const wasDirty = useEditorStore.getState().dirty
      if (wasDirty) toast({ title: 'Draft saved', variant: 'success' })
      markSaved()
    },
    onError: () => {
      toast({ title: 'Failed to save draft', variant: 'error' })
    },
  })

  const publishMutation = useMutation({
    mutationFn: async () => {
      return api.v1['landing-pages']
        ['by-id']({ landingPageId })
        ['publish']
        .post()
    },
    onSuccess: () => {
      toast({ title: 'Published', variant: 'success' })
    },
    onError: () => {
      toast({ title: 'Failed to publish', variant: 'error' })
    },
  })

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
    <div className='flex h-[calc(100dvh-8rem)] gap-4'>
      {/* Library */}
      <aside className='hidden w-64 shrink-0 rounded border p-3 dark:border-gray-800 md:block'>
        <LibraryPanel />
      </aside>

      {/* Canvas */}
      <div className='flex min-w-0 flex-1 flex-col rounded border dark:border-gray-800'>
        <div className='flex items-center justify-between border-b p-2 dark:border-gray-800'>
          <div className='text-sm font-medium'>Editor</div>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <Button variant='secondary' onClick={() => setBreakpoint('sm')} aria-pressed={breakpoint==='sm'}>Phone</Button>
              <Button variant='secondary' onClick={() => setBreakpoint('md')} aria-pressed={breakpoint==='md'}>Tablet</Button>
              <Button variant='secondary' onClick={() => setBreakpoint('lg')} aria-pressed={breakpoint==='lg'}>Desktop</Button>
              <Button variant='secondary' onClick={() => setBreakpoint('base')} aria-pressed={breakpoint==='base'}>Full</Button>
            </div>
            <div className='flex items-center gap-1'>
              <Button variant='secondary' onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>-</Button>
              <span className='w-10 text-center text-xs'>{Math.round(zoom*100)}%</span>
              <Button variant='secondary' onClick={() => setZoom(Math.min(2, zoom + 0.1))}>+</Button>
            </div>
            <Button
              variant='secondary'
              onClick={() => previewUrl && window.open(previewUrl, '_blank', 'noopener,noreferrer')}
              disabled={!previewUrl}
            >
              Preview
            </Button>
            <VersionsPanel landingPageId={landingPageId} />
            
            <Button
              variant='secondary'
              onClick={() => { if (useEditorStore.getState().dirty) saveMutation.mutate(); else toast({ title: 'Up to date', variant: 'success' }) }}
              disabled={saveMutation.isPending}
            >
              Save Draft
            </Button>
            <Button onClick={() => publishMutation.mutate()} disabled={publishMutation.isPending}>
              Publish
            </Button>
          </div>
        </div>
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
