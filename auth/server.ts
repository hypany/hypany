import 'server-only'
import { headers } from 'next/headers'
import { auth } from './index'

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  
  return session
}

export async function requireAuth() {
  const session = await getSession()
  
  if (!session) {
    throw new Error('Unauthorized')
  }
  
  return session
}

export async function getUser() {
  const session = await getSession()
  return session?.user || null
}

export async function isAuthenticated() {
  const session = await getSession()
  return !!session
}