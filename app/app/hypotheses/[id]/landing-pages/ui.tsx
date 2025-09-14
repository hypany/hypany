'use client'

import { getClientApi } from '@/app/api/client'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { Card } from '@/components/atoms/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/atoms/dropdown-menu'
import { useSaveStatusStore } from '@/lib/store/save-status'
import { serviceUrl } from '@/lib/url'
import { toast } from '@/lib/use-toast'
import {
  CheckCircle2,
  Clock,
  Copy,
  Edit3,
  ExternalLink,
  FileText,
  Globe,
  Layout,
  MoreVertical,
  Plus,
  Sparkles
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
  onComplete,
}: {
  landingPageId: string
  initialName: string | null
  onComplete?: () => void
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
      onComplete?.()
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
          } else if (e.key === 'Escape') {
            setValue(initialName || '')
            onComplete?.()
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
      <Sparkles className='h-4 w-4 mr-2' />
      {loading ? 'Setting…' : 'Set Active'}
    </Button>
  )
}

export function EmptyStateIllustration() {
  return (
    <div className='relative w-48 h-48 mx-auto'>
      <div className='absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full opacity-50 animate-pulse' />
      <div className='absolute inset-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex items-center justify-center'>
        <Layout className='h-16 w-16 text-gray-400' />
      </div>
      <div className='absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
        <Plus className='h-4 w-4 text-white' />
      </div>
    </div>
  )
}

export function LandingPageCard({
  page,
  hypothesis,
  hypothesisId,
}: {
  page: any
  hypothesis: any
  hypothesisId: string
  t?: any
}) {
  const isActive = hypothesis.activeLandingPageId === page.id
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card className='group relative overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-800'>
      <div className='p-6 space-y-4'>
        {/* Header */}
        <div className='flex items-start justify-between'>
          <div className='flex-1 space-y-1'>
            {isEditing ? (
              <RenameLandingPageInline
                landingPageId={page.id}
                initialName={page.name || null}
                onComplete={() => setIsEditing(false)}
              />
            ) : (
              <h3 className='font-semibold text-gray-900 dark:text-gray-100 truncate'>
                {page.name || 'Untitled Page'}
              </h3>
            )}
          </div>

          {/* Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <MoreVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit3 className='h-4 w-4 mr-2' />
                Edit Name
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/app/editor/${hypothesisId}/${page.id}`} className='flex items-center w-full'>
                  <Edit3 className='h-4 w-4 mr-2' />
                  Open Editor
                </Link>
              </DropdownMenuItem>
              {hypothesis.slug && (
                <DropdownMenuItem>
                  <Link
                    href={hypothesis.customDomain ? `https://${hypothesis.customDomain}` : `https://${hypothesis.slug}.hypany.app`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center w-full'
                  >
                    <ExternalLink className='h-4 w-4 mr-2' />
                    View Live
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DuplicateLandingPageAction
                  hypothesisId={hypothesisId}
                  landingPageId={page.id}
                />
              </DropdownMenuItem>
              {!isActive && (
                <DropdownMenuItem>
                  <SetActiveLandingPageAction
                    hypothesisId={hypothesisId}
                    landingPageId={page.id}
                  />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Status Badges */}
        <div className='flex items-center gap-2'>
          {isActive && (
            <Badge variant='success' className='bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0'>
              <CheckCircle2 className='h-3 w-3 mr-1' />
              Active
            </Badge>
          )}
          <Badge variant={page.publishedAt ? 'success' : 'neutral'}>
            {page.publishedAt ? (
              <>
                <Globe className='h-3 w-3 mr-1' />
                Published
              </>
            ) : (
              <>
                <Clock className='h-3 w-3 mr-1' />
                Draft
              </>
            )}
          </Badge>
          <Badge variant='neutral'>
            <FileText className='h-3 w-3 mr-1' />
            {page.template}
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className='flex gap-2 pt-2'>
          <Button asChild variant='secondary' className='flex-1'>
            <Link href={`/app/editor/${hypothesisId}/${page.id}`}>
              <Edit3 className='h-4 w-4 mr-2' />
              Edit
            </Link>
          </Button>
          {hypothesis.slug && (
            <Button asChild variant='secondary' className='flex-1'>
              <Link
                href={`${serviceUrl}/preview/${page.id}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <ExternalLink className='h-4 w-4 mr-2' />
                Preview
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

function DuplicateLandingPageAction({
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

  async function duplicate(e: React.MouseEvent) {
    e.preventDefault()
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
          title: t('pages.hypotheses.detail.landing-pages.toasts.duplicated.title'),
          variant: 'success',
        })
        router.push(`/app/editor/${hypothesisId}/${id}`)
      }
    } catch {
      toast({
        title: t('pages.hypotheses.detail.landing-pages.toasts.duplicate-error.title'),
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <button type='button' onClick={duplicate} disabled={loading} className='flex items-center w-full'>
      <Copy className='h-4 w-4 mr-2' />
      {loading ? 'Duplicating...' : 'Duplicate'}
    </button>
  )
}

function SetActiveLandingPageAction({
  hypothesisId,
  landingPageId,
}: {
  hypothesisId: string
  landingPageId: string
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const api = getClientApi()

  async function setActive(e: React.MouseEvent) {
    e.preventDefault()
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
    <button type='button' onClick={setActive} disabled={loading} className='flex items-center w-full'>
      <Sparkles className='h-4 w-4 mr-2' />
      {loading ? 'Setting...' : 'Set as Active'}
    </button>
  )
}
