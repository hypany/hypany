'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { getClientApi } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import { useSaveStatusStore } from '@/lib/store/save-status'
import { toast } from '@/lib/use-toast'

export function CreateLandingPageButton({
  hypothesisId,
}: {
  hypothesisId: string
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const api = getClientApi()
  const t = useTranslations('app')
  async function create() {
    setLoading(true)
    try {
      const res = await api.v1['landing-pages']
        .hypothesis({ hypothesisId })
        .create.post()
      const id =
        res.data && typeof res.data === 'object' && 'id' in res.data
          ? (res.data as { id: string }).id
          : null
      if (id) {
        toast({
          title: t(
            'pages.hypotheses.detail.landing-pages.toasts.created.title',
          ),
          variant: 'success',
        })
        router.push(`/app/editor/${hypothesisId}/${id}`)
      } else {
        toast({
          title: t(
            'pages.hypotheses.detail.landing-pages.toasts.create-error.title',
          ),
          variant: 'error',
        })
      }
    } catch {
      toast({
        title: t(
          'pages.hypotheses.detail.landing-pages.toasts.create-error.title',
        ),
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button onClick={create} disabled={loading}>
      {loading
        ? t('pages.hypotheses.detail.landing-pages.buttons.creating')
        : t('pages.hypotheses.detail.landing-pages.buttons.new')}
    </Button>
  )
}

export function DuplicateLandingPageButton({
  hypothesisId,
  landingPageId,
}: {
  hypothesisId: string
  landingPageId: string
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const api = getClientApi()
  const t = useTranslations('app')
  async function duplicate() {
    setLoading(true)
    try {
      const res = await api.v1['landing-pages']
        ['by-id']({ landingPageId })
        .duplicate.post()
      const id =
        res.data && typeof res.data === 'object' && 'id' in res.data
          ? (res.data as { id: string }).id
          : null
      if (id) {
        toast({
          title: t(
            'pages.hypotheses.detail.landing-pages.toasts.duplicated.title',
          ),
          variant: 'success',
        })
        router.push(`/app/editor/${hypothesisId}/${id}`)
      } else {
        toast({
          title: t(
            'pages.hypotheses.detail.landing-pages.toasts.duplicate-error.title',
          ),
          variant: 'error',
        })
      }
    } catch {
      toast({
        title: t(
          'pages.hypotheses.detail.landing-pages.toasts.duplicate-error.title',
        ),
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button variant='secondary' onClick={duplicate} disabled={loading}>
      {loading
        ? t('pages.hypotheses.detail.landing-pages.buttons.duplicating')
        : t('pages.hypotheses.detail.landing-pages.buttons.duplicate')}
    </Button>
  )
}

export function RenameLandingPageInline({
  landingPageId,
  initialName,
}: {
  landingPageId: string
  initialName: string | null
}) {
  const [value, setValue] = useState(initialName || '')
  const [saving, setSaving] = useState(false)
  const api = getClientApi()
  const start = useSaveStatusStore((s) => s.start)
  const finish = useSaveStatusStore((s) => s.finish)
  const t = useTranslations('app')
  async function save(next?: string) {
    const name = (next ?? value).trim()
    if (!name || saving) return
    setSaving(true)
    start()
    try {
      await api.v1['landing-pages']['by-id']({ landingPageId }).patch({ name })
      finish(true)
    } catch {
      finish(false)
      toast({
        title: t(
          'pages.hypotheses.detail.landing-pages.toasts.save-name-error.title',
        ),
        variant: 'error',
      })
    } finally {
      setSaving(false)
    }
  }
  return (
    <div className='flex items-center gap-2'>
      <input
        className='w-full rounded-md border px-2 py-1 text-sm outline-hidden dark:border-gray-800'
        placeholder={t(
          'pages.hypotheses.detail.landing-pages.placeholders.name',
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          const nextVal = e.currentTarget.value
          if (nextVal !== (initialName || '')) void save(nextVal)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur()
          }
        }}
      />
    </div>
  )
}

export function SetActiveLandingPageButton({
  hypothesisId,
  landingPageId,
}: {
  hypothesisId: string
  landingPageId: string
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const api = getClientApi()
  const t = useTranslations('app')
  async function setActive() {
    setLoading(true)
    try {
      await api.v1['landing-pages'].hypothesis({ hypothesisId }).active.post({ landingPageId })
      toast({ title: 'Active page updated', variant: 'success' })
      router.refresh()
    } catch {
      toast({ title: 'Failed to set active page', variant: 'error' })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button variant='secondary' onClick={setActive} disabled={loading}>
      {loading ? 'Setting…' : 'Set Active'}
    </Button>
  )
}
