'use client'

import { useId, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getClientApi } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { Textarea } from '@/components/atoms/textarea'
import { slugify } from '@/lib/slug'
import { validateSlug } from '@/lib/slug-validation'
import { toast } from '@/lib/use-toast'

export function CreateHypothesisForm() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const nameId = useId()
  const slugId = useId()
  const descId = useId()

  const derivedSlug = useMemo(() => (slug ? slug : slugify(name)), [name, slug])
  const slugValidation = useMemo(() => {
    if (!derivedSlug) return { valid: true as const }
    return validateSlug(derivedSlug)
  }, [derivedSlug])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      toast({
        title: 'Name is required',
        description: 'Please enter a hypothesis name to continue.',
        variant: 'error',
      })
      return
    }

    const finalSlug = derivedSlug
    if (finalSlug) {
      const { valid, error } = validateSlug(finalSlug)
      if (!valid) {
        toast({
          title: 'Invalid subdomain',
          description: error || 'Please enter a valid subdomain.',
          variant: 'error',
        })
        return
      }
    }

    setSubmitting(true)
    try {
      const api = getClientApi()
      const res = await api.v1.hypotheses.post({
        name: name.trim(),
        description: description.trim() || undefined,
        slug: finalSlug || undefined,
      })
      const data = res.data as
        | { hypothesis: { id: string } }
        | undefined
      if (!data?.hypothesis?.id) throw new Error('Failed to create hypothesis')

      toast({
        title: 'Hypothesis created',
        description: 'Redirecting to the overview...',
        variant: 'success',
      })
      router.push(`/app/hypotheses/${data.hypothesis.id}`)
      router.refresh()
    } catch (err) {
      const message = (err as Error)?.message || 'Failed to create hypothesis'
      toast({ title: 'Error', description: message, variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className='space-y-5'>
      <div className='space-y-2'>
        <Label htmlFor={nameId}>Name</Label>
        <Input
          id={nameId}
          placeholder='AI Logo Generator'
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
        />
        <p className='text-xs text-gray-500 dark:text-gray-500'>
          A concise, memorable name for your idea.
        </p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor={descId}>Description (optional)</Label>
        <Textarea
          id={descId}
          placeholder='One sentence describing the problem and your approach.'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={submitting}
          rows={4}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor={slugId}>Subdomain (optional)</Label>
        <Input
          id={slugId}
          placeholder='ai-logo'
          value={derivedSlug}
          onChange={(e) => setSlug(slugify(e.target.value))}
          disabled={submitting}
          pattern='[a-z0-9]([a-z0-9-]*[a-z0-9])?'
          minLength={3}
        />
        <p className='text-xs text-gray-500 dark:text-gray-500'>
          Used for your public subdomain.
          {derivedSlug ? (
            <>
              {' '}Will be created as <span className='font-mono'>/{derivedSlug}</span>
              {!slugValidation.valid && (
                <span className='ml-2 text-red-600 dark:text-red-400'>
                  ({slugValidation.error})
                </span>
              )}
            </>
          ) : (
            ' Leave blank to auto-generate.'
          )}
        </p>
      </div>

      <div className='pt-2'>
        <Button className='w-full sm:w-auto' disabled={submitting}>
          {submitting ? 'Creating…' : 'Create Hypothesis'}
        </Button>
      </div>
    </form>
  )
}

export default CreateHypothesisForm

