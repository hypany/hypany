# Components / account-and-user-management

[Back to index](index.md)

## Components / account-and-user-management

Files:
- `src/content/components/account-and-user-management/account-and-user-management-01.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-02.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-03.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-04.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-05.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-06.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-07.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-08.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-09.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-10.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-11.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-12.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-13.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-14.tsx`
- `src/content/components/account-and-user-management/account-and-user-management-15.tsx`
- `src/content/components/account-and-user-management/index.ts`

### src/content/components/account-and-user-management/account-and-user-management-01.tsx

```tsx
'use client';

import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
        Settings
      </h1>
      <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
        Manage your personal details, workspace governance and notifications.
      </p>
      <Tabs defaultValue="tab1" className="mt-8">
        <TabsList variant="line">
          <TabsTrigger value="tab1" className="inline-flex gap-2">
            Account details
          </TabsTrigger>
          <TabsTrigger value="tab2" className="inline-flex gap-2">
            Workspaces
          </TabsTrigger>
          <TabsTrigger value="tab3" className="inline-flex gap-2">
            Billing
          </TabsTrigger>
        </TabsList>
        {/* Content below only for demo purpose placed outside of <Tab> component. Add <TabPanels>, <TabPanel> to make it functional and to add content for other tabs */}
        <div className="mt-8 space-y-8">
          <form action="#" method="POST">
            <h2 className="font-semibold text-gray-900 dark:text-gray-50">
              Email
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              Update your email address associated with this workspace.
            </p>
            <div className="mt-6">
              <Label htmlFor="email" className="font-medium">
                Update email address
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="john@company.com"
                className="mt-2 w-full sm:max-w-lg"
              />
            </div>
            <Button type="submit" className="mt-6">
              Update email
            </Button>
          </form>
          <Divider />
          <form action="#" method="POST">
            <h2 className="font-semibold text-gray-900 dark:text-gray-50">
              Password
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              Update your password associated with this workspace.
            </p>
            <div className="mt-6">
              <Label htmlFor="current-password" className="font-medium">
                Current password
              </Label>
              <Input
                type="password"
                id="current-password"
                name="current-password"
                placeholder="password"
                className="mt-2 w-full sm:max-w-lg"
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="new-password" className="font-medium">
                New password
              </Label>
              <Input
                type="password"
                id="new-password"
                name="new-password"
                placeholder="password"
                className="mt-2 w-full sm:max-w-lg"
              />
            </div>
            <Button className="mt-6">Update password</Button>
          </form>
        </div>
      </Tabs>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-02.tsx

```tsx
'use client';

import { RiExternalLinkLine } from '@remixicon/react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { Label } from '@/components/Label';
import { Switch } from '@/components/Switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
        General
      </h1>
      <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
        Manage your personal details, workspace governance and notifications.
      </p>
      <Tabs defaultValue="tab2" className="mt-8">
        <TabsList variant="line">
          <TabsTrigger value="tab1">Account details</TabsTrigger>
          <TabsTrigger value="tab2">Workspaces</TabsTrigger>
          <TabsTrigger value="tab3">Details</TabsTrigger>
        </TabsList>
        {/* Content below only for demo purpose placed outside of <Tab> component. Add <TabsContent> to make it functional and to add content for other tabs */}
        <form action="#" method="POST">
          <h2 className="mt-8 font-semibold text-gray-900 dark:text-gray-50">
            Workspace settings
          </h2>
          <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
            Optimize your workspace with customizable settings and advanced
            features
          </p>
          <div className="mt-8 space-y-6">
            <Card className="max-w-xl overflow-hidden !p-0">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-900 dark:bg-gray-900">
                <Label htmlFor="feature-1" className="font-medium">
                  Enable beta analytics features
                </Label>
              </div>
              <div className="flex items-start space-x-10 p-4">
                <p
                  id="feature-1-description"
                  className="text-sm/6 text-gray-500 dark:text-gray-500"
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.{' '}
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Learn more
                    <RiExternalLinkLine className="size-4" aria-hidden="true" />
                  </a>
                </p>
                <Switch
                  name="feature-1"
                  id="feature-1"
                  aria-describedby="feature-1-description"
                />
              </div>
            </Card>
            <Card className="max-w-xl overflow-hidden !p-0">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-900 dark:bg-gray-900">
                <Label htmlFor="feature-2" className="font-medium">
                  Enable test mode
                </Label>
              </div>
              <div className="flex items-start space-x-10 p-4">
                <p
                  id="feature-2-description"
                  className="text-sm/6 text-gray-500 dark:text-gray-500"
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod.{' '}
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Learn more
                    <RiExternalLinkLine className="size-4" aria-hidden="true" />
                  </a>
                </p>
                <Switch
                  name="feature-2"
                  id="feature-2"
                  aria-describedby="feature-2-description"
                />
              </div>
            </Card>
          </div>
          <Divider className="!my-10" />
          <div className="flex items-center justify-end space-x-4">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
            <Button type="button">Save settings</Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-03.tsx

```tsx
'use client';

import { RiExternalLinkLine } from '@remixicon/react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { Label } from '@/components/Label';
import { Switch } from '@/components/Switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
        General
      </h1>
      <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
        Manage your personal details, workspace governance and notifications.
      </p>
      <Tabs defaultValue="tab3" className="mt-8">
        <TabsList variant="line">
          <TabsTrigger value="tab1">Account details</TabsTrigger>
          <TabsTrigger value="tab2">Users</TabsTrigger>
          <TabsTrigger value="tab3">Add-Ons</TabsTrigger>
        </TabsList>
        {/* Content below only for demo purpose placed outside of <Tab> component. Add <TabPanels>, <TabPanel> to make it functional and to add content for other tabs */}
        <div className="max-w-3xl">
          <h2 className="mt-8 font-semibold text-gray-900 dark:text-gray-50">
            Upgrade options
          </h2>
          <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
            Do more with your data and unlock new insights with our advanced
            features and add-ons.
          </p>
          <Divider className="my-10" />
          <form action="#" method="POST">
            <div className="space-y-6">
              <Card>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  $25/month
                </p>
                <h4 className="mt-4 font-semibold text-gray-900 dark:text-gray-50">
                  Query Caching
                </h4>
                <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.
                </p>
                <Divider />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Switch id="upgrade-1" name="upgrade-1" />
                    <Label
                      htmlFor="upgrade-1"
                      className="text-sm text-gray-500 dark:text-gray-500"
                    >
                      Activate <span className="sr-only">Query Caching</span>
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Learn more
                    <RiExternalLinkLine className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </Card>
              <Card>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  $100/month
                </p>
                <h4 className="mt-4 font-semibold text-gray-900 dark:text-gray-50">
                  Advanced Bot Protection
                </h4>
                <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.
                </p>
                <Divider />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Switch id="upgrade-2" name="upgrade-2" />
                    <Label
                      htmlFor="upgrade-2"
                      className="text-sm text-gray-500 dark:text-gray-500"
                    >
                      Activate{' '}
                      <span className="sr-only">Advanced Bot Protection</span>
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Learn more
                    <RiExternalLinkLine className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </Card>
              <Card>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  $90/month
                </p>
                <h4 className="mt-4 font-semibold text-gray-900 dark:text-gray-50">
                  Observability Analytics
                </h4>
                <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.
                </p>
                <Divider />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Switch id="upgrade-3" name="upgrade-3" />
                    <Label
                      htmlFor="upgrade-3"
                      className="text-sm text-gray-500 dark:text-gray-500"
                    >
                      Activate{' '}
                      <span className="sr-only">Observability Analytics</span>
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Learn more
                    <RiExternalLinkLine className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </Card>
            </div>
            <Divider className="my-10" />
            <div className="flex justify-end">
              <Button type="submit">Upgrade plan</Button>
            </div>
          </form>
        </div>
      </Tabs>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-04.tsx

```tsx
'use client';

import { RiExternalLinkLine } from '@remixicon/react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { Label } from '@/components/Label';
import { Switch } from '@/components/Switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
        General
      </h1>
      <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
        Manage your personal details, workspace governance and notifications.
      </p>
      <Tabs defaultValue="tab3" className="mt-8">
        <TabsList variant="line">
          <TabsTrigger value="tab1">Account details</TabsTrigger>
          <TabsTrigger value="tab2">Users</TabsTrigger>
          <TabsTrigger value="tab3">Add-Ons</TabsTrigger>
        </TabsList>
        {/* Content below only for demo purpose placed outside of <Tab> component. Add <TabPanels>, <TabPanel> to make it functional and to add content for other tabs */}
        <div className="max-w-3xl">
          <h2 className="mt-8 font-semibold text-gray-900 dark:text-gray-50">
            Upgrade options
          </h2>
          <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
            Do more with your data and unlock new insights with our advanced
            features and add-ons.
          </p>
          <Divider className="!my-10" />
          <form action="#" method="POST">
            <Card className="!p-0">
              <div className="p-6">
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  $25/month
                </p>
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-50">
                  Query Caching
                </h3>
                <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.
                </p>
                <Divider />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Switch id="option-1" name="option-1" />
                    <Label
                      htmlFor="option-1"
                      className="text-gray-500 dark:text-gray-500"
                    >
                      Activate <span className="sr-only">Query Caching</span>
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Learn more
                    <RiExternalLinkLine className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <Divider className="!my-0" />
              <div className="p-6">
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  $100/month
                </p>
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-50">
                  Advanced Bot Protection
                </h3>
                <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.
                </p>
                <Divider />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Switch id="option-2" name="option-2" />
                    <Label htmlFor="option-2">
                      Activate{' '}
                      <span className="sr-only">Advanced Bot Protection</span>
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Learn more
                    <RiExternalLinkLine className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <Divider className="!my-0" />
              <div className="p-6">
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  $90/month
                </p>
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-50">
                  Observability Analytics
                </h3>
                <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.
                </p>
                <Divider />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Switch id="option-3" name="option-3" />
                    <Label htmlFor="option-3">
                      Activate{' '}
                      <span className="sr-only">Observability Analytics</span>
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Learn more
                    <RiExternalLinkLine className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Card>
            <Divider />
            <div className="flex justify-end">
              <Button type="submit">Upgrade plan</Button>
            </div>
          </form>
        </div>
      </Tabs>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-05.tsx

```tsx
'use client';

import { RiExternalLinkLine, RiInstanceLine } from '@remixicon/react';

import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Divider } from '@/components/Divider';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
        General
      </h1>
      <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
        Manage your personal details, workspace governance and notifications.
      </p>
      <Tabs defaultValue="tab2" className="mt-8">
        <TabsList variant="line">
          <TabsTrigger value="tab1">Account details</TabsTrigger>
          <TabsTrigger value="tab2">Settings</TabsTrigger>
          <TabsTrigger value="tab3">Billing</TabsTrigger>
        </TabsList>
        {/* Content below only for demo purpose placed outside of <Tab> component. Add <TabPanels>, <TabPanel> to make it functional and to add content for other tabs */}
        <form action="#" method="POST">
          <div className="mt-8 rounded-md bg-gray-50 p-6 ring-1 ring-inset ring-gray-200 dark:bg-gray-900 dark:ring-gray-800 sm:max-w-7xl">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              This workspace is currently on free plan
            </h2>
            <p className="mt-2 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Boost your analytics and unlock advanced features with our premium
              plans.
            </p>
            <div className="mt-6 flex items-center space-x-2">
              <Button asChild>
                <a href="#">Compare Plans</a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="#">Dismiss</a>
              </Button>
            </div>
          </div>
          <div className="mt-6 space-y-8 sm:max-w-lg">
            <div>
              <Label htmlFor="name" className="font-semibold">
                Name
              </Label>
              <Input
                name="name"
                id="name"
                className="mt-2"
                disabled
                placeholder="sales-dashboard"
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                Contact your admin to change workspace names in production.
              </p>
            </div>
            <div>
              <Label htmlFor="select-input-1" className="font-semibold">
                Default model
              </Label>
              <Select
                name="select-input-1"
                // id="select-input-1"
                defaultValue="1"
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">
                    <span className="flex items-center gap-2.5">
                      <RiInstanceLine
                        className="size-5 shrink-0 text-gray-500 dark:text-gray-500"
                        aria-hidden="true"
                      />
                      GPT-4o (OpenAI)
                    </span>
                  </SelectItem>
                  <SelectItem value="2">
                    <span className="flex items-center gap-2.5">
                      <RiInstanceLine
                        className="size-5 shrink-0 text-gray-500 dark:text-gray-500"
                        aria-hidden="true"
                      />
                      BERT (Google)
                    </span>
                  </SelectItem>
                  <SelectItem value="3">
                    <span className="flex items-center gap-2.5">
                      <RiInstanceLine
                        className="size-5 shrink-0 text-gray-500 dark:text-gray-500"
                        aria-hidden="true"
                      />
                      LLaMA (Meta)
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="select-input-2" className="font-semibold">
                Training cycle
              </Label>
              <Select defaultValue="2">
                <SelectTrigger
                  name="select-input-2"
                  id="select-input-2"
                  className="mt-2"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Every 24 hours</SelectItem>
                  <SelectItem value="2">Once in a week</SelectItem>
                  <SelectItem value="3">Once in a month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                Workspace governance
              </h3>
              <div className="mt-6 space-y-6">
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <Checkbox
                      id="checkbox-name-1"
                      aria-describedby="checkbox-name-1-description"
                      name="checkbox-name-1"
                    />
                  </div>
                  <div className="ml-3 text-sm/6">
                    <Label htmlFor="checkbox-name-1" className="font-medium">
                      Require team member approval for deploy requests
                    </Label>
                    <p
                      id="checkbox-name-1-description"
                      className="text-gray-500 dark:text-gray-500"
                    >
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <Checkbox
                      id="checkbox-name-2"
                      aria-describedby="checkbox-name-2-description"
                      name="checkbox-name-2"
                    />
                  </div>
                  <div className="ml-3 text-sm/6">
                    <Label htmlFor="checkbox-name-2" className="font-medium">
                      Enable audit logs
                    </Label>
                    <p
                      id="checkbox-name-2-description"
                      className="text-gray-500 dark:text-gray-500"
                    >
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <Checkbox
                      id="checkbox-name-3"
                      aria-describedby="checkbox-name-3-description"
                      name="checkbox-name-3"
                    />
                  </div>
                  <div className="ml-3 text-sm/6">
                    <Label htmlFor="checkbox-name-3" className="font-medium">
                      Enable email notifications for model deployment activities
                    </Label>
                    <p
                      id="checkbox-name-3-description"
                      className="text-gray-500 dark:text-gray-500"
                    >
                      Labore et dolore magna aliquyam erat. Lorem ipsum dolor
                      sit amet, consetetur sadipscing elitr.{' '}
                      <a
                        href="#"
                        className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                      >
                        Go to email settings
                        <RiExternalLinkLine
                          className="size-4"
                          aria-hidden="true"
                        />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider className="!my-10" />
          <div className="flex items-center justify-end space-x-4">
            <Button variant="secondary">Cancel</Button>
            <Button>Save settings</Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-06.tsx

```tsx
'use client';

import { Button } from '@/components/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/Table';
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';

const data = [
  //array-start
  {
    name: 'Alissia Stone',
    email: 'a.stone@gmail.com',
    role: 'Admin',
    href: '#',
  },
  {
    name: 'Emma Bern',
    email: 'e.bern@gmail.com',
    role: 'Guest',
    href: '#',
  },
  {
    name: 'Aaron Wave',
    email: 'a.flow@acme.com',
    role: 'Guest',
    href: '#',
  },
  {
    name: 'Thomas Palstein',
    email: 't.palstein@acme.com',
    role: 'Member',
    href: '#',
  },
  {
    name: 'Sarah Johnson',
    email: 's.johnson@gmail.com',
    role: 'Admin',
    href: '#',
  },
  {
    name: 'Megan Brown',
    email: 'm.brown@gmail.com',
    role: 'Guest',
    href: '#',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
        General
      </h1>
      <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
        Manage your personal details, workspace governance and notifications.
      </p>
      <Tabs defaultValue="tab2" className="mt-8">
        <TabsList variant="line">
          <TabsTrigger value="tab1">Account details</TabsTrigger>
          <TabsTrigger value="tab2">Users</TabsTrigger>
          <TabsTrigger value="tab3">Billing</TabsTrigger>
        </TabsList>
        {/* Content below only for demo purpose placed outside of <Tab> component. Add <TabPanels>, <TabPanel> to make it functional and to add content for other tabs */}
        <div className="mt-6 sm:flex sm:items-start sm:justify-between sm:space-x-8">
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-gray-50">
              Users
            </h2>
            <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
              Workspace administrators can add, manage, and remove members.
            </p>
          </div>
          <Button className="mt-4 sm:mt-0">Add user</Button>
        </div>
        <TableRoot className="mt-10">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Member</TableHeaderCell>
                <TableHeaderCell>Users</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
                <TableHeaderCell>
                  <span className="sr-only">Edit member</span>
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((member) => (
                <TableRow
                  key={member.name}
                  className="hover:bg-gray-50 hover:dark:bg-gray-900"
                >
                  <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                    {member.name}
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell className="text-right">
                    <a
                      href={member.href}
                      className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 hover:dark:text-blue-400"
                    >
                      Edit<span className="sr-only">{member.name}</span>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
      </Tabs>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-07.tsx

```tsx
'use client';

import { Button } from '@/components/Button';
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';

const data = [
  //array-start
  {
    name: 'Alissia Stone',
    initials: 'AS',
    email: 'a.stone@gmail.com',
    href: '#',
  },
  {
    name: 'Emma Bern',
    initials: 'EB',
    email: 'e.bern@gmail.com',
    href: '#',
  },
  {
    name: 'Aaron Wave',
    initials: 'AW',
    email: 'a.flow@acme.com',
    href: '#',
  },
  {
    name: 'Thomas Palstein',
    initials: 'TP',
    email: 't.palstein@acme.com',
    href: '#',
  },
  {
    name: 'Sarah Johnson',
    initials: 'SJ',
    email: 's.johnson@gmail.com',
    href: '#',
  },
  {
    name: 'Megan Brown',
    initials: 'MB',
    email: 'm.brown@gmail.com',
    href: '#',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
        General
      </h1>
      <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
        Manage your personal details, workspace governance and notifications.
      </p>
      <Tabs defaultValue="tab2" className="mt-8">
        <TabsList variant="line">
          <TabsTrigger value="tab1">Account details</TabsTrigger>
          <TabsTrigger value="tab2">Users</TabsTrigger>
          <TabsTrigger value="tab3">Billing</TabsTrigger>
        </TabsList>
        {/* Content below only for demo purpose placed outside of <Tab> component. Add <TabPanels>, <TabPanel> to make it functional and to add content for other tabs */}
        <div className="mt-6 sm:flex sm:items-start sm:justify-between sm:space-x-8">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-50">
              Users
            </h3>
            <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
              Workspace administrators can add, manage, and remove members.
            </p>
          </div>
          <Button className="mt-4 sm:mt-0">Add user</Button>
        </div>
        <ul
          role="list"
          className="mt-10 divide-y divide-gray-200 dark:divide-gray-800"
        >
          {data.map((member) => (
            <li
              key={member.name}
              className="flex items-center justify-between space-x-4 py-4"
            >
              <div className="flex items-center space-x-4 truncate">
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
                  aria-hidden="true"
                >
                  {member.initials}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {member.email}
                  </p>
                </div>
              </div>
              <Button variant="secondary" asChild>
                <a href={member.href}>Edit</a>
              </Button>
            </li>
          ))}
        </ul>
      </Tabs>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-08.tsx

```tsx
'use client';

import { RiExternalLinkLine } from '@remixicon/react';

import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { Input } from '@/components/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/Table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const existingUsers = [
  //array-start
  {
    name: 'Alissia Stone',
    email: 'a.stone@gmail.com',
    role: 'Admin',
    href: '#',
  },
  {
    name: 'Emma Bern',
    email: 'e.bern@gmail.com',
    role: 'Guest',
    href: '#',
  },
  {
    name: 'Aaron Wave',
    email: 'a.flow@acme.com',
    role: 'Guest',
    href: '#',
  },
  {
    name: 'Thomas Palstein',
    email: 't.palstein@acme.com',
    role: 'Member',
    href: '#',
  },
  {
    name: 'Sarah Johnson',
    email: 's.johnson@gmail.com',
    role: 'Admin',
    href: '#',
  },
  {
    name: 'Megan Brown',
    email: 'm.brown@gmail.com',
    role: 'Guest',
    href: '#',
  },
  //array-end
];

const pendingUsers = [
  //array-start
  {
    name: 'Mike Mueller',
    email: 'm.mueller@gmail.com',
    role: 'Admin',
    href: '#',
  },
  //array-end
];

const roles = [
  //array-start
  {
    name: 'Guest',
    value: '1',
  },
  {
    name: 'Member',
    value: '2',
  },
  {
    name: 'Admin',
    value: '3',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="sm:mx-auto sm:max-w-2xl">
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
          General
        </h1>
        <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
          Manage your workspace, team members and notifications.
        </p>
        <h2 className="mt-8 font-semibold text-gray-900 dark:text-gray-50">
          Invite new users
        </h2>
        <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
          Workspace administrators can add, manage, and remove members.{' '}
          <a
            href="#"
            className="inline-flex items-center gap-1 text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
          >
            Learn more about roles
            <RiExternalLinkLine className="size-4" aria-hidden="true" />
          </a>
        </p>
        <div className="max-w-3xl">
          <form className="mt-6 sm:flex sm:items-center sm:space-x-2">
            <Select defaultValue="1">
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-2 flex w-full items-center space-x-2 sm:mt-0">
              <Input placeholder="Add email..." type="email" />
              <Button className="text-base sm:text-sm">Invite</Button>
            </div>
          </form>
          <Divider className="!my-10" />
          <Tabs defaultValue="tab1" className="mt-8">
            <TabsList variant="line">
              <TabsTrigger value="tab1">Existing users</TabsTrigger>
              <TabsTrigger value="tab2">Pending invitations</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="mt-4 sm:flex sm:items-center sm:space-x-2">
                <Input placeholder="Search users..." type="search" />
                <Select defaultValue="1">
                  <SelectTrigger className="mt-2 sm:mt-0 sm:w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((item) => (
                      <SelectItem key={item.name} value={item.value}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <TableRoot className="mt-3">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="text-xs uppercase text-gray-500 dark:text-gray-500">
                        Member
                      </TableHeaderCell>
                      <TableHeaderCell className="text-xs uppercase text-gray-500 dark:text-gray-500">
                        Email
                      </TableHeaderCell>
                      <TableHeaderCell className="text-xs uppercase text-gray-500 dark:text-gray-500">
                        Role
                      </TableHeaderCell>
                      <TableHeaderCell>
                        <span className="sr-only">Edit member</span>
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {existingUsers.map((member) => (
                      <TableRow
                        key={member.name}
                        className="hover:bg-gray-50 hover:dark:bg-gray-900"
                      >
                        <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                          {member.name}
                        </TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell className="text-right">
                          <a
                            href={member.href}
                            className="font-medium text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                          >
                            Edit<span className="sr-only">{member.name}</span>
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableRoot>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="mt-4 sm:flex sm:items-center sm:space-x-2">
                <Input placeholder="Search users..." type="search" />
                <Select defaultValue="1">
                  <SelectTrigger className="mt-2 sm:mt-0 sm:w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((item) => (
                      <SelectItem key={item.name} value={item.value}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <TableRoot className="mt-3">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="text-xs uppercase text-gray-500 dark:text-gray-500">
                        Member
                      </TableHeaderCell>
                      <TableHeaderCell className="text-xs uppercase text-gray-500 dark:text-gray-500">
                        Email
                      </TableHeaderCell>
                      <TableHeaderCell className="text-xs uppercase text-gray-500 dark:text-gray-500">
                        Role
                      </TableHeaderCell>
                      <TableHeaderCell>
                        <span className="sr-only">Edit member</span>
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingUsers.map((member) => (
                      <TableRow
                        key={member.name}
                        className="hover:bg-gray-50 hover:dark:bg-gray-900"
                      >
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell className="text-right">
                          <a
                            href={member.href}
                            className="font-medium text-blue-600 hover:underline hover:underline-offset-4 dark:text-blue-400"
                          >
                            Edit<span className="sr-only">{member.name}</span>
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableRoot>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-09.tsx

```tsx
'use client';

import { RiExternalLinkLine } from '@remixicon/react';

import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { Input } from '@/components/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/Table';
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';

const data = [
  //array-start
  {
    name: 'Alissia Stone',
    email: 'a.stone@gmail.com',
    role: 'Admin',
    href: '#',
  },
  {
    name: 'Emma Bern',
    email: 'e.bern@gmail.com',
    role: 'Guest',
    href: '#',
  },
  {
    name: 'Aaron Wave',
    email: 'a.flow@acme.com',
    role: 'Guest',
    href: '#',
  },
  {
    name: 'Thomas Palstein',
    email: 't.palstein@acme.com',
    role: 'Member',
    href: '#',
  },
  {
    name: 'Sarah Johnson',
    email: 's.johnson@gmail.com',
    role: 'Admin',
    href: '#',
  },
  {
    name: 'Megan Brown',
    email: 'm.brown@gmail.com',
    role: 'Guest',
    href: '#',
  },
  //array-end
];

const roles = [
  //array-start
  {
    name: 'Guest',
    value: '1',
  },
  {
    name: 'Member',
    value: '2',
  },
  {
    name: 'Admin',
    value: '3',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
        General
      </h3>
      <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
        Manage your personal details, workspace governance and notifications.
      </p>
      <Tabs defaultValue="tab2" className="mt-8">
        <TabsList variant="line">
          <TabsTrigger value="tab1">Account details</TabsTrigger>
          <TabsTrigger value="tab2">Users</TabsTrigger>
          <TabsTrigger value="tab3">Billing</TabsTrigger>
        </TabsList>
        {/* Content below only for demo purpose placed outside of <Tab> component. Add <TabPanels>, <TabPanel> to make it functional and to add content for other tabs */}
        <h2 className="mt-8 font-semibold text-gray-900 dark:text-gray-50">
          Invite new users
        </h2>
        <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
          Workspace administrators can add, manage, and remove members.{' '}
          <a
            href="#"
            className="inline-flex items-center gap-1 text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
          >
            Learn more about roles
            <RiExternalLinkLine className="size-4" aria-hidden="true" />
          </a>
        </p>
        <div className="max-w-3xl">
          <form className="mt-6 sm:flex sm:items-center sm:space-x-2">
            <Select defaultValue="1">
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-2 flex w-full items-center space-x-2 sm:mt-0">
              <Input placeholder="Add email..." type="email" />
              <Button className="text-base sm:text-sm">Invite</Button>
            </div>
          </form>
          <Divider className="!my-10" />
          <h2 className="mt-6 font-semibold text-gray-900 dark:text-gray-50">
            Existing users
          </h2>
          <div className="mt-4 sm:flex sm:items-center sm:space-x-2">
            <Input placeholder="Search users..." type="search" />
            <Select defaultValue="1">
              <SelectTrigger className="mt-2 sm:mt-0 sm:w-32">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <TableRoot className="mt-6">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Member</TableHeaderCell>
                  <TableHeaderCell>Email</TableHeaderCell>
                  <TableHeaderCell>Role</TableHeaderCell>
                  <TableHeaderCell>
                    <span className="sr-only">Edit member</span>
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((member) => (
                  <TableRow
                    key={member.name}
                    className="hover:bg-gray-50 hover:dark:bg-gray-900"
                  >
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell className="text-right">
                      <a
                        href={member.href}
                        className="font-medium text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                      >
                        Edit<span className="sr-only">{member.name}</span>
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableRoot>
        </div>
      </Tabs>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-10.tsx

```tsx
'use client';

import { RiDeleteBin4Fill } from '@remixicon/react';

import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

const members = [
  //array-start
  {
    id: 1,
    email: 'max@company.com',
    initials: 'MA',
  },
  {
    id: 2,
    email: 'john@company.com',
    initials: 'JO',
  },
  {
    id: 3,
    email: 'emma@company.com',
    initials: 'EM',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="sm:mx-auto sm:max-w-2xl">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Create workspace
        </h1>
        <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
          Workspaces are shared environments where teams can connect to data
          sources, run queries and create reports.
        </p>
        <form action="#" method="POST" className="mt-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="workspace-name" className="font-medium">
                Name<span className="text-red-500 dark:text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="workspace-name"
                name="workspace-name"
                placeholder="My workspace"
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="members" className="font-medium">
                Members
              </Label>
              <div className="mt-2 flex items-center space-x-2">
                <Input
                  type="email"
                  id="members"
                  name="members"
                  placeholder="Add member emails"
                />
                <Button className="text-base sm:text-sm">Add</Button>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900 dark:text-gray-50">
              People added to workspace
            </h2>
            <ul
              role="list"
              className="mt-2 divide-y divide-gray-200 dark:divide-gray-800"
            >
              {members.map((member) => (
                <li
                  key={member.id}
                  className="flex items-center justify-between py-2.5 text-sm"
                >
                  <div className="flex items-center space-x-4">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs uppercase text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
                      aria-hidden="true"
                    >
                      {member.initials}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {member.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-500 dark:text-gray-500 hover:dark:text-gray-300"
                  >
                    <RiDeleteBin4Fill
                      className="size-5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Remove {member.email}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <Divider />
          <div className="flex items-center justify-end space-x-4">
            <Button variant="secondary">Cancel</Button>
            <Button type="submit">Create workspace</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-11.tsx

```tsx
'use client';

import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Divider } from '@/components/Divider';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="sm:mx-auto sm:max-w-2xl">
        <h1 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-50">
          Account details
        </h1>
        <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
          Update personal information used for account management and billing.
        </p>
        <form action="#" method="post" className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="first-name" className="font-medium">
                First name
              </Label>
              <Input
                type="text"
                id="first-name"
                name="first-name"
                autoComplete="given-name"
                placeholder="Emma"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="last-name" className="font-medium">
                Last name
              </Label>
              <Input
                type="text"
                id="last-name"
                name="last-name"
                autoComplete="family-name"
                placeholder="Crown"
                className="mt-2"
              />
            </div>
            <div className="col-span-full">
              <Label htmlFor="email" className="font-medium">
                Email
              </Label>
              <Input
                type="text"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="emma@company.com"
                className="mt-2"
              />
            </div>
            <div className="col-span-full">
              <Label htmlFor="address" className="font-medium">
                Address
              </Label>
              <Input
                type="text"
                id="address"
                name="address"
                autoComplete="street-address"
                placeholder="29 Park Street"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <Label htmlFor="state" className="font-medium">
                Country
              </Label>
              <Input
                type="text"
                id="country"
                name="country"
                autoComplete="country-name"
                placeholder="Switzerland"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <Label htmlFor="city" className="font-medium">
                City
              </Label>
              <Input
                type="text"
                id="city"
                name="city"
                autoComplete="address-level2"
                placeholder="Zurich"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <Label htmlFor="postal-code" className="font-medium">
                ZIP / Postal code
              </Label>
              <Input
                id="postal-code"
                name="postal-code"
                autoComplete="postal-code"
                placeholder="8000"
                className="mt-2"
              />
            </div>
          </div>
          <Divider className="!my-12" />
          <div>
            <h2 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-50">
              Notifications
            </h2>
            <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
              Manage your personal notification settings for this workspace.
              Read the{' '}
              <a
                href="#"
                className="text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
              >
                governance documentation
              </a>{' '}
              to learn more.
            </p>
            <div className="mt-8 space-y-6">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <Checkbox
                    id="form-option-1"
                    aria-describedby="form-option-1-description"
                    name="form-option-1"
                  />
                </div>
                <div className="ml-3 text-sm/6">
                  <Label htmlFor="form-option-1" className="font-medium">
                    Receive newsletter
                  </Label>
                  <p
                    id="form-option-1-description"
                    className="text-gray-500 dark:text-gray-500"
                  >
                    I want to receive updates from Company about relevant
                    products or services.
                  </p>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <Checkbox
                    id="form-option-2"
                    aria-describedby="form-option-2-description"
                    name="form-option-2"
                  />
                </div>
                <div className="ml-3 text-sm/6">
                  <Label htmlFor="form-option-2" className="font-medium">
                    Member activities
                  </Label>
                  <p
                    id="form-option-2-description"
                    className="text-gray-500 dark:text-gray-500"
                  >
                    Stay informed and receive notifications when new team
                    members join or leave this workspace.
                  </p>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <Checkbox
                    id="form-option-3"
                    aria-describedby="form-option-3-description"
                    name="form-option-3"
                  />
                </div>
                <div className="ml-3 text-sm/6">
                  <Label htmlFor="form-option-3" className="font-medium">
                    Deployment activities
                  </Label>
                  <p
                    id="form-option-3-description"
                    className="text-gray-500 dark:text-gray-500"
                  >
                    Receive notifications of successful or failed deployment of
                    this workspace. Read the{' '}
                    <a
                      href="#"
                      className="text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                    >
                      Workspace documentation
                    </a>{' '}
                    to learn more.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex items-center justify-end space-x-4">
            <Button variant="secondary">Cancel</Button>
            <Button>Save settings</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-12.tsx

```tsx
'use client';

import { RiDeleteBin4Fill } from '@remixicon/react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';

const existingMembers = [
  //array-start
  {
    name: 'Max Miller',
    email: 'max@company.com',
    initials: 'MM',
    status: 'member',
  },
  {
    name: 'Lena Wave',
    email: 'lena@company.com',
    initials: 'LW',
    status: 'member',
  },
  {
    name: 'Emma Ross',
    email: 'emma@company.com',
    initials: 'ER',
    status: 'member',
  },
  //array-end
];

const invitedMembers = [
  //array-start
  {
    name: 'Tom Crown',
    email: 'tom@company.com',
    initials: 'TC',
  },
  {
    name: 'John Doe',
    email: 'john@company.com',
    initials: 'JD',
  },
  {
    name: 'Michael Crombie',
    email: 'michael@company.com',
    initials: 'MC',
  },
  //array-end
];

const options = [
  //array-start
  {
    name: 'Guest',
    value: '1',
  },
  {
    name: 'Member',
    value: '2',
  },
  {
    name: 'Admin',
    value: '3',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="sm:mx-auto sm:max-w-2xl">
        <h1 className="font-semibold text-gray-900 dark:text-gray-50">
          Invite members
        </h1>
        <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
          Add new team members to your workspace. Please consider your
          organization's policies when adding external people.
        </p>
        <form className="mt-6 sm:flex sm:items-center sm:space-x-2">
          <Select defaultValue="1">
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {options.map((item) => (
                <SelectItem key={item.name} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-2 flex w-full items-center space-x-2 sm:mt-0">
            <Input id="inviteEmail" placeholder="Add email..." type="email" />
            <Button className="text-base sm:text-sm">Invite</Button>
          </div>
        </form>
        <h2 className="mt-6 text-sm font-medium text-gray-900 dark:text-gray-50">
          People with existing access
        </h2>
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 dark:divide-gray-800"
        >
          {existingMembers.map((member) => (
            <li
              key={member.name}
              className="flex items-center justify-between py-2.5 text-sm"
            >
              <div className="flex items-center space-x-4">
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-400 text-xs text-white dark:bg-gray-600 dark:text-white"
                  aria-hidden="true"
                >
                  {member.initials}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {member.name}
                </span>
              </div>
              <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:ring-gray-800">
                {member.status}
              </span>
            </li>
          ))}
        </ul>

        {/* note to user: list that can be shown when users have been invited */}
        <h2 className="mt-6 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          More people with access
        </h2>
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 dark:divide-gray-800"
        >
          {invitedMembers.map((member) => (
            <li
              key={member.name}
              className="flex items-center justify-between space-x-4 py-2.5 text-sm"
            >
              <div className="flex items-center space-x-4 truncate">
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-dashed border-gray-300 bg-white text-xs uppercase text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-500"
                  aria-hidden="true"
                >
                  {member.initials}
                </span>
                <span className="truncate text-gray-700 dark:text-gray-300">
                  {member.email}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center whitespace-nowrap rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                  Pending invitation
                </span>

                <Button
                  variant="ghost"
                  className="p-2 !text-gray-500 hover:!bg-red-50 hover:!text-red-500 dark:!text-gray-500 hover:dark:!text-gray-300"
                >
                  <RiDeleteBin4Fill
                    className="size-5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Remove {member.email}</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-13.tsx

```tsx
'use client';

import { RiDeleteBin7Line } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { Label } from '@/components/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';

const existingUsers = [
  //array-start
  {
    name: 'Lena Stone',
    email: 'lena.stone@company.com',
    initials: 'LS',
    currentRole: 'Admin',
    color: 'bg-blue-500',
  },
  {
    name: 'John Miller',
    email: 'john.miller@company.com',
    initials: 'JM',
    currentRole: 'Guest',
    color: 'bg-fuchsia-500',
  },
  {
    name: 'Emma Crombie',
    email: 'emma.crombie@company.com',
    initials: 'EC',
    currentRole: 'Guest',
    color: 'bg-violet-500',
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    initials: 'SJ',
    currentRole: 'Member',
    color: 'bg-pink-500',
  },
  {
    name: 'Alex Carter',
    email: 'alex.carter@company.com',
    initials: 'AC',
    currentRole: 'Member',
    color: 'bg-indigo-500',
  },
  //array-end
];

const pendingUsers = [
  //array-start
  {
    name: 'Mike River',
    email: 'mike.river@company.com',
    initials: 'MR',
    color: 'bg-indigo-500',
  },
  {
    name: 'Aaron Hill',
    email: 'aaron.hill@company.com',
    initials: 'AH',
    color: 'bg-fuchsia-500',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
        General
      </h1>
      <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
        Manage your personal details, workspace governance and notifications.
      </p>
      <Tabs defaultValue="tab2" className="mt-8">
        <TabsList variant="line">
          <TabsTrigger value="tab1">Account details</TabsTrigger>
          <TabsTrigger value="tab2">Users</TabsTrigger>
          <TabsTrigger value="tab3">Billing</TabsTrigger>
        </TabsList>
        {/* Content below only for demo purpose placed outside of <Tab> component. Add <TabPanels>, <TabPanel> to make it functional and to add content for other tabs */}
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-3">
          <div>
            <h2 className="font-medium text-gray-900 dark:text-gray-50">
              Members
            </h2>
            <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
              Manage roles of existing members. As an admin, you can add, edit
              or delete users.
            </p>
            <Button className="mt-4">Invite member</Button>
          </div>
          <form action="#" method="post" className="lg:col-span-2">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-800"
            >
              {existingUsers.map((user) => (
                <li
                  key={user.name}
                  className="block py-3 md:flex md:items-center md:justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <span
                      className={cx(
                        user.color,
                        'flex size-9 shrink-0 items-center justify-center rounded-full text-xs text-white dark:text-white',
                      )}
                      aria-hidden="true"
                    >
                      {user.initials}
                    </span>
                    <div>
                      <Label htmlFor={user.name} className="font-medium">
                        {user.name}
                      </Label>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-2 md:mt-0">
                    <Select name={user.name} defaultValue={user.currentRole}>
                      <SelectTrigger className="w-full md:w-44">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Guest">Guest</SelectItem>
                        <SelectItem value="Member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-500 dark:text-gray-500 hover:dark:text-gray-300"
                    >
                      <RiDeleteBin7Line
                        className="size-5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Remove {user.name}</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </form>
        </div>
        <Divider />
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-3">
          <div>
            <h2 className="font-medium text-gray-900 dark:text-gray-50">
              Pending Invites
            </h2>
            <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
              Invited users who haven't accepted their invitation yet.
            </p>
          </div>
          <form className="lg:col-span-2">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-800"
            >
              {pendingUsers.map((user) => (
                <li
                  key={user.name}
                  className="block py-3 md:flex md:items-center md:justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <span
                      className={cx(
                        user.color,
                        'flex size-9 shrink-0 items-center justify-center rounded-full text-xs text-white dark:text-white',
                      )}
                      aria-hidden="true"
                    >
                      {user.initials}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-2 md:mt-0">
                    <Button
                      variant="secondary"
                      className="w-full !text-blue-500 hover:!text-blue-600 dark:!text-blue-500 hover:dark:!text-blue-600 md:w-44"
                    >
                      Resend invite
                    </Button>
                    <Button variant="ghost">
                      <RiDeleteBin7Line
                        className="size-5 shrink-0 !text-gray-500 hover:!text-gray-700 dark:!text-gray-500 hover:dark:!text-gray-300"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </form>
        </div>
      </Tabs>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-14.tsx

```tsx
'use client';

import { RiAddLine, RiMore2Fill } from '@remixicon/react';

import { Button } from '@/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';
import { Tooltip } from '@/components/Tooltip';

const users = [
  //array-start
  {
    name: 'Emma Stone',
    initials: 'ES',
    email: 'a.stone@gmail.com',
    role: 'viewer',
  },
  {
    name: 'Alissia McCalister',
    initials: 'AM',
    email: 'a.stone@gmail.com',
    role: 'viewer',
  },
  {
    name: 'Emily Luisa Bernacle',
    initials: 'EB',
    email: 'e.luis.bernacle@gmail.com',
    role: 'member',
  },
  {
    name: 'Aaron Wave',
    initials: 'AW',
    email: 'a.flow@acme.com',
    role: 'contributor',
  },
  {
    name: 'Thomas Palstein',
    initials: 'TP',
    email: 't.palstein@acme.com',
    role: 'viewer',
  },
  {
    name: 'Sarah Johnson',
    initials: 'SJ',
    email: 's.johnson@gmail.com',
    role: 'admin',
  },
  {
    name: 'Megan Katherina Brown',
    initials: 'MB',
    email: 'm.lovelybrown@gmail.com',
    role: 'contributor',
  },
  //array-end
];

const roles = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'member',
    label: 'Member',
  },
  {
    value: 'viewer',
    label: 'Viewer',
  },
  {
    value: 'contributor',
    label: 'Contributor',
  },
];

const invitedUsers = [
  {
    initials: 'LP',
    email: 'lydia.posh@gmail.com',
    role: 'viewer',
    expires: 12,
  },
  {
    initials: 'AW',
    email: 'awidburg@bluewin.ch',
    role: 'viewer',
    expires: 8,
  },
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h3
              id="existing-users"
              className="text-lg font-semibold text-gray-900 dark:text-gray-50"
            >
              Users
            </h3>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Workspace administrators can add, manage, and remove users.
            </p>
          </div>
          <Button className="mt-4 w-full gap-2 sm:mt-0 sm:w-fit">
            <RiAddLine className="-ml-1 size-4 shrink-0" aria-hidden="true" />
            Add user
          </Button>
        </div>
        <ul
          role="list"
          className="mt-6 divide-y divide-gray-200 dark:divide-gray-800"
        >
          {users.map((user) => (
            <li
              key={user.name}
              className="flex items-center justify-between gap-x-6 py-2.5"
            >
              <div className="flex items-center gap-x-4 truncate">
                <span
                  className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 sm:flex"
                  aria-hidden="true"
                >
                  {user.initials}
                </span>
                <div className="truncate">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {user.role === 'admin' ? (
                  <Tooltip
                    content="A workspace must have at least one admin"
                    className="max-w-44 text-xs"
                    sideOffset={5}
                    triggerAsChild={true}
                  >
                    <div>
                      <Select
                        defaultValue={user.role}
                        disabled={user.role === 'admin'}
                      >
                        <SelectTrigger className="h-8 w-32">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          {roles.map((role) => (
                            <SelectItem
                              key={role.value}
                              value={role.value}
                              disabled={role.value === 'admin'}
                            >
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </Tooltip>
                ) : (
                  <Select
                    defaultValue={user.role}
                    disabled={user.role === 'admin'}
                  >
                    <SelectTrigger className="h-8 w-32">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent align="end">
                      {roles.map((role) => (
                        <SelectItem
                          key={role.value}
                          value={role.value}
                          disabled={role.value === 'admin'}
                        >
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="group size-8 hover:border hover:border-gray-300 hover:bg-gray-50 data-[state=open]:border-gray-300 data-[state=open]:bg-gray-50 hover:dark:border-gray-700 hover:dark:bg-gray-900 data-[state=open]:dark:border-gray-700 data-[state=open]:dark:bg-gray-900"
                    >
                      <RiMore2Fill
                        className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
                        aria-hidden="true"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem disabled={user.role === 'admin'}>
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 dark:text-red-500"
                      disabled={user.role === 'admin'}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        <h2
          id="pending-invitations"
          className="font-semibold text-gray-900 dark:text-gray-50"
        >
          Pending invitations
        </h2>
        <ul
          role="list"
          className="mt-6 divide-y divide-gray-200 dark:divide-gray-800"
        >
          {invitedUsers.map((user) => (
            <li
              key={user.initials}
              className="flex items-center justify-between gap-x-6 py-2.5"
            >
              <div className="flex items-center gap-x-4">
                <span
                  className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-dashed border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 sm:flex"
                  aria-hidden="true"
                >
                  {user.initials}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    Expires in {user.expires} days
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue={user.role}>
                  <SelectTrigger className="h-8 w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {roles.map((role) => (
                      <SelectItem
                        key={role.value}
                        value={role.value}
                        disabled={role.value === 'admin'}
                      >
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="group size-8 hover:border hover:border-gray-300 hover:bg-gray-50 data-[state=open]:border-gray-300 data-[state=open]:bg-gray-50 hover:dark:border-gray-700 hover:dark:bg-gray-900 data-[state=open]:dark:border-gray-700 data-[state=open]:dark:bg-gray-900"
                    >
                      <RiMore2Fill
                        className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
                        aria-hidden="true"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem
                      className="text-red-600 dark:text-red-500"
                      disabled={user.role === 'admin'}
                    >
                      Revoke invitation
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### src/content/components/account-and-user-management/account-and-user-management-15.tsx

```tsx
'use client';

import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiLink,
} from '@remixicon/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion';

interface Progress {
  current: number;
  total: number;
}

interface AuditDate {
  date: string;
  auditor: string;
}

interface Document {
  name: string;
  status: 'OK' | 'Needs update' | 'In audit';
}

interface Section {
  id: string;
  title: string;
  certified: string;
  progress: Progress;
  status: 'complete' | 'warning';
  auditDates: AuditDate[];
  documents: Document[];
}

export const sections: Section[] = [
  {
    id: 'item-1',
    title: 'CompTIA Security+',
    certified: 'ISO',
    progress: { current: 46, total: 46 },
    status: 'complete',
    auditDates: [
      { date: 'Dec 10, 2023', auditor: 'Max Duster' },
      { date: 'Dec 12, 2023', auditor: 'Emma Stone' },
    ],
    documents: [
      { name: 'policy_overview.xlsx', status: 'OK' },
      { name: 'employee_guidelines.xlsx', status: 'Needs update' },
      { name: 'compliance_checklist.xlsx', status: 'In audit' },
    ],
  },
  {
    id: 'item-2',
    title: 'SAFe Certifications',
    certified: 'IEC 2701',
    progress: { current: 32, total: 41 },
    status: 'warning',
    auditDates: [
      { date: 'Jan 15, 2024', auditor: 'Sarah Johnson' },
      { date: 'Jan 20, 2024', auditor: 'Mike Peters' },
    ],
    documents: [
      { name: 'certification_records.xlsx', status: 'OK' },
      { name: 'training_logs.xlsx', status: 'In audit' },
      { name: 'assessment_results.xlsx', status: 'Needs update' },
    ],
  },
  {
    id: 'item-3',
    title: 'PMP Certifications',
    certified: 'ISO',
    progress: { current: 21, total: 21 },
    status: 'complete',
    auditDates: [
      { date: 'Feb 5, 2024', auditor: 'Lisa Chen' },
      { date: 'Feb 8, 2024', auditor: 'Tom Wilson' },
    ],
    documents: [
      { name: 'project_documents.xlsx', status: 'OK' },
      { name: 'methodology_guide.xlsx', status: 'OK' },
      { name: 'best_practices.xlsx', status: 'In audit' },
    ],
  },
  {
    id: 'item-4',
    title: 'Cloud Certifications',
    certified: 'SOC 2',
    progress: { current: 21, total: 21 },
    status: 'complete',
    auditDates: [
      { date: 'Mar 1, 2024', auditor: 'Alex Kumar' },
      { date: 'Mar 5, 2024', auditor: 'Rachel Green' },
    ],
    documents: [
      { name: 'aws_certifications.xlsx', status: 'OK' },
      { name: 'azure_competencies.xlsx', status: 'OK' },
      { name: 'gcp_credentials.xlsx', status: 'In audit' },
      { name: 'cloud_security.xlsx', status: 'OK' },
    ],
  },
];

const getStatusIcon = (status: string) => {
  if (status === 'complete') {
    return (
      <RiCheckboxCircleFill className="size-[18px] shrink-0 text-emerald-600 dark:text-emerald-400" />
    );
  }
  return (
    <RiErrorWarningFill className="size-[18px] shrink-0 text-red-600 dark:text-red-400" />
  );
};

export default function Audits() {
  return (
    <div className="obfuscate">
      <Accordion type="multiple" className="mt-3">
        {sections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger className="py-5">
              <p className="flex w-full items-center justify-between pr-4">
                <span className="flex items-center gap-2.5">
                  <span>{section.title}</span>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-400/10 dark:text-gray-300">
                    {section.certified}
                  </span>
                </span>
                <span className="flex items-center gap-x-2 tabular-nums">
                  {getStatusIcon(section.status)}
                  {section.progress.current}/{section.progress.total}
                </span>
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <p className="flex items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-50">
                    <span>Audit round</span>
                    <span>Auditor</span>
                  </p>
                  <ul className="mt-1 divide-y divide-gray-200 text-sm text-gray-600 dark:divide-gray-800 dark:text-gray-400">
                    {section.auditDates.map((audit, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between py-2.5"
                      >
                        <span>{audit.date}</span>
                        <span>{audit.auditor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="flex items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-50">
                    <span>Related documents</span>
                    <span>Status</span>
                  </p>
                  <ul className="mt-1 divide-y divide-gray-200 text-gray-600 dark:divide-gray-800 dark:text-gray-400">
                    {section.documents.map((doc, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between py-2.5 text-sm"
                      >
                        <a
                          href="#"
                          className="flex items-center gap-2 text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                        >
                          <RiLink
                            className="size-4 shrink-0"
                            aria-hidden="true"
                          />
                          {doc.name}
                        </a>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="hover:text-gray-900 hover:underline hover:underline-offset-4 hover:dark:text-gray-50"
                          >
                            Edit
                          </button>
                          <span
                            className="h-4 w-px bg-gray-300 dark:bg-gray-700"
                            aria-hidden="true"
                          />
                          <button
                            type="button"
                            className="hover:text-gray-900 hover:underline hover:underline-offset-4 hover:dark:text-gray-50"
                          >
                            Re-Upload
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
```

### src/content/components/account-and-user-management/index.ts

```ts
export { default as AccountAndUserManagement01 } from './account-and-user-management-01';
export { default as AccountAndUserManagement02 } from './account-and-user-management-02';
export { default as AccountAndUserManagement03 } from './account-and-user-management-03';
export { default as AccountAndUserManagement04 } from './account-and-user-management-04';
export { default as AccountAndUserManagement05 } from './account-and-user-management-05';
export { default as AccountAndUserManagement06 } from './account-and-user-management-06';
export { default as AccountAndUserManagement07 } from './account-and-user-management-07';
export { default as AccountAndUserManagement08 } from './account-and-user-management-08';
export { default as AccountAndUserManagement09 } from './account-and-user-management-09';
export { default as AccountAndUserManagement10 } from './account-and-user-management-10';
export { default as AccountAndUserManagement11 } from './account-and-user-management-11';
export { default as AccountAndUserManagement12 } from './account-and-user-management-12';
export { default as AccountAndUserManagement13 } from './account-and-user-management-13';
export { default as AccountAndUserManagement14 } from './account-and-user-management-14';
export { default as AccountAndUserManagement15 } from './account-and-user-management-15';
```
