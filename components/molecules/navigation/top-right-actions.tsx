'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/atoms/button'

export function TopRightActions() {
  const pathname = usePathname()

  // Only show on hypotheses overview page
  const showCreate = pathname === '/app/hypotheses'

  if (!showCreate) return null

  return (
    <div className='ml-auto'>
      <Button asChild>
        <Link href='/app/hypotheses/create'>Create Hypothesis</Link>
      </Button>
    </div>
  )
}

