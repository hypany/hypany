'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/app/api'
import { Button } from '@/components/atoms/button'
import { toast } from '@/lib/use-toast'

export function CreateLandingPageButton({ hypothesisId }: { hypothesisId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  async function create() {
    setLoading(true)
    try {
      const res = await api.v1['landing-pages'].hypothesis({ hypothesisId }).create.post()
      const id = res.data && typeof res.data === 'object' && 'id' in res.data ? (res.data as { id: string }).id : null
      if (id) {
        toast({ title: 'Landing page created', variant: 'success' })
        router.push(`/app/editor/${hypothesisId}/${id}`)
      } else {
        toast({ title: 'Failed to create landing page', variant: 'error' })
      }
    } catch {
      toast({ title: 'Failed to create landing page', variant: 'error' })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button onClick={create} disabled={loading}>
      {loading ? 'Creating…' : 'New Landing Page'}
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
  async function duplicate() {
    setLoading(true)
    try {
      const res = await api.v1['landing-pages']['by-id']({ landingPageId }).duplicate.post()
      const id = res.data && typeof res.data === 'object' && 'id' in res.data ? (res.data as { id: string }).id : null
      if (id) {
        toast({ title: 'Duplicated landing page', variant: 'success' })
        router.push(`/app/editor/${hypothesisId}/${id}`)
      } else {
        toast({ title: 'Failed to duplicate', variant: 'error' })
      }
    } catch {
      toast({ title: 'Failed to duplicate landing page', variant: 'error' })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button variant='secondary' onClick={duplicate} disabled={loading}>
      {loading ? 'Duplicating…' : 'Duplicate'}
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
  async function save() {
    if (!value || saving) return
    setSaving(true)
    try {
      await api.v1['landing-pages']['by-id']({ landingPageId }).patch({ name: value })
      toast({ title: 'Name saved', variant: 'success' })
    } catch {
      toast({ title: 'Failed to save name', variant: 'error' })
    } finally {
      setSaving(false)
    }
  }
  return (
    <div className='flex items-center gap-2'>
      <input
        className='w-full rounded-md border px-2 py-1 text-sm outline-hidden dark:border-gray-800'
        placeholder='three-words-identifier'
        defaultValue={value}
        onBlur={(e) => {
          setValue(e.target.value)
          if (e.target.value !== initialName) void save()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur()
          }
        }}
      />
      {saving && <span className='text-xs text-gray-500'>Saving…</span>}
    </div>
  )
}
