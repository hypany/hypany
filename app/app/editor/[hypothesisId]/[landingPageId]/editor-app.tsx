"use client"

import { getClientApi } from '@/app/api/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/tabs'
import type { PageDocument } from '@/lib/page-document'
import { emptyDocument } from '@/lib/page-document'
import { useEditorStore } from '@/lib/store/editor'
import { toast } from '@/lib/use-toast'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import EditorCanvas from './editor-canvas'
import InspectorPanel from './inspector'
import LayersPanel from './layers'
import LibraryPanel from './library'

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
  }, [baseDoc, setDoc])

  // Autosave on doc changes (debounced)
  useEffect(() => {
    if (!dirty) return
    const id = setTimeout(() => {
      if (!saveMutation.isPending) saveMutation.mutate()
    }, 800)
    return () => clearTimeout(id)
  }, [dirty, saveMutation.isPending, saveMutation.mutate])

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
      // Undo / Redo
      if (meta && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault()
        useEditorStore.getState().undo()
        return
      }
      if ((meta && e.shiftKey && e.key.toLowerCase() === 'z') || (e.ctrlKey && e.key.toLowerCase() === 'y')) {
        e.preventDefault()
        useEditorStore.getState().redo()
        return
      }
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
      <aside className='hidden w-72 shrink-0 rounded p-2 md:block'>
        <Tabs defaultValue='layers' className='w-full'>
          <TabsList variant='solid' className='w-full'>
            <TabsTrigger className='w-full' value='layers'>Layers</TabsTrigger>
            <TabsTrigger className='w-full' value='library'>Library</TabsTrigger>
          </TabsList>
          <TabsContent value='layers'>
            <LayersPanel />
          </TabsContent>
          <TabsContent value='library'>
            <LibraryPanel />
          </TabsContent>
        </Tabs>
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
