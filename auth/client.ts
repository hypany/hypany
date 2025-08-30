import { adminClient, organizationClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { serviceUrl } from '@/lib/url'

export const client = createAuthClient({
  baseURL: serviceUrl,
  plugins: [adminClient(), organizationClient()],
})
