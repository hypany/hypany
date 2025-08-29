'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import type * as React from 'react'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { client } from '@/auth/client'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { cx } from '@/lib/utils'

const forgotSchema = z.object({
  email: z.email('Invalid email address'),
})

type ForgotFormData = z.infer<typeof forgotSchema>

interface ForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgotPasswordForm({ className, ...props }: ForgotPasswordFormProps) {
  const emailId = useId()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  })

  async function onSubmit(data: ForgotFormData) {
    try {
      const redirectTo = `${window.location.origin}/reset-password`

      const promise = (async () => {
        const { error } = await client.forgetPassword({
          email: data.email,
          redirectTo,
        })

        if (error) {
          throw new Error(error.message || 'Failed to send reset email')
        }
        return { email: data.email }
      })()

      toast.promise(promise, {
        loading: 'Sending reset link...',
        success: ({ email }) => `If an account exists, a reset link was sent to ${email}.`,
        error: (err) => err.message || 'Failed to send reset email. Please try again.',
      })
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Something went wrong. Please try again.'
      toast.error(message)
    }
  }

  return (
    <div className={cx('w-full', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor={emailId}>Email</Label>
          <Input
            id={emailId}
            placeholder='name@example.com'
            type='email'
            autoCapitalize='none'
            autoComplete='email'
            autoCorrect='off'
            disabled={isSubmitting}
            {...register('email')}
          />
          {errors.email && (
            <p className='text-sm text-red-600 dark:text-red-500'>
              {errors.email.message}
            </p>
          )}
        </div>

        <Button disabled={isSubmitting} className='w-full'>
          {isSubmitting ? 'Sending...' : 'Send reset link'}
        </Button>
      </form>
    </div>
  )
}

