'use client'

import { useRouter } from 'next/navigation'
import { useId, useMemo, useState } from 'react'
import { getClientApi } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { slugify } from '@/lib/slug'
import { validateSlug } from '@/lib/slug-validation'
import { toast } from '@/lib/use-toast'

export function CreateOrganizationForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const nameId = useId()
  const slugId = useId()

  const derivedSlug = useMemo(() => (slug ? slug : slugify(name)), [name, slug])
  const derivedValidation = useMemo(() => {
    return derivedSlug ? validateSlug(derivedSlug) : { valid: true as const }
  }, [derivedSlug])

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
    
    // Validate slug with shared validator
    const finalSlug = derivedSlug
    const { valid, error } = validateSlug(finalSlug)
    if (!valid) {
      toast({
        description: error || 'Please enter a valid subdomain.',
        title: 'Invalid slug',
        variant: 'error',
      })
      return
    }
    
    setSubmitting(true)
    try {
      const api = getClientApi()
      const res = await api.v1.organizations.create.post({
        name: name.trim(),
        slug: finalSlug,
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
    } catch (e) {
      const errorMessage = (e as Error).message ?? 'Failed to create organization'
      // Check for slug uniqueness error
      if (errorMessage.toLowerCase().includes('slug') || errorMessage.toLowerCase().includes('unique')) {
        toast({
          description: 'This slug is already taken. Please choose another.',
          title: 'Slug already exists',
          variant: 'error',
        })
      } else {
        toast({
          description: 'Please try again.',
          title: errorMessage,
          variant: 'error',
        })
      }
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
        <Label htmlFor={slugId}>Organization URL</Label>
        <Input
          id={slugId}
          placeholder='acme-inc'
          value={derivedSlug}
          onChange={(e) => setSlug(slugify(e.target.value))}
          disabled={submitting}
          pattern='[a-z0-9]([a-z0-9-]*[a-z0-9])?'
          minLength={3}
        />
        <p className='text-xs text-gray-500 dark:text-gray-500'>
          {derivedSlug ? (
            <>
              Will be created as <span className='font-mono'>/o/{derivedSlug}</span>
              {!derivedValidation.valid && (
                <span className='ml-2 text-red-600 dark:text-red-400'>
                  ({derivedValidation.error})
                </span>
              )}
            </>
          ) : (
            'Slug will be auto-generated from name'
          )}
        </p>
      </div>
      <Button disabled={submitting} className='w-full'>
        {submitting ? 'Creating...' : 'Create Organization'}
      </Button>
    </form>
  )
}

export default CreateOrganizationForm
