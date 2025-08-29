'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu'

export function ThemeToggle() {
  const t = useTranslations('common')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const Icon = useMemo(() => {
    if (theme === 'light') return Sun
    if (theme === 'dark') return Moon
    return Monitor
  }, [theme])

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={t('theme.toggle-aria')}
          variant='secondary'
          className='p-2'
        >
          <Icon className='size-4 shrink-0' aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value)}
        >
          <DropdownMenuRadioItem
            aria-label={t('theme.aria.light')}
            value='light'
          >
            <Sun className='size-4 shrink-0' aria-hidden='true' />
            {t('theme.light')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem aria-label={t('theme.aria.dark')} value='dark'>
            <Moon className='size-4 shrink-0' aria-hidden='true' />
            {t('theme.dark')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            aria-label={t('theme.aria.system')}
            value='system'
          >
            <Monitor className='size-4 shrink-0' aria-hidden='true' />
            {t('theme.system')}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
