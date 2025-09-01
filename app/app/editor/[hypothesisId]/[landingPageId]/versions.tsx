"use client"

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getClientApi } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog'
import { Input } from '@/components/atoms/input'
import { toast } from '@/lib/use-toast'
import { parseDocument } from '@/lib/page-document'
import { useEditorStore } from '@/lib/store/editor'

export default function VersionsPanel({ landingPageId }: { landingPageId: string }) {
  const api = getClientApi()
  const qc = useQueryClient()
  const setDoc = useEditorStore((s) => s.setDoc)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const versionsQuery = useQuery({
    queryKey: ['versions', landingPageId],
    queryFn: async () => {
      const res = await api.v1['landing-pages']
        ['by-id']({ landingPageId })
        .versions.get()
      const data = res.data as unknown as { versions?: Array<{ id: string; version: number; message: string | null; createdAt: string }> }
      return data?.versions ?? []
    },
    enabled: open,
  })

  const saveVersion = useMutation({
    mutationFn: async () => {
      await api.v1['landing-pages']
        ['by-id']({ landingPageId })
        .versions.post({ message: message || undefined })
    },
    onSuccess: async () => {
      toast({ title: 'Version saved', variant: 'success' })
      setMessage('')
      await qc.invalidateQueries({ queryKey: ['versions', landingPageId] })
    },
    onError: () => {
      toast({ title: 'Failed to save version', variant: 'error' })
    },
  })

  const restoreVersion = useMutation({
    mutationFn: async (version: number) => {
      await api.v1['landing-pages']
        ['by-id']({ landingPageId })
        .restore.post({ version })
      // Fetch updated draft document and hydrate editor
      const docRes = await api.v1['landing-pages']
        ['by-id']({ landingPageId })
        .document.get()
      const data = docRes.data as unknown as { draft?: string | null }
      const doc = parseDocument(data?.draft ?? null)
      if (doc) setDoc(doc)
    },
    onSuccess: async () => {
      toast({ title: 'Draft restored', variant: 'success' })
      setOpen(false)
    },
    onError: () => {
      toast({ title: 'Failed to restore', variant: 'error' })
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary'>Versions</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Versions</DialogTitle>
          <DialogDescription>Save, view, and restore versions of this draft.</DialogDescription>
        </DialogHeader>
        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <Input
              placeholder='Optional message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={() => saveVersion.mutate()} disabled={saveVersion.isPending}>
              Save Version
            </Button>
          </div>
          <div className='max-h-64 overflow-auto rounded border p-2 text-sm dark:border-gray-800'>
            {versionsQuery.isLoading ? (
              <div>Loading…</div>
            ) : versionsQuery.data && versionsQuery.data.length > 0 ? (
              <ul className='space-y-2'>
                {versionsQuery.data.map((v) => (
                  <li key={v.id} className='flex items-center justify-between gap-2'>
                    <div>
                      <div className='font-medium'>v{v.version}</div>
                      <div className='text-xs text-gray-500'>
                        {v.message || '—'} · {new Date(v.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <Button
                      variant='secondary'
                      onClick={() => restoreVersion.mutate(v.version)}
                      disabled={restoreVersion.isPending}
                    >
                      Restore
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='text-xs text-gray-500'>No versions yet.</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

