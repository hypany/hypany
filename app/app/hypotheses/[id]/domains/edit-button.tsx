'use client'

import { useId, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { getClientApi } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog'
import { toast } from '@/lib/use-toast'
import { validateSlug, normalizeSlug } from '@/lib/slug-validation'

export function DomainEditButton({
  hypothesisId,
  initialSlug,
  initialCustomDomain,
}: {
  hypothesisId: string
  initialSlug: string | null
  initialCustomDomain: string | null
}) {
  const t = useTranslations('app')
  const api = getClientApi()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [slug, setSlug] = useState(initialSlug || '')
  const [customDomain, setCustomDomain] = useState(initialCustomDomain || '')
  const slugId = useId()
  const customDomainId = useId()

  async function save() {
    try {
      setSaving(true)
      const body: Record<string, string | null> = {}
      const trimmedSlug = slug.trim()
      const trimmedDomain = customDomain.trim()
      if (trimmedSlug) {
        const normalized = normalizeSlug(trimmedSlug)
        const validation = validateSlug(normalized)
        if (!validation.valid) {
          toast({ title: 'Invalid subdomain', description: validation.error, variant: 'error' })
          return
        }
        // Check availability before submitting
        const check = await api.v1['landing-pages']['check-slug'].post({
          excludeId: hypothesisId,
          slug: normalized,
        })
        const available = (check.data as any)?.available as boolean | undefined
        if (available === false) {
          const err = (check.data as any)?.error as string | undefined
          toast({ title: 'Subdomain unavailable', description: err || 'This subdomain is already taken', variant: 'error' })
          return
        }
        body.slug = normalized
      }
      body.customDomain = trimmedDomain ? trimmedDomain : ''

      const r = await api.v1['landing-pages']
        .hypothesis({ hypothesisId })
        .patch(body)
      if (r.data?.success) {
        toast({ title: 'Saved', description: 'Domain settings updated.' })
        setOpen(false)
        router.refresh()
      } else {
        const errObj = (r as any)?.error as
          | { error?: string; reason?: string }
          | undefined
        const message = errObj?.reason
          ? `${errObj.error || 'Error'}: ${errObj.reason}`
          : errObj?.error || 'Failed to save domain settings'
        toast({ title: 'Error', description: message, variant: 'error' })
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to save domain settings', variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary'>Edit</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('pages.hypotheses.detail.headings.domain-settings')}</DialogTitle>
        </DialogHeader>
        <div className='grid grid-cols-1 gap-4'>
          <div>
            <label
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              htmlFor={slugId}
            >
              {t('pages.hypotheses.detail.domains.labels.subdomain')}
            </label>
            <Input
              id={slugId}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className='mt-1 py-1.5'
            />
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
              className='mt-1 py-1.5'
            />
            <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
              {t('pages.hypotheses.detail.domains.help.custom-domain')}
            </p>
          </div>
        </div>
        <DialogFooter className='mt-4'>
          <DialogClose asChild>
            <Button variant='secondary' disabled={saving}>Cancel</Button>
          </DialogClose>
          <Button onClick={() => void save()} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
