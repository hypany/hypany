import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function AppPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/')
  }

  // Redirect to dashboard overview for now
  redirect('/quotes/overview')
}