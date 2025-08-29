'use client'
import { RiArrowDownSFill } from '@remixicon/react'
import { ChartBar, LayoutDashboard, Lightbulb, Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Divider } from '@/components/atoms/divider'
import { Input } from '@/components/atoms/input'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarLink,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSubLink,
} from '@/components/atoms/sidebar'
import { cx, focusRing } from '@/lib/utils'
import { HypanyLogo } from '@/public/brand/hypany-logo'
import OrgSwitcher from './org-switcher'
import { UserProfile } from './user-profile'

type IconComponent = React.ComponentType<{
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}>

type NavItem = {
  active: boolean
  href: string
  icon: IconComponent
  name: string
  notifications: boolean
}
const navigation: ReadonlyArray<NavItem> = [
  {
    active: false,
    href: '/app/overview',
    icon: LayoutDashboard,
    name: 'app.sidebar.overview',
    notifications: false,
  },
] as const

type GroupItem = {
  href: string
  name: string
  active: boolean
}
type NavGroup = {
  icon: IconComponent
  name: string
  href: string
  children: ReadonlyArray<GroupItem>
}
const navigation2: ReadonlyArray<NavGroup> = [
  {
    children: [
      {
        active: false,
        href: '/app/hypotheses',
        name: 'app.sidebar.hypotheses.overview',
      },
      {
        active: false,
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
        active: false,
        href: '/app/analytics',
        name: 'app.sidebar.analytics.overview',
      },
      {
        active: false,
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
        active: false,
        href: '/app/settings',
        name: 'app.sidebar.settings.general',
      },
      {
        active: false,
        href: '/app/organizations',
        name: 'app.sidebar.settings.organizations',
      },
    ],
    href: '#',
    icon: Settings,
    name: 'app.sidebar.settings._',
  },
] as const

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations()
  const [openMenus, setOpenMenus] = React.useState<string[]>([
    navigation2[0].name,
  ])
  const toggleMenu = (name: string) => {
    setOpenMenus((prev: string[]) =>
      prev.includes(name)
        ? prev.filter((item: string) => item !== name)
        : [...prev, name],
    )
  }
  return (
    <Sidebar {...props} className='bg-gray-50 dark:bg-gray-925'>
      <SidebarHeader className='px-3 py-4'>
        <div className='flex items-center gap-3'>
          <span className='flex size-9 items-center justify-center rounded-md bg-white p-1.5 shadow-xs ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800'>
            <HypanyLogo className='size-6 text-emerald-500 dark:text-emerald-500' />
          </span>
          <OrgSwitcher />
        </div>
      </SidebarHeader>
      <SidebarContent>
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
                    href='#'
                    isActive={item.active}
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
        <div className='px-3'>
          <Divider className='my-0 py-0' />
        </div>
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
                        openMenus.includes(item.name)
                          ? 'rotate-0'
                          : '-rotate-90',
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
                          <SidebarSubLink
                            href={child.href}
                            isActive={child.active}
                          >
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
      </SidebarContent>
      <SidebarFooter>
        <div className='border-t border-gray-200 dark:border-gray-800' />
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}
