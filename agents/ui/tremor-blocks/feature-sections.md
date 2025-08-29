# Components / feature-sections

[Back to index](index.md)

## Components / feature-sections

Files:
- `src/content/components/feature-sections/feature-section-01.tsx`
- `src/content/components/feature-sections/feature-section-02.tsx`
- `src/content/components/feature-sections/feature-section-03.tsx`
- `src/content/components/feature-sections/feature-section-04.tsx`
- `src/content/components/feature-sections/feature-section-05.tsx`
- `src/content/components/feature-sections/feature-section-06.tsx`
- `src/content/components/feature-sections/feature-section-07.tsx`
- `src/content/components/feature-sections/feature-section-08.tsx`
- `src/content/components/feature-sections/feature-section-09.tsx`
- `src/content/components/feature-sections/feature-section-11.tsx`
- `src/content/components/feature-sections/feature-section-12.tsx`
- `src/content/components/feature-sections/index.ts`

### src/content/components/feature-sections/feature-section-01.tsx

```tsx
import React from 'react';

interface BadgeProps extends React.ComponentPropsWithoutRef<'span'> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className, ...props }: BadgeProps, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        className="z-10 block w-fit rounded-lg border border-blue-200/20 bg-blue-50/50 px-3 py-1.5 font-semibold uppercase leading-4 tracking-tighter dark:border-blue-800/30 dark:bg-blue-900/20 sm:text-sm"
        {...props}
      >
        <span className="bg-gradient-to-b from-blue-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-200 dark:to-blue-400">
          {children}
        </span>
      </span>
    );
  },
);

const stats = [
  {
    name: 'Bandwith increase',
    value: '+162%',
  },
  {
    name: 'Better storage efficiency',
    value: '2-3x',
  },
  {
    name: 'Rows ingested / second',
    value: 'Up to 9M',
  },
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="mx-auto w-full max-w-6xl px-3 py-20">
        <Badge>Security at Scale</Badge>
        <h2
          id="features-title"
          className="mt-2 inline-block bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text py-2 text-4xl font-bold tracking-tighter text-transparent dark:from-gray-50 dark:to-gray-300 sm:text-6xl"
        >
          Architected for speed and reliability
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-7 text-gray-600 dark:text-gray-400">
          Database&rsquo; innovative architecture avoids the central bottlenecks
          of traditional systems, enhancing system reliability. This design
          ensures high productivity and security, minimizing the risk of service
          disruptions and outages.
        </p>
        <dl className="mt-12 grid grid-cols-1 gap-y-8 dark:border-gray-800 md:grid-cols-3 md:border-y md:border-gray-200 md:py-14">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <div className="border-l-2 border-blue-100 pl-6 dark:border-blue-900 md:border-l md:text-center lg:border-gray-200 lg:first:border-none lg:dark:border-gray-800">
                <dd className="inline-block bg-gradient-to-t from-blue-900 to-blue-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-blue-700 dark:to-blue-400 lg:text-6xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-gray-600 dark:text-gray-400">
                  {stat.name}
                </dt>
              </div>
            </React.Fragment>
          ))}
        </dl>
      </div>
    </div>
  );
}
```

### src/content/components/feature-sections/feature-section-02.tsx

```tsx
import {
  RiLinksLine,
  RiPlugLine,
  RiShieldKeyholeLine,
  RiStackLine,
} from '@remixicon/react';

const features = [
  {
    name: 'Use Database with your stack',
    description:
      'We offer client and server libraries in everything from React and Ruby to iOS.',
    icon: RiStackLine,
  },
  {
    name: 'Try plug & play options',
    description:
      'Customize and deploy data infrastructure directly from the Database Dashboard.',
    icon: RiPlugLine,
  },
  {
    name: 'Explore pre-built integrations',
    description:
      'Connect Database to over a hundred tools including Stripe, Salesforce, or Quickbooks.',
    icon: RiLinksLine,
  },
  {
    name: 'Security & privacy',
    description:
      'Database supports PII data encrypted with AES-256 at rest or explicit user consent flows.',
    icon: RiShieldKeyholeLine,
  },
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="mx-auto w-full max-w-6xl px-3 py-20">
        <dl className="grid grid-cols-4 gap-10">
          {features.map((item) => (
            <div
              key={item.name}
              className="col-span-full sm:col-span-2 lg:col-span-1"
            >
              <div className="w-fit rounded-lg p-2 shadow-md shadow-blue-400/30 ring-1 ring-black/5 dark:shadow-blue-600/30 dark:ring-white/5">
                <item.icon
                  aria-hidden="true"
                  className="size-6 text-blue-600 dark:text-blue-400"
                />
              </div>
              <dt className="mt-6 font-semibold text-gray-900 dark:text-gray-50">
                {item.name}
              </dt>
              <dd className="mt-2 leading-7 text-gray-600 dark:text-gray-400">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
```

### src/content/components/feature-sections/feature-section-03.tsx

```tsx
const features = [
  {
    title: '1. Prototype',
    subtitle: 'Build fast, test early',
    description:
      'Quickly spin up a working model with libraries for popular frameworks like React.',
  },
  {
    title: '2. Present',
    subtitle: 'Showcase your vision',
    description:
      'Use intuitive plug & play features to prepare a live demo and deploy from our platform.',
  },
  {
    title: '3. Iterate',
    subtitle: 'Refine and improve',
    description:
      'Continuously enhance your product by integrating with over a hundred tools.',
  },
  {
    title: '4. Deploy',
    subtitle: 'Launch with confidence',
    description:
      'Deploy securely with encryption, ensuring data compliance and user consent.',
  },
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="mx-auto w-full max-w-6xl px-3 py-20">
        <dl className="grid grid-cols-4 gap-10">
          {features.map((item) => (
            <div
              key={item.title}
              className="col-span-full sm:col-span-2 lg:col-span-1"
            >
              <span className="rounded-lg bg-blue-50/50 px-3 py-1.5 font-semibold leading-4 tracking-tighter shadow-sm shadow-blue-500/20 ring-1 ring-blue-200/20 dark:bg-blue-900/20 dark:ring-blue-800/30 sm:text-sm">
                <span className="bg-gradient-to-b from-blue-400 to-blue-600 bg-clip-text text-transparent dark:from-blue-200 dark:to-blue-400">
                  {item.title}
                </span>
              </span>
              <dt className="mt-6 font-semibold text-gray-900 dark:text-gray-50">
                {item.subtitle}
              </dt>
              <dd className="mt-2 leading-7 text-gray-600 dark:text-gray-400">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
```

### src/content/components/feature-sections/feature-section-04.tsx

```tsx
const benefits = [
  {
    title: 'Work in Zurich',
    description:
      'We are in-person first and have a fantastic office in Zurich.',
  },
  {
    title: 'Competitive salary & equity',
    description:
      'We pay competitive salary and option packages to attract the very best talent.',
  },
  {
    title: 'Health, dental, vision',
    description:
      'Database pays all of your health, dental, and vision insurance.',
  },
  {
    title: 'Yearly off-sites',
    description:
      'We bring everyone together at an interesting location to discuss the big picture.',
  },
  {
    title: 'Book budget',
    description:
      'We provide every employee with a 350 dollar budget for books.',
  },
  {
    title: 'Tasty snacks',
    description:
      'The fridge and pantry are stocked + free dinner catered every night (incl. weekends).',
  },
  {
    title: '20 PTO days per year',
    description: 'Take time off to recharge and come back refreshed.',
  },
  {
    title: 'Spotify Premium',
    description:
      'We really have the best fringe benefits, even a Spotify subscription is included.',
  },
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="mx-auto px-4 py-20">
        <h2
          id="benefits-title"
          className="inline-block bg-gradient-to-t from-gray-900 to-gray-800 bg-clip-text py-2 text-3xl font-bold tracking-tighter text-transparent dark:from-gray-50 dark:to-gray-300 md:text-5xl"
        >
          What&rsquo;s in for you
        </h2>
        <dl className="mt-8 grid grid-cols-4 gap-x-10 gap-y-8 sm:mt-12 sm:gap-y-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="col-span-4 sm:col-span-2 lg:col-span-1">
              <dt className="relative font-semibold text-gray-900 dark:text-gray-50">
                {benefit.title}
                <div className="absolute -left-2 top-1 h-4 w-0.5 rounded-full bg-blue-500" />
              </dt>
              <dd className="mt-2 leading-7 text-gray-600 dark:text-gray-400">
                {benefit.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
```

### src/content/components/feature-sections/feature-section-05.tsx

```tsx
'use client';

import { AreaChart } from '@/components/AreaChart';
import { CategoryBar } from '@/components/CategoryBar';
import { ComboChart } from '@/components/ComboChart';

const chartdata = [
  {
    date: 'Jan 23',
    SolarPanels: 2890,
    Inverters: 2338,
  },
  {
    date: 'Feb 23',
    SolarPanels: 2756,
    Inverters: 2103,
  },
  {
    date: 'Mar 23',
    SolarPanels: 3322,
    Inverters: 2194,
  },
  {
    date: 'Apr 23',
    SolarPanels: 3470,
    Inverters: 2108,
  },
  {
    date: 'May 23',
    SolarPanels: 3475,
    Inverters: 1812,
  },
  {
    date: 'Jun 23',
    SolarPanels: 3129,
    Inverters: 1726,
  },
  {
    date: 'Jul 23',
    SolarPanels: 3490,
    Inverters: 1982,
  },
  {
    date: 'Aug 23',
    SolarPanels: 2903,
    Inverters: 2012,
  },
  {
    date: 'Sep 23',
    SolarPanels: 2643,
    Inverters: 2342,
  },
  {
    date: 'Oct 23',
    SolarPanels: 2837,
    Inverters: 2473,
  },
  {
    date: 'Nov 23',
    SolarPanels: 2954,
    Inverters: 3848,
  },
  {
    date: 'Dec 23',
    SolarPanels: 3239,
    Inverters: 3736,
  },
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="mx-auto w-full max-w-4xl !px-3 py-20 sm:text-center">
        <span className="block bg-gradient-to-b from-gray-700 to-gray-400 bg-clip-text text-lg font-semibold text-transparent dark:from-blue-200 dark:to-blue-400 sm:text-xl">
          Analytics
        </span>
        <h2
          id="features-title"
          className="mt-2 inline-block bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text py-2 text-4xl font-bold tracking-tighter text-transparent dark:from-gray-50 dark:to-gray-300 sm:text-6xl"
        >
          Insights made for everyone
        </h2>
        <div className="group relative mt-12 h-[30rem] transition">
          <div className="absolute top-12 h-80 w-full scale-90 transform-gpu rounded-lg bg-white shadow-md shadow-black/5 ring-1 ring-black/5 transition-all delay-75 duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:top-52 group-hover:rotate-6">
            <div className="relative flex size-full items-center">
              <div className="absolute left-2.5 top-2.5 size-1.5 rounded-full bg-gray-200 shadow-inner dark:bg-gray-800" />
              <div className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-gray-200 shadow-inner dark:bg-gray-800" />
              <div className="absolute bottom-2.5 left-2.5 size-1.5 rounded-full bg-gray-200 shadow-inner dark:bg-gray-800" />
              <div className="absolute bottom-2.5 right-2.5 size-1.5 rounded-full bg-gray-200 shadow-inner dark:bg-gray-800" />
              <AreaChart
                className="mx-auto !h-60 !px-3 sm:!px-10"
                data={chartdata}
                index="date"
                categories={['SolarPanels', 'Inverters']}
              />
            </div>
          </div>
          <div className="delay-50 absolute top-6 h-80 w-full scale-95 transform-gpu rounded-lg bg-white shadow-md shadow-black/5 ring-1 ring-black/5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:top-16 group-hover:-rotate-3">
            <div className="relative flex size-full items-end">
              <div className="absolute left-2.5 top-2.5 size-1.5 rounded-full bg-gray-200 shadow-inner dark:bg-gray-800" />
              <div className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-gray-200 shadow-inner dark:bg-gray-800" />
              <div className="absolute bottom-2.5 left-2.5 size-1.5 rounded-full bg-gray-200 shadow-inner dark:bg-gray-800" />
              <div className="absolute bottom-2.5 right-2.5 size-1.5 rounded-full bg-gray-200 shadow-inner dark:bg-gray-800" />
              <CategoryBar
                values={[10, 10, 20]}
                marker={{ value: 17, tooltip: '68', showAnimation: false }}
                colors={['pink', 'amber', 'emerald']}
                className="mb-12 w-full !px-3 sm:!px-10"
              />
            </div>
          </div>
          <div className="absolute top-0 flex h-80 w-full transform-gpu items-center rounded-lg bg-white shadow-xl shadow-black/5 ring-1 ring-black/5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-top-6 group-hover:rotate-3 group-hover:scale-95">
            <div className="relative flex size-full items-center">
              <div className="absolute left-2.5 top-2.5 size-1.5 rounded-full bg-gray-200 shadow-inner dark:bg-gray-800" />
              <div className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-gray-200 shadow-inner dark:bg-gray-800" />
              <div className="absolute bottom-2.5 left-2.5 size-1.5 rounded-full bg-gray-200 shadow-inner dark:bg-gray-800" />
              <div className="absolute bottom-2.5 right-2.5 size-1.5 rounded-full bg-gray-200 shadow-inner dark:bg-gray-800" />
              <ComboChart
                className="mx-auto !h-60 !px-3 sm:!px-10"
                data={chartdata}
                showTooltip={false}
                index="date"
                enableBiaxial={true}
                barSeries={{
                  categories: ['SolarPanels'],
                }}
                lineSeries={{
                  categories: ['Inverters'],
                  showYAxis: true,
                  colors: ['amber'],
                  yAxisWidth: 60,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### src/content/components/feature-sections/feature-section-06.tsx

```tsx
'use client';

//To get started, run "npm i cobe"
import { RiArrowRightSLine } from '@remixicon/react';
import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(function () {
    let phi = 4;
    let globe: ReturnType<typeof createGlobe> | undefined;

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 800 * 2,
        height: 800 * 2,
        phi: 0,
        theta: -0.3,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 30000,
        mapBrightness: 13,
        mapBaseBrightness: 0.01,
        baseColor: [1, 1, 1],
        glowColor: [1, 1, 1],
        markerColor: [100, 100, 100],
        markers: [],
        onRender: function (state) {
          state.phi = phi;
          phi += 0.0005;
        },
      });
    }

    return function () {
      if (globe) {
        globe.destroy();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 800, height: 800 }}
      className="absolute -right-72 top-40 z-10 aspect-square size-full max-w-fit transition-transform group-hover:scale-[1.01] sm:top-12 lg:-right-60 lg:top-0"
    />
  );
}

export default function Example() {
  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-3 py-8 sm:py-20">
        <span className="block text-lg font-semibold tracking-tighter text-blue-500">
          AI-Powered
        </span>
        <h2
          id="features-title"
          className="mt-2 inline-block bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text py-2 text-3xl font-bold tracking-tighter text-transparent dark:from-gray-50 dark:to-gray-300 sm:text-5xl"
        >
          Revolutionize your customer service
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-7 text-gray-600 dark:text-gray-400">
          Harness the power of AI to provide 24/7 support, reduce response
          times, and increase customer satisfaction with our cutting-edge
          solutions.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <a
            href="#"
            className="group relative col-span-1 overflow-hidden rounded-b rounded-t-2xl bg-gray-50 p-8 shadow-2xl shadow-black/10 ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/5 lg:col-span-2 lg:rounded-l-2xl lg:rounded-r"
          >
            <div className="relative z-20">
              <h3 className="text-2xl font-semibold text-gray-950 dark:text-gray-50">
                AI Chatbot Integration
              </h3>
              <p className="mt-4 max-w-sm text-gray-700 dark:text-gray-400">
                Seamlessly integrate our advanced AI chatbots to handle customer
                queries instantly, freeing up your human agents for complex
                issues.
              </p>
              <div className="mt-12 flex w-fit items-center gap-0.5 rounded bg-white/10 px-2 py-1 text-blue-500 backdrop-blur-[3px]">
                <span>Explore features</span>
                <RiArrowRightSLine className="mt-0.5 size-5 transition-all group-hover:translate-x-1 group-hover:opacity-100 sm:opacity-20" />
              </div>
            </div>
            <GlobeCanvas />
          </a>
          <div className="rounded-b-2xl rounded-t bg-gradient-to-br from-blue-400 to-blue-600 p-8 shadow-lg shadow-blue-500/20 lg:rounded-l lg:rounded-r-2xl">
            <figure className="flex h-full flex-col justify-between">
              <blockquote className="text-base font-medium text-gray-50 sm:text-lg/8">
                <p className="relative bg-gradient-to-br from-blue-100 to-white bg-clip-text font-medium leading-7 tracking-tighter text-transparent before:absolute before:right-full before:top-0">
                  The AI-powered customer support has completely transformed our
                  service capabilities. We've seen a 70% reduction in response
                  times and a significant increase in customer satisfaction
                  scores.
                </p>
              </blockquote>
              <figcaption className="mt-8 flex items-center space-x-4 sm:mt-0">
                <div className="flex-auto">
                  <div className="mt-7 text-sm font-semibold text-gray-50">
                    <div>
                      <span className="absolute inset-0" />
                      Sarah Johnson
                    </div>
                  </div>
                  <span className="text-sm text-blue-200">
                    CX Director, TechInnovate
                  </span>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}
```

### src/content/components/feature-sections/feature-section-07.tsx

```tsx
'use client';

//To get started, run "npm i cobe"
import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export default function Example() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 4.7;

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: 1200 * 2,
      height: 1200 * 2,
      phi: 0,
      theta: -0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 25000,
      mapBrightness: 13,
      mapBaseBrightness: 0.05,
      baseColor: [0.3, 0.3, 0.3],
      glowColor: [0.15, 0.15, 0.15],
      markerColor: [100, 100, 100],
      markers: [
        // { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
        // { location: [40.7128, -74.006], size: 0.03 }, // New York City
        // { location: [35.6895, 139.6917], size: 0.03 }, // Tokyo
        // { location: [28.7041, 77.1025], size: 0.03 }, // Delhi
      ],
      onRender: (state: { phi?: number }) => {
        state.phi = phi;
        phi += 0.0002;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  const features = [
    {
      name: 'Global Clusters',
      description: 'Enable low-latency global access, enhancing performance.',
    },
    {
      name: 'Serverless Triggers',
      description: 'Trigger functions automatically for dynamic app behavior.',
    },
    {
      name: 'Monitoring & Alerts',
      description:
        'Monitor health with key metrics or integrate third-party tools.',
    },
  ];

  return (
    <>
      <div className="sm:px-3">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center overflow-hidden rounded-3xl bg-gray-950 pt-24 shadow-xl shadow-black/30">
          <div className="absolute top-[17rem] size-[40rem] rounded-full bg-blue-800 blur-3xl md:top-[20rem]" />
          <div className="z-10 inline-block rounded-lg border border-blue-400/20 bg-blue-800/20 px-3 py-1.5 font-semibold uppercase leading-4 tracking-tight sm:text-sm">
            <span className="bg-gradient-to-b from-blue-200 to-blue-400 bg-clip-text text-transparent">
              Made for the cloud
            </span>
          </div>
          <h2
            id="global-database-title"
            className="z-10 mt-6 inline-block bg-gradient-to-b from-white to-blue-100 bg-clip-text px-2 text-center text-5xl font-bold tracking-tighter text-transparent md:text-8xl"
          >
            The global <br className="md:bock hidden" /> cloud database
          </h2>
          <canvas
            className="absolute top-[10rem] z-20 aspect-square size-full max-w-fit sm:top-[7.1rem] md:top-[12rem]"
            ref={canvasRef}
            style={{ width: 1200, height: 1200 }}
          />
          <div className="z-20 -mt-32 h-[36rem] w-full overflow-hidden md:-mt-36">
            <div className="absolute bottom-0 h-3/5 w-full bg-gradient-to-b from-transparent via-gray-950/95 to-gray-950" />
            <div className="absolute inset-x-6 bottom-12 m-auto max-w-4xl md:top-2/3">
              <div className="grid grid-cols-1 gap-x-10 gap-y-6 rounded-lg border border-white/[3%] bg-white/[1%] px-6 py-6 shadow-xl backdrop-blur md:grid-cols-3 md:p-8">
                {features.map((item) => (
                  <div key={item.name} className="flex flex-col gap-2">
                    <h3 className="whitespace-nowrap bg-gradient-to-b from-blue-300 to-blue-500 bg-clip-text text-lg font-semibold text-transparent md:text-xl">
                      {item.name}
                    </h3>
                    <p className="text-sm leading-6 text-blue-200/40">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
```

### src/content/components/feature-sections/feature-section-08.tsx

```tsx
import React from 'react';
import { RiBarChartFill, RiPhoneFill, RiTimeFill } from '@remixicon/react';

import { cx } from '@/lib/utils';

const StickerCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <a
        className={cx(
          'relative z-10 mt-0 block size-full overflow-hidden',
          'rounded-lg rounded-tr-[26px]',
          'px-4 pb-4 pt-5',
          // Card
          'bg-white font-normal leading-8 text-gray-900 dark:bg-gray-900 dark:text-gray-50',
          'ring-1 ring-inset ring-gray-200 dark:ring-gray-800',

          // Animation
          'transition-all duration-200 ease-in-out',

          // Before Element (Corner Fold)
          'before:content-[""]',
          'before:absolute before:right-0 before:top-0',
          'before:z-[3]',
          'before:h-[30px] before:w-[30px]',
          'before:-translate-y-1/2 before:translate-x-1/2',
          'before:rotate-45',
          'before:bg-white dark:before:bg-gray-950',
          'before:ring-1 before:ring-gray-200 dark:before:ring-gray-800',
          'before:transition-all before:duration-200 before:ease-in-out',

          // After Element (Corner Shadow)
          'after:content-[""]',
          'after:absolute after:right-0 after:top-0',
          'after:z-[2]',
          'after:size-7',
          'after:-translate-y-2 after:translate-x-2',
          'after:rounded-bl-lg',
          'after:border after:bg-gray-50 dark:after:border-gray-800 dark:after:bg-gray-900',
          'after:shadow-sm',
          'after:transition-all after:duration-200 after:ease-in-out',

          // Hover States
          'hover:cursor-pointer',
          'hover:rounded-tr-[45px]',
          'hover:before:h-[50px] hover:before:w-[50px]',
          'hover:after:h-[42px] hover:after:w-[42px]',
          'after:hover:shadow-lg after:hover:shadow-black/5',
        )}
      >
        <div>
          <div className="relative flex items-center gap-2">
            <div className="absolute -left-4 h-5 w-1 rounded-r-sm bg-blue-500" />
            <Icon className="h-5 w-5 shrink-0 text-blue-500" />
            <h3 className="font-medium text-gray-900 dark:text-gray-50">
              {title}
            </h3>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400 sm:text-sm">
            {children}
          </p>
        </div>
      </a>
    </div>
  );
};

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StickerCard icon={RiPhoneFill} title="Call Analytics">
          Real-time voice analytics and sentiment tracking to improve customer
          interactions.
        </StickerCard>

        <StickerCard icon={RiBarChartFill} title="Performance Metrics">
          Comprehensive reporting on KPIs including call resolution rates and
          response times.
        </StickerCard>

        <StickerCard icon={RiTimeFill} title="Queue Management">
          Smart call routing and queue optimization to minimize wait times and
          maximize agent efficiency.
        </StickerCard>
      </div>
    </div>
  );
}
```

### src/content/components/feature-sections/feature-section-09.tsx

```tsx
import { RiArrowRightUpLine } from '@remixicon/react';

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="relative flex flex-col items-center justify-center py-16">
        <div className="mx-auto">
          <a
            aria-label="View latest database benchmarks"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto w-full"
          >
            <div className="focus:outline-hidden inline-flex max-w-full items-center gap-3 rounded-full px-2.5 py-0.5 pl-0.5 pr-3 font-medium text-gray-900 shadow-lg shadow-blue-400/20 ring-1 ring-black/5 filter backdrop-blur-[1px] transition-colors hover:bg-blue-500/[2.5%] dark:bg-white/5 dark:text-gray-50 dark:ring-white/10 sm:text-sm">
              <span className="shrink-0 truncate rounded-full border bg-gray-50 px-2.5 py-1 text-sm text-gray-600 sm:text-xs">
                New
              </span>
              <span className="flex items-center gap-1 truncate">
                <span className="w-full truncate">
                  10x Faster Query Performance
                </span>
                <RiArrowRightUpLine className="h-4 w-4 shrink-0 text-gray-700 dark:text-gray-400" />
              </span>
            </div>
          </a>
        </div>
        <h1 className="mt-8 text-center text-5xl font-semibold tracking-tighter text-gray-900 dark:text-gray-50 sm:text-8xl sm:leading-[5.5rem]">
          Scale Beyond <br /> Your Limits
        </h1>
        <p className="mt-5 max-w-xl text-balance text-center text-base text-gray-700 dark:text-gray-400 sm:mt-8 sm:text-xl">
          Modern distributed database with automatic sharding, real-time
          replication, and intelligent query optimization for unlimited
          scalability.
        </p>
        <div>
          <a
            className="mt-6 inline-flex cursor-pointer flex-row items-center justify-center gap-1 whitespace-nowrap rounded-md border-b-[1.5px] border-blue-700 bg-gradient-to-b from-blue-400 to-blue-500 px-5 py-3 font-medium leading-4 tracking-wide text-white shadow-[0_0_0_2px_rgba(0,0,0,0.04),0_0_14px_0_rgba(255,255,255,0.19)] transition-all duration-200 ease-in-out hover:shadow-blue-300"
            href="#"
          >
            Start scaling
          </a>
        </div>
      </div>
    </div>
  );
}
```

### src/content/components/feature-sections/feature-section-11.tsx

```tsx
import type { SVGProps } from 'react';
import {
  RiHome9Fill,
  RiPlaneLine,
  RiSignalTowerFill,
  RiTruckFill,
} from '@remixicon/react';

const SVGMap = (props: SVGProps<SVGSVGElement>) => {
  //array-start
  const width = 481;
  const height = 201;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M356.816 59.5522L369.836 89.5312L383.182 110.993L397.011 122.212"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M308.847 55.25L322.199 81.171L335.517 110.331L349.161 128.781L363.163 139.04"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M296.831 67.8198L310.258 92.7317L323.723 118.571L337.459 135.416L351.527 144.829"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M320.615 48.7886L333.922 72.9844L347.154 102.264L360.684 122.266L374.621 133.344"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M258.834 82.7388L272.277 106.533L285.851 123.633L299.598 137.234L313.519 148.854L327.694 156.677L339.705 150.704L351.527 144.829L363.163 139.04L374.621 133.344L385.9 127.734L397.01 122.212L407.953 116.77L418.732 111.41"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M347.409 18.9292L323.821 15.9834L312.851 21.2295L308.202 24.7286L301.676 29.6438L290.288 44.6875L277.529 44.7417L264.883 60.0187L252.546 70.0985L241.219 74.8509L229.728 79.6683L218.07 84.5563L206.249 89.5203L194.248 94.5493L182.096 89.8621L170.09 84.2037L158.036 69.5668L146.22 60.8053L134.567 53.1451L122.328 58.2772L110.046 67.1744L97.6983 78.5562L85.0959 87.1441L72.2547 94.1207L60.8458 88.3702L47.8528 95.7049L36.6717 91.2075L25.6317 86.6612L14.7707 82.6738L1.50635 87.6052"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M258.834 82.7388L246.378 100.951L233.813 118.984L221.113 134.754L208.261 148.344L195.203 157.941L181.906 164.842L168.626 159.156"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M360.38 25.3086L365.355 31.2436"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M271.089 77.6499L284.576 89.84L298.079 110.933L311.761 126.801L325.584 141.877L339.705 150.704"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M308.848 55.25L296.831 67.8199L284.576 89.8403L272.277 106.533L259.87 119.678L247.322 131.928L234.622 146.077L221.753 156.769L208.684 164.337L195.203 157.941L181.906 151.106L168.794 144.33L155.888 138.585L143.204 134.364L129.945 142.594"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M407.953 116.77L394.124 106.783L380.752 88.3103L367.688 63.2844L354.532 43.0814L347.93 39.2947L341.143 35.3995L327.808 32.5405L314.707 27.5874L301.676 29.6435L288.851 32.7358L288.276 33.3325L287.533 34.1138L277.86 44.237L277.23 44.7415L276.162 45.8428L263.749 58.174L251.624 61.1089L240.443 65.7311L229.099 70.4183L217.603 75.1761L205.63 70.2502L193.961 75.507L182.123 80.3354L170.091 84.2034L157.928 90.2036L145.564 95.2435L133.016 100.359L120.25 104.493L108.44 100.283L96.7111 94.1151L85.0961 87.1439L73.622 80.1727L62.4952 77.6445L49.6649 84.236L36.6719 91.2072L23.4238 96.9849"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M251.624 61.1091L262.686 48.3764L274.892 39.7451"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M256.555 74.0589L264.883 60.0188L276.161 45.8431L277.284 44.7417L277.859 44.2373L287.532 34.1141L288.851 32.7361L296.31 27.8318L299.988 25.4122L303.52 23.2042L310.985 18.5278"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M142.65 148.035L155.888 138.584L168.891 126.785L177.642 120.6L181.776 117.681L186.306 116.103L192.583 113.922L194.552 113.233L204.919 108.6L207.35 107.276L216.529 103.153L220.413 101.406"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M155.546 153.552L168.794 144.33L181.738 128.136"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M439.814 100.934L425.991 93.7949L415.526 98.1187L404.904 102.491L394.124 106.783L383.182 110.992L372.044 115.815L360.684 122.266L349.161 128.781L337.46 135.416L325.584 141.877L313.519 148.854L301.274 155.945L288.84 162.547L276.21 169.214L262.149 163.127L248.293 155.331L234.622 146.076L221.113 134.754L207.741 121.826L194.596 115.473L181.776 117.681L169.168 119.059L156.702 116.786L144.452 115.441L132.283 110.461L120.251 104.493L107.361 110.824L95.5339 105.915L83.8212 100.126L70.7305 105.849L57.4445 111.551"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M277.681 181.54L263.38 175.605L250.338 181.979L237.085 188.462L222.974 182.424"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M318.64 38.7197L332.132 45.7506L345.472 65.3894L358.628 94.1639L372.044 115.815L385.9 127.734"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M117.429 137.234L130.704 130.138L143.768 122.326L156.701 116.787L169.515 115.072L180.029 116.57"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M264.655 188.018L251.418 194.598L237.085 188.462"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M105.087 131.949L118.384 125.683L131.464 118.788L143.768 122.325L156.246 125.222L169.168 119.059L181.966 116.84L188.297 115.028"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M181.906 164.842L195.388 170.614L209.075 176.473L222.361 170.185L235.43 163.605L249.302 169.719L262.149 163.127L274.805 155.5L287.283 146.825L299.598 137.233L311.761 126.801L323.723 118.571L335.517 110.331L347.154 102.263L358.628 94.1638L369.836 89.5309L380.752 88.3102L391.482 87.2577L402.056 85.6248L412.477 83.4819L422.758 80.9375L436.294 89.5091L450.127 95.8076"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.61 101.775L47.8526 95.7045L59.2127 100.696L72.2546 94.1204L83.8208 100.126L96.7108 94.1149L109.319 85.5108L121.661 73.6136L133.992 66.0565L146.22 60.805L158.372 59.7091L170.264 55.3636L181.977 50.0742L193.581 49.1953L198.236 53.8609L205.332 60.9732L217.142 66.051L228.491 61.4234L239.683 56.8555L250.723 52.3527L262.685 48.3761L273.633 37.2982L283.078 34.5476L286.995 32.1226L287.332 31.8405L288.606 31.1462L295.643 27.6199L299.988 25.4118L305.147 23.7355L312.851 21.2291L325.833 22.0049L336.738 19.2056L349.801 23.7138L360.38 25.3088L365.908 31.1732L370.178 35.9093L370.471 36.2294L383.285 49.1031L383.583 49.3418L384.983 50.3129L391.059 54.6367L393.196 56.1557L400.01 60.4632L406.227 64.3909L416.128 65.4163L429.403 70.4291L439.282 67.5267L452.726 71.9155"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M480.166 80.8723L466.354 76.3641L456.496 80.4438L446.465 85.0334L436.293 89.5091L425.991 93.7949L412.477 83.4818L399.186 71.4002L388.829 70.1416L375.809 51.7885L372.581 46.7161L363.494 32.4481L362.935 31.5747L349.801 23.7138L338.908 27.0827L325.833 22.0049L314.707 27.5873L303.352 38.2747L291.905 45.9729L280.247 59.7146L268.458 75.4799L255.519 82.2828L251.743 85.7278"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M92.9188 126.742L106.243 121.235L119.361 115.805L131.464 118.788L144.452 115.441L157.179 110.097L169.515 115.072L182.047 109.739L194.395 104.482L204.372 108.389"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3947 92.2651L25.6318 86.661L38.7008 81.4149L49.6649 84.236L60.8459 88.3699L73.622 80.1726L86.2462 72.2574L98.6749 63.6478L109.406 56.6332L110.974 55.6079L118.916 51.2949L120.739 50.3076L123.158 48.9947L128.106 46.7379L132.674 44.6546L135.213 43.4937L146.676 49.4775L158.372 59.7092L170.199 70.5431L182.123 80.3353L194.102 84.8924L205.934 79.999L217.603 75.1761L229.728 79.6681L242.016 84.2197L253.496 79.2232L261.216 71.9645"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M69.1025 116.543L82.4157 111.188L95.5335 105.915L108.44 100.284L121.037 91.0068"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M290.489 175.171L277.681 181.54L264.655 188.017L250.338 181.979L236.244 176.039L222.974 182.424L209.075 176.473"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M303.092 168.911L290.489 175.171L276.21 169.215L263.38 175.605L249.302 169.719L236.244 176.039L222.361 170.186L208.684 164.337L195.388 170.614"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M283.171 71.1888L296.831 67.8198"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M278.863 52.8139L290.288 44.6871L303.352 38.2746L316.578 36.696L328.28 35.7846L330.016 35.6489L343.514 41.0957L356.816 59.5518L367.688 63.2843L378.332 67.5375L388.829 70.1416L389.947 71.449L402.056 85.6247L415.526 98.1186L429.349 106.131"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.7708 82.6736L27.8452 77.8073L38.7007 81.4149L51.5853 76.2829L62.4951 77.6445L71.1047 72.8759L75.1355 70.6408L81.9331 66.9192L87.6132 63.8052L92.1268 61.6189L99.9552 57.8213L107.143 56.3782L110.974 55.6079L122.328 58.277L133.992 66.0566L145.971 80.6989L157.928 90.2036L169.917 94.8962L182.075 99.6595L194.395 104.482L206.563 99.3068L218.553 94.2019L230.368 89.1783L242.016 84.2197L250.805 84.3662"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M267.259 64.7599L267.465 64.5971L278.863 52.8139L291.905 45.9729L305.186 40.1463L318.64 38.7195L330.016 35.6489L341.143 35.3994L352.14 33.0449L362.936 31.5747L373.211 40.6292L383.285 49.1031L383.584 49.3418L385.949 51.5769L388.51 53.9531L389.117 54.5174L389.231 54.6258L395.226 60.1974L396.246 61.1468L409.418 71.3459L419.476 71.2374L429.404 70.4291L442.858 75.4744L452.726 71.9155L466.354 76.3641"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M315.493 162.742L303.091 168.91L288.84 162.547L274.805 155.5L260.971 146.223L247.322 131.928L233.813 118.983L220.413 101.406"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.845 77.8074L40.7349 73.0171L51.5851 76.283L64.2852 71.102L67.9037 69.5884L76.8062 65.8614L81.64 63.8921L89.1537 60.8269L99.955 57.8214L104.187 56.0474L107.29 54.7455L112.161 52.7002L116.805 51.1378L123.158 48.9948L134.567 53.145L146.676 49.4777L158.638 47.2046L170.264 55.3639L182.058 65.7366L193.961 75.5071L205.934 79.9991L218.07 84.5562L230.368 89.1784L236.857 91.6142"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M275.022 75.5451L283.171 71.1887L295.117 61.9878L308.848 55.2499L320.615 48.7886"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M327.694 156.677L315.493 162.742L301.274 155.945L287.283 146.825L273.498 134.163L259.87 119.678L246.378 100.951L233.021 93.6162L231.361 94.5168L231.312 94.5439L231.236 94.5819L230.368 95.0539L219.931 100.712L215.797 102.871L207.35 107.277L204.919 108.6L194.595 115.474L193.679 116.385L181.738 128.136L168.891 126.785L156.246 125.223L143.204 134.364L130.704 130.138L118.384 125.684L106.243 121.235L94.2479 116.174L82.4158 111.188L70.7302 105.85L59.2128 100.696L45.9485 106.631"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.7354 73.0169L53.4408 68.2917L65.9728 63.6316L78.3311 59.0365L90.5158 54.5011L102.538 50.0309L114.392 45.6257L126.088 41.2748L137.627 36.9836L149.009 32.7521L159.93 36.1807L170.991 39.9728L182.189 43.1357L193.473 42.0289L205.044 51.8429L216.269 48.5173L227.325 44.1284L238.23 39.7992L248.998 34.7322L259.615 31.0323L270.097 26.6326L280.437 22.835L290.641 18.9995L302.197 22.7699L302.81 22.9706"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M147.186 41.291L148.526 41.98L158.638 47.2044L170.438 45.9729L175.961 45.1645L182.048 44.2802L193.581 49.1953L205.044 51.8428L216.697 57.1648L228.492 61.4234L240.443 65.731L250.17 69.241"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M356.816 59.5522L345.472 65.3896L333.922 72.9847L322.198 81.1711L310.258 92.7319L298.079 110.933L285.85 123.633L273.498 134.163L260.971 146.223L248.293 155.332L235.43 163.605L221.753 156.77L208.261 148.344L194.921 138.417L181.738 128.136"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M205.63 70.2503L217.142 66.0513L229.099 70.4184L241.218 74.8507L250.631 78.2034"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M149.008 32.7523L160.244 28.5696L171.17 32.416L182.253 28.2875L193.315 32.1718L204.247 28.0054L215.433 31.8897L226.761 35.4648L238.229 39.7995L249.85 43.8303L261.627 44.2209L273.633 37.2985L275.961 36.2786L281.955 33.6529L284.402 32.5787L286.854 32.1447"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M152.101 41.9315L159.067 42.8374L170.747 44.4487L182.047 44.2805L184.505 43.7923L193.472 42.0291L204.751 41.671L215.845 40.0924L227.325 44.1286L238.951 48.2137L250.723 52.353L261.628 44.2209L272.396 37.1846L281.668 33.6257L284.402 32.5786"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M160.244 28.5694L171.333 24.4463L182.253 28.2873L193.19 24.1696L204.247 28.0052L215.032 23.8876L225.681 19.8242L236.851 23.6109L248.163 27.4355L259.615 31.0324L271.225 32.7576L281.668 33.6256"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M171.333 24.4463L182.275 20.3775L193.191 24.1696L203.986 20.1008L214.641 16.0917L225.681 19.8242L236.19 15.815L247.354 19.5475L257.716 15.5438L267.948 11.5889L279.227 15.2725L290.641 18.9995"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M182.275 20.3778L193.076 16.3633L203.986 20.1011L215.032 23.8879L226.213 27.7233L237.535 31.6023L248.998 34.7326L260.608 36.9188L272.396 37.1847"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M335.979 19.016L347.409 18.9292"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M193.077 16.3632L203.737 12.3974L214.641 16.0919L225.161 12.1262L236.19 15.8153L246.562 11.8604L257.716 15.544L269.006 19.2439L279.227 15.2727"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M203.737 12.3973L214.261 8.48589L225.16 12.1261L235.544 8.22007L245.792 4.35742L256.805 7.95425L267.948 11.589"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M137.627 36.9834L148.526 39.6308L159.555 41.828L165.626 43.2494"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M53.4409 68.2916L64.2857 71.1017L75.1358 70.6406L86.2464 72.2573L97.6987 78.5558L109.319 85.5108L121.037 91.0064L133.651 87.7187L145.971 80.6987L158.036 69.5665L170.199 70.543L182.059 65.7363L193.728 58.8574L205.332 60.9732L216.698 57.1648L227.9 52.6619L238.951 48.2134L249.85 43.83L260.608 36.9184L271.225 32.7574L281.685 29.8766L292.008 26.4751L295.025 27.3377"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M214.261 8.48624L224.65 4.61816L235.544 8.22042L246.562 11.8606L256.805 7.9546"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M480.166 80.8721L470.292 85.7764L460.283 90.7566L450.127 95.8074L439.814 100.934L429.349 106.131L418.732 111.41L404.904 102.491L391.482 87.2574L379.297 68.9858L378.332 67.5373L377.892 66.7832L365.344 45.2565L365.03 44.9636L352.14 33.0447L338.908 27.0825L327.808 32.5402L316.578 36.6958L305.186 40.1461L293.5 52.8191L281.646 69.626L275.022 75.5447L271.089 77.6497L264.264 80.4815L258.834 82.7384L252.541 86.0477L245.45 89.7747L238.056 92.064L233.021 93.6156L231.589 94.5053L231.513 94.5488L231.399 94.6193L229.267 95.9376L220.413 101.406L218.786 104.026L207.74 121.826L194.921 138.416L181.906 151.105L168.626 159.156L155.546 153.552L142.65 148.035L129.945 142.593L117.429 137.233L105.087 131.949L92.9188 126.741L80.9294 121.609L69.1027 116.542L57.4443 111.551L45.9486 106.63L34.6101 101.775L23.4237 96.9846L12.3945 92.2648L1.50635 87.6047"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M78.3311 59.0365L89.1541 60.8268L92.995 59.2156L101.333 55.7218L113.355 50.8664L120.788 48.1322L125.225 46.5046L134.67 43.2116L136.938 42.4195L145.418 40.3797L148.526 39.631L159.93 36.1807L171.17 32.4157L182.237 36.4032L193.435 40.3906L204.507 36.1102L215.846 40.0922L226.761 35.4646L237.535 31.602L248.163 27.4355L258.655 23.3287L269.006 19.2437L280.437 22.835L292.008 26.4752L302.197 22.7699"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M224.651 4.61755L234.909 0.803711L245.792 4.35716"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M126.088 41.2749L136.938 42.4196L142.162 42.2189"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M90.5157 54.5013L101.333 55.7219L112.162 52.7002"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M114.391 45.6255L125.225 46.5044L131.719 44.8877"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M102.538 50.0311L113.355 50.8666L120.305 49.4507"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M191.791 113.608L182.047 109.74L169.716 104.841L157.559 100.007L145.016 105.199L133.016 100.36L121.037 91.0068"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M215.661 102.817L206.563 99.307L194.249 94.5493L182.075 99.6597L169.716 104.841L157.179 110.098L145.016 105.199L132.283 110.461L119.361 115.805L107.361 110.825L94.2483 116.174L80.9297 121.61"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M394.151 56.3457L403.032 60.0999L416.128 65.4164L426.007 63.1921"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M394.895 56.8394L403.032 60.0998L412.906 58.9171"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M257.906 64.3912L263.749 58.1741L274.892 39.7451L283.079 34.5479"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M392.811 54.6475L399.972 54.6908"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M264.264 80.4819L268.458 75.48L281.646 69.6263L295.117 61.9879L307.008 46.5101L318.64 38.7197"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M175.705 43.879L182.188 43.1357L193.434 40.3906L204.751 41.6709L216.268 48.5174L227.9 52.6621L239.683 56.8557L251.624 61.109"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M253.317 85.0609L255.519 82.2832L264.509 68.867L267.259 64.7602L267.52 64.4998L277.285 44.7417L278.375 43.0708L285.807 33.7505L286.995 32.123L287.332 31.8409L288.607 31.1465L294.927 27.3978L295.025 27.3381L298.296 25.423L302.81 22.9709L310.985 18.5278L323.821 15.9834L335.978 19.016L336.738 19.2059L347.409 18.9292L354.304 22.3199L360.38 25.3091L365.583 31.217L368.339 34.8084L373.211 40.6295L375.842 43.8032L386.139 56.2591L388.054 58.4834L399.186 71.4005L409.418 71.3463L422.758 80.9378L432.914 77.6556L442.858 75.4748L456.496 80.4441L470.292 85.777"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M386.519 50.2969L387.208 50.5248L399.973 54.6912L412.906 58.9173L426.008 63.1923L439.283 67.5269"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M230.466 94.9775L231.014 94.5381L231.215 94.5815"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M231.329 94.5167L231.014 94.5385L218.553 94.2021L206.249 89.5203L194.102 84.8927L182.096 89.862L169.917 94.8965L157.559 100.007L145.564 95.2437L133.65 87.7191L121.661 73.6139L110.046 67.1744L98.6748 63.6481L87.6132 63.8054L76.8064 65.8615L65.9725 63.6318"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M267.417 64.7002L280.247 59.7145L293.5 52.8193L307.009 46.5099L320.615 48.7884L332.132 45.7504L343.514 41.0957L354.532 43.0813L365.344 45.2567L375.809 51.7885L386.139 56.2588L396.246 61.1467L406.228 64.3909L410.611 66.6532L419.476 71.2374L432.914 77.6553L446.466 85.0334L460.283 90.7568"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M366.011 31.1572L371.138 36.4847L373.167 38.595L386.518 50.2969"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M205.63 70.2503L198.371 63.3008L193.727 58.8577L181.977 50.0744L170.437 45.9731L159.067 42.8374"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M135.213 43.4936L139.547 42.6961L142.162 42.2187L147.186 41.291L152.101 41.9312L159.555 41.8281L170.991 39.9727L182.237 36.403L193.315 32.1714L204.507 36.1101L215.433 31.8894L226.213 27.7229L236.851 23.6107L247.354 19.5474L258.655 23.3286L270.096 26.6325L281.684 29.8767L288.536 31.1353"
        className="stroke-gray-800"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M94 116L47.5 95.5L60.5 88.5L73.5 80.5L86 72.5L97.5 78.5L109.5 85.5L121 91L132.5 100.5L120 104.5L107 111L94 116Z"
        fill="url(#dot-pattern)"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M84 3L47.5 95.5M84 3L132.5 100.5M84 3L94 116M84 3L86 72.5M47.5 95.5L94 116M47.5 95.5L60.5 88.5L73.5 80.5L86 72.5M94 116L107 111L120 104.5L132.5 100.5M132.5 100.5L121 91L109.5 85.5L97.5 78.5L86 72.5"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-gray-400/30"
      />

      <path
        d="M290.5 175.5L262 163L275 155.5L287.5 146.5L299.5 137.5L313.5 148.5L327.5 156.5L290.5 175.5Z"
        fill="url(#dot-pattern)"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M295 84L262 163M295 84L327.5 156.5M295 84L290.5 175.5M295 84L299.5 137.5M262 163L290.5 175.5M262 163L275 155.5L287.5 146.5L299.5 137.5M327.5 156.5L290.5 175.5M327.5 156.5L313.5 148.5L299.5 137.5"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-gray-400/30"
      />

      <path
        d="M182.5 20.5L235 0.5L290.5 19L270 26.5L259 23L248 27.5L227 35.5L215.5 32L204.5 36L182 28.5L193 24L182.5 20.5Z"
        className="fill-emerald-400/10 stroke-emerald-400/80"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M157 110L133 100.5L121 91L133.5 87.5L146 80.5L158 69.5L170 70.5L182 80.5L194 75.5L205.5 70.5L217.5 66L241 74.5L230 79.5L242 84L169.5 115L157 110Z"
        className="fill-emerald-400/10 stroke-emerald-400/80"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Irrigating */}

      <path
        d="M133 87.5L145 95L157.5 100L182.5 90L170.5 84.5L157.5 69.5L145.5 80.5L133 87.5Z"
        fill="url(#irrigating-pattern)"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M133 87.5L145 95L157.5 100M133 87.5L145.5 80.5L157.5 69.5M133 87.5L152 52.5M157.5 69.5L170.5 84.5L182.5 90M157.5 69.5L152 52.5M157.5 100L182.5 90M157.5 100L152 52.5M182.5 90L152 52.5"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-blue-400/80"
      />

      {/* Dashed Beams */}
      <path
        d="M342.5 28L85 -1"
        className="stroke-gray-400/30"
        strokeWidth="1"
        strokeLinecap="square"
        strokeDasharray="2 5"
      />
      <path
        d="M341.5 27L296 83.5"
        className="stroke-gray-400/30"
        strokeWidth="1"
        strokeLinecap="square"
        strokeDasharray="2 5"
      />

      <defs>
        <pattern
          id="irrigating-pattern"
          patternUnits="userSpaceOnUse"
          width="64"
          height="64"
        >
          {Array.from({ length: 34 }, (_, i) => {
            const offset = i * 4;
            return (
              <path
                key={i}
                d={`M${-106 + offset} 110L${22 + offset} -18`}
                className="stroke-blue-400/60"
                strokeWidth="0.5"
              />
            );
          })}
        </pattern>
        <pattern
          id="dot-pattern"
          patternUnits="userSpaceOnUse"
          width="64"
          height="64"
        >
          {Array.from({ length: 16 }, (_, i) =>
            Array.from({ length: 16 }, (_, j) => (
              <circle
                key={`${i}-${j}`}
                cx={i * 4 + 2}
                cy={j * 4 + 2}
                r="0.5"
                className="fill-gray-400/30"
              />
            )),
          )}
        </pattern>
      </defs>
    </svg>
  );
  //array-end
};

export default function Example() {
  return (
    <div className="obfuscate">
      <section
        id="farm-management"
        aria-labelledby="management-title"
        className="relative flex w-full max-w-6xl scroll-my-24 flex-col items-center justify-center overflow-hidden rounded-2xl bg-gray-950 px-10 shadow-2xl shadow-black/50 sm:px-16 md:px-28 lg:mx-auto"
      >
        <div className="absolute left-0 z-10 h-full backdrop-blur-[2px]">
          <svg className="h-full w-8 border-r border-gray-900 stroke-gray-800 sm:w-20">
            <defs>
              <pattern
                id="diagonal-border-pattern"
                patternUnits="userSpaceOnUse"
                width="64"
                height="64"
              >
                {Array.from({ length: 17 }, (_, i) => {
                  const offset = i * 8;
                  return (
                    <path
                      key={i}
                      d={`M${-106 + offset} 110L${22 + offset} -18`}
                      stroke=""
                      strokeWidth="1"
                    />
                  );
                })}
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#diagonal-border-pattern)"
            />
          </svg>
        </div>
        <div className="absolute right-0 z-10 h-full backdrop-blur-[2px]">
          <svg className="h-full w-8 border-r border-gray-900 stroke-gray-800 sm:w-20">
            <defs>
              <pattern
                id="diagonal-border-pattern"
                patternUnits="userSpaceOnUse"
                width="64"
                height="64"
              >
                {Array.from({ length: 17 }, (_, i) => {
                  const offset = i * 8;
                  return (
                    <path
                      key={i}
                      d={`M${-106 + offset} 110L${22 + offset} -18`}
                      stroke=""
                      strokeWidth="1"
                    />
                  );
                })}
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#diagonal-border-pattern)"
            />
          </svg>
        </div>

        <div className="pt-12 text-base font-semibold tracking-tight text-blue-400 sm:pt-20 sm:text-lg">
          Farm Management
        </div>
        <h2
          id="management-title"
          className="mt-6 max-w-[700px] text-balance text-center text-2xl font-semibold tracking-tight text-white md:text-5xl"
        >
          Monitoring & Control for Precision Agriculture
        </h2>
        <p className="mt-4 max-w-2xl text-balance text-center text-base text-gray-400 sm:mt-8 sm:text-xl">
          Complete oversight of your farming operations across fields,
          irrigation systems, and aerial monitoring, delivering insights even in
          remote rural locations.
        </p>

        <div className="relative mb-10 ml-[17rem] mt-20 scale-90 sm:mb-16 md:ml-0 md:mt-24 md:scale-100">
          <SVGMap className="w-[50rem] shrink-0" />
          <div className="absolute -top-3 left-[130px]">
            <div className="relative flex items-center justify-center">
              <div className="absolute size-10 rounded-full bg-gray-950 ring-1 ring-white/15"></div>
              <div className="absolute -right-[3.7rem] -top-4 flex w-fit items-center justify-center whitespace-nowrap rounded-full bg-gray-950 px-1.5 py-0.5 text-xs text-white ring-1 ring-white/15">
                Scanning
              </div>
              <RiPlaneLine className="relative size-5 rotate-90 text-white" />
              <div
                style={{
                  animationDelay: '3.5s',
                }}
                className="absolute size-10 animate-[ping_5s_ease_infinite] rounded-full ring-1 ring-gray-500/50"
              ></div>
            </div>
          </div>
          <div className="absolute left-[243px] top-[73px]">
            <div className="relative flex items-center justify-center">
              <div className="absolute size-10 rounded-full bg-gray-950 ring-1 ring-white/15"></div>
              <div className="absolute -right-[3.7rem] -top-4 flex w-fit items-center justify-center whitespace-nowrap rounded-full bg-gray-950 px-1.5 py-0.5 text-xs text-white ring-1 ring-white/15">
                Irrigating
              </div>
              <RiPlaneLine className="relative size-5 rotate-90 text-white" />
              <div
                style={{
                  animationDelay: '3.5s',
                }}
                className="absolute size-10 animate-[ping_5s_ease_infinite] rounded-full ring-1 ring-gray-500/50"
              ></div>
            </div>
          </div>
          <div className="absolute right-[300px] top-32">
            <div className="relative flex items-center justify-center">
              <div className="absolute size-10 rounded-full bg-gray-950 ring-1 ring-white/15"></div>
              <div className="absolute -right-[3.7rem] -top-4 flex w-fit items-center justify-center whitespace-nowrap rounded-full bg-gray-950 px-1.5 py-0.5 text-xs text-white ring-1 ring-white/15">
                Scanning
              </div>
              <RiPlaneLine className="relative size-5 rotate-90 text-white" />
              <div
                style={{
                  animationDelay: '3.5s',
                }}
                className="absolute size-10 animate-[ping_5s_ease_infinite] rounded-full ring-1 ring-gray-500/50"
              ></div>
            </div>
          </div>
          <div className="absolute right-[390px] top-20">
            <div className="relative flex items-center justify-center">
              <div className="absolute size-10 rounded-full bg-gray-950 ring-1 ring-white/15"></div>
              <RiHome9Fill className="relative size-5 text-white" />
            </div>
          </div>
          <div className="absolute right-[430px] top-12">
            <div className="relative flex items-center justify-center">
              <div className="absolute size-10 rounded-full bg-gray-950 ring-1 ring-white/15"></div>
              <div className="absolute -right-7 -top-4 flex w-fit items-center justify-center whitespace-nowrap rounded-full bg-gray-950 px-1.5 py-0.5 text-xs text-white ring-1 ring-white/15">
                Idle
              </div>
              <RiTruckFill className="relative size-5 text-white" />
            </div>
          </div>
          <div className="absolute right-56 top-9">
            <div className="relative flex items-center justify-center">
              <RiSignalTowerFill className="z-10 size-5 text-white" />
              <div className="absolute size-10 rounded-full bg-gray-950 ring-1 ring-white/15 backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

### src/content/components/feature-sections/feature-section-12.tsx

```tsx
import type { SVGProps } from 'react';
import Link from 'next/link';
import {
  RiGithubFill,
  RiSlackFill,
  RiTwitterXFill,
  RiYoutubeFill,
} from '@remixicon/react';

const SolarLogo = (props: SVGProps<SVGSVGElement>) => (
  //array-start
  <svg
    viewBox="0 0 123 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M65.888 16.936C65.824 16.616 65.7067 16.2747 65.536 15.912C65.3867 15.528 65.152 15.176 64.832 14.856C64.512 14.536 64.096 14.2693 63.584 14.056C63.0933 13.8427 62.4853 13.736 61.76 13.736C61.2267 13.736 60.736 13.8213 60.288 13.992C59.8613 14.1413 59.488 14.3547 59.168 14.632C58.8693 14.888 58.6347 15.1867 58.464 15.528C58.2933 15.8693 58.208 16.232 58.208 16.616C58.208 17.2347 58.4107 17.7787 58.816 18.248C59.2213 18.696 59.84 19.0053 60.672 19.176L63.84 19.784C64.864 19.976 65.7707 20.2853 66.56 20.712C67.3493 21.1387 68.0107 21.6507 68.544 22.248C69.0773 22.824 69.4827 23.4747 69.76 24.2C70.0373 24.9253 70.176 25.6827 70.176 26.472C70.176 27.3467 69.9947 28.2107 69.632 29.064C69.2693 29.896 68.736 30.6427 68.032 31.304C67.3493 31.944 66.496 32.4667 65.472 32.872C64.4693 33.2773 63.3067 33.48 61.984 33.48C60.4693 33.48 59.168 33.2667 58.08 32.84C56.992 32.392 56.0747 31.8267 55.328 31.144C54.6027 30.4613 54.048 29.704 53.664 28.872C53.28 28.0187 53.0453 27.1867 52.96 26.376L57.056 25.288C57.0987 25.8427 57.2267 26.376 57.44 26.888C57.6747 27.4 57.9947 27.8587 58.4 28.264C58.8053 28.648 59.3067 28.9573 59.904 29.192C60.5013 29.4267 61.2053 29.544 62.016 29.544C63.2107 29.544 64.1173 29.288 64.736 28.776C65.376 28.2427 65.696 27.5707 65.696 26.76C65.696 26.0987 65.4613 25.5333 64.992 25.064C64.5227 24.5733 63.84 24.2427 62.944 24.072L59.776 23.432C57.9627 23.0693 56.512 22.3333 55.424 21.224C54.3573 20.0933 53.824 18.664 53.824 16.936C53.824 15.9333 54.0267 15.0053 54.432 14.152C54.8587 13.2773 55.4347 12.52 56.16 11.88C56.8853 11.24 57.728 10.7387 58.688 10.376C59.648 10.0133 60.6613 9.832 61.728 9.832C63.0933 9.832 64.256 10.024 65.216 10.408C66.1973 10.7707 67.008 11.24 67.648 11.816C68.288 12.392 68.7787 13.032 69.12 13.736C69.4827 14.4187 69.728 15.08 69.856 15.72L65.888 16.936ZM79.2515 29.608C79.7635 29.608 80.2648 29.512 80.7555 29.32C81.2462 29.128 81.6728 28.8507 82.0355 28.488C82.3982 28.104 82.6862 27.6347 82.8995 27.08C83.1342 26.5253 83.2515 25.8747 83.2515 25.128C83.2515 24.3813 83.1342 23.7307 82.8995 23.176C82.6862 22.6213 82.3982 22.1627 82.0355 21.8C81.6728 21.416 81.2462 21.128 80.7555 20.936C80.2648 20.744 79.7635 20.648 79.2515 20.648C78.7395 20.648 78.2382 20.744 77.7475 20.936C77.2568 21.128 76.8302 21.416 76.4675 21.8C76.1048 22.1627 75.8062 22.6213 75.5715 23.176C75.3582 23.7307 75.2515 24.3813 75.2515 25.128C75.2515 25.8747 75.3582 26.5253 75.5715 27.08C75.8062 27.6347 76.1048 28.104 76.4675 28.488C76.8302 28.8507 77.2568 29.128 77.7475 29.32C78.2382 29.512 78.7395 29.608 79.2515 29.608ZM79.2515 16.776C80.4248 16.776 81.5128 16.9893 82.5155 17.416C83.5395 17.8213 84.4142 18.3973 85.1395 19.144C85.8862 19.8693 86.4622 20.744 86.8675 21.768C87.2942 22.792 87.5075 23.912 87.5075 25.128C87.5075 26.344 87.2942 27.464 86.8675 28.488C86.4622 29.4907 85.8862 30.3653 85.1395 31.112C84.4142 31.8587 83.5395 32.4453 82.5155 32.872C81.5128 33.2773 80.4248 33.48 79.2515 33.48C78.0782 33.48 76.9795 33.2773 75.9555 32.872C74.9528 32.4453 74.0782 31.8587 73.3315 31.112C72.6062 30.3653 72.0302 29.4907 71.6035 28.488C71.1982 27.464 70.9955 26.344 70.9955 25.128C70.9955 23.912 71.1982 22.792 71.6035 21.768C72.0302 20.744 72.6062 19.8693 73.3315 19.144C74.0782 18.3973 74.9528 17.8213 75.9555 17.416C76.9795 16.9893 78.0782 16.776 79.2515 16.776ZM89.587 33V9.832H93.843V33H89.587ZM96.0657 28.712C96.0657 28.008 96.1831 27.3893 96.4177 26.856C96.6737 26.3013 97.0151 25.8213 97.4418 25.416C97.8684 25.0107 98.3591 24.6907 98.9138 24.456C99.4898 24.2213 100.108 24.0507 100.77 23.944L104.642 23.368C105.09 23.304 105.399 23.176 105.57 22.984C105.74 22.7707 105.826 22.5253 105.826 22.248C105.826 21.6933 105.602 21.2133 105.154 20.808C104.727 20.4027 104.066 20.2 103.17 20.2C102.231 20.2 101.506 20.456 100.994 20.968C100.503 21.48 100.226 22.0773 100.162 22.76L96.3857 21.96C96.4497 21.3413 96.6417 20.7227 96.9618 20.104C97.2818 19.4853 97.7191 18.9307 98.2738 18.44C98.8284 17.9493 99.5111 17.5547 100.322 17.256C101.132 16.936 102.071 16.776 103.138 16.776C104.375 16.776 105.431 16.9467 106.306 17.288C107.18 17.608 107.884 18.0453 108.418 18.6C108.972 19.1333 109.367 19.7627 109.602 20.488C109.858 21.2133 109.986 21.9707 109.986 22.76V30.504C109.986 30.9307 110.007 31.3893 110.05 31.88C110.092 32.3493 110.135 32.7227 110.178 33H106.274C106.231 32.7867 106.188 32.4987 106.146 32.136C106.124 31.752 106.114 31.4107 106.114 31.112C105.708 31.7307 105.122 32.2747 104.354 32.744C103.607 33.2133 102.647 33.448 101.474 33.448C100.642 33.448 99.8844 33.3093 99.2018 33.032C98.5404 32.776 97.9751 32.4347 97.5057 32.008C97.0364 31.56 96.6737 31.0587 96.4177 30.504C96.1831 29.928 96.0657 29.3307 96.0657 28.712ZM102.37 30.28C102.818 30.28 103.244 30.2267 103.65 30.12C104.076 29.992 104.45 29.7893 104.77 29.512C105.09 29.2133 105.346 28.84 105.538 28.392C105.73 27.9227 105.826 27.336 105.826 26.632V25.928L102.274 26.472C101.719 26.5573 101.25 26.76 100.866 27.08C100.503 27.3787 100.322 27.8373 100.322 28.456C100.322 28.9253 100.492 29.352 100.834 29.736C101.175 30.0987 101.687 30.28 102.37 30.28ZM122.596 21.48C122.169 21.3947 121.742 21.352 121.316 21.352C120.761 21.352 120.238 21.4267 119.748 21.576C119.257 21.7253 118.83 21.9707 118.468 22.312C118.105 22.6533 117.806 23.112 117.572 23.688C117.358 24.2427 117.252 24.9467 117.252 25.8V33H112.996V17.256H117.124V19.592C117.358 19.08 117.657 18.664 118.02 18.344C118.404 18.0027 118.798 17.7467 119.204 17.576C119.63 17.4053 120.046 17.288 120.452 17.224C120.878 17.16 121.262 17.128 121.604 17.128C121.774 17.128 121.934 17.1387 122.084 17.16C122.254 17.16 122.425 17.1707 122.596 17.192V21.48Z"
      className="fill-gray-950 dark:fill-gray-50"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.0997 17.8596L31.9992 7.9602L29.8779 5.83883L22.539 13.1777V0H19.539V13.1777L12.2002 5.83883L10.0789 7.9602L19.9784 17.8596L21.039 18.9203L22.0997 17.8596ZM24.2204 19.981L34.1199 10.0815L36.2412 12.2028L28.9024 19.5416H41.998V22.5416H28.9024L36.2412 29.8805L34.1199 32.0018L24.2204 22.1023L23.1597 21.0416L24.2204 19.981ZM7.95821 32.0018L17.8576 22.1023L18.9183 21.0416L17.8576 19.981L7.95821 10.0815L5.83688 12.2028L13.1757 19.5416H0V22.5416H13.1757L5.83688 29.8805L7.95821 32.0018ZM19.9784 24.2236L10.0789 34.1231L12.2002 36.2444L19.539 28.9056V42H22.539V28.9056L29.8779 36.2444L31.9992 34.1231L22.0997 24.2236L21.039 23.1629L19.9784 24.2236Z"
      fill="#3b82f6"
    />
  </svg>
  //array-end
);

const CURRENT_YEAR = new Date().getFullYear();

export default function Example() {
  const sections = {
    solutions: {
      title: 'Solutions',
      items: [
        { label: 'Performance Monitoring', href: '#' },
        { label: 'Resource Management', href: '#' },
        { label: 'Data Analytics', href: '#' },
        { label: 'System Integration', href: '#' },
        { label: 'Documentation', href: '#' },
        { label: 'Database Guide', href: '#' },
        { label: 'Infrastructure', href: '#' },
      ],
    },
    company: {
      title: 'Company',
      items: [
        { label: 'About us', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Success Stories', href: '#' },
        { label: 'Security', href: '#' },
      ],
    },
    resources: {
      title: 'Resources',
      items: [
        { label: 'Developer Network', href: '#' },
        {
          label: 'Community',
          href: '#',
          external: true,
        },
        { label: 'Contact', href: '#' },
        { label: 'Support', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Report an Issue', href: '#' },
      ],
    },
    partners: {
      title: 'Partners',
      items: [
        { label: 'Cloud Partners', href: '#', external: true },
        { label: 'System Status', href: '#', external: true },
        { label: 'Technology Partners', href: '#', external: true },
        { label: 'Integration Guide', href: '#' },
      ],
    },
  };

  return (
    <div className="obfuscate">
      <div className="xl:px-0 px-4 py-20">
        <footer
          id="footer"
          className="relative mx-auto flex max-w-6xl flex-wrap pt-4"
        >
          {/* Vertical Lines */}
          <div className="pointer-events-none inset-0">
            {/* Left */}
            <div
              className="absolute inset-y-0 my-[-5rem] w-px"
              style={{
                maskImage: 'linear-gradient(transparent, white 5rem)',
              }}
            >
              <svg className="h-full w-full" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  className="stroke-gray-300 dark:stroke-gray-800"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
              </svg>
            </div>

            {/* Right */}
            <div
              className="absolute inset-y-0 right-0 my-[-5rem] w-px"
              style={{
                maskImage: 'linear-gradient(transparent, white 5rem)',
              }}
            >
              <svg className="h-full w-full" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  className="stroke-gray-300 dark:stroke-gray-800"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
              </svg>
            </div>
          </div>
          <svg className="mb-10 h-20 w-full border-y border-dashed border-gray-300 stroke-gray-300 dark:border-gray-800 dark:stroke-gray-800">
            <defs>
              <pattern
                id="diagonal-footer-pattern"
                patternUnits="userSpaceOnUse"
                width="64"
                height="64"
              >
                {Array.from({ length: 17 }, (_, i) => {
                  const offset = i * 8;
                  return (
                    <path
                      key={i}
                      d={`M${-106 + offset} 110L${22 + offset} -18`}
                      stroke=""
                      strokeWidth="1"
                    />
                  );
                })}
              </pattern>
            </defs>
            <rect
              stroke="none"
              width="100%"
              height="100%"
              fill="url(#diagonal-footer-pattern)"
            />
          </svg>
          <div className="mr-auto flex w-full justify-between lg:w-fit lg:flex-col">
            <Link href="/" className="flex select-none items-center">
              <SolarLogo className="ml-2 w-20" />
              <span className="sr-only">Solar Logo (go home)</span>
            </Link>

            <div>
              <div className="mt-4 flex items-center">
                {/* Social Icons */}
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-900"
                >
                  <RiTwitterXFill className="size-5" />
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-900"
                >
                  <RiYoutubeFill className="size-5" />
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-900"
                >
                  <RiGithubFill className="size-5" />
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-900"
                >
                  <RiSlackFill className="size-5" />
                </Link>
              </div>
              <div className="ml-2 hidden text-sm text-gray-700 dark:text-gray-400 lg:inline">
                &copy; {CURRENT_YEAR} Solar Technologies, Inc.
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {Object.entries(sections).map(([key, section]) => (
            <div key={key} className="mt-10 min-w-44 pl-2 lg:mt-0 lg:pl-0">
              <h3 className="mb-4 font-medium text-gray-900 dark:text-gray-50 sm:text-sm">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item.label} className="text-sm">
                    <Link
                      href={item.href}
                      className="text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </footer>
      </div>
    </div>
  );
}
```

### src/content/components/feature-sections/index.ts

```ts
export { default as FeatureSection01 } from './feature-section-01';
export { default as FeatureSection02 } from './feature-section-02';
export { default as FeatureSection03 } from './feature-section-03';
export { default as FeatureSection04 } from './feature-section-04';
export { default as FeatureSection05 } from './feature-section-05';
export { default as FeatureSection06 } from './feature-section-06';
export { default as FeatureSection07 } from './feature-section-07';
export { default as FeatureSection08 } from './feature-section-08';
export { default as FeatureSection09 } from './feature-section-09';
export { default as FeatureSection10 } from './feature-section-10';
export { default as FeatureSection11 } from './feature-section-11';
export { default as FeatureSection12 } from './feature-section-12';
```
