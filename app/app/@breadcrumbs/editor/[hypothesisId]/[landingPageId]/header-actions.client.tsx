"use client"

import { Button } from '@/components/atoms/button'
import { getClientApi } from '@/app/api/client'
import { toast } from '@/lib/use-toast'
import { useEditorStore } from '@/lib/store/editor'

export default function EditorHeaderActions({ previewUrl, landingPageId }: { previewUrl: string | null; landingPageId: string }) {
  const breakpoint = useEditorStore((s) => s.breakpoint)
  const setBreakpoint = useEditorStore((s) => s.setBreakpoint)
  const zoom = useEditorStore((s) => s.zoom)
  const setZoom = useEditorStore((s) => s.setZoom)
  const api = getClientApi()

  return (
    <div className='ml-auto flex items-center gap-2'>
      <div className='flex items-center gap-1'>
        <Button variant='secondary' onClick={() => setBreakpoint('sm')} aria-pressed={breakpoint==='sm'}>Phone</Button>
        <Button variant='secondary' onClick={() => setBreakpoint('md')} aria-pressed={breakpoint==='md'}>Tablet</Button>
        <Button variant='secondary' onClick={() => setBreakpoint('lg')} aria-pressed={breakpoint==='lg'}>Desktop</Button>
        <Button variant='secondary' onClick={() => setBreakpoint('base')} aria-pressed={breakpoint==='base'}>Full</Button>
      </div>
      <div className='flex items-center gap-1'>
        <Button variant='secondary' onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>-</Button>
        <span className='w-12 text-center text-xs'>{`${Math.round(zoom*100)}%`}</span>
        <Button variant='secondary' onClick={() => setZoom(Math.min(2, zoom + 0.1))}>+</Button>
      </div>
      <Button
        variant='secondary'
        onClick={() => previewUrl && window.open(previewUrl, '_blank', 'noopener,noreferrer')}
        disabled={!previewUrl}
      >
        Preview
      </Button>
      <Button
        onClick={async () => {
          try {
            await api.v1['landing-pages']['by-id']({ landingPageId }).publish.post()
            toast({ title: 'Published', variant: 'success' })
          } catch {
            toast({ title: 'Failed to publish', variant: 'error' })
          }
        }}
      >
        Publish
      </Button>
    </div>
  )
}
