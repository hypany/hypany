# Components / chart-compositions

[Back to index](index.md)

## Components / chart-compositions

Files:
- `src/content/components/chart-compositions/chart-composition-01.tsx`
- `src/content/components/chart-compositions/chart-composition-02.tsx`
- `src/content/components/chart-compositions/chart-composition-03.tsx`
- `src/content/components/chart-compositions/chart-composition-04.tsx`
- `src/content/components/chart-compositions/chart-composition-05.tsx`
- `src/content/components/chart-compositions/chart-composition-06.tsx`
- `src/content/components/chart-compositions/chart-composition-07.tsx`
- `src/content/components/chart-compositions/chart-composition-08.tsx`
- `src/content/components/chart-compositions/chart-composition-09.tsx`
- `src/content/components/chart-compositions/chart-composition-10.tsx`
- `src/content/components/chart-compositions/chart-composition-11.tsx`
- `src/content/components/chart-compositions/chart-composition-12.tsx`
- `src/content/components/chart-compositions/chart-composition-13.tsx`
- `src/content/components/chart-compositions/chart-composition-14.tsx`
- `src/content/components/chart-compositions/chart-composition-15.tsx`
- `src/content/components/chart-compositions/index.ts`

### src/content/components/chart-compositions/chart-composition-01.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { LineChart } from '@/components/LineChart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/Table';

const data = [
  //array-start
  {
    date: 'Aug 01',
    'ETF Shares Vital': 2100.2,
    'Vitainvest Core': 4434.1,
    'iShares Tech Growth': 7943.2,
  },
  {
    date: 'Aug 02',
    'ETF Shares Vital': 2943.0,
    'Vitainvest Core': 4954.1,
    'iShares Tech Growth': 8954.1,
  },
  {
    date: 'Aug 03',
    'ETF Shares Vital': 4889.5,
    'Vitainvest Core': 6100.2,
    'iShares Tech Growth': 9123.7,
  },
  {
    date: 'Aug 04',
    'ETF Shares Vital': 3909.8,
    'Vitainvest Core': 4909.7,
    'iShares Tech Growth': 7478.4,
  },
  {
    date: 'Aug 05',
    'ETF Shares Vital': 5778.7,
    'Vitainvest Core': 7103.1,
    'iShares Tech Growth': 9504.3,
  },
  {
    date: 'Aug 06',
    'ETF Shares Vital': 5900.9,
    'Vitainvest Core': 7534.3,
    'iShares Tech Growth': 9943.4,
  },
  {
    date: 'Aug 07',
    'ETF Shares Vital': 4129.4,
    'Vitainvest Core': 7412.1,
    'iShares Tech Growth': 10112.2,
  },
  {
    date: 'Aug 08',
    'ETF Shares Vital': 6021.2,
    'Vitainvest Core': 7834.4,
    'iShares Tech Growth': 10290.2,
  },
  {
    date: 'Aug 09',
    'ETF Shares Vital': 6279.8,
    'Vitainvest Core': 8159.1,
    'iShares Tech Growth': 10349.6,
  },
  {
    date: 'Aug 10',
    'ETF Shares Vital': 6224.5,
    'Vitainvest Core': 8260.6,
    'iShares Tech Growth': 10415.4,
  },
  {
    date: 'Aug 11',
    'ETF Shares Vital': 6380.6,
    'Vitainvest Core': 8965.3,
    'iShares Tech Growth': 10636.3,
  },
  {
    date: 'Aug 12',
    'ETF Shares Vital': 6414.4,
    'Vitainvest Core': 7989.3,
    'iShares Tech Growth': 10900.5,
  },
  {
    date: 'Aug 13',
    'ETF Shares Vital': 6540.1,
    'Vitainvest Core': 7839.6,
    'iShares Tech Growth': 11040.4,
  },
  {
    date: 'Aug 14',
    'ETF Shares Vital': 6634.4,
    'Vitainvest Core': 7343.8,
    'iShares Tech Growth': 11390.5,
  },
  {
    date: 'Aug 15',
    'ETF Shares Vital': 7124.6,
    'Vitainvest Core': 6903.7,
    'iShares Tech Growth': 11423.1,
  },
  {
    date: 'Aug 16',
    'ETF Shares Vital': 7934.5,
    'Vitainvest Core': 6273.6,
    'iShares Tech Growth': 12134.4,
  },
  {
    date: 'Aug 17',
    'ETF Shares Vital': 10287.8,
    'Vitainvest Core': 5900.3,
    'iShares Tech Growth': 12034.4,
  },
  {
    date: 'Aug 18',
    'ETF Shares Vital': 10323.2,
    'Vitainvest Core': 5732.1,
    'iShares Tech Growth': 11011.7,
  },
  {
    date: 'Aug 19',
    'ETF Shares Vital': 10511.4,
    'Vitainvest Core': 5523.1,
    'iShares Tech Growth': 11834.8,
  },
  {
    date: 'Aug 20',
    'ETF Shares Vital': 11043.9,
    'Vitainvest Core': 5422.3,
    'iShares Tech Growth': 12387.1,
  },
  {
    date: 'Aug 21',
    'ETF Shares Vital': 6700.7,
    'Vitainvest Core': 5334.2,
    'iShares Tech Growth': 11032.2,
  },
  {
    date: 'Aug 22',
    'ETF Shares Vital': 6900.8,
    'Vitainvest Core': 4943.4,
    'iShares Tech Growth': 10134.2,
  },
  {
    date: 'Aug 23',
    'ETF Shares Vital': 7934.5,
    'Vitainvest Core': 4812.1,
    'iShares Tech Growth': 9921.2,
  },
  {
    date: 'Aug 24',
    'ETF Shares Vital': 9021.0,
    'Vitainvest Core': 2729.1,
    'iShares Tech Growth': 10549.8,
  },
  {
    date: 'Aug 25',
    'ETF Shares Vital': 9198.2,
    'Vitainvest Core': 2178.0,
    'iShares Tech Growth': 10968.4,
  },
  {
    date: 'Aug 26',
    'ETF Shares Vital': 9557.1,
    'Vitainvest Core': 2158.3,
    'iShares Tech Growth': 11059.1,
  },
  {
    date: 'Aug 27',
    'ETF Shares Vital': 9959.8,
    'Vitainvest Core': 2100.8,
    'iShares Tech Growth': 11903.6,
  },
  {
    date: 'Aug 28',
    'ETF Shares Vital': 10034.6,
    'Vitainvest Core': 2934.4,
    'iShares Tech Growth': 12143.3,
  },
  {
    date: 'Aug 29',
    'ETF Shares Vital': 10243.8,
    'Vitainvest Core': 3223.4,
    'iShares Tech Growth': 12930.1,
  },
  {
    date: 'Aug 30',
    'ETF Shares Vital': 10078.5,
    'Vitainvest Core': 3779.1,
    'iShares Tech Growth': 13420.5,
  },
  {
    date: 'Aug 31',
    'ETF Shares Vital': 11134.6,
    'Vitainvest Core': 4190.3,
    'iShares Tech Growth': 14443.2,
  },
  {
    date: 'Sep 01',
    'ETF Shares Vital': 12347.2,
    'Vitainvest Core': 4839.1,
    'iShares Tech Growth': 14532.1,
  },
  {
    date: 'Sep 02',
    'ETF Shares Vital': 12593.8,
    'Vitainvest Core': 5153.3,
    'iShares Tech Growth': 14283.5,
  },
  {
    date: 'Sep 03',
    'ETF Shares Vital': 12043.4,
    'Vitainvest Core': 5234.8,
    'iShares Tech Growth': 14078.9,
  },
  {
    date: 'Sep 04',
    'ETF Shares Vital': 12144.9,
    'Vitainvest Core': 5478.4,
    'iShares Tech Growth': 13859.7,
  },
  {
    date: 'Sep 05',
    'ETF Shares Vital': 12489.5,
    'Vitainvest Core': 5741.1,
    'iShares Tech Growth': 13539.2,
  },
  {
    date: 'Sep 06',
    'ETF Shares Vital': 12748.7,
    'Vitainvest Core': 6743.9,
    'iShares Tech Growth': 13643.2,
  },
  {
    date: 'Sep 07',
    'ETF Shares Vital': 12933.2,
    'Vitainvest Core': 7832.8,
    'iShares Tech Growth': 14629.2,
  },
  {
    date: 'Sep 08',
    'ETF Shares Vital': 13028.8,
    'Vitainvest Core': 8943.2,
    'iShares Tech Growth': 13611.2,
  },
  {
    date: 'Sep 09',
    'ETF Shares Vital': 13412.4,
    'Vitainvest Core': 9932.2,
    'iShares Tech Growth': 12515.2,
  },
  {
    date: 'Sep 10',
    'ETF Shares Vital': 13649.0,
    'Vitainvest Core': 10139.2,
    'iShares Tech Growth': 11143.8,
  },
  {
    date: 'Sep 11',
    'ETF Shares Vital': 13748.5,
    'Vitainvest Core': 10441.2,
    'iShares Tech Growth': 8929.2,
  },
  {
    date: 'Sep 12',
    'ETF Shares Vital': 13148.1,
    'Vitainvest Core': 10933.8,
    'iShares Tech Growth': 8943.2,
  },
  {
    date: 'Sep 13',
    'ETF Shares Vital': 12839.6,
    'Vitainvest Core': 11073.4,
    'iShares Tech Growth': 7938.3,
  },
  {
    date: 'Sep 14',
    'ETF Shares Vital': 12428.2,
    'Vitainvest Core': 11128.3,
    'iShares Tech Growth': 7533.4,
  },
  {
    date: 'Sep 15',
    'ETF Shares Vital': 12012.8,
    'Vitainvest Core': 11412.3,
    'iShares Tech Growth': 7100.4,
  },
  {
    date: 'Sep 16',
    'ETF Shares Vital': 11801.3,
    'Vitainvest Core': 10501.1,
    'iShares Tech Growth': 6532.1,
  },
  {
    date: 'Sep 17',
    'ETF Shares Vital': 10102.9,
    'Vitainvest Core': 8923.3,
    'iShares Tech Growth': 4332.8,
  },
  {
    date: 'Sep 18',
    'ETF Shares Vital': 12132.5,
    'Vitainvest Core': 10212.1,
    'iShares Tech Growth': 7847.4,
  },
  {
    date: 'Sep 19',
    'ETF Shares Vital': 12901.1,
    'Vitainvest Core': 10101.7,
    'iShares Tech Growth': 7223.3,
  },
  {
    date: 'Sep 20',
    'ETF Shares Vital': 13132.6,
    'Vitainvest Core': 12132.3,
    'iShares Tech Growth': 6900.2,
  },
  {
    date: 'Sep 21',
    'ETF Shares Vital': 14132.2,
    'Vitainvest Core': 13212.5,
    'iShares Tech Growth': 5932.2,
  },
  {
    date: 'Sep 22',
    'ETF Shares Vital': 14245.8,
    'Vitainvest Core': 12163.4,
    'iShares Tech Growth': 5577.1,
  },
  {
    date: 'Sep 23',
    'ETF Shares Vital': 14328.3,
    'Vitainvest Core': 10036.1,
    'iShares Tech Growth': 5439.2,
  },
  {
    date: 'Sep 24',
    'ETF Shares Vital': 14949.9,
    'Vitainvest Core': 8985.1,
    'iShares Tech Growth': 4463.1,
  },
  {
    date: 'Sep 25',
    'ETF Shares Vital': 15967.5,
    'Vitainvest Core': 9700.1,
    'iShares Tech Growth': 4123.2,
  },
  {
    date: 'Sep 26',
    'ETF Shares Vital': 17349.3,
    'Vitainvest Core': 10943.4,
    'iShares Tech Growth': 3935.1,
  },
  //array-end
];

const summary = [
  //array-start
  {
    name: 'ETF Shares Vital',
    value: '$21,349.36',
    invested: '$19,698.65',
    cashflow: '$14,033.74',
    gain: '+$11,012.39',
    realized: '+$177.48',
    dividends: '+$490.97',
    bgColor: 'bg-blue-500',
    changeType: 'positive',
  },
  {
    name: 'Vitainvest Core',
    value: '$25,943.43',
    invested: '$23,698.65',
    cashflow: '$11,033.74',
    gain: '+$3,012.39',
    realized: '+$565.41',
    dividends: '+$290.97',
    bgColor: 'bg-violet-500',
    changeType: 'positive',
  },
  {
    name: 'iShares Tech Growth',
    value: '$9,443.46',
    invested: '$14,698.65',
    cashflow: '$2,033.74',
    gain: '-$5,012.39',
    realized: '-$634.42',
    dividends: '-$990.97',
    bgColor: 'bg-fuchsia-500',
    changeType: 'negative',
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <h3 className="text-sm text-gray-500 dark:text-gray-500">
        Portfolio performance
      </h3>
      <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-50">
        $32,227.40
      </p>
      <p className="mt-1 text-sm font-medium">
        <span className="text-emerald-700 dark:text-emerald-500">
          +$430.90 (4.1%)
        </span>{' '}
        <span className="font-normal text-gray-500 dark:text-gray-500">
          Past 24 hours
        </span>
      </p>
      <LineChart
        data={data}
        index="date"
        categories={[
          'ETF Shares Vital',
          'Vitainvest Core',
          'iShares Tech Growth',
        ]}
        colors={['blue', 'violet', 'fuchsia']}
        valueFormatter={valueFormatter}
        yAxisWidth={60}
        onValueChange={() => {}}
        className="mt-6 hidden !h-96 sm:block"
      />
      <LineChart
        data={data}
        index="date"
        categories={[
          'ETF Shares Vital',
          'Vitainvest Core',
          'iShares Tech Growth',
        ]}
        colors={['blue', 'violet', 'fuchsia']}
        valueFormatter={valueFormatter}
        showYAxis={false}
        showLegend={false}
        startEndOnly={true}
        className="mt-6 !h-72 sm:hidden"
      />
      <TableRoot className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell className="text-right">Value</TableHeaderCell>
              <TableHeaderCell className="text-right">Invested</TableHeaderCell>
              <TableHeaderCell className="text-right">Cashflow</TableHeaderCell>
              <TableHeaderCell className="text-right">Gain</TableHeaderCell>
              <TableHeaderCell className="text-right">Realized</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Dividends
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summary.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                  <div className="flex space-x-3">
                    <span
                      className={cx(item.bgColor, 'w-1 shrink-0 rounded')}
                      aria-hidden={true}
                    />
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{item.value}</TableCell>
                <TableCell className="text-right">{item.invested}</TableCell>
                <TableCell className="text-right">{item.cashflow}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={cx(
                      item.changeType === 'positive'
                        ? 'text-emerald-700 dark:text-emerald-500'
                        : 'text-red-700 dark:text-red-500',
                    )}
                  >
                    {item.gain}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cx(
                      item.changeType === 'positive'
                        ? 'text-emerald-700 dark:text-emerald-500'
                        : 'text-red-700 dark:text-red-500',
                    )}
                  >
                    {item.realized}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cx(
                      item.changeType === 'positive'
                        ? 'text-emerald-700 dark:text-emerald-500'
                        : 'text-red-700 dark:text-red-500',
                    )}
                  >
                    {item.dividends}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/chart-compositions/chart-composition-02.tsx

```tsx
'use client';

import {
  RiAddCircleFill,
  RiCheckboxCircleFill,
  RiGitMergeFill,
  RiGitPullRequestFill,
} from '@remixicon/react';

import { cx } from '@/lib/utils';

import { BarChart } from '@/components/BarChart';
import { Card } from '@/components/Card';
import { CategoryBar } from '@/components/CategoryBar';
import { Divider } from '@/components/Divider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';

const data = [
  //array-start
  {
    name: 'Open PRs',
    value: 4,
    icon: RiGitPullRequestFill,
    iconColor: 'text-indigo-500 dark:text-indigo-500',
  },
  {
    name: 'Merged PRs',
    value: 8,
    icon: RiGitMergeFill,
    iconColor: 'text-emerald-500 dark:text-emerald-500',
  },
  {
    name: 'Open Issues',
    value: 8,
    icon: RiAddCircleFill,
    iconColor: 'text-indigo-500 dark:text-indigo-500',
  },
  {
    name: 'Closed Issues',
    value: 92,
    icon: RiCheckboxCircleFill,
    iconColor: 'text-emerald-500 dark:text-emerald-500',
  },
  //array-end
];

const topContributors = [
  //array-start
  {
    username: 'Mbauchet',
    contributions: 7,
  },
  {
    username: 'Pizuronin',
    contributions: 4,
  },
  {
    username: 'Codetrendy',
    contributions: 3,
  },
  {
    username: 'Devsparkle',
    contributions: 3,
  },
  {
    username: 'Techphantom',
    contributions: 2,
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
          December 27, 2023 – January 3, 2024
        </h3>
        <div>
          <Select>
            <SelectTrigger className="mt-4 sm:mt-0 sm:w-40">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Last week</SelectItem>
              <SelectItem value="2">Last month</SelectItem>
              <SelectItem value="3">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Divider />
      <Card className="overflow-hidden !p-0">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-900 dark:bg-[#090E1A]">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Overview
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          <div>
            <CategoryBar
              values={[4, 8]}
              colors={['indigo', 'emerald']}
              showLabels={false}
            />
            <p className="mt-2 text-sm text-gray-900 dark:text-gray-50">
              <span className="font-semibold">4</span> Active Pull Requests
            </p>
          </div>
          <div>
            <CategoryBar
              values={[8, 92]}
              colors={['indigo', 'emerald']}
              showLabels={false}
            />
            <p className="mt-2 text-sm text-gray-900 dark:text-gray-50">
              <span className="font-semibold">8</span> Active Issues
            </p>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-px border-t border-gray-200 bg-gray-200 dark:border-gray-900 dark:bg-gray-900 md:grid-cols-4">
          {data.map((item) => (
            <li
              key={item.name}
              className="flex flex-col items-center justify-center bg-white p-3 dark:bg-[#090E1A]"
            >
              <div className="flex items-center space-x-1">
                <item.icon
                  className={cx(item.iconColor, 'size-5')}
                  aria-hidden={true}
                />
                <span className="font-semibold text-gray-900 dark:text-gray-50">
                  {item.value}
                </span>
              </div>
              <span className="text-sm text-gray-900 dark:text-gray-50">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </Card>
      <Divider className="!my-10">More info</Divider>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-50">
            Repository Summary
          </h4>
          <p className="mt-4 text-sm/6 text-gray-500 dark:text-gray-500">
            Excluding merges,{' '}
            <span className="font-medium text-gray-900 dark:text-gray-50">
              2 authors
            </span>{' '}
            have pushed{' '}
            <span className="font-medium text-gray-900 dark:text-gray-50">
              2 commits
            </span>{' '}
            to main and{' '}
            <span className="font-medium text-gray-900 dark:text-gray-50">
              19 commits
            </span>{' '}
            to all branches. On main,{' '}
            <span className="font-medium text-gray-900 dark:text-gray-50">
              12 files{' '}
            </span>
            have changed and there have been{' '}
            <span className="font-medium text-gray-900 dark:text-gray-50">
              38 additions
            </span>{' '}
            and{' '}
            <span className="font-medium text-gray-900 dark:text-gray-50">
              9 deletions
            </span>
            .
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-50">
            Top contributors
          </h4>
          <BarChart
            data={topContributors}
            index="username"
            categories={['contributions']}
            colors={['emerald']}
            showLegend={false}
            layout="vertical"
            yAxisWidth={85}
            className="mt-4 !h-48"
          />
        </div>
      </div>
    </div>
  );
}
```

### src/content/components/chart-compositions/chart-composition-03.tsx

```tsx
'use client';

import { RiExternalLinkLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { CategoryBar } from '@/components/CategoryBar';
import { Divider } from '@/components/Divider';
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
    date: 'Dec 23',
    description: 'Venture debt loan repayment',
    account: 'Calantis business account',
    amount: '-$1,200',
    changeType: 'negative',
  },
  {
    date: 'Nov 23',
    description: 'Venture debt loan repayment',
    account: 'Calantis business account',
    amount: '-$2,200',
    changeType: 'negative',
  },
  {
    date: 'Oct 23',
    description: 'Venture debt loan repayment',
    account: 'Calantis business account',
    amount: '-$1,200',
    changeType: 'negative',
  },
  {
    date: 'Sep 23',
    description: 'Venture debt loan funding',
    account: 'Calantis business account',
    amount: '+$5,000,000',
    changeType: 'positive',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
        Capital
      </h1>
      <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
        Analyze and manage your venture debt and balance.
      </p>
      <Tabs defaultValue="tab1" className="mt-6">
        <TabsList>
          <TabsTrigger value="tab1">Venture Debt</TabsTrigger>
          <TabsTrigger value="tab2">Capital Guide</TabsTrigger>
        </TabsList>
        {/* Content below only for demo purpose placed outside of <Tab> component. Add <TabsContent> to make it functional and to add content for other tabs */}
        <div className="mt-10 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="md:col-span-2">
            <h1 className="text-sm text-gray-500 dark:text-gray-500">
              Outstanding balance
            </h1>
            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-50">
              $5,450,000
            </p>
            <CategoryBar
              values={[4, 1.2, 0.25]}
              colors={['blue', 'cyan', 'fuchsia']}
              className="mt-6"
              showLabels={false}
            />
            <ul
              role="list"
              className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <li className="flex items-center space-x-2">
                <span
                  className="size-3 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
                  aria-hidden={true}
                />
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    $4M
                  </span>{' '}
                  outstanding
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span
                  className="size-3 shrink-0 rounded-sm bg-cyan-500 dark:bg-cyan-500"
                  aria-hidden={true}
                />
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    $1.2M
                  </span>{' '}
                  available today
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span
                  className="size-3 shrink-0 rounded-sm bg-fuchsia-500 dark:bg-fuchsia-500"
                  aria-hidden={true}
                />
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    $0.25M
                  </span>{' '}
                  unavailable
                </span>
              </li>
            </ul>
            <Divider />
            <p className="mt-6 text-sm font-medium text-gray-900 dark:text-gray-50">
              Interest only ends Jan 4, 2024
            </p>
            <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
              <p className="flex flex-wrap justify-between gap-4 text-sm/6 text-gray-600 dark:text-gray-400">
                Next payment of $3,200 due Jan 1, 2024.
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                >
                  Learn more
                  <RiExternalLinkLine className="size-4" aria-hidden={true} />
                </a>
              </p>
            </div>
          </Card>
          <div className="md:col-span-1 md:p-6">
            <h4 className="font-medium text-gray-900 dark:text-gray-50">
              Questions?
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Contact your financial advisor
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <span
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-blue-500 dark:bg-gray-900 dark:text-blue-500"
                aria-hidden={true}
              >
                EL
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  Emily Liftburg
                </p>
                <a
                  href="mailto:#"
                  className="mt-0.5 block text-sm text-blue-500 dark:text-blue-500"
                >
                  emily.liftburg@company.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-14 font-medium text-gray-900 dark:text-gray-50">
          Transactions
        </p>
        <TableRoot className="mt-8">
          <Table className="border-transparent">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Description</TableHeaderCell>
                <TableHeaderCell>Account</TableHeaderCell>
                <TableHeaderCell className="text-right">Amount</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.date}>
                  <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                    {item.date}
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.account}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={cx(
                        item.changeType === 'positive'
                          ? 'text-emerald-700 dark:text-emerald-500'
                          : 'text-gray-900 dark:text-gray-50',
                        'font-medium',
                      )}
                    >
                      {item.amount}
                    </span>
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

### src/content/components/chart-compositions/chart-composition-04.tsx

```tsx
'use client';

import React from 'react';

import { AreaChart } from '@/components/AreaChart';
import { Card } from '@/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const data = [
  //array-start
  {
    date: 'Aug 01',
    'Page views': 7100,
    'Unique visitors': 4434,
  },
  {
    date: 'Aug 02',
    'Page views': 10943,
    'Unique visitors': 6954,
  },
  {
    date: 'Aug 03',
    'Page views': 10889,
    'Unique visitors': 7100,
  },
  {
    date: 'Aug 04',
    'Page views': 10909,
    'Unique visitors': 7909,
  },
  {
    date: 'Aug 05',
    'Page views': 10778,
    'Unique visitors': 7103,
  },
  {
    date: 'Aug 06',
    'Page views': 10900,
    'Unique visitors': 7534,
  },
  {
    date: 'Aug 07',
    'Page views': 10129,
    'Unique visitors': 7412,
  },
  {
    date: 'Aug 08',
    'Page views': 10021,
    'Unique visitors': 7834,
  },
  {
    date: 'Aug 09',
    'Page views': 10279,
    'Unique visitors': 7159,
  },
  {
    date: 'Aug 10',
    'Page views': 10224,
    'Unique visitors': 8260,
  },
  {
    date: 'Aug 11',
    'Page views': 10380,
    'Unique visitors': 4965,
  },
  {
    date: 'Aug 12',
    'Page views': 10414,
    'Unique visitors': 4989,
  },
  {
    date: 'Aug 13',
    'Page views': 6540,
    'Unique visitors': 4839,
  },
  {
    date: 'Aug 14',
    'Page views': 6634,
    'Unique visitors': 4343,
  },
  {
    date: 'Aug 15',
    'Page views': 7124,
    'Unique visitors': 4903,
  },
  {
    date: 'Aug 16',
    'Page views': 7934,
    'Unique visitors': 5273,
  },
  {
    date: 'Aug 17',
    'Page views': 10287,
    'Unique visitors': 6900,
  },
  {
    date: 'Aug 18',
    'Page views': 10323,
    'Unique visitors': 6732,
  },
  {
    date: 'Aug 19',
    'Page views': 10511,
    'Unique visitors': 6523,
  },
  {
    date: 'Aug 20',
    'Page views': 11043,
    'Unique visitors': 7422,
  },
  {
    date: 'Aug 21',
    'Page views': 6700,
    'Unique visitors': 4334,
  },
  {
    date: 'Aug 22',
    'Page views': 6900,
    'Unique visitors': 4943,
  },
  {
    date: 'Aug 23',
    'Page views': 7934,
    'Unique visitors': 7812,
  },
  {
    date: 'Aug 24',
    'Page views': 9021,
    'Unique visitors': 7729,
  },
  {
    date: 'Aug 25',
    'Page views': 9198,
    'Unique visitors': 7178,
  },
  {
    date: 'Aug 26',
    'Page views': 9557,
    'Unique visitors': 7158,
  },
  {
    date: 'Aug 27',
    'Page views': 9959,
    'Unique visitors': 7100,
  },
  {
    date: 'Aug 28',
    'Page views': 10034,
    'Unique visitors': 7934,
  },
  {
    date: 'Aug 29',
    'Page views': 10243,
    'Unique visitors': 7223,
  },
  {
    date: 'Aug 30',
    'Page views': 10078,
    'Unique visitors': 8779,
  },
  {
    date: 'Aug 31',
    'Page views': 11134,
    'Unique visitors': 8190,
  },
  {
    date: 'Sep 01',
    'Page views': 12347,
    'Unique visitors': 4839,
  },
  {
    date: 'Sep 02',
    'Page views': 12593,
    'Unique visitors': 5153,
  },
  {
    date: 'Sep 03',
    'Page views': 12043,
    'Unique visitors': 5234,
  },
  {
    date: 'Sep 04',
    'Page views': 12144,
    'Unique visitors': 5478,
  },
  {
    date: 'Sep 05',
    'Page views': 12489,
    'Unique visitors': 5741,
  },
  {
    date: 'Sep 06',
    'Page views': 12748,
    'Unique visitors': 6743,
  },
  {
    date: 'Sep 07',
    'Page views': 12933,
    'Unique visitors': 7832,
  },
  {
    date: 'Sep 08',
    'Page views': 13028,
    'Unique visitors': 8943,
  },
  {
    date: 'Sep 09',
    'Page views': 13412,
    'Unique visitors': 9932,
  },
  {
    date: 'Sep 10',
    'Page views': 13649,
    'Unique visitors': 10139,
  },
  {
    date: 'Sep 11',
    'Page views': 13748,
    'Unique visitors': 10441,
  },
  {
    date: 'Sep 12',
    'Page views': 13148,
    'Unique visitors': 10933,
  },
  {
    date: 'Sep 13',
    'Page views': 12839,
    'Unique visitors': 10073,
  },
  {
    date: 'Sep 14',
    'Page views': 12428,
    'Unique visitors': 10128,
  },
  {
    date: 'Sep 15',
    'Page views': 12012,
    'Unique visitors': 10412,
  },
  {
    date: 'Sep 16',
    'Page views': 11801,
    'Unique visitors': 9501,
  },
  {
    date: 'Sep 17',
    'Page views': 10102,
    'Unique visitors': 7923,
  },
  {
    date: 'Sep 18',
    'Page views': 12132,
    'Unique visitors': 10212,
  },
  {
    date: 'Sep 19',
    'Page views': 12901,
    'Unique visitors': 10101,
  },
  {
    date: 'Sep 20',
    'Page views': 13132,
    'Unique visitors': 10132,
  },
  {
    date: 'Sep 21',
    'Page views': 14132,
    'Unique visitors': 10212,
  },
  {
    date: 'Sep 22',
    'Page views': 14245,
    'Unique visitors': 12163,
  },
  {
    date: 'Sep 23',
    'Page views': 14328,
    'Unique visitors': 10036,
  },
  {
    date: 'Sep 24',
    'Page views': 14949,
    'Unique visitors': 8985,
  },
  {
    date: 'Sep 25',
    'Page views': 15967,
    'Unique visitors': 9700,
  },
  {
    date: 'Sep 26',
    'Page views': 17349,
    'Unique visitors': 10943,
  },
  //array-end
];

const summary = [
  //array-start
  {
    name: 'Unique visitors',
    value: '216.8K',
  },
  {
    name: 'Page views',
    value: '271K',
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
        Web analytics
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
        Analyze and understand your web traffic.
      </p>
      <Card className="mt-8 overflow-hidden !p-0">
        <Tabs defaultValue={summary[0].name}>
          <TabsList
            defaultValue="tab1"
            className="!h-24 !bg-gray-50 dark:!bg-[#090E1A]"
          >
            {summary.map((tab) => (
              <React.Fragment key={tab.name}>
                <TabsTrigger
                  value={tab.name}
                  className="!py-4 !pl-5 !pr-12 text-left data-[state=active]:bg-white dark:data-[state=active]:bg-[#090E1A]"
                >
                  <span className="block font-normal text-gray-500 dark:text-gray-500">
                    {tab.name}
                  </span>
                  <span className="mt-1 block text-3xl font-semibold text-gray-900 dark:text-gray-50">
                    {tab.value}
                  </span>
                </TabsTrigger>
                <span
                  className="h-full border-r border-gray-200 dark:border-gray-800"
                  aria-hidden={true}
                />
              </React.Fragment>
            ))}
          </TabsList>
          {summary.map((tab) => (
            <TabsContent key={tab.name} value={tab.name} className="p-6">
              <AreaChart
                data={data}
                index="date"
                categories={[tab.name]}
                valueFormatter={valueFormatter}
                fill="solid"
                showLegend={false}
                yAxisWidth={50}
                className="hidden !h-96 sm:block"
              />
              <AreaChart
                data={data}
                index="date"
                categories={[tab.name]}
                valueFormatter={valueFormatter}
                fill="solid"
                showLegend={false}
                showYAxis={false}
                startEndOnly={true}
                className="!h-72 sm:hidden"
              />
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
```

### src/content/components/chart-compositions/chart-composition-05.tsx

```tsx
'use client';

import React from 'react';

import { AreaChart } from '@/components/AreaChart';
import { Card } from '@/components/Card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const data = [
  //array-start
  {
    date: 'Aug 01',
    'Page views': 7100,
    'Unique visitors': 4434,
  },
  {
    date: 'Aug 02',
    'Page views': 10943,
    'Unique visitors': 6954,
  },
  {
    date: 'Aug 03',
    'Page views': 10889,
    'Unique visitors': 7100,
  },
  {
    date: 'Aug 04',
    'Page views': 10909,
    'Unique visitors': 7909,
  },
  {
    date: 'Aug 05',
    'Page views': 10778,
    'Unique visitors': 7103,
  },
  {
    date: 'Aug 06',
    'Page views': 10900,
    'Unique visitors': 7534,
  },
  {
    date: 'Aug 07',
    'Page views': 10129,
    'Unique visitors': 7412,
  },
  {
    date: 'Aug 08',
    'Page views': 10021,
    'Unique visitors': 7834,
  },
  {
    date: 'Aug 09',
    'Page views': 10279,
    'Unique visitors': 7159,
  },
  {
    date: 'Aug 10',
    'Page views': 10224,
    'Unique visitors': 8260,
  },
  {
    date: 'Aug 11',
    'Page views': 10380,
    'Unique visitors': 4965,
  },
  {
    date: 'Aug 12',
    'Page views': 10414,
    'Unique visitors': 4989,
  },
  {
    date: 'Aug 13',
    'Page views': 6540,
    'Unique visitors': 4839,
  },
  {
    date: 'Aug 14',
    'Page views': 6634,
    'Unique visitors': 4343,
  },
  {
    date: 'Aug 15',
    'Page views': 7124,
    'Unique visitors': 4903,
  },
  {
    date: 'Aug 16',
    'Page views': 7934,
    'Unique visitors': 5273,
  },
  {
    date: 'Aug 17',
    'Page views': 10287,
    'Unique visitors': 6900,
  },
  {
    date: 'Aug 18',
    'Page views': 10323,
    'Unique visitors': 6732,
  },
  {
    date: 'Aug 19',
    'Page views': 10511,
    'Unique visitors': 6523,
  },
  {
    date: 'Aug 20',
    'Page views': 11043,
    'Unique visitors': 7422,
  },
  {
    date: 'Aug 21',
    'Page views': 6700,
    'Unique visitors': 4334,
  },
  {
    date: 'Aug 22',
    'Page views': 6900,
    'Unique visitors': 4943,
  },
  {
    date: 'Aug 23',
    'Page views': 7934,
    'Unique visitors': 7812,
  },
  {
    date: 'Aug 24',
    'Page views': 9021,
    'Unique visitors': 7729,
  },
  {
    date: 'Aug 25',
    'Page views': 9198,
    'Unique visitors': 7178,
  },
  {
    date: 'Aug 26',
    'Page views': 9557,
    'Unique visitors': 7158,
  },
  {
    date: 'Aug 27',
    'Page views': 9959,
    'Unique visitors': 7100,
  },
  {
    date: 'Aug 28',
    'Page views': 10034,
    'Unique visitors': 7934,
  },
  {
    date: 'Aug 29',
    'Page views': 10243,
    'Unique visitors': 7223,
  },
  {
    date: 'Aug 30',
    'Page views': 10078,
    'Unique visitors': 8779,
  },
  {
    date: 'Aug 31',
    'Page views': 11134,
    'Unique visitors': 8190,
  },
  {
    date: 'Sep 01',
    'Page views': 12347,
    'Unique visitors': 4839,
  },
  {
    date: 'Sep 02',
    'Page views': 12593,
    'Unique visitors': 5153,
  },
  {
    date: 'Sep 03',
    'Page views': 12043,
    'Unique visitors': 5234,
  },
  {
    date: 'Sep 04',
    'Page views': 12144,
    'Unique visitors': 5478,
  },
  {
    date: 'Sep 05',
    'Page views': 12489,
    'Unique visitors': 5741,
  },
  {
    date: 'Sep 06',
    'Page views': 12748,
    'Unique visitors': 6743,
  },
  {
    date: 'Sep 07',
    'Page views': 12933,
    'Unique visitors': 7832,
  },
  {
    date: 'Sep 08',
    'Page views': 13028,
    'Unique visitors': 8943,
  },
  {
    date: 'Sep 09',
    'Page views': 13412,
    'Unique visitors': 9932,
  },
  {
    date: 'Sep 10',
    'Page views': 13649,
    'Unique visitors': 10139,
  },
  {
    date: 'Sep 11',
    'Page views': 13748,
    'Unique visitors': 10441,
  },
  {
    date: 'Sep 12',
    'Page views': 13148,
    'Unique visitors': 10933,
  },
  {
    date: 'Sep 13',
    'Page views': 12839,
    'Unique visitors': 10073,
  },
  {
    date: 'Sep 14',
    'Page views': 12428,
    'Unique visitors': 10128,
  },
  {
    date: 'Sep 15',
    'Page views': 12012,
    'Unique visitors': 10412,
  },
  {
    date: 'Sep 16',
    'Page views': 11801,
    'Unique visitors': 9501,
  },
  {
    date: 'Sep 17',
    'Page views': 10102,
    'Unique visitors': 7923,
  },
  {
    date: 'Sep 18',
    'Page views': 12132,
    'Unique visitors': 10212,
  },
  {
    date: 'Sep 19',
    'Page views': 12901,
    'Unique visitors': 10101,
  },
  {
    date: 'Sep 20',
    'Page views': 13132,
    'Unique visitors': 10132,
  },
  {
    date: 'Sep 21',
    'Page views': 14132,
    'Unique visitors': 10212,
  },
  {
    date: 'Sep 22',
    'Page views': 14245,
    'Unique visitors': 12163,
  },
  {
    date: 'Sep 23',
    'Page views': 14328,
    'Unique visitors': 10036,
  },
  {
    date: 'Sep 24',
    'Page views': 14949,
    'Unique visitors': 8985,
  },
  {
    date: 'Sep 25',
    'Page views': 15967,
    'Unique visitors': 9700,
  },
  {
    date: 'Sep 26',
    'Page views': 17349,
    'Unique visitors': 10943,
  },
  //array-end
];

const summary = [
  //array-start
  {
    name: 'Unique visitors',
    value: '216.8K',
  },
  {
    name: 'Page views',
    value: '271K',
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
        Web analytics
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
        Analyze and understand your web traffic.
      </p>
      <div className="mt-6 md:flex md:items-center md:justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
            www.example.com
          </span>
          <span className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
          <span className="flex items-center space-x-2">
            <span
              className="shrink-0 animate-pulse rounded-full bg-emerald-500/30 p-1"
              aria-hidden={true}
            >
              <span className="block size-2 rounded-full bg-emerald-500 dark:bg-emerald-500" />
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-500">
              89 online
            </span>
          </span>
        </div>
        <div className="mt-2 sm:flex sm:items-center sm:space-x-2 md:mt-0">
          <Select defaultValue="Production">
            <SelectTrigger className="w-full md:w-fit">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Production">Production</SelectItem>
              <SelectItem value="Preview">Preview</SelectItem>
              <SelectItem value="All">All environments</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="2">
            <SelectTrigger className="mt-2 w-full sm:mt-0 md:w-fit">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="1">Last 7 days</SelectItem>
              <SelectItem value="2">Last 30 days</SelectItem>
              <SelectItem value="3">Last 3 months</SelectItem>
              <SelectItem value="4">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card className="mt-4 !overflow-hidden !p-0">
        <Tabs defaultValue={summary[0].name}>
          <TabsList
            defaultValue="tab1"
            className="!h-24 !bg-gray-50 dark:!bg-[#090E1A]"
          >
            {summary.map((tab) => (
              <React.Fragment key={tab.name}>
                <TabsTrigger
                  value={tab.name}
                  className="!py-4 !pl-5 !pr-12 text-left data-[state=active]:bg-white dark:data-[state=active]:bg-[#090E1A]"
                >
                  <span className="block font-normal text-gray-500 dark:text-gray-500">
                    {tab.name}
                  </span>
                  <span className="mt-1 block text-3xl font-semibold text-gray-900 dark:text-gray-50">
                    {tab.value}
                  </span>
                </TabsTrigger>
                <span
                  className="h-full border-r border-gray-200 dark:border-gray-800"
                  aria-hidden={true}
                />
              </React.Fragment>
            ))}
          </TabsList>
          {summary.map((tab) => (
            <TabsContent key={tab.name} value={tab.name} className="p-6">
              <AreaChart
                data={data}
                index="date"
                categories={[tab.name]}
                valueFormatter={valueFormatter}
                fill="solid"
                showLegend={false}
                yAxisWidth={45}
                className="hidden !h-96 sm:block"
              />
              <AreaChart
                data={data}
                index="date"
                categories={[tab.name]}
                valueFormatter={valueFormatter}
                fill="solid"
                showLegend={false}
                showYAxis={false}
                startEndOnly={true}
                className="!h-72 sm:hidden"
              />
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
```

### src/content/components/chart-compositions/chart-composition-06.tsx

```tsx
'use client';

import React from 'react';
import {
  RiGithubFill,
  RiGoogleFill,
  RiRedditFill,
  RiTwitterFill,
  RiYoutubeFill,
} from '@remixicon/react';

import { AreaChart } from '@/components/AreaChart';
import { BarList } from '@/components/BarList';
import { Card } from '@/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const data = [
  //array-start
  {
    date: 'Aug 01',
    'Page views': 7100,
    'Unique visitors': 4434,
  },
  {
    date: 'Aug 02',
    'Page views': 10943,
    'Unique visitors': 6954,
  },
  {
    date: 'Aug 03',
    'Page views': 10889,
    'Unique visitors': 7100,
  },
  {
    date: 'Aug 04',
    'Page views': 10909,
    'Unique visitors': 7909,
  },
  {
    date: 'Aug 05',
    'Page views': 10778,
    'Unique visitors': 7103,
  },
  {
    date: 'Aug 06',
    'Page views': 10900,
    'Unique visitors': 7534,
  },
  {
    date: 'Aug 07',
    'Page views': 10129,
    'Unique visitors': 7412,
  },
  {
    date: 'Aug 08',
    'Page views': 10021,
    'Unique visitors': 7834,
  },
  {
    date: 'Aug 09',
    'Page views': 10279,
    'Unique visitors': 7159,
  },
  {
    date: 'Aug 10',
    'Page views': 10224,
    'Unique visitors': 8260,
  },
  {
    date: 'Aug 11',
    'Page views': 10380,
    'Unique visitors': 4965,
  },
  {
    date: 'Aug 12',
    'Page views': 10414,
    'Unique visitors': 4989,
  },
  {
    date: 'Aug 13',
    'Page views': 6540,
    'Unique visitors': 4839,
  },
  {
    date: 'Aug 14',
    'Page views': 6634,
    'Unique visitors': 4343,
  },
  {
    date: 'Aug 15',
    'Page views': 7124,
    'Unique visitors': 4903,
  },
  {
    date: 'Aug 16',
    'Page views': 7934,
    'Unique visitors': 5273,
  },
  {
    date: 'Aug 17',
    'Page views': 10287,
    'Unique visitors': 6900,
  },
  {
    date: 'Aug 18',
    'Page views': 10323,
    'Unique visitors': 6732,
  },
  {
    date: 'Aug 19',
    'Page views': 10511,
    'Unique visitors': 6523,
  },
  {
    date: 'Aug 20',
    'Page views': 11043,
    'Unique visitors': 7422,
  },
  {
    date: 'Aug 21',
    'Page views': 6700,
    'Unique visitors': 4334,
  },
  {
    date: 'Aug 22',
    'Page views': 6900,
    'Unique visitors': 4943,
  },
  {
    date: 'Aug 23',
    'Page views': 7934,
    'Unique visitors': 7812,
  },
  {
    date: 'Aug 24',
    'Page views': 9021,
    'Unique visitors': 7729,
  },
  {
    date: 'Aug 25',
    'Page views': 9198,
    'Unique visitors': 7178,
  },
  {
    date: 'Aug 26',
    'Page views': 9557,
    'Unique visitors': 7158,
  },
  {
    date: 'Aug 27',
    'Page views': 9959,
    'Unique visitors': 7100,
  },
  {
    date: 'Aug 28',
    'Page views': 10034,
    'Unique visitors': 7934,
  },
  {
    date: 'Aug 29',
    'Page views': 10243,
    'Unique visitors': 7223,
  },
  {
    date: 'Aug 30',
    'Page views': 10078,
    'Unique visitors': 8779,
  },
  {
    date: 'Aug 31',
    'Page views': 11134,
    'Unique visitors': 8190,
  },
  {
    date: 'Sep 01',
    'Page views': 12347,
    'Unique visitors': 4839,
  },
  {
    date: 'Sep 02',
    'Page views': 12593,
    'Unique visitors': 5153,
  },
  {
    date: 'Sep 03',
    'Page views': 12043,
    'Unique visitors': 5234,
  },
  {
    date: 'Sep 04',
    'Page views': 12144,
    'Unique visitors': 5478,
  },
  {
    date: 'Sep 05',
    'Page views': 12489,
    'Unique visitors': 5741,
  },
  {
    date: 'Sep 06',
    'Page views': 12748,
    'Unique visitors': 6743,
  },
  {
    date: 'Sep 07',
    'Page views': 12933,
    'Unique visitors': 7832,
  },
  {
    date: 'Sep 08',
    'Page views': 13028,
    'Unique visitors': 8943,
  },
  {
    date: 'Sep 09',
    'Page views': 13412,
    'Unique visitors': 9932,
  },
  {
    date: 'Sep 10',
    'Page views': 13649,
    'Unique visitors': 10139,
  },
  {
    date: 'Sep 11',
    'Page views': 13748,
    'Unique visitors': 10441,
  },
  {
    date: 'Sep 12',
    'Page views': 13148,
    'Unique visitors': 10933,
  },
  {
    date: 'Sep 13',
    'Page views': 12839,
    'Unique visitors': 10073,
  },
  {
    date: 'Sep 14',
    'Page views': 12428,
    'Unique visitors': 10128,
  },
  {
    date: 'Sep 15',
    'Page views': 12012,
    'Unique visitors': 10412,
  },
  {
    date: 'Sep 16',
    'Page views': 11801,
    'Unique visitors': 9501,
  },
  {
    date: 'Sep 17',
    'Page views': 10102,
    'Unique visitors': 7923,
  },
  {
    date: 'Sep 18',
    'Page views': 12132,
    'Unique visitors': 10212,
  },
  {
    date: 'Sep 19',
    'Page views': 12901,
    'Unique visitors': 10101,
  },
  {
    date: 'Sep 20',
    'Page views': 13132,
    'Unique visitors': 10132,
  },
  {
    date: 'Sep 21',
    'Page views': 14132,
    'Unique visitors': 10212,
  },
  {
    date: 'Sep 22',
    'Page views': 14245,
    'Unique visitors': 12163,
  },
  {
    date: 'Sep 23',
    'Page views': 14328,
    'Unique visitors': 10036,
  },
  {
    date: 'Sep 24',
    'Page views': 14949,
    'Unique visitors': 8985,
  },
  {
    date: 'Sep 25',
    'Page views': 15967,
    'Unique visitors': 9700,
  },
  {
    date: 'Sep 26',
    'Page views': 17349,
    'Unique visitors': 10943,
  },
  //array-end
];

const topPages = [
  { name: '/', value: 20874 },
  { name: '/components', value: 19188 },
  { name: '/docs/getting-started/installation', value: 17922 },
  { name: '/docs/visualizations/area-chart', value: 10067 },
  { name: '/docs/visualizations/bar-chart', value: 9067 },
];

const topSources = [
  { name: 'google.com', value: 9882, icon: RiGoogleFill },
  { name: 'twitter.com', value: 1904, icon: RiTwitterFill },
  { name: 'github.com', value: 1904, icon: RiGithubFill },
  { name: 'youtube.com', value: 1118, icon: RiYoutubeFill },
  { name: 'reddit.com', value: 396, icon: RiRedditFill },
];

const topPagesViews = [
  { name: '/components', value: 60874 },
  { name: '/', value: 51188 },
  { name: '/docs/getting-started/installation', value: 38922 },
  { name: '/docs/visualizations/area-chart', value: 20067 },
  { name: '/docs/visualizations/bar-chart', value: 19067 },
];

const topSourcesViews = [
  { name: 'google.com', value: 12892, icon: RiGoogleFill },
  { name: 'twitter.com', value: 2070, icon: RiTwitterFill },
  { name: 'github.com', value: 1296, icon: RiGithubFill },
  { name: 'youtube.com', value: 779, icon: RiYoutubeFill },
  { name: 'reddit.com', value: 438, icon: RiRedditFill },
];

const summary = [
  {
    name: 'Unique visitors',
    type: 'Visitors',
    value: '216.8K',
    categories: [
      { name: 'Top pages', data: topPages },
      { name: 'Top sources', data: topSources },
    ],
  },
  {
    name: 'Page views',
    type: 'Views',
    value: '271K',
    categories: [
      { name: 'Top pages', data: topPagesViews },
      { name: 'Top sources', data: topSourcesViews },
    ],
  },
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
        Web analytics
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
        Analyze and understand your web traffic.
      </p>
      <Tabs defaultValue={summary[0].name}>
        <Card className="mt-8 overflow-hidden !p-0">
          <TabsList
            defaultValue="tab1"
            className="!h-24 !bg-gray-50 dark:!bg-[#090E1A]"
          >
            {summary.map((tab, index) => (
              <React.Fragment key={tab.name}>
                <TabsTrigger
                  value={tab.name}
                  className="!py-4 !pl-5 !pr-12 text-left data-[state=active]:bg-white dark:data-[state=active]:bg-[#090E1A]"
                >
                  <span className="block font-normal text-gray-500 dark:text-gray-500">
                    {tab.name}
                  </span>
                  <span className="mt-1 block text-3xl font-semibold text-gray-900 dark:text-gray-50">
                    {tab.value}
                  </span>
                </TabsTrigger>
                {index < summary.length - 1 && (
                  <span
                    className="h-full border-r border-gray-200 dark:border-gray-800"
                    aria-hidden={true}
                  />
                )}
              </React.Fragment>
            ))}
          </TabsList>
          {summary.map((tab) => (
            <TabsContent key={tab.name} value={tab.name}>
              <div className="p-6">
                <AreaChart
                  data={data}
                  index="date"
                  categories={[tab.name]}
                  valueFormatter={valueFormatter}
                  fill="solid"
                  showLegend={false}
                  yAxisWidth={45}
                  className="hidden !h-96 sm:block"
                />
                <AreaChart
                  data={data}
                  index="date"
                  categories={[tab.name]}
                  valueFormatter={valueFormatter}
                  fill="solid"
                  showLegend={false}
                  showYAxis={false}
                  startEndOnly={true}
                  className="!h-72 sm:hidden"
                />
              </div>
              <div className="mt-8 grid grid-cols-1 gap-8 p-6 sm:grid-cols-2">
                {tab.categories.map((category) => (
                  <Card key={category.name}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                        {category.name}
                      </p>
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {tab.type}
                      </span>
                    </div>
                    <BarList
                      data={category.data}
                      valueFormatter={valueFormatter}
                      className="mt-4"
                    />
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Card>
      </Tabs>
    </div>
  );
}
```

### src/content/components/chart-compositions/chart-composition-07.tsx

```tsx
'use client';

import React from 'react';
import {
  RiArrowRightUpLine,
  RiFacebookCircleFill,
  RiGithubFill,
  RiGoogleFill,
  RiLinkedinFill,
  RiNpmjsLine,
  RiPagesLine,
  RiRedditFill,
  RiSearchLine,
  RiTwitterFill,
  RiYoutubeFill,
} from '@remixicon/react';

import { AreaChart } from '@/components/AreaChart';
import { BarList } from '@/components/BarList';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog';
import { Input } from '@/components/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const data = [
  //array-start
  {
    date: 'Aug 01',
    'Page views': 7100,
    'Unique visitors': 4434,
  },
  {
    date: 'Aug 02',
    'Page views': 10943,
    'Unique visitors': 6954,
  },
  {
    date: 'Aug 03',
    'Page views': 10889,
    'Unique visitors': 7100,
  },
  {
    date: 'Aug 04',
    'Page views': 10909,
    'Unique visitors': 7909,
  },
  {
    date: 'Aug 05',
    'Page views': 10778,
    'Unique visitors': 7103,
  },
  {
    date: 'Aug 06',
    'Page views': 10900,
    'Unique visitors': 7534,
  },
  {
    date: 'Aug 07',
    'Page views': 10129,
    'Unique visitors': 7412,
  },
  {
    date: 'Aug 08',
    'Page views': 10021,
    'Unique visitors': 7834,
  },
  {
    date: 'Aug 09',
    'Page views': 10279,
    'Unique visitors': 7159,
  },
  {
    date: 'Aug 10',
    'Page views': 10224,
    'Unique visitors': 8260,
  },
  {
    date: 'Aug 11',
    'Page views': 10380,
    'Unique visitors': 4965,
  },
  {
    date: 'Aug 12',
    'Page views': 10414,
    'Unique visitors': 4989,
  },
  {
    date: 'Aug 13',
    'Page views': 6540,
    'Unique visitors': 4839,
  },
  {
    date: 'Aug 14',
    'Page views': 6634,
    'Unique visitors': 4343,
  },
  {
    date: 'Aug 15',
    'Page views': 7124,
    'Unique visitors': 4903,
  },
  {
    date: 'Aug 16',
    'Page views': 7934,
    'Unique visitors': 5273,
  },
  {
    date: 'Aug 17',
    'Page views': 10287,
    'Unique visitors': 6900,
  },
  {
    date: 'Aug 18',
    'Page views': 10323,
    'Unique visitors': 6732,
  },
  {
    date: 'Aug 19',
    'Page views': 10511,
    'Unique visitors': 6523,
  },
  {
    date: 'Aug 20',
    'Page views': 11043,
    'Unique visitors': 7422,
  },
  {
    date: 'Aug 21',
    'Page views': 6700,
    'Unique visitors': 4334,
  },
  {
    date: 'Aug 22',
    'Page views': 6900,
    'Unique visitors': 4943,
  },
  {
    date: 'Aug 23',
    'Page views': 7934,
    'Unique visitors': 7812,
  },
  {
    date: 'Aug 24',
    'Page views': 9021,
    'Unique visitors': 7729,
  },
  {
    date: 'Aug 25',
    'Page views': 9198,
    'Unique visitors': 7178,
  },
  {
    date: 'Aug 26',
    'Page views': 9557,
    'Unique visitors': 7158,
  },
  {
    date: 'Aug 27',
    'Page views': 9959,
    'Unique visitors': 7100,
  },
  {
    date: 'Aug 28',
    'Page views': 10034,
    'Unique visitors': 7934,
  },
  {
    date: 'Aug 29',
    'Page views': 10243,
    'Unique visitors': 7223,
  },
  {
    date: 'Aug 30',
    'Page views': 10078,
    'Unique visitors': 8779,
  },
  {
    date: 'Aug 31',
    'Page views': 11134,
    'Unique visitors': 8190,
  },
  {
    date: 'Sep 01',
    'Page views': 12347,
    'Unique visitors': 4839,
  },
  {
    date: 'Sep 02',
    'Page views': 12593,
    'Unique visitors': 5153,
  },
  {
    date: 'Sep 03',
    'Page views': 12043,
    'Unique visitors': 5234,
  },
  {
    date: 'Sep 04',
    'Page views': 12144,
    'Unique visitors': 5478,
  },
  {
    date: 'Sep 05',
    'Page views': 12489,
    'Unique visitors': 5741,
  },
  {
    date: 'Sep 06',
    'Page views': 12748,
    'Unique visitors': 6743,
  },
  {
    date: 'Sep 07',
    'Page views': 12933,
    'Unique visitors': 7832,
  },
  {
    date: 'Sep 08',
    'Page views': 13028,
    'Unique visitors': 8943,
  },
  {
    date: 'Sep 09',
    'Page views': 13412,
    'Unique visitors': 9932,
  },
  {
    date: 'Sep 10',
    'Page views': 13649,
    'Unique visitors': 10139,
  },
  {
    date: 'Sep 11',
    'Page views': 13748,
    'Unique visitors': 10441,
  },
  {
    date: 'Sep 12',
    'Page views': 13148,
    'Unique visitors': 10933,
  },
  {
    date: 'Sep 13',
    'Page views': 12839,
    'Unique visitors': 10073,
  },
  {
    date: 'Sep 14',
    'Page views': 12428,
    'Unique visitors': 10128,
  },
  {
    date: 'Sep 15',
    'Page views': 12012,
    'Unique visitors': 10412,
  },
  {
    date: 'Sep 16',
    'Page views': 11801,
    'Unique visitors': 9501,
  },
  {
    date: 'Sep 17',
    'Page views': 10102,
    'Unique visitors': 7923,
  },
  {
    date: 'Sep 18',
    'Page views': 12132,
    'Unique visitors': 10212,
  },
  {
    date: 'Sep 19',
    'Page views': 12901,
    'Unique visitors': 10101,
  },
  {
    date: 'Sep 20',
    'Page views': 13132,
    'Unique visitors': 10132,
  },
  {
    date: 'Sep 21',
    'Page views': 14132,
    'Unique visitors': 10212,
  },
  {
    date: 'Sep 22',
    'Page views': 14245,
    'Unique visitors': 12163,
  },
  {
    date: 'Sep 23',
    'Page views': 14328,
    'Unique visitors': 10036,
  },
  {
    date: 'Sep 24',
    'Page views': 14949,
    'Unique visitors': 8985,
  },
  {
    date: 'Sep 25',
    'Page views': 15967,
    'Unique visitors': 9700,
  },
  {
    date: 'Sep 26',
    'Page views': 17349,
    'Unique visitors': 10943,
  },
  //array-end
];

const data1 = [
  //array-start
  {
    name: '/',
    value: 20874,
  },
  {
    name: '/components',
    value: 19188,
  },
  {
    name: '/docs/getting-started/installation',
    value: 17922,
  },
  {
    name: '/docs/visualizations/area-chart',
    value: 10067,
  },
  {
    name: '/docs/visualizations/bar-chart',
    value: 9067,
  },
  {
    name: '/docs/visualizations/line-chart',
    value: 9067,
  },
  {
    name: '/docs/visualizations/donut-chart',
    value: 8066,
  },
  {
    name: '/docs/visualizations/spark-charts',
    value: 6677,
  },
  {
    name: '/docs/visualizations/barlist',
    value: 6604,
  },
  {
    name: '/docs/ui/table',
    value: 6604,
  },
  {
    name: '/docs/ui/button',
    value: 6109,
  },
  {
    name: '/docs/ui/select',
    value: 4237,
  },
  {
    name: '/docs/ui/card',
    value: 1261,
  },
  //array-end
];

const data2 = [
  //array-start
  {
    name: 'google.com',
    value: 9882,
    icon: RiGoogleFill,
  },
  {
    name: 'twitter.com',
    value: 1904,
    icon: RiTwitterFill,
  },
  {
    name: 'github.com',
    value: 1904,
    icon: RiGithubFill,
  },
  {
    name: 'youtube.com',
    value: 1118,
    icon: RiYoutubeFill,
  },
  {
    name: 'reddit.com',
    value: 396,
    icon: RiRedditFill,
  },
  {
    name: 'bing.com',
    value: 302,
    icon: RiSearchLine,
  },
  {
    name: 'duckduckgo.com',
    value: 281,
    icon: RiSearchLine,
  },
  {
    name: 'npmjs.com',
    value: 98,
    icon: RiNpmjsLine,
  },
  {
    name: 'linkedin.com',
    value: 71,
    icon: RiLinkedinFill,
  },
  {
    name: 'news.ycombinator.com',
    value: 60,
    icon: RiPagesLine,
  },
  {
    name: 'facebook.com',
    value: 51,
    icon: RiFacebookCircleFill,
  },
  //array-end
];

const data3 = [
  //array-start
  {
    name: '/components',
    value: 60874,
  },
  {
    name: '/',
    value: 51188,
  },
  {
    name: '/docs/getting-started/installation',
    value: 38922,
  },
  {
    name: '/docs/visualizations/area-chart',
    value: 20067,
  },
  {
    name: '/docs/visualizations/bar-chart',
    value: 19067,
  },
  {
    name: '/docs/visualizations/line-chart',
    value: 18131,
  },
  {
    name: '/docs/visualizations/donut-chart',
    value: 15107,
  },
  {
    name: '/docs/visualizations/spark-charts',
    value: 13103,
  },
  {
    name: '/docs/visualizations/data-bars',
    value: 9701,
  },
  {
    name: '/docs/visualizations/barlist',
    value: 6502,
  },
  {
    name: '/docs/ui/table',
    value: 6401,
  },
  {
    name: '/docs/ui/card',
    value: 5929,
  },
  {
    name: '/docs/ui/button',
    value: 5710,
  },
  {
    name: '/docs/ui/select',
    value: 4109,
  },
  //array-end
];

const data4 = [
  //array-start
  {
    name: 'google.com',
    value: 12892,
    icon: RiGoogleFill,
  },
  {
    name: 'twitter.com',
    value: 2070,
    icon: RiTwitterFill,
  },
  {
    name: 'github.com',
    value: 1296,
    icon: RiGithubFill,
  },
  {
    name: 'youtube.com',
    value: 779,
    icon: RiYoutubeFill,
  },
  {
    name: 'reddit.com',
    value: 621,
    icon: RiRedditFill,
  },
  {
    name: 'bing.com',
    value: 573,
    icon: RiSearchLine,
  },
  {
    name: 'duckduckgo.com',
    value: 381,
    icon: RiSearchLine,
  },
  {
    name: 'npmjs.com',
    value: 302,
    icon: RiNpmjsLine,
  },
  {
    name: 'linkedin.com',
    value: 199,
    icon: RiLinkedinFill,
  },
  {
    name: 'news.ycombinator.com',
    value: 181,
    icon: RiPagesLine,
  },
  {
    name: 'facebook.com',
    value: 170,
    icon: RiFacebookCircleFill,
  },
  //array-end
];

const summary = [
  {
    name: 'Unique visitors',
    type: 'Visitors',
    value: '216.8K',
    categories: [
      {
        name: 'Top pages',
        data: data1,
      },
      {
        name: 'Top sources',
        data: data2,
      },
    ],
  },
  {
    name: 'Page views',
    type: 'Views',
    value: '271K',
    categories: [
      {
        name: 'Top pages',
        data: data3,
      },
      {
        name: 'Top sources',
        data: data4,
      },
    ],
  },
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

function useResizeObserver(
  elementRef: React.RefObject<Element>,
): ResizeObserverEntry | undefined {
  const [entry, setEntry] = React.useState<ResizeObserverEntry>();

  const updateEntry = ([entry]: ResizeObserverEntry[]): void => {
    setEntry(entry);
  };

  React.useEffect(() => {
    const node = elementRef?.current;
    if (!node) return;

    const observer = new ResizeObserver(updateEntry);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef]);

  return entry;
}

const FilterScroll = React.forwardRef(
  ({ children }: React.PropsWithChildren, forwardedRef) => {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(forwardedRef, () => ref.current);

    const [scrollProgress, setScrollProgress] = React.useState(1);

    const updateScrollProgress = React.useCallback(() => {
      if (!ref.current) return;
      const { scrollTop, scrollHeight, clientHeight } = ref.current;

      setScrollProgress(
        scrollHeight === clientHeight
          ? 1
          : scrollTop / (scrollHeight - clientHeight),
      );
    }, []);

    const resizeObserverEntry = useResizeObserver(ref);

    React.useEffect(updateScrollProgress, [resizeObserverEntry]);

    return (
      <>
        <div
          className="h-96 overflow-y-scroll py-4"
          ref={ref}
          onScroll={updateScrollProgress}
        >
          {children}
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-white"
          style={{ opacity: 1 - Math.pow(scrollProgress, 2) }}
        />
      </>
    );
  },
);

export default function Example() {
  const [selectedIndex, setSelectedIndex] = React.useState('Unique visitors');

  const handleIndexChange = (index: string) => {
    setSelectedIndex(index);
  };

  const [dialog, setDialog] = React.useState({
    open: false,
    index: 0,
  });
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredItems =
    summary
      .find((tab) => tab.name === selectedIndex)
      ?.categories[
        dialog.index
      ].data.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    [];

  const mainListContainer = React.useRef<HTMLDivElement>(null);

  return (
    <div className="obfuscate">
      <h3 className="text-lg text-gray-900 dark:text-gray-50">Web analytics</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
        Analyze and understand your web traffic.
      </p>
      <Tabs value={selectedIndex} onValueChange={handleIndexChange}>
        <Card className="mt-8 overflow-hidden !p-0">
          <TabsList
            defaultValue="tab1"
            className="!h-24 !bg-gray-50 dark:!bg-[#090E1A]"
          >
            {summary.map((tab) => (
              <React.Fragment key={tab.name}>
                <TabsTrigger
                  value={tab.name}
                  className="!py-4 !pl-5 !pr-12 text-left data-[state=active]:bg-white dark:data-[state=active]:bg-[#090E1A]"
                >
                  <span className="block font-normal text-gray-500 dark:text-gray-500">
                    {tab.name}
                  </span>
                  <span className="mt-1 block text-3xl font-semibold text-gray-900 dark:text-gray-50">
                    {tab.value}
                  </span>
                </TabsTrigger>
                <span
                  className="h-full border-r border-gray-200 dark:border-gray-800"
                  aria-hidden={true}
                />
              </React.Fragment>
            ))}
          </TabsList>
          <div className="mt-4">
            {summary.map((tab) => (
              <TabsContent value={tab.name} key={tab.name} className="p-6">
                <>
                  <AreaChart
                    data={data}
                    index="date"
                    categories={[tab.name]}
                    valueFormatter={valueFormatter}
                    showLegend={false}
                    yAxisWidth={45}
                    fill="solid"
                    className="hidden !h-96 sm:block"
                  />
                  <AreaChart
                    data={data}
                    index="date"
                    categories={[tab.name]}
                    valueFormatter={valueFormatter}
                    showLegend={false}
                    showYAxis={false}
                    startEndOnly={true}
                    fill="solid"
                    className="!h-72 sm:hidden"
                  />
                </>
              </TabsContent>
            ))}
          </div>
        </Card>
      </Tabs>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {summary
          .find((tab) => tab.name === selectedIndex)
          ?.categories.map((category, index) => (
            <Card key={category.name}>
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  {category.name}
                </p>
                <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
                  {summary.find((tab) => tab.name === selectedIndex)?.type}
                </span>
              </div>
              <BarList
                data={category.data.slice(0, 5)}
                valueFormatter={valueFormatter}
                className="mt-4"
              />
              <div className="absolute inset-x-0 bottom-0 flex justify-center rounded-b-lg bg-gradient-to-t from-white to-transparent py-7 dark:from-gray-950">
                <Button
                  variant="secondary"
                  className="!gap-1.5 !rounded-full !px-2.5 !py-1.5 !text-xs"
                  onClick={() =>
                    setDialog({
                      open: true,
                      index: index,
                    })
                  }
                >
                  Show more
                  <RiArrowRightUpLine
                    className="-mr-px size-4 shrink-0"
                    aria-hidden={true}
                  />
                </Button>
              </div>
            </Card>
          ))}
      </div>

      <Dialog
        open={dialog.open}
        onOpenChange={(open) => setDialog({ ...dialog, open })}
      >
        <DialogContent className="!p-0">
          <DialogHeader className="border-b border-gray-200 px-6 pb-4 pt-6 dark:border-gray-900">
            <DialogTitle className="flex items-center justify-between">
              <p className="text-base font-medium text-gray-900 dark:text-gray-50">
                Pages
              </p>
              <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
                {summary.find((tab) => tab.name === selectedIndex)?.type}
              </p>
            </DialogTitle>
            <Input
              type="search"
              placeholder="Search page..."
              className="mt-2"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </DialogHeader>
          {/* only left padding used in parent to align scrollbar all the way to the right */}
          <div className="relative pl-6">
            <FilterScroll ref={mainListContainer}>
              {filteredItems.length > 0 ? (
                <BarList
                  data={filteredItems}
                  valueFormatter={valueFormatter}
                  className="pr-6"
                />
              ) : (
                <p className="flex h-full items-center justify-center text-sm text-gray-900 dark:text-gray-50">
                  No results.
                </p>
              )}
            </FilterScroll>
          </div>
          <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-6 dark:border-gray-900 dark:bg-[#090E1A]">
            <DialogClose asChild>
              <Button
                onClick={() => setSearchQuery('')}
                className="w-full"
                variant="secondary"
              >
                Go back
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

### src/content/components/chart-compositions/chart-composition-08.tsx

```tsx
'use client';

import React from 'react';

import { Badge } from '@/components/Badge';
import { BarChart } from '@/components/BarChart';
import { Divider } from '@/components/Divider';

const data = [
  //array-start
  {
    date: 'Aug 01',
    'GPU cluster': 7100,
    'Workspace usage': 4434,
  },
  {
    date: 'Aug 02',
    'GPU cluster': 10943,
    'Workspace usage': 6954,
  },
  {
    date: 'Aug 03',
    'GPU cluster': 10889,
    'Workspace usage': 7100,
  },
  {
    date: 'Aug 04',
    'GPU cluster': 10909,
    'Workspace usage': 7909,
  },
  {
    date: 'Aug 05',
    'GPU cluster': 10778,
    'Workspace usage': 7103,
  },
  {
    date: 'Aug 06',
    'GPU cluster': 10900,
    'Workspace usage': 7534,
  },
  {
    date: 'Aug 07',
    'GPU cluster': 10129,
    'Workspace usage': 7412,
  },
  {
    date: 'Aug 08',
    'GPU cluster': 10021,
    'Workspace usage': 7834,
  },
  {
    date: 'Aug 09',
    'GPU cluster': 10279,
    'Workspace usage': 7159,
  },
  {
    date: 'Aug 10',
    'GPU cluster': 10224,
    'Workspace usage': 8260,
  },
  {
    date: 'Aug 11',
    'GPU cluster': 10380,
    'Workspace usage': 4965,
  },
  {
    date: 'Aug 12',
    'GPU cluster': 10414,
    'Workspace usage': 4989,
  },
  {
    date: 'Aug 13',
    'GPU cluster': 6540,
    'Workspace usage': 4839,
  },
  {
    date: 'Aug 14',
    'GPU cluster': 6634,
    'Workspace usage': 4343,
  },
  {
    date: 'Aug 15',
    'GPU cluster': 7124,
    'Workspace usage': 4903,
  },
  {
    date: 'Aug 16',
    'GPU cluster': 7934,
    'Workspace usage': 5273,
  },
  {
    date: 'Aug 17',
    'GPU cluster': 10287,
    'Workspace usage': 6900,
  },
  {
    date: 'Aug 18',
    'GPU cluster': 10323,
    'Workspace usage': 6732,
  },
  {
    date: 'Aug 19',
    'GPU cluster': 10511,
    'Workspace usage': 6523,
  },
  {
    date: 'Aug 20',
    'GPU cluster': 11043,
    'Workspace usage': 7422,
  },
  {
    date: 'Aug 21',
    'GPU cluster': 6700,
    'Workspace usage': 4334,
  },
  {
    date: 'Aug 22',
    'GPU cluster': 6900,
    'Workspace usage': 4943,
  },
  {
    date: 'Aug 23',
    'GPU cluster': 7934,
    'Workspace usage': 7812,
  },
  {
    date: 'Aug 24',
    'GPU cluster': 9021,
    'Workspace usage': 7729,
  },
  {
    date: 'Aug 25',
    'GPU cluster': 9198,
    'Workspace usage': 7178,
  },
  {
    date: 'Aug 26',
    'GPU cluster': 9557,
    'Workspace usage': 7158,
  },
  {
    date: 'Aug 27',
    'GPU cluster': 9959,
    'Workspace usage': 7100,
  },
  {
    date: 'Aug 28',
    'GPU cluster': 10034,
    'Workspace usage': 7934,
  },
  {
    date: 'Aug 29',
    'GPU cluster': 10243,
    'Workspace usage': 7223,
  },
  {
    date: 'Aug 30',
    'GPU cluster': 10078,
    'Workspace usage': 8779,
  },
  {
    date: 'Aug 31',
    'GPU cluster': 11134,
    'Workspace usage': 8190,
  },
  {
    date: 'Sep 01',
    'GPU cluster': 12347,
    'Workspace usage': 4839,
  },
  {
    date: 'Sep 02',
    'GPU cluster': 12593,
    'Workspace usage': 5153,
  },
  {
    date: 'Sep 03',
    'GPU cluster': 12043,
    'Workspace usage': 5234,
  },
  {
    date: 'Sep 04',
    'GPU cluster': 12144,
    'Workspace usage': 5478,
  },
  {
    date: 'Sep 05',
    'GPU cluster': 12489,
    'Workspace usage': 5741,
  },
  {
    date: 'Sep 06',
    'GPU cluster': 12748,
    'Workspace usage': 6743,
  },
  {
    date: 'Sep 07',
    'GPU cluster': 12933,
    'Workspace usage': 7832,
  },
  {
    date: 'Sep 08',
    'GPU cluster': 13028,
    'Workspace usage': 8943,
  },
  {
    date: 'Sep 09',
    'GPU cluster': 13412,
    'Workspace usage': 9932,
  },
  {
    date: 'Sep 10',
    'GPU cluster': 13649,
    'Workspace usage': 10139,
  },
  {
    date: 'Sep 11',
    'GPU cluster': 13748,
    'Workspace usage': 10441,
  },
  {
    date: 'Sep 12',
    'GPU cluster': 13148,
    'Workspace usage': 10933,
  },
  {
    date: 'Sep 13',
    'GPU cluster': 12839,
    'Workspace usage': 10073,
  },
  {
    date: 'Sep 14',
    'GPU cluster': 12428,
    'Workspace usage': 10128,
  },
  {
    date: 'Sep 15',
    'GPU cluster': 12012,
    'Workspace usage': 10412,
  },
  {
    date: 'Sep 16',
    'GPU cluster': 11801,
    'Workspace usage': 9501,
  },
  {
    date: 'Sep 17',
    'GPU cluster': 10102,
    'Workspace usage': 7923,
  },
  {
    date: 'Sep 18',
    'GPU cluster': 12132,
    'Workspace usage': 10212,
  },
  {
    date: 'Sep 19',
    'GPU cluster': 12901,
    'Workspace usage': 10101,
  },
  {
    date: 'Sep 20',
    'GPU cluster': 13132,
    'Workspace usage': 10132,
  },
  {
    date: 'Sep 21',
    'GPU cluster': 14132,
    'Workspace usage': 10212,
  },
  {
    date: 'Sep 22',
    'GPU cluster': 14245,
    'Workspace usage': 12163,
  },
  {
    date: 'Sep 23',
    'GPU cluster': 14328,
    'Workspace usage': 10036,
  },
  {
    date: 'Sep 24',
    'GPU cluster': 14949,
    'Workspace usage': 8985,
  },
  {
    date: 'Sep 25',
    'GPU cluster': 15967,
    'Workspace usage': 9700,
  },
  {
    date: 'Sep 26',
    'GPU cluster': 17349,
    'Workspace usage': 10943,
  },
  //array-end
];

const summary = [
  {
    name: 'Actual',
    value: '$8,110.15',
  },
  {
    name: 'Forecasted',
    value: '$10,230.25',
  },
  {
    name: 'Last invoice',
    value: 'Sept 20, 2024',
  },
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="flex flex-col gap-x-6 gap-y-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">
            Enterprise
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
            User ID:{` `}
            <span className="font-medium text-gray-900 dark:text-gray-50">
              admin_dfQ7s
            </span>
          </p>
        </div>
        <div className="mt-4 flex items-center gap-4 gap-y-2 sm:mt-0 sm:gap-x-8">
          {summary.map((item, index) => (
            <React.Fragment key={item.name}>
              <div>
                <p className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                  {item.name}
                </p>
                {item.name === 'Last invoice' ? (
                  <a
                    className="mt-1 inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                    href="#"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-50">
                    {item.value}
                  </p>
                )}
              </div>
              <span className="flex">
                {index < summary.length - 1 && (
                  <span
                    className="h-10 w-px bg-slate-500/20"
                    aria-hidden="true"
                  />
                )}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Divider className="my-5" />
      <div className="flex items-center gap-3">
        <Badge variant="success" className="!rounded-full">
          Active
        </Badge>
        <span
          className="h-6 w-px bg-gray-200 dark:bg-gray-800"
          aria-hidden="true"
        />
        <span className="text-sm text-gray-500 dark:text-gray-500">
          Sept 24 period
        </span>
        <span
          className="hidden h-6 w-px bg-gray-200 dark:bg-gray-800 sm:block"
          aria-hidden="true"
        />
        <span className="hidden text-sm text-gray-500 dark:text-gray-500 sm:block">
          Started Sep 1, 2024 (billed on the 28th)
        </span>
      </div>
      <BarChart
        data={data}
        index="date"
        categories={['GPU cluster', 'Workspace usage']}
        type="stacked"
        valueFormatter={valueFormatter}
        showLegend={false}
        showYAxis={false}
        className="mt-10 hidden sm:block"
      />
      <BarChart
        data={data}
        index="date"
        categories={['GPU cluster', 'Workspace usage']}
        type="stacked"
        valueFormatter={valueFormatter}
        showLegend={false}
        showYAxis={false}
        className="mt-10 sm:hidden"
      />
    </div>
  );
}
```

### src/content/components/chart-compositions/chart-composition-09.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { Badge } from '@/components/Badge';
import { BarChart } from '@/components/BarChart';
import { Divider } from '@/components/Divider';

interface DataPoint {
  date: string;
  'GPU cluster': number;
  'Workspace usage': number;
}

type MonthData = DataPoint[];

const data: MonthData = [
  //array-start
  {
    date: 'Aug 01',
    'GPU cluster': 7100,
    'Workspace usage': 4434,
  },
  {
    date: 'Aug 02',
    'GPU cluster': 10943,
    'Workspace usage': 6954,
  },
  {
    date: 'Aug 03',
    'GPU cluster': 10889,
    'Workspace usage': 7100,
  },
  {
    date: 'Aug 04',
    'GPU cluster': 10909,
    'Workspace usage': 7909,
  },
  {
    date: 'Aug 05',
    'GPU cluster': 10778,
    'Workspace usage': 7103,
  },
  {
    date: 'Aug 06',
    'GPU cluster': 10900,
    'Workspace usage': 7534,
  },
  {
    date: 'Aug 07',
    'GPU cluster': 10129,
    'Workspace usage': 7412,
  },
  {
    date: 'Aug 08',
    'GPU cluster': 10021,
    'Workspace usage': 7834,
  },
  {
    date: 'Aug 09',
    'GPU cluster': 10279,
    'Workspace usage': 7159,
  },
  {
    date: 'Aug 10',
    'GPU cluster': 10224,
    'Workspace usage': 8260,
  },
  {
    date: 'Aug 11',
    'GPU cluster': 10380,
    'Workspace usage': 4965,
  },
  {
    date: 'Aug 12',
    'GPU cluster': 10414,
    'Workspace usage': 4989,
  },
  {
    date: 'Aug 13',
    'GPU cluster': 6540,
    'Workspace usage': 4839,
  },
  {
    date: 'Aug 14',
    'GPU cluster': 6634,
    'Workspace usage': 4343,
  },
  {
    date: 'Aug 15',
    'GPU cluster': 7124,
    'Workspace usage': 4903,
  },
  {
    date: 'Aug 16',
    'GPU cluster': 7934,
    'Workspace usage': 5273,
  },
  {
    date: 'Aug 17',
    'GPU cluster': 10287,
    'Workspace usage': 6900,
  },
  {
    date: 'Aug 18',
    'GPU cluster': 10323,
    'Workspace usage': 6732,
  },
  {
    date: 'Aug 19',
    'GPU cluster': 10511,
    'Workspace usage': 6523,
  },
  {
    date: 'Aug 20',
    'GPU cluster': 11043,
    'Workspace usage': 7422,
  },
  {
    date: 'Aug 21',
    'GPU cluster': 6700,
    'Workspace usage': 4334,
  },
  {
    date: 'Aug 22',
    'GPU cluster': 6900,
    'Workspace usage': 4943,
  },
  {
    date: 'Aug 23',
    'GPU cluster': 7934,
    'Workspace usage': 7812,
  },
  {
    date: 'Aug 24',
    'GPU cluster': 9021,
    'Workspace usage': 7729,
  },
  {
    date: 'Aug 25',
    'GPU cluster': 9198,
    'Workspace usage': 7178,
  },
  {
    date: 'Aug 26',
    'GPU cluster': 9557,
    'Workspace usage': 7158,
  },
  {
    date: 'Aug 27',
    'GPU cluster': 9959,
    'Workspace usage': 7100,
  },
  {
    date: 'Aug 28',
    'GPU cluster': 10034,
    'Workspace usage': 7934,
  },
  {
    date: 'Aug 29',
    'GPU cluster': 10243,
    'Workspace usage': 7223,
  },
  {
    date: 'Aug 30',
    'GPU cluster': 10078,
    'Workspace usage': 8779,
  },
  {
    date: 'Aug 31',
    'GPU cluster': 11134,
    'Workspace usage': 8190,
  },
  //array-end
];

const summary = [
  {
    name: 'Actual',
    value: '$8,110.15',
  },
  {
    name: 'Forecasted',
    value: '$10,230.25',
  },
  {
    name: 'Last invoice',
    value: 'Sept 20, 2024',
  },
];

const Button = ({
  onClick,
  disabled,
  children,
  position,
}: {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  position: 'left' | 'right';
}) => {
  return (
    <button
      type="button"
      className={cx(
        'group p-1.5 text-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent dark:ring-gray-800 hover:dark:bg-gray-900 disabled:hover:dark:bg-transparent',
        position === 'left'
          ? 'rounded-l-md'
          : position === 'right'
            ? '-ml-px rounded-r-md'
            : '',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="flex flex-col gap-x-6 gap-y-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">
            Enterprise
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
            User ID:{` `}
            <span className="font-medium text-gray-900 dark:text-gray-50">
              admin_dfQ7s
            </span>
          </p>
        </div>
        <div className="mt-4 flex items-center gap-4 gap-y-2 sm:mt-0 sm:gap-x-8">
          {summary.map((item, index) => (
            <React.Fragment key={item.name}>
              <div>
                <p className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                  {item.name}
                </p>
                {item.name === 'Last invoice' ? (
                  <a
                    className="mt-1 inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                    href="#"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-50">
                    {item.value}
                  </p>
                )}
              </div>
              <span className="flex">
                {index < summary.length - 1 && (
                  <span
                    className="h-10 w-px bg-slate-500/20"
                    aria-hidden="true"
                  />
                )}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Divider className="my-5" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge variant="success" className="!rounded-full">
            Active
          </Badge>
          <span
            className="h-6 w-px bg-gray-200 dark:bg-gray-800"
            aria-hidden="true"
          />
          <span className="text-sm text-gray-500 dark:text-gray-500">
            Started Aug 1, 2024 (billed on the 28th)
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-3 sm:w-fit sm:justify-start">
          <span className="block w-full text-sm font-medium tabular-nums text-gray-900 dark:text-gray-50">
            Aug 1 – 31, 2024
          </span>
          <span className="inline-flex items-center rounded-md shadow-sm">
            <Button position="left">
              <span className="sr-only">Previous</span>
              <RiArrowLeftSLine
                className="size-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50"
                aria-hidden={true}
              />
            </Button>
            <Button position="right">
              <span className="sr-only">Next</span>
              <RiArrowRightSLine
                className="size-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50"
                aria-hidden={true}
              />
            </Button>
          </span>
        </div>
      </div>

      <BarChart
        data={data}
        index="date"
        categories={['GPU cluster', 'Workspace usage']}
        type="stacked"
        valueFormatter={valueFormatter}
        showLegend={false}
        yAxisWidth={65}
        className="mt-10 hidden sm:block"
      />
      <BarChart
        data={data}
        index="date"
        categories={['GPU cluster', 'Workspace usage']}
        type="stacked"
        valueFormatter={valueFormatter}
        showLegend={false}
        showYAxis={false}
        className="mt-10 sm:hidden"
      />
    </div>
  );
}
```

### src/content/components/chart-compositions/chart-composition-10.tsx

```tsx
'use client';

import React from 'react';
import {
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from '@remixicon/react';

import { cx } from '@/lib/utils';

import { Badge } from '@/components/Badge';
import { BarChart } from '@/components/BarChart';
import { Divider } from '@/components/Divider';

interface DataPoint {
  date: string;
  'GPU cluster': number;
  'Workspace usage': number;
}

type MonthData = DataPoint[];

const data: MonthData = [
  //array-start
  {
    date: 'Aug 01',
    'GPU cluster': 7100,
    'Workspace usage': 4434,
  },
  {
    date: 'Aug 02',
    'GPU cluster': 10943,
    'Workspace usage': 6954,
  },
  {
    date: 'Aug 03',
    'GPU cluster': 10889,
    'Workspace usage': 7100,
  },
  {
    date: 'Aug 04',
    'GPU cluster': 10909,
    'Workspace usage': 7909,
  },
  {
    date: 'Aug 05',
    'GPU cluster': 10778,
    'Workspace usage': 7103,
  },
  {
    date: 'Aug 06',
    'GPU cluster': 10900,
    'Workspace usage': 7534,
  },
  {
    date: 'Aug 07',
    'GPU cluster': 10129,
    'Workspace usage': 7412,
  },
  {
    date: 'Aug 08',
    'GPU cluster': 10021,
    'Workspace usage': 7834,
  },
  {
    date: 'Aug 09',
    'GPU cluster': 10279,
    'Workspace usage': 7159,
  },
  {
    date: 'Aug 10',
    'GPU cluster': 10224,
    'Workspace usage': 8260,
  },
  {
    date: 'Aug 11',
    'GPU cluster': 10380,
    'Workspace usage': 4965,
  },
  {
    date: 'Aug 12',
    'GPU cluster': 10414,
    'Workspace usage': 4989,
  },
  {
    date: 'Aug 13',
    'GPU cluster': 6540,
    'Workspace usage': 4839,
  },
  {
    date: 'Aug 14',
    'GPU cluster': 6634,
    'Workspace usage': 4343,
  },
  {
    date: 'Aug 15',
    'GPU cluster': 7124,
    'Workspace usage': 4903,
  },
  {
    date: 'Aug 16',
    'GPU cluster': 7934,
    'Workspace usage': 5273,
  },
  {
    date: 'Aug 17',
    'GPU cluster': 10287,
    'Workspace usage': 6900,
  },
  {
    date: 'Aug 18',
    'GPU cluster': 10323,
    'Workspace usage': 6732,
  },
  {
    date: 'Aug 19',
    'GPU cluster': 10511,
    'Workspace usage': 6523,
  },
  {
    date: 'Aug 20',
    'GPU cluster': 11043,
    'Workspace usage': 7422,
  },
  {
    date: 'Aug 21',
    'GPU cluster': 6700,
    'Workspace usage': 4334,
  },
  {
    date: 'Aug 22',
    'GPU cluster': 6900,
    'Workspace usage': 4943,
  },
  {
    date: 'Aug 23',
    'GPU cluster': 7934,
    'Workspace usage': 7812,
  },
  {
    date: 'Aug 24',
    'GPU cluster': 9021,
    'Workspace usage': 7729,
  },
  {
    date: 'Aug 25',
    'GPU cluster': 9198,
    'Workspace usage': 7178,
  },
  {
    date: 'Aug 26',
    'GPU cluster': 9557,
    'Workspace usage': 7158,
  },
  {
    date: 'Aug 27',
    'GPU cluster': 9959,
    'Workspace usage': 7100,
  },
  {
    date: 'Aug 28',
    'GPU cluster': 10034,
    'Workspace usage': 7934,
  },
  {
    date: 'Aug 29',
    'GPU cluster': 10243,
    'Workspace usage': 7223,
  },
  {
    date: 'Aug 30',
    'GPU cluster': 10078,
    'Workspace usage': 8779,
  },
  {
    date: 'Aug 31',
    'GPU cluster': 11134,
    'Workspace usage': 8190,
  },
  //array-end
];

const summary = [
  {
    name: 'Actual',
    value: '$8,110.15',
  },
  {
    name: 'Forecasted',
    value: '$10,230.25',
  },
  {
    name: 'Last invoice',
    value: 'Sept 20, 2024',
  },
];

const Button = ({
  onClick,
  disabled,
  children,
  position,
}: {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  position: 'left' | 'right';
}) => {
  return (
    <button
      type="button"
      className={cx(
        'group p-1.5 text-sm text-gray-700 transition-all hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300 hover:dark:text-gray-50',
        position === 'left'
          ? 'rounded-l-md'
          : position === 'right'
            ? '-ml-px rounded-r-md'
            : '',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  const [showContent, setShowContent] = React.useState(true);

  return (
    <div className="obfuscate">
      <div className="flex flex-col gap-x-6 gap-y-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="mt-4 flex items-center gap-4 gap-y-2 sm:mt-0 sm:gap-x-8">
          {summary.map((item, index) => (
            <React.Fragment key={item.name}>
              <div>
                <p className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                  {item.name}
                </p>

                <p className="mt-1 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-50">
                  {item.value}
                </p>
              </div>
              <span className="flex">
                {index < summary.length - 1 && (
                  <span
                    className="h-10 w-px bg-slate-500/20"
                    aria-hidden="true"
                  />
                )}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Divider className="my-5" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge variant="success" className="!rounded-full">
            Active
          </Badge>
          <span
            className="h-6 w-px bg-gray-200 dark:bg-gray-800"
            aria-hidden="true"
          />
          <span className="text-sm text-gray-500 dark:text-gray-500">
            Started Aug 1, 2024 (billed on the 28th)
          </span>
        </div>
        <button
          className="hidden sm:inline-flex sm:items-center sm:space-x-1.5"
          onClick={() => setShowContent(!showContent)}
        >
          <RiArrowDownSLine
            className={cx(
              showContent ? 'rotate-180' : '',
              'size-5 transform text-blue-500 transition-transform dark:text-blue-500',
            )}
            aria-hidden={true}
          />
          <span className="text-sm font-medium text-blue-500 dark:text-blue-500">
            {showContent ? 'Hide details' : 'Show details'}
          </span>
        </button>
      </div>
      {showContent && (
        <div className="mt-5 rounded-md bg-gray-50 p-4 ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">
              Selected period
            </h4>
            <div className="inline-flex items-center gap-1 rounded-md">
              <Button position="left">
                <span className="sr-only">Previous</span>
                <RiArrowLeftSLine
                  className="size-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50"
                  aria-hidden={true}
                />
              </Button>
              <span className="block w-full whitespace-nowrap text-sm font-medium tabular-nums text-gray-900 dark:text-gray-50">
                Aug 1 – 31, 2024
              </span>
              <Button position="right">
                <span className="sr-only">Next</span>
                <RiArrowRightSLine
                  className="size-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50"
                  aria-hidden={true}
                />
              </Button>
            </div>
          </div>
          <BarChart
            data={data}
            index="date"
            categories={['GPU cluster', 'Workspace usage']}
            type="stacked"
            valueFormatter={valueFormatter}
            showLegend={false}
            yAxisWidth={65}
            className="mt-6 hidden sm:block"
          />
          <BarChart
            data={data}
            index="date"
            categories={['GPU cluster', 'Workspace usage']}
            type="stacked"
            valueFormatter={valueFormatter}
            showLegend={false}
            showYAxis={false}
            className="mt-6 sm:hidden"
          />
        </div>
      )}
    </div>
  );
}
```

### src/content/components/chart-compositions/chart-composition-11.tsx

```tsx
'use client';

// Install: @radix-ui/react-toggle-group
import React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import {
  RiPauseLargeLine,
  RiSendPlane2Line,
  RiSettings3Line,
  RiShieldLine,
} from '@remixicon/react';

import { cx, focusRing } from '@/lib/utils';

import { AreaChart } from '@/components/AreaChart';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { Label } from '@/components/Label';
import { SelectNative } from '@/components/SelectNative';

const data = [
  //array-start
  {
    date: '01:29am',
    'Name lookup': 710,
    Connection: 605,
    'TLS handshake': 300,
    'Data transfer': 200,
  },
  {
    date: '01:42am',
    'Name lookup': 794,
    Connection: 601,
    'TLS handshake': 310,
    'Data transfer': 220,
  },
  {
    date: '02:22am',
    'Name lookup': 1088,
    Connection: 592,
    'TLS handshake': 290,
    'Data transfer': 210,
  },
  {
    date: '03:34am',
    'Name lookup': 1209,
    Connection: 543,
    'TLS handshake': 250,
    'Data transfer': 130,
  },
  {
    date: '03:51am',
    'Name lookup': 3571,
    Connection: 2090,
    'TLS handshake': 1512,
    'Data transfer': 1054,
  },
  {
    date: '04:01am',
    'Name lookup': 1090,
    Connection: 890,
    'TLS handshake': 300,
    'Data transfer': 180,
  },
  {
    date: '04:23am',
    'Name lookup': 129,
    Connection: 605,
    'TLS handshake': 320,
    'Data transfer': 210,
  },
  {
    date: '04:41am',
    'Name lookup': 100,
    Connection: 210,
    'TLS handshake': 180,
    'Data transfer': 90,
  },
  {
    date: '04:47am',
    'Name lookup': 102,
    Connection: 392,
    'TLS handshake': 150,
    'Data transfer': 110,
  },
  {
    date: '05:01am',
    'Name lookup': 102,
    Connection: 432,
    'TLS handshake': 160,
    'Data transfer': 100,
  },
  {
    date: '05:08am',
    'Name lookup': 103,
    Connection: 423,
    'TLS handshake': 150,
    'Data transfer': 105,
  },
  {
    date: '05:18am',
    'Name lookup': 104,
    Connection: 530,
    'TLS handshake': 180,
    'Data transfer': 140,
  },
  {
    date: '06:03am',
    'Name lookup': 354,
    Connection: 484,
    'TLS handshake': 270,
    'Data transfer': 150,
  },
  {
    date: '07:09am',
    'Name lookup': 463,
    Connection: 631,
    'TLS handshake': 310,
    'Data transfer': 220,
  },
  {
    date: '07:09am',
    'Name lookup': 412,
    Connection: 541,
    'TLS handshake': 290,
    'Data transfer': 200,
  },
  {
    date: '08:21am',
    'Name lookup': 693,
    Connection: 873,
    'TLS handshake': 400,
    'Data transfer': 300,
  },
  {
    date: '08:39am',
    'Name lookup': 192,
    Connection: 294,
    'TLS handshake': 160,
    'Data transfer': 90,
  },
  {
    date: '09:03am',
    'Name lookup': 293,
    Connection: 912,
    'TLS handshake': 340,
    'Data transfer': 250,
  },
  {
    date: '09:19am',
    'Name lookup': 105,
    Connection: 430,
    'TLS handshake': 170,
    'Data transfer': 120,
  },
  {
    date: '10:22am',
    'Name lookup': 110,
    Connection: 731,
    'TLS handshake': 280,
    'Data transfer': 190,
  },
  {
    date: '10:29am',
    'Name lookup': 670,
    Connection: 539,
    'TLS handshake': 290,
    'Data transfer': 210,
  },
  {
    date: '10:34am',
    'Name lookup': 690,
    Connection: 605,
    'TLS handshake': 300,
    'Data transfer': 220,
  },
  {
    date: '10:36am',
    'Name lookup': 793,
    Connection: 1023,
    'TLS handshake': 410,
    'Data transfer': 320,
  },
  {
    date: '11:46am',
    'Name lookup': 902,
    Connection: 605,
    'TLS handshake': 320,
    'Data transfer': 240,
  },
  {
    date: '11:49am',
    'Name lookup': 919,
    Connection: 392,
    'TLS handshake': 270,
    'Data transfer': 180,
  },
  {
    date: '11:50am',
    'Name lookup': 955,
    Connection: 539,
    'TLS handshake': 300,
    'Data transfer': 210,
  },
  {
    date: '11:55am',
    'Name lookup': 995,
    Connection: 293,
    'TLS handshake': 160,
    'Data transfer': 120,
  },
  {
    date: '12:05pm',
    'Name lookup': 872,
    Connection: 520,
    'TLS handshake': 290,
    'Data transfer': 230,
  },
  {
    date: '12:19pm',
    'Name lookup': 101,
    Connection: 418,
    'TLS handshake': 190,
    'Data transfer': 160,
  },
  {
    date: '12:21pm',
    'Name lookup': 657,
    Connection: 912,
    'TLS handshake': 340,
    'Data transfer': 270,
  },
  {
    date: '12:31pm',
    'Name lookup': 732,
    Connection: 640,
    'TLS handshake': 300,
    'Data transfer': 200,
  },
  {
    date: '12:41pm',
    'Name lookup': 895,
    Connection: 509,
    'TLS handshake': 280,
    'Data transfer': 210,
  },
  {
    date: '01:13pm',
    'Name lookup': 993,
    Connection: 701,
    'TLS handshake': 320,
    'Data transfer': 250,
  },
  {
    date: '01:34pm',
    'Name lookup': 1189,
    Connection: 760,
    'TLS handshake': 390,
    'Data transfer': 290,
  },
  {
    date: '01:56pm',
    'Name lookup': 1390,
    Connection: 831,
    'TLS handshake': 420,
    'Data transfer': 320,
  },
  {
    date: '02:12pm',
    'Name lookup': 1375,
    Connection: 713,
    'TLS handshake': 410,
    'Data transfer': 310,
  },
  {
    date: '02:33pm',
    'Name lookup': 960,
    Connection: 481,
    'TLS handshake': 270,
    'Data transfer': 230,
  },
  {
    date: '02:56pm',
    'Name lookup': 1120,
    Connection: 510,
    'TLS handshake': 290,
    'Data transfer': 240,
  },
  {
    date: '03:14pm',
    'Name lookup': 1210,
    Connection: 654,
    'TLS handshake': 350,
    'Data transfer': 260,
  },
  {
    date: '03:31pm',
    'Name lookup': 1185,
    Connection: 700,
    'TLS handshake': 360,
    'Data transfer': 280,
  },
  {
    date: '03:55pm',
    'Name lookup': 1290,
    Connection: 820,
    'TLS handshake': 400,
    'Data transfer': 300,
  },
  //array-end
];

const summary = [
  {
    name: 'Currently up for',
    value: '10 months 12 days',
  },
  {
    name: 'Last checked at',
    value: '2 minutes ago',
  },
  {
    name: 'Incidents',
    value: '0',
  },
];

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cx(
      'inline-flex h-[38px] divide-x divide-gray-300 rounded-md border border-gray-300 bg-white shadow-sm dark:divide-gray-800 dark:border-gray-800 sm:h-[34px]',
      className,
    )}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Root>
));

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cx(
        'flex items-center justify-center border-gray-300 bg-gray-100 px-2.5 py-1 text-base text-gray-700 transition-colors first:rounded-l-[5px] last:rounded-r-[5px] hover:bg-gray-50 focus:z-10 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-900 sm:text-sm',
        'data-[state=on]:text-semibold data-[state=on]:bg-white data-[state=on]:text-gray-950 dark:data-[state=on]:bg-gray-800 dark:data-[state=on]:text-gray-50',
        focusRing,
        // disabled
        'disabled:pointer-events-none disabled:text-gray-400 dark:disabled:text-gray-600',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

const valueFormatter = (milliseconds: number) => {
  if (milliseconds < 1000) {
    return `${milliseconds}ms`;
  } else {
    const seconds = (milliseconds / 1000).toFixed(1);
    return `${seconds}s`;
  }
};

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="flex items-center gap-3">
        <span
          className="shrink-0 animate-pulse rounded-full bg-emerald-600/30 p-1"
          aria-hidden={true}
        >
          <span className="block size-2 rounded-full bg-emerald-600 dark:bg-emerald-600" />
        </span>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
          tremor.so
        </h1>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          Up
        </span>
        <span className="size-1 shrink-0 rounded-full bg-gray-500" />
        <span className="text-sm text-gray-500 dark:text-gray-500">
          Checking every 3 minutes
        </span>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-1">
        <Button
          variant="ghost"
          className="!text-gray-500 dark:!text-gray-500"
          asChild
        >
          <a href="#" className="flex items-center gap-2">
            <RiSendPlane2Line className="size-5 shrink-0" aria-hidden="true" />
            Send test alert
          </a>
        </Button>
        <Button
          variant="ghost"
          disabled={true}
          className="!text-gray-500 dark:!text-gray-500"
        >
          <a href="#" className="flex items-center gap-2">
            <RiShieldLine className="size-5 shrink-0" aria-hidden="true" />
            Incidents
          </a>
        </Button>
        <Button
          variant="ghost"
          className="!text-gray-500 dark:!text-gray-500"
          asChild
        >
          <a href="#" className="flex items-center gap-2">
            <RiPauseLargeLine className="size-5 shrink-0" aria-hidden="true" />
            Pause
          </a>
        </Button>
        <Button
          variant="ghost"
          className="!text-gray-500 dark:!text-gray-500"
          asChild
        >
          <a href="#" className="flex items-center gap-2">
            <RiSettings3Line className="size-5 shrink-0" aria-hidden="true" />
            Configure
          </a>
        </Button>
      </div>
      <dl className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {summary.map((item) => (
          <Card key={item.value}>
            <dt className="text-sm text-gray-500 dark:text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
              {item.value}
            </dd>
          </Card>
        ))}
      </dl>
      <Card className="mt-6 !p-0">
        <div className="px-6 py-3">
          <h1 className="text-base font-medium text-gray-900 dark:text-gray-50">
            Response times
          </h1>
        </div>
        <Divider className="!my-0 [&>div]:dark:!bg-gray-900" />
        <div className="rounded-b-lg px-6 pb-6 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Label htmlFor="region" className="sr-only">
                Select region
              </Label>
              <SelectNative
                name="region"
                id="region"
                defaultValue="europe"
                className="!w-full !py-1.5 sm:!w-fit"
              >
                <option value="north-america">North America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="australia">Australia</option>
              </SelectNative>
            </div>
            <ToggleGroup
              type="single"
              defaultValue="day"
              aria-label="Time period selection"
              className="w-full sm:w-fit"
            >
              <ToggleGroupItem className="w-full" value="day" aria-label="Day">
                Day
              </ToggleGroupItem>
              <ToggleGroupItem
                className="w-full"
                value="week"
                aria-label="Week"
              >
                Week
              </ToggleGroupItem>
              <ToggleGroupItem
                className="w-full"
                value="month"
                aria-label="Month"
              >
                Month
              </ToggleGroupItem>
              <ToggleGroupItem
                disabled
                className="w-full"
                value="year"
                aria-label="Year"
              >
                Year
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <AreaChart
            data={data}
            index="date"
            categories={[
              'Name lookup',
              'Connection',
              'TLS handshake',
              'Data transfer',
            ]}
            colors={['purple', 'blue', 'cyan', 'emerald']}
            fill="solid"
            valueFormatter={valueFormatter}
            onValueChange={() => {}}
            yAxisWidth={45}
            maxValue={4000}
            tickGap={15}
            className="mt-6 hidden sm:block"
          />
          <AreaChart
            data={data}
            index="date"
            categories={[
              'Name lookup',
              'Connection',
              'TLS handshake',
              'Data transfer',
            ]}
            colors={['purple', 'blue', 'cyan', 'emerald']}
            fill="solid"
            valueFormatter={valueFormatter}
            onValueChange={() => {}}
            showYAxis={false}
            tickGap={15}
            startEndOnly={true}
            className="mt-6 sm:hidden"
          />
        </div>
      </Card>
    </div>
  );
}
```

### src/content/components/chart-compositions/chart-composition-12.tsx

```tsx
'use client';

import { RiInformationFill } from '@remixicon/react';

import { AreaChart } from '@/components/AreaChart';
import { Card } from '@/components/Card';
import { SelectNative } from '@/components/SelectNative';
import { Tooltip } from '@/components/Tooltip';

const data = [
  //array-start
  {
    date: 'Day 1',
    'Avg. response time': 6.5,
    'Total incident length': 31,
    MTTR: 45,
    MTTA: 50,
  },
  {
    date: 'Day 2',
    'Avg. response time': 7,
    'Total incident length': 45,
    MTTR: 58,
    MTTA: 65,
  },
  {
    date: 'Day 3',
    'Avg. response time': 9,
    'Total incident length': 53,
    MTTR: 65,
    MTTA: 73,
  },
  {
    date: 'Day 4',
    'Avg. response time': 12,
    'Total incident length': 130,
    MTTR: 100,
    MTTA: 90,
  },
  {
    date: 'Day 5',
    'Avg. response time': 22,
    'Total incident length': 105,
    MTTR: 95,
    MTTA: 88,
  },
  {
    date: 'Day 6',
    'Avg. response time': 14,
    'Total incident length': 145,
    MTTR: 120,
    MTTA: 100,
  },
  {
    date: 'Day 7',
    'Avg. response time': 35,
    'Total incident length': 120,
    MTTR: 110,
    MTTA: 85,
  },
  {
    date: 'Day 8',
    'Avg. response time': 11,
    'Total incident length': 140,
    MTTR: 125,
    MTTA: 98,
  },
  {
    date: 'Day 9',
    'Avg. response time': 10,
    'Total incident length': 115,
    MTTR: 98,
    MTTA: 88,
  },
  {
    date: 'Day 10',
    'Avg. response time': 13,
    'Total incident length': 150,
    MTTR: 118,
    MTTA: 110,
  },
  {
    date: 'Day 11',
    'Avg. response time': 13,
    'Total incident length': 140,
    MTTR: 123,
    MTTA: 100,
  },
  {
    date: 'Day 12',
    'Avg. response time': 11,
    'Total incident length': 135,
    MTTR: 110,
    MTTA: 98,
  },
  {
    date: 'Day 13',
    'Avg. response time': 15,
    'Total incident length': 170,
    MTTR: 130,
    MTTA: 115,
  },
  {
    date: 'Day 14',
    'Avg. response time': 12,
    'Total incident length': 135,
    MTTR: 115,
    MTTA: 105,
  },
  {
    date: 'Day 15',
    'Avg. response time': 10.5,
    'Total incident length': 130,
    MTTR: 110,
    MTTA: 95,
  },
  {
    date: 'Day 16',
    'Avg. response time': 45,
    'Total incident length': 165,
    MTTR: 125,
    MTTA: 115,
  },
  {
    date: 'Day 17',
    'Avg. response time': 35,
    'Total incident length': 150,
    MTTR: 120,
    MTTA: 100,
  },
  {
    date: 'Day 18',
    'Avg. response time': 10,
    'Total incident length': 140,
    MTTR: 112,
    MTTA: 105,
  },
  {
    date: 'Day 19',
    'Avg. response time': 25,
    'Total incident length': 135,
    MTTR: 115,
    MTTA: 110,
  },
  {
    date: 'Day 20',
    'Avg. response time': 55,
    'Total incident length': 160,
    MTTR: 140,
    MTTA: 125,
  },
  {
    date: 'Day 21',
    'Avg. response time': 61,
    'Total incident length': 180,
    MTTR: 150,
    MTTA: 130,
  },
  {
    date: 'Day 22',
    'Avg. response time': 45,
    'Total incident length': 155,
    MTTR: 135,
    MTTA: 120,
  },
  {
    date: 'Day 23',
    'Avg. response time': 50,
    'Total incident length': 170,
    MTTR: 140,
    MTTA: 125,
  },
  {
    date: 'Day 24',
    'Avg. response time': 15,
    'Total incident length': 140,
    MTTR: 118,
    MTTA: 105,
  },
  {
    date: 'Day 25',
    'Avg. response time': 40,
    'Total incident length': 160,
    MTTR: 130,
    MTTA: 120,
  },
  //array-end
];

const stats = [
  //array-start
  {
    name: 'Avg. response time',
    description: 'Speed at which the server can respond',
    value: '34s',
  },
  {
    name: 'Total incident length',
    description:
      'Total duration from when an incident starts to when it is fully resolved',
    value: '1min 31s',
  },
  {
    name: 'MTTA',
    description:
      "Avg. time it takes to acknowledge or respond to an incident after it's been detected",
    value: '3min 29s',
  },
  {
    name: 'MTTR',
    description:
      'Avg. time it takes to resolve an issue after it has been reported',
    value: '5min 21s',
  },
  //array-end
];

const selectOptions = [
  //array-start
  {
    id: 'region',
    label: 'Region',
    defaultValue: 'europe',
    width: '32',
    options: [
      { value: 'north-america', label: 'North America' },
      { value: 'europe', label: 'Europe' },
      { value: 'asia', label: 'Asia' },
      { value: 'australia', label: 'Australia' },
    ],
  },
  {
    id: 'integration',
    label: 'Integrations',
    defaultValue: 'all',
    width: '28',
    options: [
      { value: 'all', label: 'All' },
      { value: 'azure-monitor', label: 'Azure Monitor' },
      { value: 'splunk', label: 'Splunk' },
      { value: 'dynatrace', label: 'Dynatrace' },
    ],
  },
  {
    id: 'acknowledger',
    label: 'Acknowledged by',
    defaultValue: 'emily-smith',
    width: '40',
    options: [
      { value: 'all', label: 'All' },
      { value: 'emily-smith', label: 'Emily Smith' },
      { value: 'mike-kingstone', label: 'Mike Kingstone' },
      { value: 'simon-dumentis', label: 'Simon Dumentis' },
    ],
  },
  {
    id: 'escalator',
    label: 'Resolved by',
    width: '40',
    options: [
      { value: 'michael-bridge', label: 'Michael Bridge' },
      { value: 'emma-stone', label: 'Emma Stone' },
      { value: 'max-mcbeccel', label: 'Max McBeccel' },
      { value: 'lena-goldriver', label: 'Lena Goldriver' },
    ],
  },
  {
    id: 'escalation-policy',
    label: 'Escalation policy',
    defaultValue: 'hierarchical',
    width: '32',
    options: [
      { value: 'all', label: 'All' },
      { value: 'hierarchical', label: 'Hierarchical Escalation' },
      { value: 'functional', label: 'Functional Escalation' },
      { value: 'time-based', label: 'Time-based Escalation' },
    ],
  },
  {
    id: 'cause',
    label: 'Cause',
    defaultValue: '404-not-found',
    width: '40',
    options: [
      { value: 'all', label: 'All' },
      { value: '502-bad-gateway', label: '502 Bad Gateway' },
      { value: '404-not-found', label: '404 Not Found' },
      { value: '400-bad-request', label: '400 Bad Request' },
    ],
  },
  //array-end
];

const valueFormatter = (seconds: number) => {
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  } else {
    const minutes = (seconds / 60).toFixed(1);
    return `${minutes}min`;
  }
};

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
        Overview
      </h1>
      <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
        Get insights into your incidents
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        {selectOptions.map(({ id, label, defaultValue, width, options }) => (
          <span key={id} className="inline-flex items-center shadow-sm">
            <label
              htmlFor={id}
              className="flex h-[38px] select-none items-center whitespace-nowrap rounded-l-md border border-gray-300 bg-gray-50 px-2.5 text-base text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-50 sm:h-[34px] sm:text-sm"
            >
              {label}
            </label>
            <SelectNative
              name={id}
              id={id}
              defaultValue={defaultValue}
              className={`-ml-px !w-${width} rounded-none rounded-r-md !py-1.5 !shadow-none`}
            >
              {options.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectNative>
          </span>
        ))}
      </div>
      <Card className="mt-6 overflow-hidden !p-0">
        <div className="p-6">
          <AreaChart
            data={data}
            index="date"
            categories={[
              'Avg. response time',
              'Total incident length',
              'MTTR',
              'MTTA',
            ]}
            colors={['purple', 'blue', 'cyan', 'emerald']}
            fill="solid"
            valueFormatter={valueFormatter}
            onValueChange={() => {}}
            yAxisWidth={55}
            maxValue={400}
            tickGap={15}
            className="hidden sm:block"
          />
          <AreaChart
            data={data}
            index="date"
            categories={[
              'Avg. response time',
              'Total incident length',
              'MTTR',
              'MTTA',
            ]}
            colors={['purple', 'blue', 'cyan', 'emerald']}
            fill="solid"
            valueFormatter={valueFormatter}
            onValueChange={() => {}}
            showYAxis={false}
            tickGap={15}
            className="sm:hidden"
          />
        </div>
        <dl className="mx-auto grid grid-cols-1 gap-px border-t border-gray-200 bg-gray-200 dark:border-gray-900 dark:bg-gray-900 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="xl:px-8 bg-white px-4 py-6 dark:bg-[#090E1A] sm:px-6"
            >
              <dd className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
                {item.value}
              </dd>
              <dt className="mt-1 flex items-center gap-2">
                <span className="text-sm/6 text-gray-500 sm:text-gray-500">
                  {item.name}
                </span>
                <Tooltip content={item.description}>
                  <RiInformationFill
                    className="size-4 shrink-0 text-gray-400 dark:text-gray-600"
                    aria-hidden="true"
                  />
                </Tooltip>
              </dt>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  );
}
```

### src/content/components/chart-compositions/chart-composition-13.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { AreaChart } from '@/components/AreaChart';
import { Card } from '@/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const data = [
  //array-start
  {
    date: 'Day 1',
    'Avg. response time': 6.5,
    'Total incident length': 31,
    MTTR: 45,
    MTTA: 50,
  },
  {
    date: 'Day 2',
    'Avg. response time': 7,
    'Total incident length': 45,
    MTTR: 58,
    MTTA: 65,
  },
  {
    date: 'Day 3',
    'Avg. response time': 9,
    'Total incident length': 53,
    MTTR: 65,
    MTTA: 73,
  },
  {
    date: 'Day 4',
    'Avg. response time': 12,
    'Total incident length': 130,
    MTTR: 100,
    MTTA: 90,
  },
  {
    date: 'Day 5',
    'Avg. response time': 22,
    'Total incident length': 105,
    MTTR: 95,
    MTTA: 88,
  },
  {
    date: 'Day 6',
    'Avg. response time': 14,
    'Total incident length': 145,
    MTTR: 120,
    MTTA: 100,
  },
  {
    date: 'Day 7',
    'Avg. response time': 35,
    'Total incident length': 120,
    MTTR: 110,
    MTTA: 85,
  },
  {
    date: 'Day 8',
    'Avg. response time': 11,
    'Total incident length': 140,
    MTTR: 125,
    MTTA: 98,
  },
  {
    date: 'Day 9',
    'Avg. response time': 10,
    'Total incident length': 115,
    MTTR: 98,
    MTTA: 88,
  },
  {
    date: 'Day 10',
    'Avg. response time': 13,
    'Total incident length': 150,
    MTTR: 118,
    MTTA: 110,
  },
  {
    date: 'Day 11',
    'Avg. response time': 13,
    'Total incident length': 140,
    MTTR: 123,
    MTTA: 100,
  },
  {
    date: 'Day 12',
    'Avg. response time': 11,
    'Total incident length': 135,
    MTTR: 110,
    MTTA: 98,
  },
  {
    date: 'Day 13',
    'Avg. response time': 15,
    'Total incident length': 170,
    MTTR: 130,
    MTTA: 115,
  },
  {
    date: 'Day 14',
    'Avg. response time': 12,
    'Total incident length': 135,
    MTTR: 115,
    MTTA: 105,
  },
  {
    date: 'Day 15',
    'Avg. response time': 10.5,
    'Total incident length': 130,
    MTTR: 110,
    MTTA: 95,
  },
  {
    date: 'Day 16',
    'Avg. response time': 45,
    'Total incident length': 165,
    MTTR: 125,
    MTTA: 115,
  },
  {
    date: 'Day 17',
    'Avg. response time': 35,
    'Total incident length': 150,
    MTTR: 120,
    MTTA: 100,
  },
  {
    date: 'Day 18',
    'Avg. response time': 10,
    'Total incident length': 140,
    MTTR: 112,
    MTTA: 105,
  },
  {
    date: 'Day 19',
    'Avg. response time': 25,
    'Total incident length': 135,
    MTTR: 115,
    MTTA: 110,
  },
  {
    date: 'Day 20',
    'Avg. response time': 55,
    'Total incident length': 160,
    MTTR: 140,
    MTTA: 125,
  },
  {
    date: 'Day 21',
    'Avg. response time': 61,
    'Total incident length': 180,
    MTTR: 150,
    MTTA: 130,
  },
  {
    date: 'Day 22',
    'Avg. response time': 45,
    'Total incident length': 155,
    MTTR: 135,
    MTTA: 120,
  },
  {
    date: 'Day 23',
    'Avg. response time': 50,
    'Total incident length': 170,
    MTTR: 140,
    MTTA: 125,
  },
  {
    date: 'Day 24',
    'Avg. response time': 15,
    'Total incident length': 140,
    MTTR: 118,
    MTTA: 105,
  },
  {
    date: 'Day 25',
    'Avg. response time': 40,
    'Total incident length': 160,
    MTTR: 130,
    MTTA: 120,
  },
  //array-end
];

const stats = [
  //array-start
  {
    name: 'Avg. response time',
    value: '34s',
    active: true,
  },
  {
    name: 'Total incident length',
    value: '1min 31s',
    active: false,
  },
  {
    name: 'MTTA',
    value: '3min 29s',
    active: false,
  },
  {
    name: 'MTTR',
    value: '5min 21s',
    active: false,
  },
  //array-end
];

const valueFormatter = (seconds: number) => {
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  } else {
    const minutes = (seconds / 60).toFixed(1);
    return `${minutes}min`;
  }
};

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
        Reporting
      </h1>
      <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
        Get insights with our advanced AI-powered analytics.
      </p>
      <Card className="mt-6 overflow-hidden !p-0">
        <Tabs defaultValue={stats[0].name}>
          <TabsList className="grid grid-cols-1 !gap-px !bg-gray-200 dark:!bg-gray-900 sm:!grid-cols-2 lg:!grid-cols-4">
            {stats.map((item) => (
              <TabsTrigger
                key={item.name}
                value={item.name}
                className="xl:!px-8 group flex !w-full !items-center !justify-start gap-4 !border-b !border-gray-200 !bg-white !px-4 !py-3 !text-left hover:!border-gray-200 data-[state=active]:!border-gray-200 dark:!border-gray-900 dark:!bg-[#090E1A] hover:dark:!border-gray-900 data-[state=active]:dark:!border-gray-900 sm:!px-6 sm:!py-6"
              >
                <span
                  className={cx(
                    'group-data-[state=active]:block group-data-[state=inactive]:hidden',
                    'h-14 w-[3px] rounded-full bg-blue-500 dark:bg-blue-500',
                  )}
                  aria-hidden="true"
                />
                <div className="group-data-[state=inactive]:pl-[19px]">
                  <dd
                    className={cx(
                      'group-data-[state=active]:text-gray-900 group-data-[state=active]:dark:text-gray-50',
                      'text-2xl font-semibold tracking-tight text-gray-500 transition-all group-hover:text-gray-900 dark:text-gray-500 group-hover:dark:text-gray-50',
                    )}
                  >
                    {item.value}
                  </dd>
                  <dt className="mt-1 flex items-center gap-2">
                    <span
                      className={cx(
                        'group-data-[state=active]:text-gray-500 group-data-[state=active]:dark:text-gray-500',
                        'text-sm/6 font-normal text-gray-400 transition-all group-hover:text-gray-500 dark:text-gray-600 group-hover:dark:text-gray-500',
                      )}
                    >
                      {item.name}
                    </span>
                  </dt>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="p-6">
            {stats.map((item) => (
              <TabsContent key={item.name} value={item.name}>
                <AreaChart
                  data={data}
                  index="date"
                  categories={[item.name]}
                  colors={['blue']}
                  fill="solid"
                  valueFormatter={valueFormatter}
                  onValueChange={() => {}}
                  yAxisWidth={55}
                  maxValue={400}
                  tickGap={15}
                  className="hidden sm:block"
                />
                <AreaChart
                  data={data}
                  index="date"
                  categories={[item.name]}
                  colors={['blue']}
                  fill="solid"
                  valueFormatter={valueFormatter}
                  onValueChange={() => {}}
                  showYAxis={false}
                  tickGap={15}
                  className="sm:hidden"
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
```

### src/content/components/chart-compositions/chart-composition-14.tsx

```tsx
'use client';

import { RiMoreLine } from '@remixicon/react';

import { AreaChart } from '@/components/AreaChart';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CategoryBar } from '@/components/CategoryBar';
import { Divider } from '@/components/Divider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu';

// used custom gray in installChartUtils.ts for <CategoryBar />

// lightGray: {
//   bg: 'bg-gray-300 dark:bg-gray-700',
//   stroke: 'stroke-gray-300 dark:stroke-gray-700',
//   fill: 'fill-gray-300 dark:fill-gray-700',
//   text: 'text-gray-300 dark:text-gray-700',
// },

const data = [
  //array-start
  {
    date: '01:29am',
    'Name lookup': 710,
    Connection: 605,
    'TLS handshake': 300,
    'Data transfer': 200,
  },
  {
    date: '01:42am',
    'Name lookup': 794,
    Connection: 601,
    'TLS handshake': 310,
    'Data transfer': 220,
  },
  {
    date: '02:22am',
    'Name lookup': 1088,
    Connection: 592,
    'TLS handshake': 290,
    'Data transfer': 210,
  },
  {
    date: '03:34am',
    'Name lookup': 1209,
    Connection: 543,
    'TLS handshake': 250,
    'Data transfer': 130,
  },
  {
    date: '03:51am',
    'Name lookup': 3571,
    Connection: 2090,
    'TLS handshake': 1512,
    'Data transfer': 1054,
  },
  {
    date: '04:01am',
    'Name lookup': 1090,
    Connection: 890,
    'TLS handshake': 300,
    'Data transfer': 180,
  },
  {
    date: '04:23am',
    'Name lookup': 129,
    Connection: 605,
    'TLS handshake': 320,
    'Data transfer': 210,
  },
  {
    date: '04:41am',
    'Name lookup': 100,
    Connection: 210,
    'TLS handshake': 180,
    'Data transfer': 90,
  },
  {
    date: '04:47am',
    'Name lookup': 102,
    Connection: 392,
    'TLS handshake': 150,
    'Data transfer': 110,
  },
  {
    date: '05:01am',
    'Name lookup': 102,
    Connection: 432,
    'TLS handshake': 160,
    'Data transfer': 100,
  },
  {
    date: '05:08am',
    'Name lookup': 103,
    Connection: 423,
    'TLS handshake': 150,
    'Data transfer': 105,
  },
  {
    date: '05:18am',
    'Name lookup': 104,
    Connection: 530,
    'TLS handshake': 180,
    'Data transfer': 140,
  },
  {
    date: '06:03am',
    'Name lookup': 354,
    Connection: 484,
    'TLS handshake': 270,
    'Data transfer': 150,
  },
  {
    date: '07:09am',
    'Name lookup': 463,
    Connection: 631,
    'TLS handshake': 310,
    'Data transfer': 220,
  },
  {
    date: '07:09am',
    'Name lookup': 412,
    Connection: 541,
    'TLS handshake': 290,
    'Data transfer': 200,
  },
  {
    date: '08:21am',
    'Name lookup': 693,
    Connection: 873,
    'TLS handshake': 400,
    'Data transfer': 300,
  },
  {
    date: '08:39am',
    'Name lookup': 192,
    Connection: 294,
    'TLS handshake': 160,
    'Data transfer': 90,
  },
  {
    date: '09:03am',
    'Name lookup': 293,
    Connection: 912,
    'TLS handshake': 340,
    'Data transfer': 250,
  },
  {
    date: '09:19am',
    'Name lookup': 105,
    Connection: 430,
    'TLS handshake': 170,
    'Data transfer': 120,
  },
  {
    date: '10:22am',
    'Name lookup': 110,
    Connection: 731,
    'TLS handshake': 280,
    'Data transfer': 190,
  },
  {
    date: '10:29am',
    'Name lookup': 670,
    Connection: 539,
    'TLS handshake': 290,
    'Data transfer': 210,
  },
  {
    date: '10:34am',
    'Name lookup': 690,
    Connection: 605,
    'TLS handshake': 300,
    'Data transfer': 220,
  },
  {
    date: '10:36am',
    'Name lookup': 793,
    Connection: 1023,
    'TLS handshake': 410,
    'Data transfer': 320,
  },
  {
    date: '11:46am',
    'Name lookup': 902,
    Connection: 605,
    'TLS handshake': 320,
    'Data transfer': 240,
  },
  {
    date: '11:49am',
    'Name lookup': 919,
    Connection: 392,
    'TLS handshake': 270,
    'Data transfer': 180,
  },
  {
    date: '11:50am',
    'Name lookup': 955,
    Connection: 539,
    'TLS handshake': 300,
    'Data transfer': 210,
  },
  {
    date: '11:55am',
    'Name lookup': 995,
    Connection: 293,
    'TLS handshake': 160,
    'Data transfer': 120,
  },
  {
    date: '12:05pm',
    'Name lookup': 872,
    Connection: 520,
    'TLS handshake': 290,
    'Data transfer': 230,
  },
  {
    date: '12:19pm',
    'Name lookup': 101,
    Connection: 418,
    'TLS handshake': 190,
    'Data transfer': 160,
  },
  {
    date: '12:21pm',
    'Name lookup': 657,
    Connection: 912,
    'TLS handshake': 340,
    'Data transfer': 270,
  },
  {
    date: '12:31pm',
    'Name lookup': 732,
    Connection: 640,
    'TLS handshake': 300,
    'Data transfer': 200,
  },
  {
    date: '12:41pm',
    'Name lookup': 895,
    Connection: 509,
    'TLS handshake': 280,
    'Data transfer': 210,
  },
  {
    date: '01:13pm',
    'Name lookup': 993,
    Connection: 701,
    'TLS handshake': 320,
    'Data transfer': 250,
  },
  {
    date: '01:34pm',
    'Name lookup': 1189,
    Connection: 760,
    'TLS handshake': 390,
    'Data transfer': 290,
  },
  {
    date: '01:56pm',
    'Name lookup': 1390,
    Connection: 831,
    'TLS handshake': 420,
    'Data transfer': 320,
  },
  {
    date: '02:12pm',
    'Name lookup': 1375,
    Connection: 713,
    'TLS handshake': 410,
    'Data transfer': 310,
  },
  {
    date: '02:33pm',
    'Name lookup': 960,
    Connection: 481,
    'TLS handshake': 270,
    'Data transfer': 230,
  },
  {
    date: '02:56pm',
    'Name lookup': 1120,
    Connection: 510,
    'TLS handshake': 290,
    'Data transfer': 240,
  },
  {
    date: '03:14pm',
    'Name lookup': 1210,
    Connection: 654,
    'TLS handshake': 350,
    'Data transfer': 260,
  },
  {
    date: '03:31pm',
    'Name lookup': 1185,
    Connection: 700,
    'TLS handshake': 360,
    'Data transfer': 280,
  },
  {
    date: '03:55pm',
    'Name lookup': 1290,
    Connection: 820,
    'TLS handshake': 400,
    'Data transfer': 300,
  },
  //array-end
];

const valueFormatter = (seconds: number) => {
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  } else {
    const minutes = (seconds / 60).toFixed(1);
    return `${minutes}min`;
  }
};

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
        Reporting
      </h1>
      <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
        Get insights with our advanced AI-powered analytics.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card className="mt-6 overflow-hidden !p-0">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-900 dark:bg-gray-900">
            <h1 className="text-sm font-medium text-gray-900 dark:text-gray-50">
              Uptime summary
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="!p-1">
                  <RiMoreLine
                    className="size-5 shrink-0 text-gray-900 dark:text-gray-50"
                    aria-hidden="true"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="!w-36">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Refresh</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 dark:text-red-500">
                  Delete widget
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="p-4">
            <p className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
              90.1%
            </p>
            <p className="text-sm/6 text-gray-500 dark:text-gray-500">
              Avg. uptime in the last month
            </p>
            <CategoryBar
              values={[90.1, 8.2, 1.9]}
              colors={['blue', 'red', 'lightGray']}
              showLabels={false}
              className="mt-6"
            />
            <ul role="list" className="mt-6 space-y-3">
              <li className="flex w-full items-center justify-between gap-2">
                <div className="flex w-full items-center gap-2 truncate">
                  <span
                    className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
                    aria-hidden="true"
                  />
                  <span className="truncate whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                    Days with 99% uptime
                  </span>
                </div>
                <span className="whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-50">
                  90.1% (225)
                </span>
              </li>
              <li className="flex w-full items-center justify-between gap-2">
                <div className="flex w-full items-center gap-2 truncate">
                  <span
                    className="size-2.5 shrink-0 rounded-sm bg-red-500 dark:bg-red-500"
                    aria-hidden="true"
                  />
                  <span className="truncate whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                    Days with 1% downtime
                  </span>
                </div>
                <span className="whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-50">
                  8% (20)
                </span>
              </li>
              <li className="flex w-full items-center justify-between gap-2">
                <div className="flex w-full items-center gap-2 truncate">
                  <span
                    className="size-2.5 shrink-0 rounded-sm bg-gray-400 dark:bg-gray-600"
                    aria-hidden="true"
                  />
                  <span className="truncate whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                    Days with 1% downtime
                  </span>
                </div>
                <span className="whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-50">
                  1.9% (5)
                </span>
              </li>
            </ul>
          </div>
        </Card>
        <Card className="mt-6 overflow-hidden !p-0">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-900 dark:bg-gray-900">
            <h1 className="text-sm font-medium text-gray-900 dark:text-gray-50">
              Incident summary
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="!p-1">
                  <RiMoreLine
                    className="size-5 shrink-0 text-gray-900 dark:text-gray-50"
                    aria-hidden="true"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="!w-36">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Refresh</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 dark:text-red-500">
                  Delete widget
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="p-4">
            <p className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
              10min 13s
            </p>
            <p className="text-sm/6 text-gray-500 dark:text-gray-500">
              Avg. time to resolve incident (MTTR)
            </p>
            <div className="mt-6">
              <CategoryBar
                values={[95.9, 4.1]}
                colors={['blue', 'lightGray']}
                showLabels={false}
              />
              <p className="mt-6 text-sm font-semibold text-gray-900 dark:text-gray-50">
                Current month
              </p>
              <ul role="list" className="mt-2 space-y-3">
                <li className="flex w-full items-center justify-between gap-2">
                  <div className="flex w-full items-center gap-2 truncate">
                    <span
                      className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
                      aria-hidden="true"
                    />
                    <span className="truncate whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                      % of incidents solved
                    </span>
                  </div>
                  <span className="whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-50">
                    95.9% (100)
                  </span>
                </li>
                <li className="flex w-full items-center justify-between gap-2">
                  <div className="flex w-full items-center gap-2 truncate">
                    <span
                      className="size-2.5 shrink-0 rounded-sm bg-gray-400 dark:bg-gray-600"
                      aria-hidden="true"
                    />
                    <span className="truncate whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                      % of incidents unsolved
                    </span>
                  </div>
                  <span className="whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-50">
                    4.1% (4)
                  </span>
                </li>
              </ul>
            </div>
            <Divider />
            <div className="mt-6">
              <CategoryBar
                values={[91.2, 8.8]}
                colors={['blue', 'lightGray']}
                showLabels={false}
              />
              <p className="mt-6 text-sm font-semibold text-gray-900 dark:text-gray-50">
                Previous month
              </p>
              <ul role="list" className="mt-2 space-y-3">
                <li className="flex w-full items-center justify-between gap-2">
                  <div className="flex w-full items-center gap-2 truncate">
                    <span
                      className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
                      aria-hidden="true"
                    />
                    <span className="truncate whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                      % of incidents solved
                    </span>
                  </div>
                  <span className="whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-50">
                    91.2% (95)
                  </span>
                </li>
                <li className="flex w-full items-center justify-between gap-2">
                  <div className="flex w-full items-center gap-2 truncate">
                    <span
                      className="size-2.5 shrink-0 rounded-sm bg-gray-400 dark:bg-gray-600"
                      aria-hidden="true"
                    />
                    <span className="truncate whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                      % of incidents unsolved
                    </span>
                  </div>
                  <span className="whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-50">
                    8.8% (10)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
      <Card className="mt-6 overflow-hidden !p-0">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-900 dark:bg-gray-900">
          <h1 className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Log monitoring
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="!p-1">
                <RiMoreLine
                  className="size-5 shrink-0 text-gray-900 dark:text-gray-50"
                  aria-hidden="true"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="!w-36">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Refresh</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 dark:text-red-500">
                Delete widget
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-4">
          <AreaChart
            data={data}
            index="date"
            categories={['Name lookup', 'Connection']}
            colors={['blue', 'red']}
            fill="solid"
            valueFormatter={valueFormatter}
            onValueChange={() => {}}
            maxValue={5000}
            yAxisWidth={65}
            tickGap={15}
            className="hidden sm:block"
          />
          <AreaChart
            data={data}
            index="date"
            categories={['Name lookup', 'Connection']}
            colors={['blue', 'red']}
            fill="solid"
            valueFormatter={valueFormatter}
            onValueChange={() => {}}
            showYAxis={false}
            startEndOnly={true}
            tickGap={15}
            className="sm:hidden"
          />
        </div>
      </Card>
    </div>
  );
}
```

### src/content/components/chart-compositions/chart-composition-15.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { SparkAreaChart } from '@/components/SparkChart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/Table';

const data = [
  //array-start
  {
    date: 'Oct 08, 2024',
    'Overall costs': 13500,
    'Active workspaces': 180,
    'Active users': 15800,
    Uptime: 96.8,
    'Response time': 5.45,
    MTTR: 425,
  },
  {
    date: 'Oct 09, 2024',
    'Overall costs': 14920,
    'Active workspaces': 165,
    'Active users': 14900,
    Uptime: 97.9,
    'Response time': 5.32,
    MTTR: 385,
  },
  {
    date: 'Oct 10, 2024',
    'Overall costs': 14250,
    'Active workspaces': 210,
    'Active users': 13200,
    Uptime: 97.2,
    'Response time': 5.58,
    MTTR: 410,
  },
  {
    date: 'Oct 11, 2024',
    'Overall costs': 15800,
    'Active workspaces': 195,
    'Active users': 14500,
    Uptime: 98.7,
    'Response time': 4.88,
    MTTR: 298,
  },
  {
    date: 'Oct 12, 2024',
    'Overall costs': 14580,
    'Active workspaces': 285,
    'Active users': 11800,
    Uptime: 99.3,
    'Response time': 4.91,
    MTTR: 315,
  },
  {
    date: 'Oct 13, 2024',
    'Overall costs': 16200,
    'Active workspaces': 245,
    'Active users': 13600,
    Uptime: 97.5,
    'Response time': 5.8,
    MTTR: 445,
  },
  {
    date: 'Oct 14, 2024',
    'Overall costs': 15750,
    'Active workspaces': 390,
    'Active users': 11500,
    Uptime: 98.2,
    'Response time': 5.36,
    MTTR: 378,
  },
  {
    date: 'Oct 15, 2024',
    'Overall costs': 14290,
    'Active workspaces': 355,
    'Active users': 13900,
    Uptime: 99.4,
    'Response time': 4.79,
    MTTR: 290,
  },
  {
    date: 'Oct 16, 2024',
    'Overall costs': 14550,
    'Active workspaces': 420,
    'Active users': 12100,
    Uptime: 99.5,
    'Response time': 4.87,
    MTTR: 305,
  },
  {
    date: 'Oct 17, 2024',
    'Overall costs': 15980,
    'Active workspaces': 375,
    'Active users': 14200,
    Uptime: 98.1,
    'Response time': 5.43,
    MTTR: 420,
  },
  {
    date: 'Oct 18, 2024',
    'Overall costs': 15220,
    'Active workspaces': 445,
    'Active users': 11700,
    Uptime: 98.8,
    'Response time': 5.22,
    MTTR: 358,
  },
  {
    date: 'Oct 19, 2024',
    'Overall costs': 14780,
    'Active workspaces': 395,
    'Active users': 13500,
    Uptime: 99.1,
    'Response time': 5.24,
    MTTR: 330,
  },
  {
    date: 'Oct 20, 2024',
    'Overall costs': 15450,
    'Active workspaces': 455,
    'Active users': 11900,
    Uptime: 99.3,
    'Response time': 5.21,
    MTTR: 340,
  },
  {
    date: 'Oct 21, 2024',
    'Overall costs': 15210,
    'Active workspaces': 380,
    'Active users': 12500,
    Uptime: 99.4,
    'Response time': 5.15,
    MTTR: 325,
  },
  {
    date: 'Oct 22, 2024',
    'Overall costs': 15091,
    'Active workspaces': 312,
    'Active users': 12100,
    Uptime: 99.6,
    'Response time': 5.1,
    MTTR: 313,
  },
  //array-end
];

const stats = [
  //array-start
  {
    name: 'Overall costs',
    value: '$15,091',
    change: '+1.23%',
    changeType: 'negative',
  },
  {
    name: 'Active workspaces',
    value: '312',
    change: '+4.09%',
    changeType: 'positive',
  },
  {
    name: 'Active users',
    value: '12.1K',
    change: '-4.21%',
    changeType: 'negative',
  },
  {
    name: 'Uptime',
    value: '99.6%',
    change: '+1.21%',
    changeType: 'positive',
  },
  {
    name: 'Response time',
    value: '5.1ms',
    change: '+0.21%',
    changeType: 'negative',
  },
  {
    name: 'MTTR',
    value: '5min 13s',
    change: '+4.91%',
    changeType: 'negative',
  },
  //array-end
];

const dataTable = [
  //array-start
  {
    'Time period': 'Today',
    'Overall costs': '$15,091',
    'Active workspaces': '312',
    'Active users': '12.1K',
    Uptime: '99.6%',
    'Response time': '5.1ms',
    MTTR: '5min 11s',
  },
  {
    'Time period': 'Last 7 days',
    'Overall costs': '$12,432',
    'Active workspaces': '419',
    'Active users': '8.7K',
    Uptime: '98.2%',
    'Response time': '4.5ms',
    MTTR: '4min 19s',
  },
  {
    'Time period': 'Last 30 days',
    'Overall costs': '$10,321',
    'Active workspaces': '210',
    'Active users': '7.2K',
    Uptime: '94.1%',
    'Response time': '10.2ms',
    MTTR: '8min 43s',
  },
  {
    'Time period': 'Last 365 days',
    'Overall costs': '$21,432',
    'Active workspaces': '380',
    'Active users': '7.9K',
    Uptime: '95.3%',
    'Response time': '9.1ms',
    MTTR: '7min 23s',
  },
  {
    'Time period': 'All time',
    'Overall costs': '$9,213',
    'Active workspaces': '264',
    'Active users': '10.1K',
    Uptime: '98.2%',
    'Response time': '9.9ms',
    MTTR: '6min 41s',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
        Cloud monitoring
      </h1>
      <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
        All your metrics in one overview.
      </p>
      <Card className="mt-6 overflow-hidden !p-0">
        <dl className="grid grid-cols-1 gap-px bg-gray-200 dark:bg-gray-900 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.name} className="group relative">
              <div className="absolute inset-0 z-10 hidden bg-white/40 opacity-0 backdrop-blur-xl transition-opacity duration-100 group-hover:opacity-100 dark:bg-gray-950/50 sm:block" />
              <div className="xl:px-8 relative z-0 flex w-full flex-wrap items-baseline justify-between gap-x-4 bg-white px-4 py-4 dark:bg-gray-950 sm:px-6 sm:py-6">
                <dt className="text-sm/6 font-medium text-gray-500 dark:text-gray-500">
                  {stat.name}
                </dt>
                <dd
                  className={cx(
                    stat.changeType === 'negative'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-emerald-600 dark:text-emerald-400',
                    'text-xs font-medium',
                  )}
                >
                  {stat.change}
                </dd>
                <dd className="mt-0.5 w-full flex-none text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
                  {stat.value}
                </dd>
                <SparkAreaChart
                  data={data}
                  index="date"
                  categories={[stat.name]}
                  colors={['blue']}
                  fill="solid"
                  className="mt-4 h-10 w-full"
                />
                <Divider className="!my-0 block pb-4 pt-6 sm:hidden" />
                <div className="flex w-full items-center justify-end gap-2 sm:hidden">
                  <a
                    href="#"
                    className="block text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-500 hover:dark:text-gray-400"
                  >
                    Edit alarm
                  </a>
                  <span
                    className="h-6 w-px bg-gray-200 dark:bg-gray-900"
                    aria-hidden="true"
                  />
                  <a
                    href="#"
                    className="block text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-600"
                  >
                    View more
                  </a>
                </div>
              </div>
              {/* Hover state container */}
              <div className="absolute inset-0 z-50 m-auto hidden cursor-pointer sm:flex sm:items-center sm:justify-center sm:gap-2">
                <Button
                  variant="secondary"
                  className="opacity-0 transition-opacity duration-100 group-hover:opacity-100"
                  asChild
                >
                  <a href="#">Edit alarm</a>
                </Button>
                <Button
                  className="border-none opacity-0 transition-opacity duration-100 group-hover:opacity-100"
                  asChild
                >
                  <a href="#">View Details</a>
                </Button>
              </div>
            </div>
          ))}
        </dl>
      </Card>
      <TableRoot className="mt-8 !overflow-visible">
        <div className="overflow-hidden overflow-x-scroll rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
          <Table className="!border-transparent">
            <TableHead className="!bg-gray-50 dark:!bg-gray-900">
              <TableRow>
                <TableHeaderCell>Time period</TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Overall costs
                </TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Active workspaces
                </TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Active users
                </TableHeaderCell>
                <TableHeaderCell className="text-right">Uptime</TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Response time
                </TableHeaderCell>
                <TableHeaderCell className="text-right">MTTR</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTable.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item['Time period']}</TableCell>
                  <TableCell className="text-right">
                    {item['Overall costs']}
                  </TableCell>
                  <TableCell className="text-right">
                    {item['Active workspaces']}
                  </TableCell>
                  <TableCell className="text-right">
                    {item['Active users']}
                  </TableCell>
                  <TableCell className="text-right">{item.Uptime}</TableCell>
                  <TableCell className="text-right">
                    {item['Response time']}
                  </TableCell>
                  <TableCell className="text-right">{item.MTTR}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/chart-compositions/index.ts

```ts
export { default as ChartComposition01 } from './chart-composition-01';
export { default as ChartComposition02 } from './chart-composition-02';
export { default as ChartComposition03 } from './chart-composition-03';
export { default as ChartComposition04 } from './chart-composition-04';
export { default as ChartComposition05 } from './chart-composition-05';
export { default as ChartComposition06 } from './chart-composition-06';
export { default as ChartComposition07 } from './chart-composition-07';
export { default as ChartComposition08 } from './chart-composition-08';
export { default as ChartComposition09 } from './chart-composition-09';
export { default as ChartComposition10 } from './chart-composition-10';
export { default as ChartComposition11 } from './chart-composition-11';
export { default as ChartComposition12 } from './chart-composition-12';
export { default as ChartComposition13 } from './chart-composition-13';
export { default as ChartComposition14 } from './chart-composition-14';
export { default as ChartComposition15 } from './chart-composition-15';
```
