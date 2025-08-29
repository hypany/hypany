'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { cx } from '@/lib/utils'
import { updateOrganizationAction } from '@/app/app/organizations/actions'

type OrgSettingsFormProps = {
  organizationId?: string
  defaultName: string
  defaultSlug: string
  className?: string
}

export function OrgSettingsForm({
  organizationId,
  defaultName,
  defaultSlug,
  className,
}: OrgSettingsFormProps) {
  const [name, setName] = useState(defaultName)
  const [slug, setSlug] = useState(defaultSlug)
  const [isPending, startTransition] = useTransition()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      const res = await updateOrganizationAction({
        name: name.trim(),
        organizationId,
        slug: slug.trim(),
      })
      if (!res.ok) {
        toast.error(res.error || 'Failed to update organization')
        return
      }
      toast.success('Organization updated')
    })
  }

  return (
    <form onSubmit={onSubmit} className={cx('space-y-4', className)}>
      <div className='space-y-2'>
        <Label htmlFor='org-name'>Name</Label>
        <Input
          id='org-name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isPending}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='org-slug'>Slug</Label>
        <Input
          id='org-slug'
          value={slug}
          onChange={(e) => setSlug(e.target.value.replace(/[^a-z0-9-]/g, ''))}
          disabled={isPending}
        />
        <p className='text-xs text-gray-500 dark:text-gray-500'>
          Used in URLs. Only lowercase letters, numbers, and dashes.
        </p>
      </div>
      <Button type='submit' disabled={isPending} className='w-full sm:w-fit'>
        {isPending ? 'Saving...' : 'Save changes'}
      </Button>
    </form>
  )
}

export default OrgSettingsForm

