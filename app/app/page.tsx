import { redirect } from 'next/navigation'

export default async function AppPage() {
  // No auth gating; redirect to dashboard overview
  redirect('/quotes/overview')
}
