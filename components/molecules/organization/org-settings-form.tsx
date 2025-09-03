'use client'

import { useId, useState, useTransition } from 'react'
import { updateOrganizationAction } from '@/app/app/organizations/actions'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { validateSlug } from '@/lib/slug-validation'
import { toast } from '@/lib/use-toast'
import { cx } from '@/lib/utils'

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
  const nameId = useId()
  const slugId = useId()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validate slug with shared validator
    const trimmedSlug = slug.trim()
    const { valid, error } = validateSlug(trimmedSlug)
    if (!valid) {
      toast({
        description: error || 'Please enter a valid subdomain.',
        title: 'Invalid slug',
        variant: 'error',
      })
      return
    }

    startTransition(async () => {
      const res = await updateOrganizationAction({
        name: name.trim(),
        organizationId,
        slug: trimmedSlug,
      })
      if (!res.ok) {
        // Check for slug uniqueness error
        if (
          res.error?.toLowerCase().includes('slug') ||
          res.error?.toLowerCase().includes('unique')
        ) {
          toast({
            description: 'This slug is already taken. Please choose another.',
            title: 'Slug already exists',
            variant: 'error',
          })
        } else {
          toast({
            description: 'Please check your changes and try again.',
            title: res.error || 'Failed to update organization',
            variant: 'error',
          })
        }
        return
      }
      toast({
        description: 'Organization details have been saved.',
        title: 'Organization updated',
        variant: 'success',
      })
    })
  }

  return (
    <form onSubmit={onSubmit} className={cx('space-y-4', className)}>
      <div className='space-y-2'>
        <Label htmlFor={nameId}>Name</Label>
        <Input
          id={nameId}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isPending}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor={slugId}>Organization URL</Label>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-500 dark:text-gray-400'>/o/</span>
          <Input
            id={slugId}
            value={slug}
            onChange={(e) =>
              setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
            }
            disabled={isPending}
            pattern='[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?'
            minLength={3}
            className='font-mono'
          />
        </div>
        <p className='text-xs text-gray-500 dark:text-gray-500'>
          Only lowercase letters, numbers, and dashes. Minimum 3 characters.
          {slug && slug.length < 3 && (
            <span className='ml-2 text-red-600 dark:text-red-400'>
              (Too short)
            </span>
          )}
        </p>
      </div>
      <Button type='submit' disabled={isPending} className='w-full sm:w-fit'>
        {isPending ? 'Saving...' : 'Save changes'}
      </Button>
    </form>
  )
}

export default OrgSettingsForm
