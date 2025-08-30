'use client'
import { RiArrowDownSFill } from '@remixicon/react'
import { ChartBar, LayoutDashboard, Lightbulb, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Input } from '@/components/atoms/input'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarLink,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSubLink,
} from '@/components/atoms/sidebar'
import { cx, focusRing } from '@/lib/utils'

type IconComponent = React.ComponentType<{
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}>

type NavItem = {
  href: string
  icon: IconComponent
  name: string
  notifications: boolean
}

type GroupItem = {
  href: string
  name: string
}
type NavGroup = {
  icon: IconComponent
  name: string
  href: string
  children: ReadonlyArray<GroupItem>
}

const navigation: ReadonlyArray<NavItem> = [
  {
    href: '/app',
    icon: LayoutDashboard,
    name: 'app.sidebar.overview',
    notifications: false,
  },
] as const

const navigation2: ReadonlyArray<NavGroup> = [
  {
    children: [
      {
        href: '/app/hypotheses',
        name: 'app.sidebar.hypotheses.overview',
      },
      {
        href: '/app/assets',
        name: 'app.sidebar.hypotheses.assets',
      },
    ],
    href: '#',
    icon: Lightbulb,
    name: 'app.sidebar.hypotheses._',
  },
  {
    children: [
      {
        href: '/app/analytics',
        name: 'app.sidebar.analytics.overview',
      },
      {
        href: '/app/waitlists',
        name: 'app.sidebar.analytics.waitlists',
      },
    ],
    href: '#',
    icon: ChartBar,
    name: 'app.sidebar.analytics._',
  },
  {
    children: [
      {
        href: '/app/settings',
        name: 'app.sidebar.settings.general',
      },
      {
        href: '/app/organizations',
        name: 'app.sidebar.settings.organizations',
      },
      {
        href: '/app/wysiwyg',
        name: 'WYSIWYG Editor',
      },
    ],
    href: '#',
    icon: Settings,
    name: 'app.sidebar.settings._',
  },
] as const

export function AppSidebarNav() {
  const t = useTranslations()
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = React.useState<string[]>([])

  React.useEffect(() => {
    const activeGroups = navigation2
      .filter((group) =>
        group.children.some((child) => {
          const base = child.href.endsWith('/')
            ? child.href.slice(0, -1)
            : child.href
          const withSlash = `${base}/`
          return pathname === base || pathname.startsWith(withSlash)
        }),
      )
      .map((g) => g.name)

    setOpenMenus((prev) => Array.from(new Set([...prev, ...activeGroups])))
  }, [pathname])

  const toggleMenu = (name: string) => {
    setOpenMenus((prev: string[]) =>
      prev.includes(name)
        ? prev.filter((item: string) => item !== name)
        : [...prev, name],
    )
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <Input
            type='search'
            placeholder={t('app.sidebar.search')}
            className='sm:[&>input]:py-1.5'
          />
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup className='pt-0'>
        <SidebarGroupContent>
          <SidebarMenu className='space-y-1'>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarLink
                  href={item.href}
                  icon={item.icon}
                  notifications={item.notifications}
                >
                  {t(item.name)}
                </SidebarLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <div className='mx-3 border-t border-gray-200 dark:border-gray-800' />
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className='space-y-4'>
            {navigation2.map((item) => (
              <SidebarMenuItem key={item.name}>
                <button
                  type='button'
                  onClick={() => toggleMenu(item.name)}
                  className={cx(
                    'flex w-full items-center justify-between gap-x-2.5 rounded-md p-2 text-base text-gray-900 transition hover:bg-gray-200/50 sm:text-sm dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-50',
                    focusRing,
                  )}
                >
                  <div className='flex items-center gap-2.5'>
                    <item.icon
                      className='size-[18px] shrink-0'
                      aria-hidden='true'
                    />
                    {t(item.name)}
                  </div>
                  <RiArrowDownSFill
                    className={cx(
                      openMenus.includes(item.name) ? 'rotate-0' : '-rotate-90',
                      'size-5 shrink-0 transform text-gray-400 transition-transform duration-150 ease-in-out dark:text-gray-600',
                    )}
                    aria-hidden='true'
                  />
                </button>
                {item.children && openMenus.includes(item.name) && (
                  <SidebarMenuSub>
                    <div className='absolute inset-y-0 left-4 w-px bg-gray-300 dark:bg-gray-800' />
                    {item.children.map((child) => (
                      <SidebarMenuItem key={child.name}>
                        <SidebarSubLink href={child.href}>
                          {t(child.name)}
                        </SidebarSubLink>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
