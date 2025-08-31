'use client'

import { useRouter } from 'next/navigation'
import { useId, useMemo, useState } from 'react'
import { getClientApi } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { slugify } from '@/lib/slug'
import { toast } from '@/lib/use-toast'

export function CreateOrganizationForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const nameId = useId()
  const slugId = useId()

  const derivedSlug = useMemo(() => (slug ? slug : slugify(name)), [name, slug])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      toast({
        description: 'Organization name is required to continue.',
        title: 'Please enter an organization name',
        variant: 'error',
      })
      return
    }
    setSubmitting(true)
    try {
      const api = getClientApi()
      const res = await api.v1.organizations.create.post({
        name: name.trim(),
        slug: derivedSlug,
      })
      const org = res.data
      if (!org) throw new Error('No organization returned')
      await api.v1.organizations['set-active'].post({
        organizationId: (org as { id: string }).id,
      })
      toast({
        description: 'Switching to your new organization...',
        title: 'Organization created',
        variant: 'success',
      })
      router.push('/app')
      router.refresh()
    } catch (error) {
      toast({
        description: 'Please try again.',
        title: 'Failed to create organization',
        variant: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor={nameId}>Organization name</Label>
        <Input
          id={nameId}
          placeholder='Acme Inc.'
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor={slugId}>Slug (optional)</Label>
        <Input
          id={slugId}
          placeholder='acme-inc'
          value={slug}
          onChange={(e) => setSlug(slugify(e.target.value))}
          disabled={submitting}
        />
        <p className='text-xs text-gray-500 dark:text-gray-500'>
          {derivedSlug
            ? `Will be created as /o/${derivedSlug}`
            : 'Slug auto-generated from name'}
        </p>
      </div>
      <Button disabled={submitting} className='w-full'>
        {submitting ? 'Creating...' : 'Create Organization'}
      </Button>
    </form>
  )
}

export default CreateOrganizationForm
