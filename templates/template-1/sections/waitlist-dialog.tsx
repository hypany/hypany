'use client'

import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog'
import { Input } from '@/components/atoms/input'
import type { WaitlistForm as WaitlistFormType } from '../../types'

interface WaitlistDialogProps {
  config: WaitlistFormType
  hypothesisId: string
  triggerPlaceholder?: string
  className?: string
}

interface FormData {
  email: string
  name?: string
}

export function WaitlistDialog({
  config,
  hypothesisId,
  triggerPlaceholder = 'Enter your email to join the waitlist',
  className,
}: WaitlistDialogProps) {
  const emailId = useId()
  const nameId = useId()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setStatus('idle')

    try {
      const params = new URLSearchParams(window.location.search)
      const metadata: Record<string, unknown> = {}

      const utmFields = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
      ]
      utmFields.forEach((field) => {
        const value = params.get(field)
        if (value) metadata[field.replace('utm_', '')] = value
      })

      const response = await fetch(`/api/v1/public/${hypothesisId}/signup`, {
        body: JSON.stringify({
          email: data.email,
          metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
          name: data.name,
          source: params.get('utm_source') || 'organic',
          utmCampaign: params.get('utm_campaign') || undefined,
          utmContent: params.get('utm_content') || undefined,
          utmMedium: params.get('utm_medium') || undefined,
          utmSource: params.get('utm_source') || undefined,
          utmTerm: params.get('utm_term') || undefined,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (response.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch (_err) {
      setStatus('error')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='flex items-center gap-2'>
          <Input
            readOnly
            placeholder={triggerPlaceholder}
            className={`w-full cursor-pointer ${className || ''}`}
            aria-label='Join waitlist'
          />
          <Button>{'Join Waitlist'}</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {config.heading && <DialogTitle>{config.heading}</DialogTitle>}
          {config.subhead && (
            <DialogDescription>{config.subhead}</DialogDescription>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='text-left'>
            <Input
              id={emailId}
              type='email'
              {...register('email', {
                pattern: {
                  message: 'Invalid email address',
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                },
                required: 'Email is required',
              })}
              placeholder='your@email.com'
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className='text-sm text-red-600 mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className='text-left'>
            <Input
              id={nameId}
              type='text'
              {...register('name')}
              placeholder='Your name'
            />
          </div>

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting
              ? 'Joining...'
              : config.submitLabel || 'Join Waitlist'}
          </Button>

          {status === 'success' && (
            <p className='text-sm text-green-600 mt-2'>
              {config.successMessage || 'Successfully joined the waitlist!'}
            </p>
          )}

          {status === 'error' && (
            <p className='text-sm text-red-600 mt-2'>
              {config.errorMessage || 'Something went wrong. Please try again.'}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
