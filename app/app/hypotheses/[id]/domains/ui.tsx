'use client'
import { useState } from 'react'
import { api } from '@/app/api'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { toast } from '@/lib/use-toast'

export default function DomainForm({
  hypothesisId,
  initialSlug,
  initialCustomDomain,
}: {
  hypothesisId: string
  initialSlug: string | null
  initialCustomDomain: string | null
}) {
  const [slug, setSlug] = useState<string>(initialSlug || '')
  const [customDomain, setCustomDomain] = useState<string>(
    initialCustomDomain || '',
  )
  const [checking, setChecking] = useState(false)
  const [saving, setSaving] = useState(false)
  const [availability, setAvailability] = useState<
    null | { ok: boolean; normalized: string; error?: string }
  >(null)

  async function checkSlug() {
    setChecking(true)
    try {
      const res = await api.v1['landing-pages']['check-slug'].post({ slug, excludeId: undefined })
      const d = res.data
      if (!d) return
      setAvailability({ ok: d.available, normalized: d.normalizedSlug, error: d.error })
      if (d.available) {
        toast({ title: 'Subdomain is available', variant: 'success' })
      } else {
        toast({ title: d.error || 'Subdomain unavailable', variant: 'error' })
      }
    } finally {
      setChecking(false)
    }
  }

  async function save() {
    setSaving(true)
    try {
      const body: Record<string, string | null> = {}
      if (slug) body.slug = slug
      body.customDomain = customDomain ? customDomain : ''
      const r = await api.v1['landing-pages']
        .hypothesis({ hypothesisId })
        .patch(body)
      if (r.data?.success) {
        toast({ title: 'Domain settings saved', variant: 'success' })
      } else {
        toast({ title: 'Failed to save domain settings', variant: 'error' })
      }
    } catch {
      toast({ title: 'Failed to save domain settings', variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Subdomain (hypany.app)</label>
        <div className='mt-1 flex gap-2'>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} className='py-1.5' />
          <Button variant='secondary' onClick={checkSlug} disabled={checking}>
            {checking ? 'Checking…' : 'Check'}
          </Button>
        </div>
        {availability && (
          <p className='mt-1 text-xs'>
            {availability.ok ? (
              <span className='text-emerald-600'>Available as {availability.normalized}.hypany.app</span>
            ) : (
              <span className='text-rose-600'>{availability.error || 'Not available'}</span>
            )}
          </p>
        )}
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Custom domain</label>
        <Input
          placeholder='yourdomain.com'
          value={customDomain}
          onChange={(e) => setCustomDomain(e.target.value)}
          className='py-1.5'
        />
        <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>Leave empty to remove custom domain.</p>
      </div>
      <div className='sm:col-span-2'>
        <Button onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}
