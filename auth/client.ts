import { serviceUrl } from '@/lib/url'
import { adminClient, organizationClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const client = createAuthClient({
  baseURL: serviceUrl,
  plugins: [adminClient(), organizationClient()],
})
