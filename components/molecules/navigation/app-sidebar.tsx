import { Divider } from '@/components/atoms/divider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/atoms/sidebar'
import { AppSidebarNav } from './app-sidebar-nav'
import OrgSwitcher from './org-switcher'
import { UserProfile } from './user-profile'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className='bg-white dark:bg-gray-925'>
      <SidebarHeader className='px-3 py-4'>
        <OrgSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarNav />
        <div className='px-3'>
          <Divider className='my-0 py-0' />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className='border-t border-gray-200 dark:border-gray-800' />
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}
