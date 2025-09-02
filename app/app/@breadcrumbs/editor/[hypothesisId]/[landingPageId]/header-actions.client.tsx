"use client"

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/atoms/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/atoms/tabs'
import { Monitor, Smartphone } from 'lucide-react'
import { getClientApi } from '@/app/api/client'
import { toast } from '@/lib/use-toast'
import { useEditorStore } from '@/lib/store/editor'
import { useSaveStatusStore } from '@/lib/store/save-status'

export default function EditorHeaderActions({ previewUrl, publishedUrl, landingPageId }: { previewUrl: string | null; publishedUrl?: string | null; landingPageId: string }) {
  const t = useTranslations('app')
  const breakpoint = useEditorStore((s) => s.breakpoint)
  const setBreakpoint = useEditorStore((s) => s.setBreakpoint)
  const zoom = useEditorStore((s) => s.zoom)
  const setZoom = useEditorStore((s) => s.setZoom)
  const doc = useEditorStore((s) => s.doc)
  const markSaved = useEditorStore((s) => s.markSaved)
  const api = getClientApi()
  const start = useSaveStatusStore((s) => s.start)
  const finish = useSaveStatusStore((s) => s.finish)

  const [savingPreview, setSavingPreview] = useState(false)

  async function previewAfterSave() {
    if (!previewUrl) return
    try {
      setSavingPreview(true)
      start()
      await api.v1['landing-pages']
        ['by-id']({ landingPageId })
        ['document']
        .put({ doc: JSON.stringify(doc) })
      markSaved()
      finish(true)
      window.open(previewUrl, '_blank', 'noopener,noreferrer')
    } catch (e) {
      finish(false, t('editor.toasts.save-error'))
      toast({ title: t('editor.toasts.save-error'), variant: 'error' })
    } finally {
      setSavingPreview(false)
    }
  }

  return (
    <div className='ml-auto flex items-center gap-2'>
      {(() => {
        const currentDevice = breakpoint === 'sm' ? 'sm' : 'md'
        return (
          <Tabs
            value={currentDevice}
            onValueChange={(v) => setBreakpoint(v === 'sm' ? 'sm' : 'md')}
          >
            <TabsList variant='solid'>
              <TabsTrigger value='sm' aria-label={t('editor.actions.preview') + ' - Phone'}>
                <Smartphone className='size-4' aria-hidden='true' />
                <span className='sr-only'>Phone</span>
              </TabsTrigger>
              <TabsTrigger value='md' aria-label={t('editor.actions.preview') + ' - Desktop'}>
                <Monitor className='size-4' aria-hidden='true' />
                <span className='sr-only'>Desktop</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
      })()}
      <div className='flex items-center gap-1'>
        <Button variant='secondary' onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>-</Button>
        <span className='w-12 text-center text-xs'>{`${Math.round(zoom*100)}%`}</span>
        <Button variant='secondary' onClick={() => setZoom(Math.min(2, zoom + 0.1))}>+</Button>
      </div>
      <Button
        variant='secondary'
        onClick={previewAfterSave}
        disabled={!previewUrl || savingPreview}
        isLoading={savingPreview}
        loadingText={t('editor.actions.saving')}
      >
        {t('editor.actions.preview')}
      </Button>
      {publishedUrl ? (
        <Button
          variant='secondary'
          onClick={() => window.open(publishedUrl, '_blank', 'noopener,noreferrer')}
        >
          {t('editor.actions.view-published')}
        </Button>
      ) : null}
      <Button
        onClick={async () => {
          try {
            await api.v1['landing-pages']['by-id']({ landingPageId }).publish.post()
            toast({ title: t('editor.toasts.published'), variant: 'success' })
          } catch {
            toast({ title: t('editor.toasts.publish-error'), variant: 'error' })
          }
        }}
      >
        {t('editor.actions.publish')}
      </Button>
    </div>
  )
}
