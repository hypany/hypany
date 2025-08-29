# Components / tables

[Back to index](index.md)

## Components / tables

Files:
- `src/content/components/tables/index.ts`
- `src/content/components/tables/table-01.tsx`
- `src/content/components/tables/table-02.tsx`
- `src/content/components/tables/table-03.tsx`
- `src/content/components/tables/table-04.tsx`
- `src/content/components/tables/table-05.tsx`
- `src/content/components/tables/table-06.tsx`
- `src/content/components/tables/table-07.tsx`
- `src/content/components/tables/table-08.tsx`
- `src/content/components/tables/table-09.tsx`
- `src/content/components/tables/table-10.tsx`
- `src/content/components/tables/table-11.tsx`

### src/content/components/tables/index.ts

```ts
export { default as Table01 } from './table-01';
export { default as Table02 } from './table-02';
export { default as Table03 } from './table-03';
export { default as Table04 } from './table-04';
export { default as Table05 } from './table-05';
export { default as Table06 } from './table-06';
export { default as Table07 } from './table-07';
export { default as Table08 } from './table-08';
export { default as Table09 } from './table-09';
export { default as Table10 } from './table-10';
export { default as Table11 } from './table-11';
```

### src/content/components/tables/table-01.tsx

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

const data = [
  //array-start
  {
    workspace: 'sales_by_day_api',
    owner: 'John Doe',
    status: 'live',
    costs: '$3,509.00',
    region: 'US-West 1',
    capacity: '99%',
    lastEdited: '23/09/2023 13:00',
  },
  {
    workspace: 'marketing_campaign',
    owner: 'Jane Smith',
    status: 'live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '80%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'sales_campaign',
    owner: 'Jane Smith',
    status: 'live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '80%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'development_env',
    owner: 'Mike Johnson',
    status: 'live',
    costs: '$4,200.00',
    region: 'EU-West 1',
    capacity: '60%',
    lastEdited: '21/09/2023 14:30',
  },
  {
    workspace: 'new_workspace_1',
    owner: 'Alice Brown',
    status: 'live',
    costs: '$2,100.00',
    region: 'US-West 2',
    capacity: '75%',
    lastEdited: '24/09/2023 09:15',
  },
  {
    workspace: 'test_environment',
    owner: 'David Clark',
    status: 'inactive',
    costs: '$800.00',
    region: 'EU-Central 1',
    capacity: '40%',
    lastEdited: '25/09/2023 16:20',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-50">
            Workspaces
          </h3>
          <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
            Overview of all registered workspaces within your organization.
          </p>
        </div>
        <Button className="mt-4 w-full sm:mt-0 sm:w-fit">Add workspace</Button>
      </div>
      <TableRoot className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Workspace</TableHeaderCell>
              <TableHeaderCell>Owner</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Region</TableHeaderCell>
              <TableHeaderCell>Capacity</TableHeaderCell>
              <TableHeaderCell className="text-right">Costs</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Last edited
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.workspace}>
                <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                  {item.workspace}
                </TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.region}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell className="text-right">{item.costs}</TableCell>
                <TableCell className="text-right">{item.lastEdited}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/tables/table-02.tsx

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

const data = [
  //array-start
  {
    workspace: 'sales_by_day_api',
    owner: 'John Doe',
    status: 'Live',
    costs: '$3,509.00',
    region: 'US-West 1',
    capacity: '99%',
    lastEdited: '23/09/2023 13:00',
  },
  {
    workspace: 'marketing_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '80%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'test_environment',
    owner: 'David Clark',
    status: 'Inactive',
    costs: '$800.00',
    region: 'EU-Central 1',
    capacity: '40%',
    lastEdited: '25/09/2023 16:20',
  },
  {
    workspace: 'sales_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '80%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'development_env',
    owner: 'Mike Johnson',
    status: 'Inactive',
    costs: '$4,200.00',
    region: 'EU-West 1',
    capacity: '60%',
    lastEdited: '21/09/2023 14:30',
  },
  {
    workspace: 'new_workspace_1',
    owner: 'Alice Brown',
    status: 'Inactive',
    costs: '$2,100.00',
    region: 'US-West 2',
    capacity: '75%',
    lastEdited: '24/09/2023 09:15',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-50">
            Workspaces
          </h3>
          <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
            Overview of all registered workspaces within your organization.
          </p>
        </div>
        <Button className="mt-4 w-full sm:mt-0 sm:w-fit">Add workspace</Button>
      </div>
      <TableRoot className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Workspace</TableHeaderCell>
              <TableHeaderCell>Owner</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Region</TableHeaderCell>
              <TableHeaderCell>Capacity</TableHeaderCell>
              <TableHeaderCell className="text-right">Costs</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Last edited
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.workspace}
                className="even:bg-gray-50 even:dark:bg-gray-900"
              >
                <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                  {item.workspace}
                </TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.region}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell className="text-right">{item.costs}</TableCell>
                <TableCell className="text-right">{item.lastEdited}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/tables/table-03.tsx

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

const data = [
  //array-start
  {
    workspace: 'sales_by_day_api',
    owner: 'John Doe',
    status: 'Live',
    costs: '$3,509.00',
    region: 'US-West 1',
    capacity: '31.1%',
    lastEdited: '23/09/2023 13:00',
  },
  {
    workspace: 'marketing_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '81.3%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'test_environment',
    owner: 'David Clark',
    status: 'Inactive',
    costs: '$800.00',
    region: 'EU-Central 1',
    capacity: '40.8%',
    lastEdited: '25/09/2023 16:20',
  },
  {
    workspace: 'sales_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '51.4%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'development_env',
    owner: 'Mike Johnson',
    status: 'Inactive',
    costs: '$4,200.00',
    region: 'EU-West 1',
    capacity: '60.4%',
    lastEdited: '21/09/2023 14:30',
  },
  {
    workspace: 'new_workspace_1',
    owner: 'Alice Brown',
    status: 'Inactive',
    costs: '$2,100.00',
    region: 'US-West 2',
    capacity: '75.9%',
    lastEdited: '24/09/2023 09:15',
  },
  {
    workspace: 'sales_by_day_api',
    owner: 'John Doe',
    status: 'Live',
    costs: '$3,509.00',
    region: 'US-West 1',
    capacity: '31.1%',
    lastEdited: '23/09/2023 13:00',
  },
  {
    workspace: 'marketing_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '81.3%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'test_environment',
    owner: 'David Clark',
    status: 'Inactive',
    costs: '$800.00',
    region: 'EU-Central 1',
    capacity: '40.8%',
    lastEdited: '25/09/2023 16:20',
  },
  {
    workspace: 'sales_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '51.4%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'development_env',
    owner: 'Mike Johnson',
    status: 'Inactive',
    costs: '$4,200.00',
    region: 'EU-West 1',
    capacity: '60.4%',
    lastEdited: '21/09/2023 14:30',
  },
  {
    workspace: 'new_workspace_1',
    owner: 'Alice Brown',
    status: 'Inactive',
    costs: '$2,100.00',
    region: 'US-West 2',
    capacity: '75.9%',
    lastEdited: '24/09/2023 09:15',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-50">
            Workspaces
          </h3>
          <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
            Overview of all registered workspaces within your organization.
          </p>
        </div>
        <Button className="mt-4 w-full sm:mt-0 sm:w-fit">Add workspace</Button>
      </div>
      <TableRoot className="mt-8 h-96">
        <Table className="border-separate border-spacing-0 border-transparent">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="sticky top-0 z-10 bg-white dark:bg-gray-950">
                Workspace
              </TableHeaderCell>
              <TableHeaderCell className="sticky top-0 z-10 bg-white dark:bg-gray-950">
                Owner
              </TableHeaderCell>
              <TableHeaderCell className="sticky top-0 z-10 bg-white dark:bg-gray-950">
                Status
              </TableHeaderCell>
              <TableHeaderCell className="sticky top-0 z-10 bg-white dark:bg-gray-950">
                Region
              </TableHeaderCell>
              <TableHeaderCell className="sticky top-0 z-10 bg-white dark:bg-gray-950">
                Capacity
              </TableHeaderCell>
              <TableHeaderCell className="sticky top-0 z-10 bg-white text-right dark:bg-gray-950">
                Last edited
              </TableHeaderCell>
              <TableHeaderCell className="sticky top-0 z-10 bg-white text-right dark:bg-gray-950">
                Costs
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.workspace}>
                <TableCell className="border-b border-gray-200 font-medium text-gray-900 dark:border-gray-800 dark:text-gray-50">
                  {item.workspace}
                </TableCell>
                <TableCell className="border-b border-gray-200 dark:border-gray-800">
                  {item.owner}
                </TableCell>
                <TableCell className="border-b border-gray-200 dark:border-gray-800">
                  {item.status}
                </TableCell>
                <TableCell className="border-b border-gray-200 dark:border-gray-800">
                  {item.region}
                </TableCell>
                <TableCell className="border-b border-gray-200 dark:border-gray-800">
                  {item.capacity}
                </TableCell>
                <TableCell className="border-b border-gray-200 text-right dark:border-gray-800">
                  {item.lastEdited}
                </TableCell>
                <TableCell className="border-b border-gray-200 text-right dark:border-gray-800">
                  {item.costs}
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

### src/content/components/tables/table-04.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

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

const data = [
  //array-start
  {
    workspace: 'sales_by_day_api',
    owner: 'John Doe',
    status: 'Live',
    costs: '$3,509.00',
    region: 'US-West 1',
    capacity: '99%',
    lastEdited: '23/09/2023 13:00',
  },
  {
    workspace: 'marketing_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '80%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'test_environment',
    owner: 'David Clark',
    status: 'Inactive',
    costs: '$800.00',
    region: 'EU-Central 1',
    capacity: '40%',
    lastEdited: '25/09/2023 16:20',
  },
  {
    workspace: 'sales_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '80%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'development_env',
    owner: 'Mike Johnson',
    status: 'Inactive',
    costs: '$4,200.00',
    region: 'EU-West 1',
    capacity: '60%',
    lastEdited: '21/09/2023 14:30',
  },
  {
    workspace: 'new_workspace_1',
    owner: 'Alice Brown',
    status: 'Inactive',
    costs: '$2,100.00',
    region: 'US-West 2',
    capacity: '75%',
    lastEdited: '24/09/2023 09:15',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-50">
            Workspaces
          </h3>
          <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
            Overview of all registered workspaces within your organization.
          </p>
        </div>
        <Button className="mt-4 w-full sm:mt-0 sm:w-fit">Add workspace</Button>
      </div>
      <TableRoot className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Workspace</TableHeaderCell>
              <TableHeaderCell>Owner</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Region</TableHeaderCell>
              <TableHeaderCell>Capacity</TableHeaderCell>
              <TableHeaderCell className="text-right">Costs</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Last edited
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.workspace}>
                <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                  {item.workspace}
                </TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>
                  <span
                    className={cx(
                      item.status === 'Live'
                        ? 'bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-500/20 dark:text-emerald-500 dark:ring-emerald-400/20'
                        : 'bg-orange-100 text-orange-800 ring-orange-600/10 dark:bg-orange-500/20 dark:text-orange-500 dark:ring-orange-400/20',
                      'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
                    )}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>{item.region}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell className="text-right">{item.costs}</TableCell>
                <TableCell className="text-right">{item.lastEdited}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/tables/table-05.tsx

```tsx
'use client';

import { Button } from '@/components/Button';
import { ProgressCircle } from '@/components/ProgressCircle';
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
    workspace: 'sales_by_day_api',
    owner: 'John Doe',
    status: 'Live',
    costs: '$3,509.00',
    region: 'US-West 1',
    capacity: 31.1,
    lastEdited: '23/09/2023 13:00',
  },
  {
    workspace: 'marketing_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: 81.3,
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'test_environment',
    owner: 'David Clark',
    status: 'Inactive',
    costs: '$800.00',
    region: 'EU-Central 1',
    capacity: 40.8,
    lastEdited: '25/09/2023 16:20',
  },
  {
    workspace: 'sales_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: 51.4,
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'development_env',
    owner: 'Mike Johnson',
    status: 'Inactive',
    costs: '$4,200.00',
    region: 'EU-West 1',
    capacity: 60.4,
    lastEdited: '21/09/2023 14:30',
  },
  {
    workspace: 'new_workspace_1',
    owner: 'Alice Brown',
    status: 'Inactive',
    costs: '$2,100.00',
    region: 'US-West 2',
    capacity: 75.9,
    lastEdited: '24/09/2023 09:15',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-50">
            Workspaces
          </h3>
          <p className="dark:text-gry-500 mt-1 text-sm/6 text-gray-500">
            Overview of all registered workspaces within your organization.
          </p>
        </div>
        <Button className="mt-4 w-full sm:mt-0 sm:w-fit">Add workspace</Button>
      </div>
      <TableRoot className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Workspace</TableHeaderCell>
              <TableHeaderCell>Owner</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Region</TableHeaderCell>
              <TableHeaderCell>Capacity</TableHeaderCell>
              <TableHeaderCell className="text-right">Costs</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Last edited
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.workspace}>
                <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                  {item.workspace}
                </TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.region}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-2.5">
                    <ProgressCircle
                      value={item.capacity}
                      radius={8}
                      strokeWidth={3}
                      color={
                        item.capacity < 50
                          ? 'emerald'
                          : item.capacity < 75
                            ? 'orange'
                            : 'red'
                      }
                      aria-hidden={true}
                    />
                    {item.capacity}%
                  </div>
                </TableCell>
                <TableCell className="text-right">{item.costs}</TableCell>
                <TableCell className="text-right">{item.lastEdited}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/tables/table-06.tsx

```tsx
'use client';

import { Button } from '@/components/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/Table';

const data = [
  //array-start
  {
    workspace: 'sales_by_day_api',
    owner: 'John Doe',
    status: 'Live',
    costs: '$3,509.00',
    region: 'US-West 1',
    capacity: '31.1%',
    lastEdited: '23/09/2023 13:00',
  },
  {
    workspace: 'marketing_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '81.3%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'test_environment',
    owner: 'David Clark',
    status: 'Inactive',
    costs: '$800.00',
    region: 'EU-Central 1',
    capacity: '40.8%',
    lastEdited: '25/09/2023 16:20',
  },
  {
    workspace: 'sales_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '51.4%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'development_env',
    owner: 'Mike Johnson',
    status: 'Inactive',
    costs: '$4,200.00',
    region: 'EU-West 1',
    capacity: '60.4%',
    lastEdited: '21/09/2023 14:30',
  },
  {
    workspace: 'new_workspace_1',
    owner: 'Alice Brown',
    status: 'Inactive',
    costs: '$2,100.00',
    region: 'US-West 2',
    capacity: '75.9%',
    lastEdited: '24/09/2023 09:15',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-50">
            Workspaces
          </h3>
          <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
            Overview of all registered workspaces within your organization.
          </p>
        </div>
        <Button className="mt-4 w-full sm:mt-0 sm:w-fit">Add workspace</Button>
      </div>
      <TableRoot className="mt-8">
        <Table className="border-transparent dark:border-transparent">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Workspace</TableHeaderCell>
              <TableHeaderCell>Owner</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Region</TableHeaderCell>
              <TableHeaderCell>Capacity</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Last edited
              </TableHeaderCell>
              <TableHeaderCell className="text-right">Costs</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.workspace}>
                <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                  {item.workspace}
                </TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.region}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell className="text-right">{item.lastEdited}</TableCell>
                <TableCell className="text-right">{item.costs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableHeaderCell
                scope="row"
                colSpan={6}
                className="border-transparent text-right !font-normal !text-gray-600 dark:border-transparent dark:!text-gray-400"
              >
                Subtotal
              </TableHeaderCell>
              <TableCell className="text-right !font-normal">
                $22,049.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHeaderCell
                scope="row"
                colSpan={6}
                className="border-transparent text-right !font-normal !text-gray-600 dark:border-transparent dark:!text-gray-400"
              >
                VAT (7.7%)
              </TableHeaderCell>
              <TableCell className="text-right !font-normal">
                $1,697.77
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHeaderCell
                scope="row"
                colSpan={6}
                className="border-transparent text-right font-semibold dark:border-transparent"
              >
                Total
              </TableHeaderCell>
              <TableCell className="text-right font-semibold text-gray-900 dark:text-gray-50">
                $23,746.77
              </TableCell>
            </TableRow>
          </TableFoot>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/tables/table-07.tsx

```tsx
'use client';

import React from 'react';

import { Button } from '@/components/Button';
import { SelectNative } from '@/components/SelectNative';
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
    workspace: 'sales_by_day_api',
    owner: 'John Doe',
    status: 'Live',
    costs: '$3,509.00',
    region: 'US-West 1',
    capacity: '31.1%',
    lastEdited: '23/09/2023 13:00',
  },
  {
    workspace: 'marketing_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '81.3%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'test_environment',
    owner: 'David Clark',
    status: 'Inactive',
    costs: '$800.00',
    region: 'EU-Central 1',
    capacity: '40.8%',
    lastEdited: '25/09/2023 16:20',
  },
  {
    workspace: 'sales_campaign',
    owner: 'Jane Smith',
    status: 'Downtime',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '51.4%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'development_env',
    owner: 'Mike Johnson',
    status: 'Inactive',
    costs: '$4,200.00',
    region: 'EU-West 1',
    capacity: '60.4%',
    lastEdited: '21/09/2023 14:30',
  },
  {
    workspace: 'new_workspace_1',
    owner: 'Alice Brown',
    status: 'Inactive',
    costs: '$2,100.00',
    region: 'US-West 2',
    capacity: '75.9%',
    lastEdited: '24/09/2023 09:15',
  },
  //array-end
] as const;

export default function Example() {
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const isStatusSelected = (item: (typeof data)[number]) =>
    selectedStatus.includes(item.status) || selectedStatus.length === 0;

  return (
    <div className="obfuscate">
      <div className="md:flex md:items-center md:justify-between md:space-x-8">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-50">
            Workspaces
          </h3>
          <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
            Overview of all registered workspaces within your organization.
          </p>
        </div>
        <div className="mt-4 sm:flex sm:items-center sm:gap-2 md:mt-0">
          <SelectNative
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            placeholder="Select status..."
          >
            <option value="">All</option>
            <option value="Live">Live</option>
            <option value="Inactive">Inactive</option>
            <option value="Downtime">Downtime</option>
          </SelectNative>
          <Button className="mt-2 w-full whitespace-nowrap py-2 sm:mt-0 md:w-fit">
            Add workspace
          </Button>
        </div>
      </div>
      <TableRoot className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Workspace</TableHeaderCell>
              <TableHeaderCell>Owner</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Region</TableHeaderCell>
              <TableHeaderCell>Capacity</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Last edited
              </TableHeaderCell>
              <TableHeaderCell className="text-right">Costs</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((item) => isStatusSelected(item))
              .map((item) => (
                <TableRow key={item.workspace}>
                  <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                    {item.workspace}
                  </TableCell>
                  <TableCell>{item.owner}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.region}</TableCell>
                  <TableCell>{item.capacity}</TableCell>
                  <TableCell className="text-right">
                    {item.lastEdited}
                  </TableCell>
                  <TableCell className="text-right">{item.costs}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/tables/table-08.tsx

```tsx
'use client';

import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
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

const data = [
  //array-start
  {
    workspace: 'sales_by_day_api',
    owner: 'John Doe',
    status: 'Live',
    costs: '$3,509.00',
    region: 'US-West 1',
    capacity: '31.1%',
    lastEdited: '23/09/2023 13:00',
  },
  {
    workspace: 'marketing_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '81.3%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'test_environment',
    owner: 'David Clark',
    status: 'Inactive',
    costs: '$800.00',
    region: 'EU-Central 1',
    capacity: '40.8%',
    lastEdited: '25/09/2023 16:20',
  },
  {
    workspace: 'sales_campaign',
    owner: 'Emma Stone',
    status: 'Downtime',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '51.4%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'development_env',
    owner: 'Mike Johnson',
    status: 'Inactive',
    costs: '$4,200.00',
    region: 'EU-West 1',
    capacity: '60.4%',
    lastEdited: '21/09/2023 14:30',
  },
  {
    workspace: 'new_workspace_1',
    owner: 'Alice Brown',
    status: 'Inactive',
    costs: '$2,100.00',
    region: 'US-West 2',
    capacity: '75.9%',
    lastEdited: '24/09/2023 09:15',
  },
  //array-end
];

const Example = () => {
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [selectedOwners, setSelectedOwners] = React.useState('');

  const filterData = (item: (typeof data)[number]) => {
    const statusMatch =
      !selectedStatus ||
      selectedStatus === 'All' ||
      item.status === selectedStatus;
    const ownerMatch =
      !selectedOwners ||
      selectedOwners === 'All' ||
      item.owner === selectedOwners;
    return statusMatch && ownerMatch;
  };

  const filteredData = data.filter(filterData);

  return (
    <div className="obfuscate">
      <div className="md:flex md:items-center md:justify-between md:space-x-8">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-50">
            Workspaces
          </h3>
          <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
            Overview of all registered workspaces within your organization.
          </p>
        </div>
        <div className="mt-4 sm:flex sm:items-center sm:space-x-2 md:mt-0">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue
                placeholder="Select status"
                aria-label={selectedStatus}
              />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="All">All</SelectItem>
              <SelectSeparator />
              <SelectItem value="Live">Live</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Downtime">Downtime</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedOwners} onValueChange={setSelectedOwners}>
            <SelectTrigger className="mt-2 w-full sm:mt-0 md:w-40">
              <SelectValue
                placeholder="Select owner"
                aria-label={selectedStatus}
              />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="All">All</SelectItem>
              <SelectSeparator />
              {data.map((item) => (
                <SelectItem key={item.owner} value={item.owner}>
                  {item.owner}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <TableRoot className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Workspace</TableHeaderCell>
              <TableHeaderCell>Owner</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Region</TableHeaderCell>
              <TableHeaderCell>Capacity</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Last edited
              </TableHeaderCell>
              <TableHeaderCell className="text-right">Costs</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length ? (
              filteredData.map((item) => (
                <TableRow key={item.workspace}>
                  <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                    {item.workspace}
                  </TableCell>
                  <TableCell>{item.owner}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.region}</TableCell>
                  <TableCell>{item.capacity}</TableCell>
                  <TableCell className="text-right">
                    {item.lastEdited}
                  </TableCell>
                  <TableCell className="text-right">{item.costs}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
};

export default Example;
```

### src/content/components/tables/table-09.tsx

```tsx
'use client';

import { Button } from '@/components/Button';
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

const chartData = [
  //array-start
  {
    date: 'Nov 24, 2023',
    sales_by_day_api: 156.2,
    marketing_campaign: 68.5,
    test_environment: 71.8,
    sales_campaign: 205.3,
    development_env: 1050.6,
  },
  {
    date: 'Nov 25, 2023',
    sales_by_day_api: 152.5,
    marketing_campaign: 69.3,
    test_environment: 67.2,
    sales_campaign: 223.1,
    development_env: 945.8,
  },
  {
    date: 'Nov 26, 2023',
    sales_by_day_api: 148.7,
    marketing_campaign: 69.8,
    test_environment: 61.5,
    sales_campaign: 240.9,
    development_env: 839.4,
  },
  {
    date: 'Nov 27, 2023',
    sales_by_day_api: 155.3,
    marketing_campaign: 73.5,
    test_environment: 57.9,
    sales_campaign: 254.7,
    development_env: 830.2,
  },
  {
    date: 'Nov 28, 2023',
    sales_by_day_api: 160.1,
    marketing_campaign: 75.2,
    test_environment: 59.6,
    sales_campaign: 308.5,
    development_env: 845.7,
  },
  {
    date: 'Nov 29, 2023',
    sales_by_day_api: 175.6,
    marketing_campaign: 89.2,
    test_environment: 57.3,
    sales_campaign: 341.4,
    development_env: 950.2,
  },
  {
    date: 'Nov 30, 2023',
    sales_by_day_api: 180.2,
    marketing_campaign: 92.7,
    test_environment: 59.8,
    sales_campaign: 378.1,
    development_env: 995.9,
  },
  {
    date: 'Dec 01, 2023',
    sales_by_day_api: 185.5,
    marketing_campaign: 95.3,
    test_environment: 62.4,
    sales_campaign: 320.3,
    development_env: 1060.4,
  },
  {
    date: 'Dec 02, 2023',
    sales_by_day_api: 182.3,
    marketing_campaign: 93.8,
    test_environment: 60.7,
    sales_campaign: 356.5,
    development_env: 965.8,
  },
  {
    date: 'Dec 03, 2023',
    sales_by_day_api: 180.7,
    marketing_campaign: 91.6,
    test_environment: 58.9,
    sales_campaign: 340.7,
    development_env: 970.3,
  },
  {
    date: 'Dec 04, 2023',
    sales_by_day_api: 178.5,
    marketing_campaign: 89.7,
    test_environment: 56.2,
    sales_campaign: 365.9,
    development_env: 975.9,
  },
  {
    date: 'Dec 05, 2023',
    sales_by_day_api: 176.2,
    marketing_campaign: 87.5,
    test_environment: 54.8,
    sales_campaign: 375.1,
    development_env: 964.6,
  },
  {
    date: 'Dec 06, 2023',
    sales_by_day_api: 174.8,
    marketing_campaign: 85.3,
    test_environment: 53.4,
    sales_campaign: 340.3,
    development_env: 960.4,
  },
  {
    date: 'Dec 07, 2023',
    sales_by_day_api: 178.0,
    marketing_campaign: 88.2,
    test_environment: 55.2,
    sales_campaign: 335.5,
    development_env: 955.3,
  },
  {
    date: 'Dec 08, 2023',
    sales_by_day_api: 180.6,
    marketing_campaign: 90.5,
    test_environment: 56.8,
    sales_campaign: 310.7,
    development_env: 950.3,
  },
  {
    date: 'Dec 09, 2023',
    sales_by_day_api: 182.4,
    marketing_campaign: 92.8,
    test_environment: 58.4,
    sales_campaign: 300.9,
    development_env: 845.4,
  },
  {
    date: 'Dec 10, 2023',
    sales_by_day_api: 179.7,
    marketing_campaign: 90.2,
    test_environment: 57.0,
    sales_campaign: 290.1,
    development_env: 1011.6,
  },
  {
    date: 'Dec 11, 2023',
    sales_by_day_api: 154.2,
    marketing_campaign: 88.7,
    test_environment: 55.6,
    sales_campaign: 291.3,
    development_env: 1017.9,
  },
  {
    date: 'Dec 12, 2023',
    sales_by_day_api: 151.9,
    marketing_campaign: 86.5,
    test_environment: 53.9,
    sales_campaign: 293.5,
    development_env: 940.3,
  },
  {
    date: 'Dec 13, 2023',
    sales_by_day_api: 149.3,
    marketing_campaign: 83.7,
    test_environment: 52.1,
    sales_campaign: 301.7,
    development_env: 900.8,
  },
  {
    date: 'Dec 14, 2023',
    sales_by_day_api: 148.8,
    marketing_campaign: 81.4,
    test_environment: 50.5,
    sales_campaign: 321.9,
    development_env: 780.4,
  },
  {
    date: 'Dec 15, 2023',
    sales_by_day_api: 145.5,
    marketing_campaign: 79.8,
    test_environment: 48.9,
    sales_campaign: 328.1,
    development_env: 765.1,
  },
  {
    date: 'Dec 16, 2023',
    sales_by_day_api: 140.2,
    marketing_campaign: 84.5,
    test_environment: 50.2,
    sales_campaign: 331.3,
    development_env: 745.9,
  },
  {
    date: 'Dec 17, 2023',
    sales_by_day_api: 143.8,
    marketing_campaign: 82.1,
    test_environment: 49.6,
    sales_campaign: 373.5,
    development_env: 741.8,
  },
  {
    date: 'Dec 18, 2023',
    sales_by_day_api: 148.5,
    marketing_campaign: 86.9,
    test_environment: 51.3,
    sales_campaign: 381.7,
    development_env: 739.8,
  },
  //array-end
];

const data = [
  //array-start
  {
    workspace: 'sales_by_day_api',
    owner: 'John Doe',
    status: 'Live',
    costs: '$3,509.00',
    region: 'US-West 1',
    capacity: '31.1%',
    lastEdited: '23/09/2023 13:00',
  },
  {
    workspace: 'marketing_campaign',
    owner: 'Jane Smith',
    status: 'Live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '81.3%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'test_environment',
    owner: 'David Clark',
    status: 'Inactive',
    costs: '$800.00',
    region: 'EU-Central 1',
    capacity: '40.8%',
    lastEdited: '25/09/2023 16:20',
  },
  {
    workspace: 'sales_campaign',
    owner: 'Emma Stone',
    status: 'Downtime',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '51.4%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'development_env',
    owner: 'Mike Johnson',
    status: 'Inactive',
    costs: '$4,200.00',
    region: 'EU-West 1',
    capacity: '60.4%',
    lastEdited: '21/09/2023 14:30',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-8">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-50">
            Workspaces
          </h3>
          <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
            Overview of all registered workspaces within your organization.
          </p>
        </div>
        <Button className="mt-4 w-full sm:mt-0 sm:w-fit">Add workspace</Button>
      </div>
      <TableRoot className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Workspace</TableHeaderCell>
              <TableHeaderCell>Owner</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Region</TableHeaderCell>
              <TableHeaderCell>Capacity</TableHeaderCell>
              <TableHeaderCell className="text-right">Costs</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Last edited
              </TableHeaderCell>
              <TableHeaderCell className="text-right">
                API requests
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.workspace}>
                <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                  {item.workspace}
                </TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.region}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell className="text-right">{item.costs}</TableCell>
                <TableCell className="text-right">{item.lastEdited}</TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <SparkAreaChart
                      data={chartData}
                      index="date"
                      categories={[item.workspace]}
                      fill="solid"
                      className="h-8 w-40"
                    />
                  </div>
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

### src/content/components/tables/table-10.tsx

```tsx
'use client';

import { Fragment } from 'react';
import {
  RiCheckLine,
  RiInformationLine,
  RiSubtractLine,
} from '@remixicon/react';

import { cx } from '@/lib/utils';

import { Tooltip } from '@/components/Tooltip';

interface Plan {
  name: string;
  price: string;
  description: string;
  capacity: string[];
  features: string[];
  isStarter: boolean;
  isRecommended: boolean;
  buttonText: string;
  buttonLink: string;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '$0',
    description:
      'For individuals and freelancers that need a scalable database.',
    capacity: ['Up to 5 users, 1 admin', '1 workspace'],
    features: [
      'Up to 1000/req. per day',
      '5 GB max storage',
      'Community Slack Support',
    ],
    isStarter: true,
    isRecommended: false,
    buttonText: 'Get started',
    buttonLink: '#',
  },
  {
    name: 'Teams',
    price: '$49',
    description: 'For small teams and start-ups that need a scalable database.',
    capacity: ['Up to 100 users, 3 admins', 'Up to 20 workspaces'],
    features: [
      'Unlimited requests',
      '$0.07 per processed GB',
      '$0.34 per stored GB',
      'Slack Connect',
    ],
    isStarter: false,
    isRecommended: false,
    buttonText: 'Start 14-day trial',
    buttonLink: '#',
  },
  {
    name: 'Business',
    price: '$99',
    description:
      'For larger teams that need more advanced controls and features.',
    capacity: ['Up to 500 users, 10 admins', 'Unlimited workspaces'],
    features: [
      'Unlimited requests',
      'Volume discount',
      '$0.03 per processed GB',
      '$0.1 per stored GB',
      'Single Sign-On (SSO)',
    ],
    isStarter: false,
    isRecommended: true,
    buttonText: 'Start 14-day trial',
    buttonLink: '#',
  },
];

interface Feature {
  name: string;
  plans: Record<string, boolean | string>;
  tooltip?: string;
}

interface Section {
  name: string;
  features: Feature[];
}

const sections: Section[] = [
  {
    name: 'Workspace Features',
    features: [
      {
        name: 'Email notifications & webhooks',
        tooltip:
          'Consectetur qui culpa ipsum in ea irure duis culpa incididunt.',
        plans: { Starter: true, Teams: true, Business: true },
      },
      {
        name: 'Workspaces',
        tooltip:
          'Consectetur qui culpa ipsum in ea irure duis culpa incididunt.',
        plans: { Starter: '5', Teams: '10', Business: 'Unlimited' },
      },
      {
        name: 'Storage',
        tooltip:
          'Consectetur qui culpa ipsum in ea irure duis culpa incididunt.',
        plans: {
          Starter: '$0.65 per stored GB',
          Teams: '$0.34 per stored GB',
          Business: 'Customized¹',
        },
      },
      {
        name: 'Seats',
        tooltip:
          'Consectetur qui culpa ipsum in ea irure duis culpa incididunt.',
        plans: {
          Starter: '5 users',
          Teams: 'Up to 20 users',
          Business: 'Unlimited',
        },
      },
    ],
  },
  {
    name: 'Automation',
    features: [
      {
        name: 'Service accounts',
        tooltip:
          'Consectetur qui culpa ipsum in ea irure duis culpa incididunt.',
        plans: { Starter: true, Teams: true, Business: true },
      },
      {
        name: 'Admin API',
        tooltip:
          'Consectetur qui culpa ipsum in ea irure duis culpa incididunt.',
        plans: { Teams: true, Business: true },
      },
      {
        name: 'No-Code workflow builder',
        tooltip:
          'Consectetur qui culpa ipsum in ea irure duis culpa incididunt.',
        plans: { Starter: 'Limited', Teams: 'Standard', Business: 'Enhanced' },
      },
    ],
  },
  {
    name: 'Analytics',
    features: [
      {
        name: 'Analytics retention',
        tooltip:
          'Consectetur qui culpa ipsum in ea irure duis culpa incididunt.',
        plans: { Starter: '7 days', Teams: '1 year', Business: 'Unlimited' },
      },
      {
        name: 'Anomaly detection',
        tooltip:
          'Consectetur qui culpa ipsum in ea irure duis culpa incididunt.',
        plans: { Teams: true, Business: true },
      },
      {
        name: 'Custom report builder',
        tooltip:
          'Consectetur qui culpa ipsum in ea irure duis culpa incididunt.',
        plans: { Business: true },
      },
    ],
  },
  {
    name: 'Support',
    features: [
      {
        name: 'Slack',
        plans: {
          Starter: 'Community',
          Teams: 'Connect',
          Business: 'Dedicated agent',
        },
      },
      {
        name: 'Email',
        plans: { Starter: '2-4 days', Teams: '1-2 days', Business: 'Priority' },
      },
    ],
  },
];

export default function Example() {
  return (
    <div className="obfuscate">
      <section className="mx-auto py-10">
        <div className="hidden lg:block">
          <div className="relative">
            <table className="w-full table-fixed border-separate border-spacing-0 text-left">
              <caption className="sr-only">Pricing plan comparison</caption>
              <colgroup>
                <col className="w-2/5" />
                <col className="w-1/5" />
                <col className="w-1/5" />
                <col className="w-1/5" />
              </colgroup>
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="border-b border-gray-100 bg-white pb-8 dark:border-gray-800 dark:bg-gray-950"
                  >
                    <div className="font-semibold leading-7 text-gray-900 dark:text-gray-50">
                      Compare prices
                    </div>
                    <div className="text-sm font-normal text-gray-600 dark:text-gray-400">
                      Price per month (billed yearly)
                    </div>
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      scope="col"
                      className="border-b border-gray-100 bg-white px-6 pb-8 dark:border-gray-800 dark:bg-gray-950 lg:px-8"
                    >
                      <div
                        className={cx(
                          !plan.isStarter
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-900 dark:text-gray-50',
                          'font-semibold leading-7',
                        )}
                      >
                        {plan.name}
                      </div>
                      <div className="text-sm font-normal text-gray-600 dark:text-gray-400">
                        {plan.price}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sections.map((section, sectionIdx) => (
                  <Fragment key={section.name}>
                    <tr>
                      <th
                        scope="colgroup"
                        colSpan={4}
                        className={cx(
                          sectionIdx === 0 ? 'pt-14' : 'pt-10',
                          'border-b border-gray-100 pb-4 text-base font-semibold leading-6 text-gray-900 dark:border-gray-800 dark:text-gray-50',
                        )}
                      >
                        {section.name}
                      </th>
                    </tr>
                    {section.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="transition hover:bg-blue-50/30 dark:hover:bg-blue-800/5"
                      >
                        <th
                          scope="row"
                          className="flex items-center gap-2 border-b border-gray-100 py-4 text-sm font-normal leading-6 text-gray-900 dark:border-gray-800 dark:text-gray-50"
                        >
                          <span>{feature.name}</span>
                          {feature.tooltip ? (
                            <Tooltip side="right" content={feature.tooltip}>
                              <RiInformationLine
                                className="size-4 shrink-0 text-gray-700 dark:text-gray-400"
                                aria-hidden="true"
                              />
                            </Tooltip>
                          ) : null}
                        </th>
                        {plans.map((plan) => (
                          <td
                            key={plan.name}
                            className="border-b border-gray-100 px-6 py-4 dark:border-gray-800 lg:px-8"
                          >
                            {typeof feature.plans[plan.name] === 'string' ? (
                              <div className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                                {feature.plans[plan.name]}
                              </div>
                            ) : (
                              <>
                                {feature.plans[plan.name] === true ? (
                                  <RiCheckLine
                                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <RiSubtractLine
                                    className="h-5 w-5 text-gray-400 dark:text-gray-600"
                                    aria-hidden="true"
                                  />
                                )}

                                <span className="sr-only">
                                  {feature.plans[plan.name] === true
                                    ? 'Included'
                                    : 'Not included'}{' '}
                                  in {plan.name}
                                </span>
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
```

### src/content/components/tables/table-11.tsx

```tsx
'use client';

import { cx } from '@/lib/utils';

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

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

interface WeekData {
  percentage: number;
  count: number;
}

interface CohortData {
  size: number;
  dates: {
    start: string;
    end: string;
  };
  weeks: (WeekData | null)[];
}

type CohortRetentionData = Record<string, CohortData>;

const cohorts: CohortRetentionData = {
  // array-start
  'Sep 15, 2023': {
    size: 2157,
    dates: {
      start: '2023-09-15T00:00:00.000Z',
      end: '2023-09-22T00:00:00.000Z',
    },
    weeks: [
      {
        percentage: 100,
        count: 2157,
      },
      {
        percentage: 69.2,
        count: 1492,
      },
      {
        percentage: 49.3,
        count: 1063,
      },
      {
        percentage: 44.6,
        count: 962,
      },
      {
        percentage: 28.8,
        count: 621,
      },
      {
        percentage: 23.9,
        count: 515,
      },
      {
        percentage: 19.3,
        count: 416,
      },
      {
        percentage: 12.6,
        count: 271,
      },
      {
        percentage: 9.6,
        count: 207,
      },
      {
        percentage: 8.2,
        count: 176,
      },
    ],
  },
  'Sep 22, 2023': {
    size: 2584,
    dates: {
      start: '2023-09-22T00:00:00.000Z',
      end: '2023-09-29T00:00:00.000Z',
    },
    weeks: [
      {
        percentage: 100,
        count: 2584,
      },
      {
        percentage: 62.2,
        count: 1607,
      },
      {
        percentage: 51.9,
        count: 1341,
      },
      {
        percentage: 46.4,
        count: 1198,
      },
      {
        percentage: 29.1,
        count: 751,
      },
      {
        percentage: 29.4,
        count: 759,
      },
      {
        percentage: 18.5,
        count: 478,
      },
      {
        percentage: 15.5,
        count: 400,
      },
      {
        percentage: 15.8,
        count: 408,
      },
      null,
    ],
  },
  'Sep 29, 2023': {
    size: 2873,
    dates: {
      start: '2023-09-29T00:00:00.000Z',
      end: '2023-10-06T00:00:00.000Z',
    },
    weeks: [
      {
        percentage: 100,
        count: 2873,
      },
      {
        percentage: 63.5,
        count: 1824,
      },
      {
        percentage: 54.9,
        count: 1577,
      },
      {
        percentage: 46.3,
        count: 1330,
      },
      {
        percentage: 32.2,
        count: 925,
      },
      {
        percentage: 27.5,
        count: 790,
      },
      {
        percentage: 26.1,
        count: 749,
      },
      {
        percentage: 15.4,
        count: 442,
      },
      null,
      null,
    ],
  },
  'Oct 6, 2023': {
    size: 2882,
    dates: {
      start: '2023-10-06T00:00:00.000Z',
      end: '2023-10-13T00:00:00.000Z',
    },
    weeks: [
      {
        percentage: 100,
        count: 2882,
      },
      {
        percentage: 61.8,
        count: 1781,
      },
      {
        percentage: 55,
        count: 1585,
      },
      {
        percentage: 39.6,
        count: 1141,
      },
      {
        percentage: 32.4,
        count: 933,
      },
      {
        percentage: 22.1,
        count: 636,
      },
      {
        percentage: 19.4,
        count: 559,
      },
      null,
      null,
      null,
    ],
  },
  'Oct 13, 2023': {
    size: 2925,
    dates: {
      start: '2023-10-13T00:00:00.000Z',
      end: '2023-10-20T00:00:00.000Z',
    },
    weeks: [
      {
        percentage: 100,
        count: 2925,
      },
      {
        percentage: 65.6,
        count: 1918,
      },
      {
        percentage: 56.7,
        count: 1658,
      },
      {
        percentage: 45.2,
        count: 1322,
      },
      {
        percentage: 32.2,
        count: 941,
      },
      {
        percentage: 28,
        count: 819,
      },
      null,
      null,
      null,
      null,
    ],
  },
  'Oct 20, 2023': {
    size: 2066,
    dates: {
      start: '2023-10-20T00:00:00.000Z',
      end: '2023-10-27T00:00:00.000Z',
    },
    weeks: [
      {
        percentage: 100,
        count: 2066,
      },
      {
        percentage: 67.9,
        count: 1402,
      },
      {
        percentage: 55.4,
        count: 1144,
      },
      {
        percentage: 37.6,
        count: 776,
      },
      {
        percentage: 29.7,
        count: 613,
      },
      null,
      null,
      null,
      null,
      null,
    ],
  },
  'Oct 27, 2023': {
    size: 2302,
    dates: {
      start: '2023-10-27T00:00:00.000Z',
      end: '2023-11-03T00:00:00.000Z',
    },
    weeks: [
      {
        percentage: 100,
        count: 2302,
      },
      {
        percentage: 64.5,
        count: 1484,
      },
      {
        percentage: 48.8,
        count: 1123,
      },
      {
        percentage: 46.1,
        count: 1061,
      },
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  'Nov 3, 2023': {
    size: 2361,
    dates: {
      start: '2023-11-03T00:00:00.000Z',
      end: '2023-11-10T00:00:00.000Z',
    },
    weeks: [
      {
        percentage: 100,
        count: 2361,
      },
      {
        percentage: 66.9,
        count: 1579,
      },
      {
        percentage: 51,
        count: 1204,
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  'Nov 10, 2023': {
    size: 2729,
    dates: {
      start: '2023-11-10T00:00:00.000Z',
      end: '2023-11-17T00:00:00.000Z',
    },
    weeks: [
      {
        percentage: 100,
        count: 2729,
      },
      {
        percentage: 69.9,
        count: 1907,
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  'Nov 17, 2023': {
    size: 2905,
    dates: {
      start: '2023-11-17T00:00:00.000Z',
      end: '2023-11-24T00:00:00.000Z',
    },
    weeks: [
      {
        percentage: 100,
        count: 2905,
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  // array-end
};

const colorClasses = [
  'bg-blue-50 dark:bg-blue-950',
  'bg-blue-100 dark:bg-blue-900',
  'bg-blue-200 dark:bg-blue-800',
  'bg-blue-300 dark:bg-blue-700',
  'bg-blue-400 dark:bg-blue-600',
  'bg-blue-500 dark:bg-blue-500',
  'bg-blue-600 dark:bg-blue-400',
];

const getBackgroundColor = (
  value: number,
  minValue: number,
  maxValue: number,
) => {
  const normalizedValue = (value - minValue) / (maxValue - minValue);
  const index = Math.min(
    Math.floor(normalizedValue * colorClasses.length),
    colorClasses.length - 1,
  );
  return colorClasses[index];
};

const getTextColor = (value: number, minValue: number, maxValue: number) => {
  return (value - minValue) / (maxValue - minValue) > 0.6
    ? 'text-white dark:text-white'
    : 'text-gray-900 dark:text-gray-50';
};

export default function CohortRetention() {
  const cohortEntries = Object.entries(cohorts as CohortRetentionData);
  const weeksCount = cohortEntries[0]?.[1].weeks.length ?? 0;
  const weeks = Array.from({ length: weeksCount }, (_, i) => i);

  return (
    <div className="obfuscate">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Cohort Retention
          </h1>
          <p className="text-gray-500 dark:text-gray-500 sm:text-sm/6">
            Track customer engagement patterns and analyze support trends across
            user segments
          </p>
        </div>
      </div>
      <Divider />
      <section className="mt-8">
        <TableRoot className="overflow-scroll">
          <Table className="border-none">
            <TableHead>
              <TableRow>
                <TableHeaderCell className="sticky left-0 top-0 z-10 min-w-40 border-transparent bg-white p-px dark:border-transparent dark:bg-gray-950">
                  <span className="block">Cohort</span>
                  <span className="block font-normal text-gray-500 dark:text-gray-500">
                    Initial customers
                  </span>
                </TableHeaderCell>
                {weeks.map((week) => (
                  <TableHeaderCell
                    key={week}
                    className="border-none font-medium"
                  >
                    Week {week}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="divide-none">
              {cohortEntries.map(
                ([cohortKey, cohortData]: [string, CohortData]) => (
                  <TableRow key={cohortKey} className="h-full">
                    <TableCell className="sticky left-0 z-10 h-full bg-white p-0 dark:bg-gray-950 sm:min-w-56">
                      <span className="block text-sm font-medium text-gray-900 dark:text-gray-50">
                        {cohortKey}
                      </span>
                      <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-500">
                        {valueFormatter(cohortData.size)} customers
                      </span>
                    </TableCell>
                    {cohortData.weeks.map((weekData, weekIndex) => (
                      <TableCell
                        key={weekIndex}
                        className="h-full min-w-24 p-[2px]"
                      >
                        {weekData === null ? (
                          <div
                            className={cx(
                              'flex h-[64px] flex-col justify-center rounded border border-dashed border-gray-200 bg-gray-50 px-3.5 py-3 text-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-800',
                            )}
                          >
                            <span className="h-3 w-9 rounded-sm bg-gray-100 dark:bg-gray-800/50" />
                            <span className="mt-1 h-3 w-6 rounded-sm bg-gray-100 dark:bg-gray-800/50" />
                          </div>
                        ) : (
                          <div
                            className={cx(
                              'flex h-full flex-col justify-center rounded px-3.5 py-3',
                              getBackgroundColor(weekData.percentage, 0, 100),
                              getTextColor(weekData.percentage, 0, 100),
                            )}
                          >
                            <span className="block text-sm font-medium">
                              {weekData.percentage.toFixed(1)}%
                            </span>
                            <span
                              className={cx(
                                'mt-0.5 block text-sm',
                                getTextColor(weekData.percentage, 0, 100),
                              )}
                            >
                              {weekData.count}
                            </span>
                          </div>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableRoot>
      </section>
    </div>
  );
}
```
