'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { client } from '@/auth/client'
import { Button } from '@/components/atoms/button'

interface GoogleSignInProps {
  next?: string
}

export function GoogleSignIn({ next }: GoogleSignInProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleGoogleSignIn() {
    try {
      setLoading(true)
      const { error } = await client.signIn.social({
        provider: 'google',
      })
      if (error) {
        // Errors are rare here because the flow redirects, but handle just in case
        console.error('Google sign-in error:', error)
        setLoading(false)
      }
      // If flow doesn’t redirect (e.g., ID token), navigate as fallback
      if (!error && next) {
        router.push(next)
      }
      // On success, Better Auth redirects via the OAuth flow/callback.
      // If no redirect happens (e.g., idToken flow), we can navigate:
      // router.push(next || '/app')
    } catch (e) {
      console.error('Google sign-in unexpected error:', e)
      setLoading(false)
    }
  }

  return (
    <Button
      type='button'
      variant='secondary'
      className='w-full'
      onClick={handleGoogleSignIn}
      isLoading={loading}
      loadingText='Redirecting…'
    >
      Continue with Google
    </Button>
  )
}
