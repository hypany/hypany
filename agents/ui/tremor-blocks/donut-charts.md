# Components / donut-charts

[Back to index](index.md)

## Components / donut-charts

Files:
- `src/content/components/donut-charts/donut-chart-01.tsx`
- `src/content/components/donut-charts/donut-chart-02.tsx`
- `src/content/components/donut-charts/donut-chart-03.tsx`
- `src/content/components/donut-charts/donut-chart-04.tsx`
- `src/content/components/donut-charts/donut-chart-05.tsx`
- `src/content/components/donut-charts/donut-chart-06.tsx`
- `src/content/components/donut-charts/donut-chart-07.tsx`
- `src/content/components/donut-charts/index.ts`

### src/content/components/donut-charts/donut-chart-01.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { DonutChart } from '@/components/DonutChart';

const data = [
  //array-start
  {
    name: 'Travel',
    amount: 6730,
    share: '32.1%',
    color: 'bg-cyan-500 dark:bg-cyan-500',
  },
  {
    name: 'IT & equipment',
    amount: 4120,
    share: '19.6%',
    color: 'bg-blue-500 dark:bg-blue-500',
  },
  {
    name: 'Training & development',
    amount: 3920,
    share: '18.6%',
    color: 'bg-indigo-500 dark:bg-indigo-500',
  },
  {
    name: 'Office supplies',
    amount: 3210,
    share: '15.3%',
    color: 'bg-violet-500 dark:bg-violet-500',
  },
  {
    name: 'Communication',
    amount: 3010,
    share: '14.3%',
    color: 'bg-fuchsia-500 dark:bg-fuchsia',
  },
  //array-end
];

const currencyFormatter = (number: number) =>
  '$' + Intl.NumberFormat('us').format(number).toString();

export default function Example() {
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
          Total expenses by category
        </h3>
        <DonutChart
          className="mx-auto mt-8"
          data={data}
          category="name"
          value="amount"
          showLabel={true}
          valueFormatter={currencyFormatter}
          showTooltip={false}
          colors={['cyan', 'blue', 'indigo', 'violet', 'fuchsia']}
        />
        <p className="mt-8 flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>Category</span>
          <span>Amount / Share</span>
        </p>
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
        >
          {data.map((item) => (
            <li
              key={item.name}
              className="relative flex items-center justify-between py-2"
            >
              <div className="flex items-center space-x-2.5 truncate">
                <span
                  className={cx(item.color, 'size-2.5 shrink-0 rounded-sm')}
                  aria-hidden={true}
                />
                <span className="truncate dark:text-gray-300">{item.name}</span>
              </div>
              <p className="flex items-center space-x-2">
                <span className="font-medium tabular-nums text-gray-900 dark:text-gray-50">
                  {currencyFormatter(item.amount)}
                </span>
                <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium tabular-nums text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {item.share}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
```

### src/content/components/donut-charts/donut-chart-02.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { ProgressCircle } from '@/components/ProgressCircle';

const data = [
  //array-start
  {
    region: 'Europe',
    value: 56.5,
    color: 'bg-amber-500 dark:bg-amber-500',
    href: '#',
    subregions: [
      {
        name: 'Central Europe',
        value: '1.2/2M',
      },
      {
        name: 'North Europe',
        value: '2/2.8M',
      },
    ],
  },
  {
    region: 'Asia',
    value: 66.4,
    color: 'bg-emerald-500 dark:bg-emerald-500',
    href: '#',
    subregions: [
      {
        name: 'China',
        value: '3.1/4M',
      },
      {
        name: 'Japan',
        value: '2/2.8M',
      },
    ],
  },
  {
    region: 'North America',
    value: 76.1,
    color: 'bg-blue-500 dark:bg-blue-500',
    href: '#',
    subregions: [
      {
        name: 'USA',
        value: '5.9/7M',
      },
      {
        name: 'Canada',
        value: '1.8/2.5M',
      },
    ],
  },
  //array-end
];

export default function Example() {
  return (
    <>
      <Card className="!p-0 sm:mx-auto sm:max-w-xl">
        <div className="border-b border-gray-200 px-4 py-4 dark:border-gray-900">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Sales potential realization ($)
          </h3>
        </div>
        <div className="items-start p-6 sm:flex sm:space-x-10">
          <ProgressCircle value={76.1} radius={70} strokeWidth={7}>
            <ProgressCircle
              value={66.4}
              radius={60}
              strokeWidth={7}
              variant="success"
            >
              <ProgressCircle
                value={56.5}
                radius={50}
                strokeWidth={7}
                variant="warning"
              >
                <p>
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    7.8
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    /10
                  </span>
                </p>
              </ProgressCircle>
            </ProgressCircle>
          </ProgressCircle>
          <ul role="list" className="mt-4 w-full sm:mt-0">
            {data.map((region) => (
              <li
                key={region.region}
                className="relative rounded-md px-3 py-2 hover:bg-gray-50 hover:dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className={cx(region.color, 'size-2.5 rounded-sm')}
                      aria-hidden={true}
                    />
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      <a href={region.href} className="focus:outline-none">
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden={true} />
                        {region.region}
                      </a>
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    {region.value}&#37;
                  </p>
                </div>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
                >
                  {region.subregions.map((subregion) => (
                    <li
                      key={subregion.name}
                      className="flex items-center justify-between py-2"
                    >
                      <span>{subregion.name}</span>
                      <span>{subregion.value}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </>
  );
}
```

### src/content/components/donut-charts/donut-chart-03.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { DonutChart } from '@/components/DonutChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const dataByCategory = [
  //array-start
  {
    name: 'Travel',
    amount: 6730,
    share: '32.1%',
    color: 'bg-cyan-500 dark:bg-cyan-500',
  },
  {
    name: 'IT & equipment',
    amount: 4120,
    share: '19.6%',
    color: 'bg-blue-500 dark:bg-blue-500',
  },
  {
    name: 'Training & development',
    amount: 3920,
    share: '18.6%',
    color: 'bg-indigo-500 dark:bg-indigo-500',
  },
  {
    name: 'Office supplies',
    amount: 3210,
    share: '15.3%',
    color: 'bg-violet-500 dark:bg-violet-500',
  },
  {
    name: 'Communication',
    amount: 3010,
    share: '14.3%',
    color: 'bg-fuchsia-500 dark:bg-fuchsia-500',
  },
  //array-end
];

const dataByEmployee = [
  //array-start
  {
    name: 'Max Down',
    amount: 5710,
    share: '27.2%',
    color: 'bg-cyan-500 dark:bg-cyan-500',
  },
  {
    name: 'Lena Smith',
    amount: 4940,
    share: '23.5%',
    color: 'bg-blue-500 dark:bg-blue-500',
  },
  {
    name: 'Joe Doe',
    amount: 4523,
    share: '21.5%',
    color: 'bg-indigo-500 dark:bg-indigo-500',
  },
  {
    name: 'Kathy Miller',
    amount: 3240,
    share: '15.4%',
    color: 'bg-violet-500 dark:bg-violet-500',
  },
  {
    name: 'Nelly Wave',
    amount: 2577,
    share: '12.3%',
    color: 'bg-fuchsia-500 dark:bg-fuchsia-500',
  },
  //array-end
];

const summary = [
  //array-start
  {
    name: 'Category',
    data: dataByCategory,
  },
  {
    name: 'Employee',
    data: dataByEmployee,
  },
  //array-end
];

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="!p-0 sm:mx-auto sm:max-w-lg">
        <div className="px-6 pt-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Expenses breakdown
          </h3>
          <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
          </p>
        </div>
        <Tabs defaultValue={summary[0].name}>
          <TabsList className="px-6 pt-6">
            {summary.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                By {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="px-6 pb-6">
            {summary.map((category) => (
              <TabsContent key={category.name} value={category.name}>
                <DonutChart
                  className="mx-auto mt-8"
                  data={category.data}
                  value="amount"
                  category="name"
                  valueFormatter={currencyFormatter}
                  showLabel={true}
                  showTooltip={false}
                  colors={['cyan', 'blue', 'indigo', 'violet', 'fuchsia']}
                />
                <p className="mt-8 flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>{category.name}</span>
                  <span>Amount / Share</span>
                </p>
                <ul
                  role="list"
                  className="mt-2 divide-y divide-gray-200 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
                >
                  {category.data.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between space-x-6 py-2"
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span
                          className={cx(
                            item.color,
                            'size-2.5 shrink-0 rounded-sm',
                          )}
                          aria-hidden={true}
                        />
                        <span className="truncate dark:text-gray-300">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium tabular-nums text-gray-900 dark:text-gray-500">
                          {currencyFormatter(item.amount)}
                        </span>
                        <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium tabular-nums text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          {item.share}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
```

### src/content/components/donut-charts/donut-chart-04.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { DonutChart } from '@/components/DonutChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const dataByClass = [
  //array-start
  {
    name: 'Real estate',
    amount: 2095920,
    share: '80.5%',
    borderColor: 'border-blue-500 dark:border-blue-500',
  },
  {
    name: 'Stocks & ETFs',
    amount: 250120,
    share: '9.6%',
    borderColor: 'border-indigo-500 dark:border-indigo-500',
  },
  {
    name: 'Bonds',
    amount: 140110,
    share: '5.4%',
    borderColor: 'border-cyan-500 dark:border-cyan-500',
  },
  {
    name: 'Metals',
    amount: 72980,
    share: '2.8%',
    borderColor: 'border-purple-500 dark:border-purple-500',
  },
  {
    name: 'Cash & Cash Equivalent',
    amount: 42980,
    share: '1.7%',
    borderColor: 'border-fuchsia-500 dark:border-fuchsia-500',
  },
  //array-end
];

const dataBySector = [
  //array-start
  {
    name: 'Technology',
    amount: 950670,
    share: '36.5%',
    borderColor: 'border-blue-500 dark:border-blue-500',
  },
  {
    name: 'Financial services',
    amount: 750342,
    share: '28.8%',
    borderColor: 'border-indigo-500 dark:border-indigo-500',
  },
  {
    name: 'Consumer products',
    amount: 550709,
    share: '21.2%',
    borderColor: 'border-cyan-500 dark:border-cyan-500',
  },
  {
    name: 'Energy',
    amount: 200220,
    share: '7.7%',
    borderColor: 'border-purple-500 dark:border-purple-500',
  },
  {
    name: 'Media & Entertainment',
    amount: 150169,
    share: '5.8%',
    borderColor: 'border-fuchsia-500 dark:border-fuchsia-500',
  },
  //array-end
];

const summary = [
  {
    name: 'Class',
    data: dataByClass,
  },
  {
    name: 'Sector',
    data: dataBySector,
  },
];

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="!p-0 sm:mx-auto sm:max-w-lg">
        <div className="px-6 pt-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Expenses breakdown
          </h3>
          <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
          </p>
        </div>
        <Tabs defaultValue={summary[0].name}>
          <TabsList className="px-6 pt-6">
            {summary.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                By {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="px-6 pb-6">
            {summary.map((category) => (
              <TabsContent key={category.name} value={category.name}>
                <DonutChart
                  className="mx-auto mt-8"
                  data={category.data}
                  value="amount"
                  category="name"
                  valueFormatter={currencyFormatter}
                  showLabel={true}
                  showTooltip={false}
                  colors={['blue', 'indigo', 'cyan', 'purple', 'fuchsia']}
                />
                <p className="mt-8 flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>{category.name}</span>
                  <span>Amount / Share</span>
                </p>
                <ul
                  role="list"
                  className="mt-2 divide-y divide-gray-200 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
                >
                  {category.data.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between space-x-4 truncate py-2"
                    >
                      <div
                        className={cx(
                          item.borderColor,
                          'flex h-8 items-center truncate border-l-[2.5px] pl-4',
                        )}
                      >
                        <span className="truncate dark:text-gray-300">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-medium tabular-nums text-gray-900 dark:text-gray-50">
                        {currencyFormatter(item.amount)}{' '}
                        <span className="font-normal">({item.share})</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
```

### src/content/components/donut-charts/donut-chart-05.tsx

```tsx
'use client';

import { RiArrowRightSLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { DonutChart } from '@/components/DonutChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const dataByClass = [
  //array-start
  {
    name: 'Real estate',
    amount: 2095920,
    share: '80.5%',
    href: '#',
    borderColor: 'border-blue-500 dark:border-blue-500',
  },
  {
    name: 'Stocks & ETFs',
    amount: 250120,
    share: '9.6%',
    href: '#',
    borderColor: 'border-indigo-500 dark:border-indigo-500',
  },
  {
    name: 'Bonds',
    amount: 140110,
    share: '5.4%',
    href: '#',
    borderColor: 'border-cyan-500 dark:border-cyan-500',
  },
  {
    name: 'Metals',
    amount: 72980,
    share: '2.8%',
    href: '#',
    borderColor: 'border-purple-500 dark:border-purple-500',
  },
  {
    name: 'Cash & cash equivalent',
    amount: 42980,
    share: '1.7%',
    href: '#',
    borderColor: 'border-fuchsia-500 dark:border-fuchsia-500',
  },
  //array-end
];

const dataBySector = [
  //array-start
  {
    name: 'Technology',
    amount: 950670,
    share: '36.5%',
    href: '#',
    borderColor: 'border-blue-500 dark:border-blue-500',
  },
  {
    name: 'Financial services',
    amount: 750342,
    share: '28.8%',
    href: '#',
    borderColor: 'border-indigo-500 dark:border-indigo-500',
  },
  {
    name: 'Consumer products',
    amount: 550709,
    share: '21.2%',
    href: '#',
    borderColor: 'border-cyan-500 dark:border-cyan-500',
  },
  {
    name: 'Energy',
    amount: 200220,
    share: '7.7%',
    href: '#',
    borderColor: 'border-purple-500 dark:border-purple-500',
  },
  {
    name: 'Media & Entertainment',
    amount: 150169,
    share: '5.8%',
    href: '#',
    borderColor: 'border-fuchsia-500 dark:border-fuchsia-500',
  },
  //array-end
];

const summary = [
  //array-start
  {
    name: 'Class',
    data: dataByClass,
  },
  {
    name: 'Sector',
    data: dataBySector,
  },
  //array-end
];

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="overflow-hidden !p-0 sm:mx-auto sm:max-w-lg">
        <div className="px-6 pt-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Asset allocation
          </h3>
          <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
          </p>
        </div>
        <Tabs defaultValue={summary[0].name}>
          <TabsList className="px-6 pt-6">
            {summary.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                By {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="pt-8">
            {summary.map((category) => (
              <TabsContent key={category.name} value={category.name}>
                <div className="px-6 pb-6">
                  <DonutChart
                    className="mx-auto"
                    data={category.data}
                    value="amount"
                    category="name"
                    valueFormatter={currencyFormatter}
                    showLabel={true}
                    showTooltip={false}
                    colors={['blue', 'indigo', 'cyan', 'purple', 'fuchsia']}
                  />
                </div>
                <ul
                  role="list"
                  className="mt-2 divide-y divide-gray-200 border-t border-gray-200 text-sm text-gray-500 dark:divide-gray-800 dark:border-gray-900 dark:text-gray-500"
                >
                  {category.data.map((item) => (
                    <li
                      key={item.name}
                      className="group relative flex items-center justify-between space-x-4 truncate pr-4 hover:bg-gray-50 hover:dark:bg-gray-900"
                    >
                      <div
                        className={cx(
                          item.borderColor,
                          'flex h-12 items-center truncate border-l-2 pl-4',
                        )}
                      >
                        <span className="truncate group-hover:text-gray-700 dark:text-gray-300 group-hover:dark:text-gray-50">
                          <a href={item.href} className="focus:outline-none">
                            {/* extend link to entire list item */}
                            <span
                              className="absolute inset-0"
                              aria-hidden={true}
                            />
                            {item.name}
                          </a>
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-medium tabular-nums text-gray-900 dark:text-gray-50">
                          {currencyFormatter(item.amount)}{' '}
                          <span className="font-normal text-gray-500 dark:text-gray-500">
                            ({item.share})
                          </span>
                        </span>
                        <RiArrowRightSLine
                          className="size-4 shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-600 group-hover:dark:text-gray-500"
                          aria-hidden={true}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
```

### src/content/components/donut-charts/donut-chart-06.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { DonutChart } from '@/components/DonutChart';

const data = [
  //array-start
  {
    name: 'Real estate',
    amount: 2095920,
    share: '84.3%',
    href: '#',
    borderColor: 'bg-blue-500 dark:bg-blue-500',
  },
  {
    name: 'Stocks & ETFs',
    amount: 250120,
    share: '10.1%',
    href: '#',
    borderColor: 'bg-violet-500 dark:bg-violet-500',
  },
  {
    name: 'Cash & cash equivalent',
    amount: 140110,
    share: '5.6%',
    href: '#',
    borderColor: 'bg-fuchsia-500 dark:bg-fuchsia-500',
  },
  //array-end
];

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-xl">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
          Asset allocation
        </h3>
        <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-8">
          <DonutChart
            data={data}
            value="amount"
            category="name"
            valueFormatter={currencyFormatter}
            showTooltip={false}
            className="mx-auto h-40"
            showLabel={true}
            colors={['blue', 'violet', 'fuchsia']}
          />
          <div className="mt-6 flex items-center sm:mt-0">
            <ul role="list" className="space-y-3">
              {data.map((item) => (
                <li key={item.name} className="flex space-x-3">
                  <span
                    className={cx(item.borderColor, 'w-1 shrink-0 rounded')}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {currencyFormatter(item.amount)}{' '}
                      <span className="font-normal">({item.share})</span>
                    </p>
                    <p className="mt-0.5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                      {item.name}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

### src/content/components/donut-charts/donut-chart-07.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { DonutChart } from '@/components/DonutChart';

const data = [
  //array-start
  {
    name: 'Real estate',
    amount: 2095920,
    share: '84.3%',
    href: '#',
    borderColor: 'bg-blue-500 dark:bg-blue-500',
  },
  {
    name: 'Stocks & ETFs',
    amount: 250120,
    share: '10.1%',
    href: '#',
    borderColor: 'bg-violet-500 dark:bg-violet-500',
  },
  {
    name: 'Metals',
    amount: 160720,
    share: '10.1%',
    href: '#',
    borderColor: 'bg-fuchsia-500 dark:bg-fuchsia-500',
  },
  //array-enddev
];

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="max-w-7xl">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
          Asset allocation
        </h3>
        <div className="mt-6 lg:flex lg:items-end lg:justify-between">
          <div className="flex items-center justify-start space-x-4 lg:items-end">
            <DonutChart
              data={data}
              value="amount"
              category="name"
              valueFormatter={currencyFormatter}
              showTooltip={false}
              className="!h-20 !w-20"
              showLabel={false}
              colors={['blue', 'violet', 'fuchsia']}
            />
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                $2,450,790
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Total asset value
              </p>
            </div>
          </div>
          <ul
            role="list"
            className="mt-6 grid grid-cols-1 gap-px bg-gray-200 dark:bg-gray-800 lg:mt-0 lg:grid-cols-3"
          >
            {data.map((item) => (
              // Adjust dark:bg-gray-950 accordingly if a different dark mode background tone is set
              <li
                key={item.name}
                className="bg-white px-0 py-3 dark:bg-gray-950 lg:px-4 lg:py-0 lg:text-right"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                  {currencyFormatter(item.amount)}{' '}
                  <span className="font-normal">({item.share})</span>
                </p>
                <div className="flex items-center space-x-2 lg:justify-end">
                  <span
                    className={cx(
                      item.borderColor,
                      'size-2.5 shrink-0 rounded-sm',
                    )}
                    aria-hidden={true}
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {item.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

### src/content/components/donut-charts/index.ts

```ts
export { default as DonutChart01 } from './donut-chart-01';
export { default as DonutChart02 } from './donut-chart-02';
export { default as DonutChart03 } from './donut-chart-03';
export { default as DonutChart04 } from './donut-chart-04';
export { default as DonutChart05 } from './donut-chart-05';
export { default as DonutChart06 } from './donut-chart-06';
export { default as DonutChart07 } from './donut-chart-07';
```
