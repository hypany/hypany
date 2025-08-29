import { adminClient, organizationClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import type { auth } from './index'

export const client = createAuthClient({
  baseURL:
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.VERCEL_URL || 'http://localhost:3000',
  plugins: [adminClient(), organizationClient()],
}) as typeof auth.client
