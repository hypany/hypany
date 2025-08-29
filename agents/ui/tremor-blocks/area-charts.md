# Components / area-charts

[Back to index](index.md)

## Components / area-charts

Files:
- `src/content/components/area-charts/area-chart-01.tsx`
- `src/content/components/area-charts/area-chart-02.tsx`
- `src/content/components/area-charts/area-chart-03.tsx`
- `src/content/components/area-charts/area-chart-04.tsx`
- `src/content/components/area-charts/area-chart-05.tsx`
- `src/content/components/area-charts/area-chart-06.tsx`
- `src/content/components/area-charts/area-chart-07.tsx`
- `src/content/components/area-charts/area-chart-08.tsx`
- `src/content/components/area-charts/area-chart-09.tsx`
- `src/content/components/area-charts/area-chart-10.tsx`
- `src/content/components/area-charts/area-chart-11.tsx`
- `src/content/components/area-charts/area-chart-12.tsx`
- `src/content/components/area-charts/area-chart-13.tsx`
- `src/content/components/area-charts/area-chart-14.tsx`
- `src/content/components/area-charts/area-chart-15.tsx`
- `src/content/components/area-charts/area-chart-16.tsx`
- `src/content/components/area-charts/index.ts`

### src/content/components/area-charts/area-chart-01.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { AreaChart } from '@/components/AreaChart';
import { Card } from '@/components/Card';

const data = [
  //array-start
  {
    date: 'Jan 23',
    Organic: 232,
    Sponsored: 0,
  },
  {
    date: 'Feb 23',
    Organic: 241,
    Sponsored: 0,
  },
  {
    date: 'Mar 23',
    Organic: 291,
    Sponsored: 0,
  },
  {
    date: 'Apr 23',
    Organic: 101,
    Sponsored: 0,
  },
  {
    date: 'May 23',
    Organic: 318,
    Sponsored: 0,
  },
  {
    date: 'Jun 23',
    Organic: 205,
    Sponsored: 0,
  },
  {
    date: 'Jul 23',
    Organic: 372,
    Sponsored: 0,
  },
  {
    date: 'Aug 23',
    Organic: 341,
    Sponsored: 0,
  },
  {
    date: 'Sep 23',
    Organic: 387,
    Sponsored: 120,
  },
  {
    date: 'Oct 23',
    Organic: 220,
    Sponsored: 0,
  },
  {
    date: 'Nov 23',
    Organic: 372,
    Sponsored: 0,
  },
  {
    date: 'Dec 23',
    Organic: 321,
    Sponsored: 0,
  },
  //array-end
];

const summary = [
  {
    name: 'Organic',
    value: 3273,
  },
  {
    name: 'Sponsored',
    value: 120,
  },
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

type Status = 'Organic' | 'Sponsored';

const statusColor: Record<Status, string> = {
  Organic: 'bg-blue-500 dark:bg-blue-500',
  Sponsored: 'bg-violet-500 dark:bg-violet-500',
};

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-lg">
        <h1 className="font-medium text-gray-900 dark:text-gray-50">
          Follower metrics
        </h1>
        <AreaChart
          data={data}
          index="date"
          categories={['Organic', 'Sponsored']}
          colors={['blue', 'violet']}
          valueFormatter={valueFormatter}
          showLegend={false}
          showYAxis={false}
          startEndOnly={true}
          fill="solid"
          className="mt-6 !h-32"
        />
        <ul
          role="list"
          className="mt-4 divide-y divide-gray-200 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
        >
          {summary.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center space-x-2">
                <span
                  className={cx(
                    statusColor[item.name as Status],
                    'h-[3px] w-3.5 shrink-0 rounded-full',
                  )}
                  aria-hidden="true"
                />
                <span className="text-gray-500 dark:text-gray-500">
                  {item.name}
                </span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-50">
                {valueFormatter(item.value)}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-02.tsx

```tsx
'use client';

import React from 'react';
import { RiCloseLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { AreaChart } from '@/components/AreaChart';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

const data = [
  //array-start
  {
    date: 'Jan 23',
    Organic: 232,
    Sponsored: 0,
  },
  {
    date: 'Feb 23',
    Organic: 241,
    Sponsored: 0,
  },
  {
    date: 'Mar 23',
    Organic: 291,
    Sponsored: 0,
  },
  {
    date: 'Apr 23',
    Organic: 101,
    Sponsored: 0,
  },
  {
    date: 'May 23',
    Organic: 318,
    Sponsored: 0,
  },
  {
    date: 'Jun 23',
    Organic: 205,
    Sponsored: 0,
  },
  {
    date: 'Jul 23',
    Organic: 372,
    Sponsored: 0,
  },
  {
    date: 'Aug 23',
    Organic: 341,
    Sponsored: 0,
  },
  {
    date: 'Sep 23',
    Organic: 387,
    Sponsored: 120,
  },
  {
    date: 'Oct 23',
    Organic: 220,
    Sponsored: 0,
  },
  {
    date: 'Nov 23',
    Organic: 372,
    Sponsored: 0,
  },
  {
    date: 'Dec 23',
    Organic: 321,
    Sponsored: 0,
  },
  //array-end
];

const summary = [
  {
    name: 'Organic',
    value: 3273,
  },
  {
    name: 'Sponsored',
    value: 120,
  },
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

type Status = 'Organic' | 'Sponsored';

const statusColor: Record<Status, string> = {
  Organic: 'bg-blue-500 dark:bg-blue-500',
  Sponsored: 'bg-violet-500 dark:bg-violet-500',
};

export default function Example() {
  const [isOpen, setIsOpen] = React.useState(true);

  // just for demo purposes
  React.useEffect(() => {
    if (!isOpen) {
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-lg">
        <h1 className="font-medium text-gray-900 dark:text-gray-50">
          Follower metrics
        </h1>
        <AreaChart
          data={data}
          index="date"
          categories={['Organic', 'Sponsored']}
          colors={['blue', 'violet']}
          showLegend={false}
          showYAxis={false}
          showGridLines={true}
          startEndOnly={true}
          fill="solid"
          className="mt-6 !h-48"
        />
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 dark:divide-gray-800"
        >
          {summary.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between py-2 text-sm"
            >
              <div className="flex items-center space-x-2">
                <span
                  className={cx(
                    statusColor[item.name as Status],
                    'h-[3px] w-3.5 shrink-0 rounded-full',
                  )}
                />
                <span className="text-gray-500 dark:text-gray-500">
                  {item.name}
                </span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-50">
                {valueFormatter(item.value)}
              </span>
            </li>
          ))}
        </ul>
        {isOpen ? (
          <div className="mt-3 rounded-md bg-gray-50 py-3 pl-4 pr-2 ring-1 ring-inset ring-gray-200 dark:bg-gray-800 dark:ring-gray-400/20">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  More power?{' '}
                  <a
                    href="#"
                    className="font-normal text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Upgrade
                  </a>{' '}
                  <span className="font-normal text-gray-600 dark:text-gray-400">
                    to get more insights.
                  </span>
                </p>
              </div>
              <Button
                variant="ghost"
                className="!p-1 !text-gray-500 hover:!text-gray-700 dark:!text-gray-500 hover:dark:!text-gray-300"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <RiCloseLine className="size-5 shrink-0" aria-hidden={true} />
              </Button>
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-03.tsx

```tsx
'use client';

import React from 'react';
import { RiCloseLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { AreaChart } from '@/components/AreaChart';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

const data = [
  //array-start
  {
    date: 'Jan 23',
    Organic: 232,
    Sponsored: 0,
  },
  {
    date: 'Feb 23',
    Organic: 241,
    Sponsored: 0,
  },
  {
    date: 'Mar 23',
    Organic: 291,
    Sponsored: 0,
  },
  {
    date: 'Apr 23',
    Organic: 101,
    Sponsored: 0,
  },
  {
    date: 'May 23',
    Organic: 318,
    Sponsored: 0,
  },
  {
    date: 'Jun 23',
    Organic: 205,
    Sponsored: 0,
  },
  {
    date: 'Jul 23',
    Organic: 372,
    Sponsored: 0,
  },
  {
    date: 'Aug 23',
    Organic: 341,
    Sponsored: 0,
  },
  {
    date: 'Sep 23',
    Organic: 387,
    Sponsored: 120,
  },
  {
    date: 'Oct 23',
    Organic: 220,
    Sponsored: 0,
  },
  {
    date: 'Nov 23',
    Organic: 372,
    Sponsored: 0,
  },
  {
    date: 'Dec 23',
    Organic: 321,
    Sponsored: 0,
  },
  //array-end
];

const summary = [
  {
    name: 'Organic',
    value: 3273,
  },
  {
    name: 'Sponsored',
    value: 120,
  },
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

type Status = 'Organic' | 'Sponsored';

const statusColor: Record<Status, string> = {
  Organic: 'bg-blue-500',
  Sponsored: 'bg-violet-500',
};

export default function Example() {
  const [isOpen, setIsOpen] = React.useState(true);

  // just for demo purposes
  React.useEffect(() => {
    if (!isOpen) {
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-lg">
        <h1 className="font-medium text-gray-900 dark:text-gray-50">
          Follower metrics
        </h1>
        <AreaChart
          data={data}
          index="date"
          categories={['Organic', 'Sponsored']}
          colors={['blue', 'violet']}
          showLegend={false}
          showYAxis={false}
          showGridLines={true}
          startEndOnly={true}
          fill="solid"
          className="mt-6 !h-48"
        />

        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 dark:divide-gray-800"
        >
          {summary.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between py-2 text-sm"
            >
              <div className="flex items-center space-x-2">
                <span
                  className={cx(
                    statusColor[item.name as Status],
                    'h-[3px] w-3.5 shrink-0 rounded-full',
                  )}
                />
                <span className="text-gray-500 dark:text-gray-500">
                  {item.name}
                </span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-50">
                {valueFormatter(item.value)}
              </span>
            </li>
          ))}
        </ul>
        {isOpen ? (
          <div className="relative mt-3 rounded-md bg-gray-50 p-4 ring-1 ring-inset ring-gray-200 dark:bg-gray-800 dark:ring-gray-400/20">
            <div className="absolute right-0 top-0 pr-1.5 pt-1.5">
              <Button
                variant="ghost"
                className="!p-1 !text-gray-500 hover:!text-gray-700 dark:!text-gray-500 hover:dark:!text-gray-300"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <RiCloseLine className="size-5 shrink-0" aria-hidden="true" />
              </Button>
            </div>
            <h2 className="text-sm font-medium text-gray-900 dark:text-gray-50">
              Free trial offer
            </h2>
            <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
              Try out our Ad performance program and gain better insights to
              steer your business.
            </p>
            <div className="mt-2">
              <a
                href="#"
                className="text-sm font-medium text-blue-500 dark:text-blue-500"
              >
                Learn more &#8594;
              </a>
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-04.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowRightUpLine, RiCloseLine } from '@remixicon/react';

import { AreaChart } from '@/components/AreaChart';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

const data = [
  //array-start
  {
    date: 'Jan 23',
    Users: 234,
  },
  {
    date: 'Feb 23',
    Users: 412,
  },
  {
    date: 'Mar 23',
    Users: 519,
  },
  {
    date: 'Apr 23',
    Users: 642,
  },
  {
    date: 'May 23',
    Users: 642,
  },
  {
    date: 'Jun 23',
    Users: 701,
  },
  {
    date: 'Jul 23',
    Users: 749,
  },
  {
    date: 'Aug 23',
    Users: 961,
  },
  {
    date: 'Sep 23',
    Users: 1286,
  },
  {
    date: 'Oct 23',
    Users: 1491,
  },
  {
    date: 'Nov 23',
    Users: 1619,
  },
  {
    date: 'Dec 23',
    Users: 2019,
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  const [isOpen, setIsOpen] = React.useState(true);

  // just for demo purposes
  React.useEffect(() => {
    if (!isOpen) {
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-lg">
        <h1 className="text-sm text-gray-500 dark:text-gray-500">
          Active subscriptions (cumulative)
        </h1>
        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          14,035
        </p>
        <AreaChart
          data={data}
          index="date"
          categories={['Users']}
          showLegend={false}
          valueFormatter={valueFormatter}
          showYAxis={false}
          fill="solid"
          className="mt-6 hidden !h-48 sm:block"
        />
        <AreaChart
          data={data}
          index="date"
          categories={['Users']}
          showLegend={false}
          valueFormatter={valueFormatter}
          startEndOnly={true}
          showYAxis={false}
          fill="solid"
          className="mt-6 !h-48 sm:hidden"
        />
        {isOpen ? (
          <div className="relative mt-4 rounded-md bg-gray-50 p-4 ring-1 ring-inset ring-gray-200 dark:bg-gray-800 dark:ring-gray-400/20">
            <div className="flex items-center space-x-2.5">
              <RiArrowRightUpLine
                className="size-5 shrink-0 text-blue-500 dark:text-blue-500"
                aria-hidden="true"
              />
              <h2 className="text-sm font-medium text-blue-500 dark:text-blue-500">
                Significant increase since May
              </h2>
            </div>
            <div className="absolute right-1.5 top-1.5">
              <Button
                variant="ghost"
                className="!p-1 !text-gray-500 hover:!text-gray-700 dark:!text-gray-500 hover:dark:!text-gray-300"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <RiCloseLine className="size-5 shrink-0" aria-hidden="true" />
              </Button>
            </div>
            <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt. At vero eos et accusam et justo duo
              dolores.
            </p>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-05.tsx

```tsx
'use client';

import { RiExternalLinkLine } from '@remixicon/react';

import { AreaChart } from '@/components/AreaChart';
import { Card } from '@/components/Card';

function valueFormatter(number: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
  });
  return formatter.format(number);
}

const data = [
  //array-start
  {
    date: 'Jan 23',
    Balance: 38560,
  },
  {
    date: 'Feb 23',
    Balance: 40320,
  },
  {
    date: 'Mar 23',
    Balance: 50233,
  },
  {
    date: 'Apr 23',
    Balance: 55123,
  },
  {
    date: 'May 23',
    Balance: 56000,
  },
  {
    date: 'Jun 23',
    Balance: 100000,
  },
  {
    date: 'Jul 23',
    Balance: 85390,
  },
  {
    date: 'Aug 23',
    Balance: 80100,
  },
  {
    date: 'Sep 23',
    Balance: 75090,
  },
  {
    date: 'Oct 23',
    Balance: 71080,
  },
  {
    date: 'Nov 23',
    Balance: 68041,
  },
  {
    date: 'Dec 23',
    Balance: 60143,
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="overflow-hidden !p-0 sm:mx-auto sm:w-full">
        <div className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-500">Balance</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            $60,143
          </p>
          <AreaChart
            data={data}
            index="date"
            categories={['Balance']}
            showLegend={false}
            yAxisWidth={45}
            valueFormatter={valueFormatter}
            fill="solid"
            className="mt-8 hidden !h-60 sm:block"
          />
          <AreaChart
            data={data}
            index="date"
            categories={['Balance']}
            showLegend={false}
            showYAxis={false}
            startEndOnly={true}
            valueFormatter={valueFormatter}
            fill="solid"
            className="mt-8 !h-48 sm:hidden"
          />
        </div>
        <div className="rounded-b-md border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-900 dark:bg-[#090E1A]">
          <div className="flex justify-between">
            <span className="inline-flex select-none items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-400/20">
              Team access
            </span>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="flex items-center gap-1.5 text-sm text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
              >
                View transactions
                <RiExternalLinkLine
                  className="size-4 shrink-0"
                  aria-hidden="true"
                />
              </a>
              <span
                className="hidden h-6 w-px bg-gray-200 dark:bg-gray-800 sm:block"
                aria-hidden={true}
              />
              <a
                href="#"
                className="hidden items-center gap-1.5 text-sm text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500 sm:flex"
              >
                View statements
                <RiExternalLinkLine
                  className="size-4 shrink-0"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-06.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { AreaChart } from '@/components/AreaChart';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';

const data = [
  //array-start
  {
    date: 'Jan 23',
    'This year': 10200,
    'Last year': 3800,
  },
  {
    date: 'Feb 23',
    'This year': 15100,
    'Last year': 6910,
  },
  {
    date: 'Mar 23',
    'This year': 16100,
    'Last year': 7210,
  },
  {
    date: 'Apr 23',
    'This year': 17100,
    'Last year': 9200,
  },
  {
    date: 'May 23',
    'This year': 24800,
    'Last year': 9100,
  },
  {
    date: 'Jun 23',
    'This year': 20500,
    'Last year': 10210,
  },
  {
    date: 'Jul 23',
    'This year': 22130,
    'Last year': 10810,
  },
  {
    date: 'Aug 23',
    'This year': 28100,
    'Last year': 12120,
  },
  {
    date: 'Sep 23',
    'This year': 31700,
    'Last year': 10620,
  },
  {
    date: 'Oct 23',
    'This year': 32230,
    'Last year': 11350,
  },
  {
    date: 'Nov 23',
    'This year': 42200,
    'Last year': 12550,
  },
  {
    date: 'Dec 23',
    'This year': 59100,
    'Last year': 22150,
  },
  //array-end
];

const summary = [
  {
    name: 'This year',
    total: 277760,
    color: 'bg-blue-500 dark:bg-blue-500',
  },
  {
    name: 'Last year',
    total: 120420,
    color: 'bg-violet-500 dark:bg-violet-500',
  },
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-xl">
        <div className="flex items-center space-x-2">
          <h1 className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Revenue
          </h1>
          <span className="mt-0.5 inline-flex rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-400">
            +2.3%
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
          Current year vs. same period last year
        </p>
        <Divider className="!my-3" />
        <ul role="list" className="flex items-center gap-10">
          {summary.map((category) => (
            <li key={category.name}>
              <div className="flex items-center space-x-2">
                <span
                  className={cx(
                    category.color,
                    'h-[3px] w-3.5 shrink-0 rounded-full',
                  )}
                  aria-hidden="true"
                />
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  {category.name}
                </p>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                {valueFormatter(category.total)}
              </p>
            </li>
          ))}
        </ul>
        <AreaChart
          data={data}
          index="date"
          categories={['This year', 'Last year']}
          colors={['blue', 'violet']}
          valueFormatter={valueFormatter}
          showLegend={false}
          showYAxis={false}
          startEndOnly={true}
          fill="solid"
          className="mt-8 !h-48"
        />
      </Card>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-07.tsx

```tsx
'use client';

import React from 'react';

import { cx } from '@/lib/utils';

import { AreaChart, TooltipProps } from '@/components/AreaChart';
import { Card } from '@/components/Card';

interface DataItem {
  date: string;
  revenue: number;
}

const data: DataItem[] = [
  //array-start
  {
    date: 'Jan 23',
    revenue: 2340,
  },
  {
    date: 'Feb 23',
    revenue: 3110,
  },
  {
    date: 'Mar 23',
    revenue: 4643,
  },
  {
    date: 'Apr 23',
    revenue: 4650,
  },
  {
    date: 'May 23',
    revenue: 3980,
  },
  {
    date: 'Jun 23',
    revenue: 4702,
  },
  {
    date: 'Jul 23',
    revenue: 5990,
  },
  {
    date: 'Aug 23',
    revenue: 5700,
  },
  {
    date: 'Sep 23',
    revenue: 4250,
  },
  {
    date: 'Oct 23',
    revenue: 4182,
  },
  {
    date: 'Nov 23',
    revenue: 3812,
  },
  {
    date: 'Dec 23',
    revenue: 4900,
  },
  //array-end
];

const currencyFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number)}`;

function formatChange(
  payload: any,
  percentageChange: number | undefined,
  absoluteChange: number | undefined,
) {
  if (!payload || percentageChange === undefined || Number.isNaN(percentageChange)) {
    return '--';
  }

  const formattedPercentage = `${percentageChange > 0 ? '+' : ''}${percentageChange.toFixed(1)}%`;
  const formattedAbsolute = `${absoluteChange! >= 0 ? '+' : '-'}${currencyFormatter(Math.abs(absoluteChange!))}`;

  return `${formattedPercentage} (${formattedAbsolute})`;
}

export default function Example() {
  const [datas, setDatas] = React.useState<TooltipProps | null>(null);

  const payload = datas?.payload?.[0];
  const value = payload?.value ?? 0;

  const previousIndex = data.findIndex((e) => e['date'] === payload?.index);

  const previousValues =
    previousIndex > 0 ? data[previousIndex - 1] : undefined;

  const prev =
    payload && previousValues
      ? (previousValues[payload.category as keyof DataItem] as number)
      : undefined;

  const percentageChange =
    prev !== undefined ? ((value - prev) / prev) * 100 : undefined;
  const absoluteChange = prev !== undefined ? value - prev : undefined;

  const formattedValue = payload
    ? currencyFormatter(value)
    : currencyFormatter(data[0].revenue);

  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-lg">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Revenue by month
        </p>
        <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-50">
          {formattedValue}
        </p>
        <p className="mt-1 flex items-baseline justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-500">
            On {payload ? `${payload.index}` : `${data[0].date}`}
          </span>
          <span
            className={cx(
              'rounded-md p-2 text-sm font-medium',
              formatChange(payload, percentageChange, absoluteChange) === '--'
                ? 'text-gray-700 dark:text-gray-300'
                : payload && percentageChange! > 0
                  ? 'text-emerald-700 dark:text-emerald-500'
                  : 'text-red-700 dark:text-red-500',
            )}
          >
            {formatChange(payload, percentageChange, absoluteChange)}
          </span>
        </p>
        <AreaChart
          data={data}
          index="date"
          categories={['revenue']}
          showLegend={false}
          showYAxis={false}
          startEndOnly={true}
          valueFormatter={currencyFormatter}
          fill="solid"
          className="-mb-2 mt-8 !h-48"
          tooltipCallback={(props) => {
            if (props.active) {
              setDatas((prev) => {
                if (prev?.label === props.label) return prev;
                return props;
              });
            } else {
              setDatas(null);
            }
            return null;
          }}
        />
      </Card>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-08.tsx

```tsx
'use client';

import { RiArrowRightSLine } from '@remixicon/react';

import { AreaChart } from '@/components/AreaChart';
import { Card } from '@/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const dataEurope = [
  //array-start
  {
    date: 'Jan 23',
    Sales: 68560,
  },
  {
    date: 'Feb 23',
    Sales: 70320,
  },
  {
    date: 'Mar 23',
    Sales: 80233,
  },
  {
    date: 'Apr 23',
    Sales: 55123,
  },
  {
    date: 'May 23',
    Sales: 56000,
  },
  {
    date: 'Jun 23',
    Sales: 100000,
  },
  {
    date: 'Jul 23',
    Sales: 85390,
  },
  {
    date: 'Aug 23',
    Sales: 80100,
  },
  {
    date: 'Sep 23',
    Sales: 75090,
  },
  {
    date: 'Oct 23',
    Sales: 71080,
  },
  {
    date: 'Nov 23',
    Sales: 68041,
  },
  {
    date: 'Dec 23',
    Sales: 60143,
  },
  //array-end
];

const dataAsia = [
  //array-start
  {
    date: 'Jan 23',
    Sales: 28560,
  },
  {
    date: 'Feb 23',
    Sales: 30320,
  },
  {
    date: 'Mar 23',
    Sales: 70233,
  },
  {
    date: 'Apr 23',
    Sales: 45123,
  },
  {
    date: 'May 23',
    Sales: 56000,
  },
  {
    date: 'Jun 23',
    Sales: 80600,
  },
  {
    date: 'Jul 23',
    Sales: 85390,
  },
  {
    date: 'Aug 23',
    Sales: 40100,
  },
  {
    date: 'Sep 23',
    Sales: 35090,
  },
  {
    date: 'Oct 23',
    Sales: 71080,
  },
  {
    date: 'Nov 23',
    Sales: 68041,
  },
  {
    date: 'Dec 23',
    Sales: 70143,
  },
  //array-end
];

const dataNorthAmerica = [
  //array-start
  {
    date: 'Jan 23',
    Sales: 78560,
  },
  {
    date: 'Feb 23',
    Sales: 70320,
  },
  {
    date: 'Mar 23',
    Sales: 50233,
  },
  {
    date: 'Apr 23',
    Sales: 45123,
  },
  {
    date: 'May 23',
    Sales: 46000,
  },
  {
    date: 'Jun 23',
    Sales: 50600,
  },
  {
    date: 'Jul 23',
    Sales: 65390,
  },
  {
    date: 'Aug 23',
    Sales: 70100,
  },
  {
    date: 'Sep 23',
    Sales: 85090,
  },
  {
    date: 'Oct 23',
    Sales: 81080,
  },
  {
    date: 'Nov 23',
    Sales: 98041,
  },
  {
    date: 'Dec 23',
    Sales: 90143,
  },
  //array-end
];

const regions = [
  //array-start
  {
    name: 'Europe',
    alerts: 2,
    data: dataEurope,
    alertTexts: [
      {
        title: 'New customer closed',
        body: 'Stone Holding signed $0.5M deal after 6-month-long negotiation...',
        href: '#',
      },
      {
        title: 'Contract renewed',
        body: 'Eccel Mountain, Inc. renewed $1.2M annual contract...',
        href: '#',
      },
    ],
  },
  {
    name: 'Asia',
    alerts: 2,
    data: dataAsia,
    alertTexts: [
      {
        title: 'Diamond customer lost',
        body: 'Tech, Inc. has made the decision not to proceed with the renewal of $4M annual contract...',
        href: '#',
      },
      {
        title: 'Strong competition activity',
        body: 'Rose Holding faces heightened competition in the market, leading to the strategic decision...',
        href: '#',
      },
    ],
  },
  {
    name: 'North America',
    alerts: 3,
    data: dataNorthAmerica,
    alertTexts: [
      {
        title: 'Paid pilot won',
        body: 'Storm Company signs $0.3M deal to co-create B2B platform product...',
        href: '#',
      },
      {
        title: 'Diamond customer won',
        body: 'Neo Products LLC signs $3.4M deal...',
        href: '#',
      },
      {
        title: 'Goverment listing won',
        body: 'Won $3.4M government contract after a competitive bidding process...',
        href: '#',
      },
    ],
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="overflow-hidden !p-0 sm:mx-auto sm:max-w-xl">
        <div className="rounded-t-md bg-gray-50 p-6 dark:bg-[#090E1A]">
          <h1 className="font-semibold text-gray-900 dark:text-gray-50">
            Sales alerts
          </h1>
          <p className="text-sm/6 text-gray-500 dark:text-gray-500">
            Check recent activities of won and lost deals in your regions
          </p>
        </div>
        <Tabs defaultValue={regions[0].name}>
          <TabsList className="bg-gray-50 px-6 dark:bg-[#090E1A]">
            {regions.map((region) => (
              <TabsTrigger
                key={region.name}
                value={region.name}
                className="font-medium"
              >
                {region.name}
                <span className="ml-2 hidden rounded-md bg-white px-2 py-1 text-xs/4 font-semibold tabular-nums ring-1 ring-inset ring-gray-200 dark:bg-gray-950 dark:ring-gray-800 sm:inline-flex">
                  {region.alerts}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {regions.map((region) => (
            <TabsContent key={region.name} value={region.name} className="p-6">
              <AreaChart
                data={region.data}
                index="date"
                categories={['Sales']}
                valueFormatter={valueFormatter}
                showLegend={false}
                showYAxis={false}
                fill="solid"
                className="mt-2 hidden !h-48 sm:block"
              />
              <AreaChart
                data={region.data}
                index="date"
                categories={['Sales']}
                valueFormatter={valueFormatter}
                showLegend={false}
                showYAxis={false}
                startEndOnly={true}
                fill="solid"
                className="mt-2 !h-48 sm:hidden"
              />
              <div className="mt-4 space-y-4 sm:space-y-0">
                {region.alertTexts.map((item) => (
                  <div
                    key={item.title}
                    className="relative rounded-md p-0 sm:p-4 sm:hover:bg-gray-50 sm:hover:dark:bg-gray-900"
                  >
                    <div className="flex items-center space-x-0.5">
                      <h2 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                        <a href={item.href} className="focus:outline-none">
                          {/* Extend link to entire card */}
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          {item.title}
                        </a>
                      </h2>
                      <RiArrowRightSLine
                        className="size-5 text-gray-500 dark:text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-09.tsx

```tsx
'use client';

import { RiArrowDownSFill, RiArrowUpSFill } from '@remixicon/react';

import { AreaChart } from '@/components/AreaChart';
import { Card } from '@/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const data = [
  //array-start
  {
    date: 'Jan 23',
    Revenue: 42340,
  },
  {
    date: 'Feb 23',
    Revenue: 50120,
  },
  {
    date: 'Mar 23',
    Revenue: 45190,
  },
  {
    date: 'Apr 23',
    Revenue: 56420,
  },
  {
    date: 'May 23',
    Revenue: 40420,
  },
  {
    date: 'Jun 23',
    Revenue: 47010,
  },
  {
    date: 'Jul 23',
    Revenue: 47490,
  },
  {
    date: 'Aug 23',
    Revenue: 39610,
  },
  {
    date: 'Sep 23',
    Revenue: 45860,
  },
  {
    date: 'Oct 23',
    Revenue: 50910,
  },
  {
    date: 'Nov 23',
    Revenue: 49190,
  },
  {
    date: 'Dec 23',
    Revenue: 55190,
  },
  //array-end
];

const summaryChannel = [
  //array-start
  {
    location: 'Direct Online-Shops',
    icon: RiArrowUpSFill,
    rank: 'Prev. rank: #2',
    color: 'bg-blue-500 dark:bg-blue-500',
    type: 'Flagship',
    total: '$460.2K',
    share: '37.1%',
    changeType: 'positive',
  },
  {
    location: 'Wholesale',
    icon: RiArrowDownSFill,
    rank: 'Prev. rank: #1',
    color: 'bg-cyan-500 dark:bg-cyan-500',
    type: 'In-Store',
    total: '$237.3K',
    share: '31.2%',
    changeType: 'negative',
  },
  {
    location: 'Offline Stores',
    icon: RiArrowUpSFill,
    rank: 'Prev. rank: #4',
    color: 'bg-sky-500 dark:bg-sky-500',
    type: 'In-Store',
    total: '$118.2K',
    share: '12.7%',
    changeType: 'positive',
  },
  //array-end
];

const summaryProduct = [
  //array-start
  {
    location: 'OLED Monitor 29"',
    icon: RiArrowUpSFill,
    rank: 'Prev. rank: #8',
    color: 'bg-blue-500 dark:bg-blue-500',
    type: 'Flagship',
    total: '$360.1K',
    share: '9.2%',
    changeType: 'positive',
  },
  {
    location: 'SuperJet Printer Eco',
    icon: RiArrowDownSFill,
    rank: 'Prev. rank: #12',
    color: 'bg-cyan-500 dark:bg-cyan-500',
    type: 'In-Store',
    total: '$237.3K',
    share: '7.1%',
    changeType: 'positive',
  },
  {
    location: 'Gaming Laptop EdgeCell',
    icon: RiArrowUpSFill,
    rank: 'Prev. rank: #2',
    color: 'bg-sky-500 dark:bg-sky-500',
    type: 'In-Store',
    total: '$118.2K',
    share: '2.7%',
    changeType: 'negative',
  },
  //array-end
];

const tabs = [
  {
    name: 'By Channel',
    data: summaryChannel,
  },
  {
    name: 'By Product',
    data: summaryProduct,
  },
];

const currencyFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-xl">
        <h1 className="text-sm text-gray-500 dark:text-gray-500">Revenue</h1>
        <p className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
          $1,112,400
        </p>
        <AreaChart
          data={data}
          index="date"
          categories={['Revenue']}
          showLegend={false}
          showYAxis={false}
          valueFormatter={currencyFormatter}
          fill="solid"
          className="mt-8 hidden !h-48 sm:block"
        />
        <AreaChart
          data={data}
          index="date"
          categories={['Revenue']}
          showLegend={false}
          startEndOnly={true}
          showYAxis={false}
          valueFormatter={currencyFormatter}
          fill="solid"
          className="mt-8 !h-48 sm:hidden"
        />

        <Tabs defaultValue={tabs[0].name} className="mt-6">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.name} value={tab.name}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.name} value={tab.name}>
              <ul
                role="list"
                className="mt-2 divide-y divide-gray-200 dark:divide-gray-800"
              >
                {tab.data.map((item) => (
                  <li
                    key={item.location}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.location}
                      </p>
                      <div className="flex items-center space-x-1">
                        {item.changeType === 'positive' ? (
                          <RiArrowUpSFill
                            className="size-5 text-emerald-700 dark:text-emerald-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <RiArrowDownSFill
                            className="size-5 text-red-700 dark:text-red-500"
                            aria-hidden="true"
                          />
                        )}
                        <span className="text-xs/6 text-gray-500 dark:text-gray-500">
                          {item.rank}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.share}
                      </p>
                      <span className="text-xs/6 text-gray-500 dark:text-gray-500">
                        {item.total}
                      </span>
                    </div>
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

### src/content/components/area-charts/area-chart-10.tsx

```tsx
'use client';

import { AreaChart } from '@/components/AreaChart';
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

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="!p-0">
        <div className="p-6">
          <h1 className="font-medium text-gray-900 dark:text-gray-50">
            Monitoring
          </h1>
          <p className="text-sm/6 text-gray-500 dark:text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt
          </p>
        </div>
        <div className="border-t border-gray-200 p-6 dark:border-gray-900">
          <div className="md:flex md:items-center md:justify-between">
            <ul
              role="list"
              className="flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <li className="flex items-center space-x-2">
                <span
                  className="size-3 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
                  aria-hidden="true"
                />
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  <span className="font-semibold text-gray-900 dark:text-gray-50">
                    29,790
                  </span>{' '}
                  Successful requests
                </p>
              </li>
              <li className="flex items-center space-x-2">
                <span
                  className="size-3 shrink-0 rounded-sm bg-red-500 dark:bg-red-500"
                  aria-hidden="true"
                />
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  <span className="font-semibold text-gray-900 dark:text-gray-50">
                    1,397
                  </span>{' '}
                  Errors
                </p>
              </li>
            </ul>
            <span className="mt-4 inline-flex items-center gap-x-2.5 whitespace-nowrap rounded-md bg-white px-3 py-1 text-sm text-gray-700 shadow-sm ring-1 ring-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:ring-gray-800 md:mt-0">
              Success rate
              <span
                className="h-5 w-px bg-gray-200 dark:bg-gray-800"
                aria-hidden="true"
              />
              <span className="font-semibold text-gray-900 dark:text-gray-50">
                95.3%
              </span>
            </span>
          </div>
          <AreaChart
            data={data}
            index="date"
            categories={['Successful requests', 'Errors']}
            colors={['blue', 'red']}
            showLegend={false}
            yAxisWidth={44}
            valueFormatter={valueFormatter}
            fill="solid"
            className="mt-10 hidden !h-72 sm:block"
          />
          <AreaChart
            data={data}
            index="date"
            categories={['Successful requests', 'Errors']}
            colors={['blue', 'red']}
            showLegend={false}
            showYAxis={false}
            startEndOnly={true}
            valueFormatter={valueFormatter}
            fill="solid"
            className="mt-6 !h-72 sm:hidden"
          />
        </div>
      </Card>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-11.tsx

```tsx
'use client';

import { AreaChart } from '@/components/AreaChart';
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

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="!p-0">
        <div className="p-6">
          <h1 className="font-medium text-gray-900 dark:text-gray-50">
            Monitoring
          </h1>
          <p className="text-sm/6 text-gray-500 dark:text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt
          </p>
        </div>
        <div className="border-t border-gray-200 p-6 dark:border-gray-900">
          <ul
            role="list"
            className="flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            <li>
              <div className="flex items-center space-x-2">
                <span
                  className="size-3 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
                  aria-hidden="true"
                />
                <p className="font-semibold text-gray-900 dark:text-gray-50">
                  23,450
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Successful requests
              </p>
            </li>
            <li>
              <div className="flex items-center space-x-2">
                <span
                  className="size-3 shrink-0 rounded-sm bg-red-500 dark:bg-red-500"
                  aria-hidden={true}
                />
                <p className="font-semibold text-gray-900 dark:text-gray-50">
                  1,397
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500">Errors</p>
            </li>
          </ul>
          <AreaChart
            data={data}
            index="date"
            categories={['Successful requests', 'Errors']}
            colors={['blue', 'red']}
            showLegend={false}
            yAxisWidth={44}
            valueFormatter={valueFormatter}
            fill="solid"
            className="mt-10 hidden !h-72 sm:block"
          />
          <AreaChart
            data={data}
            index="date"
            categories={['Successful requests', 'Errors']}
            colors={['blue', 'red']}
            showLegend={false}
            showYAxis={false}
            valueFormatter={valueFormatter}
            fill="solid"
            className="mt-6 !h-72 sm:hidden"
          />
        </div>
      </Card>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-12.tsx

```tsx
'use client';

import { AreaChart } from '@/components/AreaChart';
import { Card } from '@/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

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

const tabs = [
  //array-start
  {
    name: '1w',
    data: data.slice(0, 7),
  },
  {
    name: '2w',
    data: data.slice(0, 14),
  },
  {
    name: '4w',
    data: data.slice(0, 30),
  },
  {
    name: 'All',
    data: data,
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="!p-0">
        <div className="p-6">
          <h1 className="font-medium text-gray-900 dark:text-gray-50">
            Monitoring
          </h1>
          <p className="text-sm/6 text-gray-500 dark:text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt
          </p>
        </div>
        <div className="border-t border-gray-200 p-6 dark:border-gray-900">
          {/* Grid is applied in mobile view to make use of order ranking and bring <TabGroup/> to the top */}
          <Tabs defaultValue={tabs[0].name}>
            <div className="grid md:flex md:items-start md:justify-between">
              <ul
                role="list"
                className="order-2 mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 md:order-1 md:mt-0"
              >
                <li>
                  <div className="flex items-center space-x-2">
                    <span
                      className="size-3 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
                      aria-hidden="true"
                    />
                    <p className="font-semibold text-gray-900 dark:text-gray-50">
                      23,450
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Successful requests
                  </p>
                </li>
                <li>
                  <div className="flex items-center space-x-2">
                    <span
                      className="size-3 shrink-0 rounded-sm bg-red-500 dark:bg-red-500"
                      aria-hidden="true"
                    />
                    <p className="font-semibold text-gray-900 dark:text-gray-50">
                      1,397
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Errors
                  </p>
                </li>
              </ul>
              <div className="order-1 md:order-2">
                <TabsList variant="solid" className="w-full md:w-fit">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.name}
                      value={tab.name}
                      className="w-full md:w-fit"
                    >
                      {tab.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
            {tabs.map((tab) => (
              <TabsContent key={tab.name} value={tab.name}>
                <AreaChart
                  data={tab.data}
                  index="date"
                  categories={['Successful requests', 'Errors']}
                  colors={['blue', 'red']}
                  showLegend={false}
                  yAxisWidth={44}
                  valueFormatter={valueFormatter}
                  fill="solid"
                  className="mt-10 hidden !h-72 sm:block"
                />
                <AreaChart
                  data={tab.data}
                  index="date"
                  categories={['Successful requests', 'Errors']}
                  colors={['blue', 'red']}
                  showLegend={false}
                  showYAxis={false}
                  startEndOnly={true}
                  valueFormatter={valueFormatter}
                  fill="solid"
                  className="mt-6 !h-72 sm:hidden"
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-13.tsx

```tsx
'use client';

import { AvailableChartColorsKeys } from '@/lib/chartUtils';
import { cx } from '@/lib/utils';

import { AreaChart } from '@/components/AreaChart';
import { Card } from '@/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const data = [
  //array-start
  {
    date: 'Aug 01',
    'Successful requests': 1040,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 02',
    'Successful requests': 1200,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 03',
    'Successful requests': 1130,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 04',
    'Successful requests': 1050,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 05',
    'Successful requests': 920,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 06',
    'Successful requests': 870,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 07',
    'Successful requests': 790,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 08',
    'Successful requests': 910,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 09',
    'Successful requests': 951,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 10',
    'Successful requests': 1232,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 11',
    'Successful requests': 1230,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 12',
    'Successful requests': 1289,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 13',
    'Successful requests': 1002,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 14',
    'Successful requests': 1034,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 15',
    'Successful requests': 1140,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 16',
    'Successful requests': 1280,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 17',
    'Successful requests': 1345,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 18',
    'Successful requests': 1432,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 19',
    'Successful requests': 1321,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 20',
    'Successful requests': 1230,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 21',
    'Successful requests': 1020,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 22',
    'Successful requests': 1040,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 23',
    'Successful requests': 610,
    Errors: 81,
    'Mean time to detect': 1060,
    'Mean time to resolve': 2180,
  },
  {
    date: 'Aug 24',
    'Successful requests': 610,
    Errors: 87,
    'Mean time to detect': 1460,
    'Mean time to resolve': 3140,
  },
  {
    date: 'Aug 25',
    'Successful requests': 610,
    Errors: 92,
    'Mean time to detect': 2460,
    'Mean time to resolve': 4120,
  },
  {
    date: 'Aug 26',
    'Successful requests': 501,
    Errors: 120,
    'Mean time to detect': 2920,
    'Mean time to resolve': 5120,
  },
  {
    date: 'Aug 27',
    'Successful requests': 480,
    Errors: 120,
    'Mean time to detect': 3120,
    'Mean time to resolve': 4910,
  },
  {
    date: 'Aug 28',
    'Successful requests': 471,
    Errors: 120,
    'Mean time to detect': 3150,
    'Mean time to resolve': 4210,
  },
  {
    date: 'Aug 29',
    'Successful requests': 610,
    Errors: 89,
    'Mean time to detect': 2350,
    'Mean time to resolve': 4620,
  },
  {
    date: 'Aug 30',
    'Successful requests': 513,
    Errors: 199,
    'Mean time to detect': 2350,
    'Mean time to resolve': 4130,
  },
  {
    date: 'Aug 31',
    'Successful requests': 500,
    Errors: 56,
    'Mean time to detect': 2431,
    'Mean time to resolve': 4130,
  },
  //array-end
];

const timeFormatter = (seconds: number) => {
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${minutes}m`;
};

const numberFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

const tabs = [
  //array-start
  {
    name: 'API requests',
    data: data,
    valueFormatter: numberFormatter,
    categories: ['Successful requests', 'Errors'],
    colors: ['blue', 'red'],
    summary: [
      {
        name: 'Successful requests',
        total: '23,450',
        color: 'bg-blue-500',
      },
      {
        name: 'Errors',
        total: '1,397',
        color: 'bg-red-500',
      },
    ],
  },
  {
    name: 'Incident response',
    data: data,
    valueFormatter: timeFormatter,
    categories: ['Mean time to resolve', 'Mean time to detect'],
    colors: ['blue', 'red'],
    summary: [
      {
        name: 'Mean time to resolve',
        total: '47min 44s',
        color: 'bg-blue-500',
      },
      {
        name: 'Mean time to detect',
        total: '31min 8s',
        color: 'bg-red-500',
      },
    ],
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="!p-0">
        <div className="p-6">
          <h1 className="font-medium text-gray-900 dark:text-gray-50">
            Monitoring
          </h1>
          <p className="text-sm/6 text-gray-500 dark:text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt
          </p>
        </div>
        <Tabs defaultValue={tabs[0].name}>
          <TabsList className="px-6">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.name} value={tab.name}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.name} value={tab.name} className="p-6">
              <div className="md:flex md:items-start md:justify-between">
                <ul
                  role="list"
                  className="flex flex-wrap items-center gap-x-10 gap-y-4"
                >
                  {tab.summary.map((item) => (
                    <li key={item.name}>
                      <div className="flex items-center space-x-2">
                        <span
                          className={cx(
                            item.color,
                            'size-3 shrink-0 rounded-sm',
                          )}
                          aria-hidden="true"
                        />
                        <p className="font-semibold text-gray-900 dark:text-gray-50">
                          {item.total}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {item.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <AreaChart
                data={data}
                index="date"
                categories={tab.categories}
                colors={tab.colors as AvailableChartColorsKeys[]}
                showLegend={false}
                yAxisWidth={45}
                valueFormatter={tab.valueFormatter}
                fill="solid"
                className="mt-10 hidden !h-72 sm:block"
              />
              <AreaChart
                data={data}
                index="date"
                categories={tab.categories}
                colors={tab.colors as AvailableChartColorsKeys[]}
                showLegend={false}
                showYAxis={false}
                startEndOnly={true}
                valueFormatter={tab.valueFormatter}
                fill="solid"
                className="mt-6 !h-72 sm:hidden"
              />
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-14.tsx

```tsx
'use client';

import { AvailableChartColorsKeys } from '@/lib/chartUtils';
import { cx } from '@/lib/utils';

import { AreaChart } from '@/components/AreaChart';
import { Card } from '@/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const data = [
  //array-start
  {
    date: 'Aug 01',
    'Successful requests': 1040,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 02',
    'Successful requests': 1200,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 03',
    'Successful requests': 1130,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 04',
    'Successful requests': 1050,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 05',
    'Successful requests': 920,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 06',
    'Successful requests': 870,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 07',
    'Successful requests': 790,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 08',
    'Successful requests': 910,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 09',
    'Successful requests': 951,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 10',
    'Successful requests': 1232,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 11',
    'Successful requests': 1230,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 12',
    'Successful requests': 1289,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 13',
    'Successful requests': 1002,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 14',
    'Successful requests': 1034,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 15',
    'Successful requests': 1140,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 16',
    'Successful requests': 1280,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 17',
    'Successful requests': 1345,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 18',
    'Successful requests': 1432,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 19',
    'Successful requests': 1321,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 20',
    'Successful requests': 1230,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 21',
    'Successful requests': 1020,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 22',
    'Successful requests': 1040,
    Errors: 0,
    'Mean time to detect': 0,
    'Mean time to resolve': 0,
  },
  {
    date: 'Aug 23',
    'Successful requests': 610,
    Errors: 81,
    'Mean time to detect': 1060,
    'Mean time to resolve': 2180,
  },
  {
    date: 'Aug 24',
    'Successful requests': 610,
    Errors: 87,
    'Mean time to detect': 1460,
    'Mean time to resolve': 3140,
  },
  {
    date: 'Aug 25',
    'Successful requests': 610,
    Errors: 92,
    'Mean time to detect': 2460,
    'Mean time to resolve': 4120,
  },
  {
    date: 'Aug 26',
    'Successful requests': 501,
    Errors: 120,
    'Mean time to detect': 2920,
    'Mean time to resolve': 5120,
  },
  {
    date: 'Aug 27',
    'Successful requests': 480,
    Errors: 120,
    'Mean time to detect': 3120,
    'Mean time to resolve': 4910,
  },
  {
    date: 'Aug 28',
    'Successful requests': 471,
    Errors: 120,
    'Mean time to detect': 3150,
    'Mean time to resolve': 4210,
  },
  {
    date: 'Aug 29',
    'Successful requests': 610,
    Errors: 89,
    'Mean time to detect': 2350,
    'Mean time to resolve': 4620,
  },
  {
    date: 'Aug 30',
    'Successful requests': 513,
    Errors: 199,
    'Mean time to detect': 2350,
    'Mean time to resolve': 4130,
  },
  {
    date: 'Aug 31',
    'Successful requests': 500,
    Errors: 56,
    'Mean time to detect': 2431,
    'Mean time to resolve': 4130,
  },
  //array-end
];

const timeFormatter = (seconds: number) => {
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${minutes}m`;
};

const numberFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

const tabs = [
  //array-start
  {
    name: 'API requests',
    data: data,
    valueFormatter: numberFormatter,
    categories: ['Successful requests', 'Errors'],
    colors: ['blue', 'red'],
    badgeText: '94.1%',
    axisWidth: 38,
    summary: [
      {
        name: 'Successful requests',
        total: '23,450',
        color: 'bg-blue-500 dark:bg-blue-500',
      },
      {
        name: 'Errors',
        total: '1,397',
        color: 'bg-red-500 dark:bg-red-500',
      },
    ],
  },
  {
    name: 'Incident response',
    data: data,
    valueFormatter: timeFormatter,
    categories: ['Mean time to resolve', 'Mean time to detect'],
    colors: ['blue', 'red'],
    badgeText: 'Avg. performance',
    axisWidth: 35,
    summary: [
      {
        name: 'Mean time to resolve',
        total: '47min 44s',
        color: 'bg-blue-500 dark:bg-blue-500',
      },
      {
        name: 'Mean time to detect',
        total: '31min 8s',
        color: 'bg-red-500 dark:bg-red-500',
      },
    ],
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="!p-0">
        <div className="rounded-t-lg p-6">
          <h1 className="font-medium text-gray-900 dark:text-gray-50">
            Monitoring
          </h1>
          <p className="text-sm/6 text-gray-500 dark:text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt
          </p>
        </div>
        <Tabs defaultValue={tabs[0].name}>
          <TabsList className="px-6">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.name} value={tab.name}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.name} value={tab.name} className="p-6">
              <div className="md:flex md:items-start md:justify-between">
                <ul
                  role="list"
                  className="flex flex-wrap items-center gap-x-10 gap-y-4"
                >
                  {tab.summary.map((item) => (
                    <li key={item.name}>
                      <div className="flex space-x-3">
                        <span
                          className={cx(item.color, 'flex w-[3px] rounded-sm')}
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-50">
                            {item.total}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-x-2.5 whitespace-nowrap rounded-md bg-white px-3 py-1 text-sm text-gray-700 shadow-sm ring-1 ring-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:ring-gray-800 md:mt-0">
                  Success rate
                  <span className="h-5 w-px bg-gray-200 dark:bg-gray-800" />
                  <span
                    className="size-2 rounded-full bg-emerald-600 dark:bg-emerald-500"
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-gray-900 dark:text-gray-50">
                    {tab.badgeText}
                  </span>
                </span>
              </div>
              <AreaChart
                data={data}
                index="date"
                categories={tab.categories}
                colors={tab.colors as AvailableChartColorsKeys[]}
                showLegend={false}
                yAxisWidth={44}
                valueFormatter={tab.valueFormatter}
                fill="solid"
                className="mt-10 hidden !h-72 sm:block"
              />
              <AreaChart
                data={data}
                index="date"
                categories={tab.categories}
                colors={tab.colors as AvailableChartColorsKeys[]}
                showLegend={false}
                showYAxis={false}
                startEndOnly={true}
                valueFormatter={tab.valueFormatter}
                fill="solid"
                className="mt-6 !h-72 sm:hidden"
              />
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-15.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { AreaChart } from '@/components/AreaChart';

const data = [
  //array-start
  {
    date: 'Jan 23',
    'Actual costs': 42340,
    'Potential costs': 32330,
    'Potential savings': -23.6,
  },
  {
    date: 'Feb 23',
    'Actual costs': 50120,
    'Potential costs': 40100,
    'Potential savings': -20.2,
  },
  {
    date: 'Mar 23',
    'Actual costs': 45190,
    'Potential costs': 38240,
    'Potential savings': -15.4,
  },
  {
    date: 'Apr 23',
    'Actual costs': 56420,
    'Potential costs': 31200,
    'Potential savings': -44.8,
  },
  {
    date: 'May 23',
    'Actual costs': 40420,
    'Potential costs': 34900,
    'Potential savings': -13.8,
  },
  {
    date: 'Jun 23',
    'Actual costs': 47010,
    'Potential costs': 36800,
    'Potential savings': -21.9,
  },
  {
    date: 'Jul 23',
    'Actual costs': 47490,
    'Potential costs': 34560,
    'Potential savings': -27.3,
  },
  {
    date: 'Aug 23',
    'Actual costs': 39610,
    'Potential costs': 31260,
    'Potential savings': -21.8,
  },
  {
    date: 'Sep 23',
    'Actual costs': 45860,
    'Potential costs': 29240,
    'Potential savings': -36.2,
  },
  {
    date: 'Oct 23',
    'Actual costs': 50910,
    'Potential costs': 31220,
    'Potential savings': -38.7,
  },
  {
    date: 'Nov 23',
    'Actual costs': 49190,
    'Potential costs': 33020,
    'Potential savings': -32.9,
  },
  {
    date: 'Dec 23',
    'Actual costs': 55190,
    'Potential costs': 36090,
    'Potential savings': -34.5,
  },
  //array-end
];

const summary = [
  //array-start
  {
    category: 'Actual costs',
    total: '$540,690',
    color: 'bg-blue-500 dark:bg-blue-500',
  },
  {
    category: 'Potential costs',
    total: '$422,300',
    color: 'bg-cyan-500 dark:bg-blue-500',
  },
  {
    category: 'Potential savings (%)',
    total: '-21.9%',
    color: null,
  },
  {
    category: 'Potential savings ($)',
    total: '$118,390',
    color: null,
  },
  //array-end
];

function currencyFormatter(number: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 1,
    notation: 'compact',
    compactDisplay: 'short',
  });

  return formatter.format(number);
}

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="sm:mx-auto sm:max-w-7xl">
        <h1 className="font-medium text-gray-900 dark:text-gray-50">
          Actual costs vs. potential costs
        </h1>
        <p className="text-sm/6 text-gray-500 dark:text-gray-500">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt
        </p>
        <ul role="list" className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {summary.map((item, index) => (
            <li key={index}>
              <div className="flex space-x-3">
                {item.color && (
                  <span
                    className={cx(item.color, 'w-1 shrink-0 rounded')}
                    aria-hidden={true}
                  />
                )}
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  {item.total}
                </p>
              </div>
              {item.color !== null ? (
                <p className="pl-4 text-sm text-gray-500 dark:text-gray-500">
                  {item.category}
                </p>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {item.category}
                </p>
              )}
            </li>
          ))}
        </ul>
        <AreaChart
          data={data}
          index="date"
          categories={['Actual costs', 'Potential costs']}
          colors={['blue', 'cyan']}
          showLegend={false}
          yAxisWidth={52}
          valueFormatter={currencyFormatter}
          fill="solid"
          className="mt-10 hidden !h-72 sm:block"
        />
        <AreaChart
          data={data}
          index="date"
          categories={['Actual costs', 'Potential costs']}
          colors={['blue', 'cyan']}
          showLegend={false}
          showYAxis={false}
          startEndOnly={true}
          valueFormatter={currencyFormatter}
          fill="solid"
          className="mt-6 !h-72 sm:hidden"
        />
      </div>
    </div>
  );
}
```

### src/content/components/area-charts/area-chart-16.tsx

```tsx
'use client';

// Add this custom Color to your chartUtils.ts file

// darkGray: {
//   bg: 'bg-gray-800 dark:bg-gray-200',
//   stroke: 'stroke-gray-800 dark:stroke-gray-200',
//   fill: 'fill-gray-800 dark:fill-gray-200',
//   text: 'text-gray-800 dark:text-gray-200',
// },
import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import {
  Area,
  CartesianGrid,
  Dot,
  Label,
  Line,
  AreaChart as RechartsAreaChart,
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
  hasOnlyOneValueForKey,
} from '@/lib/chartUtils';
import { useOnWindowResize } from '@/lib/useOnWindowResize';
import { cx } from '@/lib/utils';

// Custom Tremor copy-and-paste AreaChart [v0.3.0]

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
          'h-[3px] w-3.5 shrink-0 rounded-full',
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

  const legendPayload = payload.filter((item: any) => item.type !== 'none');

  const paddingLeft =
    legendPosition === 'left' && yAxisWidth ? yAxisWidth - 8 : 0;

  return (
    <div
      ref={legendRef}
      style={{ paddingLeft: paddingLeft }}
      className={cx(
        'flex items-center',
        { 'justify-center': legendPosition === 'center' },
        { 'justify-start': legendPosition === 'left' },
        { 'justify-end': legendPosition === 'right' },
      )}
    >
      <Legend
        categories={legendPayload.map((entry: any) => entry.value)}
        colors={legendPayload.map((entry: any) =>
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
                    'h-[3px] w-3.5 shrink-0 rounded-full',
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

//#region AreaChart

interface ActiveDot {
  index?: number;
  dataKey?: string;
}

type BaseEventProps = {
  eventType: 'dot' | 'category';
  categoryClicked: string;
  [key: string]: number | string;
};

type AreaChartEventProps = BaseEventProps | null | undefined;

interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
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
  onValueChange?: (value: AreaChartEventProps) => void;
  enableLegendSlider?: boolean;
  tickGap?: number;
  connectNulls?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  type?: 'default' | 'stacked' | 'percent';
  legendPosition?: 'left' | 'center' | 'right';
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  customTooltip?: React.ComponentType<TooltipProps>;
}

const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  (props, ref) => {
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
      connectNulls = false,
      className,
      onValueChange,
      enableLegendSlider = false,
      tickGap = 5,
      xAxisLabel,
      yAxisLabel,
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
    const [activeDot, setActiveDot] = React.useState<ActiveDot | undefined>(
      undefined,
    );
    const [activeLegend, setActiveLegend] = React.useState<string | undefined>(
      undefined,
    );
    const categoryColors = constructCategoryColors(categories, colors);

    const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
    const hasOnValueChange = !!onValueChange;
    const stacked = type === 'stacked' || type === 'percent';

    const prevActiveRef = React.useRef<boolean | undefined>(undefined);
    const prevLabelRef = React.useRef<string | undefined>(undefined);

    const getFillContent = ({
      activeDot,
      activeLegend,
      category,
    }: {
      activeDot: ActiveDot | undefined;
      activeLegend: string | undefined;
      category: string;
    }) => {
      const stopOpacity =
        activeDot || (activeLegend && activeLegend !== category)
          ? 'opacity-[30%]'
          : '';

      return (
        <pattern
          id="raster"
          patternUnits="userSpaceOnUse"
          width="64"
          height="64"
        >
          <path
            d="M-106 110L22 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-98 110L30 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-90 110L38 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-82 110L46 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-74 110L54 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-66 110L62 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-58 110L70 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-50 110L78 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-42 110L86 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-34 110L94 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-26 110L102 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-18 110L110 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-10 110L118 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-2 110L126 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M6 110L134 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M14 110L142 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M22 110L150 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
        </pattern>
      );
    };

    function valueToPercent(value: number) {
      return `${(value * 100).toFixed(0)}%`;
    }

    function onDotClick(itemData: any, event: React.MouseEvent) {
      event.stopPropagation();

      if (!hasOnValueChange) return;
      if (
        (itemData.index === activeDot?.index &&
          itemData.dataKey === activeDot?.dataKey) ||
        (hasOnlyOneValueForKey(data, itemData.dataKey) &&
          activeLegend &&
          activeLegend === itemData.dataKey)
      ) {
        setActiveLegend(undefined);
        setActiveDot(undefined);
        onValueChange?.(null);
      } else {
        setActiveLegend(itemData.dataKey);
        setActiveDot({
          index: itemData.index,
          dataKey: itemData.dataKey,
        });
        onValueChange?.({
          eventType: 'dot',
          categoryClicked: itemData.dataKey,
          ...itemData.payload,
        });
      }
    }

    function onCategoryClick(dataKey: string) {
      if (!hasOnValueChange) return;
      if (
        (dataKey === activeLegend && !activeDot) ||
        (hasOnlyOneValueForKey(data, dataKey) &&
          activeDot &&
          activeDot.dataKey === dataKey)
      ) {
        setActiveLegend(undefined);
        onValueChange?.(null);
      } else {
        setActiveLegend(dataKey);
        onValueChange?.({
          eventType: 'category',
          categoryClicked: dataKey,
        });
      }
      setActiveDot(undefined);
    }

    return (
      <div ref={ref} className={cx('h-80 w-full', className)} {...other}>
        <ResponsiveContainer>
          <RechartsAreaChart
            data={data}
            onClick={
              hasOnValueChange && (activeLegend || activeDot)
                ? () => {
                    setActiveDot(undefined);
                    setActiveLegend(undefined);
                    onValueChange?.(null);
                  }
                : undefined
            }
            margin={{
              bottom: xAxisLabel ? 30 : undefined,
              left: yAxisLabel ? 20 : undefined,
              right: yAxisLabel ? 5 : undefined,
              top: 15,
            }}
            stackOffset={type === 'percent' ? 'expand' : undefined}
          >
            {showGridLines ? (
              <CartesianGrid
                className={cx('stroke-gray-200 stroke-1 dark:stroke-gray-800')}
                horizontal={true}
                vertical={false}
              />
            ) : null}
            <XAxis
              padding={{ left: paddingValue, right: paddingValue }}
              hide={!showXAxis}
              dataKey={index}
              interval={startEndOnly ? 'preserveStartEnd' : intervalType}
              tick={{ transform: 'translate(0, 6)' }}
              ticks={
                startEndOnly
                  ? [data[0][index], data[data.length - 1][index]]
                  : undefined
              }
              fill=""
              stroke=""
              className={cx(
                // base
                'text-xs',
                // text fill
                'fill-gray-500 dark:fill-gray-500',
              )}
              tickLine={false}
              axisLine={false}
              minTickGap={tickGap}
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
              tickLine={true}
              type="number"
              tickSize={8}
              domain={yAxisDomain as AxisDomain}
              tick={{ transform: 'translate(-6, 0)' }}
              fill=""
              stroke=""
              className={cx(
                // base
                'text-xs',
                // text fill
                'fill-gray-500 stroke-gray-800 dark:fill-gray-500 dark:stroke-gray-300',
              )}
              tickFormatter={
                type === 'percent' ? valueToPercent : valueFormatter
              }
              allowDecimals={allowDecimals}
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
              cursor={{ stroke: '#d1d5db', strokeWidth: 1 }}
              offset={20}
              position={{ y: 0 }}
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
            {categories.map((category) => {
              return (
                <React.Fragment key={category}>
                  <defs key={category}>
                    {getFillContent({
                      activeDot: activeDot,
                      activeLegend: activeLegend,
                      category: category,
                    })}
                  </defs>
                  <Area
                    className={cx(
                      getColorClassName(
                        categoryColors.get(
                          category,
                        ) as AvailableChartColorsKeys,
                        'stroke',
                      ),
                    )}
                    strokeOpacity={
                      activeDot || (activeLegend && activeLegend !== category)
                        ? 0.3
                        : 1
                    }
                    activeDot={(props: any) => {
                      const {
                        cx: cxCoord,
                        cy: cyCoord,
                        stroke,
                        strokeLinecap,
                        strokeLinejoin,
                        strokeWidth,
                        dataKey,
                      } = props;
                      return (
                        <Dot
                          className={cx(
                            'stroke-white dark:stroke-gray-950',
                            onValueChange ? 'cursor-pointer' : '',
                            getColorClassName(
                              categoryColors.get(
                                dataKey,
                              ) as AvailableChartColorsKeys,
                              'fill',
                            ),
                          )}
                          cx={cxCoord}
                          cy={cyCoord}
                          r={5}
                          fill=""
                          stroke={stroke}
                          strokeLinecap={strokeLinecap}
                          strokeLinejoin={strokeLinejoin}
                          strokeWidth={strokeWidth}
                          onClick={(_, event) => onDotClick(props, event)}
                        />
                      );
                    }}
                    dot={(props: any) => {
                      const {
                        stroke,
                        strokeLinecap,
                        strokeLinejoin,
                        strokeWidth,
                        cx: cxCoord,
                        cy: cyCoord,
                        dataKey,
                        index,
                      } = props;

                      if (
                        (hasOnlyOneValueForKey(data, category) &&
                          !(
                            activeDot ||
                            (activeLegend && activeLegend !== category)
                          )) ||
                        (activeDot?.index === index &&
                          activeDot?.dataKey === category)
                      ) {
                        return (
                          <Dot
                            key={index}
                            cx={cxCoord}
                            cy={cyCoord}
                            r={5}
                            stroke={stroke}
                            fill=""
                            strokeLinecap={strokeLinecap}
                            strokeLinejoin={strokeLinejoin}
                            strokeWidth={strokeWidth}
                            className={cx(
                              'stroke-white dark:stroke-gray-950',
                              onValueChange ? 'cursor-pointer' : '',
                              getColorClassName(
                                categoryColors.get(
                                  dataKey,
                                ) as AvailableChartColorsKeys,
                                'fill',
                              ),
                            )}
                          />
                        );
                      }
                      return <React.Fragment key={index}></React.Fragment>;
                    }}
                    key={category}
                    name={category}
                    type="linear"
                    dataKey={category}
                    stroke=""
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    isAnimationActive={false}
                    connectNulls={connectNulls}
                    stackId={stacked ? 'stack' : undefined}
                    fill="url(#raster)"
                  />
                </React.Fragment>
              );
            })}
            {/* hidden lines to increase clickable target area */}
            {onValueChange
              ? categories.map((category) => (
                  <Line
                    className={cx('cursor-pointer')}
                    strokeOpacity={0}
                    key={category}
                    name={category}
                    type="linear"
                    dataKey={category}
                    stroke="transparent"
                    fill="transparent"
                    legendType="none"
                    tooltipType="none"
                    strokeWidth={12}
                    connectNulls={connectNulls}
                    onClick={(props: any, event) => {
                      event.stopPropagation();
                      const { name } = props;
                      onCategoryClick(name);
                    }}
                  />
                ))
              : null}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

AreaChart.displayName = 'AreaChart';

const data = [
  // array-start
  {
    date: '2010',
    AUM: 341,
  },
  {
    date: '2011',
    AUM: 312,
  },
  {
    date: '2012',
    AUM: 350,
  },
  {
    date: '2013',
    AUM: 381,
  },
  {
    date: '2014',
    AUM: 287,
  },
  {
    date: '2015',
    AUM: 394,
  },
  {
    date: '2016',
    AUM: 437,
  },
  {
    date: '2017',
    AUM: 463,
  },
  {
    date: '2018',
    AUM: 482,
  },
  {
    date: '2019',
    AUM: 501,
  },
  {
    date: '2020',
    AUM: 372,
  },
  {
    date: '2021',
    AUM: 422,
  },
  {
    date: '2022',
    AUM: 443,
  },
  {
    date: '2023',
    AUM: 461,
  },
  // array-end
];

const calculateTotalAUM = (data: any[]) =>
  data.reduce((total, item) => total + item.AUM, 0);

const currencyFormatter = (number: number) =>
  '$' + Intl.NumberFormat('us').format(number).toString() + 'M';

export default function Example() {
  const totalAUM = React.useMemo(() => calculateTotalAUM(data), [data]);
  return (
    <div className="obfuscate">
      <div className="sm:mx-auto sm:max-w-7xl">
        <h1 className="font-medium text-gray-900 dark:text-gray-50">
          Assets under management
        </h1>
        <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
          With{' '}
          <span className="font-semibold">{currencyFormatter(totalAUM)}</span>{' '}
          million in assets under management as of 31 December 2023, Friends
          Group provides an innovative range client solutions to institutional
          investors.
        </p>
        <AreaChart
          data={data}
          index="date"
          categories={['AUM']}
          showLegend={false}
          yAxisWidth={56}
          colors={['darkGray']}
          valueFormatter={currencyFormatter}
          className="mt-10 hidden !h-72 sm:block"
        />
        <AreaChart
          data={data}
          index="date"
          categories={['AUM']}
          showLegend={false}
          showYAxis={false}
          startEndOnly={true}
          colors={['darkGray']}
          valueFormatter={currencyFormatter}
          className="mt-6 !h-72 sm:hidden"
        />
      </div>
    </div>
  );
}
```

### src/content/components/area-charts/index.ts

```ts
export { default as AreaChart01 } from './area-chart-01';
export { default as AreaChart02 } from './area-chart-02';
export { default as AreaChart03 } from './area-chart-03';
export { default as AreaChart04 } from './area-chart-04';
export { default as AreaChart05 } from './area-chart-05';
export { default as AreaChart06 } from './area-chart-06';
export { default as AreaChart07 } from './area-chart-07';
export { default as AreaChart08 } from './area-chart-08';
export { default as AreaChart09 } from './area-chart-09';
export { default as AreaChart10 } from './area-chart-10';
export { default as AreaChart11 } from './area-chart-11';
export { default as AreaChart12 } from './area-chart-12';
export { default as AreaChart13 } from './area-chart-13';
export { default as AreaChart14 } from './area-chart-14';
export { default as AreaChart15 } from './area-chart-15';
export { default as AreaChart16 } from './area-chart-16';
```
