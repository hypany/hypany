# Components / line-charts

[Back to index](index.md)

## Components / line-charts

Files:
- `src/content/components/line-charts/index.ts`
- `src/content/components/line-charts/line-chart-01.tsx`
- `src/content/components/line-charts/line-chart-02.tsx`
- `src/content/components/line-charts/line-chart-03.tsx`
- `src/content/components/line-charts/line-chart-04.tsx`
- `src/content/components/line-charts/line-chart-05.tsx`
- `src/content/components/line-charts/line-chart-06.tsx`
- `src/content/components/line-charts/line-chart-07.tsx`
- `src/content/components/line-charts/line-chart-08.tsx`
- `src/content/components/line-charts/line-chart-09.tsx`
- `src/content/components/line-charts/line-chart-10.tsx`
- `src/content/components/line-charts/line-chart-11.tsx`
- `src/content/components/line-charts/line-chart-12.tsx`

### src/content/components/line-charts/index.ts

```ts
export { default as LineChart01 } from './line-chart-01';
export { default as LineChart02 } from './line-chart-02';
export { default as LineChart03 } from './line-chart-03';
export { default as LineChart04 } from './line-chart-04';
export { default as LineChart05 } from './line-chart-05';
export { default as LineChart06 } from './line-chart-06';
export { default as LineChart07 } from './line-chart-07';
export { default as LineChart08 } from './line-chart-08';
export { default as LineChart09 } from './line-chart-09';
export { default as LineChart10 } from './line-chart-10';
export { default as LineChart11 } from './line-chart-11';
export { default as LineChart12 } from './line-chart-12';
```

### src/content/components/line-charts/line-chart-01.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { LineChart } from '@/components/LineChart';

const data = [
  //array-start
  {
    date: 'Jan 23',
    Organic: 232,
    Sponsored: 0,
    Affiliate: 49,
  },
  {
    date: 'Feb 23',
    Organic: 241,
    Sponsored: 0,
    Affiliate: 61,
  },
  {
    date: 'Mar 23',
    Organic: 291,
    Sponsored: 0,
    Affiliate: 55,
  },
  {
    date: 'Apr 23',
    Organic: 101,
    Sponsored: 0,
    Affiliate: 21,
  },
  {
    date: 'May 23',
    Organic: 318,
    Sponsored: 0,
    Affiliate: 66,
  },
  {
    date: 'Jun 23',
    Organic: 205,
    Sponsored: 0,
    Affiliate: 69,
  },
  {
    date: 'Jul 23',
    Organic: 372,
    Sponsored: 0,
    Affiliate: 55,
  },
  {
    date: 'Aug 23',
    Organic: 341,
    Sponsored: 0,
    Affiliate: 74,
  },
  {
    date: 'Sep 23',
    Organic: 387,
    Sponsored: 120,
    Affiliate: 190,
  },
  {
    date: 'Oct 23',
    Organic: 220,
    Sponsored: 0,
    Affiliate: 89,
  },
  {
    date: 'Nov 23',
    Organic: 372,
    Sponsored: 0,
    Affiliate: 44,
  },
  {
    date: 'Dec 23',
    Organic: 321,
    Sponsored: 0,
    Affiliate: 93,
  },
  //array-end
];

const summary = [
  //array-start
  {
    name: 'Organic',
    value: 3273,
  },
  {
    name: 'Sponsored',
    value: 120,
  },
  {
    name: 'Affiliate',
    value: 866,
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

type Status = 'Organic' | 'Sponsored' | 'Affiliate';

const statusColor: Record<Status, string> = {
  Organic: 'bg-blue-500 dark:bg-blue-500',
  Sponsored: 'bg-violet-500 dark:bg-violet-500',
  Affiliate: 'bg-fuchsia-500 dark:bg-fuchsia-500',
};

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-md">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
          Units sold by channel
        </h3>
        <LineChart
          data={data}
          index="date"
          categories={['Organic', 'Sponsored', 'Affiliate']}
          colors={['blue', 'violet', 'fuchsia']}
          valueFormatter={valueFormatter}
          showLegend={false}
          showYAxis={false}
          startEndOnly={true}
          className="mt-6 !h-32"
        />
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
        >
          {summary.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between py-2.5"
            >
              <div className="flex items-center space-x-2">
                <span
                  className={cx(
                    statusColor[item.name as Status],
                    'h-[3px] w-3.5 shrink-0 rounded-full',
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
      </Card>
    </div>
  );
}
```

### src/content/components/line-charts/line-chart-02.tsx

```tsx
'use client';

import { Card } from '@/components/Card';
import { LineChart } from '@/components/LineChart';

const data = [
  //array-start
  { date: 'Aug 01', price: 21.2 },
  { date: 'Aug 02', price: 29.0 },
  { date: 'Aug 03', price: 48.5 },
  { date: 'Aug 04', price: 53.8 },
  { date: 'Aug 05', price: 57.7 },
  { date: 'Aug 06', price: 59.9 },
  { date: 'Aug 07', price: 41.4 },
  { date: 'Aug 08', price: 60.2 },
  { date: 'Aug 09', price: 62.8 },
  { date: 'Aug 10', price: 62.5 },
  { date: 'Aug 11', price: 63.6 },
  { date: 'Aug 12', price: 64.4 },
  { date: 'Aug 13', price: 65.1 },
  { date: 'Aug 14', price: 66.4 },
  { date: 'Aug 15', price: 71.6 },
  { date: 'Aug 16', price: 79.5 },
  { date: 'Aug 17', price: 102.8 },
  { date: 'Aug 18', price: 103.2 },
  { date: 'Aug 19', price: 105.4 },
  { date: 'Aug 20', price: 110.9 },
  { date: 'Aug 21', price: 67.7 },
  { date: 'Aug 22', price: 69.8 },
  { date: 'Aug 23', price: 79.5 },
  { date: 'Aug 24', price: 90.0 },
  { date: 'Aug 25', price: 91.2 },
  { date: 'Aug 26', price: 95.1 },
  { date: 'Aug 27', price: 99.8 },
  { date: 'Aug 28', price: 100.6 },
  { date: 'Aug 29', price: 102.8 },
  { date: 'Aug 30', price: 100.5 },
  { date: 'Aug 31', price: 111.6 },
  { date: 'Sep 01', price: 123.2 },
  { date: 'Sep 02', price: 125.8 },
  { date: 'Sep 03', price: 120.4 },
  { date: 'Sep 04', price: 121.9 },
  { date: 'Sep 05', price: 124.5 },
  { date: 'Sep 06', price: 127.7 },
  { date: 'Sep 07', price: 129.2 },
  { date: 'Sep 08', price: 130.8 },
  { date: 'Sep 09', price: 134.4 },
  { date: 'Sep 10', price: 136.0 },
  { date: 'Sep 11', price: 137.5 },
  { date: 'Sep 12', price: 131.1 },
  { date: 'Sep 13', price: 128.6 },
  { date: 'Sep 14', price: 124.2 },
  { date: 'Sep 15', price: 120.8 },
  { date: 'Sep 16', price: 118.3 },
  { date: 'Sep 17', price: 101.9 },
  { date: 'Sep 18', price: 121.5 },
  { date: 'Sep 19', price: 129.1 },
  { date: 'Sep 20', price: 131.6 },
  { date: 'Sep 21', price: 141.2 },
  { date: 'Sep 22', price: 142.8 },
  { date: 'Sep 23', price: 143.3 },
  { date: 'Sep 24', price: 149.9 },
  { date: 'Sep 25', price: 159.5 },
  { date: 'Sep 26', price: 173.3 },
  //array-end
];

const summary = [
  //array-start
  {
    name: 'Open',
    value: '$153.56',
  },
  {
    name: 'High',
    value: '$154.78',
  },
  {
    name: 'Volume',
    value: '$48,14M',
  },
  {
    name: 'Low',
    value: '$179.12',
  },
  {
    name: 'Close',
    value: '$173.34',
  },
  {
    name: 'Market Cap',
    value: '$1,58B',
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-lg">
        <h3 className="text-sm text-gray-500 dark:text-gray-500">
          Amazon, Inc. (AMZN)
        </h3>
        <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-50">
          $173.30
        </p>
        <p className="mt-1 text-sm font-medium">
          <span className="text-emerald-700 dark:text-emerald-500">
            +$9.30 (8.6%)
          </span>{' '}
          <span className="font-normal text-gray-500 dark:text-gray-500">
            Past 24 hours
          </span>
        </p>
        <LineChart
          data={data}
          index="date"
          categories={['price']}
          valueFormatter={valueFormatter}
          showLegend={false}
          showYAxis={false}
          className="mt-6 !h-48"
        />
        <div className="justify-betwee mt-4 flex gap-6">
          <ul
            role="list"
            className="mt-2 w-full divide-y divide-gray-200 truncate text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
          >
            {summary.slice(0, 3).map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between py-2.5"
              >
                <span className="truncate">{item.name}</span>
                <span className="font-medium text-gray-900 dark:text-gray-50">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
          <ul
            role="list"
            className="mt-2 w-full divide-y divide-gray-200 truncate text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
          >
            {summary.slice(3, 6).map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between py-2.5"
              >
                <span className="truncate">{item.name}</span>
                <span className="font-medium text-gray-900 dark:text-gray-50">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
```

### src/content/components/line-charts/line-chart-03.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { LineChart } from '@/components/LineChart';

const data = [
  //array-start
  {
    date: 'Jan 23',
    Munich: 42340,
    Zurich: 22320,
    Vienna: 12410,
  },
  {
    date: 'Feb 23',
    Munich: 50120,
    Zurich: 32310,
    Vienna: 10300,
  },
  {
    date: 'Mar 23',
    Munich: 45190,
    Zurich: 23450,
    Vienna: 10900,
  },
  {
    date: 'Apr 23',
    Munich: 56420,
    Zurich: 13400,
    Vienna: 7900,
  },
  {
    date: 'May 23',
    Munich: 40420,
    Zurich: 16400,
    Vienna: 12310,
  },
  {
    date: 'Jun 23',
    Munich: 47010,
    Zurich: 18350,
    Vienna: 10250,
  },
  {
    date: 'Jul 23',
    Munich: 47490,
    Zurich: 19950,
    Vienna: 12650,
  },
  {
    date: 'Aug 23',
    Munich: 39610,
    Zurich: 10910,
    Vienna: 4650,
  },
  {
    date: 'Sep 23',
    Munich: 45860,
    Zurich: 24740,
    Vienna: 12650,
  },
  {
    date: 'Oct 23',
    Munich: 50910,
    Zurich: 15740,
    Vienna: 10430,
  },
  {
    date: 'Nov 23',
    Munich: 4919,
    Zurich: 2874,
    Vienna: 2081,
  },
  {
    date: 'Dec 23',
    Munich: 5519,
    Zurich: 2274,
    Vienna: 1479,
  },
  //array-end
];

const summary = [
  //array-start
  {
    location: 'Munich',
    address: 'Maximilianstrasse',
    color: 'bg-blue-500 dark:bg-blue-500',
    type: 'Flagship',
    total: '$460.2K',
    change: '+0.7%',
    changeType: 'positive',
  },
  {
    location: 'Zurich',
    address: 'Bahnhofstrasse',
    color: 'bg-violet-500 dark:bg-violet-500',
    type: 'In-Store',
    total: '$237.3K',
    change: '-1.2%',
    changeType: 'negative',
  },
  {
    location: 'Vienna',
    address: 'Stephansplatz',
    color: 'bg-fuchsia-500 dark:bg-fuchsia-500',
    type: 'In-Store',
    total: '$118.2K',
    change: '+4.6%',
    changeType: 'positive',
  },
  //array-end
];

const currencyFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="sm:mx-auto sm:max-w-lg">
        <h4 className="text-sm text-gray-500 dark:text-gray-500">Revenue</h4>
        <p className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
          $815,700
        </p>
        <LineChart
          data={data}
          index="date"
          categories={['Munich', 'Zurich', 'Vienna']}
          colors={['blue', 'violet', 'fuchsia']}
          showLegend={false}
          showYAxis={false}
          valueFormatter={currencyFormatter}
          className="mt-5 hidden !h-44 sm:block"
        />
        <LineChart
          data={data}
          index="date"
          categories={['Munich', 'Zurich', 'Vienna']}
          colors={['blue', 'violet', 'fuchsia']}
          showLegend={false}
          startEndOnly={true}
          showYAxis={false}
          valueFormatter={currencyFormatter}
          className="mt-5 !h-44 sm:hidden"
        />
        <ul className="mt-4 w-full divide-y divide-gray-200 truncate text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500">
          {summary.map((item) => (
            <li
              key={item.location}
              className="flex items-center justify-between py-2.5"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={cx(
                      item.color,
                      'h-[3px] w-3.5 shrink-0 rounded-full',
                    )}
                    aria-hidden={true}
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    {item.location}
                  </span>
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-400/10 dark:text-gray-400">
                    {item.type}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {item.address}
                </span>
              </div>
              <div className="text-right">
                <p
                  className={cx(
                    item.changeType === 'positive'
                      ? 'text-emerald-700 dark:text-emerald-500'
                      : 'text-red-700 dark:text-red-500',
                    'text-sm font-medium',
                  )}
                >
                  {item.change}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {item.total}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
```

### src/content/components/line-charts/line-chart-04.tsx

```tsx
'use client';

// Add this custom Color to your chartUtils.ts file
// lightGray: {
//   bg: 'bg-gray-300 dark:bg-gray-700',
//   stroke: 'stroke-gray-300 dark:stroke-gray-700',
//   fill: 'fill-gray-300 dark:fill-gray-700',
//   text: 'text-gray-300 dark:text-gray-700',
// },
import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import {
  CartesianGrid,
  Dot,
  Label,
  Line,
  Legend as RechartsLegend,
  LineChart as RechartsLineChart,
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

import { Card } from '@/components/Card';

// Tremor LineChart [v0.3.1]

//array-start

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
    const legendPayload = payload.filter((item: any) => item.type !== 'none');
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
          {legendPayload.map(({ value, category, color }, index) => (
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

//#region LineChart

interface ActiveDot {
  index?: number;
  dataKey?: string;
}

type BaseEventProps = {
  eventType: 'dot' | 'category';
  categoryClicked: string;
  [key: string]: number | string;
};

type LineChartEventProps = BaseEventProps | null | undefined;

interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
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
  onValueChange?: (value: LineChartEventProps) => void;
  enableLegendSlider?: boolean;
  tickGap?: number;
  connectNulls?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  legendPosition?: 'left' | 'center' | 'right';
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  customTooltip?: React.ComponentType<TooltipProps>;
  highlightLastIndexCategory?: string;
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
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
      legendPosition = 'right',
      tooltipCallback,
      customTooltip,
      highlightLastIndexCategory,
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
    const prevActiveRef = React.useRef<boolean | undefined>(undefined);
    const prevLabelRef = React.useRef<string | undefined>(undefined);

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

    function getLastValidIndexForCategory(
      data: Record<string, any>[],
      category: string,
    ): number {
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i][category] !== null && data[i][category] !== undefined) {
          return i;
        }
      }
      return -1;
    }

    return (
      <div ref={ref} className={cx('h-80 w-full', className)} {...other}>
        <ResponsiveContainer>
          <RechartsLineChart
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
              top: 5,
            }}
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
              tickLine={false}
              type="number"
              domain={yAxisDomain as AxisDomain}
              tick={{ transform: 'translate(-3, 0)' }}
              fill=""
              stroke=""
              className={cx(
                // base
                'text-xs',
                // text fill
                'fill-gray-500 dark:fill-gray-500',
              )}
              tickFormatter={valueFormatter}
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
              const lastValidIndex = getLastValidIndexForCategory(
                data,
                category,
              );
              return (
                <Line
                  className={cx(
                    getColorClassName(
                      categoryColors.get(category) as AvailableChartColorsKeys,
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
                      highlightLastIndexCategory === dataKey &&
                      index === lastValidIndex
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
                />
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
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

LineChart.displayName = 'LineChart';

//array-end

type DataPoint = {
  date: string;
  currentMonth: number | null;
  lastMonth: number | null;
};

const data: DataPoint[] = [
  { date: 'Jun 01', currentMonth: 4837, lastMonth: 1492 },
  { date: 'Jun 02', currentMonth: 503, lastMonth: 1738 },
  { date: 'Jun 03', currentMonth: 2341, lastMonth: 56 },
  { date: 'Jun 04', currentMonth: 1089, lastMonth: 87 },
  { date: 'Jun 05', currentMonth: 578, lastMonth: 15 },
  { date: 'Jun 06', currentMonth: 312, lastMonth: 2301 },
  { date: 'Jun 07', currentMonth: 9695, lastMonth: 5124 },
  { date: 'Jun 08', currentMonth: 12451, lastMonth: 9398 },
  { date: 'Jun 09', currentMonth: 2784, lastMonth: 4267 },
  { date: 'Jun 10', currentMonth: 569, lastMonth: 1509 },
  { date: 'Jun 11', currentMonth: 906, lastMonth: 1356 },
  { date: 'Jun 12', currentMonth: 4738, lastMonth: 671 },
  { date: 'Jun 13', currentMonth: 4012, lastMonth: 483 },
  { date: 'Jun 14', currentMonth: 2845, lastMonth: 729 },
  { date: 'Jun 15', currentMonth: 3167, lastMonth: 2594 },
  { date: 'Jun 16', currentMonth: 934, lastMonth: 11812 },
  { date: 'Jun 17', currentMonth: 256, lastMonth: 1778 },
  { date: 'Jun 18', currentMonth: 89, lastMonth: 14945 },
  { date: 'Jun 19', currentMonth: 312, lastMonth: 10803 },
  { date: 'Jun 20', currentMonth: 6278, lastMonth: 3067 },
  { date: 'Jun 21', currentMonth: 2729, lastMonth: 941 },
  { date: 'Jun 22', currentMonth: null, lastMonth: 184 },
  { date: 'Jun 23', currentMonth: null, lastMonth: 152 },
  { date: 'Jun 24', currentMonth: null, lastMonth: 5326 },
  { date: 'Jun 25', currentMonth: null, lastMonth: 2189 },
  { date: 'Jun 26', currentMonth: null, lastMonth: 11457 },
  { date: 'Jun 27', currentMonth: null, lastMonth: 3295 },
  { date: 'Jun 28', currentMonth: null, lastMonth: 1581 },
  { date: 'Jun 29', currentMonth: null, lastMonth: 2423 },
  { date: 'Jun 30', currentMonth: null, lastMonth: 678 },
];

const calculateCumulativeData = (data: DataPoint[]): DataPoint[] => {
  let cumulativeCurrentMonth = 0;
  let cumulativeLastMonth = 0;
  let lastValidCurrentMonth: number | null = null;

  return data.map((point) => {
    if (point.currentMonth !== null) {
      cumulativeCurrentMonth += point.currentMonth;
      lastValidCurrentMonth = cumulativeCurrentMonth;
    }
    cumulativeLastMonth += point.lastMonth || 0;

    return {
      date: point.date,
      currentMonth: point.currentMonth !== null ? lastValidCurrentMonth : null,
      lastMonth: cumulativeLastMonth,
    };
  });
};

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

export default function Example() {
  const cumulativeData = React.useMemo(
    () => calculateCumulativeData(data),
    [data],
  );

  return (
    <div className="obfuscate">
      <p className="mb-4 text-center text-sm text-gray-500 dark:text-gray-500">
        Customized chart using a month to date calculation
      </p>
      <Card className="mx-auto max-w-2xl">
        <LineChart
          data={cumulativeData}
          valueFormatter={(v) => currencyFormatter(v)}
          index="date"
          colors={['lightGray', 'blue']}
          categories={['lastMonth', 'currentMonth']}
          connectNulls={false}
          yAxisWidth={70}
          highlightLastIndexCategory="currentMonth"
          className="hidden sm:block"
        />
        <LineChart
          data={cumulativeData}
          valueFormatter={(v) => currencyFormatter(v)}
          index="date"
          colors={['lightGray', 'blue']}
          categories={['lastMonth', 'currentMonth']}
          connectNulls={false}
          showYAxis={false}
          highlightLastIndexCategory="currentMonth"
          className="block sm:hidden"
        />
      </Card>
    </div>
  );
}
```

### src/content/components/line-charts/line-chart-05.tsx

```tsx
'use client';

// Add this custom Color to your chartUtils.ts file
// lightGray: {
//   bg: 'bg-gray-300 dark:bg-gray-700',
//   stroke: 'stroke-gray-300 dark:stroke-gray-700',
//   fill: 'fill-gray-300 dark:fill-gray-700',
//   text: 'text-gray-300 dark:text-gray-700',
// },
import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import {
  CartesianGrid,
  Dot,
  Label,
  Line,
  Legend as RechartsLegend,
  LineChart as RechartsLineChart,
  ReferenceLine,
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

import { Card } from '@/components/Card';

// Tremor LineChart [v0.3.1]

//array-start

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
    const legendPayload = payload.filter((item: any) => item.type !== 'none');
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
          {legendPayload.map(({ value, category, color }, index) => (
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

//#region LineChart

interface ActiveDot {
  index?: number;
  dataKey?: string;
}

type BaseEventProps = {
  eventType: 'dot' | 'category';
  categoryClicked: string;
  [key: string]: number | string;
};

type LineChartEventProps = BaseEventProps | null | undefined;

interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
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
  onValueChange?: (value: LineChartEventProps) => void;
  enableLegendSlider?: boolean;
  tickGap?: number;
  connectNulls?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  legendPosition?: 'left' | 'center' | 'right';
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  customTooltip?: React.ComponentType<TooltipProps>;
  highlightLastIndexCategory?: string;
  referenceLine?: { value: number; label?: string };
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
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
      legendPosition = 'right',
      tooltipCallback,
      customTooltip,
      highlightLastIndexCategory,
      referenceLine,
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
    const prevActiveRef = React.useRef<boolean | undefined>(undefined);
    const prevLabelRef = React.useRef<string | undefined>(undefined);

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

    function getLastValidIndexForCategory(
      data: Record<string, any>[],
      category: string,
    ): number {
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i][category] !== null && data[i][category] !== undefined) {
          return i;
        }
      }
      return -1;
    }

    return (
      <div ref={ref} className={cx('h-80 w-full', className)} {...other}>
        <ResponsiveContainer>
          <RechartsLineChart
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
              top: 5,
            }}
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
              tickLine={false}
              type="number"
              domain={yAxisDomain as AxisDomain}
              tick={{ transform: 'translate(-3, 0)' }}
              fill=""
              stroke=""
              className={cx(
                // base
                'text-xs',
                // text fill
                'fill-gray-500 dark:fill-gray-500',
              )}
              tickFormatter={valueFormatter}
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
            {referenceLine ? (
              <ReferenceLine
                y={referenceLine.value}
                stroke=""
                strokeDasharray="6 6"
                strokeWidth={1}
                className="stroke-red-600 dark:stroke-red-500"
              >
                <Label
                  position="insideBottomLeft"
                  value={referenceLine.label}
                  className="fill-red-600 stroke-none text-xs dark:fill-red-500"
                  offset={10}
                  dy={0}
                />
              </ReferenceLine>
            ) : null}
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
              const lastValidIndex = getLastValidIndexForCategory(
                data,
                category,
              );
              return (
                <Line
                  className={cx(
                    getColorClassName(
                      categoryColors.get(category) as AvailableChartColorsKeys,
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
                      highlightLastIndexCategory === dataKey &&
                      index === lastValidIndex
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
                />
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
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

LineChart.displayName = 'LineChart';

//array-end

type DataPoint = {
  date: string;
  currentMonth: number | null;
  lastMonth: number | null;
};

const data: DataPoint[] = [
  { date: 'Jun 01', currentMonth: 4837, lastMonth: 1492 },
  { date: 'Jun 02', currentMonth: 503, lastMonth: 1738 },
  { date: 'Jun 03', currentMonth: 2341, lastMonth: 56 },
  { date: 'Jun 04', currentMonth: 1089, lastMonth: 87 },
  { date: 'Jun 05', currentMonth: 578, lastMonth: 15 },
  { date: 'Jun 06', currentMonth: 312, lastMonth: 2301 },
  { date: 'Jun 07', currentMonth: 9695, lastMonth: 5124 },
  { date: 'Jun 08', currentMonth: 12451, lastMonth: 9398 },
  { date: 'Jun 09', currentMonth: 2784, lastMonth: 4267 },
  { date: 'Jun 10', currentMonth: 569, lastMonth: 1509 },
  { date: 'Jun 11', currentMonth: 906, lastMonth: 1356 },
  { date: 'Jun 12', currentMonth: 4738, lastMonth: 671 },
  { date: 'Jun 13', currentMonth: 4012, lastMonth: 483 },
  { date: 'Jun 14', currentMonth: 2845, lastMonth: 729 },
  { date: 'Jun 15', currentMonth: 3167, lastMonth: 2594 },
  { date: 'Jun 16', currentMonth: 934, lastMonth: 11812 },
  { date: 'Jun 17', currentMonth: 256, lastMonth: 1778 },
  { date: 'Jun 18', currentMonth: 89, lastMonth: 14945 },
  { date: 'Jun 19', currentMonth: 312, lastMonth: 10803 },
  { date: 'Jun 20', currentMonth: 6278, lastMonth: 3067 },
  { date: 'Jun 21', currentMonth: 2729, lastMonth: 941 },
  { date: 'Jun 22', currentMonth: null, lastMonth: 184 },
  { date: 'Jun 23', currentMonth: null, lastMonth: 152 },
  { date: 'Jun 24', currentMonth: null, lastMonth: 5326 },
  { date: 'Jun 25', currentMonth: null, lastMonth: 2189 },
  { date: 'Jun 26', currentMonth: null, lastMonth: 11457 },
  { date: 'Jun 27', currentMonth: null, lastMonth: 3295 },
  { date: 'Jun 28', currentMonth: null, lastMonth: 1581 },
  { date: 'Jun 29', currentMonth: null, lastMonth: 2423 },
  { date: 'Jun 30', currentMonth: null, lastMonth: 678 },
];

const calculateCumulativeData = (data: DataPoint[]): DataPoint[] => {
  let cumulativeCurrentMonth = 0;
  let cumulativeLastMonth = 0;
  let lastValidCurrentMonth: number | null = null;

  return data.map((point) => {
    if (point.currentMonth !== null) {
      cumulativeCurrentMonth += point.currentMonth;
      lastValidCurrentMonth = cumulativeCurrentMonth;
    }
    cumulativeLastMonth += point.lastMonth || 0;

    return {
      date: point.date,
      currentMonth: point.currentMonth !== null ? lastValidCurrentMonth : null,
      lastMonth: cumulativeLastMonth,
    };
  });
};

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

export default function Example() {
  const companyLimit = 105_000; // Assuming a company limit of 100,000

  const cumulativeData = React.useMemo(
    () => calculateCumulativeData(data),
    [data],
  );

  return (
    <div className="obfuscate">
      <p className="mb-4 text-center text-sm text-gray-500 dark:text-gray-500">
        Customized chart using a month to date calculation
      </p>
      <Card className="mx-auto max-w-2xl">
        <LineChart
          referenceLine={{
            value: companyLimit,
            label: `Usage limit: ${currencyFormatter(companyLimit)}`,
          }}
          data={cumulativeData}
          valueFormatter={(v) => currencyFormatter(v)}
          index="date"
          colors={['lightGray', 'blue']}
          categories={['lastMonth', 'currentMonth']}
          connectNulls={false}
          yAxisWidth={70}
          highlightLastIndexCategory="currentMonth"
          className="hidden sm:block"
        />
        <LineChart
          referenceLine={{
            value: companyLimit,
            label: `Usage limit: ${currencyFormatter(companyLimit)}`,
          }}
          data={cumulativeData}
          valueFormatter={(v) => currencyFormatter(v)}
          index="date"
          colors={['lightGray', 'blue']}
          categories={['lastMonth', 'currentMonth']}
          connectNulls={false}
          showYAxis={false}
          highlightLastIndexCategory="currentMonth"
          className="block sm:hidden"
        />
      </Card>
    </div>
  );
}
```

### src/content/components/line-charts/line-chart-06.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { LineChart } from '@/components/LineChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

const data = [
  //array-start
  { date: 'Aug 01', 'Market Index': 44.1, Portfolio: 79.2 },
  { date: 'Aug 02', 'Market Index': 49.1, Portfolio: 89.1 },
  { date: 'Aug 03', 'Market Index': 61.2, Portfolio: 91.7 },
  { date: 'Aug 04', 'Market Index': 49.7, Portfolio: 74.4 },
  { date: 'Aug 05', 'Market Index': 71.1, Portfolio: 95.3 },
  { date: 'Aug 06', 'Market Index': 75.3, Portfolio: 99.4 },
  { date: 'Aug 07', 'Market Index': 74.1, Portfolio: 101.2 },
  { date: 'Aug 08', 'Market Index': 78.4, Portfolio: 102.2 },
  { date: 'Aug 09', 'Market Index': 81.1, Portfolio: 103.6 },
  { date: 'Aug 10', 'Market Index': 82.6, Portfolio: 104.4 },
  { date: 'Aug 11', 'Market Index': 89.3, Portfolio: 106.3 },
  { date: 'Aug 12', 'Market Index': 79.3, Portfolio: 109.5 },
  { date: 'Aug 13', 'Market Index': 78.6, Portfolio: 110.4 },
  { date: 'Aug 14', 'Market Index': 73.8, Portfolio: 113.5 },
  { date: 'Aug 15', 'Market Index': 69.7, Portfolio: 114.1 },
  { date: 'Aug 16', 'Market Index': 62.6, Portfolio: 121.4 },
  { date: 'Aug 17', 'Market Index': 59.3, Portfolio: 120.4 },
  { date: 'Aug 18', 'Market Index': 57.1, Portfolio: 110.7 },
  { date: 'Aug 19', 'Market Index': 55.1, Portfolio: 118.8 },
  { date: 'Aug 20', 'Market Index': 54.3, Portfolio: 123.1 },
  { date: 'Aug 21', 'Market Index': 53.2, Portfolio: 110.2 },
  { date: 'Aug 22', 'Market Index': 49.4, Portfolio: 101.2 },
  { date: 'Aug 23', 'Market Index': 48.1, Portfolio: 99.2 },
  { date: 'Aug 24', 'Market Index': 27.1, Portfolio: 105.8 },
  { date: 'Aug 25', 'Market Index': 21.0, Portfolio: 109.4 },
  { date: 'Aug 26', 'Market Index': 21.3, Portfolio: 110.1 },
  { date: 'Aug 27', 'Market Index': 21.8, Portfolio: 119.6 },
  { date: 'Aug 28', 'Market Index': 29.4, Portfolio: 121.3 },
  { date: 'Aug 29', 'Market Index': 32.4, Portfolio: 129.1 },
  { date: 'Aug 30', 'Market Index': 37.1, Portfolio: 134.5 },
  { date: 'Aug 31', 'Market Index': 41.3, Portfolio: 144.2 },
  { date: 'Sep 01', 'Market Index': 48.1, Portfolio: 145.1 },
  { date: 'Sep 02', 'Market Index': 51.3, Portfolio: 142.5 },
  { date: 'Sep 03', 'Market Index': 52.8, Portfolio: 140.9 },
  { date: 'Sep 04', 'Market Index': 54.4, Portfolio: 138.7 },
  { date: 'Sep 05', 'Market Index': 57.1, Portfolio: 135.2 },
  { date: 'Sep 06', 'Market Index': 67.9, Portfolio: 136.2 },
  { date: 'Sep 07', 'Market Index': 78.8, Portfolio: 136.2 },
  { date: 'Sep 08', 'Market Index': 89.2, Portfolio: 146.2 },
  { date: 'Sep 09', 'Market Index': 99.2, Portfolio: 145.2 },
  { date: 'Sep 10', 'Market Index': 101.2, Portfolio: 141.8 },
  { date: 'Sep 11', 'Market Index': 104.2, Portfolio: 132.2 },
  { date: 'Sep 12', 'Market Index': 109.8, Portfolio: 129.2 },
  { date: 'Sep 13', 'Market Index': 110.4, Portfolio: 120.3 },
  { date: 'Sep 14', 'Market Index': 111.3, Portfolio: 123.4 },
  { date: 'Sep 15', 'Market Index': 114.3, Portfolio: 137.4 },
  { date: 'Sep 16', 'Market Index': 105.1, Portfolio: 130.1 },
  { date: 'Sep 17', 'Market Index': 89.3, Portfolio: 131.8 },
  { date: 'Sep 18', 'Market Index': 102.1, Portfolio: 149.4 },
  { date: 'Sep 19', 'Market Index': 101.7, Portfolio: 149.3 },
  { date: 'Sep 20', 'Market Index': 121.3, Portfolio: 153.2 },
  { date: 'Sep 21', 'Market Index': 132.5, Portfolio: 157.2 },
  { date: 'Sep 22', 'Market Index': 121.4, Portfolio: 139.1 },
  { date: 'Sep 23', 'Market Index': 100.1, Portfolio: 120.2 },
  { date: 'Sep 24', 'Market Index': 89.1, Portfolio: 119.1 },
  { date: 'Sep 25', 'Market Index': 97.1, Portfolio: 112.2 },
  { date: 'Sep 26', 'Market Index': 109.4, Portfolio: 129.1 },
  //array-end
];

const summary = [
  //array-start
  {
    name: 'Portfolio value',
    value: '$37,081.89',
    changeType: null,
  },
  {
    name: 'Invested',
    value: '$19,698.65',
    changeType: null,
  },
  {
    name: 'Cashflow',
    value: '$20,033.74',
    changeType: null,
  },
  {
    name: 'Price gain',
    value: '+$15,012.39',
    changeType: 'positive',
  },
  {
    name: 'Realized',
    value: '+$177.4',
    changeType: 'positive',
  },
  {
    name: 'Dividends (gross)',
    value: '+$490.97',
    changeType: 'positive',
  },
  //array-end
];

const tabs = [
  //array-start
  {
    dataRange: data.slice(51, 57),
    name: 'Last 7d',
  },
  {
    dataRange: data.slice(28, 70),
    name: 'Last 30d',
  },
  {
    dataRange: data,
    name: 'Max.',
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="!p-0">
        <div className="p-6">
          <h3 className="text-sm text-gray-500 dark:text-gray-500">
            Portfolio performance
          </h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-50">
            $37,081.89
          </p>
          <p className="mt-1 text-sm font-medium">
            <span className="text-emerald-700 dark:text-emerald-500">
              +$430.90 (4.1%)
            </span>{' '}
            <span className="font-normal text-gray-500 dark:text-gray-500">
              Past 24 hours
            </span>
          </p>
        </div>
        <Tabs defaultValue={tabs[2].name}>
          <TabsList variant="line" className="px-6">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.name} value={tab.name}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-6 px-6">
            {tabs.map((tab) => (
              <TabsContent key={tab.name} value={tab.name}>
                <LineChart
                  data={tab.dataRange}
                  index="date"
                  categories={['Portfolio', 'Market Index']}
                  colors={['blue', 'cyan']}
                  valueFormatter={valueFormatter}
                  yAxisWidth={40}
                  tickGap={10}
                  showLegend={false}
                  className="hidden !h-72 sm:block"
                />
                <LineChart
                  data={tab.dataRange}
                  index="date"
                  categories={['Portfolio', 'Market Index']}
                  colors={['blue', 'cyan']}
                  valueFormatter={valueFormatter}
                  showYAxis={false}
                  showLegend={false}
                  startEndOnly={true}
                  className="!h-72 sm:hidden"
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>

        <div className="p-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Portfolio summary
          </h4>
          <div className="mt-4 sm:flex sm:items-center sm:gap-8">
            <ul
              role="list"
              className="w-full divide-y divide-gray-200 truncate text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
            >
              {summary.slice(0, 3).map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between py-2.5"
                >
                  <span>{item.name}</span>
                  <span className="font-medium text-gray-900 dark:text-gray-50">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
            <ul
              role="list"
              className="mt-4 w-full divide-y divide-gray-200 truncate text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500 sm:mt-0"
            >
              {summary.slice(3, 6).map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between py-2.5"
                >
                  <span>{item.name}</span>
                  <span
                    className={cx(
                      item.changeType === 'positive'
                        ? 'text-emerald-700 dark:text-emerald-500'
                        : 'text-red-700 dark:text-red-500',
                      'font-medium',
                    )}
                  >
                    {item.value}
                  </span>
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

### src/content/components/line-charts/line-chart-07.tsx

```tsx
'use client';

import { RiAddFill } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { LineChart } from '@/components/LineChart';

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
    value: '$17,349.30',
    bgColor: 'bg-blue-500 dark:bg-blue-500',
  },
  {
    name: 'Vitainvest Core',
    value: '$10,943.40',
    bgColor: 'bg-violet-500 dark:bg-violet-500',
  },
  {
    name: 'iShares Tech Growth',
    value: '$3,935.10',
    bgColor: 'bg-fuchsia-500 dark:bg-fuchsia-500',
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <Card>
        <h3 className="font-medium text-gray-900 dark:text-gray-50">
          ETF performance comparison
        </h3>
        <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-3">
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
              yAxisWidth={55}
              showLegend={false}
              className="hidden !h-72 sm:block"
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
              className="!h-72 sm:hidden"
            />
          </div>
          <div className="md:col-span-1">
            <ul role="list" className="space-y-6">
              {summary.map((item) => (
                <li key={item.name} className="flex space-x-3">
                  <span
                    className={cx(item.bgColor, 'w-1 shrink-0 rounded')}
                    aria-hidden={true}
                  />
                  <div className="flex w-full items-center justify-between md:block">
                    <p className="order-last font-semibold text-gray-900 dark:text-gray-50">
                      {item.value}
                    </p>
                    <p className="order-first whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                      {item.name}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-1.5 whitespace-nowrap py-2 text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-600"
            >
              <RiAddFill className="size-5 shrink-0" aria-hidden={true} />
              Compare asset
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

### src/content/components/line-charts/line-chart-08.tsx

```tsx
'use client';

import { RiAddFill } from '@remixicon/react';

import { cx } from '@/lib/utils';

import { Card } from '@/components/Card';
import { LineChart } from '@/components/LineChart';

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
    value: '$17,349.30',
    bgColor: 'bg-blue-500 dark:bg-blue-500',
  },
  {
    name: 'Vitainvest Core',
    value: '$10,943.40',
    bgColor: 'bg-violet-500 dark:bg-violet-500',
  },
  {
    name: 'iShares Tech Growth',
    value: '$3,935.10',
    bgColor: 'bg-fuchsia-500 dark:bg-fuchsia-500',
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <h3 className="font-medium text-gray-900 dark:text-gray-50">
        ETF performance comparison
      </h3>
      <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
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
            yAxisWidth={55}
            showLegend={false}
            className="hidden !h-72 sm:block"
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
            className="!h-72 sm:hidden"
          />
        </Card>
        <Card className="lg:col-span-1">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-800"
          >
            {summary.map((item) => (
              <li
                key={item.name}
                className="flex space-x-3 py-4 first:py-0 first:pb-4"
              >
                <span
                  className={cx(item.bgColor, 'w-1 shrink-0 rounded')}
                  aria-hidden={true}
                />
                <div className="flex w-full items-center justify-between space-x-4 truncate">
                  <p className="truncate text-sm text-gray-500 dark:text-gray-500">
                    {item.name}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-50">
                    {item.value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-1.5 whitespace-nowrap py-2 text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-600"
          >
            <RiAddFill className="size-5 shrink-0" aria-hidden={true} />
            Compare asset
          </button>
        </Card>
      </div>
    </div>
  );
}
```

### src/content/components/line-charts/line-chart-09.tsx

```tsx
'use client';

import React from 'react';

import { Button } from '@/components/Button';
import { DateRange, DateRangePicker } from '@/components/DatePicker';
import { LineChart } from '@/components/LineChart';

DateRangePicker;

const data = [
  //array-start
  {
    date: '2023-08-01',
    'ETF Shares Vital': 2100.2,
    'Vitainvest Core': 4434.1,
    'iShares Tech Growth': 7943.2,
  },
  {
    date: '2023-08-02',
    'ETF Shares Vital': 2943.0,
    'Vitainvest Core': 4954.1,
    'iShares Tech Growth': 8954.1,
  },
  {
    date: '2023-08-03',
    'ETF Shares Vital': 4889.5,
    'Vitainvest Core': 6100.2,
    'iShares Tech Growth': 9123.7,
  },
  {
    date: '2023-08-04',
    'ETF Shares Vital': 3909.8,
    'Vitainvest Core': 4909.7,
    'iShares Tech Growth': 7478.4,
  },
  {
    date: '2023-08-05',
    'ETF Shares Vital': 5778.7,
    'Vitainvest Core': 7103.1,
    'iShares Tech Growth': 9504.3,
  },
  {
    date: '2023-08-06',
    'ETF Shares Vital': 5900.9,
    'Vitainvest Core': 7534.3,
    'iShares Tech Growth': 9943.4,
  },
  {
    date: '2023-08-07',
    'ETF Shares Vital': 4129.4,
    'Vitainvest Core': 7412.1,
    'iShares Tech Growth': 10112.2,
  },
  {
    date: '2023-08-08',
    'ETF Shares Vital': 6021.2,
    'Vitainvest Core': 7834.4,
    'iShares Tech Growth': 10290.2,
  },
  {
    date: '2023-08-09',
    'ETF Shares Vital': 6279.8,
    'Vitainvest Core': 8159.1,
    'iShares Tech Growth': 10349.6,
  },
  {
    date: '2023-08-10',
    'ETF Shares Vital': 6224.5,
    'Vitainvest Core': 8260.6,
    'iShares Tech Growth': 10415.4,
  },
  {
    date: '2023-08-11',
    'ETF Shares Vital': 6380.6,
    'Vitainvest Core': 8965.3,
    'iShares Tech Growth': 10636.3,
  },
  {
    date: '2023-08-12',
    'ETF Shares Vital': 6414.4,
    'Vitainvest Core': 7989.3,
    'iShares Tech Growth': 10900.5,
  },
  {
    date: '2023-08-13',
    'ETF Shares Vital': 6540.1,
    'Vitainvest Core': 7839.6,
    'iShares Tech Growth': 11040.4,
  },
  {
    date: '2023-08-14',
    'ETF Shares Vital': 6634.4,
    'Vitainvest Core': 7343.8,
    'iShares Tech Growth': 11390.5,
  },
  {
    date: '2023-08-15',
    'ETF Shares Vital': 7124.6,
    'Vitainvest Core': 6903.7,
    'iShares Tech Growth': 11423.1,
  },
  {
    date: '2023-08-16',
    'ETF Shares Vital': 7934.5,
    'Vitainvest Core': 6273.6,
    'iShares Tech Growth': 12134.4,
  },
  {
    date: '2023-08-17',
    'ETF Shares Vital': 10287.8,
    'Vitainvest Core': 5900.3,
    'iShares Tech Growth': 12034.4,
  },
  {
    date: '2023-08-18',
    'ETF Shares Vital': 10323.2,
    'Vitainvest Core': 5732.1,
    'iShares Tech Growth': 11011.7,
  },
  {
    date: '2023-08-19',
    'ETF Shares Vital': 10511.4,
    'Vitainvest Core': 5523.1,
    'iShares Tech Growth': 11834.8,
  },
  {
    date: '2023-08-20',
    'ETF Shares Vital': 11043.9,
    'Vitainvest Core': 5422.3,
    'iShares Tech Growth': 12387.1,
  },
  {
    date: '2023-08-21',
    'ETF Shares Vital': 6700.7,
    'Vitainvest Core': 5334.2,
    'iShares Tech Growth': 11032.2,
  },
  {
    date: '2023-08-22',
    'ETF Shares Vital': 6900.8,
    'Vitainvest Core': 4943.4,
    'iShares Tech Growth': 10134.2,
  },
  {
    date: '2023-08-23',
    'ETF Shares Vital': 7934.5,
    'Vitainvest Core': 4812.1,
    'iShares Tech Growth': 9921.2,
  },
  {
    date: '2023-08-24',
    'ETF Shares Vital': 9021.0,
    'Vitainvest Core': 2729.1,
    'iShares Tech Growth': 10549.8,
  },
  {
    date: '2023-08-25',
    'ETF Shares Vital': 9198.2,
    'Vitainvest Core': 2178.0,
    'iShares Tech Growth': 10968.4,
  },
  {
    date: '2023-08-26',
    'ETF Shares Vital': 9557.1,
    'Vitainvest Core': 2158.3,
    'iShares Tech Growth': 11059.1,
  },
  {
    date: '2023-08-27',
    'ETF Shares Vital': 9959.8,
    'Vitainvest Core': 2100.8,
    'iShares Tech Growth': 11903.6,
  },
  {
    date: '2023-08-28',
    'ETF Shares Vital': 10034.6,
    'Vitainvest Core': 2934.4,
    'iShares Tech Growth': 12143.3,
  },
  {
    date: '2023-08-29',
    'ETF Shares Vital': 10243.8,
    'Vitainvest Core': 3223.4,
    'iShares Tech Growth': 12930.1,
  },
  {
    date: '2023-08-30',
    'ETF Shares Vital': 10078.5,
    'Vitainvest Core': 3779.1,
    'iShares Tech Growth': 13420.5,
  },
  {
    date: '2023-08-31',
    'ETF Shares Vital': 11134.6,
    'Vitainvest Core': 4190.3,
    'iShares Tech Growth': 14443.2,
  },
  {
    date: '2023-09-01',
    'ETF Shares Vital': 12347.2,
    'Vitainvest Core': 4839.1,
    'iShares Tech Growth': 14532.1,
  },
  {
    date: '2023-09-02',
    'ETF Shares Vital': 12593.8,
    'Vitainvest Core': 5153.3,
    'iShares Tech Growth': 14283.5,
  },
  {
    date: '2023-09-03',
    'ETF Shares Vital': 12043.4,
    'Vitainvest Core': 5234.8,
    'iShares Tech Growth': 14078.9,
  },
  {
    date: '2023-09-04',
    'ETF Shares Vital': 12144.9,
    'Vitainvest Core': 5478.4,
    'iShares Tech Growth': 13859.7,
  },
  {
    date: '2023-09-05',
    'ETF Shares Vital': 12489.5,
    'Vitainvest Core': 5741.1,
    'iShares Tech Growth': 13539.2,
  },
  {
    date: '2023-09-06',
    'ETF Shares Vital': 12748.7,
    'Vitainvest Core': 6743.9,
    'iShares Tech Growth': 13643.2,
  },
  {
    date: '2023-09-07',
    'ETF Shares Vital': 12933.2,
    'Vitainvest Core': 7832.8,
    'iShares Tech Growth': 14629.2,
  },
  {
    date: '2023-09-08',
    'ETF Shares Vital': 13028.8,
    'Vitainvest Core': 8943.2,
    'iShares Tech Growth': 13611.2,
  },
  {
    date: '2023-09-09',
    'ETF Shares Vital': 13412.4,
    'Vitainvest Core': 9932.2,
    'iShares Tech Growth': 12515.2,
  },
  {
    date: '2023-09-10',
    'ETF Shares Vital': 13649.0,
    'Vitainvest Core': 10139.2,
    'iShares Tech Growth': 11143.8,
  },
  {
    date: '2023-09-11',
    'ETF Shares Vital': 13748.5,
    'Vitainvest Core': 10441.2,
    'iShares Tech Growth': 8929.2,
  },
  {
    date: '2023-09-12',
    'ETF Shares Vital': 13148.1,
    'Vitainvest Core': 10933.8,
    'iShares Tech Growth': 8943.2,
  },
  {
    date: '2023-09-13',
    'ETF Shares Vital': 12839.6,
    'Vitainvest Core': 11073.4,
    'iShares Tech Growth': 7938.3,
  },
  {
    date: '2023-09-14',
    'ETF Shares Vital': 12428.2,
    'Vitainvest Core': 11128.3,
    'iShares Tech Growth': 7533.4,
  },
  {
    date: '2023-09-15',
    'ETF Shares Vital': 12012.8,
    'Vitainvest Core': 11412.3,
    'iShares Tech Growth': 7100.4,
  },
  {
    date: '2023-09-16',
    'ETF Shares Vital': 11801.3,
    'Vitainvest Core': 10501.1,
    'iShares Tech Growth': 6532.1,
  },
  {
    date: '2023-09-17',
    'ETF Shares Vital': 10102.9,
    'Vitainvest Core': 8923.3,
    'iShares Tech Growth': 4332.8,
  },
  {
    date: '2023-09-18',
    'ETF Shares Vital': 12132.5,
    'Vitainvest Core': 10212.1,
    'iShares Tech Growth': 7847.4,
  },
  {
    date: '2023-09-19',
    'ETF Shares Vital': 12901.1,
    'Vitainvest Core': 10101.7,
    'iShares Tech Growth': 7223.3,
  },
  {
    date: '2023-09-20',
    'ETF Shares Vital': 13132.6,
    'Vitainvest Core': 12132.3,
    'iShares Tech Growth': 6900.2,
  },
  {
    date: '2023-09-21',
    'ETF Shares Vital': 14132.2,
    'Vitainvest Core': 13212.5,
    'iShares Tech Growth': 5932.2,
  },
  {
    date: '2023-09-22',
    'ETF Shares Vital': 14245.8,
    'Vitainvest Core': 12163.4,
    'iShares Tech Growth': 5577.1,
  },
  {
    date: '2023-09-23',
    'ETF Shares Vital': 14328.3,
    'Vitainvest Core': 10036.1,
    'iShares Tech Growth': 5439.2,
  },
  {
    date: '2023-09-24',
    'ETF Shares Vital': 14949.9,
    'Vitainvest Core': 8985.1,
    'iShares Tech Growth': 4463.1,
  },
  {
    date: '2023-09-25',
    'ETF Shares Vital': 15967.5,
    'Vitainvest Core': 9700.1,
    'iShares Tech Growth': 4123.2,
  },
  {
    date: '2023-09-26',
    'ETF Shares Vital': 17349.3,
    'Vitainvest Core': 10943.4,
    'iShares Tech Growth': 3935.1,
  },
  //array-end
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

const firstAvailableDate = new Date(2023, 7, 1);
const lastAvailableDate = new Date(2023, 8, 26);

export default function Example() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: firstAvailableDate,
    to: lastAvailableDate,
  });

  const filterData = (
    startDate: Date | undefined,
    endDate: Date | undefined,
    dataset: any[],
  ) => {
    if (!startDate || !endDate) {
      return dataset;
    }

    const isDateInRange = (currentDate: Date) =>
      currentDate >= startDate && currentDate <= endDate;

    return dataset.filter((item) => isDateInRange(new Date(item.date)));
  };

  return (
    <div className="obfuscate">
      <h3 className="font-medium text-gray-900 dark:text-gray-50">
        ETF performance comparison
      </h3>
      <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt.
      </p>
      <div className="mt-4 rounded-lg bg-gray-50 p-4 ring-1 ring-inset ring-gray-200 dark:bg-gray-900 dark:ring-gray-800 sm:p-6">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
          Filterbar
        </p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button className="w-full py-2 sm:w-fit">Compare asset</Button>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              fromDate={firstAvailableDate}
              toDate={lastAvailableDate}
            />
          </div>
          <Button
            variant="ghost"
            className="border border-gray-300 py-2 text-gray-600 hover:bg-transparent hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 hover:dark:bg-transparent hover:dark:text-gray-50 md:border-transparent md:dark:border-transparent"
            onClick={() =>
              setDateRange({
                from: firstAvailableDate,
                to: lastAvailableDate,
              })
            }
          >
            Reset datepicker
          </Button>
        </div>
      </div>
      <LineChart
        data={filterData(dateRange?.from, dateRange?.to, data)}
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
        className="mt-8 hidden !h-96 sm:block"
      />
      <LineChart
        data={filterData(dateRange?.from, dateRange?.to, data)}
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
        className="mt-8 !h-72 sm:hidden"
      />
    </div>
  );
}
```

### src/content/components/line-charts/line-chart-10.tsx

```tsx
'use client';

import { RiDownload2Line } from '@remixicon/react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { LineChart } from '@/components/LineChart';
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
    date: 'Jan 22',
    MRR: 2100,
    'Active subscribers': 434,
    'Net volume': 7943,
    'Churned revenue': 0,
  },
  {
    date: 'Feb 22',
    MRR: 2943,
    'Active subscribers': 454,
    'Net volume': 8954,
    'Churned revenue': 0,
  },
  {
    date: 'Mar 22',
    MRR: 4889,
    'Active subscribers': 610,
    'Net volume': 9123,
    'Churned revenue': 0,
  },
  {
    date: 'Apr 22',
    MRR: 3909,
    'Active subscribers': 490,
    'Net volume': 7478,
    'Churned revenue': 0,
  },
  {
    date: 'May 22',
    MRR: 5778,
    'Active subscribers': 710,
    'Net volume': 9504,
    'Churned revenue': 0,
  },
  {
    date: 'Jun 22',
    MRR: 5900,
    'Active subscribers': 753,
    'Net volume': 9943,
    'Churned revenue': 0,
  },
  {
    date: 'Jul 22',
    MRR: 4129,
    'Active subscribers': 741,
    'Net volume': 10112,
    'Churned revenue': 0,
  },
  {
    date: 'Aug 22',
    MRR: 6021,
    'Active subscribers': 783,
    'Net volume': 10290,
    'Churned revenue': 0,
  },
  {
    date: 'Sep 22',
    MRR: 6279,
    'Active subscribers': 815,
    'Net volume': 10349,
    'Churned revenue': 0,
  },
  {
    date: 'Oct 22',
    MRR: 6224,
    'Active subscribers': 826,
    'Net volume': 10415,
    'Churned revenue': 0,
  },
  {
    date: 'Nov 22',
    MRR: 6380,
    'Active subscribers': 896,
    'Net volume': 10636,
    'Churned revenue': 0,
  },
  {
    date: 'Dec 22',
    MRR: 6414,
    'Active subscribers': 798,
    'Net volume': 10900,
    'Churned revenue': 0,
  },
  {
    date: 'Jan 23',
    MRR: 6540,
    'Active subscribers': 783,
    'Net volume': 11040,
    'Churned revenue': 120,
  },
  {
    date: 'Feb 23',
    MRR: 6634,
    'Active subscribers': 734,
    'Net volume': 11390,
    'Churned revenue': 240,
  },
  {
    date: 'Mar 23',
    MRR: 7124,
    'Active subscribers': 690,
    'Net volume': 11423,
    'Churned revenue': 120,
  },
  {
    date: 'Apr 23',
    MRR: 7934,
    'Active subscribers': 627,
    'Net volume': 12134,
    'Churned revenue': 0,
  },
  {
    date: 'May 23',
    MRR: 7287,
    'Active subscribers': 590,
    'Net volume': 12034,
    'Churned revenue': 0,
  },
  {
    date: 'Jun 23',
    MRR: 7323,
    'Active subscribers': 573,
    'Net volume': 11011,
    'Churned revenue': 0,
  },
  {
    date: 'Jul 23',
    MRR: 7511,
    'Active subscribers': 552,
    'Net volume': 11834,
    'Churned revenue': 2312,
  },
  {
    date: 'Aug 23',
    MRR: 7043.9,
    'Active subscribers': 542,
    'Net volume': 12387,
    'Churned revenue': 2421,
  },
  {
    date: 'Sep 23',
    MRR: 6700.7,
    'Active subscribers': 533,
    'Net volume': 11032,
    'Churned revenue': 2910,
  },
  {
    date: 'Oct 23',
    MRR: 6900.8,
    'Active subscribers': 494,
    'Net volume': 10134,
    'Churned revenue': 1290,
  },
  {
    date: 'Nov 23',
    MRR: 7934.5,
    'Active subscribers': 481,
    'Net volume': 9921,
    'Churned revenue': 990,
  },
  {
    date: 'Dec 23',
    MRR: 9021.0,
    'Active subscribers': 272,
    'Net volume': 10549,
    'Churned revenue': 780,
  },
  //array-end
];

const numberFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

const currencyFormatter = (number: number) =>
  '$' + Intl.NumberFormat('us').format(number).toString();

const summary = [
  //array-start
  {
    name: 'MRR',
    value: '$9.1K',
    valueFormatter: currencyFormatter,
  },
  {
    name: 'Active subscribers',
    value: '272',
    valueFormatter: numberFormatter,
  },
  {
    name: 'Net volume',
    value: '$10.5K',
    valueFormatter: currencyFormatter,
  },
  {
    name: 'Churned revenue',
    value: '$0.8K',
    valueFormatter: currencyFormatter,
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <h3 className="font-medium text-gray-900 dark:text-gray-50">Growth</h3>
      <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor.
      </p>
      <Divider className="!my-6" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2">
          <Select>
            <SelectTrigger className="sm:w-36">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">All</SelectItem>
              <SelectItem value="2">US</SelectItem>
              <SelectItem value="3">Europe</SelectItem>
              <SelectItem value="4">Asia</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="sm:w-44">
              <SelectValue placeholder="Select license" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">All</SelectItem>
              <SelectItem value="2">Single license</SelectItem>
              <SelectItem value="3">Team license</SelectItem>
              <SelectItem value="4">Enterprise license</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="mt-2 w-full py-2 sm:mt-0 sm:w-fit">
          <a href="#" className="inline-flex items-center gap-2">
            <RiDownload2Line
              className="-ml-0.5 size-5 shrink-0"
              aria-hidden={true}
            />
            Download report
          </a>
        </Button>
      </div>
      <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {summary.map((item) => (
          <Card key={item.name} className="pb-2">
            <dt className="text-sm text-gray-500 dark:text-gray-500">
              {item.name}
            </dt>
            <dd className="text-lg font-medium text-gray-900 dark:text-gray-50">
              {item.value}
            </dd>
            <LineChart
              data={data}
              index="date"
              categories={[item.name]}
              valueFormatter={item.valueFormatter}
              showYAxis={false}
              showLegend={false}
              startEndOnly={true}
              className="mt-4 !h-36"
            />
          </Card>
        ))}
      </dl>
    </div>
  );
}
```

### src/content/components/line-charts/line-chart-11.tsx

```tsx
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { LineChart } from '@/components/LineChart';

const data = [
  //array-start
  {
    date: 'Jan 22',
    MRR: 2100,
    'Active subscribers': 434,
    'Net volume': 7943,
    'Churned revenue': 0,
  },
  {
    date: 'Feb 22',
    MRR: 2943,
    'Active subscribers': 454,
    'Net volume': 8954,
    'Churned revenue': 0,
  },
  {
    date: 'Mar 22',
    MRR: 4889,
    'Active subscribers': 610,
    'Net volume': 9123,
    'Churned revenue': 0,
  },
  {
    date: 'Apr 22',
    MRR: 3909,
    'Active subscribers': 490,
    'Net volume': 7478,
    'Churned revenue': 0,
  },
  {
    date: 'May 22',
    MRR: 5778,
    'Active subscribers': 710,
    'Net volume': 9504,
    'Churned revenue': 0,
  },
  {
    date: 'Jun 22',
    MRR: 5900,
    'Active subscribers': 753,
    'Net volume': 9943,
    'Churned revenue': 0,
  },
  {
    date: 'Jul 22',
    MRR: 4129,
    'Active subscribers': 741,
    'Net volume': 10112,
    'Churned revenue': 0,
  },
  {
    date: 'Aug 22',
    MRR: 6021,
    'Active subscribers': 783,
    'Net volume': 10290,
    'Churned revenue': 0,
  },
  {
    date: 'Sep 22',
    MRR: 6279,
    'Active subscribers': 815,
    'Net volume': 10349,
    'Churned revenue': 0,
  },
  {
    date: 'Oct 22',
    MRR: 6224,
    'Active subscribers': 826,
    'Net volume': 10415,
    'Churned revenue': 0,
  },
  {
    date: 'Nov 22',
    MRR: 6380,
    'Active subscribers': 896,
    'Net volume': 10636,
    'Churned revenue': 0,
  },
  {
    date: 'Dec 22',
    MRR: 6414,
    'Active subscribers': 798,
    'Net volume': 10900,
    'Churned revenue': 0,
  },
  {
    date: 'Jan 23',
    MRR: 6540,
    'Active subscribers': 783,
    'Net volume': 11040,
    'Churned revenue': 120,
  },
  {
    date: 'Feb 23',
    MRR: 6634,
    'Active subscribers': 734,
    'Net volume': 11390,
    'Churned revenue': 240,
  },
  {
    date: 'Mar 23',
    MRR: 7124,
    'Active subscribers': 690,
    'Net volume': 11423,
    'Churned revenue': 120,
  },
  {
    date: 'Apr 23',
    MRR: 7934,
    'Active subscribers': 627,
    'Net volume': 12134,
    'Churned revenue': 0,
  },
  {
    date: 'May 23',
    MRR: 7287,
    'Active subscribers': 590,
    'Net volume': 12034,
    'Churned revenue': 0,
  },
  {
    date: 'Jun 23',
    MRR: 7323,
    'Active subscribers': 573,
    'Net volume': 11011,
    'Churned revenue': 0,
  },
  {
    date: 'Jul 23',
    MRR: 7511,
    'Active subscribers': 552,
    'Net volume': 11834,
    'Churned revenue': 2312,
  },
  {
    date: 'Aug 23',
    MRR: 7043,
    'Active subscribers': 542,
    'Net volume': 12387,
    'Churned revenue': 2421,
  },
  {
    date: 'Sep 23',
    MRR: 6700,
    'Active subscribers': 533,
    'Net volume': 11032,
    'Churned revenue': 2910,
  },
  {
    date: 'Oct 23',
    MRR: 6900,
    'Active subscribers': 494,
    'Net volume': 10134,
    'Churned revenue': 1290,
  },
  {
    date: 'Nov 23',
    MRR: 7934,
    'Active subscribers': 481,
    'Net volume': 9921,
    'Churned revenue': 990,
  },
  {
    date: 'Dec 23',
    MRR: 9021,
    'Active subscribers': 272,
    'Net volume': 10549,
    'Churned revenue': 780,
  },
  //array-end
];

const numberFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

const currencyFormatter = (number: number) =>
  '$' + Intl.NumberFormat('us').format(number).toString();

const summary = [
  {
    name: 'MRR',
    value: '$9.1K',
    valueFormatter: currencyFormatter,
    change: '+12.1%',
    changeType: 'positive',
  },
  {
    name: 'Active subscribers',
    value: '272',
    valueFormatter: numberFormatter,
    change: '-4.2%',
    changeType: 'negative',
  },
  {
    name: 'Net volume',
    value: '$10.5K',
    valueFormatter: currencyFormatter,
    change: '+2.9%',
    changeType: 'positive',
  },
  {
    name: 'Churned revenue',
    value: '$0.8K',
    valueFormatter: currencyFormatter,
    change: '+5.3%',
    changeType: 'negative',
  },
];

export default function Example() {
  return (
    <div className="obfuscate">
      <h3 className="font-medium text-gray-900 dark:text-gray-50">Growth</h3>
      <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor.
      </p>
      <Divider className="my-4" />
      <dl className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {summary.map((item) => (
          <Card key={item.name} className="!pb-2">
            <div className="flex items-center space-x-1.5">
              <dt className="text-sm text-gray-500 dark:text-gray-500">
                {item.name}
              </dt>
              {item.changeType === 'positive' ? (
                <Badge variant="success" className="!px-1.5 !py-0.5">
                  {item.change}
                </Badge>
              ) : (
                <Badge variant="error" className="!px-1.5 !py-0.5">
                  {item.change}
                </Badge>
              )}
            </div>
            <div className="flex items-baseline justify-between">
              <dd className="text-lg font-medium text-gray-900 dark:text-gray-50">
                {item.value}
              </dd>
              <dd className="text-sm text-gray-500 dark:text-gray-500">
                Compared to {data[0].date}
              </dd>
            </div>
            <LineChart
              data={data}
              index="date"
              categories={[item.name]}
              valueFormatter={item.valueFormatter}
              showYAxis={false}
              showLegend={false}
              startEndOnly={true}
              className="mt-4 !h-36"
            />
          </Card>
        ))}
      </dl>
    </div>
  );
}
```

### src/content/components/line-charts/line-chart-12.tsx

```tsx
'use client';

import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import {
  CartesianGrid,
  Dot,
  Label,
  Line,
  Legend as RechartsLegend,
  LineChart as RechartsLineChart,
  Rectangle,
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

// Tremor LineChart [v0.3.1]
import { Card } from '@/components/Card';

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
  // label,
  valueFormatter,
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    const legendPayload = payload.filter((item: any) => item.type !== 'none');
    return (
      <div
        className={cx(
          // base
          'overflow-hidden rounded-md text-sm shadow-md',
          // background color
          'bg-gray-900 dark:bg-gray-800',
        )}
      >
        <div
          className={cx(
            'border-b border-gray-700 px-4 py-2 dark:border-gray-700',
          )}
        >
          <p
            className={cx(
              // base
              'font-medium',
              // text color
              'text-gray-50',
            )}
          >
            Total Requests
          </p>
        </div>
        <div className={cx('space-y-1 bg-gray-800 px-4 py-2 dark:bg-gray-800')}>
          {legendPayload.map(({ value, category, color }, index) => (
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
                    'text-gray-400 dark:text-gray-400',
                  )}
                >
                  {category}
                </p>
              </div>
              <p
                className={cx(
                  // base
                  'whitespace-nowrap text-right tabular-nums',
                  // text color
                  'text-gray-50 dark:text-gray-50',
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

//#region LineChart

interface ActiveDot {
  index?: number;
  dataKey?: string;
}

type BaseEventProps = {
  eventType: 'dot' | 'category';
  categoryClicked: string;
  [key: string]: number | string;
};

type LineChartEventProps = BaseEventProps | null | undefined;

interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
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
  onValueChange?: (value: LineChartEventProps) => void;
  enableLegendSlider?: boolean;
  tickGap?: number;
  connectNulls?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  legendPosition?: 'left' | 'center' | 'right';
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  customTooltip?: React.ComponentType<TooltipProps>;
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
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
      legendPosition = 'right',
      tooltipCallback,
      customTooltip,
      ...other
    } = props;

    function CustomCursor(props: any) {
      const { pointerEvents, height, points, className, payload, width } =
        props;
      let label = payload[0]?.payload?.date;
      const { x, y } = points[0];
      const textWidth = 50; // adjust based on your text size
      const textHeight = 18; // adjust based on your text size
      const padding = 3;

      let translateX;
      if (x < textWidth / 2 + padding) {
        // Near the left edge
        translateX = padding - 3;
      } else if (x > width - textWidth / 2 - padding) {
        // Near the right edge
        translateX = width - textWidth - padding + 3;
      } else {
        // Default to middle alignment
        translateX = x - textWidth / 2;
      }

      return (
        <>
          <Rectangle
            x={x}
            y={y}
            fillOpacity={0}
            stroke="#d1d5db"
            strokeWidth={1}
            pointerEvents={pointerEvents}
            width={1}
            height={height}
            className={className}
          />
          <g transform={`translate(${translateX}, ${y + height + 6})`}>
            <rect
              className="fill-gray-200 dark:fill-gray-800"
              width={textWidth + 2 * padding}
              height={textHeight + 2 * padding}
              rx={4}
              ry={4}
            />
            <text
              className="fill-gray-700 text-xs dark:fill-gray-300"
              x={textWidth / 2 + padding}
              y={textHeight / 2 + padding + 6}
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        </>
      );
    }
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
    const prevActiveRef = React.useRef<boolean | undefined>(undefined);
    const prevLabelRef = React.useRef<string | undefined>(undefined);

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
          <RechartsLineChart
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
              left: yAxisLabel ? 20 : 3,
              right: yAxisLabel ? 5 : 3,
              top: 5,
            }}
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
              tickLine={false}
              type="number"
              domain={yAxisDomain as AxisDomain}
              tick={{ transform: 'translate(-3, 0)' }}
              fill=""
              stroke=""
              className={cx(
                // base
                'text-xs',
                // text fill
                'fill-gray-500 dark:fill-gray-500',
              )}
              tickFormatter={valueFormatter}
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
              cursor={<CustomCursor />}
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
            {categories.map((category) => (
              <Line
                className={cx(
                  getColorClassName(
                    categoryColors.get(category) as AvailableChartColorsKeys,
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
              />
            ))}
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
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

LineChart.displayName = 'LineChart';

const data = [
  //array-start
  {
    date: 'Jan 22',
    'Station Requests': 2100,
    'Tile Requests': 4434,
    'Isoline Requests': 7943,
  },
  {
    date: 'Feb 22',
    'Station Requests': 2943,
    'Tile Requests': 4454,
    'Isoline Requests': 8954,
  },
  {
    date: 'Mar 22',
    'Station Requests': 4889,
    'Tile Requests': 4610,
    'Isoline Requests': 9123,
  },
  {
    date: 'Apr 22',
    'Station Requests': 3909,
    'Tile Requests': 4490,
    'Isoline Requests': 7478,
  },
  {
    date: 'May 22',
    'Station Requests': 5778,
    'Tile Requests': 4710,
    'Isoline Requests': 9504,
  },
  {
    date: 'Jun 22',
    'Station Requests': 5900,
    'Tile Requests': 4753,
    'Isoline Requests': 9943,
  },
  {
    date: 'Jul 22',
    'Station Requests': 4129,
    'Tile Requests': 4741,
    'Isoline Requests': 10112,
  },
  {
    date: 'Aug 22',
    'Station Requests': 6021,
    'Tile Requests': 4783,
    'Isoline Requests': 10290,
  },
  {
    date: 'Sep 22',
    'Station Requests': 6279,
    'Tile Requests': 4815,
    'Isoline Requests': 10349,
  },
  {
    date: 'Oct 22',
    'Station Requests': 6224,
    'Tile Requests': 4826,
    'Isoline Requests': 10415,
  },
  {
    date: 'Nov 22',
    'Station Requests': 6380,
    'Tile Requests': 4896,
    'Isoline Requests': 10636,
  },
  {
    date: 'Dec 22',
    'Station Requests': 6414,
    'Tile Requests': 4798,
    'Isoline Requests': 10900,
  },
  {
    date: 'Jan 23',
    'Station Requests': 6540,
    'Tile Requests': 4783,
    'Isoline Requests': 11040,
  },
  {
    date: 'Feb 23',
    'Station Requests': 6634,
    'Tile Requests': 4734,
    'Isoline Requests': 11390,
  },
  {
    date: 'Mar 23',
    'Station Requests': 7124,
    'Tile Requests': 4690,
    'Isoline Requests': 11423,
  },
  {
    date: 'Apr 23',
    'Station Requests': 7934,
    'Tile Requests': 4627,
    'Isoline Requests': 12134,
  },
  {
    date: 'May 23',
    'Station Requests': 7287,
    'Tile Requests': 4590,
    'Isoline Requests': 12034,
  },
  {
    date: 'Jun 23',
    'Station Requests': 7323,
    'Tile Requests': 4573,
    'Isoline Requests': 11011,
  },
  {
    date: 'Jul 23',
    'Station Requests': 7511,
    'Tile Requests': 4552,
    'Isoline Requests': 11834,
  },
  {
    date: 'Aug 23',
    'Station Requests': 7043,
    'Tile Requests': 4542,
    'Isoline Requests': 12387,
  },
  {
    date: 'Sep 23',
    'Station Requests': 6700,
    'Tile Requests': 4533,
    'Isoline Requests': 11032,
  },
  {
    date: 'Oct 23',
    'Station Requests': 6900,
    'Tile Requests': 4494,
    'Isoline Requests': 10134,
  },
  {
    date: 'Nov 23',
    'Station Requests': 7934,
    'Tile Requests': 4481,
    'Isoline Requests': 9921,
  },
  {
    date: 'Dec 23',
    'Station Requests': 9021,
    'Tile Requests': 4272,
    'Isoline Requests': 10549,
  },
  //array-end
];

const numberFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function Example() {
  return (
    <div className="obfuscate">
      <Card className="mx-auto max-w-2xl">
        <h3 className="font-medium text-gray-900 dark:text-gray-50">
          Request Overview
        </h3>
        <LineChart
          data={data}
          autoMinValue={true}
          index="date"
          startEndOnly={true}
          valueFormatter={numberFormatter}
          categories={['Station Requests', 'Tile Requests', 'Isoline Requests']}
          showYAxis={false}
          onValueChange={(v) => v}
          className="mt-4 !h-72"
        />
      </Card>
    </div>
  );
}
```
