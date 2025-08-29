import { getSession } from '@/auth/server'
import { UserProfileClient } from './user-profile.client'

export async function UserProfile() {
  const session = await getSession()
  const user = session?.user ?? null
  return <UserProfileClient user={user} />
}
