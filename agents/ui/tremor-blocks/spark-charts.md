# Components / spark-charts

[Back to index](index.md)

## Components / spark-charts

Files:
- `src/content/components/spark-charts/index.ts`
- `src/content/components/spark-charts/spark-chart-01.tsx`
- `src/content/components/spark-charts/spark-chart-02.tsx`
- `src/content/components/spark-charts/spark-chart-03.tsx`
- `src/content/components/spark-charts/spark-chart-04.tsx`
- `src/content/components/spark-charts/spark-chart-05.tsx`
- `src/content/components/spark-charts/spark-chart-06.tsx`

### src/content/components/spark-charts/index.ts

```ts
export { default as SparkChart01 } from './spark-chart-01';
export { default as SparkChart02 } from './spark-chart-02';
export { default as SparkChart03 } from './spark-chart-03';
export { default as SparkChart04 } from './spark-chart-04';
export { default as SparkChart05 } from './spark-chart-05';
export { default as SparkChart06 } from './spark-chart-06';
```

### src/content/components/spark-charts/spark-chart-01.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { SparkAreaChart } from '@/components/SparkChart';

const data = [
  //array-start
  {
    date: 'Nov 24, 2023',
    GOOG: 156.2,
    AMZN: 68.5,
    SPOT: 71.8,
    MSFT: 205.3,
    TSLA: 1050.6,
  },
  {
    date: 'Nov 25, 2023',
    GOOG: 152.5,
    AMZN: 69.3,
    SPOT: 67.2,
    MSFT: 223.1,
    TSLA: 945.8,
  },
  {
    date: 'Nov 26, 2023',
    GOOG: 148.7,
    AMZN: 69.8,
    SPOT: 61.5,
    MSFT: 240.9,
    TSLA: 839.4,
  },
  {
    date: 'Nov 27, 2023',
    GOOG: 155.3,
    AMZN: 73.5,
    SPOT: 57.9,
    MSFT: 254.7,
    TSLA: 830.2,
  },
  {
    date: 'Nov 28, 2023',
    GOOG: 160.1,
    AMZN: 75.2,
    SPOT: 59.6,
    MSFT: 308.5,
    TSLA: 845.7,
  },
  {
    date: 'Nov 29, 2023',
    GOOG: 175.6,
    AMZN: 89.2,
    SPOT: 57.3,
    MSFT: 341.4,
    TSLA: 950.2,
  },
  {
    date: 'Nov 30, 2023',
    GOOG: 180.2,
    AMZN: 92.7,
    SPOT: 59.8,
    MSFT: 378.1,
    TSLA: 995.9,
  },
  {
    date: 'Dec 01, 2023',
    GOOG: 185.5,
    AMZN: 95.3,
    SPOT: 62.4,
    MSFT: 320.3,
    TSLA: 1060.4,
  },
  {
    date: 'Dec 02, 2023',
    GOOG: 182.3,
    AMZN: 93.8,
    SPOT: 60.7,
    MSFT: 356.5,
    TSLA: 965.8,
  },
  {
    date: 'Dec 03, 2023',
    GOOG: 180.7,
    AMZN: 91.6,
    SPOT: 58.9,
    MSFT: 340.7,
    TSLA: 970.3,
  },
  {
    date: 'Dec 04, 2023',
    GOOG: 178.5,
    AMZN: 89.7,
    SPOT: 56.2,
    MSFT: 365.9,
    TSLA: 975.9,
  },
  {
    date: 'Dec 05, 2023',
    GOOG: 176.2,
    AMZN: 87.5,
    SPOT: 54.8,
    MSFT: 375.1,
    TSLA: 964.6,
  },
  {
    date: 'Dec 06, 2023',
    GOOG: 174.8,
    AMZN: 85.3,
    SPOT: 53.4,
    MSFT: 340.3,
    TSLA: 960.4,
  },
  {
    date: 'Dec 07, 2023',
    GOOG: 178.0,
    AMZN: 88.2,
    SPOT: 55.2,
    MSFT: 335.5,
    TSLA: 955.3,
  },
  {
    date: 'Dec 08, 2023',
    GOOG: 180.6,
    AMZN: 90.5,
    SPOT: 56.8,
    MSFT: 310.7,
    TSLA: 950.3,
  },
  {
    date: 'Dec 09, 2023',
    GOOG: 182.4,
    AMZN: 92.8,
    SPOT: 58.4,
    MSFT: 300.9,
    TSLA: 845.4,
  },
  {
    date: 'Dec 10, 2023',
    GOOG: 179.7,
    AMZN: 90.2,
    SPOT: 57.0,
    MSFT: 290.1,
    TSLA: 1011.6,
  },
  {
    date: 'Dec 11, 2023',
    GOOG: 154.2,
    AMZN: 88.7,
    SPOT: 55.6,
    MSFT: 291.3,
    TSLA: 1017.9,
  },
  {
    date: 'Dec 12, 2023',
    GOOG: 151.9,
    AMZN: 86.5,
    SPOT: 53.9,
    MSFT: 293.5,
    TSLA: 940.3,
  },
  {
    date: 'Dec 13, 2023',
    GOOG: 149.3,
    AMZN: 83.7,
    SPOT: 52.1,
    MSFT: 301.7,
    TSLA: 900.8,
  },
  {
    date: 'Dec 14, 2023',
    GOOG: 148.8,
    AMZN: 81.4,
    SPOT: 50.5,
    MSFT: 321.9,
    TSLA: 780.4,
  },
  {
    date: 'Dec 15, 2023',
    GOOG: 145.5,
    AMZN: 79.8,
    SPOT: 48.9,
    MSFT: 328.1,
    TSLA: 765.1,
  },
  {
    date: 'Dec 16, 2023',
    GOOG: 140.2,
    AMZN: 84.5,
    SPOT: 50.2,
    MSFT: 331.3,
    TSLA: 745.9,
  },
  {
    date: 'Dec 17, 2023',
    GOOG: 143.8,
    AMZN: 82.1,
    SPOT: 49.6,
    MSFT: 373.5,
    TSLA: 741.8,
  },
  {
    date: 'Dec 18, 2023',
    GOOG: 157.5,
    AMZN: 86.9,
    SPOT: 51.3,
    MSFT: 381.7,
    TSLA: 739.8,
  },
  //array-end
];

const summary = [
  //array-start
  {
    ticker: 'AMZN',
    description: 'Amazon',
    value: '$86.9',
    change: '+0.92%',
    changeType: 'positive',
  },
  {
    ticker: 'TSLA',
    description: 'Tesla, Inc.',
    value: '$739.8',
    change: '-2.12%',
    changeType: 'negative',
  },
  {
    ticker: 'GOOG',
    description: 'Alphabet, Inc',
    value: '$157.5',
    change: '+0.38%',
    changeType: 'positive',
  },
  {
    ticker: 'SPOT',
    description: 'Spotify',
    value: '$51.3',
    change: '−0.25%',
    changeType: 'negative',
  },
  {
    ticker: 'MSFT',
    description: 'Microsoft',
    value: '$381.7',
    change: '+2.45%',
    changeType: 'positive',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <dl className="space-y-6 sm:mx-auto sm:max-w-md">
        {summary.map((stock) => (
          <Card
            key={stock.ticker}
            className="flex items-center justify-between space-x-4 !p-4"
          >
            <div className="truncate">
              <dt className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                {stock.ticker}
              </dt>
              <dl className="truncate text-xs text-gray-500 dark:text-gray-500">
                {stock.description}
              </dl>
            </div>
            <div className="flex items-center space-x-3">
              <SparkAreaChart
                data={data}
                index="date"
                categories={[stock.ticker]}
                colors={stock.changeType === 'positive' ? ['emerald'] : ['red']}
                className="h-8 w-24 flex-none sm:w-28"
              />
              <div
                className={cx(
                  stock.changeType === 'positive'
                    ? 'text-emerald-700 dark:text-emerald-500'
                    : 'text-red-700 dark:text-red-500',
                  'flex w-28 items-center justify-end space-x-2 sm:w-32',
                )}
              >
                <dd className="text-sm font-medium">{stock.value}</dd>
                <dd
                  className={cx(
                    stock.changeType === 'positive'
                      ? 'bg-emerald-100 dark:bg-emerald-400/10'
                      : 'bg-red-100 dark:bg-red-400/10',
                    'rounded px-1.5 py-1 text-xs font-medium tabular-nums',
                  )}
                >
                  {stock.change}
                </dd>
              </div>
            </div>
          </Card>
        ))}
      </dl>
    </div>
  );
}
```

### src/content/components/spark-charts/spark-chart-02.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { SparkAreaChart } from '@/components/SparkChart';

const data = [
  //array-start
  {
    date: 'Nov 24, 2023',
    GOOG: 156.2,
    AMZN: 68.5,
    SPOT: 71.8,
    AAPL: 149.1,
  },
  {
    date: 'Nov 25, 2023',
    GOOG: 152.5,
    AMZN: 69.3,
    SPOT: 67.2,
    AAPL: 145.1,
  },
  {
    date: 'Nov 26, 2023',
    GOOG: 148.7,
    AMZN: 69.8,
    SPOT: 61.5,
    AAPL: 146.1,
  },
  {
    date: 'Nov 27, 2023',
    GOOG: 155.3,
    AMZN: 73.5,
    SPOT: 57.9,
    AAPL: 147.1,
  },
  {
    date: 'Nov 28, 2023',
    GOOG: 160.1,
    AMZN: 75.2,
    SPOT: 59.6,
    AAPL: 148.1,
  },
  {
    date: 'Nov 29, 2023',
    GOOG: 175.6,
    AMZN: 89.2,
    SPOT: 57.3,
    AAPL: 149.2,
  },
  {
    date: 'Nov 30, 2023',
    GOOG: 180.2,
    AMZN: 92.7,
    SPOT: 59.8,
    AAPL: 149.1,
  },
  {
    date: 'Dec 01, 2023',
    GOOG: 185.5,
    AMZN: 95.3,
    SPOT: 62.4,
    AAPL: 142.4,
  },
  {
    date: 'Dec 02, 2023',
    GOOG: 182.3,
    AMZN: 93.8,
    SPOT: 60.7,
    AAPL: 143.6,
  },
  {
    date: 'Dec 03, 2023',
    GOOG: 180.7,
    AMZN: 91.6,
    SPOT: 58.9,
    AAPL: 144.3,
  },
  {
    date: 'Dec 04, 2023',
    GOOG: 178.5,
    AMZN: 89.7,
    SPOT: 56.2,
    AAPL: 152.4,
  },
  {
    date: 'Dec 05, 2023',
    GOOG: 176.2,
    AMZN: 87.5,
    SPOT: 54.8,
    AAPL: 156.1,
  },
  {
    date: 'Dec 06, 2023',
    GOOG: 174.8,
    AMZN: 85.3,
    SPOT: 53.4,
    AAPL: 158.6,
  },
  {
    date: 'Dec 07, 2023',
    GOOG: 178.0,
    AMZN: 88.2,
    SPOT: 55.2,
    AAPL: 159.3,
  },
  {
    date: 'Dec 08, 2023',
    GOOG: 180.6,
    AMZN: 90.5,
    SPOT: 56.8,
    AAPL: 164.6,
  },
  {
    date: 'Dec 09, 2023',
    GOOG: 182.4,
    AMZN: 92.8,
    SPOT: 58.4,
    AAPL: 166.6,
  },
  {
    date: 'Dec 10, 2023',
    GOOG: 179.7,
    AMZN: 90.2,
    SPOT: 57.0,
    AAPL: 169.2,
  },
  {
    date: 'Dec 11, 2023',
    GOOG: 154.2,
    AMZN: 88.7,
    SPOT: 55.6,
    AAPL: 169.6,
  },
  {
    date: 'Dec 12, 2023',
    GOOG: 151.9,
    AMZN: 86.5,
    SPOT: 53.9,
    AAPL: 169.1,
  },
  {
    date: 'Dec 13, 2023',
    GOOG: 149.3,
    AMZN: 83.7,
    SPOT: 52.1,
    AAPL: 169.1,
  },
  {
    date: 'Dec 14, 2023',
    GOOG: 148.8,
    AMZN: 81.4,
    SPOT: 50.5,
    AAPL: 171.6,
  },
  {
    date: 'Dec 15, 2023',
    GOOG: 145.5,
    AMZN: 79.8,
    SPOT: 48.9,
    AAPL: 171.1,
  },
  {
    date: 'Dec 16, 2023',
    GOOG: 140.2,
    AMZN: 84.5,
    SPOT: 50.2,
    AAPL: 173.6,
  },
  //array-end
];

const summary = [
  //array-start
  {
    ticker: 'AMZN',
    description: 'Amazon',
    value: '$84.5',
    change: '+0.92%',
    changeType: 'positive',
  },
  {
    ticker: 'GOOG',
    description: 'Alphabet, Inc',
    value: '$140.2',
    change: '-0.38%',
    changeType: 'negative',
  },
  {
    ticker: 'AAPL',
    description: 'Apple',
    value: '$173.6',
    change: '+1.67%',
    changeType: 'positive',
  },
  {
    ticker: 'SPOT',
    description: 'Spotify',
    value: '$50.2',
    change: '-0.25%',
    changeType: 'negative',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-md">
        <p className="text-sm text-gray-500 dark:text-gray-500">Watchlist</p>
        <p className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
          $44,567.10
        </p>
        <p className="mt-1 text-sm font-medium">
          <span className="text-emerald-700 dark:text-emerald-500">
            +$451.30 (1.2%)
          </span>{' '}
          <span className="font-normal text-gray-500 dark:text-gray-500">
            Today
          </span>
        </p>
        <ul role="list" className="mt-8 space-y-8">
          {summary.map((item) => (
            <li
              key={item.ticker}
              className="flex items-center justify-between space-x-6"
            >
              <div className="truncate">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                  {item.ticker}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-500">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <SparkAreaChart
                  data={data}
                  index="date"
                  categories={[item.ticker]}
                  colors={
                    item.changeType === 'positive' ? ['emerald'] : ['red']
                  }
                  className="h-10 w-32 flex-none sm:w-44"
                />
                <div className="w-14 text-right sm:w-16">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    {item.value}
                  </p>
                  <p
                    className={cx(
                      item.changeType === 'positive'
                        ? 'text-emerald-700 dark:text-emerald-500'
                        : 'text-red-700 dark:text-red-500',
                      'text-xs font-medium',
                    )}
                  >
                    {item.change}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
```

### src/content/components/spark-charts/spark-chart-03.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { SparkAreaChart } from '@/components/SparkChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const data = [
  //array-start
  {
    date: 'Nov 24, 2023',
    GOOG: 156.2,
    AMZN: 68.5,
    SPOT: 71.8,
    AAPL: 149.1,
    MSFT: 205.3,
    TSLA: 1050.6,
  },
  {
    date: 'Nov 25, 2023',
    GOOG: 152.5,
    AMZN: 69.3,
    SPOT: 67.2,
    AAPL: 155.1,
    MSFT: 223.1,
    TSLA: 945.8,
  },
  {
    date: 'Nov 26, 2023',
    GOOG: 148.7,
    AMZN: 69.8,
    SPOT: 61.5,
    AAPL: 160.1,
    MSFT: 240.9,
    TSLA: 839.4,
  },
  {
    date: 'Nov 27, 2023',
    GOOG: 155.3,
    AMZN: 73.5,
    SPOT: 57.9,
    AAPL: 165.1,
    MSFT: 254.7,
    TSLA: 830.2,
  },
  {
    date: 'Nov 28, 2023',
    GOOG: 160.1,
    AMZN: 75.2,
    SPOT: 59.6,
    AAPL: 148.1,
    MSFT: 308.5,
    TSLA: 845.7,
  },
  {
    date: 'Nov 29, 2023',
    GOOG: 175.6,
    AMZN: 89.2,
    SPOT: 57.3,
    AAPL: 149.2,
    MSFT: 341.4,
    TSLA: 950.2,
  },
  {
    date: 'Nov 30, 2023',
    GOOG: 180.2,
    AMZN: 92.7,
    SPOT: 59.8,
    AAPL: 139.1,
    MSFT: 378.1,
    TSLA: 995.9,
  },
  {
    date: 'Dec 01, 2023',
    GOOG: 185.5,
    AMZN: 95.3,
    SPOT: 62.4,
    AAPL: 122.4,
    MSFT: 320.3,
    TSLA: 1060.4,
  },
  {
    date: 'Dec 02, 2023',
    GOOG: 182.3,
    AMZN: 93.8,
    SPOT: 60.7,
    AAPL: 143.6,
    MSFT: 356.5,
    TSLA: 965.8,
  },
  {
    date: 'Dec 03, 2023',
    GOOG: 180.7,
    AMZN: 91.6,
    SPOT: 58.9,
    AAPL: 144.3,
    MSFT: 340.7,
    TSLA: 970.3,
  },
  {
    date: 'Dec 04, 2023',
    GOOG: 178.5,
    AMZN: 89.7,
    SPOT: 56.2,
    AAPL: 152.4,
    MSFT: 365.9,
    TSLA: 975.9,
  },
  {
    date: 'Dec 05, 2023',
    GOOG: 176.2,
    AMZN: 87.5,
    SPOT: 54.8,
    AAPL: 156.1,
    MSFT: 375.1,
    TSLA: 964.6,
  },
  {
    date: 'Dec 06, 2023',
    GOOG: 174.8,
    AMZN: 85.3,
    SPOT: 53.4,
    AAPL: 158.6,
    MSFT: 340.3,
    TSLA: 960.4,
  },
  {
    date: 'Dec 07, 2023',
    GOOG: 178.0,
    AMZN: 88.2,
    SPOT: 55.2,
    AAPL: 163.3,
    MSFT: 335.5,
    TSLA: 955.3,
  },
  {
    date: 'Dec 08, 2023',
    GOOG: 180.6,
    AMZN: 90.5,
    SPOT: 56.8,
    AAPL: 169.6,
    MSFT: 310.7,
    TSLA: 950.3,
  },
  {
    date: 'Dec 09, 2023',
    GOOG: 182.4,
    AMZN: 92.8,
    SPOT: 58.4,
    AAPL: 178.6,
    MSFT: 300.9,
    TSLA: 845.4,
  },
  {
    date: 'Dec 10, 2023',
    GOOG: 179.7,
    AMZN: 90.2,
    SPOT: 57.0,
    AAPL: 183.2,
    MSFT: 290.1,
    TSLA: 1011.6,
  },
  {
    date: 'Dec 11, 2023',
    GOOG: 154.2,
    AMZN: 88.7,
    SPOT: 55.6,
    AAPL: 199.6,
    MSFT: 291.3,
    TSLA: 1017.9,
  },
  {
    date: 'Dec 12, 2023',
    GOOG: 151.9,
    AMZN: 86.5,
    SPOT: 53.9,
    AAPL: 201.1,
    MSFT: 293.5,
    TSLA: 940.3,
  },
  {
    date: 'Dec 13, 2023',
    GOOG: 149.3,
    AMZN: 83.7,
    SPOT: 52.1,
    AAPL: 169.1,
    MSFT: 301.7,
    TSLA: 900.8,
  },
  {
    date: 'Dec 14, 2023',
    GOOG: 148.8,
    AMZN: 81.4,
    SPOT: 50.5,
    AAPL: 171.6,
    MSFT: 321.9,
    TSLA: 780.4,
  },
  {
    date: 'Dec 15, 2023',
    GOOG: 145.5,
    AMZN: 79.8,
    SPOT: 48.9,
    AAPL: 178.1,
    MSFT: 328.1,
    TSLA: 765.1,
  },
  {
    date: 'Dec 16, 2023',
    GOOG: 140.2,
    AMZN: 84.5,
    SPOT: 50.2,
    AAPL: 192.6,
    MSFT: 331.3,
    TSLA: 745.9,
  },
  {
    date: 'Dec 17, 2023',
    GOOG: 143.8,
    AMZN: 82.1,
    SPOT: 49.6,
    AAPL: 201.2,
    MSFT: 373.5,
    TSLA: 741.8,
  },
  {
    date: 'Dec 18, 2023',
    GOOG: 148.5,
    AMZN: 86.9,
    SPOT: 51.3,
    AAPL: 209.8,
    MSFT: 381.7,
    TSLA: 739.8,
  },
  //array-end
];

const tabs = [
  //array-start
  {
    name: 'Trending',
    stocks: [
      {
        ticker: 'AMZN',
        description: 'Amazon',
        value: '$86.9',
        change: '+0.92%',
        changeType: 'positive',
      },
      {
        ticker: 'GOOG',
        description: 'Alphabet, Inc',
        value: '$148.5',
        change: '-0.38%',
        changeType: 'negative',
      },
      {
        ticker: 'AAPL',
        description: 'Apple',
        value: '$209.8',
        change: '+1.67%',
        changeType: 'positive',
      },
    ],
  },
  {
    name: 'Watchlist',
    stocks: [
      {
        ticker: 'SPOT',
        description: 'Spotify',
        value: '$51.3',
        change: '-0.25%',
        changeType: 'negative',
      },
      {
        ticker: 'MSFT',
        description: 'Microsoft',
        value: '$381.7',
        change: '+2.45%',
        changeType: 'positive',
      },
      {
        ticker: 'TSLA',
        description: 'Tesla, Inc.',
        value: '$739.8',
        change: '-2.12%',
        changeType: 'negative',
      },
    ],
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-md">
        <p className="text-sm text-gray-500 dark:text-gray-500">Watchlist</p>
        <p className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
          $44,567.10
        </p>
        <p className="mt-1 text-sm font-medium">
          <span className="text-emerald-700 dark:text-emerald-500">
            +$451.30 (1.2%)
          </span>{' '}
          <span className="font-normal text-gray-500 dark:text-gray-500">
            Today
          </span>
        </p>
        <Tabs defaultValue="Trending" className="mt-6">
          <TabsList className="grid w-full grid-cols-2" variant="solid">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.name} value={tab.name}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-8">
            {tabs.map((tab) => (
              <TabsContent key={tab.name} value={tab.name}>
                <ul role="list" className="space-y-6">
                  {tab.stocks.map((stock) => (
                    <li
                      key={stock.ticker}
                      className="flex items-center justify-between space-x-6"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                          {stock.description}
                        </p>
                        <p
                          className={cx(
                            stock.changeType === 'positive'
                              ? 'text-emerald-700 dark:text-emerald-500'
                              : 'text-red-700 dark:text-red-500',
                            'flex items-center space-x-1 text-sm',
                          )}
                        >
                          <span className="font-medium">{stock.value}</span>
                          <span>({stock.change})</span>
                        </p>
                      </div>
                      <SparkAreaChart
                        data={data}
                        index="date"
                        categories={[stock.ticker]}
                        colors={
                          stock.changeType === 'positive'
                            ? ['emerald']
                            : ['red']
                        }
                        className="h-10 w-36 flex-none sm:w-44"
                      />
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

### src/content/components/spark-charts/spark-chart-04.tsx

```tsx
'use client';

import { Card } from '@/components/Card';
import { SparkAreaChart } from '@/components/SparkChart';

const data = [
  //array-start
  {
    date: 'Jan 23',
    'Monthly active users': 673,
    'Monthly sessions': 1024,
    'Monthly user growth': 4.5,
  },
  {
    date: 'Feb 23',
    'Monthly active users': 573,
    'Monthly sessions': 1224,
    'Monthly user growth': 6.5,
  },
  {
    date: 'Mar 23',
    'Monthly active users': 503,
    'Monthly sessions': 1200,
    'Monthly user growth': 6.9,
  },
  {
    date: 'Apr 23',
    'Monthly active users': 523,
    'Monthly sessions': 1005,
    'Monthly user growth': 4.2,
  },
  {
    date: 'May 23',
    'Monthly active users': 599,
    'Monthly sessions': 1201,
    'Monthly user growth': 3.9,
  },
  {
    date: 'Jun 23',
    'Monthly active users': 481,
    'Monthly sessions': 1001,
    'Monthly user growth': 3.7,
  },
  {
    date: 'Jul 23',
    'Monthly active users': 499,
    'Monthly sessions': 1129,
    'Monthly user growth': 4.7,
  },
  {
    date: 'Aug 23',
    'Monthly active users': 571,
    'Monthly sessions': 1220,
    'Monthly user growth': 4.5,
  },
  {
    date: 'Sep 23',
    'Monthly active users': 579,
    'Monthly sessions': 1420,
    'Monthly user growth': 4.3,
  },
  {
    date: 'Oct 23',
    'Monthly active users': 471,
    'Monthly sessions': 1230,
    'Monthly user growth': 4.0,
  },
  {
    date: 'Nov 23',
    'Monthly active users': 461,
    'Monthly sessions': 1430,
    'Monthly user growth': 4.1,
  },
  {
    date: 'Dec 23',
    'Monthly active users': 341,
    'Monthly sessions': 1530,
    'Monthly user growth': 4.9,
  },
  //array-end
];

const summary = [
  //array-start
  {
    name: 'Monthly active users',
    stat: '341',
  },
  {
    name: 'Monthly sessions',
    stat: '1,530',
  },
  {
    name: 'Monthly user growth',
    stat: '4.9%',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {summary.map((item) => (
          <Card key={item.name}>
            <dt className="text-sm text-gray-500 dark:text-gray-500">
              {item.name}
            </dt>
            <div className="flex items-center justify-between space-x-8">
              <dd className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
                {item.stat}
              </dd>
              <SparkAreaChart
                data={data}
                index="date"
                categories={[item.name]}
                fill="solid"
                className="flex-none"
              />
            </div>
          </Card>
        ))}
      </dl>
    </div>
  );
}
```

### src/content/components/spark-charts/spark-chart-05.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { SparkAreaChart } from '@/components/SparkChart';

const data = [
  //array-start
  {
    date: 'Nov 24, 2023',
    'Doorbell, Inc.': 150.2,
    'Off Running AG': 70.5,
    'Solid Bit Holding': 71.8,
  },
  {
    date: 'Nov 25, 2023',
    'Doorbell, Inc.': 152.5,
    'Off Running AG': 72.3,
    'Solid Bit Holding': 67.2,
  },
  {
    date: 'Nov 26, 2023',
    'Doorbell, Inc.': 148.7,
    'Off Running AG': 69.8,
    'Solid Bit Holding': 61.5,
  },
  {
    date: 'Nov 27, 2023',
    'Doorbell, Inc.': 155.3,
    'Off Running AG': 73.5,
    'Solid Bit Holding': 57.9,
  },
  {
    date: 'Nov 28, 2023',
    'Doorbell, Inc.': 160.1,
    'Off Running AG': 75.2,
    'Solid Bit Holding': 59.6,
  },
  {
    date: 'Nov 29, 2023',
    'Doorbell, Inc.': 175.6,
    'Off Running AG': 89.2,
    'Solid Bit Holding': 57.3,
  },
  {
    date: 'Nov 30, 2023',
    'Doorbell, Inc.': 180.2,
    'Off Running AG': 92.7,
    'Solid Bit Holding': 59.8,
  },
  {
    date: 'Dec 01, 2023',
    'Doorbell, Inc.': 185.5,
    'Off Running AG': 95.3,
    'Solid Bit Holding': 62.4,
  },
  {
    date: 'Dec 02, 2023',
    'Doorbell, Inc.': 182.3,
    'Off Running AG': 93.8,
    'Solid Bit Holding': 60.7,
  },
  {
    date: 'Dec 03, 2023',
    'Doorbell, Inc.': 180.7,
    'Off Running AG': 91.6,
    'Solid Bit Holding': 58.9,
  },
  {
    date: 'Dec 04, 2023',
    'Doorbell, Inc.': 178.5,
    'Off Running AG': 89.7,
    'Solid Bit Holding': 56.2,
  },
  {
    date: 'Dec 05, 2023',
    'Doorbell, Inc.': 176.2,
    'Off Running AG': 87.5,
    'Solid Bit Holding': 54.8,
  },
  {
    date: 'Dec 06, 2023',
    'Doorbell, Inc.': 174.8,
    'Off Running AG': 85.3,
    'Solid Bit Holding': 53.4,
  },
  {
    date: 'Dec 07, 2023',
    'Doorbell, Inc.': 178.0,
    'Off Running AG': 88.2,
    'Solid Bit Holding': 55.2,
  },
  {
    date: 'Dec 08, 2023',
    'Doorbell, Inc.': 180.6,
    'Off Running AG': 90.5,
    'Solid Bit Holding': 56.8,
  },
  {
    date: 'Dec 09, 2023',
    'Doorbell, Inc.': 182.4,
    'Off Running AG': 92.8,
    'Solid Bit Holding': 58.4,
  },
  {
    date: 'Dec 10, 2023',
    'Doorbell, Inc.': 179.7,
    'Off Running AG': 90.2,
    'Solid Bit Holding': 57.0,
  },
  {
    date: 'Dec 11, 2023',
    'Doorbell, Inc.': 178.2,
    'Off Running AG': 88.7,
    'Solid Bit Holding': 55.6,
  },
  {
    date: 'Dec 12, 2023',
    'Doorbell, Inc.': 175.9,
    'Off Running AG': 86.5,
    'Solid Bit Holding': 53.9,
  },
  {
    date: 'Dec 13, 2023',
    'Doorbell, Inc.': 172.3,
    'Off Running AG': 83.7,
    'Solid Bit Holding': 52.1,
  },
  {
    date: 'Dec 14, 2023',
    'Doorbell, Inc.': 169.8,
    'Off Running AG': 81.4,
    'Solid Bit Holding': 50.5,
  },
  {
    date: 'Dec 15, 2023',
    'Doorbell, Inc.': 168.5,
    'Off Running AG': 79.8,
    'Solid Bit Holding': 48.9,
  },
  {
    date: 'Dec 16, 2023',
    'Doorbell, Inc.': 170.2,
    'Off Running AG': 81.5,
    'Solid Bit Holding': 50.2,
  },
  //array-end
];

const summary = [
  //array-start
  {
    name: 'Doorbell, Inc.',
    change: '+2.3%',
    changeType: 'positive',
  },
  {
    name: 'Solid Bit Holding',
    change: '-0.9%',
    changeType: 'negative',
  },
  {
    name: 'Off Running AG',
    change: '+4.1%',
    changeType: 'positive',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {summary.map((item) => (
          <Card key={item.name}>
            <div className="flex items-center justify-between space-x-4">
              <div className="truncate">
                <dt className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                  {item.name}
                </dt>
                <dd
                  className={cx(
                    item.changeType === 'positive'
                      ? 'text-emerald-700 dark:text-emerald-500'
                      : 'text-red-700 dark:text-red-500',
                    'text-sm font-medium',
                  )}
                >
                  {item.change}
                </dd>
              </div>
              <SparkAreaChart
                data={data}
                index="date"
                categories={[item.name]}
                fill="solid"
                colors={item.changeType === 'positive' ? ['emerald'] : ['red']}
                className="flex-none"
              />
            </div>
          </Card>
        ))}
      </dl>
    </div>
  );
}
```

### src/content/components/spark-charts/spark-chart-06.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { SparkAreaChart } from '@/components/SparkChart';

const data = [
  //array-start
  {
    date: 'Nov 24, 2023',
    'Dow Jones': 156.2,
    SMI: 68.5,
    'S&P 500': 71.8,
  },
  {
    date: 'Nov 25, 2023',
    'Dow Jones': 152.5,
    SMI: 69.3,
    'S&P 500': 67.2,
  },
  {
    date: 'Nov 26, 2023',
    'Dow Jones': 148.7,
    SMI: 69.8,
    'S&P 500': 61.5,
  },
  {
    date: 'Nov 27, 2023',
    'Dow Jones': 155.3,
    SMI: 73.5,
    'S&P 500': 57.9,
  },
  {
    date: 'Nov 28, 2023',
    'Dow Jones': 160.1,
    SMI: 75.2,
    'S&P 500': 59.6,
  },
  {
    date: 'Nov 29, 2023',
    'Dow Jones': 175.6,
    SMI: 89.2,
    'S&P 500': 57.3,
  },
  {
    date: 'Nov 30, 2023',
    'Dow Jones': 180.2,
    SMI: 92.7,
    'S&P 500': 59.8,
  },
  {
    date: 'Dec 01, 2023',
    'Dow Jones': 185.5,
    SMI: 95.3,
    'S&P 500': 62.4,
  },
  {
    date: 'Dec 02, 2023',
    'Dow Jones': 182.3,
    SMI: 93.8,
    'S&P 500': 60.7,
  },
  {
    date: 'Dec 03, 2023',
    'Dow Jones': 180.7,
    SMI: 91.6,
    'S&P 500': 58.9,
  },
  {
    date: 'Dec 04, 2023',
    'Dow Jones': 178.5,
    SMI: 89.7,
    'S&P 500': 56.2,
  },
  {
    date: 'Dec 05, 2023',
    'Dow Jones': 176.2,
    SMI: 87.5,
    'S&P 500': 54.8,
  },
  {
    date: 'Dec 06, 2023',
    'Dow Jones': 174.8,
    SMI: 85.3,
    'S&P 500': 53.4,
  },
  {
    date: 'Dec 07, 2023',
    'Dow Jones': 178.0,
    SMI: 88.2,
    'S&P 500': 55.2,
  },
  {
    date: 'Dec 08, 2023',
    'Dow Jones': 180.6,
    SMI: 90.5,
    'S&P 500': 56.8,
  },
  {
    date: 'Dec 09, 2023',
    'Dow Jones': 182.4,
    SMI: 92.8,
    'S&P 500': 58.4,
  },
  {
    date: 'Dec 10, 2023',
    'Dow Jones': 179.7,
    SMI: 90.2,
    'S&P 500': 57.0,
  },
  {
    date: 'Dec 11, 2023',
    'Dow Jones': 154.2,
    SMI: 88.7,
    'S&P 500': 55.6,
  },
  {
    date: 'Dec 12, 2023',
    'Dow Jones': 151.9,
    SMI: 86.5,
    'S&P 500': 53.9,
  },
  {
    date: 'Dec 13, 2023',
    'Dow Jones': 149.3,
    SMI: 83.7,
    'S&P 500': 52.1,
  },
  {
    date: 'Dec 14, 2023',
    'Dow Jones': 148.8,
    SMI: 81.4,
    'S&P 500': 50.5,
  },
  {
    date: 'Dec 15, 2023',
    'Dow Jones': 145.5,
    SMI: 79.8,
    'S&P 500': 48.9,
  },
  {
    date: 'Dec 16, 2023',
    'Dow Jones': 140.2,
    SMI: 84.5,
    'S&P 500': 50.2,
  },
  //array-end
];

const summary = [
  //array-start
  {
    name: 'Dow Jones',
    description: 'Dow Jones Industrial Average',
    category: 'Dow Jones',
    change: '-3.2%',
    changeType: 'negative',
  },
  {
    name: 'SMI',
    description: 'Swiss Market Index',
    category: 'SMI',
    change: '+4.1%',
    changeType: 'positive',
  },
  {
    name: 'S&P 500',
    description: "Standard and Poor's 500",
    category: 'S&P 500',
    change: '-6.9%',
    changeType: 'negative',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <dl className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {summary.map((item) => (
          <Card
            key={item.name}
            className="flex items-center justify-between space-x-4"
          >
            <div className="truncate">
              <div className="flex items-center space-x-1.5">
                <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  {item.name}
                </dt>
                <span
                  className={cx(
                    item.changeType === 'positive'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-400/10 dark:text-red-400',
                    'inline-flex items-center rounded px-2 py-0.5 text-xs',
                  )}
                >
                  {item.change}
                </span>
              </div>
              <dd className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-500">
                {item.description}
              </dd>
            </div>
            <SparkAreaChart
              data={data}
              index="date"
              categories={[item.category]}
              fill="solid"
              colors={item.changeType === 'positive' ? ['emerald'] : ['red']}
              className="h-10 flex-none"
            />
          </Card>
        ))}
      </dl>
    </div>
  );
}
```
