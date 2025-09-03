'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useId, useMemo, useState } from 'react'
import { getClientApi } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { Textarea } from '@/components/atoms/textarea'
import { slugify } from '@/lib/slug'
import { validateSlug } from '@/lib/slug-validation'
import { toast } from '@/lib/use-toast'

export function CreateHypothesisForm() {
  const t = useTranslations('app')
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
        description: t('hypotheses.create.form.errors.name.required.desc'),
        title: t('hypotheses.create.form.errors.name.required.title'),
        variant: 'error',
      })
      return
    }

    const finalSlug = derivedSlug
    if (finalSlug) {
      const { valid, error } = validateSlug(finalSlug)
      if (!valid) {
        toast({
          description:
            error || t('hypotheses.create.form.errors.slug.invalid.desc'),
          title: t('hypotheses.create.form.errors.slug.invalid.title'),
          variant: 'error',
        })
        return
      }
    }

    setSubmitting(true)
    try {
      const api = getClientApi()
      const res = await api.v1.hypotheses.post({
        description: description.trim() || undefined,
        name: name.trim(),
        slug: finalSlug || undefined,
      })
      const data = res.data as { hypothesis: { id: string } } | undefined
      if (!data?.hypothesis?.id) throw new Error('Failed to create hypothesis')

      toast({
        description: t('hypotheses.create.form.toasts.created.desc'),
        title: t('hypotheses.create.form.toasts.created.title'),
        variant: 'success',
      })
      router.push(`/app/hypotheses/${data.hypothesis.id}`)
      router.refresh()
    } catch (err) {
      const message =
        (err as Error)?.message ||
        t('hypotheses.create.form.errors.generic.desc')
      toast({
        description: message,
        title: t('hypotheses.create.form.errors.generic.title'),
        variant: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className='space-y-5'>
      <div className='space-y-2'>
        <Label htmlFor={nameId}>{t('hypotheses.create.form.name.label')}</Label>
        <Input
          id={nameId}
          placeholder={t('hypotheses.create.form.name.placeholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
        />
        <p className='text-xs text-gray-500 dark:text-gray-500'>
          {t('hypotheses.create.form.name.help')}
        </p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor={descId}>
          {t('hypotheses.create.form.description.label')}
        </Label>
        <Textarea
          id={descId}
          placeholder={t('hypotheses.create.form.description.placeholder')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={submitting}
          rows={4}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor={slugId}>{t('hypotheses.create.form.slug.label')}</Label>
        <Input
          id={slugId}
          placeholder={t('hypotheses.create.form.slug.placeholder')}
          value={derivedSlug}
          onChange={(e) => setSlug(slugify(e.target.value))}
          disabled={submitting}
          pattern='[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?'
          minLength={3}
        />
        <p className='text-xs text-gray-500 dark:text-gray-500'>
          {t('hypotheses.create.form.slug.help.prefix')}{' '}
          {derivedSlug ? (
            <>
              {' '}
              {t('hypotheses.create.form.slug.help.present', {
                slug: derivedSlug,
              })}
              {!slugValidation.valid && (
                <span className='ml-2 text-red-600 dark:text-red-400'>
                  ({slugValidation.error})
                </span>
              )}
            </>
          ) : (
            t('hypotheses.create.form.slug.help.empty')
          )}
        </p>
      </div>

      <div className='pt-2'>
        <Button className='w-full sm:w-auto' disabled={submitting}>
          {submitting
            ? t('hypotheses.create.form.actions.creating')
            : t('hypotheses.create.form.actions.create')}
        </Button>
      </div>
    </form>
  )
}

export default CreateHypothesisForm
