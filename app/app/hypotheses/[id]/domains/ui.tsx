'use client'
import { useId, useState } from 'react'
import React from 'react'
import { useTranslations } from 'next-intl'
import { getClientApi } from '@/app/api/client'
import { Input } from '@/components/atoms/input'
import { toast } from '@/lib/use-toast'
import { useSaveStatusStore } from '@/lib/store/save-status'

export default function DomainForm({
  hypothesisId,
  initialSlug,
  initialCustomDomain,
}: {
  hypothesisId: string
  initialSlug: string | null
  initialCustomDomain: string | null
}) {
  const api = getClientApi()
  const t = useTranslations('app')
  const start = useSaveStatusStore((s) => s.start)
  const finish = useSaveStatusStore((s) => s.finish)
  const [slug, setSlug] = useState<string>(initialSlug || '')
  const [customDomain, setCustomDomain] = useState<string>(
    initialCustomDomain || '',
  )
  const [checking, setChecking] = useState(false)
  const [saving, setSaving] = useState(false)
  const [lastSavedSlug, setLastSavedSlug] = useState<string>(
    (initialSlug || '').trim(),
  )
  const [lastSavedDomain, setLastSavedDomain] = useState<string>(
    (initialCustomDomain || '').trim(),
  )
  const slugId = useId()
  const customDomainId = useId()
  const [availability, setAvailability] = useState<null | {
    ok: boolean
    normalized: string
    error?: string
  }>(null)

  // Debounced auto-check for slug availability (no explicit button)
  React.useEffect(() => {
    const trimmed = slug.trim()
    if (!trimmed || trimmed.length < 3) {
      setAvailability(null)
      setChecking(false)
      return
    }
    // If slug hasn't changed from the initial value, don't show availability banners
    if ((initialSlug || '') === trimmed) {
      setAvailability(null)
      setChecking(false)
      return
    }
    setChecking(true)
    const t = setTimeout(async () => {
      try {
        const res = await api.v1['landing-pages']['check-slug'].post({
          excludeId: hypothesisId,
          slug: trimmed,
        })
        const d = res.data as
          | { available: boolean; normalizedSlug: string; error?: string }
          | undefined
        if (!d) return
        setAvailability({
          error: d.error,
          normalized: d.normalizedSlug,
          ok: d.available,
        })
      } finally {
        setChecking(false)
      }
    }, 500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, initialSlug, hypothesisId])

  async function save() {
    setSaving(true)
    start()
    try {
      const body: Record<string, string | null> = {}
      const trimmedSlug = slug.trim()
      const trimmedDomain = customDomain.trim()
      if (trimmedSlug) body.slug = trimmedSlug
      body.customDomain = trimmedDomain ? trimmedDomain : ''
      const r = await api.v1['landing-pages']
        .hypothesis({ hypothesisId })
        .patch(body)
      if (r.data?.success) {
        finish(true)
        setLastSavedSlug(trimmedSlug)
        setLastSavedDomain(trimmedDomain)
      } else {
        finish(false)
        toast({
          description: t('pages.hypotheses.detail.domains.save.error-desc'),
          title: t('pages.hypotheses.detail.domains.save.error-title'),
          variant: 'error',
        })
      }
    } catch {
      finish(false)
      toast({
        description: t('pages.hypotheses.detail.domains.save.error-desc'),
        title: t('pages.hypotheses.detail.domains.save.error-title'),
        variant: 'error',
      })
    } finally {
      setSaving(false)
    }
  }

  // Debounced autosave for slug and custom domain changes
  React.useEffect(() => {
    const trimmedSlug = slug.trim()
    const trimmedDomain = customDomain.trim()
    const changedSlug = trimmedSlug !== lastSavedSlug
    const changedDomain = trimmedDomain !== lastSavedDomain
    if (!changedSlug && !changedDomain) return
    // Avoid saving an unavailable slug
    if (changedSlug && availability && availability.ok === false) return
    const timer = setTimeout(() => {
      void save()
    }, 800)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, customDomain, availability])

  return (
    <div className='grid grid-cols-1 gap-4'>
      <div>
        <label
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          htmlFor={slugId}
        >
          {t('pages.hypotheses.detail.domains.labels.subdomain')}
        </label>
        <div className='mt-1 flex gap-2'>
          <Input
            id={slugId}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className='py-1.5'
          />
        </div>
        {checking ? (
          <p className='mt-1 text-xs text-gray-500 dark:text-gray-500'>
            {t('pages.hypotheses.detail.domains.checking-availability')}
          </p>
        ) : availability ? (
          <p className='mt-1 text-xs'>
            {availability.ok ? (
              <span className='text-emerald-600'>
                {t('pages.hypotheses.detail.domains.availability.available-desc', { slug: availability.normalized })}
              </span>
            ) : (
              <span className='text-rose-600'>
                {availability.error || t('pages.hypotheses.detail.domains.availability.inline-not-available')}
              </span>
            )}
          </p>
        ) : null}
      </div>
      <div>
        <label
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          htmlFor={customDomainId}
        >
          {t('pages.hypotheses.detail.domains.labels.custom-domain')}
        </label>
        <Input
          id={customDomainId}
          placeholder={t('pages.hypotheses.detail.domains.placeholders.custom-domain')}
          value={customDomain}
          onChange={(e) => setCustomDomain(e.target.value)}
          className='py-1.5'
        />
        <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
          {t('pages.hypotheses.detail.domains.help.custom-domain')}
        </p>
      </div>
      {/* Autosaves; no explicit button */}
    </div>
  )
}
