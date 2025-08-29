import 'server-only'
import { auth } from './index'

// Helper function to verify session in Elysia routes
export async function verifySession(headers: Headers) {
  const session = await auth.api.getSession({ headers })
  return session
}

// Helper function to require authentication
export async function requireSession(headers: Headers) {
  const session = await verifySession(headers)
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}
