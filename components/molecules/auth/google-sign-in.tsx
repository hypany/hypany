'use client'

import { client } from '@/auth/client'
import { Button } from '@/components/atoms/button'
import { serviceUrl } from '@/lib/url'
import { RiGoogleFill } from '@remixicon/react'
import { useState } from 'react'

interface GoogleSignInProps {
  next?: string
}

export function GoogleSignIn(_: GoogleSignInProps) {
  const [loading, setLoading] = useState(false)

  async function handleGoogleSignIn() {
    try {
      setLoading(true)
      const { error } = await client.signIn.social({
        provider: 'google',
        callbackURL: `${serviceUrl}/app`,
      })
      if (error) {
        console.error('Google sign-in error:', error)
        setLoading(false)
      }
    } catch (e) {
      console.error('Google sign-in unexpected error:', e)
      setLoading(false)
    }
  }

  return (
    <Button
      type='button'
      variant='secondary'
      className='w-full gap-2'
      onClick={handleGoogleSignIn}
      isLoading={loading}
      loadingText='Redirecting…'
    >
      <RiGoogleFill className='size-4' aria-hidden='true' />
      Continue with Google
    </Button>
  )
}
