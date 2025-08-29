'use client'

import { ArrowUpRight, Monitor, Moon, Sun } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { client } from '@/auth/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu'

export type DropdownUserProfileProps = {
  children: React.ReactNode
  align?: 'center' | 'start' | 'end'
}

export function DropdownUserProfile({
  children,
  align = 'start',
}: DropdownUserProfileProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('nav')
  const tApp = useTranslations('app.userMenu')
  const [isPending, startTransition] = useTransition()
  const { data } = client.useSession()
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = useCallback(async () => {
    await client.signOut()
    toast.success('Signed out successfully')
    router.replace('/sign-in')
    router.refresh()
  }, [router])

  if (!mounted) {
    return null
  }

  function setLocaleCookie(nextLocale: string) {
    document.cookie = `locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className='sm:min-w-[calc(var(--radix-dropdown-menu-trigger-width))]!'
      >
        <DropdownMenuLabel>{data?.user?.email ?? ''}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSubMenu>
            <DropdownMenuSubMenuTrigger>{tApp('theme')}</DropdownMenuSubMenuTrigger>
            <DropdownMenuSubMenuContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(value) => {
                  setTheme(value)
                }}
              >
                <DropdownMenuRadioItem
                  aria-label='Switch to Light Mode'
                  value='light'
                >
                  <Sun className='size-4 shrink-0' aria-hidden='true' />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  aria-label='Switch to Dark Mode'
                  value='dark'
                >
                  <Moon className='size-4 shrink-0' aria-hidden='true' />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  aria-label='Switch to System Mode'
                  value='system'
                >
                  <Monitor className='size-4 shrink-0' aria-hidden='true' />
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubMenuContent>
          </DropdownMenuSubMenu>
          <DropdownMenuSubMenu>
            <DropdownMenuSubMenuTrigger>
              {t('language')}
            </DropdownMenuSubMenuTrigger>
            <DropdownMenuSubMenuContent>
              <DropdownMenuRadioGroup
                value={locale}
                onValueChange={(value) => setLocaleCookie(value)}
              >
                <DropdownMenuRadioItem
                  aria-label={t('lang-en')}
                  value='en'
                  disabled={isPending}
                >
                  {t('lang-en')}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  aria-label={t('lang-ko')}
                  value='ko'
                  disabled={isPending}
                >
                  {t('lang-ko')}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubMenuContent>
          </DropdownMenuSubMenu>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {tApp('changelog')}
            <ArrowUpRight
              className='mb-1 ml-1 size-3 shrink-0 text-gray-500 dark:text-gray-500'
              aria-hidden='true'
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            {tApp('documentation')}
            <ArrowUpRight
              className='mb-1 ml-1 size-3 shrink-0 text-gray-500'
              aria-hidden='true'
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            {tApp('joinSlack')}
            <ArrowUpRight
              className='mb-1 ml-1 size-3 shrink-0 text-gray-500'
              aria-hidden='true'
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSignOut}>{tApp('signOut')}</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
