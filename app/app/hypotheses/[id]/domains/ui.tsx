'use client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useId, useState } from 'react'
import { getClientApi } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog'
import { Input } from '@/components/atoms/input'
import { normalizeSlug, validateSlug } from '@/lib/slug-validation'
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
  const api = getClientApi()
  const t = useTranslations('app')
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState<string>(initialSlug || '')
  const [customDomain, setCustomDomain] = useState<string>(
    initialCustomDomain || '',
  )
  const [saving, setSaving] = useState(false)

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
          toast({
            description: validation.error,
            title: 'Invalid subdomain',
            variant: 'error',
          })
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
          toast({
            description: err || 'This subdomain is already taken',
            title: 'Subdomain unavailable',
            variant: 'error',
          })
          return
        }
        body.slug = normalized
      }
      body.customDomain = trimmedDomain ? trimmedDomain : ''

      const r = await api.v1['landing-pages']
        .hypothesis({ hypothesisId })
        .patch(body)
      if (r.data?.success) {
        toast({
          description: 'Domain settings updated.',
          title: 'Saved',
        })
        setOpen(false)
        router.refresh()
      } else {
        const errObj = (r as any)?.error as
          | { error?: string; reason?: string }
          | undefined
        const message = errObj?.reason
          ? `${errObj.error || 'Error'}: ${errObj.reason}`
          : errObj?.error || 'Failed to save domain settings'
        toast({ description: message, title: 'Error', variant: 'error' })
      }
    } catch {
      toast({
        description: 'Failed to save domain settings',
        title: 'Error',
        variant: 'error',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='flex items-start justify-between gap-3'>
      <div className='grid grid-cols-1 gap-2'>
        <div>
          <div className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            {t('pages.hypotheses.detail.domains.labels.subdomain')}
          </div>
          <div className='mt-0.5 text-sm text-gray-900 dark:text-gray-50'>
            {initialSlug || '-'}.hypany.app
          </div>
        </div>
        <div>
          <div className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            {t('pages.hypotheses.detail.domains.labels.custom-domain')}
          </div>
          <div className='mt-0.5 text-sm text-gray-900 dark:text-gray-50'>
            {initialCustomDomain || '-'}
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Edit</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>
              {t('pages.hypotheses.detail.headings.domain-settings')}
            </DialogTitle>
          </DialogHeader>
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
                />
              </div>
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
                placeholder={t(
                  'pages.hypotheses.detail.domains.placeholders.custom-domain',
                )}
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
              />
              <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
                {t('pages.hypotheses.detail.domains.help.custom-domain')}
              </p>
            </div>
          </div>
          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button variant='secondary' disabled={saving}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={() => void save()} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
