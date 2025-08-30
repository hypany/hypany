'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import type * as React from 'react'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { client } from '@/auth/client'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { toast } from '@/lib/use-toast'
import { cx } from '@/lib/utils'

const resetSchema = z
  .object({
    confirmPassword: z.string().min(8, 'Please confirm your password'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type ResetFormData = z.infer<typeof resetSchema>

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
  token?: string
}

export function ResetPasswordForm({
  className,
  token,
  ...props
}: ResetPasswordFormProps) {
  const passwordId = useId()
  const confirmId = useId()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  })

  async function onSubmit(data: ResetFormData) {
    if (!token) {
      toast({
        title: 'Invalid or missing token.',
        description: 'Request a new reset link and try again.',
        variant: 'error',
      })
      return
    }

    const t = toast({
      title: 'Updating password...',
      description: 'Applying your new password.',
      variant: 'loading',
    })
    try {
      const { error } = await client.resetPassword({
        newPassword: data.password,
        token,
      })
      if (error) {
        throw new Error(error.message || 'Failed to reset password')
      }
      t.update({
        title: 'Your password has been updated.',
        description: 'You can sign in with your new password now.',
        variant: 'success',
      })
      router.push('/sign-in')
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : 'Failed to reset password. Please try again.'
      t.update({
        title: message,
        description: 'Please try again.',
        variant: 'error',
      })
    }
  }

  return (
    <div className={cx('w-full', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor={passwordId}>New password</Label>
          <Input
            id={passwordId}
            placeholder='Create a password'
            type='password'
            autoCapitalize='none'
            autoComplete='new-password'
            disabled={isSubmitting}
            {...register('password')}
          />
          {errors.password && (
            <p className='text-sm text-red-600 dark:text-red-500'>
              {errors.password.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor={confirmId}>Confirm password</Label>
          <Input
            id={confirmId}
            placeholder='Confirm your password'
            type='password'
            autoCapitalize='none'
            autoComplete='new-password'
            disabled={isSubmitting}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className='text-sm text-red-600 dark:text-red-500'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button disabled={isSubmitting} className='w-full'>
          {isSubmitting ? 'Updating...' : 'Reset password'}
        </Button>
      </form>
    </div>
  )
}
