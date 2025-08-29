# Components / bar-charts

[Back to index](index.md)

## Components / bar-charts

Files:
- `src/content/components/bar-charts/bar-chart-01.tsx`
- `src/content/components/bar-charts/bar-chart-02.tsx`
- `src/content/components/bar-charts/bar-chart-03.tsx`
- `src/content/components/bar-charts/bar-chart-04.tsx`
- `src/content/components/bar-charts/bar-chart-05.tsx`
- `src/content/components/bar-charts/bar-chart-06.tsx`
- `src/content/components/bar-charts/bar-chart-07.tsx`
- `src/content/components/bar-charts/bar-chart-08.tsx`
- `src/content/components/bar-charts/bar-chart-09.tsx`
- `src/content/components/bar-charts/bar-chart-10.tsx`
- `src/content/components/bar-charts/bar-chart-11.tsx`
- `src/content/components/bar-charts/bar-chart-12.tsx`
- `src/content/components/bar-charts/index.ts`

### src/content/components/bar-charts/bar-chart-01.tsx

```tsx
'use client';

import React from 'react';

import { BarChart } from '@/components/BarChart';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { Label } from '@/components/Label';
import { Switch } from '@/components/Switch';

const data = [
  //array-start
  {
    date: 'Jan 23',
    'This Year': 68560,
    'Last Year': 28560,
  },
  {
    date: 'Feb 23',
    'This Year': 70320,
    'Last Year': 30320,
  },
  {
    date: 'Mar 23',
    'This Year': 80233,
    'Last Year': 70233,
  },
  {
    date: 'Apr 23',
    'This Year': 55123,
    'Last Year': 45123,
  },
  {
    date: 'May 23',
    'This Year': 56000,
    'Last Year': 80600,
  },
  {
    date: 'Jun 23',
    'This Year': 100000,
    'Last Year': 85390,
  },
  {
    date: 'Jul 23',
    'This Year': 85390,
    'Last Year': 45340,
  },
  {
    date: 'Aug 23',
    'This Year': 80100,
    'Last Year': 70120,
  },
  {
    date: 'Sep 23',
    'This Year': 75090,
    'Last Year': 69450,
  },
  {
    date: 'Oct 23',
    'This Year': 71080,
    'Last Year': 63345,
  },
  {
    date: 'Nov 23',
    'This Year': 61210,
    'Last Year': 100330,
  },
  {
    date: 'Dec 23',
    'This Year': 60143,
    'Last Year': 45321,
  },
  //array-end
];

function valueFormatter(number: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(number);
}

export default function Example() {
  const [showComparison, setShowComparison] = React.useState(false);
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-2xl">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50">
          Sales overview
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
        </p>
        <BarChart
          data={data}
          index="date"
          categories={
            showComparison ? ['Last Year', 'This Year'] : ['This Year']
          }
          colors={showComparison ? ['cyan', 'blue'] : ['blue']}
          valueFormatter={valueFormatter}
          yAxisWidth={50}
          className="mt-6 hidden h-60 sm:block"
        />
        <BarChart
          data={data}
          index="date"
          categories={
            showComparison ? ['Last Year', 'This Year'] : ['This Year']
          }
          colors={showComparison ? ['cyan', 'blue'] : ['blue']}
          valueFormatter={valueFormatter}
          showYAxis={false}
          className="mt-4 !h-56 sm:hidden"
        />
        <Divider />
        <div className="mb-2 flex items-center space-x-3">
          <Switch
            id="comparison"
            checked={showComparison}
            onCheckedChange={setShowComparison}
          />
          <Label htmlFor="comparison">Show same period last year</Label>
        </div>
      </Card>
    </div>
  );
}
```

### src/content/components/bar-charts/bar-chart-02.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { BarChart } from '@/components/BarChart';
import { Card } from '@/components/Card';

const tabs = [
  //array-start
  { name: 'Europe', value: '$1.9M', color: 'bg-blue-500 dark:bg-blue-500' },
  { name: 'Asia', value: '$4.1M', color: 'bg-cyan-500 dark:bg-cyan-500' },
  {
    name: 'North America',
    value: '$10.1M',
    color: 'bg-indigo-500 dark:bg-indigo-500',
  },
  //array-end
];

const data = [
  //array-start
  {
    date: 'Jan 23',
    Europe: 68560,
    Asia: 28560,
    'North America': 34940,
  },
  {
    date: 'Feb 23',
    Europe: 70320,
    Asia: 30320,
    'North America': 44940,
  },
  {
    date: 'Mar 23',
    Europe: 80233,
    Asia: 70233,
    'North America': 94560,
  },
  {
    date: 'Apr 23',
    Europe: 55123,
    Asia: 45123,
    'North America': 84320,
  },
  {
    date: 'May 23',
    Europe: 56000,
    Asia: 80600,
    'North America': 71120,
  },
  {
    date: 'Jun 23',
    Europe: 100000,
    Asia: 85390,
    'North America': 61340,
  },
  {
    date: 'Jul 23',
    Europe: 85390,
    Asia: 45340,
    'North America': 71260,
  },
  {
    date: 'Aug 23',
    Europe: 80100,
    Asia: 70120,
    'North America': 61210,
  },
  {
    date: 'Sep 23',
    Europe: 75090,
    Asia: 69450,
    'North America': 61110,
  },
  {
    date: 'Oct 23',
    Europe: 71080,
    Asia: 63345,
    'North America': 41430,
  },
  {
    date: 'Nov 23',
    Europe: 68041,
    Asia: 61210,
    'North America': 100330,
  },
  {
    date: 'Dec 23',
    Europe: 60143,
    Asia: 45321,
    'North America': 80780,
  },
  //array-end
];

function valueFormatter(number: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(number);
}

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-2xl">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50">
          Sales breakdown by regions
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Check sales of top 3 regions over time
        </p>
        <ul
          role="list"
          className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3"
        >
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className="rounded-md border border-gray-200 px-3 py-2 text-left dark:border-gray-800"
            >
              <div className="flex items-center space-x-1.5">
                <span
                  className={cx(tab.color, 'size-2.5 rounded-sm')}
                  aria-hidden={true}
                />
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {tab.name}
                </p>
              </div>
              <p className="mt-0.5 font-semibold text-gray-900 dark:text-gray-50">
                {tab.value}
              </p>
            </li>
          ))}
        </ul>
        <BarChart
          data={data}
          index="date"
          categories={['Europe', 'Asia', 'North America']}
          colors={['blue', 'cyan', 'indigo']}
          showLegend={false}
          valueFormatter={valueFormatter}
          yAxisWidth={50}
          type="stacked"
          className="mt-6 hidden !h-56 sm:block"
        />
        <BarChart
          data={data}
          index="date"
          categories={['Europe', 'Asia', 'North America']}
          colors={['blue', 'cyan', 'indigo']}
          showLegend={false}
          valueFormatter={valueFormatter}
          showYAxis={false}
          type="stacked"
          className="mt-6 !h-48 sm:hidden"
        />
      </Card>
    </div>
  );
}
```

### src/content/components/bar-charts/bar-chart-03.tsx

```tsx
'use client';

import { BarChart } from '@/components/BarChart';
import { Card } from '@/components/Card';

const data = [
  //array-start
  {
    date: 'Jan 23',
    'This Year': 68560,
    'Last Year': 28560,
  },
  {
    date: 'Feb 23',
    'This Year': 70320,
    'Last Year': 30320,
  },
  {
    date: 'Mar 23',
    'This Year': 80233,
    'Last Year': 70233,
  },
  {
    date: 'Apr 23',
    'This Year': 55123,
    'Last Year': 45123,
  },
  {
    date: 'May 23',
    'This Year': 56000,
    'Last Year': 80600,
  },
  {
    date: 'Jun 23',
    'This Year': 100000,
    'Last Year': 85390,
  },
  {
    date: 'Jul 23',
    'This Year': 85390,
    'Last Year': 45340,
  },
  {
    date: 'Aug 23',
    'This Year': 80100,
    'Last Year': 70120,
  },
  {
    date: 'Sep 23',
    'This Year': 75090,
    'Last Year': 69450,
  },
  {
    date: 'Oct 23',
    'This Year': 71080,
    'Last Year': 63345,
  },
  {
    date: 'Nov 23',
    'This Year': 61210,
    'Last Year': 100330,
  },
  {
    date: 'Dec 23',
    'This Year': 60143,
    'Last Year': 45321,
  },
  //array-end
];

function valueFormatter(number: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(number);
}

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-2xl">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50">
          Sales overview
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
        </p>
        <ul role="list" className="mt-6 flex gap-10">
          <li>
            <div className="flex items-center space-x-1.5">
              <span
                className="size-2.5 rounded-sm bg-blue-500 dark:bg-blue-500"
                aria-hidden={true}
              />
              <p className="text-xs text-gray-500 dark:text-gray-500">
                This year
              </p>
            </div>
            <div className="flex items-center space-x-1.5">
              <p className="mt-0.5 text-lg font-semibold text-gray-900 dark:text-gray-50">
                $0.8M
              </p>
              <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                +16%
              </span>
            </div>
          </li>
          <li>
            <div className="flex items-center space-x-1.5">
              <span
                className="size-2.5 rounded-sm bg-cyan-500 dark:bg-cyan-500"
                aria-hidden={true}
              />
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Last year
              </p>
            </div>
            <p className="mt-0.5 text-lg font-semibold text-gray-900 dark:text-gray-50">
              $0.7M
            </p>
          </li>
        </ul>
        <BarChart
          data={data}
          index="date"
          categories={['Last Year', 'This Year']}
          colors={['cyan', 'blue']}
          showLegend={false}
          valueFormatter={valueFormatter}
          yAxisWidth={50}
          className="mt-8 hidden !h-56 sm:block"
        />
        <BarChart
          data={data}
          index="date"
          categories={['Last Year', 'This Year']}
          colors={['cyan', 'blue']}
          showLegend={false}
          valueFormatter={valueFormatter}
          showYAxis={false}
          className="mt-8 !h-48 sm:hidden"
        />
      </Card>
    </div>
  );
}
```

### src/content/components/bar-charts/bar-chart-04.tsx

```tsx
'use client';

import React from 'react';

import { cx } from '@/lib/utils';

import { BarChart } from '@/components/BarChart';
import { Card } from '@/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const dataEurope = [
  //array-start
  {
    date: 'Jan 23',
    Successful: 12,
    Refunded: 0,
    Fraudulent: 1,
  },
  {
    date: 'Feb 23',
    Successful: 24,
    Refunded: 1,
    Fraudulent: 1,
  },
  {
    date: 'Mar 23',
    Successful: 48,
    Refunded: 4,
    Fraudulent: 4,
  },
  {
    date: 'Apr 23',
    Successful: 24,
    Refunded: 2,
    Fraudulent: 3,
  },
  {
    date: 'May 23',
    Successful: 34,
    Refunded: 0,
    Fraudulent: 0,
  },
  {
    date: 'Jun 23',
    Successful: 26,
    Refunded: 0,
    Fraudulent: 0,
  },
  {
    date: 'Jul 23',
    Successful: 12,
    Refunded: 0,
    Fraudulent: 0,
  },
  {
    date: 'Aug 23',
    Successful: 38,
    Refunded: 2,
    Fraudulent: 0,
  },
  {
    date: 'Sep 23',
    Successful: 23,
    Refunded: 1,
    Fraudulent: 0,
  },
  {
    date: 'Oct 23',
    Successful: 20,
    Refunded: 0,
    Fraudulent: 0,
  },
  {
    date: 'Nov 23',
    Successful: 24,
    Refunded: 0,
    Fraudulent: 0,
  },
  {
    date: 'Dec 23',
    Successful: 21,
    Refunded: 8,
    Fraudulent: 1,
  },
  //array-end
];

const dataAsia = [
  //array-start
  {
    date: 'Jan 23',
    Successful: 31,
    Refunded: 1,
    Fraudulent: 2,
  },
  {
    date: 'Feb 23',
    Successful: 32,
    Refunded: 2,
    Fraudulent: 1,
  },
  {
    date: 'Mar 23',
    Successful: 44,
    Refunded: 3,
    Fraudulent: 3,
  },
  {
    date: 'Apr 23',
    Successful: 23,
    Refunded: 2,
    Fraudulent: 4,
  },
  {
    date: 'May 23',
    Successful: 35,
    Refunded: 1,
    Fraudulent: 1,
  },
  {
    date: 'Jun 23',
    Successful: 48,
    Refunded: 1,
    Fraudulent: 1,
  },
  {
    date: 'Jul 23',
    Successful: 33,
    Refunded: 1,
    Fraudulent: 1,
  },
  {
    date: 'Aug 23',
    Successful: 38,
    Refunded: 3,
    Fraudulent: 0,
  },
  {
    date: 'Sep 23',
    Successful: 41,
    Refunded: 2,
    Fraudulent: 0,
  },
  {
    date: 'Oct 23',
    Successful: 39,
    Refunded: 1,
    Fraudulent: 0,
  },
  {
    date: 'Nov 23',
    Successful: 32,
    Refunded: 1,
    Fraudulent: 1,
  },
  {
    date: 'Dec 23',
    Successful: 19,
    Refunded: 5,
    Fraudulent: 1,
  },
  //array-end
];

const summary = [
  //array-start
  {
    name: 'Europe',
    total: 291,
    change: '+2.3%',
    changeType: 'positive',
    data: dataEurope,
    details: [
      {
        name: 'Successful',
        value: 263,
      },
      {
        name: 'Refunded',
        value: 18,
      },
      {
        name: 'Fraudulent',
        value: 10,
      },
    ],
  },
  {
    name: 'Asia',
    total: 758,
    change: '-0.3%',
    changeType: 'negative',
    data: dataAsia,
    details: [
      {
        name: 'Successful',
        value: 405,
      },
      {
        name: 'Refunded',
        value: 21,
      },
      {
        name: 'Fraudulent',
        value: 15,
      },
    ],
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

type Status = 'Successful' | 'Refunded' | 'Fraudulent';

const statusColor: Record<Status, string> = {
  Successful: 'bg-blue-500 dark:bg-blue-500',
  Refunded: 'bg-violet-500 dark:bg-violet-500',
  Fraudulent: 'bg-fuchsia-500 dark:bg-fuchsia-500',
};

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-lg">
        <h3 className="font-medium text-gray-900 dark:text-gray-50">
          Online payments
        </h3>
        <Tabs defaultValue={summary[0].name} className="mt-8">
          <TabsList className="space-x-0 border-t border-gray-200 dark:border-gray-800">
            {summary.map((tab, index) => (
              <React.Fragment key={tab.name}>
                <TabsTrigger
                  value={tab.name}
                  className="group w-full px-4 pt-2 text-left hover:border-gray-400 hover:bg-gray-50 dark:hover:border-gray-600 hover:dark:bg-gray-900"
                >
                  <p className="font-normal text-gray-500 dark:text-gray-500">
                    {tab.name}
                  </p>
                  <p className="text-lg font-bold text-gray-500 group-data-[state=active]:text-gray-900 dark:text-gray-500 group-data-[state=active]:dark:text-gray-50">
                    {tab.total}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                    <span
                      className={cx(
                        tab.changeType === 'positive'
                          ? 'text-emerald-700 dark:text-emerald-500'
                          : 'text-red-700 dark:text-red-500',
                        'font-medium',
                      )}
                    >
                      {tab.change}
                    </span>{' '}
                    to last period
                  </p>
                </TabsTrigger>
                {index < summary.length - 1 && (
                  <span
                    className="h-16 border-r border-gray-200 dark:border-gray-800"
                    aria-hidden={true}
                  />
                )}
              </React.Fragment>
            ))}
          </TabsList>
          {summary.map((region) => (
            <TabsContent key={region.name} value={region.name}>
              <BarChart
                data={region.data}
                index="date"
                categories={['Successful', 'Refunded', 'Fraudulent']}
                colors={['blue', 'violet', 'fuchsia']}
                type="stacked"
                valueFormatter={valueFormatter}
                showLegend={false}
                showYAxis={false}
                showGridLines={true}
                startEndOnly={true}
                className="mt-8 !h-48"
              />
              <ul
                role="list"
                className="mt-2 divide-y divide-gray-200 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
              >
                {region.details.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2 py-1.5">
                      <span
                        className={cx(
                          statusColor[item.name as Status],
                          'size-2 shrink-0 rounded-sm',
                        )}
                        aria-hidden={true}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-50">
                      {valueFormatter(item.value)}
                    </span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
```

### src/content/components/bar-charts/bar-chart-05.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { BarChart } from '@/components/BarChart';
import { Card } from '@/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const dataEurope = [
  //array-start
  {
    date: 'Jan 23',
    Successful: 12,
    Refunded: 0,
    Fraudulent: 1,
  },
  {
    date: 'Feb 23',
    Successful: 24,
    Refunded: 1,
    Fraudulent: 1,
  },
  {
    date: 'Mar 23',
    Successful: 48,
    Refunded: 4,
    Fraudulent: 4,
  },
  {
    date: 'Apr 23',
    Successful: 24,
    Refunded: 2,
    Fraudulent: 3,
  },
  {
    date: 'May 23',
    Successful: 34,
    Refunded: 0,
    Fraudulent: 0,
  },
  {
    date: 'Jun 23',
    Successful: 26,
    Refunded: 0,
    Fraudulent: 0,
  },
  {
    date: 'Jul 23',
    Successful: 12,
    Refunded: 0,
    Fraudulent: 0,
  },
  {
    date: 'Aug 23',
    Successful: 38,
    Refunded: 2,
    Fraudulent: 0,
  },
  {
    date: 'Sep 23',
    Successful: 23,
    Refunded: 1,
    Fraudulent: 0,
  },
  {
    date: 'Oct 23',
    Successful: 20,
    Refunded: 0,
    Fraudulent: 0,
  },
  {
    date: 'Nov 23',
    Successful: 24,
    Refunded: 0,
    Fraudulent: 0,
  },
  {
    date: 'Dec 23',
    Successful: 21,
    Refunded: 8,
    Fraudulent: 1,
  },
  //array-end
];

const dataNorthAmerica = [
  //array-start
  {
    date: 'Jan 23',
    Successful: 65,
    Refunded: 2,
    Fraudulent: 1,
  },
  {
    date: 'Feb 23',
    Successful: 78,
    Refunded: 3,
    Fraudulent: 2,
  },
  {
    date: 'Mar 23',
    Successful: 55,
    Refunded: 5,
    Fraudulent: 6,
  },
  {
    date: 'Apr 23',
    Successful: 79,
    Refunded: 4,
    Fraudulent: 3,
  },
  {
    date: 'May 23',
    Successful: 41,
    Refunded: 1,
    Fraudulent: 1,
  },
  {
    date: 'Jun 23',
    Successful: 32,
    Refunded: 1,
    Fraudulent: 1,
  },
  {
    date: 'Jul 23',
    Successful: 54,
    Refunded: 0,
    Fraudulent: 0,
  },
  {
    date: 'Aug 23',
    Successful: 45,
    Refunded: 3,
    Fraudulent: 1,
  },
  {
    date: 'Sep 23',
    Successful: 75,
    Refunded: 2,
    Fraudulent: 0,
  },
  {
    date: 'Oct 23',
    Successful: 62,
    Refunded: 1,
    Fraudulent: 0,
  },
  {
    date: 'Nov 23',
    Successful: 55,
    Refunded: 1,
    Fraudulent: 0,
  },
  {
    date: 'Dec 23',
    Successful: 58,
    Refunded: 6,
    Fraudulent: 2,
  },
  //array-end
];

const dataAsia = [
  //array-start
  {
    date: 'Jan 23',
    Successful: 31,
    Refunded: 1,
    Fraudulent: 2,
  },
  {
    date: 'Feb 23',
    Successful: 32,
    Refunded: 2,
    Fraudulent: 1,
  },
  {
    date: 'Mar 23',
    Successful: 44,
    Refunded: 3,
    Fraudulent: 3,
  },
  {
    date: 'Apr 23',
    Successful: 23,
    Refunded: 2,
    Fraudulent: 4,
  },
  {
    date: 'May 23',
    Successful: 35,
    Refunded: 1,
    Fraudulent: 1,
  },
  {
    date: 'Jun 23',
    Successful: 48,
    Refunded: 1,
    Fraudulent: 1,
  },
  {
    date: 'Jul 23',
    Successful: 33,
    Refunded: 1,
    Fraudulent: 1,
  },
  {
    date: 'Aug 23',
    Successful: 38,
    Refunded: 3,
    Fraudulent: 0,
  },
  {
    date: 'Sep 23',
    Successful: 41,
    Refunded: 2,
    Fraudulent: 0,
  },
  {
    date: 'Oct 23',
    Successful: 39,
    Refunded: 1,
    Fraudulent: 0,
  },
  {
    date: 'Nov 23',
    Successful: 32,
    Refunded: 1,
    Fraudulent: 1,
  },
  {
    date: 'Dec 23',
    Successful: 19,
    Refunded: 5,
    Fraudulent: 1,
  },
  //array-end
];

const summary = [
  //array-start
  {
    name: 'Europe',
    data: dataEurope,
    details: [
      {
        name: 'Successful',
        value: 263,
      },
      {
        name: 'Refunded',
        value: 18,
      },
      {
        name: 'Fraudulent',
        value: 10,
      },
    ],
  },
  {
    name: 'North America',
    data: dataNorthAmerica,
    details: [
      {
        name: 'Successful',
        value: 652,
      },
      {
        name: 'Refunded',
        value: 29,
      },
      {
        name: 'Fraudulent',
        value: 17,
      },
    ],
  },
  {
    name: 'Asia',
    data: dataAsia,
    details: [
      {
        name: 'Successful',
        value: 405,
      },
      {
        name: 'Refunded',
        value: 21,
      },
      {
        name: 'Fraudulent',
        value: 15,
      },
    ],
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

type Status = 'Successful' | 'Refunded' | 'Fraudulent';

const statusColor: Record<Status, string> = {
  Successful: 'bg-blue-500 dark:bg-blue-500',
  Refunded: 'bg-violet-500 dark:bg-violet-500',
  Fraudulent: 'bg-fuchsia-500 dark:bg-fuchsia-500',
};

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-lg">
        <h3 className="font-medium text-gray-900 dark:text-gray-50">
          Online payments
        </h3>
        <Tabs defaultValue={summary[0].name} className="mt-8">
          <TabsList>
            {summary.map((tab) => (
              <TabsTrigger key={tab.name} value={tab.name}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {summary.map((region) => (
            <TabsContent key={region.name} value={region.name}>
              <BarChart
                data={region.data}
                index="date"
                categories={['Successful', 'Refunded', 'Fraudulent']}
                colors={['blue', 'violet', 'fuchsia']}
                valueFormatter={valueFormatter}
                type="stacked"
                showLegend={false}
                showYAxis={false}
                startEndOnly={true}
                className="mt-8 !h-48"
              />
              <ul
                role="list"
                className="mt-2 divide-y divide-gray-200 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
              >
                {region.details.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between py-1.5"
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className={cx(
                          statusColor[item.name as Status],
                          'size-2 shrink-0 rounded-sm',
                        )}
                        aria-hidden={true}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-50">
                      {valueFormatter(item.value)}
                    </span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
```

### src/content/components/bar-charts/bar-chart-06.tsx

```tsx
'use client';

import React from 'react';

import { BarChart } from '@/components/BarChart';
import { RadioCardGroup, RadioCardItem } from '@/components/RadioCardGroup';

const tabs = [
  { name: 'Europe', value: '$0.7M' },
  { name: 'Asia', value: '$0.6M' },
  { name: 'North America', value: '$0.7M' },
];

const data = [
  {
    date: 'Jan 22',
    Europe: 48560,
    Asia: 38560,
    'North America': 34940,
  },
  {
    date: 'Feb 22',
    Europe: 60320,
    Asia: 30320,
    'North America': 34940,
  },
  {
    date: 'Mar 22',
    Europe: 75233,
    Asia: 65233,
    'North America': 84560,
  },
  {
    date: 'Apr 22',
    Europe: 51123,
    Asia: 39123,
    'North America': 74320,
  },
  {
    date: 'May 22',
    Europe: 51000,
    Asia: 72600,
    'North America': 63120,
  },
  {
    date: 'Jun 22',
    Europe: 90450,
    Asia: 81390,
    'North America': 51340,
  },
  {
    date: 'Jul 22',
    Europe: 79390,
    Asia: 41340,
    'North America': 61260,
  },
  {
    date: 'Aug 22',
    Europe: 74100,
    Asia: 63120,
    'North America': 51210,
  },
  {
    date: 'Sep 22',
    Europe: 71090,
    Asia: 59450,
    'North America': 51110,
  },
  {
    date: 'Oct 22',
    Europe: 71080,
    Asia: 63345,
    'North America': 41430,
  },
  {
    date: 'Nov 22',
    Europe: 63041,
    Asia: 50210,
    'North America': 90330,
  },
  {
    date: 'Dec 22',
    Europe: 51143,
    Asia: 41321,
    'North America': 69780,
  },
  {
    date: 'Jan 23',
    Europe: 68560,
    Asia: 28560,
    'North America': 34940,
  },
  {
    date: 'Feb 23',
    Europe: 70320,
    Asia: 30320,
    'North America': 44940,
  },
  {
    date: 'Mar 23',
    Europe: 80233,
    Asia: 70233,
    'North America': 94560,
  },
  {
    date: 'Apr 23',
    Europe: 55123,
    Asia: 45123,
    'North America': 84320,
  },
  {
    date: 'May 23',
    Europe: 56000,
    Asia: 80600,
    'North America': 71120,
  },
  {
    date: 'Jun 23',
    Europe: 100000,
    Asia: 85390,
    'North America': 61340,
  },
  {
    date: 'Jul 23',
    Europe: 85390,
    Asia: 45340,
    'North America': 71260,
  },
  {
    date: 'Aug 23',
    Europe: 80100,
    Asia: 70120,
    'North America': 61210,
  },
  {
    date: 'Sep 23',
    Europe: 75090,
    Asia: 69450,
    'North America': 61110,
  },
  {
    date: 'Oct 23',
    Europe: 71080,
    Asia: 63345,
    'North America': 41430,
  },
  {
    date: 'Nov 23',
    Europe: 68041,
    Asia: 61210,
    'North America': 100330,
  },
  {
    date: 'Dec 23',
    Europe: 60143,
    Asia: 45321,
    'North America': 80780,
  },
];

function valueFormatter(number: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(number);
}

type Region = keyof Omit<(typeof data)[0], 'date'>;

export default function Example() {
  const [selectedRegion, setSelectedRegion] = React.useState<Region>('Europe');
  const formattedData = data.map((item) => {
    return {
      date: item.date,
      Sales: item[selectedRegion],
    };
  });

  return (
    <div className="obfuscate">
      <div className="sm:mx-auto sm:max-w-3xl">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50">
          Sales breakdown by regions
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Check sales of top 3 regions
        </p>
        <RadioCardGroup
          name="Region"
          value={selectedRegion}
          onValueChange={(value) => setSelectedRegion(value as Region)}
          className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3"
        >
          {tabs.map((tab) => (
            <RadioCardItem key={tab.name} value={tab.name}>
              <h3 className="text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                {tab.name}
              </h3>
              <p className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {tab.value}
              </p>
            </RadioCardItem>
          ))}
        </RadioCardGroup>
        <BarChart
          data={formattedData}
          index="date"
          categories={['Sales']}
          showLegend={false}
          valueFormatter={valueFormatter}
          yAxisWidth={50}
          className="mt-10 hidden !h-72 sm:block"
        />
        <BarChart
          data={formattedData}
          index="date"
          categories={['Sales']}
          showLegend={false}
          valueFormatter={valueFormatter}
          showYAxis={false}
          startEndOnly={true}
          className="mt-6 !h-56 sm:hidden"
        />
      </div>
    </div>
  );
}
```

### src/content/components/bar-charts/bar-chart-07.tsx

```tsx
'use client';

// Requires third-pary library 'react-countup' for counting animation
// npm install react-countup
import React from 'react';
import CountUp from 'react-countup';

import { BarChart } from '@/components/BarChart';

const valueFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString() + 'bpm';
};

type DataPoint = {
  date: string;
  Running: number;
  Cycling: number;
};

const data: DataPoint[] = [
  //array-start
  {
    date: 'Jan 23',
    Running: 167,
    Cycling: 145,
  },
  {
    date: 'Feb 23',
    Running: 125,
    Cycling: 110,
  },
  {
    date: 'Mar 23',
    Running: 156,
    Cycling: 149,
  },
  {
    date: 'Apr 23',
    Running: 165,
    Cycling: 112,
  },
  {
    date: 'May 23',
    Running: 153,
    Cycling: 138,
  },
  {
    date: 'Jun 23',
    Running: 124,
    Cycling: 145,
  },
  {
    date: 'Jul 23',
    Running: 164,
    Cycling: 134,
  },
  {
    date: 'Aug 23',
    Running: 123,
    Cycling: 110,
  },
  {
    date: 'Sep 23',
    Running: 132,
    Cycling: 113,
  },
  {
    date: 'Oct 23',
    Running: 124,
    Cycling: 129,
  },
  {
    date: 'Nov 23',
    Running: 149,
    Cycling: 101,
  },
  {
    date: 'Dec 23',
    Running: 129,
    Cycling: 109,
  },
  //array-end
];

const categories: (keyof DataPoint)[] = ['Running', 'Cycling'];

const initialAverageValue =
  data.reduce((sum, dataPoint) => {
    categories.forEach((category) => {
      sum += dataPoint[category] as number;
    });
    return sum;
  }, 0) /
  (data.length * categories.length);

interface ValueChangeHandler {
  eventType: 'bar' | 'category';
  categoryClicked?: keyof DataPoint;
}

export default function Example() {
  const [values, setValues] = React.useState<{ start: number; end: number }>({
    start: 0,
    end: initialAverageValue,
  });

  function onValueChangeHandler(value: ValueChangeHandler) {
    if (!value || !value.categoryClicked) {
      return;
    }
    const category = value.categoryClicked;

    switch (value.eventType) {
      case 'bar':
        setValues((prev) => ({
          start: prev.end,
          end: data[0][category] as number,
        }));
        break;
      case 'category':
        const averageCategoryValue =
          data.reduce(
            (sum, dataPoint) => sum + (dataPoint[category] as number),
            0,
          ) / data.length;

        setValues((prev) => ({
          start: prev.end,
          end: averageCategoryValue,
        }));
        break;
      default:
        setValues((prev) => ({
          start: prev.end,
          end: initialAverageValue,
        }));
        break;
    }
  }

  return (
    <div className="obfuscate">
      <h3 className="text-sm text-gray-500 dark:text-gray-500">Average BPM</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">
        <CountUp start={values.start} end={values.end} duration={0.6} />
      </p>
      <BarChart
        className="mt-6 hidden !h-80 sm:block"
        data={data}
        index="date"
        categories={categories}
        colors={['blue', 'indigo']}
        valueFormatter={valueFormatter}
        yAxisWidth={60}
        onValueChange={(value) =>
          onValueChangeHandler(value as ValueChangeHandler)
        }
      />
      <BarChart
        className="mt-6 !h-72 sm:hidden"
        data={data}
        index="date"
        categories={categories}
        colors={['blue', 'indigo']}
        valueFormatter={valueFormatter}
        showYAxis={false}
        onValueChange={(value) =>
          onValueChangeHandler(value as ValueChangeHandler)
        }
      />
    </div>
  );
}
```

### src/content/components/bar-charts/bar-chart-08.tsx

```tsx
'use client';

import { RiExternalLinkLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { BarChart } from '@/components/BarChart';
import { Card } from '@/components/Card';

const data = [
  //array-start
  {
    date: 'Aug 01',
    'Successful requests': 1040,
    Errors: 0,
  },
  {
    date: 'Aug 02',
    'Successful requests': 1200,
    Errors: 0,
  },
  {
    date: 'Aug 03',
    'Successful requests': 1130,
    Errors: 0,
  },
  {
    date: 'Aug 04',
    'Successful requests': 1050,
    Errors: 0,
  },
  {
    date: 'Aug 05',
    'Successful requests': 920,
    Errors: 0,
  },
  {
    date: 'Aug 06',
    'Successful requests': 870,
    Errors: 0,
  },
  {
    date: 'Aug 07',
    'Successful requests': 790,
    Errors: 0,
  },
  {
    date: 'Aug 08',
    'Successful requests': 910,
    Errors: 0,
  },
  {
    date: 'Aug 09',
    'Successful requests': 951,
    Errors: 0,
  },
  {
    date: 'Aug 10',
    'Successful requests': 1232,
    Errors: 0,
  },
  {
    date: 'Aug 11',
    'Successful requests': 1230,
    Errors: 0,
  },
  {
    date: 'Aug 12',
    'Successful requests': 1289,
    Errors: 0,
  },
  {
    date: 'Aug 13',
    'Successful requests': 1002,
    Errors: 0,
  },
  {
    date: 'Aug 14',
    'Successful requests': 1034,
    Errors: 0,
  },
  {
    date: 'Aug 15',
    'Successful requests': 1140,
    Errors: 0,
  },
  {
    date: 'Aug 16',
    'Successful requests': 1280,
    Errors: 0,
  },
  {
    date: 'Aug 17',
    'Successful requests': 1345,
    Errors: 0,
  },
  {
    date: 'Aug 18',
    'Successful requests': 1432,
    Errors: 0,
  },
  {
    date: 'Aug 19',
    'Successful requests': 1321,
    Errors: 0,
  },
  {
    date: 'Aug 20',
    'Successful requests': 1230,
    Errors: 0,
  },
  {
    date: 'Aug 21',
    'Successful requests': 1020,
    Errors: 0,
  },
  {
    date: 'Aug 22',
    'Successful requests': 1040,
    Errors: 0,
  },
  {
    date: 'Aug 23',
    'Successful requests': 610,
    Errors: 81,
  },
  {
    date: 'Aug 24',
    'Successful requests': 610,
    Errors: 87,
  },
  {
    date: 'Aug 25',
    'Successful requests': 610,
    Errors: 92,
  },
  {
    date: 'Aug 26',
    'Successful requests': 501,
    Errors: 120,
  },
  {
    date: 'Aug 27',
    'Successful requests': 480,
    Errors: 120,
  },
  {
    date: 'Aug 28',
    'Successful requests': 471,
    Errors: 120,
  },
  {
    date: 'Aug 29',
    'Successful requests': 610,
    Errors: 89,
  },
  {
    date: 'Aug 30',
    'Successful requests': 513,
    Errors: 199,
  },
  {
    date: 'Aug 31',
    'Successful requests': 500,
    Errors: 56,
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

const summary = [
  //array-start
  {
    name: 'Successful requests',
    total: 23450,
    color: 'bg-blue-500 dark:bg-blue-500',
  },
  {
    name: 'Errors',
    total: 1397,
    color: 'bg-red-500 dark:bg-red-500',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="!p-0">
        <div className="p-6">
          <h3 className="font-medium text-gray-900 dark:text-gray-50">
            Requests
          </h3>
          <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt.{' '}
            <a
              href="#"
              className="inline-flex items-center gap-1 text-sm text-blue-500 dark:text-blue-500"
            >
              Learn more
              <RiExternalLinkLine className="size-4" aria-hidden={true} />
            </a>
          </p>
        </div>
        <div className="border-t border-gray-200 p-6 dark:border-gray-900">
          <ul role="list" className="flex flex-wrap gap-x-20 gap-y-10">
            {summary.map((item) => (
              <li key={item.name}>
                <div className="flex items-center space-x-2">
                  <span
                    className={cx(item.color, 'size-3 shrink-0 rounded-sm')}
                    aria-hidden={true}
                  />
                  <p className="font-semibold text-gray-900 dark:text-gray-50">
                    {valueFormatter(item.total)}
                  </p>
                </div>
                <p className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                  {item.name}
                </p>
              </li>
            ))}
          </ul>
          <BarChart
            data={data}
            index="date"
            categories={['Successful requests', 'Errors']}
            colors={['blue', 'red']}
            type="stacked"
            showLegend={false}
            yAxisWidth={45}
            valueFormatter={valueFormatter}
            className="mt-10 hidden !h-72 md:block"
          />
          <BarChart
            data={data}
            index="date"
            categories={['Successful requests', 'Errors']}
            colors={['blue', 'red']}
            type="stacked"
            showLegend={false}
            showYAxis={false}
            valueFormatter={valueFormatter}
            className="mt-6 !h-72 md:hidden"
          />
        </div>
      </Card>
    </div>
  );
}
```

### src/content/components/bar-charts/bar-chart-09.tsx

```tsx
'use client';

import { RiExternalLinkLine } from '@remixicon/react';

import { AvailableChartColorsKeys } from '@/lib/chartUtils';
import { cx } from '@/lib/utils';

import { BarChart } from '@/components/BarChart';
import { Card } from '@/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const ratio = [
  //array-start
  {
    date: 'Aug 01',
    'Successful requests': 1040,
    Errors: 0,
  },
  {
    date: 'Aug 02',
    'Successful requests': 1200,
    Errors: 0,
  },
  {
    date: 'Aug 03',
    'Successful requests': 1130,
    Errors: 0,
  },
  {
    date: 'Aug 04',
    'Successful requests': 1050,
    Errors: 0,
  },
  {
    date: 'Aug 05',
    'Successful requests': 920,
    Errors: 0,
  },
  {
    date: 'Aug 06',
    'Successful requests': 870,
    Errors: 0,
  },
  {
    date: 'Aug 07',
    'Successful requests': 790,
    Errors: 0,
  },
  {
    date: 'Aug 08',
    'Successful requests': 910,
    Errors: 0,
  },
  {
    date: 'Aug 09',
    'Successful requests': 951,
    Errors: 0,
  },
  {
    date: 'Aug 10',
    'Successful requests': 1232,
    Errors: 0,
  },
  {
    date: 'Aug 11',
    'Successful requests': 1230,
    Errors: 0,
  },
  {
    date: 'Aug 12',
    'Successful requests': 1289,
    Errors: 0,
  },
  {
    date: 'Aug 13',
    'Successful requests': 1002,
    Errors: 0,
  },
  {
    date: 'Aug 14',
    'Successful requests': 1034,
    Errors: 0,
  },
  {
    date: 'Aug 15',
    'Successful requests': 1140,
    Errors: 0,
  },
  {
    date: 'Aug 16',
    'Successful requests': 1280,
    Errors: 0,
  },
  {
    date: 'Aug 17',
    'Successful requests': 1345,
    Errors: 0,
  },
  {
    date: 'Aug 18',
    'Successful requests': 1432,
    Errors: 0,
  },
  {
    date: 'Aug 19',
    'Successful requests': 1321,
    Errors: 0,
  },
  {
    date: 'Aug 20',
    'Successful requests': 1230,
    Errors: 0,
  },
  {
    date: 'Aug 21',
    'Successful requests': 1020,
    Errors: 0,
  },
  {
    date: 'Aug 22',
    'Successful requests': 1040,
    Errors: 0,
  },
  {
    date: 'Aug 23',
    'Successful requests': 610,
    Errors: 81,
  },
  {
    date: 'Aug 24',
    'Successful requests': 610,
    Errors: 87,
  },
  {
    date: 'Aug 25',
    'Successful requests': 610,
    Errors: 92,
  },
  {
    date: 'Aug 26',
    'Successful requests': 501,
    Errors: 120,
  },
  {
    date: 'Aug 27',
    'Successful requests': 480,
    Errors: 120,
  },
  {
    date: 'Aug 28',
    'Successful requests': 471,
    Errors: 120,
  },
  {
    date: 'Aug 29',
    'Successful requests': 610,
    Errors: 89,
  },
  {
    date: 'Aug 30',
    'Successful requests': 513,
    Errors: 199,
  },
  {
    date: 'Aug 31',
    'Successful requests': 500,
    Errors: 56,
  },
  //array-end
];

const projects = [
  {
    date: 'Aug 01',
    'Successful requests': 1040,
    'Online shop': 780,
    Blog: 200,
    'Test project': 60,
  },
  {
    date: 'Aug 02',
    'Successful requests': 1200,
    'Online shop': 1030,
    Blog: 50,
    'Test project': 120,
  },
  {
    date: 'Aug 03',
    'Successful requests': 1130,
    'Online shop': 950,
    Blog: 80,
    'Test project': 100,
  },
  {
    date: 'Aug 04',
    'Successful requests': 1050,
    'Online shop': 840,
    Blog: 70,
    'Test project': 140,
  },
  {
    date: 'Aug 05',
    'Successful requests': 920,
    'Online shop': 710,
    Blog: 50,
    'Test project': 160,
  },
  {
    date: 'Aug 06',
    'Successful requests': 870,
    'Online shop': 660,
    Blog: 100,
    'Test project': 110,
  },
  {
    date: 'Aug 07',
    'Successful requests': 790,
    'Online shop': 590,
    Blog: 120,
    'Test project': 80,
  },
  {
    date: 'Aug 08',
    'Successful requests': 910,
    'Online shop': 700,
    Blog: 90,
    'Test project': 120,
  },
  {
    date: 'Aug 09',
    'Successful requests': 951,
    'Online shop': 741,
    Blog: 90,
    'Test project': 120,
  },
  {
    date: 'Aug 10',
    'Successful requests': 1232,
    'Online shop': 1040,
    Blog: 100,
    'Test project': 92,
  },
  {
    date: 'Aug 11',
    'Successful requests': 1230,
    'Online shop': 1030,
    Blog: 100,
    'Test project': 100,
  },
  {
    date: 'Aug 12',
    'Successful requests': 1289,
    'Online shop': 1099,
    Blog: 100,
    'Test project': 90,
  },
  {
    date: 'Aug 13',
    'Successful requests': 1002,
    'Online shop': 842,
    Blog: 70,
    'Test project': 90,
  },
  {
    date: 'Aug 14',
    'Successful requests': 1034,
    'Online shop': 884,
    Blog: 80,
    'Test project': 70,
  },
  {
    date: 'Aug 15',
    'Successful requests': 1140,
    'Online shop': 970,
    Blog: 100,
    'Test project': 70,
  },
  {
    date: 'Aug 16',
    'Successful requests': 1280,
    'Online shop': 1120,
    Blog: 90,
    'Test project': 70,
  },
  {
    date: 'Aug 17',
    'Successful requests': 1345,
    'Online shop': 1185,
    Blog: 90,
    'Test project': 55,
  },
  {
    date: 'Aug 18',
    'Successful requests': 1432,
    'Online shop': 1272,
    Blog: 90,
    'Test project': 55,
  },
  {
    date: 'Aug 19',
    'Successful requests': 1321,
    'Online shop': 1161,
    Blog: 90,
    'Test project': 55,
  },
  {
    date: 'Aug 20',
    'Successful requests': 1230,
    'Online shop': 1070,
    Blog: 100,
    'Test project': 60,
  },
  {
    date: 'Aug 21',
    'Successful requests': 1020,
    'Online shop': 1090,
    Blog: 90,
    'Test project': 60,
  },
  {
    date: 'Aug 22',
    'Successful requests': 1040,
    'Online shop': 510,
    Blog: 100,
    'Test project': 430,
  },
  {
    date: 'Aug 23',
    'Successful requests': 610,
    'Online shop': 510,
    Blog: 100,
    'Test project': 430,
  },
  {
    date: 'Aug 24',
    'Successful requests': 610,
    'Online shop': 510,
    Blog: 100,
    'Test project': 430,
  },
  {
    date: 'Aug 25',
    'Successful requests': 610,
    'Online shop': 381,
    Blog: 100,
    'Test project': 129,
  },
  {
    date: 'Aug 26',
    'Successful requests': 501,
    'Online shop': 360,
    Blog: 100,
    'Test project': 120,
  },
  {
    date: 'Aug 27',
    'Successful requests': 480,
    'Online shop': 351,
    Blog: 100,
    'Test project': 120,
  },
  {
    date: 'Aug 28',
    'Successful requests': 471,
    'Online shop': 510,
    Blog: 100,
    'Test project': 0,
  },
  {
    date: 'Aug 29',
    'Successful requests': 610,
    'Online shop': 414,
    Blog: 100,
    'Test project': 0,
  },
  {
    date: 'Aug 30',
    'Successful requests': 513,
    'Online shop': 444,
    Blog: 100,
    'Test project': 0,
  },
  {
    date: 'Aug 31',
    'Successful requests': 500,
    'Online shop': 510,
    Blog: 100,
    'Test project': 0,
  },
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

const tabs = [
  {
    name: 'Ratio',
    data: ratio,
    categories: ['Successful requests', 'Errors'],
    colors: ['blue', 'red'],
    summary: [
      {
        name: 'Successful requests',
        total: 23450,
        color: 'bg-blue-500 dark:bg-blue-500',
      },
      {
        name: 'Errors',
        total: 1397,
        color: 'bg-red-500 dark:bg-red-500',
      },
    ],
  },
  {
    name: 'Projects',
    data: projects,
    categories: ['Online shop', 'Blog', 'Test project'],
    colors: ['blue', 'cyan', 'violet'],
    summary: [
      {
        name: 'Online shop',
        total: 23450,
        color: 'bg-blue-500 dark:bg-blue-500',
      },
      {
        name: 'Blog',
        total: 1397,
        color: 'bg-cyan-500 dark:bg-cyan-500',
      },
      {
        name: 'Test project',
        total: 1397,
        color: 'bg-violet-500 dark:bg-violet-500',
      },
    ],
  },
];

export default function Example() {
  return (
    <Card className="!p-0">
      <div className="p-6">
        <h3 className="font-medium text-gray-900 dark:text-gray-50">
          Requests
        </h3>
        <p className="text-sm/6 text-gray-500 dark:text-gray-500">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt.{' '}
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm text-blue-500 dark:text-blue-500"
          >
            Learn more
            <RiExternalLinkLine className="size-4" aria-hidden={true} />
          </a>
        </p>
      </div>
      <div className="border-t border-gray-200 p-6 dark:border-gray-900">
        <Tabs defaultValue={tabs[0].name}>
          <div className="md:flex md:items-center md:justify-between">
            <TabsList variant="solid" className="w-full rounded-md md:w-60">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.name} value={tab.name} className="w-full">
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="hidden md:flex md:items-center md:space-x-2">
              <span
                className="shrink-0 animate-pulse rounded-full bg-emerald-500/30 p-1"
                aria-hidden={true}
              >
                <span className="block size-2 rounded-full bg-emerald-500 dark:bg-emerald-500" />
              </span>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-500 md:mt-0">
                Updated just now
              </p>
            </div>
          </div>
          {tabs.map((tab) => (
            <TabsContent key={tab.name} value={tab.name}>
              <ul role="list" className="mt-6 flex flex-wrap gap-x-20 gap-y-10">
                {tab.summary.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-center space-x-2">
                      <span
                        className={cx(item.color, 'size-3 shrink-0 rounded-sm')}
                        aria-hidden={true}
                      />
                      <p className="font-semibold text-gray-900 dark:text-gray-50">
                        {valueFormatter(item.total)}
                      </p>
                    </div>
                    <p className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                      {item.name}
                    </p>
                  </li>
                ))}
              </ul>
              <BarChart
                data={tab.data}
                index="date"
                categories={tab.categories}
                colors={tab.colors as AvailableChartColorsKeys[]}
                type="stacked"
                showLegend={false}
                yAxisWidth={45}
                valueFormatter={valueFormatter}
                className="mt-10 hidden !h-72 md:block"
              />
              <BarChart
                data={tab.data}
                index="date"
                categories={tab.categories}
                colors={tab.colors as AvailableChartColorsKeys[]}
                type="stacked"
                showLegend={false}
                showYAxis={false}
                valueFormatter={valueFormatter}
                className="mt-6 !h-72 md:hidden"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Card>
  );
}
```

### src/content/components/bar-charts/bar-chart-10.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import {
  Bar,
  CartesianGrid,
  Label,
  BarChart as RechartsBarChart,
  Legend as RechartsLegend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AxisDomain } from 'recharts/types/util/types';

import {
  AvailableChartColors,
  AvailableChartColorsKeys,
  constructCategoryColors,
  getColorClassName,
  getYAxisDomain,
} from '@/lib/chartUtils';
import { useOnWindowResize } from '@/lib/useOnWindowResize';
import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';

// Tremor BarChart [v0.2.0]

//#region Shape

function deepEqual<T>(obj1: T, obj2: T): boolean {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1) as Array<keyof T>;
  const keys2 = Object.keys(obj2) as Array<keyof T>;

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

const renderShape = (
  props: any,
  activeBar: any | undefined,
  activeLegend: string | undefined,
  strokeClass: string,
) => {
  const { name, payload, value } = props;
  let { x, width, y, height } = props;

  const lineY = y;

  if (height < 0) {
    y += height;
    height = Math.abs(height); // height must be a positive number
  }

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        opacity={
          activeBar || (activeLegend && activeLegend !== name)
            ? deepEqual(activeBar, { ...payload, value })
              ? 0.2
              : 0.1
            : 0.2
        }
      />
      <line
        x1={x}
        y1={lineY}
        x2={x + width}
        y2={lineY}
        stroke=""
        className={strokeClass}
        strokeWidth="2"
        opacity={
          activeBar || (activeLegend && activeLegend !== name)
            ? deepEqual(activeBar, { ...payload, value })
              ? 1
              : 0.5
            : 1
        }
      />
    </g>
  );
};

//#region Legend

interface LegendItemProps {
  name: string;
  color: AvailableChartColorsKeys;
  onClick?: (name: string, color: AvailableChartColorsKeys) => void;
  activeLegend?: string;
}

const LegendItem = ({
  name,
  color,
  onClick,
  activeLegend,
}: LegendItemProps) => {
  const hasOnValueChange = !!onClick;
  return (
    <li
      className={cx(
        // base
        'group inline-flex flex-nowrap items-center gap-1.5 whitespace-nowrap rounded px-2 py-1 transition',
        hasOnValueChange
          ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'
          : 'cursor-default',
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(name, color);
      }}
    >
      <span
        className={cx(
          'size-2 shrink-0 rounded-sm',
          getColorClassName(color, 'bg'),
          activeLegend && activeLegend !== name ? 'opacity-40' : 'opacity-100',
        )}
        aria-hidden={true}
      />
      <p
        className={cx(
          // base
          'truncate whitespace-nowrap text-xs',
          // text color
          'text-gray-700 dark:text-gray-300',
          hasOnValueChange &&
            'group-hover:text-gray-900 dark:group-hover:text-gray-50',
          activeLegend && activeLegend !== name ? 'opacity-40' : 'opacity-100',
        )}
      >
        {name}
      </p>
    </li>
  );
};

interface ScrollButtonProps {
  icon: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
}

const ScrollButton = ({ icon, onClick, disabled }: ScrollButtonProps) => {
  const Icon = icon;
  const [isPressed, setIsPressed] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isPressed) {
      intervalRef.current = setInterval(() => {
        onClick?.();
      }, 300);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isPressed, onClick]);

  React.useEffect(() => {
    if (disabled) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      setIsPressed(false);
    }
  }, [disabled]);

  return (
    <button
      type="button"
      className={cx(
        // base
        'group inline-flex size-5 items-center truncate rounded transition',
        disabled
          ? 'cursor-not-allowed text-gray-400 dark:text-gray-600'
          : 'cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50',
      )}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        setIsPressed(true);
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        setIsPressed(false);
      }}
    >
      <Icon className="size-full" aria-hidden="true" />
    </button>
  );
};

interface LegendProps extends React.OlHTMLAttributes<HTMLOListElement> {
  categories: string[];
  colors?: AvailableChartColorsKeys[];
  onClickLegendItem?: (category: string, color: string) => void;
  activeLegend?: string;
  enableLegendSlider?: boolean;
}

type HasScrollProps = {
  left: boolean;
  right: boolean;
};

const Legend = React.forwardRef<HTMLOListElement, LegendProps>((props, ref) => {
  const {
    categories,
    colors = AvailableChartColors,
    className,
    onClickLegendItem,
    activeLegend,
    enableLegendSlider = false,
    ...other
  } = props;
  const scrollableRef = React.useRef<HTMLInputElement>(null);
  const scrollButtonsRef = React.useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = React.useState<HasScrollProps | null>(null);
  const [isKeyDowned, setIsKeyDowned] = React.useState<string | null>(null);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const checkScroll = React.useCallback(() => {
    const scrollable = scrollableRef?.current;
    if (!scrollable) return;

    const hasLeftScroll = scrollable.scrollLeft > 0;
    const hasRightScroll =
      scrollable.scrollWidth - scrollable.clientWidth > scrollable.scrollLeft;

    setHasScroll({ left: hasLeftScroll, right: hasRightScroll });
  }, [setHasScroll]);

  const scrollToTest = React.useCallback(
    (direction: 'left' | 'right') => {
      const element = scrollableRef?.current;
      const scrollButtons = scrollButtonsRef?.current;
      const scrollButtonsWith = scrollButtons?.clientWidth ?? 0;
      const width = element?.clientWidth ?? 0;

      if (element && enableLegendSlider) {
        element.scrollTo({
          left:
            direction === 'left'
              ? element.scrollLeft - width + scrollButtonsWith
              : element.scrollLeft + width - scrollButtonsWith,
          behavior: 'smooth',
        });
        setTimeout(() => {
          checkScroll();
        }, 400);
      }
    },
    [enableLegendSlider, checkScroll],
  );

  React.useEffect(() => {
    const keyDownHandler = (key: string) => {
      if (key === 'ArrowLeft') {
        scrollToTest('left');
      } else if (key === 'ArrowRight') {
        scrollToTest('right');
      }
    };
    if (isKeyDowned) {
      keyDownHandler(isKeyDowned);
      intervalRef.current = setInterval(() => {
        keyDownHandler(isKeyDowned);
      }, 300);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isKeyDowned, scrollToTest]);

  const keyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      setIsKeyDowned(e.key);
    }
  };
  const keyUp = (e: KeyboardEvent) => {
    e.stopPropagation();
    setIsKeyDowned(null);
  };

  React.useEffect(() => {
    const scrollable = scrollableRef?.current;
    if (enableLegendSlider) {
      checkScroll();
      scrollable?.addEventListener('keydown', keyDown);
      scrollable?.addEventListener('keyup', keyUp);
    }

    return () => {
      scrollable?.removeEventListener('keydown', keyDown);
      scrollable?.removeEventListener('keyup', keyUp);
    };
  }, [checkScroll, enableLegendSlider]);

  return (
    <ol
      ref={ref}
      className={cx('relative overflow-hidden', className)}
      {...other}
    >
      <div
        ref={scrollableRef}
        tabIndex={0}
        className={cx(
          'flex h-full',
          enableLegendSlider
            ? hasScroll?.right || hasScroll?.left
              ? 'snap-mandatory items-center overflow-auto pl-4 pr-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
              : ''
            : 'flex-wrap',
        )}
      >
        {categories.map((category, index) => (
          <LegendItem
            key={`item-${index}`}
            name={category}
            color={colors[index] as AvailableChartColorsKeys}
            onClick={onClickLegendItem}
            activeLegend={activeLegend}
          />
        ))}
      </div>
      {enableLegendSlider && (hasScroll?.right || hasScroll?.left) ? (
        <>
          <div
            className={cx(
              // base
              'absolute bottom-0 right-0 top-0 flex h-full items-center justify-center pr-1',
              // background color
              'bg-white dark:bg-gray-950',
            )}
          >
            <ScrollButton
              icon={RiArrowLeftSLine}
              onClick={() => {
                setIsKeyDowned(null);
                scrollToTest('left');
              }}
              disabled={!hasScroll?.left}
            />
            <ScrollButton
              icon={RiArrowRightSLine}
              onClick={() => {
                setIsKeyDowned(null);
                scrollToTest('right');
              }}
              disabled={!hasScroll?.right}
            />
          </div>
        </>
      ) : null}
    </ol>
  );
});

Legend.displayName = 'Legend';

const ChartLegend = (
  { payload }: any,
  categoryColors: Map<string, AvailableChartColorsKeys>,
  setLegendHeight: React.Dispatch<React.SetStateAction<number>>,
  activeLegend: string | undefined,
  onClick?: (category: string, color: string) => void,
  enableLegendSlider?: boolean,
  legendPosition?: 'left' | 'center' | 'right',
  yAxisWidth?: number,
) => {
  const legendRef = React.useRef<HTMLDivElement>(null);

  useOnWindowResize(() => {
    const calculateHeight = (height: number | undefined) =>
      height ? Number(height) + 15 : 60;
    setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
  });

  const filteredPayload = payload.filter((item: any) => item.type !== 'none');

  const paddingLeft =
    legendPosition === 'left' && yAxisWidth ? yAxisWidth - 8 : 0;

  return (
    <div
      style={{ paddingLeft: paddingLeft }}
      ref={legendRef}
      className={cx(
        'flex items-center',
        { 'justify-center': legendPosition === 'center' },
        {
          'justify-start': legendPosition === 'left',
        },
        { 'justify-end': legendPosition === 'right' },
      )}
    >
      <Legend
        categories={filteredPayload.map((entry: any) => entry.value)}
        colors={filteredPayload.map((entry: any) =>
          categoryColors.get(entry.value),
        )}
        onClickLegendItem={onClick}
        activeLegend={activeLegend}
        enableLegendSlider={enableLegendSlider}
      />
    </div>
  );
};

//#region Tooltip

type TooltipProps = Pick<ChartTooltipProps, 'active' | 'payload' | 'label'>;

type PayloadItem = {
  category: string;
  value: number;
  index: string;
  color: AvailableChartColorsKeys;
  type?: string;
  payload: any;
};

interface ChartTooltipProps {
  active: boolean | undefined;
  payload: PayloadItem[];
  label: string;
  valueFormatter: (value: number) => string;
}

const ChartTooltip = ({
  active,
  payload,
  // label,
  valueFormatter,
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={cx(
          // base
          'rounded-md border text-sm shadow-md',
          // border color
          'border-gray-200 dark:border-gray-800',
          // background color
          'bg-white dark:bg-gray-950',
        )}
      >
        {/* unhide to show x-axis value, also uncomment label in line 465 */}

        {/* <div className={cx('border-b border-inherit px-4 py-2')}>
          <p
            className={cx(
              // base
              'font-medium',
              // text color
              'text-gray-900 dark:text-gray-50',
            )}
          >
            {label}
          </p>
        </div> */}

        <div className={cx('space-y-1 p-2')}>
          {payload.map(({ value, category, color }, index) => (
            <div
              key={`id-${index}`}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-2">
                <span
                  aria-hidden="true"
                  className={cx(
                    'size-2.5 shrink-0 rounded-sm',
                    getColorClassName(color, 'bg'),
                  )}
                />
                <p
                  className={cx(
                    // base
                    'whitespace-nowrap text-right',
                    // text color
                    'text-gray-700 dark:text-gray-300',
                  )}
                >
                  {category}
                </p>
              </div>
              <p
                className={cx(
                  // base
                  'whitespace-nowrap text-right font-medium tabular-nums',
                  // text color
                  'text-gray-900 dark:text-gray-50',
                )}
              >
                {valueFormatter(value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

//#region BarChart

type BaseEventProps = {
  eventType: 'category' | 'bar';
  categoryClicked: string;
  [key: string]: number | string;
};

type BarChartEventProps = BaseEventProps | null | undefined;

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>[];
  index: string;
  categories: string[];
  colors?: AvailableChartColorsKeys[];
  valueFormatter?: (value: number) => string;
  startEndOnly?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  yAxisWidth?: number;
  intervalType?: 'preserveStartEnd' | 'equidistantPreserveStart';
  showTooltip?: boolean;
  showLegend?: boolean;
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
  allowDecimals?: boolean;
  onValueChange?: (value: BarChartEventProps) => void;
  enableLegendSlider?: boolean;
  tickGap?: number;
  barCategoryGap?: string | number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  type?: 'default' | 'stacked' | 'percent';
  legendPosition?: 'left' | 'center' | 'right';
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  customTooltip?: React.ComponentType<TooltipProps>;
  syncId?: string;
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (props, forwardedRef) => {
    const {
      data = [],
      categories = [],
      index,
      colors = AvailableChartColors,
      valueFormatter = (value: number) => value.toString(),
      startEndOnly = false,
      showXAxis = true,
      showYAxis = true,
      showGridLines = true,
      yAxisWidth = 56,
      intervalType = 'equidistantPreserveStart',
      showTooltip = true,
      showLegend = true,
      autoMinValue = false,
      minValue,
      maxValue,
      allowDecimals = true,
      className,
      onValueChange,
      enableLegendSlider = false,
      barCategoryGap = '2%',
      tickGap = 5,
      xAxisLabel,
      yAxisLabel,
      type = 'default',
      legendPosition = 'right',
      tooltipCallback,
      customTooltip,
      syncId,
      ...other
    } = props;
    const CustomTooltip = customTooltip;
    const paddingValue =
      (!showXAxis && !showYAxis) || (startEndOnly && !showYAxis) ? 0 : 20;
    const [legendHeight, setLegendHeight] = React.useState(60);
    const [activeLegend, setActiveLegend] = React.useState<string | undefined>(
      undefined,
    );
    const categoryColors = constructCategoryColors(categories, colors);
    const [activeBar, setActiveBar] = React.useState<any | undefined>(
      undefined,
    );
    const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
    const hasOnValueChange = !!onValueChange;
    const stacked = type === 'stacked' || type === 'percent';

    const prevActiveRef = React.useRef<boolean | undefined>(undefined);
    const prevLabelRef = React.useRef<string | undefined>(undefined);

    function valueToPercent(value: number) {
      return `${(value * 100).toFixed(0)}%`;
    }

    function onBarClick(data: any, _: any, event: React.MouseEvent) {
      event.stopPropagation();
      if (!onValueChange) return;
      if (deepEqual(activeBar, { ...data.payload, value: data.value })) {
        setActiveLegend(undefined);
        setActiveBar(undefined);
        onValueChange?.(null);
      } else {
        setActiveLegend(data.tooltipPayload?.[0]?.dataKey);
        setActiveBar({
          ...data.payload,
          value: data.value,
        });
        onValueChange?.({
          eventType: 'bar',
          categoryClicked: data.tooltipPayload?.[0]?.dataKey,
          ...data.payload,
        });
      }
    }

    function onCategoryClick(dataKey: string) {
      if (!hasOnValueChange) return;
      if (dataKey === activeLegend && !activeBar) {
        setActiveLegend(undefined);
        onValueChange?.(null);
      } else {
        setActiveLegend(dataKey);
        onValueChange?.({
          eventType: 'category',
          categoryClicked: dataKey,
        });
      }
      setActiveBar(undefined);
    }

    return (
      <div
        ref={forwardedRef}
        className={cx('h-80 w-full', className)}
        {...other}
      >
        <ResponsiveContainer>
          <RechartsBarChart
            data={data}
            onClick={
              hasOnValueChange && (activeLegend || activeBar)
                ? () => {
                    setActiveBar(undefined);
                    setActiveLegend(undefined);
                    onValueChange?.(null);
                  }
                : undefined
            }
            margin={{
              bottom: xAxisLabel ? 30 : undefined,
              left: yAxisLabel ? 20 : undefined,
              right: yAxisLabel ? 5 : undefined,
              top: 5,
            }}
            stackOffset={type === 'percent' ? 'expand' : undefined}
            layout="horizontal"
            barCategoryGap={barCategoryGap}
            syncId={syncId}
          >
            {showGridLines ? (
              <CartesianGrid
                className={cx('stroke-gray-200 stroke-1 dark:stroke-gray-800')}
                horizontal={true}
                vertical={false}
              />
            ) : null}
            <XAxis
              hide={!showXAxis}
              tick={{
                transform: 'translate(0, 6)',
              }}
              fill=""
              stroke=""
              className={cx(
                // base
                'text-xs',
                // text fill
                'mt-4 fill-gray-500 dark:fill-gray-500',
              )}
              tickLine={false}
              axisLine={false}
              minTickGap={tickGap}
              {...{
                padding: {
                  left: paddingValue,
                  right: paddingValue,
                },
                dataKey: index,
                interval: startEndOnly ? 'preserveStartEnd' : intervalType,
                ticks: startEndOnly
                  ? [data[0][index], data[data.length - 1][index]]
                  : undefined,
              }}
            >
              {xAxisLabel && (
                <Label
                  position="insideBottom"
                  offset={-20}
                  className="fill-gray-800 text-sm font-medium dark:fill-gray-200"
                >
                  {xAxisLabel}
                </Label>
              )}
            </XAxis>
            <YAxis
              width={yAxisWidth}
              hide={!showYAxis}
              axisLine={false}
              tickLine={false}
              fill=""
              stroke=""
              className={cx(
                // base
                'text-xs',
                // text fill
                'fill-gray-500 dark:fill-gray-500',
              )}
              tick={{
                transform: 'translate(-3, 0)',
              }}
              {...{
                type: 'number',
                domain: yAxisDomain as AxisDomain,
                tickFormatter:
                  type === 'percent' ? valueToPercent : valueFormatter,
                allowDecimals: allowDecimals,
              }}
            >
              {yAxisLabel && (
                <Label
                  position="insideLeft"
                  style={{ textAnchor: 'middle' }}
                  angle={-90}
                  offset={-15}
                  className="fill-gray-800 text-sm font-medium dark:fill-gray-200"
                >
                  {yAxisLabel}
                </Label>
              )}
            </YAxis>
            <Tooltip
              wrapperStyle={{ outline: 'none' }}
              isAnimationActive={true}
              animationDuration={100}
              cursor={{ fill: '#d1d5db', opacity: '0.15' }}
              offset={20}
              position={{
                y: 0,
              }}
              content={({ active, payload, label }) => {
                const cleanPayload: TooltipProps['payload'] = payload
                  ? payload.map((item: any) => ({
                      category: item.dataKey,
                      value: item.value,
                      index: item.payload[index],
                      color: categoryColors.get(
                        item.dataKey,
                      ) as AvailableChartColorsKeys,
                      type: item.type,
                      payload: item.payload,
                    }))
                  : [];

                if (
                  tooltipCallback &&
                  (active !== prevActiveRef.current ||
                    label !== prevLabelRef.current)
                ) {
                  tooltipCallback({ active, payload: cleanPayload, label });
                  prevActiveRef.current = active;
                  prevLabelRef.current = label;
                }

                return showTooltip && active ? (
                  CustomTooltip ? (
                    <CustomTooltip
                      active={active}
                      payload={cleanPayload}
                      label={label}
                    />
                  ) : (
                    <ChartTooltip
                      active={active}
                      payload={cleanPayload}
                      label={label}
                      valueFormatter={valueFormatter}
                    />
                  )
                ) : null;
              }}
            />
            {showLegend ? (
              <RechartsLegend
                verticalAlign="top"
                height={legendHeight}
                content={({ payload }) =>
                  ChartLegend(
                    { payload },
                    categoryColors,
                    setLegendHeight,
                    activeLegend,
                    hasOnValueChange
                      ? (clickedLegendItem: string) =>
                          onCategoryClick(clickedLegendItem)
                      : undefined,
                    enableLegendSlider,
                    legendPosition,
                    yAxisWidth,
                  )
                }
              />
            ) : null}
            {categories.map((category) => (
              <Bar
                className={cx(
                  getColorClassName(
                    categoryColors.get(category) as AvailableChartColorsKeys,
                    'fill',
                  ),
                  onValueChange ? 'cursor-pointer' : '',
                )}
                key={category}
                name={category}
                type="linear"
                dataKey={category}
                stackId={stacked ? 'stack' : undefined}
                isAnimationActive={false}
                fill=""
                shape={(props: any) => {
                  const strokeClass = getColorClassName(
                    categoryColors.get(category) as AvailableChartColorsKeys,
                    'stroke',
                  );
                  return renderShape(
                    props,
                    activeBar,
                    activeLegend,
                    strokeClass,
                  );
                }}
                onClick={onBarClick}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

BarChart.displayName = 'BarChart';

const pageViews = [
  //array-start
  { date: '01', 'Page Views': 1540 },
  { date: '02', 'Page Views': 1600 },
  { date: '03', 'Page Views': 1100 },
  { date: '04', 'Page Views': 1250 },
  { date: '05', 'Page Views': 1300 },
  { date: '06', 'Page Views': 1200 },
  { date: '07', 'Page Views': 0 },
  { date: '08', 'Page Views': 0 },
  { date: '09', 'Page Views': 0 },
  { date: '10', 'Page Views': 1500 },
  { date: '11', 'Page Views': 1600 },
  { date: '12', 'Page Views': 900 },
  { date: '13', 'Page Views': 2000 },
  { date: '14', 'Page Views': 1800 },
  { date: '15', 'Page Views': 1700 },
  { date: '16', 'Page Views': 1800 },
  { date: '17', 'Page Views': 2200 },
  { date: '18', 'Page Views': 2100 },
  { date: '19', 'Page Views': 1200 },
  { date: '20', 'Page Views': 2400 },
  { date: '21', 'Page Views': 2500 },
  { date: '22', 'Page Views': 2600 },
  { date: '23', 'Page Views': 2000 },
  { date: '24', 'Page Views': 1400 },
  { date: '25', 'Page Views': 1900 },
  { date: '26', 'Page Views': 1000 },
  { date: '27', 'Page Views': 2100 },
  { date: '28', 'Page Views': 2300 },
  { date: '29', 'Page Views': 1500 },
  { date: '30', 'Page Views': 1700 },
  //array-end
];

const uniqueVisitors = [
  //array-start
  { date: '01', 'Unique Visitors': 1120 },
  { date: '02', 'Unique Visitors': 1200 },
  { date: '03', 'Unique Visitors': 600 },
  { date: '04', 'Unique Visitors': 1050 },
  { date: '05', 'Unique Visitors': 900 },
  { date: '06', 'Unique Visitors': 1000 },
  { date: '07', 'Unique Visitors': 0 },
  { date: '08', 'Unique Visitors': 0 },
  { date: '09', 'Unique Visitors': 0 },
  { date: '10', 'Unique Visitors': 1300 },
  { date: '11', 'Unique Visitors': 1200 },
  { date: '12', 'Unique Visitors': 800 },
  { date: '13', 'Unique Visitors': 1500 },
  { date: '14', 'Unique Visitors': 1400 },
  { date: '15', 'Unique Visitors': 1300 },
  { date: '16', 'Unique Visitors': 1400 },
  { date: '17', 'Unique Visitors': 1700 },
  { date: '18', 'Unique Visitors': 1500 },
  { date: '19', 'Unique Visitors': 1000 },
  { date: '20', 'Unique Visitors': 1800 },
  { date: '21', 'Unique Visitors': 1600 },
  { date: '22', 'Unique Visitors': 1700 },
  { date: '23', 'Unique Visitors': 1400 },
  { date: '24', 'Unique Visitors': 1100 },
  { date: '25', 'Unique Visitors': 1200 },
  { date: '26', 'Unique Visitors': 800 },
  { date: '27', 'Unique Visitors': 1500 },
  { date: '28', 'Unique Visitors': 1600 },
  { date: '29', 'Unique Visitors': 1300 },
  { date: '30', 'Unique Visitors': 1400 },
  //array-end
];

const bounceRate = [
  //array-start
  { date: '01', 'Bounce Rate': 0.55 },
  { date: '02', 'Bounce Rate': 0.52 },
  { date: '03', 'Bounce Rate': 0.65 },
  { date: '04', 'Bounce Rate': 0.6 },
  { date: '05', 'Bounce Rate': 0.5 },
  { date: '06', 'Bounce Rate': 0.48 },
  { date: '07', 'Bounce Rate': 0 },
  { date: '08', 'Bounce Rate': 0 },
  { date: '09', 'Bounce Rate': 0 },
  { date: '10', 'Bounce Rate': 0.58 },
  { date: '11', 'Bounce Rate': 0.6 },
  { date: '12', 'Bounce Rate': 0.72 },
  { date: '13', 'Bounce Rate': 0.45 },
  { date: '14', 'Bounce Rate': 0.48 },
  { date: '15', 'Bounce Rate': 0.5 },
  { date: '16', 'Bounce Rate': 0.47 },
  { date: '17', 'Bounce Rate': 0.44 },
  { date: '18', 'Bounce Rate': 0.52 },
  { date: '19', 'Bounce Rate': 0.68 },
  { date: '20', 'Bounce Rate': 0.41 },
  { date: '21', 'Bounce Rate': 0.38 },
  { date: '22', 'Bounce Rate': 0.4 },
  { date: '23', 'Bounce Rate': 0.43 },
  { date: '24', 'Bounce Rate': 0.49 },
  { date: '25', 'Bounce Rate': 0.55 },
  { date: '26', 'Bounce Rate': 0.7 },
  { date: '27', 'Bounce Rate': 0.46 },
  { date: '28', 'Bounce Rate': 0.42 },
  { date: '29', 'Bounce Rate': 0.6 },
  { date: '30', 'Bounce Rate': 0.45 },
  //array-end
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <Card className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-sm text-gray-600 dark:text-gray-400">Page Views</h1>
        <p className="text-2xl font-semibold text-blue-500 dark:text-blue-500">
          433
        </p>
        <BarChart
          syncId="sync"
          data={pageViews}
          index="date"
          categories={['Page Views']}
          showLegend={false}
          colors={['blue']}
          showYAxis={false}
          showGridLines={false}
          valueFormatter={valueFormatter}
          className="mt-2 !h-36"
        />
      </div>
      <div>
        <h1 className="text-sm text-gray-600 dark:text-gray-400">
          Unique Visitors
        </h1>
        <p className="text-2xl font-semibold text-violet-500 dark:text-violet-500">
          234
        </p>
        <BarChart
          syncId="sync"
          data={uniqueVisitors}
          index="date"
          categories={['Unique Visitors']}
          showLegend={false}
          colors={['violet']}
          showYAxis={false}
          showGridLines={false}
          valueFormatter={valueFormatter}
          className="mt-2 !h-36"
        />
      </div>
      <div>
        <h1 className="text-sm text-gray-600 dark:text-gray-400">
          Bounce Rate
        </h1>
        <p className="text-2xl font-semibold text-fuchsia-500 dark:text-fuchsia-500">
          584
        </p>
        <BarChart
          syncId="sync"
          data={bounceRate}
          index="date"
          categories={['Bounce Rate']}
          showLegend={false}
          colors={['fuchsia']}
          showYAxis={false}
          showGridLines={false}
          valueFormatter={valueFormatter}
          className="mt-2 !h-36"
        />
      </div>
    </Card>
  );
}
```

### src/content/components/bar-charts/bar-chart-11.tsx

```tsx
// Tremor BarChart [v0.2.1]

'use client';

import React from 'react';
import {
  Bar,
  CartesianGrid,
  Label,
  BarChart as RechartsBarChart,
  Legend as RechartsLegend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AxisDomain } from 'recharts/types/util/types';

import { getYAxisDomain } from '@/lib/chartUtils';
import { useOnWindowResize } from '@/lib/useOnWindowResize';
import { cx } from '@/lib/utils';

const data = [
  {
    date: 'Jan 24',
    Density: 0.891,
  },
  {
    date: 'Feb 24',
    Density: 0.084,
  },
  {
    date: 'Mar 24',
    Density: 0.155,
  },
  {
    date: 'Apr 24',
    Density: 0.75,
  },
  {
    date: 'May 24',
    Density: 0.221,
  },
  {
    date: 'Jun 24',
    Density: 0.561,
  },
  {
    date: 'Jul 24',
    Density: 0.261,
  },
  {
    date: 'Aug 24',
    Density: 0.421,
  },
];

// Tremor Custom chartColors

//array-start
type ColorUtility = 'bg' | 'stroke' | 'fill' | 'text';

const chartColors = {
  blue: {
    bg: 'bg-blue-500 dark:bg-blue-500',
    stroke: 'stroke-blue-500 dark:stroke-blue-500',
    fill: 'fill-blue-500 dark:fill-blue-500',
    text: 'text-blue-500 dark:text-blue-500',
  },
  lightBlue: {
    bg: 'bg-blue-300/50 dark:bg-blue-800/50',
    stroke: 'stroke-blue-300/50 dark:stroke-blue-800/50',
    fill: 'fill-blue-300/50 dark:fill-blue-800/50',
    text: 'text-blue-300/50 dark:text-blue-800/50',
  },
  emerald: {
    bg: 'bg-emerald-500 dark:bg-emerald-500',
    stroke: 'stroke-emerald-500 dark:stroke-emerald-500',
    fill: 'fill-emerald-500 dark:fill-emerald-500',
    text: 'text-emerald-500 dark:text-emerald-500',
  },
  lightEmerald: {
    bg: 'bg-emerald-300/50 dark:bg-emerald-800/50',
    stroke: 'stroke-emerald-300/50 dark:stroke-emerald-800/50',
    fill: 'fill-emerald-300/50 dark:fill-emerald-800/50',
    text: 'text-emerald-300/50 dark:text-emerald-800/50',
  },
  violet: {
    bg: 'bg-violet-500 dark:bg-violet-500',
    stroke: 'stroke-violet-500 dark:stroke-violet-500',
    fill: 'fill-violet-500 dark:fill-violet-500',
    text: 'text-violet-500 dark:text-violet-500',
  },
  amber: {
    bg: 'bg-amber-500 dark:bg-amber-500',
    stroke: 'stroke-amber-500 dark:stroke-amber-500',
    fill: 'fill-amber-500 dark:fill-amber-500',
    text: 'text-amber-500 dark:text-amber-500',
  },
  gray: {
    bg: 'bg-gray-400 dark:bg-gray-600',
    stroke: 'stroke-gray-400 dark:stroke-gray-600',
    fill: 'fill-gray-400 dark:fill-gray-600',
    text: 'text-gray-400 dark:text-gray-600',
  },
  rose: {
    bg: 'bg-rose-600 dark:bg-rose-500',
    stroke: 'stroke-rose-600 dark:stroke-rose-500',
    fill: 'fill-rose-600 dark:fill-rose-500',
    text: 'text-rose-600 dark:text-rose-500',
  },
  sky: {
    bg: 'bg-sky-500 dark:bg-sky-500',
    stroke: 'stroke-sky-500 dark:stroke-sky-500',
    fill: 'fill-sky-500 dark:fill-sky-500',
    text: 'text-sky-500 dark:text-sky-500',
  },
  cyan: {
    bg: 'bg-cyan-500 dark:bg-cyan-500',
    stroke: 'stroke-cyan-500 dark:stroke-cyan-500',
    fill: 'fill-cyan-500 dark:fill-cyan-500',
    text: 'text-cyan-500 dark:text-cyan-500',
  },
  indigo: {
    bg: 'bg-indigo-600 dark:bg-indigo-500',
    stroke: 'stroke-indigo-600 dark:stroke-indigo-500',
    fill: 'fill-indigo-600 dark:fill-indigo-500',
    text: 'text-indigo-600 dark:text-indigo-500',
  },
  orange: {
    bg: 'bg-orange-500 dark:bg-orange-400',
    stroke: 'stroke-orange-500 dark:stroke-orange-400',
    fill: 'fill-orange-500 dark:fill-orange-400',
    text: 'text-orange-500 dark:text-orange-400',
  },
  pink: {
    bg: 'bg-pink-500 dark:bg-pink-500',
    stroke: 'stroke-pink-500 dark:stroke-pink-500',
    fill: 'fill-pink-500 dark:fill-pink-500',
    text: 'text-pink-500 dark:text-pink-500',
  },
  red: {
    bg: 'bg-red-500 dark:bg-red-500',
    stroke: 'stroke-red-500 dark:stroke-red-500',
    fill: 'fill-red-500 dark:fill-red-500',
    text: 'text-red-500 dark:text-red-500',
  },
  lightGray: {
    bg: 'bg-gray-300 dark:bg-gray-700',
    stroke: 'stroke-gray-300 dark:stroke-gray-700',
    fill: 'fill-gray-300 dark:fill-gray-700',
    text: 'text-gray-300 dark:text-gray-700',
  },
} as const satisfies {
  [color: string]: {
    [key in ColorUtility]: string;
  };
};

type AvailableChartColorsKeys = keyof typeof chartColors;

const chartGradientColors = {
  blue: 'from-blue-200 to-blue-500 dark:from-blue-200/10 dark:to-blue-400',
  lightBlue: 'from-blue-200 to-blue-500 dark:from-blue-200/10 dark:to-blue-400',
  emerald:
    'from-emerald-200 to-emerald-500 dark:from-emerald-200/10 dark:to-emerald-400',
  lightEmerald:
    'from-emerald-200 to-emerald-500 dark:from-emerald-200/10 dark:to-emerald-400',
  violet:
    'from-violet-200 to-violet-500 dark:from-violet-200/10 dark:to-violet-400',
  amber: 'from-amber-200 to-amber-500 dark:from-amber-200/10 dark:to-amber-400',
  gray: 'from-gray-200 to-gray-500 dark:from-gray-200/10 dark:to-gray-400',
  lightGray: 'from-gray-200 to-gray-500 dark:from-gray-200/10 dark:to-gray-400',
  rose: 'from-rose-200 to-rose-500 dark:from-rose-200/10 dark:to-rose-400',
  sky: 'from-sky-200 to-sky-500 dark:from-sky-200/10 dark:to-sky-400',
  cyan: 'from-cyan-200 to-cyan-500 dark:from-cyan-200/10 dark:to-cyan-400',
  indigo:
    'from-indigo-200 to-indigo-500 dark:from-indigo-200/10 dark:to-indigo-400',
  orange:
    'from-orange-200 to-orange-500 dark:from-orange-200/10 dark:to-orange-400',
  pink: 'from-pink-200 to-pink-500 dark:from-pink-200/10 dark:to-pink-400',
  red: 'from-red-200 to-red-500 dark:from-red-200/10 dark:to-red-400',
} as const satisfies Record<string, string>;

const chartConditionalColors = {
  blue: {
    low: 'fill-blue-200 dark:fill-blue-300',
    medium: 'fill-blue-300 dark:fill-blue-400',
    high: 'fill-blue-400 dark:fill-blue-500',
    critical: 'fill-blue-500 dark:fill-blue-600',
  },
  lightBlue: {
    low: 'fill-blue-200 dark:fill-blue-300',
    medium: 'fill-blue-300 dark:fill-blue-400',
    high: 'fill-blue-400 dark:fill-blue-500',
    critical: 'fill-blue-500 dark:fill-blue-600',
  },
  emerald: {
    low: 'fill-emerald-200 dark:fill-emerald-300',
    medium: 'fill-emerald-300 dark:fill-emerald-400',
    high: 'fill-emerald-400 dark:fill-emerald-500',
    critical: 'fill-emerald-500 dark:fill-emerald-600',
  },
  lightEmerald: {
    low: 'fill-emerald-200 dark:fill-emerald-300',
    medium: 'fill-emerald-300 dark:fill-emerald-400',
    high: 'fill-emerald-400 dark:fill-emerald-500',
    critical: 'fill-emerald-500 dark:fill-emerald-600',
  },
  violet: {
    low: 'fill-violet-200 dark:fill-violet-300',
    medium: 'fill-violet-300 dark:fill-violet-400',
    high: 'fill-violet-400 dark:fill-violet-500',
    critical: 'fill-violet-500 dark:fill-violet-600',
  },
  amber: {
    low: 'fill-amber-200 dark:fill-amber-300',
    medium: 'fill-amber-300 dark:fill-amber-400',
    high: 'fill-amber-400 dark:fill-amber-500',
    critical: 'fill-amber-500 dark:fill-amber-600',
  },
  gray: {
    low: 'fill-gray-200 dark:fill-gray-300',
    medium: 'fill-gray-300 dark:fill-gray-400',
    high: 'fill-gray-400 dark:fill-gray-500',
    critical: 'fill-gray-500 dark:fill-gray-600',
  },
  rose: {
    low: 'fill-rose-200 dark:fill-rose-300',
    medium: 'fill-rose-300 dark:fill-rose-400',
    high: 'fill-rose-400 dark:fill-rose-500',
    critical: 'fill-rose-500 dark:fill-rose-600',
  },
  sky: {
    low: 'fill-sky-200 dark:fill-sky-300',
    medium: 'fill-sky-300 dark:fill-sky-400',
    high: 'fill-sky-400 dark:fill-sky-500',
    critical: 'fill-sky-500 dark:fill-sky-600',
  },
  cyan: {
    low: 'fill-cyan-200 dark:fill-cyan-300',
    medium: 'fill-cyan-300 dark:fill-cyan-400',
    high: 'fill-cyan-400 dark:fill-cyan-500',
    critical: 'fill-cyan-500 dark:fill-cyan-600',
  },
  indigo: {
    low: 'fill-indigo-200 dark:fill-indigo-300',
    medium: 'fill-indigo-300 dark:fill-indigo-400',
    high: 'fill-indigo-400 dark:fill-indigo-500',
    critical: 'fill-indigo-500 dark:fill-indigo-600',
  },
  orange: {
    low: 'fill-orange-200 dark:fill-orange-300',
    medium: 'fill-orange-300 dark:fill-orange-400',
    high: 'fill-orange-400 dark:fill-orange-500',
    critical: 'fill-orange-500 dark:fill-orange-600',
  },
  pink: {
    low: 'fill-pink-200 dark:fill-pink-300',
    medium: 'fill-pink-300 dark:fill-pink-400',
    high: 'fill-pink-400 dark:fill-pink-500',
    critical: 'fill-pink-500 dark:fill-pink-600',
  },
  red: {
    low: 'fill-red-200 dark:fill-red-300',
    medium: 'fill-red-300 dark:fill-red-400',
    high: 'fill-red-400 dark:fill-red-500',
    critical: 'fill-red-500 dark:fill-red-600',
  },
  lightGray: {
    low: 'fill-gray-200 dark:fill-gray-300',
    medium: 'fill-gray-300 dark:fill-gray-400',
    high: 'fill-gray-400 dark:fill-gray-500',
    critical: 'fill-gray-500 dark:fill-gray-600',
  },
};

type AvailableChartConditionalColorsKeys = keyof typeof chartColors;

const AvailableChartColors: AvailableChartColorsKeys[] = Object.keys(
  chartColors,
) as Array<AvailableChartColorsKeys>;

const constructCategoryColors = (
  categories: string[],
  colors: AvailableChartColorsKeys[],
): Map<string, AvailableChartColorsKeys> => {
  const categoryColors = new Map<string, AvailableChartColorsKeys>();
  categories.forEach((category, index) => {
    categoryColors.set(category, colors[index % colors.length]);
  });
  return categoryColors;
};

const getColorClassName = (
  color: AvailableChartColorsKeys,
  type: ColorUtility,
): string => {
  const fallbackColor = {
    bg: 'bg-gray-500',
    stroke: 'stroke-gray-500',
    fill: 'fill-gray-500',
    text: 'text-gray-500',
  };
  return chartColors[color]?.[type] ?? fallbackColor[type];
};

const getGradientColorClassName = (color: AvailableChartColorsKeys): string => {
  return chartGradientColors[color];
};

const getConditionalColorClassName = (
  value: number,
  color: AvailableChartConditionalColorsKeys,
) => {
  const fallbackColors = {
    low: 'fill-gray-300 dark:fill-gray-400',
    medium: 'fill-gray-400 dark:fill-gray-500',
    high: 'fill-gray-500 dark:fill-gray-600',
    critical: 'fill-gray-600 dark:fill-gray-700',
  };

  const classes = chartConditionalColors[color] ?? fallbackColors;

  if (value <= 0.25) return classes.low;
  if (value <= 0.5) return classes.medium;
  if (value <= 0.75) return classes.high;
  return classes.critical;
};

//array-end

function formatPercentage({
  number,
  decimals = 1,
}: {
  number: number;
  decimals?: number;
}): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
}

const CustomTooltip = ({ payload, active }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  {
    /* dummy values for showcase */
  }
  const PEER_AVERAGE = 0.75;

  const calculateDiff = () => {
    const difference = payload[0].value - PEER_AVERAGE;
    const sign = difference > 0 ? '+' : '';
    return `${sign}${formatPercentage({ number: difference })}`;
  };

  const peerDifference = calculateDiff();

  return (
    <div className="w-56 rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <ul role="list" className="grid grid-cols-2 gap-x-4 p-2">
        <li className="flex space-x-2.5">
          <span
            className={cx(
              `bg-${payload[0].color}-500 dark:bg-${payload[0].color}-500`,
              'w-1 rounded',
            )}
            aria-hidden="true"
          />
          <div className="space-y-0.5">
            <p className="whitespace-nowrap text-xs text-gray-500 dark:text-gray-500">
              {payload[0].category}
            </p>
            <p className="font-medium text-gray-900 dark:text-gray-50">
              {formatPercentage({ number: payload[0].value })}
            </p>
          </div>
        </li>
        <li className="flex space-x-2.5">
          <span
            className="w-1 rounded bg-gray-400 dark:bg-gray-600"
            aria-hidden="true"
          />
          <div className="space-y-0.5">
            <p className="whitespace-nowrap text-xs text-gray-500 dark:text-gray-500">
              Benchmark
            </p>
            <p className="font-medium text-gray-900 dark:text-gray-50">
              {formatPercentage({ number: PEER_AVERAGE })}
            </p>
          </div>
        </li>
      </ul>
      <div className="border-t border-gray-200 p-2 dark:border-gray-800">
        <p className="inline-flex w-full justify-center rounded bg-gray-100 px-1.5 py-1 text-xs text-gray-600 dark:bg-gray-400/20 dark:text-gray-400">
          <span className="mr-1">{peerDifference}</span>
          {parseFloat(peerDifference) > 0
            ? 'above benchmark'
            : parseFloat(peerDifference) === 0
              ? 'same as benchmark'
              : 'below benchmark'}
        </p>
      </div>
    </div>
  );
};

//#region Shape

function deepEqual<T>(obj1: T, obj2: T): boolean {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1) as Array<keyof T>;
  const keys2 = Object.keys(obj2) as Array<keyof T>;

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

const renderShape = (
  props: any,
  activeBar: any | undefined,
  activeLegend: string | undefined,
  layout: string,
  color: AvailableChartColorsKeys,
) => {
  const { fillOpacity, name, payload, value } = props;
  let { x, width, y, height } = props;

  if (layout === 'horizontal' && height < 0) {
    y += height;
    height = Math.abs(height); // height must be a positive number
  } else if (layout === 'vertical' && width < 0) {
    x += width;
    width = Math.abs(width); // width must be a positive number
  }

  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        className={getConditionalColorClassName(value, color)}
        opacity={
          activeBar || (activeLegend && activeLegend !== name)
            ? deepEqual(activeBar, { ...payload, value })
              ? fillOpacity
              : 0.3
            : fillOpacity
        }
      />
    </>
  );
};

//#region Legend

interface LegendItemProps {
  name: string;
  color: AvailableChartColorsKeys;
  onClick?: (name: string, color: AvailableChartColorsKeys) => void;
}

const LegendItem = ({ name, color, onClick }: LegendItemProps) => {
  const hasOnValueChange = !!onClick;
  return (
    <div
      className={cx(
        // base
        'group inline-flex flex-nowrap items-center gap-2 whitespace-nowrap rounded px-2 py-1 transition',
        hasOnValueChange
          ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'
          : 'cursor-default',
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(name, color);
      }}
    >
      <span className="text-xs text-gray-700 dark:text-gray-300">Low</span>
      <span
        className={cx(
          getGradientColorClassName(color),
          'h-1.5 w-14 rounded-full bg-gradient-to-r',
        )}
      />
      <span className="text-xs text-gray-700 dark:text-gray-300">High</span>
    </div>
  );
};

interface LegendProps extends React.OlHTMLAttributes<HTMLOListElement> {
  categories: string[];
  colors?: AvailableChartColorsKeys[];
  onClickLegendItem?: (category: string, color: string) => void;
  activeLegend?: string;
}

const Legend = React.forwardRef<HTMLOListElement, LegendProps>((props, ref) => {
  const {
    categories,
    colors = AvailableChartColors,
    className,
    onClickLegendItem,
    activeLegend,
    ...other
  } = props;
  return (
    <ol
      ref={ref}
      className={cx('relative overflow-hidden', className)}
      {...other}
    >
      <div tabIndex={0} className="flex h-full flex-wrap">
        {categories.map((category, index) => (
          <LegendItem
            key={`item-${index}`}
            name={category}
            color={colors[index] as AvailableChartColorsKeys}
            onClick={onClickLegendItem}
          />
        ))}
      </div>
    </ol>
  );
});

Legend.displayName = 'Legend';

const ChartLegend = (
  { payload }: any,
  categoryColors: Map<string, AvailableChartColorsKeys>,
  setLegendHeight: React.Dispatch<React.SetStateAction<number>>,
  activeLegend: string | undefined,
  onClick?: (category: string, color: string) => void,
  legendPosition?: 'left' | 'center' | 'right',
  yAxisWidth?: number,
) => {
  const legendRef = React.useRef<HTMLDivElement>(null);

  useOnWindowResize(() => {
    const calculateHeight = (height: number | undefined) =>
      height ? Number(height) + 15 : 60;
    setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
  });

  const filteredPayload = payload.filter((item: any) => item.type !== 'none');

  const paddingLeft =
    legendPosition === 'left' && yAxisWidth ? yAxisWidth - 8 : 0;

  return (
    <div
      style={{ paddingLeft: paddingLeft }}
      ref={legendRef}
      className={cx(
        'flex items-center',
        { 'justify-center': legendPosition === 'center' },
        {
          'justify-start': legendPosition === 'left',
        },
        { 'justify-end': legendPosition === 'right' },
      )}
    >
      <Legend
        categories={filteredPayload.map((entry: any) => entry.value)}
        colors={filteredPayload.map((entry: any) =>
          categoryColors.get(entry.value),
        )}
        onClickLegendItem={onClick}
        activeLegend={activeLegend}
      />
    </div>
  );
};

//#region Tooltip

type TooltipProps = Pick<ChartTooltipProps, 'active' | 'payload' | 'label'>;

type PayloadItem = {
  category: string;
  value: number;
  index: string;
  color: AvailableChartColorsKeys;
  type?: string;
  payload: any;
};

interface ChartTooltipProps {
  active: boolean | undefined;
  payload: PayloadItem[];
  label: string;
  valueFormatter: (value: number) => string;
}

const ChartTooltip = ({
  active,
  payload,
  label,
  valueFormatter,
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={cx(
          // base
          'rounded-md border text-sm shadow-md',
          // border color
          'border-gray-200 dark:border-gray-800',
          // background color
          'bg-white dark:bg-gray-950',
        )}
      >
        <div className={cx('border-b border-inherit px-4 py-2')}>
          <p
            className={cx(
              // base
              'font-medium',
              // text color
              'text-gray-900 dark:text-gray-50',
            )}
          >
            {label}
          </p>
        </div>
        <div className={cx('space-y-1 px-4 py-2')}>
          {payload.map(({ value, category, color }, index) => (
            <div
              key={`id-${index}`}
              className="flex items-center justify-between space-x-8"
            >
              <div className="flex items-center space-x-2">
                <span
                  aria-hidden="true"
                  className={cx(
                    'size-2 shrink-0 rounded-sm',
                    getColorClassName(color, 'bg'),
                  )}
                />
                <p
                  className={cx(
                    // base
                    'whitespace-nowrap text-right',
                    // text color
                    'text-gray-700 dark:text-gray-300',
                  )}
                >
                  {category}
                </p>
              </div>
              <p
                className={cx(
                  // base
                  'whitespace-nowrap text-right font-medium tabular-nums',
                  // text color
                  'text-gray-900 dark:text-gray-50',
                )}
              >
                {valueFormatter(value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

//#region BarChart

type BaseEventProps = {
  eventType: 'category' | 'bar';
  categoryClicked: string;
  [key: string]: number | string;
};

type BarChartEventProps = BaseEventProps | null | undefined;

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>[];
  index: string;
  categories: string[];
  colors?: AvailableChartColorsKeys[];
  valueFormatter?: (value: number) => string;
  startEndOnly?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  yAxisWidth?: number;
  intervalType?: 'preserveStartEnd' | 'equidistantPreserveStart';
  showTooltip?: boolean;
  showLegend?: boolean;
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
  allowDecimals?: boolean;
  onValueChange?: (value: BarChartEventProps) => void;
  enableLegendSlider?: boolean;
  tickGap?: number;
  barCategoryGap?: string | number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  layout?: 'vertical' | 'horizontal';
  type?: 'default' | 'stacked' | 'percent';
  legendPosition?: 'left' | 'center' | 'right';
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  customTooltip?: React.ComponentType<TooltipProps>;
}

const ConditionalBarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (props, forwardedRef) => {
    const {
      data = [],
      categories = [],
      index,
      colors = AvailableChartColors,
      valueFormatter = (value: number) => value.toString(),
      startEndOnly = false,
      showXAxis = true,
      showYAxis = true,
      showGridLines = true,
      yAxisWidth = 56,
      intervalType = 'equidistantPreserveStart',
      showTooltip = true,
      showLegend = true,
      autoMinValue = false,
      minValue,
      maxValue,
      allowDecimals = true,
      className,
      onValueChange,
      enableLegendSlider = false,
      barCategoryGap,
      tickGap = 5,
      xAxisLabel,
      yAxisLabel,
      layout = 'horizontal',
      type = 'default',
      legendPosition = 'right',
      tooltipCallback,
      customTooltip,
      ...other
    } = props;
    const CustomTooltip = customTooltip;
    const paddingValue =
      (!showXAxis && !showYAxis) || (startEndOnly && !showYAxis) ? 0 : 20;
    const [legendHeight, setLegendHeight] = React.useState(60);
    const [activeLegend, setActiveLegend] = React.useState<string | undefined>(
      undefined,
    );
    const categoryColors = constructCategoryColors(categories, colors);
    const [activeBar, setActiveBar] = React.useState<any | undefined>(
      undefined,
    );
    const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
    const hasOnValueChange = !!onValueChange;
    const stacked = type === 'stacked' || type === 'percent';

    const prevActiveRef = React.useRef<boolean | undefined>(undefined);
    const prevLabelRef = React.useRef<string | undefined>(undefined);

    function valueToPercent(value: number) {
      return `${(value * 100).toFixed(0)}%`;
    }

    function onBarClick(data: any, _: any, event: React.MouseEvent) {
      event.stopPropagation();
      if (!onValueChange) return;
      if (deepEqual(activeBar, { ...data.payload, value: data.value })) {
        setActiveLegend(undefined);
        setActiveBar(undefined);
        onValueChange?.(null);
      } else {
        setActiveLegend(data.tooltipPayload?.[0]?.dataKey);
        setActiveBar({
          ...data.payload,
          value: data.value,
        });
        onValueChange?.({
          eventType: 'bar',
          categoryClicked: data.tooltipPayload?.[0]?.dataKey,
          ...data.payload,
        });
      }
    }

    function onCategoryClick(dataKey: string) {
      if (!hasOnValueChange) return;
      if (dataKey === activeLegend && !activeBar) {
        setActiveLegend(undefined);
        onValueChange?.(null);
      } else {
        setActiveLegend(dataKey);
        onValueChange?.({
          eventType: 'category',
          categoryClicked: dataKey,
        });
      }
      setActiveBar(undefined);
    }

    return (
      <div
        ref={forwardedRef}
        className={cx('h-80 w-full', className)}
        tremor-id="tremor-raw"
        {...other}
      >
        <ResponsiveContainer>
          <RechartsBarChart
            data={data}
            onClick={
              hasOnValueChange && (activeLegend || activeBar)
                ? () => {
                    setActiveBar(undefined);
                    setActiveLegend(undefined);
                    onValueChange?.(null);
                  }
                : undefined
            }
            margin={{
              bottom: xAxisLabel ? 30 : undefined,
              left: yAxisLabel ? 20 : undefined,
              right: yAxisLabel ? 5 : undefined,
              top: 5,
            }}
            stackOffset={type === 'percent' ? 'expand' : undefined}
            layout={layout}
            barCategoryGap={barCategoryGap}
          >
            {showGridLines ? (
              <CartesianGrid
                className={cx('stroke-gray-200 stroke-1 dark:stroke-gray-800')}
                horizontal={layout !== 'vertical'}
                vertical={layout === 'vertical'}
              />
            ) : null}
            <XAxis
              hide={!showXAxis}
              tick={{
                transform:
                  layout !== 'vertical' ? 'translate(0, 6)' : undefined,
              }}
              fill=""
              stroke=""
              className={cx(
                // base
                'text-xs',
                // text fill
                'fill-gray-500 dark:fill-gray-500',
                { 'mt-4': layout !== 'vertical' },
              )}
              tickLine={false}
              axisLine={false}
              minTickGap={tickGap}
              {...(layout !== 'vertical'
                ? {
                    padding: {
                      left: paddingValue,
                      right: paddingValue,
                    },
                    dataKey: index,
                    interval: startEndOnly ? 'preserveStartEnd' : intervalType,
                    ticks: startEndOnly
                      ? [data[0][index], data[data.length - 1][index]]
                      : undefined,
                  }
                : {
                    type: 'number',
                    domain: yAxisDomain as AxisDomain,
                    tickFormatter:
                      type === 'percent' ? valueToPercent : valueFormatter,
                    allowDecimals: allowDecimals,
                  })}
            >
              {xAxisLabel && (
                <Label
                  position="insideBottom"
                  offset={-20}
                  className="fill-gray-800 text-sm font-medium dark:fill-gray-200"
                >
                  {xAxisLabel}
                </Label>
              )}
            </XAxis>
            <YAxis
              width={yAxisWidth}
              hide={!showYAxis}
              axisLine={false}
              tickLine={false}
              fill=""
              stroke=""
              className={cx(
                // base
                'text-xs',
                // text fill
                'fill-gray-500 dark:fill-gray-500',
              )}
              tick={{
                transform:
                  layout !== 'vertical'
                    ? 'translate(-3, 0)'
                    : 'translate(0, 0)',
              }}
              {...(layout !== 'vertical'
                ? {
                    type: 'number',
                    domain: yAxisDomain as AxisDomain,
                    tickFormatter:
                      type === 'percent' ? valueToPercent : valueFormatter,
                    allowDecimals: allowDecimals,
                  }
                : {
                    dataKey: index,
                    ticks: startEndOnly
                      ? [data[0][index], data[data.length - 1][index]]
                      : undefined,
                    type: 'category',
                    interval: 'equidistantPreserveStart',
                  })}
            >
              {yAxisLabel && (
                <Label
                  position="insideLeft"
                  style={{ textAnchor: 'middle' }}
                  angle={-90}
                  offset={-10}
                  className="fill-gray-500 text-xs font-normal dark:fill-gray-500"
                >
                  {yAxisLabel}
                </Label>
              )}
            </YAxis>
            <Tooltip
              wrapperStyle={{ outline: 'none' }}
              isAnimationActive={true}
              animationDuration={100}
              cursor={{ fill: '#d1d5db', opacity: '0.15' }}
              offset={20}
              position={{
                y: layout === 'horizontal' ? 0 : undefined,
                x: layout === 'horizontal' ? undefined : yAxisWidth + 20,
              }}
              content={({ active, payload, label }) => {
                const cleanPayload: TooltipProps['payload'] = payload
                  ? payload.map((item: any) => ({
                      category: item.dataKey,
                      value: item.value,
                      index: item.payload[index],
                      color: categoryColors.get(
                        item.dataKey,
                      ) as AvailableChartColorsKeys,
                      type: item.type,
                      payload: item.payload,
                    }))
                  : [];

                if (
                  tooltipCallback &&
                  (active !== prevActiveRef.current ||
                    label !== prevLabelRef.current)
                ) {
                  tooltipCallback({ active, payload: cleanPayload, label });
                  prevActiveRef.current = active;
                  prevLabelRef.current = label;
                }

                return showTooltip && active ? (
                  CustomTooltip ? (
                    <CustomTooltip
                      active={active}
                      payload={cleanPayload}
                      label={label}
                    />
                  ) : (
                    <ChartTooltip
                      active={active}
                      payload={cleanPayload}
                      label={label}
                      valueFormatter={valueFormatter}
                    />
                  )
                ) : null;
              }}
            />
            {showLegend ? (
              <RechartsLegend
                verticalAlign="top"
                height={legendHeight}
                content={({ payload }) =>
                  ChartLegend(
                    { payload },
                    categoryColors,
                    setLegendHeight,
                    activeLegend,
                    hasOnValueChange
                      ? (clickedLegendItem: string) =>
                          onCategoryClick(clickedLegendItem)
                      : undefined,
                    legendPosition,
                    yAxisWidth,
                  )
                }
              />
            ) : null}
            {categories.map((category) => (
              <Bar
                className={cx(onValueChange ? 'cursor-pointer' : '')}
                key={category}
                name={category}
                type="linear"
                dataKey={category}
                stackId={stacked ? 'stack' : undefined}
                isAnimationActive={false}
                fill=""
                shape={(props: any) =>
                  renderShape(
                    props,
                    activeBar,
                    activeLegend,
                    layout,
                    categoryColors.get(category) as AvailableChartColorsKeys,
                  )
                }
                onClick={onBarClick}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

ConditionalBarChart.displayName = 'ConditionalBarChart';

export { ConditionalBarChart, type BarChartEventProps, type TooltipProps };

export default function Example() {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
          Bidder density
        </dt>
        <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
          Competition level measured by number and size of bidders over time
        </dd>
      </div>
      <ConditionalBarChart
        data={data}
        index="date"
        categories={['Density']}
        colors={['orange']}
        customTooltip={CustomTooltip}
        valueFormatter={(value) =>
          formatPercentage({ number: value, decimals: 0 })
        }
        yAxisWidth={55}
        yAxisLabel="Competition density (%)"
        barCategoryGap="30%"
        className="mt-4 hidden h-60 md:block"
      />
      <ConditionalBarChart
        data={data}
        index="date"
        categories={['Density']}
        colors={['orange']}
        customTooltip={CustomTooltip}
        valueFormatter={(value) =>
          formatPercentage({ number: value, decimals: 0 })
        }
        showYAxis={false}
        barCategoryGap="30%"
        className="mt-4 h-60 md:hidden"
      />
    </div>
  );
}
```

### src/content/components/bar-charts/bar-chart-12.tsx

```tsx
'use client';

import { chartColors } from '@/lib/chartUtils';
import { cx } from '@/lib/utils';

import { BarChart, TooltipProps } from '@/components/BarChart';

// Add this custom colors to your chartColors definition (utils.ts)

// lightEmerald: {
//   bg: "bg-emerald-300/50 dark:bg-emerald-800/50",
//   stroke: "stroke-emerald-300/50 dark:stroke-emerald-800/50",
//   fill: "fill-emerald-300/50 dark:fill-emerald-800/50",
//   text: "text-emerald-300/50 dark:text-emerald-800/50",
// },

const data = [
  {
    date: 'Jan 24',
    Addressed: 8,
    Unrealized: 12,
  },
  {
    date: 'Feb 24',
    Addressed: 9,
    Unrealized: 12,
  },
  {
    date: 'Mar 24',
    Addressed: 6,
    Unrealized: 12,
  },
  {
    date: 'Apr 24',
    Addressed: 5,
    Unrealized: 12,
  },
  {
    date: 'May 24',
    Addressed: 12,
    Unrealized: 12,
  },
  {
    date: 'Jun 24',
    Addressed: 9,
    Unrealized: 12,
  },
  {
    date: 'Jul 24',
    Addressed: 3,
    Unrealized: 12,
  },
  {
    date: 'Aug 24',
    Addressed: 7,
    Unrealized: 12,
  },
];

export const CustomTooltip = ({ payload, active }: TooltipProps) => {
  const PEER_AVERAGE = 6.5;
  if (!active || !payload?.length) return null;

  const firstValue = payload[0]?.value;

  if (typeof firstValue !== 'number' || Number.isNaN(firstValue) || firstValue === 0)
    return null;

  const percentageDiff = ((firstValue - PEER_AVERAGE) / PEER_AVERAGE) * 100;
  const formattedDiff = `${percentageDiff > 0 ? '+' : ''}${percentageDiff.toFixed(1)}%`;
  const cappedValue = Math.min(Math.max(percentageDiff, -100), 100);

  return (
    <div className="w-56 rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <ul role="list" className="grid grid-cols-2 gap-x-4 p-2">
        {payload.map((category, index) => (
          <li key={index} className="flex space-x-2.5">
            <span
              className={cx(chartColors[category.color].bg, 'w-1 rounded')}
              aria-hidden="true"
            />
            <div className="space-y-0.5">
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {category.category}
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-50">
                {category.value}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-200 p-2 dark:border-gray-800">
        <div className="relative mt-0.5 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-800">
          <span className="absolute left-1/2 top-1/2 z-30 h-2.5 w-0.5 -translate-y-1/2 rounded-full bg-gray-500 dark:bg-gray-500" />
          {percentageDiff >= 0 ? (
            <span className="absolute left-1/2 top-1/2 z-10 h-1.5 w-1/2 -translate-y-1/2">
              <span
                style={{
                  width: `${cappedValue}%`,
                  transition: 'all duration-300',
                }}
                className="absolute h-1.5 rounded-r-full bg-gradient-to-r from-gray-400 to-gray-300 dark:from-gray-400 dark:to-gray-500"
              />
            </span>
          ) : (
            <span className="absolute right-1/2 top-1/2 z-10 h-1.5 w-1/2 -translate-y-1/2">
              <span
                style={{
                  width: `${Math.abs(cappedValue)}%`,
                  transition: 'all duration-300',
                }}
                className="absolute right-0 h-1.5 rounded-l-full bg-gradient-to-l from-gray-400 to-gray-300 dark:from-gray-400 dark:to-gray-500"
              />
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center">
            <span
              className="mr-1 h-0.5 w-2.5 rounded-full bg-gray-500 dark:bg-gray-500"
              aria-hidden="true"
            />
            <span className="text-xs text-gray-500 dark:text-gray-500">
              Peer avg.
            </span>
          </div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {formattedDiff}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Example() {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
          ESG impact
        </dt>
        <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
          Evaluation of addressed ESG criteria in biddings over time
        </dd>
      </div>
      <BarChart
        data={data}
        index="date"
        categories={['Addressed', 'Unrealized']}
        colors={['emerald', 'lightEmerald']}
        customTooltip={CustomTooltip}
        type="percent"
        yAxisWidth={55}
        yAxisLabel="% of criteria addressed"
        barCategoryGap="30%"
        className="mt-4 hidden h-60 md:block"
      />
      <BarChart
        data={data}
        index="date"
        categories={['Addressed', 'Unrealized']}
        colors={['emerald', 'lightEmerald']}
        customTooltip={CustomTooltip}
        showYAxis={false}
        type="percent"
        barCategoryGap="30%"
        className="mt-4 h-60 md:hidden"
      />
    </div>
  );
}
```

### src/content/components/bar-charts/index.ts

```ts
export { default as BarChart01 } from './bar-chart-01';
export { default as BarChart02 } from './bar-chart-02';
export { default as BarChart03 } from './bar-chart-03';
export { default as BarChart04 } from './bar-chart-04';
export { default as BarChart05 } from './bar-chart-05';
export { default as BarChart06 } from './bar-chart-06';
export { default as BarChart07 } from './bar-chart-07';
export { default as BarChart08 } from './bar-chart-08';
export { default as BarChart09 } from './bar-chart-09';
export { default as BarChart10 } from './bar-chart-10';
export { default as BarChart11 } from './bar-chart-11';
export { default as BarChart12 } from './bar-chart-12';
```
