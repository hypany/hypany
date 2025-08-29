# Components / chart-tooltips

[Back to index](index.md)

## Components / chart-tooltips

Files:
- `src/content/components/chart-tooltips/chart-tooltip-01.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-02.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-03.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-04.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-05.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-06.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-07.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-08.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-09.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-10.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-11.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-12.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-13.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-14.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-15.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-16.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-17.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-18.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-19.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-20.tsx`
- `src/content/components/chart-tooltips/chart-tooltip-21.tsx`
- `src/content/components/chart-tooltips/index.ts`

### src/content/components/chart-tooltips/chart-tooltip-01.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

const valueFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString() + ' bpm';

const data = [
  //array-start
  {
    date: 'Jan 23',
    Running: 167,
  },
  {
    date: 'Feb 23',
    Running: 125,
  },
  {
    date: 'Mar 23',
    Running: 156,
  },
  {
    date: 'Apr 23',
    Running: 165,
  },
  {
    date: 'May 23',
    Running: 153,
  },
  {
    date: 'Jun 23',
    Running: 124,
  },
  {
    date: 'Jul 23',
    Running: 164,
  },
  {
    date: 'Aug 23',
    Running: 123,
  },
  {
    date: 'Sep 23',
    Running: 132,
  },
  {
    date: 'Oct 23',
    Running: 149,
  },
  {
    date: 'Nov 23',
    Running: 149,
  },
  {
    date: 'Dec 23',
    Running: 121,
  },
  //array-end
];

const CustomTooltip = ({ payload, active }: Omit<TooltipProps, 'label'>) => {
  if (!active || !payload || payload.length === 0) return null;
  const categoryPayload = payload[0];

  return (
    <div className="w-52 rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="flex w-full items-center justify-between space-x-4 px-2.5 py-2">
        <div className="flex items-center space-x-2 truncate">
          <span
            className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
            aria-hidden={true}
          />
          <p className="truncate text-gray-500 dark:text-gray-500">
            {categoryPayload.category}
          </p>
        </div>
        <p className="font-medium text-gray-900 dark:text-gray-50">
          {Intl.NumberFormat('us').format(categoryPayload.value).toString() +
            ' bpm'}
        </p>
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      {/* Demo */}
      <div className="flex w-full justify-center">
        <CustomTooltip
          active={true}
          payload={[
            {
              category: 'Running',
              value: 180,
              index: 'Mar 23',
              color: 'blue',
              payload: {
                date: 'Mar 23',
                Running: 180,
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['Running']}
            valueFormatter={valueFormatter}
            customTooltip={CustomTooltip}
            yAxisWidth={70}
            showLegend={false}
          />
          <BarChart
            className="mt-12 !h-72 sm:hidden"
            data={data}
            index="date"
            categories={['Running']}
            valueFormatter={valueFormatter}
            customTooltip={CustomTooltip}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-02.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

const valueFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString() + ' bpm';

const data = [
  //array-start
  {
    date: 'Jan 23',
    Running: 167,
  },
  {
    date: 'Feb 23',
    Running: 125,
  },
  {
    date: 'Mar 23',
    Running: 156,
  },
  {
    date: 'Apr 23',
    Running: 165,
  },
  {
    date: 'May 23',
    Running: 153,
  },
  {
    date: 'Jun 23',
    Running: 124,
  },
  {
    date: 'Jul 23',
    Running: 164,
  },
  {
    date: 'Aug 23',
    Running: 123,
  },
  {
    date: 'Sep 23',
    Running: 132,
  },
  {
    date: 'Oct 23',
    Running: 149,
  },
  {
    date: 'Nov 23',
    Running: 149,
  },
  {
    date: 'Dec 23',
    Running: 121,
  },
  //array-end
];

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;
  const categoryPayload = payload[0];

  return (
    <div className="w-52 rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="rounded-t-md border-b border-gray-200 bg-gray-100 px-2.5 py-2 dark:border-gray-800 dark:bg-gray-900">
        <p className="font-medium text-gray-500 dark:text-gray-500">{label}</p>
      </div>
      <div className="flex w-full items-center justify-between space-x-4 px-2.5 py-2">
        <div className="flex items-center space-x-2 truncate">
          <span
            className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
            aria-hidden={true}
          />
          <p className="truncate text-gray-500 dark:text-gray-500">
            {categoryPayload.category}
          </p>
        </div>
        <p className="font-medium text-gray-900 dark:text-gray-50">
          {Intl.NumberFormat('us').format(categoryPayload.value).toString() +
            ' bpm'}
        </p>
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      {/* Demo */}
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Mar 23"
          active={true}
          payload={[
            {
              category: 'Running',
              value: 3322,
              index: 'Mar 23',
              color: 'blue',
              payload: {
                date: 'Mar 23',
                Running: 3322,
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['Running']}
            valueFormatter={valueFormatter}
            yAxisWidth={70}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-72 sm:hidden"
            data={data}
            index="date"
            categories={['Running']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-03.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

const valueFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString() + ' bpm';

const data = [
  //array-start
  {
    date: 'Jan 23',
    Running: 167,
  },
  {
    date: 'Feb 23',
    Running: 125,
  },
  {
    date: 'Mar 23',
    Running: 156,
  },
  {
    date: 'Apr 23',
    Running: 165,
  },
  {
    date: 'May 23',
    Running: 153,
  },
  {
    date: 'Jun 23',
    Running: 124,
  },
  {
    date: 'Jul 23',
    Running: 164,
  },
  {
    date: 'Aug 23',
    Running: 123,
  },
  {
    date: 'Sep 23',
    Running: 132,
  },
  {
    date: 'Oct 23',
    Running: 149,
  },
  {
    date: 'Nov 23',
    Running: 149,
  },
  {
    date: 'Dec 23',
    Running: 121,
  },
  //array-end
];

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;
  const categoryPayload = payload[0];

  return (
    <div className="w-52 rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="p-2">
        <div className="rounded border border-gray-200 bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-900">
          <p className="font-medium text-gray-500 dark:text-gray-500">
            {label}
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between space-x-4 px-3 pb-2">
        <div className="flex items-center space-x-2 truncate">
          <span
            className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:text-blue-500"
            aria-hidden={true}
          />
          <p className="truncate text-gray-500 dark:text-gray-500">
            {categoryPayload.category}
          </p>
        </div>
        <p className="font-medium text-gray-900 dark:text-gray-50">
          {Intl.NumberFormat('us').format(categoryPayload.value).toString() +
            ' bpm'}
        </p>
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Jun 23"
          active={true}
          payload={[
            {
              category: 'Running',
              value: 180,
              index: 'Jun 23',
              color: 'blue',
              payload: {
                date: 'Jun 23',
                Running: 180,
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['Running']}
            valueFormatter={valueFormatter}
            yAxisWidth={70}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-72 sm:hidden"
            data={data}
            index="date"
            categories={['Running']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-04.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

interface Issue {
  status: 'completed' | 'in progress' | 'on hold';
  value: number;
  percentage: number;
}

interface DataEntry {
  date: string;
  issues: Issue[];
}

const data: DataEntry[] = [
  //array-start
  {
    date: 'Oct 1, 2023',
    issues: [
      {
        status: 'completed',
        value: 48,
        percentage: 24.2,
      },
      {
        status: 'in progress',
        value: 83,
        percentage: 41.9,
      },
      {
        status: 'on hold',
        value: 67,
        percentage: 33.9,
      },
    ],
  },
  {
    date: 'Oct 2, 2023',
    issues: [
      {
        status: 'completed',
        value: 20,
        percentage: 20.6,
      },
      {
        status: 'in progress',
        value: 97,
        percentage: 77.3,
      },
      {
        status: 'on hold',
        value: 12,
        percentage: 2.1,
      },
    ],
  },
  {
    date: 'Oct 3, 2023',
    issues: [
      {
        status: 'completed',
        value: 30,
        percentage: 29.4,
      },
      {
        status: 'in progress',
        value: 45,
        percentage: 43.1,
      },
      {
        status: 'on hold',
        value: 66,
        percentage: 27.5,
      },
    ],
  },
  {
    date: 'Oct 4, 2023',
    issues: [
      {
        status: 'completed',
        value: 41,
        percentage: 28.1,
      },
      {
        status: 'in progress',
        value: 18,
        percentage: 17.9,
      },
      {
        status: 'on hold',
        value: 70,
        percentage: 54.0,
      },
    ],
  },
  {
    date: 'Oct 5, 2023',
    issues: [
      {
        status: 'completed',
        value: 55,
        percentage: 28.8,
      },
      {
        status: 'in progress',
        value: 14,
        percentage: 25.0,
      },
      {
        status: 'on hold',
        value: 60,
        percentage: 46.2,
      },
    ],
  },
  {
    date: 'Oct 6, 2023',
    issues: [
      {
        status: 'completed',
        value: 35,
        percentage: 28.8,
      },
      {
        status: 'in progress',
        value: 14,
        percentage: 19.2,
      },
      {
        status: 'on hold',
        value: 80,
        percentage: 51.9,
      },
    ],
  },
  {
    date: 'Oct 7, 2023',
    issues: [
      {
        status: 'completed',
        value: 15,
        percentage: 20.0,
      },
      {
        status: 'in progress',
        value: 55,
        percentage: 35.2,
      },
      {
        status: 'on hold',
        value: 72,
        percentage: 44.8,
      },
    ],
  },
  {
    date: 'Oct 8, 2023',
    issues: [
      {
        status: 'completed',
        value: 15,
        percentage: 21.7,
      },
      {
        status: 'in progress',
        value: 69,
        percentage: 48.2,
      },
      {
        status: 'on hold',
        value: 45,
        percentage: 30.1,
      },
    ],
  },
  {
    date: 'Oct 9, 2023',
    issues: [
      {
        status: 'completed',
        value: 74,
        percentage: 39.5,
      },
      {
        status: 'in progress',
        value: 39,
        percentage: 37.1,
      },
      {
        status: 'on hold',
        value: 16,
        percentage: 23.4,
      },
    ],
  },
  //array-end
];

const statusColors: { [key in Issue['status']]: string } = {
  completed: 'bg-blue-500 dark:bg-blue-500',
  'in progress': 'bg-cyan-500 dark:bg-cyan-500',
  'on hold': 'bg-violet-500 dark:bg-violet-500',
};

// Transform data into a format suitable for BarChart
const formattedArray = data.map((entry) => {
  return {
    date: entry.date,
    ...entry.issues.reduce(
      (acc, issue) => {
        acc[issue.status] = issue.value;
        return acc;
      },
      {} as { [key in Issue['status']]?: number },
    ),
  };
});

const valueFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString();
};

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload.map((item) => ({
    status: item.category as Issue['status'],
    value: item.value,
    percentage: (
      (item.value /
        (item.payload.completed +
          item.payload['in progress'] +
          item.payload['on hold'])) *
      100
    ).toFixed(2),
  }));

  return (
    <div className="w-56 rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="px-3 py-2.5">
        <p className="text-gray-700 dark:text-gray-300">{label}</p>
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className="flex space-x-2 overflow-hidden border-t border-gray-200 last:rounded-b-md dark:border-gray-800"
        >
          <span
            className={cx(statusColors[item.status], 'w-1 shrink-0')}
            aria-hidden={true}
          />
          <div className="flex w-full items-center justify-between py-2 pr-3">
            <p className="text-gray-500 dark:text-gray-500">{item.status}</p>
            <div className="flex items-center space-x-1 text-gray-900 dark:text-gray-50">
              <span className="font-medium">{item.value}</span>
              <span>({item.percentage}&#37;)</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Oct 5, 2023"
          active={true}
          payload={[
            //array-start
            {
              category: 'completed',
              value: 20,
              index: 'Oct 2, 2023',
              color: 'blue',
              payload: {
                date: 'Oct 2, 2023',
                completed: 20,
                'in progress': 97,
                'on hold': 12,
              },
            },
            {
              category: 'in progress',
              value: 97,
              index: 'Oct 2, 2023',
              color: 'cyan',
              payload: {
                date: 'Oct 2, 2023',
                completed: 20,
                'in progress': 97,
                'on hold': 12,
              },
            },
            {
              category: 'on hold',
              value: 12,
              index: 'Oct 2, 2023',
              color: 'violet',
              payload: {
                date: 'Oct 2, 2023',
                completed: 20,
                'in progress': 97,
                'on hold': 12,
              },
            },
            //array-end
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={formattedArray}
            index="date"
            categories={['completed', 'in progress', 'on hold']}
            type="stacked"
            colors={['blue', 'cyan', 'violet']}
            valueFormatter={valueFormatter}
            yAxisWidth={30}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-80 sm:hidden"
            data={formattedArray}
            index="date"
            categories={['completed', 'in progress', 'on hold']}
            type="stacked"
            colors={['blue', 'cyan', 'violet']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-05.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

interface Issue {
  status: 'completed' | 'in progress';
  value: number;
  percentage: number;
}

interface DataEntry {
  date: string;
  issues: Issue[];
}

const data: DataEntry[] = [
  //array-start
  {
    date: 'Oct 1, 2023',
    issues: [
      {
        status: 'completed',
        value: 48,
        percentage: 36.7,
      },
      {
        status: 'in progress',
        value: 83,
        percentage: 63.3,
      },
    ],
  },
  {
    date: 'Oct 2, 2023',
    issues: [
      {
        status: 'completed',
        value: 20,
        percentage: 17.1,
      },
      {
        status: 'in progress',
        value: 97,
        percentage: 82.9,
      },
    ],
  },
  {
    date: 'Oct 3, 2023',
    issues: [
      {
        status: 'completed',
        value: 30,
        percentage: 40.0,
      },
      {
        status: 'in progress',
        value: 45,
        percentage: 60.0,
      },
    ],
  },
  {
    date: 'Oct 4, 2023',
    issues: [
      {
        status: 'completed',
        value: 41,
        percentage: 69.5,
      },
      {
        status: 'in progress',
        value: 18,
        percentage: 30.5,
      },
    ],
  },
  {
    date: 'Oct 5, 2023',
    issues: [
      {
        status: 'completed',
        value: 55,
        percentage: 79.7,
      },
      {
        status: 'in progress',
        value: 14,
        percentage: 20.3,
      },
    ],
  },
  {
    date: 'Oct 6, 2023',
    issues: [
      {
        status: 'completed',
        value: 35,
        percentage: 71.2,
      },
      {
        status: 'in progress',
        value: 14,
        percentage: 28.8,
      },
    ],
  },
  {
    date: 'Oct 7, 2023',
    issues: [
      {
        status: 'completed',
        value: 15,
        percentage: 21.4,
      },
      {
        status: 'in progress',
        value: 55,
        percentage: 78.6,
      },
    ],
  },
  {
    date: 'Oct 8, 2023',
    issues: [
      {
        status: 'completed',
        value: 15,
        percentage: 17.9,
      },
      {
        status: 'in progress',
        value: 69,
        percentage: 82.1,
      },
    ],
  },
  {
    date: 'Oct 9, 2023',
    issues: [
      {
        status: 'completed',
        value: 74,
        percentage: 65.5,
      },
      {
        status: 'in progress',
        value: 39,
        percentage: 34.5,
      },
    ],
  },
  //array-end
];

const statusColors: { [key in Issue['status']]: string } = {
  completed: 'bg-blue-500 dark:bg-blue-500',
  'in progress': 'bg-cyan-500 dark:bg-cyan-500',
};

// Transform data into a format suitable for BarChart
const formattedArray = data.map((entry) => {
  return {
    date: entry.date,
    ...entry.issues.reduce(
      (acc, issue) => {
        acc[issue.status] = issue.value;
        return acc;
      },
      {} as { [key in Issue['status']]?: number },
    ),
  };
});

const valueFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString();
};

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload.map((item) => ({
    status: item.category as Issue['status'],
    value: item.value,
    percentage: (
      (item.value / (item.payload.completed + item.payload['in progress'])) *
      100
    ).toFixed(2),
  }));

  return (
    <div className="w-56 rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="px-3 py-2.5">
        <p className="text-gray-700 dark:text-gray-300">{label}</p>
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className="flex space-x-2 overflow-hidden border-t border-gray-200 last:rounded-b-md dark:border-gray-800"
        >
          <span
            className={cx(statusColors[item.status], 'w-1 shrink-0')}
            aria-hidden={true}
          />
          <div className="w-full py-2">
            <p className="text-gray-500 dark:text-gray-500">{item.status}</p>
            <div className="mt-1 flex items-center space-x-1 text-gray-900 dark:text-gray-50">
              <span className="font-medium">{item.value}</span>
              <span>({item.percentage}&#37;)</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Oct 5, 2023"
          active={true}
          payload={[
            //array-start
            {
              category: 'completed',
              value: 20,
              index: 'Oct 2, 2023',
              color: 'blue',
              payload: {
                date: 'Oct 2, 2023',
                completed: 20,
                'in progress': 97,
              },
            },
            {
              category: 'in progress',
              value: 97,
              index: 'Oct 2, 2023',
              color: 'cyan',
              payload: {
                date: 'Oct 2, 2023',
                completed: 20,
                'in progress': 97,
              },
            },
            //array-end
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={formattedArray}
            index="date"
            categories={['completed', 'in progress']}
            type="stacked"
            colors={['blue', 'cyan']}
            valueFormatter={valueFormatter}
            yAxisWidth={30}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-80 sm:hidden"
            data={formattedArray}
            index="date"
            categories={['completed', 'in progress']}
            type="stacked"
            colors={['blue', 'cyan']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-06.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

interface DataItem {
  month: string;
  sales: number;
}

const data: DataItem[] = [
  //array-start
  {
    month: 'Jan 23',
    sales: 4310,
  },
  {
    month: 'Feb 23',
    sales: 326,
  },
  {
    month: 'Mar 23',
    sales: 2350,
  },
  {
    month: 'Apr 23',
    sales: 2780,
  },
  {
    month: 'May 23',
    sales: 1890,
  },
  {
    month: 'Jun 23',
    sales: 2390,
  },
  {
    month: 'Jul 23',
    sales: 3490,
  },
  {
    month: 'Aug 23',
    sales: 3290,
  },
  {
    month: 'Sep 23',
    sales: 2980,
  },
  {
    month: 'Oct 23',
    sales: 2320,
  },
  {
    month: 'Nov 23',
    sales: 2630,
  },
  {
    month: 'Dec 23',
    sales: 2910,
  },
  //array-end
];

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const categoryPayload = payload[0];

  const previousIndex = data.findIndex((e) => e['month'] === label);
  const previousValues: DataItem | undefined =
    previousIndex > 0 ? data[previousIndex - 1] : undefined;

  const prev = previousValues
    ? previousValues[categoryPayload.category as keyof DataItem]
    : undefined;
  const percentage =
    typeof prev === 'number' && typeof categoryPayload.value === 'number'
      ? ((categoryPayload.value - prev) / prev) * 100
      : undefined;

  return (
    <div className="flex w-52 items-center justify-between space-x-6 rounded-md border border-gray-200 bg-white p-1.5 text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <p className="text-gray-500 dark:text-gray-500">{label}</p>
      <div className="flex items-center space-x-2">
        <span className="font-medium text-gray-900 dark:text-gray-50">
          {currencyFormatter(categoryPayload.value)}
        </span>
        {percentage ? (
          <span
            className={`rounded px-1.5 py-0.5 text-xs font-medium ${
              percentage > 0
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-500'
                : 'bg-red-100 text-red-800 dark:bg-red-400/10 dark:text-red-500'
            }`}
          >
            {percentage > 0 ? '+' : ''}
            {percentage.toFixed(1)}%
          </span>
        ) : (
          <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-900 dark:text-gray-300">
            --
          </span>
        )}
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Oct 23"
          active={true}
          payload={[
            {
              category: 'sales',
              value: 2320,
              index: 'Oct 23',
              color: 'blue',
              payload: {
                date: 'Oct 23',
                Sales: 2320,
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="month"
            categories={['sales']}
            valueFormatter={currencyFormatter}
            yAxisWidth={56}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-80 sm:hidden"
            data={data}
            index="month"
            categories={['sales']}
            valueFormatter={currencyFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-07.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

interface DataItem {
  month: string;
  sales: number;
}

const data: DataItem[] = [
  //array-start
  {
    month: 'Jan 23',
    sales: 4310,
  },
  {
    month: 'Feb 23',
    sales: 3250,
  },
  {
    month: 'Mar 23',
    sales: 2350,
  },
  {
    month: 'Apr 23',
    sales: 2780,
  },
  {
    month: 'May 23',
    sales: 1890,
  },
  {
    month: 'Jun 23',
    sales: 2390,
  },
  {
    month: 'Jul 23',
    sales: 3490,
  },
  {
    month: 'Aug 23',
    sales: 3290,
  },
  {
    month: 'Sep 23',
    sales: 2980,
  },
  {
    month: 'Oct 23',
    sales: 2320,
  },
  {
    month: 'Nov 23',
    sales: 2630,
  },
  {
    month: 'Dec 23',
    sales: 2910,
  },
  //array-end
];

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const categoryPayload = payload[0];

  const previousIndex = data.findIndex((e) => e['month'] === label);
  const previousValues: DataItem | undefined =
    previousIndex > 0 ? data[previousIndex - 1] : undefined;

  const prev = previousValues
    ? previousValues[categoryPayload.category as keyof DataItem]
    : undefined;
  const percentage =
    typeof prev === 'number' && typeof categoryPayload.value === 'number'
      ? ((categoryPayload.value - prev) / prev) * 100
      : undefined;

  return (
    <div className="rounded-md border border-gray-200 bg-white px-4 py-3 text-center shadow-md dark:border-gray-800 dark:bg-gray-950">
      <p className="text-sm text-gray-500 dark:text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900 dark:text-gray-50">
        {currencyFormatter(categoryPayload.value)}
      </p>
      <div className="mt-2 flex items-center justify-center space-x-1 whitespace-nowrap text-sm">
        {percentage ? (
          <span
            className={cx(
              percentage > 0
                ? 'text-emerald-700 dark:text-emerald-500'
                : 'text-red-700 dark:text-red-500',
              'font-medium',
            )}
          >
            {percentage > 0 ? '+' : null}
            {percentage.toFixed(1)}%
          </span>
        ) : (
          <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            --
          </span>
        )}
        <span className="text-gray-500 dark:text-gray-500">
          from previous month
        </span>
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Oct 23"
          active={true}
          payload={[
            {
              category: 'sales',
              value: 2320,
              index: 'Oct 23',
              color: 'blue',
              payload: {
                date: 'Oct 23',
                Sales: 2320,
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="month"
            categories={['sales']}
            valueFormatter={currencyFormatter}
            yAxisWidth={50}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-80 sm:hidden"
            data={data}
            index="month"
            categories={['sales']}
            valueFormatter={currencyFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-08.tsx

```tsx
'use client';

import { RiArrowDownSLine } from '@remixicon/react';
import React from 'react';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import {
  ProgressCircle,
  ProgressCircleProps,
} from '@/components/ProgressCircle';

interface Issue {
  status: 'completed' | 'in progress' | 'on hold';
  value: number;
  percentage: number;
}

interface DataEntry {
  date: string;
  issues: Issue[];
}

const data: DataEntry[] = [
  //array-start
  {
    date: 'Oct 1, 2023',
    issues: [
      {
        status: 'completed',
        value: 48,
        percentage: 24.2,
      },
      {
        status: 'in progress',
        value: 83,
        percentage: 41.9,
      },
      {
        status: 'on hold',
        value: 67,
        percentage: 33.9,
      },
    ],
  },
  {
    date: 'Oct 2, 2023',
    issues: [
      {
        status: 'completed',
        value: 20,
        percentage: 20.6,
      },
      {
        status: 'in progress',
        value: 97,
        percentage: 77.3,
      },
      {
        status: 'on hold',
        value: 12,
        percentage: 2.1,
      },
    ],
  },
  {
    date: 'Oct 3, 2023',
    issues: [
      {
        status: 'completed',
        value: 30,
        percentage: 29.4,
      },
      {
        status: 'in progress',
        value: 45,
        percentage: 43.1,
      },
      {
        status: 'on hold',
        value: 66,
        percentage: 27.5,
      },
    ],
  },
  {
    date: 'Oct 4, 2023',
    issues: [
      {
        status: 'completed',
        value: 41,
        percentage: 28.1,
      },
      {
        status: 'in progress',
        value: 18,
        percentage: 17.9,
      },
      {
        status: 'on hold',
        value: 70,
        percentage: 54.0,
      },
    ],
  },
  {
    date: 'Oct 5, 2023',
    issues: [
      {
        status: 'completed',
        value: 55,
        percentage: 28.8,
      },
      {
        status: 'in progress',
        value: 14,
        percentage: 25.0,
      },
      {
        status: 'on hold',
        value: 60,
        percentage: 46.2,
      },
    ],
  },
  {
    date: 'Oct 6, 2023',
    issues: [
      {
        status: 'completed',
        value: 35,
        percentage: 28.8,
      },
      {
        status: 'in progress',
        value: 14,
        percentage: 19.2,
      },
      {
        status: 'on hold',
        value: 80,
        percentage: 51.9,
      },
    ],
  },
  {
    date: 'Oct 7, 2023',
    issues: [
      {
        status: 'completed',
        value: 15,
        percentage: 20.0,
      },
      {
        status: 'in progress',
        value: 55,
        percentage: 35.2,
      },
      {
        status: 'on hold',
        value: 72,
        percentage: 44.8,
      },
    ],
  },
  {
    date: 'Oct 8, 2023',
    issues: [
      {
        status: 'completed',
        value: 15,
        percentage: 21.7,
      },
      {
        status: 'in progress',
        value: 69,
        percentage: 48.2,
      },
      {
        status: 'on hold',
        value: 45,
        percentage: 30.1,
      },
    ],
  },
  {
    date: 'Oct 9, 2023',
    issues: [
      {
        status: 'completed',
        value: 74,
        percentage: 39.5,
      },
      {
        status: 'in progress',
        value: 39,
        percentage: 37.1,
      },
      {
        status: 'on hold',
        value: 16,
        percentage: 23.4,
      },
    ],
  },
  //array-end
];

// Transform data into a format suitable for BarChart
const formattedArray = data.map((entry) => {
  return {
    date: entry.date,
    ...entry.issues.reduce(
      (acc, issue) => {
        acc[issue.status] = issue.value;
        return acc;
      },
      {} as { [key in Issue['status']]?: number },
    ),
  };
});

const valueFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString();
};

const statusColors: {
  [key in Issue['status']]: ProgressCircleProps['variant'];
} = {
  completed: 'success',
  'in progress': 'warning',
  'on hold': 'neutral',
};

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload.map((item) => ({
    status: item.category as Issue['status'],
    value: item.value,
    percentage: (
      (item.value / (item.payload.completed + item.payload['in progress'])) *
      100
    ).toFixed(2),
  }));

  return (
    <div className="w-60 rounded-md border border-gray-200 bg-white px-4 py-3 text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <p className="flex items-center justify-between">
        <span className="font-medium text-gray-900 dark:text-gray-50">
          Status
        </span>
        <span className="text-gray-500 dark:text-gray-500">{label}</span>
      </p>
      <Divider className="!my-3" />
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2.5">
            <ProgressCircle
              value={100}
              radius={7}
              strokeWidth={2.5}
              variant={statusColors[item.status]}
              aria-hidden={true}
            />
            <div className="flex w-full justify-between">
              <span className="text-gray-500 dark:text-gray-300">
                {item.status}
              </span>
              <div className="flex items-center space-x-1">
                <span className="font-medium text-gray-900 dark:text-gray-50">
                  {item.value}
                </span>
                <span className="text-gray-500 dark:text-gray-500">
                  ({item.percentage}&#37;)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Oct 5, 2023"
          active={true}
          payload={[
            //array-start
            {
              category: 'completed',
              value: 20,
              index: 'Oct 2, 2023',
              color: 'blue',
              payload: {
                date: 'Oct 2, 2023',
                completed: 20,
                'in progress': 97,
                'on hold': 12,
              },
            },
            {
              category: 'in progress',
              value: 97,
              index: 'Oct 2, 2023',
              color: 'cyan',
              payload: {
                date: 'Oct 2, 2023',
                completed: 20,
                'in progress': 97,
                'on hold': 12,
              },
            },
            {
              category: 'on hold',
              value: 12,
              index: 'Oct 2, 2023',
              color: 'violet',
              payload: {
                date: 'Oct 2, 2023',
                completed: 20,
                'in progress': 97,
                'on hold': 12,
              },
            },
            //array-end
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={formattedArray}
            index="date"
            categories={['completed', 'in progress', 'on hold']}
            colors={['emerald', 'yellow', 'gray']}
            valueFormatter={valueFormatter}
            yAxisWidth={40}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-80 sm:hidden"
            data={formattedArray}
            index="date"
            categories={['completed', 'in progress', 'on hold']}
            colors={['emerald', 'yellow', 'gray']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-09.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

const data = [
  //array-start
  {
    date: 'Jan 23',
    Revenue: 14230,
    Profit: 10010,
  },
  {
    date: 'Feb 23',
    Revenue: 19310,
    Profit: 12350,
  },
  {
    date: 'Mar 23',
    Revenue: 24470,
    Profit: 19240,
  },
  {
    date: 'Apr 23',
    Revenue: 29290,
    Profit: 24340,
  },
  {
    date: 'May 23',
    Revenue: 32090,
    Profit: 27321,
  },
  {
    date: 'Jun 23',
    Revenue: 46120,
    Profit: 39310,
  },
  {
    date: 'Jul 23',
    Revenue: 51930,
    Profit: 45250,
  },
  {
    date: 'Aug 23',
    Revenue: 59630,
    Profit: 52139,
  },
  {
    date: 'Sep 23',
    Revenue: 67120,
    Profit: 61340,
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <p className="flex items-center justify-between border-b border-gray-200 px-3 py-2 text-gray-500 dark:border-gray-800 dark:text-gray-500">
        <span className="text-gray-900 dark:text-gray-50">{label}</span>
        <span>12pm</span>
      </p>
      <div className="space-y-2 px-3 py-2">
        {payload.map((category, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span
              className={`h-1 w-3 rounded-sm bg-${category.color}-500 shrink-0`}
              aria-hidden={true}
            />
            <p className="flex w-full items-center justify-between">
              <span className="font-medium text-gray-900 dark:text-gray-50">
                {valueFormatter(category.value)}
              </span>
              <span className="text-gray-500 dark:text-gray-500">
                {category.category}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Jan 23"
          active={true}
          payload={[
            {
              category: 'Revenue',
              value: 43121,
              index: 'Jan 23',
              color: 'blue',
              payload: {
                date: 'Jan 23',
                Revenue: 43121,
              },
            },
            {
              category: 'Profit',
              value: 12923,
              index: 'Jan 23',
              color: 'emerald',
              payload: {
                date: 'Jan 23',
                Profit: 43121,
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['Revenue', 'Profit']}
            valueFormatter={valueFormatter}
            yAxisWidth={70}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-72 sm:hidden"
            data={data}
            index="date"
            categories={['Revenue', 'Profit']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-10.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { ProgressCircle } from '@/components/ProgressCircle';

const data = [
  //array-start
  {
    date: 'Jan 23',
    bpm: 167,
    effort: 23,
    recovery: 40,
    strain: 1.1,
    sleep: 89,
  },
  {
    date: 'Feb 23',
    bpm: 121,
    effort: 78,
    recovery: 45,
    strain: 4.1,
    sleep: 79,
  },
  {
    date: 'Mar 23',
    bpm: 155,
    effort: 32,
    recovery: 42,
    strain: 1.3,
    sleep: 88,
  },
  {
    date: 'Apr 23',
    bpm: 143,
    effort: 45,
    recovery: 38,
    strain: 2.0,
    sleep: 85,
  },
  {
    date: 'May 23',
    bpm: 160,
    effort: 28,
    recovery: 43,
    strain: 1.4,
    sleep: 90,
  },
  {
    date: 'Jun 23',
    bpm: 140,
    effort: 50,
    recovery: 37,
    strain: 2.2,
    sleep: 82,
  },
  {
    date: 'Jul 23',
    bpm: 152,
    effort: 35,
    recovery: 44,
    strain: 1.5,
    sleep: 91,
  },
  {
    date: 'Aug 23',
    bpm: 135,
    effort: 53,
    recovery: 36,
    strain: 2.3,
    sleep: 90,
  },
  {
    date: 'Sep 23',
    bpm: 150,
    effort: 38,
    recovery: 43,
    strain: 1.7,
    sleep: 87,
  },
  {
    date: 'Oct 23',
    bpm: 132,
    effort: 31,
    recovery: 43,
    strain: 1.9,
    sleep: 84,
  },
  {
    date: 'Nov 23',
    bpm: 139,
    effort: 39,
    recovery: 41,
    strain: 1.2,
    sleep: 88,
  },
  {
    date: 'Dec 23',
    bpm: 121,
    effort: 21,
    recovery: 99,
    strain: 1.9,
    sleep: 91,
  },
  //array-end
];

const dataFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString() + ' bpm';
};

const CustomTooltip = ({ payload, active }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload.map((item) => ({
    date: item.payload.date,
    effort: item.payload.effort,
    recovery: item.payload.recovery,
    strain: item.payload.strain,
    sleep: item.payload.sleep,
  }));

  return (
    <div className="rounded-md border border-gray-200 bg-white px-6 py-4 shadow-md dark:border-gray-800 dark:bg-gray-950">
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-6">
          <ProgressCircle value={item.effort} radius={45} variant="default">
            <ProgressCircle
              value={item.recovery}
              radius={36}
              variant="success"
            />
          </ProgressCircle>
          <div className="space-y-1">
            <div>
              <h4 className="text-xs text-gray-500 dark:text-gray-500">
                Effort
              </h4>
              <p className="font-medium text-blue-600 dark:text-blue-500">
                {item.effort}&#37;
              </p>
            </div>
            <div>
              <h4 className="text-xs text-gray-500 dark:text-gray-500">
                Recovery
              </h4>
              <p className="font-medium text-emerald-600 dark:text-emerald-500">
                {item.recovery}&#37;
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <h4 className="text-xs text-gray-500 dark:text-gray-500">
                Strain
              </h4>
              <p className="font-medium text-gray-900 dark:text-gray-50">
                {item.strain}
              </p>
            </div>
            <div>
              <h4 className="text-xs text-gray-500 dark:text-gray-500">
                Sleep
              </h4>
              <p className="font-medium text-gray-900 dark:text-gray-50">
                {item.sleep}&#37;
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Oct 23"
          active={true}
          payload={[
            //array-start
            {
              category: 'bpm',
              value: 20,
              index: 'Oct 23',
              color: 'blue',
              payload: {
                bpm: 132,
                effort: 31,
                recovery: 43,
                strain: 1.9,
                sleep: 84,
              },
            },
            //array-end
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['bpm']}
            valueFormatter={dataFormatter}
            yAxisWidth={70}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-80 sm:hidden"
            data={data}
            index="date"
            categories={['bpm']}
            valueFormatter={dataFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-11.tsx

```tsx
'use client';

import { RiArrowDownSLine } from '@remixicon/react';
import React from 'react';

import { cx } from '@/lib/utils';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

interface DataItem {
  date: string;
  Running: number;
}

const data: DataItem[] = [
  //array-start
  {
    date: 'Jan 23',
    Running: 167,
  },
  {
    date: 'Feb 23',
    Running: 125,
  },
  {
    date: 'Mar 23',
    Running: 156,
  },
  {
    date: 'Apr 23',
    Running: 165,
  },
  {
    date: 'May 23',
    Running: 153,
  },
  {
    date: 'Jun 23',
    Running: 124,
  },
  {
    date: 'Jul 23',
    Running: 164,
  },
  {
    date: 'Aug 23',
    Running: 123,
  },
  {
    date: 'Sep 23',
    Running: 132,
  },
  {
    date: 'Oct 23',
    Running: 141,
  },
  {
    date: 'Nov 23',
    Running: 129,
  },
  {
    date: 'Dec 23',
    Running: 149,
  },
  //array-end
];

const valueFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString() + ' bpm';
};

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const categoryPayload = payload[0];

  const previousIndex = data.findIndex((e) => e['date'] === label);
  const previousValues: DataItem | undefined =
    previousIndex > 0 ? data[previousIndex - 1] : undefined;

  const prev = previousValues
    ? previousValues[categoryPayload.category as keyof DataItem]
    : undefined;
  const percentage =
    typeof prev === 'number' && typeof categoryPayload.value === 'number'
      ? ((categoryPayload.value - prev) / prev) * 100
      : undefined;

  return (
    <div className="rounded-md border border-gray-200 bg-white p-2 shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="flex space-x-2.5">
        <span
          className={`flex w-1.5 bg-${categoryPayload.color}-500 rounded`}
          aria-hidden={true}
        />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-500">{label}</p>
          <p className="mt-2 font-medium text-gray-900 dark:text-gray-50">
            {valueFormatter(categoryPayload.value)}
          </p>
          <div className="mt-1 flex items-end space-x-1">
            {percentage ? (
              <span
                className={cx(
                  percentage < 0
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-500'
                    : 'bg-red-100 text-red-800 dark:bg-red-400/10 dark:text-red-500',
                  'inline-flex rounded px-1.5 py-0.5 text-xs font-medium',
                )}
              >
                {percentage > 0 ? '+' : null}
                {percentage.toFixed(1)}%
              </span>
            ) : (
              <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                --
              </span>
            )}
            <div className="text-sm text-gray-500 dark:text-gray-500">
              from prev. month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Oct 23"
          active={true}
          payload={[
            {
              category: 'Running',
              value: 141,
              index: 'Oct 23',
              color: 'blue',
              payload: {
                date: 'Oct 23',
                Running: 141,
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['Running']}
            valueFormatter={valueFormatter}
            yAxisWidth={70}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-72 sm:hidden"
            data={data}
            index="date"
            categories={['Running']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-12.tsx

```tsx
'use client';

import { useState } from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

interface DataItem {
  date: string;
  Running: number;
}

const data: DataItem[] = [
  //array-start
  {
    date: 'Jan 23',
    Running: 167,
  },
  {
    date: 'Feb 23',
    Running: 125,
  },
  {
    date: 'Mar 23',
    Running: 156,
  },
  {
    date: 'Apr 23',
    Running: 165,
  },
  {
    date: 'May 23',
    Running: 153,
  },
  {
    date: 'Jun 23',
    Running: 124,
  },
  {
    date: 'Jul 23',
    Running: 164,
  },
  {
    date: 'Aug 23',
    Running: 123,
  },
  {
    date: 'Sep 23',
    Running: 132,
  },
  {
    date: 'Oct 23',
    Running: 141,
  },
  {
    date: 'Nov 23',
    Running: 129,
  },
  {
    date: 'Dec 23',
    Running: 149,
  },
  //array-end
];

const valueFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString() + ' bpm';
};

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const categoryPayload = payload[0];

  const previousIndex = data.findIndex((e) => e['date'] === label);
  const previousValues: DataItem | undefined =
    previousIndex > 0 ? data[previousIndex - 1] : undefined;

  const prev = previousValues
    ? previousValues[categoryPayload.category as keyof DataItem]
    : undefined;
  const percentage =
    typeof prev === 'number' && typeof categoryPayload.value === 'number'
      ? ((categoryPayload.value - prev) / prev) * 100
      : undefined;

  return (
    <div className="rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-500">{label}</p>
        {percentage ? (
          <p
            className={cx(
              percentage < 0
                ? 'text-emerald-700 dark:text-emerald-500'
                : 'text-red-700 dark:text-red-500',
              'font-medium',
            )}
          >
            {percentage > 0 ? '+' : null}
            {percentage.toFixed(1)}%
          </p>
        ) : (
          <p className="font-medium text-gray-700 dark:text-gray-300">--</p>
        )}
      </div>
      <div className="flex items-center justify-between space-x-8 px-3 py-2">
        <div className="flex items-center space-x-2 truncate">
          <span
            className={`size-2.5 shrink-0 bg-${categoryPayload.color}-500 rounded-sm`}
            aria-hidden={true}
          />
          <p className="truncate text-gray-500 dark:text-gray-500">
            {categoryPayload.category}
          </p>
        </div>
        <p className="font-medium text-gray-900 dark:text-gray-50">
          {valueFormatter(categoryPayload.value)}
        </p>
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Oct 23"
          active={true}
          payload={[
            {
              category: 'Running',
              value: 141,
              index: 'Oct 23',
              color: 'blue',
              payload: {
                date: 'Oct 23',
                Running: 141,
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['Running']}
            type="stacked"
            colors={['blue', 'violet']}
            valueFormatter={valueFormatter}
            yAxisWidth={70}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-72 sm:hidden"
            data={data}
            index="date"
            categories={['Running']}
            type="stacked"
            colors={['blue', 'violet']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-13.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

const data = [
  //array-start
  {
    date: 'Jan 23',
    Running: 167,
  },
  {
    date: 'Feb 23',
    Running: 125,
  },
  {
    date: 'Mar 23',
    Running: 156,
  },
  {
    date: 'Apr 23',
    Running: 165,
  },
  {
    date: 'May 23',
    Running: 153,
  },
  {
    date: 'Jun 23',
    Running: 124,
  },
  {
    date: 'Jul 23',
    Running: 164,
  },
  {
    date: 'Aug 23',
    Running: 123,
  },
  {
    date: 'Sep 23',
    Running: 132,
  },
  {
    date: 'Oct 23',
    Running: 121,
  },
  {
    date: 'Nov 23',
    Running: 129,
  },
  {
    date: 'Dec 23',
    Running: 141,
  },
  //array-end
];

const valueFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString() + ' bpm';
};

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;
  const categoryPayload = payload[0];
  return (
    <div className="w-56 rounded-md border border-gray-200 bg-white p-2 text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="flex space-x-2.5">
        <span
          className={`w-1 bg-${categoryPayload.color}-500 rounded`}
          aria-hidden={true}
        />
        <div className="w-full truncate">
          <p className="font-medium text-gray-900 dark:text-gray-50">{label}</p>
          <p className="flex items-center justify-between space-x-8">
            <span className="truncate text-gray-500 dark:text-gray-500">
              {categoryPayload.category}
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-50">
              {valueFormatter(categoryPayload.value)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Jan 23"
          active={true}
          payload={[
            {
              category: 'Running',
              value: 145,
              index: 'Jan 23',
              color: 'blue',
              payload: {
                date: 'Jan 23',
                Running: 145,
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['Running']}
            valueFormatter={valueFormatter}
            yAxisWidth={70}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-72 sm:hidden"
            data={data}
            index="date"
            categories={['Running']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-14.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

const data = [
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
    Running: 121,
    Cycling: 99,
  },
  {
    date: 'Nov 23',
    Running: 129,
    Cycling: 104,
  },
  {
    date: 'Dec 23',
    Running: 141,
    Cycling: 124,
  },
  //array-end
];

const valueFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString() + ' bpm';
};

const CustomTooltip = ({ payload, active }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="w-56 space-y-2 rounded-md border border-gray-200 bg-white p-2 text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      {payload.map((category, index) => (
        <div key={index} className="flex space-x-2.5">
          <span
            className={`w-1 bg-${category.color}-500 rounded`}
            aria-hidden={true}
          />
          <div className="space-y-1">
            <p className="text-gray-500 dark:text-gray-500">
              {category.category}
            </p>
            <p className="font-medium text-gray-900 dark:text-gray-50">
              {valueFormatter(category.value)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Jan 23"
          active={true}
          payload={[
            {
              category: 'Running',
              value: 145,
              index: 'Jan 23',
              color: 'blue',
              payload: {
                date: 'Jan 23',
                Running: 145,
              },
            },
            {
              category: 'Cycling',
              value: 123,
              index: 'Jan 23',
              color: 'violet',
              payload: {
                date: 'Jan 23',
                Running: 123,
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['Running', 'Cycling']}
            colors={['blue', 'violet']}
            valueFormatter={valueFormatter}
            yAxisWidth={70}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-72 sm:hidden"
            data={data}
            index="date"
            categories={['Running', 'Cycling']}
            colors={['blue', 'violet']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-15.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

const data = [
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
    Running: 121,
    Cycling: 99,
  },
  {
    date: 'Nov 23',
    Running: 129,
    Cycling: 104,
  },
  {
    date: 'Dec 23',
    Running: 141,
    Cycling: 124,
  },
  //array-end
];

const valueFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString() + ' bpm';
};

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="w-56 rounded-md border border-gray-200 bg-white text-sm text-gray-500 shadow-md dark:border-gray-800 dark:bg-gray-950 dark:text-gray-500">
      <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-800">
        <p className="font-medium text-gray-900 dark:text-gray-50">{label}</p>
      </div>
      <div className="space-y-2 px-3 py-2">
        {payload.map((category, index) => (
          <div key={index} className="flex space-x-2.5">
            <span
              className={`w-1 bg-${category.color}-500 shrink-0 rounded`}
              aria-hidden={true}
            />
            <p className="flex w-full items-center justify-between space-x-8 truncate">
              <span className="truncate text-gray-500 dark:text-gray-500">
                {category.category}
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-50">
                {valueFormatter(category.value)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Jan 23"
          active={true}
          payload={[
            {
              category: 'Running',
              value: 145,
              index: 'Jan 23',
              color: 'blue',
              payload: {
                date: 'Jan 23',
                Running: 145,
              },
            },
            {
              category: 'Cycling',
              value: 123,
              index: 'Jan 23',
              color: 'violet',
              payload: {
                date: 'Jan 23',
                Running: 123,
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['Running', 'Cycling']}
            colors={['blue', 'violet']}
            valueFormatter={valueFormatter}
            yAxisWidth={70}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-72 sm:hidden"
            data={data}
            index="date"
            categories={['Running', 'Cycling']}
            colors={['blue', 'violet']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-16.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

interface DataItem {
  date: string;
  Revenue: number;
}

const data: DataItem[] = [
  //array-start
  {
    date: 'Jan 23',
    Revenue: 34230,
  },
  {
    date: 'Feb 23',
    Revenue: 39310,
  },
  {
    date: 'Mar 23',
    Revenue: 33470,
  },
  {
    date: 'Apr 23',
    Revenue: 29290,
  },
  {
    date: 'May 23',
    Revenue: 33190,
  },
  {
    date: 'Jun 23',
    Revenue: 39120,
  },
  {
    date: 'Jul 23',
    Revenue: 41030,
  },
  {
    date: 'Aug 23',
    Revenue: 27630,
  },
  {
    date: 'Sep 23',
    Revenue: 26120,
  },
  {
    date: 'Oct 23',
    Revenue: 22190,
  },
  {
    date: 'Nov 23',
    Revenue: 24080,
  },
  {
    date: 'Dec 23',
    Revenue: 27120,
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const categoryPayload = payload[0];

  const previousIndex = data.findIndex((e) => e['date'] === label);
  const previousValues: DataItem | undefined =
    previousIndex > 0 ? data[previousIndex - 1] : undefined;

  const prev = previousValues
    ? previousValues[categoryPayload.category as keyof DataItem]
    : undefined;
  const percentage =
    typeof prev === 'number' && typeof categoryPayload.value === 'number'
      ? ((categoryPayload.value - prev) / prev) * 100
      : undefined;

  return (
    <div className="w-56 rounded-md border border-gray-800 bg-gray-950 px-3 py-2 text-sm shadow-md">
      <p className="text-gray-500">{categoryPayload.category}</p>
      <div className="mt-1 flex items-center space-x-2.5">
        <span
          className={`size-2.5 bg-${categoryPayload.color}-500 shrink-0 rounded-sm`}
          aria-hidden={true}
        />
        <p className="flex w-full items-center justify-between">
          <span className="font-semibold text-gray-50">
            {valueFormatter(categoryPayload.value)}
          </span>
          {percentage ? (
            <span
              className={cx(
                percentage > 0 ? 'text-emerald-500' : 'text-red-500',
                'font-medium',
              )}
            >
              {percentage > 0 ? '+' : null}
              {percentage.toFixed(1)}%
            </span>
          ) : (
            <span className="font-medium text-gray-300">--</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Oct 23"
          active={true}
          payload={[
            {
              category: 'Revenue',
              value: 145,
              index: 'Oct 23',
              color: 'blue',
              payload: {
                date: 'Oct 23',
                Revenue: 145,
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['Revenue']}
            valueFormatter={valueFormatter}
            yAxisWidth={70}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-72 sm:hidden"
            data={data}
            index="date"
            categories={['Revenue']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-17.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { ProgressCircle } from '@/components/ProgressCircle';

const data = [
  //array-start
  {
    date: 'Jan 23',
    Revenue: 14230,
  },
  {
    date: 'Feb 23',
    Revenue: 19310,
  },
  {
    date: 'Mar 23',
    Revenue: 24470,
  },
  {
    date: 'Apr 23',
    Revenue: 29290,
  },
  {
    date: 'May 23',
    Revenue: 32090,
  },
  {
    date: 'Jun 23',
    Revenue: 46120,
  },
  {
    date: 'Jul 23',
    Revenue: 51930,
  },
  {
    date: 'Aug 23',
    Revenue: 59630,
  },
  {
    date: 'Sep 23',
    Revenue: 67120,
  },
  {
    date: 'Oct 23',
    Revenue: 69190,
  },
  {
    date: 'Nov 23',
    Revenue: 71040,
  },
  {
    date: 'Dec 23',
    Revenue: 77390,
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const salesGoal = 90000;

  const categoryPayload = payload[0];

  return (
    <div className="w-56 rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-500">{label}</p>
        <div className="flex items-center space-x-1">
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {((categoryPayload.value / salesGoal) * 100).toFixed(1)}%
          </span>
          <ProgressCircle
            value={(categoryPayload.value / salesGoal) * 100}
            radius={9}
            strokeWidth={3}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2.5 px-3 py-2">
        <span
          className={`size-2.5 bg-${categoryPayload.color}-500 shrink-0 rounded-sm`}
          aria-hidden={true}
        />
        <p className="flex w-full items-center justify-between">
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {valueFormatter(categoryPayload.value)}
          </span>
          <span className="text-gray-500 dark:text-gray-500">
            {categoryPayload.category}
          </span>
        </p>
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Jan 23"
          active={true}
          payload={[
            {
              category: 'Revenue',
              value: 14230,
              index: 'Jan 23',
              color: 'blue',
              payload: {
                date: 'Jan 23',
                Running: 14230,
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['Revenue']}
            valueFormatter={valueFormatter}
            yAxisWidth={70}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-72 sm:hidden"
            data={data}
            index="date"
            categories={['Revenue']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-18.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { CategoryBar } from '@/components/CategoryBar';
import { Divider } from '@/components/Divider';

interface LocationData {
  location: string;
  sales: number;
  share: number;
}

interface DataItem {
  date: string;
  sales: number;
  locations: LocationData[];
}

const data: DataItem[] = [
  //array-start
  {
    date: 'Jan 23',
    sales: 1668,
    locations: [
      {
        location: 'Europe',
        sales: 400,
        share: 23.9,
      },
      {
        location: 'Asia',
        sales: 500,
        share: 29.9,
      },
      {
        location: 'North America',
        sales: 768,
        share: 46.1,
      },
    ],
  },
  {
    date: 'Feb 23',
    sales: 2370,
    locations: [
      {
        location: 'Europe',
        sales: 800,
        share: 33.8,
      },
      {
        location: 'Asia',
        sales: 300,
        share: 12.7,
      },
      {
        location: 'North America',
        sales: 1270,
        share: 53.6,
      },
    ],
  },
  {
    date: 'Mar 23',
    sales: 3192,
    locations: [
      {
        location: 'Europe',
        sales: 1000,
        share: 31.3,
      },
      {
        location: 'Asia',
        sales: 900,
        share: 28.2,
      },
      {
        location: 'North America',
        sales: 1292,
        share: 40.5,
      },
    ],
  },
  {
    date: 'Apr 23',
    sales: 2210,
    locations: [
      {
        location: 'Europe',
        sales: 600,
        share: 27.2,
      },
      {
        location: 'Asia',
        sales: 700,
        share: 31.7,
      },
      {
        location: 'North America',
        sales: 910,
        share: 41.2,
      },
    ],
  },
  {
    date: 'May 23',
    sales: 3130,
    locations: [
      {
        location: 'Europe',
        sales: 900,
        share: 28.8,
      },
      {
        location: 'Asia',
        sales: 1000,
        share: 31.9,
      },
      {
        location: 'North America',
        sales: 1230,
        share: 39.3,
      },
    ],
  },
  {
    date: 'Jun 23',
    sales: 1350,
    locations: [
      {
        location: 'Europe',
        sales: 300,
        share: 22.2,
      },
      {
        location: 'Asia',
        sales: 400,
        share: 29.6,
      },
      {
        location: 'North America',
        sales: 650,
        share: 48.2,
      },
    ],
  },
  {
    date: 'Jul 23',
    sales: 2500,
    locations: [
      {
        location: 'Europe',
        sales: 1100,
        share: 44.0,
      },
      {
        location: 'Asia',
        sales: 600,
        share: 24.0,
      },
      {
        location: 'North America',
        sales: 800,
        share: 32.0,
      },
    ],
  },
  {
    date: 'Aug 23',
    sales: 2800,
    locations: [
      {
        location: 'Europe',
        sales: 1200,
        share: 42.9,
      },
      {
        location: 'Asia',
        sales: 700,
        share: 25.0,
      },
      {
        location: 'North America',
        sales: 900,
        share: 32.1,
      },
    ],
  },
  {
    date: 'Sep 23',
    sales: 2900,
    locations: [
      {
        location: 'Europe',
        sales: 1300,
        share: 44.8,
      },
      {
        location: 'Asia',
        sales: 800,
        share: 27.6,
      },
      {
        location: 'North America',
        sales: 800,
        share: 27.6,
      },
    ],
  },
  //array-end
];

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

const CustomTooltip = ({ payload, active }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload.map((item) => ({
    status: item.category,
    value: item.value,
    locations: item.payload.locations,
  }))[0];

  return (
    <div className="w-72 rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="rounded-t-md border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
        <CategoryBar
          values={data.locations.map(
            (locationData: LocationData) => locationData.share,
          )}
          colors={['indigo', 'violet', 'fuchsia']}
          showLabels={false}
        />
      </div>
      <ul
        role="list"
        className="divide-y divide-gray-200 px-4 py-2 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
      >
        {data.locations.map((locationData: LocationData) => (
          <li
            key={locationData.location}
            className="flex items-center justify-between space-x-2 py-2"
          >
            <div className="flex items-center space-x-2 truncate">
              <span
                className={cx(
                  locationData.location === 'Europe'
                    ? 'bg-indigo-500 dark:bg-indigo-500'
                    : locationData.location === 'Asia'
                      ? 'bg-violet-500 dark:bg-violet-500'
                      : locationData.location === 'North America'
                        ? 'bg-fuchsia-500 dark:bg-fuchsia-500'
                        : '',
                  'size-2.5 shrink-0 rounded-sm',
                )}
                aria-hidden={true}
              />
              <span className="truncate dark:text-gray-300">
                {locationData.location}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-900 dark:text-gray-50">
                {currencyFormatter(locationData.sales)}
              </span>
              <span className="text-gray-500 dark:text-gray-500">
                ({locationData.share}%)
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="May 23"
          active={true}
          payload={[
            {
              category: 'sales',
              value: 3130,
              index: 'May 23',
              color: 'blue',
              payload: {
                date: 'May 23',
                sales: 3130,
                locations: [
                  {
                    location: 'Europe',
                    sales: 900,
                    share: 28.8,
                  },
                  {
                    location: 'Asia',
                    sales: 1000,
                    share: 31.9,
                  },
                  {
                    location: 'North America',
                    sales: 1230,
                    share: 39.3,
                  },
                ],
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['sales']}
            type="stacked"
            valueFormatter={currencyFormatter}
            yAxisWidth={55}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-80 sm:hidden"
            data={data}
            index="date"
            categories={['sales']}
            type="stacked"
            valueFormatter={currencyFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-19.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { DonutChart } from '@/components/DonutChart';

interface LocationData {
  location: string;
  sales: number;
  share: string;
}

interface DataItem {
  date: string;
  sales: number;
  locations: LocationData[];
}

const data: DataItem[] = [
  //array-start
  {
    date: 'Jan 23',
    sales: 1668,
    locations: [
      {
        location: 'Europe',
        sales: 400,
        share: '23.9%',
      },
      {
        location: 'Asia',
        sales: 500,
        share: '29.9%',
      },
      {
        location: 'North America',
        sales: 768,
        share: '46.1%',
      },
    ],
  },
  {
    date: 'Feb 23',
    sales: 2370,
    locations: [
      {
        location: 'Europe',
        sales: 800,
        share: '33.8%',
      },
      {
        location: 'Asia',
        sales: 300,
        share: '12.7%',
      },
      {
        location: 'North America',
        sales: 1270,
        share: '53.6%',
      },
    ],
  },
  {
    date: 'Mar 23',
    sales: 3192,
    locations: [
      {
        location: 'Europe',
        sales: 1000,
        share: '31.3%',
      },
      {
        location: 'Asia',
        sales: 900,
        share: '28.2%',
      },
      {
        location: 'North America',
        sales: 1292,
        share: '40.5%',
      },
    ],
  },
  {
    date: 'Apr 23',
    sales: 2210,
    locations: [
      {
        location: 'Europe',
        sales: 600,
        share: '27.2%',
      },
      {
        location: 'Asia',
        sales: 700,
        share: '31.7%',
      },
      {
        location: 'North America',
        sales: 910,
        share: '41.2%',
      },
    ],
  },
  {
    date: 'May 23',
    sales: 3130,
    locations: [
      {
        location: 'Europe',
        sales: 900,
        share: '28.8%',
      },
      {
        location: 'Asia',
        sales: 1000,
        share: '31.9%',
      },
      {
        location: 'North America',
        sales: 1230,
        share: '39.3%',
      },
    ],
  },
  {
    date: 'Jun 23',
    sales: 1350,
    locations: [
      {
        location: 'Europe',
        sales: 300,
        share: '22.2%',
      },
      {
        location: 'Asia',
        sales: 400,
        share: '29.6%',
      },
      {
        location: 'North America',
        sales: 650,
        share: '48.2%',
      },
    ],
  },
  {
    date: 'Jul 23',
    sales: 2400,
    locations: [
      {
        location: 'Europe',
        sales: 900,
        share: '37.5%',
      },
      {
        location: 'Asia',
        sales: 700,
        share: '29.2%',
      },
      {
        location: 'North America',
        sales: 800,
        share: '33.3%',
      },
    ],
  },
  {
    date: 'Aug 23',
    sales: 2600,
    locations: [
      {
        location: 'Europe',
        sales: 1000,
        share: '38.5%',
      },
      {
        location: 'Asia',
        sales: 800,
        share: '30.8%',
      },
      {
        location: 'North America',
        sales: 800,
        share: '30.8%',
      },
    ],
  },
  {
    date: 'Sep 23',
    sales: 2800,
    locations: [
      {
        location: 'Europe',
        sales: 1100,
        share: '39.3%',
      },
      {
        location: 'Asia',
        sales: 700,
        share: '25%',
      },
      {
        location: 'North America',
        sales: 1000,
        share: '35.7%',
      },
    ],
  },
  //array-end
];

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload.map((item) => ({
    status: item.category,
    value: item.value,
    locations: item.payload.locations,
  }))[0];

  return (
    <div className="w-56 rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-500">{label}</p>
        <p className="font-medium text-gray-900 dark:text-gray-50">
          {currencyFormatter(data.value)}
        </p>
      </div>

      <DonutChart
        data={data.locations}
        value="sales"
        category="location"
        variant="pie"
        showTooltip={false}
        colors={['indigo', 'violet', 'fuchsia']}
        className="mx-auto mt-4 !h-20 !w-20"
      />
      <ul
        role="list"
        className="divide-y divide-gray-200 px-4 py-2 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
      >
        {data.locations.map((locationData: LocationData) => (
          <li
            key={locationData.location}
            className="flex items-center justify-between space-x-4 py-2"
          >
            <div className="flex items-center space-x-2 truncate">
              <span
                className={cx(
                  locationData.location === 'Europe'
                    ? 'bg-indigo-500 dark:bg-indigo-500'
                    : locationData.location === 'Asia'
                      ? 'bg-violet-500 dark:bg-violet-500'
                      : locationData.location === 'North America'
                        ? 'bg-fuchsia-500 dark:bg-fuchsia-500'
                        : '',
                  'size-2.5 shrink-0 rounded-sm',
                )}
                aria-hidden={true}
              />
              <span className="truncate">{locationData.location}</span>
            </div>
            <span className="text-gray-900 dark:text-gray-50">
              {locationData.share}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Jan 23"
          active={true}
          payload={[
            {
              category: 'sales',
              value: 3130,
              index: 'May 23',
              color: 'blue',
              payload: {
                date: 'May 23',
                sales: 3130,
                locations: [
                  { location: 'Europe', sales: 900, share: '28.8%' },
                  { location: 'Asia', sales: 1000, share: '31.9%' },
                  { location: 'North America', sales: 1230, share: '39.3%' },
                ],
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['sales']}
            valueFormatter={currencyFormatter}
            yAxisWidth={70}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-72 sm:hidden"
            data={data}
            index="date"
            categories={['sales']}
            valueFormatter={currencyFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-20.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { DonutChart } from '@/components/DonutChart';

interface LocationData {
  location: string;
  sales: number;
  share: string;
}

interface DataItem {
  date: string;
  sales: number;
  locations: LocationData[];
}

const data: DataItem[] = [
  //array-start
  {
    date: 'Jan 23',
    sales: 1668,
    locations: [
      {
        location: 'Europe',
        sales: 400,
        share: '23.9%',
      },
      {
        location: 'Asia',
        sales: 500,
        share: '29.9%',
      },
      {
        location: 'North America',
        sales: 768,
        share: '46.1%',
      },
    ],
  },
  {
    date: 'Feb 23',
    sales: 2370,
    locations: [
      {
        location: 'Europe',
        sales: 800,
        share: '33.8%',
      },
      {
        location: 'Asia',
        sales: 300,
        share: '12.7%',
      },
      {
        location: 'North America',
        sales: 1270,
        share: '53.6%',
      },
    ],
  },
  {
    date: 'Mar 23',
    sales: 3192,
    locations: [
      {
        location: 'Europe',
        sales: 1000,
        share: '31.3%',
      },
      {
        location: 'Asia',
        sales: 900,
        share: '28.2%',
      },
      {
        location: 'North America',
        sales: 1292,
        share: '40.5%',
      },
    ],
  },
  {
    date: 'Apr 23',
    sales: 2210,
    locations: [
      {
        location: 'Europe',
        sales: 600,
        share: '27.2%',
      },
      {
        location: 'Asia',
        sales: 700,
        share: '31.7%',
      },
      {
        location: 'North America',
        sales: 910,
        share: '41.2%',
      },
    ],
  },
  {
    date: 'May 23',
    sales: 3130,
    locations: [
      {
        location: 'Europe',
        sales: 900,
        share: '28.8%',
      },
      {
        location: 'Asia',
        sales: 1000,
        share: '31.9%',
      },
      {
        location: 'North America',
        sales: 1230,
        share: '39.3%',
      },
    ],
  },
  {
    date: 'Jun 23',
    sales: 1350,
    locations: [
      {
        location: 'Europe',
        sales: 300,
        share: '22.2%',
      },
      {
        location: 'Asia',
        sales: 400,
        share: '29.6%',
      },
      {
        location: 'North America',
        sales: 650,
        share: '48.2%',
      },
    ],
  },
  {
    date: 'Jul 23',
    sales: 2800,
    locations: [
      {
        location: 'Europe',
        sales: 1000,
        share: '35.7%',
      },
      {
        location: 'Asia',
        sales: 800,
        share: '28.6%',
      },
      {
        location: 'North America',
        sales: 1000,
        share: '35.7%',
      },
    ],
  },
  {
    date: 'Aug 23',
    sales: 2400,
    locations: [
      {
        location: 'Europe',
        sales: 900,
        share: '37.5%',
      },
      {
        location: 'Asia',
        sales: 600,
        share: '25.0%',
      },
      {
        location: 'North America',
        sales: 900,
        share: '37.5%',
      },
    ],
  },
  {
    date: 'Sep 23',
    sales: 3200,
    locations: [
      {
        location: 'Europe',
        sales: 1200,
        share: '37.5%',
      },
      {
        location: 'Asia',
        sales: 1000,
        share: '31.3%',
      },
      {
        location: 'North America',
        sales: 1000,
        share: '31.3%',
      },
    ],
  },
  //array-end
];

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload.map((item) => ({
    status: item.category,
    value: item.value,
    locations: item.payload.locations,
  }))[0];

  return (
    <div className="w-72 rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <p className="flex items-center justify-between rounded-t-md border-b border-gray-200 px-4 py-2 dark:border-gray-800">
        <span className="text-gray-500 dark:text-gray-500">{label}</span>
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {currencyFormatter(data.value)}
        </span>
      </p>

      <div className="flex items-center space-x-6 p-4">
        <DonutChart
          data={data.locations}
          value="sales"
          category="location"
          variant="pie"
          showTooltip={false}
          colors={['indigo', 'violet', 'fuchsia']}
          className="!h-20 !flex-1 !shrink-0"
        />
        <ul
          role="list"
          className="w-2/3 divide-y divide-gray-200 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
        >
          {data.locations.map((locationData: LocationData) => (
            <li
              key={locationData.location}
              className="flex items-center justify-between space-x-4 py-2"
            >
              <div className="flex items-center space-x-2 truncate">
                <span
                  className={cx(
                    locationData.location === 'Europe'
                      ? 'bg-indigo-500 dark:bg-indigo-500'
                      : locationData.location === 'Asia'
                        ? 'bg-violet-500 dark:bg-violet-500'
                        : locationData.location === 'North America'
                          ? 'bg-fuchsia-500 dark:bg-fuchsia-500'
                          : '',
                    'size-2.5 shrink-0 rounded-sm',
                  )}
                  aria-hidden={true}
                />
                <span className="truncate dark:text-gray-300">
                  {locationData.location}
                </span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-300">
                {locationData.share}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Jan 23"
          active={true}
          payload={[
            {
              category: 'sales',
              value: 3130,
              index: 'May 23',
              color: 'blue',
              payload: {
                date: 'May 23',
                sales: 3130,
                locations: [
                  { location: 'Europe', sales: 900, share: '28.8%' },
                  { location: 'Asia', sales: 1000, share: '31.9%' },
                  { location: 'North America', sales: 1230, share: '39.3%' },
                ],
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['sales']}
            type="stacked"
            colors={['blue']}
            valueFormatter={currencyFormatter}
            yAxisWidth={50}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-80 sm:hidden"
            data={data}
            index="date"
            categories={['sales']}
            type="stacked"
            colors={['blue']}
            valueFormatter={currencyFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/chart-tooltip-21.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { BarChart, TooltipProps } from '@/components/BarChart';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';

interface Issue {
  status: 'completed' | 'in progress' | 'on hold';
  value: number;
  percentage: number;
}

interface DataEntry {
  date: string;
  issues: Issue[];
}

const data: DataEntry[] = [
  //array-start
  {
    date: 'Oct 1, 2023',
    issues: [
      {
        status: 'completed',
        value: 48,
        percentage: 24.2,
      },
      {
        status: 'in progress',
        value: 83,
        percentage: 41.9,
      },
      {
        status: 'on hold',
        value: 67,
        percentage: 33.9,
      },
    ],
  },
  {
    date: 'Oct 2, 2023',
    issues: [
      {
        status: 'completed',
        value: 20,
        percentage: 20.6,
      },
      {
        status: 'in progress',
        value: 97,
        percentage: 77.3,
      },
      {
        status: 'on hold',
        value: 12,
        percentage: 2.1,
      },
    ],
  },
  {
    date: 'Oct 3, 2023',
    issues: [
      {
        status: 'completed',
        value: 30,
        percentage: 29.4,
      },
      {
        status: 'in progress',
        value: 45,
        percentage: 43.1,
      },
      {
        status: 'on hold',
        value: 66,
        percentage: 27.5,
      },
    ],
  },
  {
    date: 'Oct 4, 2023',
    issues: [
      {
        status: 'completed',
        value: 41,
        percentage: 28.1,
      },
      {
        status: 'in progress',
        value: 18,
        percentage: 17.9,
      },
      {
        status: 'on hold',
        value: 70,
        percentage: 54.0,
      },
    ],
  },
  {
    date: 'Oct 5, 2023',
    issues: [
      {
        status: 'completed',
        value: 55,
        percentage: 28.8,
      },
      {
        status: 'in progress',
        value: 14,
        percentage: 25.0,
      },
      {
        status: 'on hold',
        value: 60,
        percentage: 46.2,
      },
    ],
  },
  {
    date: 'Oct 6, 2023',
    issues: [
      {
        status: 'completed',
        value: 35,
        percentage: 28.8,
      },
      {
        status: 'in progress',
        value: 14,
        percentage: 19.2,
      },
      {
        status: 'on hold',
        value: 80,
        percentage: 51.9,
      },
    ],
  },
  {
    date: 'Oct 7, 2023',
    issues: [
      {
        status: 'completed',
        value: 15,
        percentage: 20.0,
      },
      {
        status: 'in progress',
        value: 55,
        percentage: 35.2,
      },
      {
        status: 'on hold',
        value: 72,
        percentage: 44.8,
      },
    ],
  },
  {
    date: 'Oct 8, 2023',
    issues: [
      {
        status: 'completed',
        value: 15,
        percentage: 21.7,
      },
      {
        status: 'in progress',
        value: 69,
        percentage: 48.2,
      },
      {
        status: 'on hold',
        value: 45,
        percentage: 30.1,
      },
    ],
  },
  {
    date: 'Oct 9, 2023',
    issues: [
      {
        status: 'completed',
        value: 74,
        percentage: 39.5,
      },
      {
        status: 'in progress',
        value: 39,
        percentage: 37.1,
      },
      {
        status: 'on hold',
        value: 16,
        percentage: 23.4,
      },
    ],
  },
  //array-end
];

// Transform data into a format suitable for BarChart
const formattedArray = data.map((entry) => {
  return {
    date: entry.date,
    ...entry.issues.reduce(
      (acc, issue) => {
        acc[issue.status] = issue.value;
        return acc;
      },
      {} as { [key in Issue['status']]?: number },
    ),
  };
});

const valueFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString();
};

const status = {
  completed: 'bg-blue-500 dark:bg-blue-500',
  'in progress': 'bg-cyan-500 dark:bg-cyan-500',
  'on hold': 'bg-violet-500 dark:bg-violet-500',
};

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload.map((item) => ({
    status: item.category as Issue['status'],
    value: item.value,
    percentage: (
      (item.value /
        (item.payload.completed +
          item.payload['in progress'] +
          item.payload['on hold'])) *
      100
    ).toFixed(2),
  }));

  return (
    <div className="w-60 rounded-md border border-gray-500/10 bg-white/50 px-4 py-3 text-sm shadow-md backdrop-blur-lg dark:border-gray-400/20 dark:bg-gray-950/50">
      <p className="flex items-center justify-between">
        <span className="font-medium text-gray-900 dark:text-gray-50">
          Status
        </span>
        <span className="text-gray-500 dark:text-gray-500">{label}</span>
      </p>
      <Divider className="!my-3" />
      <div className="space-y-1.5">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2.5">
            <span
              className={cx(
                status[item.status],
                'size-2.5 shrink-0 rounded-sm',
              )}
              aria-hidden={true}
            />
            <div className="flex w-full justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                {item.status}
              </span>
              <div className="flex items-center space-x-1">
                <span className="font-medium text-gray-900 dark:text-gray-50">
                  {item.value}
                </span>
                <span className="text-gray-500 dark:text-gray-500">
                  ({item.percentage}&#37;)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <div>
          <p className="mb-4 text-center text-sm text-gray-500 dark:text-gray-500">
            Glass effect background
          </p>
          <CustomTooltip
            label="Oct 1, 2023"
            active={true}
            payload={[
              {
                category: 'completed',
                value: 41,
                index: 'Oct 4, 2023',
                color: 'blue',
                payload: {
                  date: 'Oct 4, 2023',
                  completed: 41,
                  'in progress': 18,
                  'on hold': 70,
                },
              },
              {
                category: 'in progress',
                value: 18,
                index: 'Oct 4, 2023',
                color: 'cyan',
                payload: {
                  date: 'Oct 4, 2023',
                  completed: 41,
                  'in progress': 18,
                  'on hold': 70,
                },
              },
              {
                category: 'on hold',
                value: 70,
                index: 'Oct 4, 2023',
                color: 'violet',
                payload: {
                  date: 'Oct 4, 2023',
                  completed: 41,
                  'in progress': 18,
                  'on hold': 70,
                },
              },
            ]}
          />
        </div>
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={formattedArray}
            index="date"
            categories={['completed', 'in progress', 'on hold']}
            type="stacked"
            colors={['blue', 'cyan', 'violet']}
            valueFormatter={valueFormatter}
            yAxisWidth={30}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-80 sm:hidden"
            data={formattedArray}
            index="date"
            categories={['completed', 'in progress', 'on hold']}
            type="stacked"
            colors={['blue', 'cyan', 'violet']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
```

### src/content/components/chart-tooltips/index.ts

```ts
export { default as ChartTooltip01 } from './chart-tooltip-01';
export { default as ChartTooltip02 } from './chart-tooltip-02';
export { default as ChartTooltip03 } from './chart-tooltip-03';
export { default as ChartTooltip04 } from './chart-tooltip-04';
export { default as ChartTooltip05 } from './chart-tooltip-05';
export { default as ChartTooltip06 } from './chart-tooltip-06';
export { default as ChartTooltip07 } from './chart-tooltip-07';
export { default as ChartTooltip08 } from './chart-tooltip-08';
export { default as ChartTooltip09 } from './chart-tooltip-09';
export { default as ChartTooltip10 } from './chart-tooltip-10';
export { default as ChartTooltip11 } from './chart-tooltip-11';
export { default as ChartTooltip12 } from './chart-tooltip-12';
export { default as ChartTooltip13 } from './chart-tooltip-13';
export { default as ChartTooltip14 } from './chart-tooltip-14';
export { default as ChartTooltip15 } from './chart-tooltip-15';
export { default as ChartTooltip16 } from './chart-tooltip-16';
export { default as ChartTooltip17 } from './chart-tooltip-17';
export { default as ChartTooltip18 } from './chart-tooltip-18';
export { default as ChartTooltip19 } from './chart-tooltip-19';
export { default as ChartTooltip20 } from './chart-tooltip-20';
export { default as ChartTooltip21 } from './chart-tooltip-21';
```
