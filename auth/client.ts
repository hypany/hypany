import { adminClient, organizationClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }
  
  if (process.env.VERCEL_URL) {
    // Handle VERCEL_URL whether it has protocol or not
    const url = process.env.VERCEL_URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    return `http://${url}`
  }
  
  return 'http://localhost:3000'
}

export const client = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [adminClient(), organizationClient()],
})
