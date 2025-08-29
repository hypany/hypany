'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { client } from '@/auth/client'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function CreateOrganizationForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const derivedSlug = useMemo(() => (slug ? slug : slugify(name)), [name, slug])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      toast.error('Please enter an organization name')
      return
    }
    setSubmitting(true)
    try {
      const { data: org, error } = await client.organization.create({
        name: name.trim(),
        slug: derivedSlug,
      })
      if (error || !org) {
        toast.error(error?.message || 'Failed to create organization')
        return
      }
      await client.organization.setActive({ organizationId: org.id })
      toast.success('Organization created')
      router.push('/app')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to create organization')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='org-name'>Organization name</Label>
        <Input
          id='org-name'
          placeholder='Acme Inc.'
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='org-slug'>Slug (optional)</Label>
        <Input
          id='org-slug'
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
