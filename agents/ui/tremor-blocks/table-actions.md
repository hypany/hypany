# Components / table-actions

[Back to index](index.md)

## Components / table-actions

Files:
- `src/content/components/table-actions/index.jsx`
- `src/content/components/table-actions/table-action-01.tsx`
- `src/content/components/table-actions/table-action-02.tsx`
- `src/content/components/table-actions/table-action-03.tsx`
- `src/content/components/table-actions/table-action-04.tsx`
- `src/content/components/table-actions/table-action-05.tsx`
- `src/content/components/table-actions/table-action-06.tsx`
- `src/content/components/table-actions/table-action-07.tsx`
- `src/content/components/table-actions/table-action-08.tsx`
- `src/content/components/table-actions/table-action-09.tsx`
- `src/content/components/table-actions/table-action-10.tsx`
- `src/content/components/table-actions/table-action-11.tsx`

### src/content/components/table-actions/index.jsx

```jsx
export { default as TableAction01 } from './table-action-01';
export { default as TableAction02 } from './table-action-02';
export { default as TableAction03 } from './table-action-03';
export { default as TableAction04 } from './table-action-04';
export { default as TableAction05 } from './table-action-05';
export { default as TableAction06 } from './table-action-06';
export { default as TableAction07 } from './table-action-07';
export { default as TableAction08 } from './table-action-08';
export { default as TableAction09 } from './table-action-09';
export { default as TableAction10 } from './table-action-10';
export { default as TableAction11 } from './table-action-11';
```

### src/content/components/table-actions/table-action-01.tsx

```tsx
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortDirection,
  useReactTable,
} from '@tanstack/react-table';

import { cx } from '@/lib/utils';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/Table';

// This example requires @tanstack/react-table

const workspaces = [
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
  {
    workspace: 'analytics_dashboard',
    owner: 'Sarah Wilson',
    status: 'live',
    costs: '$6,500.00',
    region: 'US-West 1',
    capacity: '90%',
    lastEdited: '26/09/2023 11:30',
  },
  {
    workspace: 'research_project',
    owner: 'Michael Adams',
    status: 'live',
    costs: '$3,900.00',
    region: 'US-East 1',
    capacity: '70%',
    lastEdited: '27/09/2023 08:45',
  },
  {
    workspace: 'training_environment',
    owner: 'Laura White',
    status: 'live',
    costs: '$2,500.00',
    region: 'EU-North 1',
    capacity: '55%',
    lastEdited: '28/09/2023 12:15',
  },
  //array-end
];

const workspacesColumns = [
  //array-start
  {
    header: 'Workspace',
    accessorKey: 'workspace',
    enableSorting: true,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Owner',
    accessorKey: 'owner',
    enableSorting: true,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    enableSorting: false,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Region',
    accessorKey: 'region',
    enableSorting: false,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Capacity',
    accessorKey: 'capacity',
    enableSorting: false,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Costs',
    accessorKey: 'costs',
    enableSorting: false,
    meta: {
      align: 'text-right',
    },
  },
  {
    header: 'Last edited',
    accessorKey: 'lastEdited',
    enableSorting: false,
    meta: {
      align: 'text-right',
    },
  },
  //array-end
];

export default function Example() {
  const table = useReactTable({
    data: workspaces,
    columns: workspacesColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: 'workspace',
          desc: false,
        },
      ],
    },
  });

  return (
    <div className="obfuscate">
      <TableRoot>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortingHandler =
                    header.column.getToggleSortingHandler?.();
                  const getAriaSortValue = (
                    isSorted: false | SortDirection,
                  ) => {
                    switch (isSorted) {
                      case 'asc':
                        return 'ascending';
                      case 'desc':
                        return 'descending';
                      case false:
                      default:
                        return 'none';
                    }
                  };

                  return (
                    <TableHeaderCell
                      key={header.id}
                      onClick={sortingHandler}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && sortingHandler) {
                          sortingHandler(event);
                        }
                      }}
                      className={cx(
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        '!px-0.5 !py-1.5',
                      )}
                      tabIndex={header.column.getCanSort() ? 0 : -1}
                      aria-sort={getAriaSortValue(header.column.getIsSorted())}
                    >
                      <div
                        className={cx(
                          header.column.columnDef.enableSorting === true
                            ? 'flex items-center justify-between gap-2 hover:bg-gray-50 hover:dark:bg-gray-900'
                            : header.column.columnDef.meta?.align,
                          'rounded-md px-3 py-1.5',
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() ? (
                          <div className="-space-y-2">
                            <RiArrowUpSLine
                              className={cx(
                                'size-4 text-gray-900 dark:text-gray-50',
                                header.column.getIsSorted() === 'desc'
                                  ? 'opacity-30'
                                  : '',
                              )}
                              aria-hidden={true}
                            />
                            <RiArrowDownSLine
                              className={cx(
                                'size-4 text-gray-900 dark:text-gray-50',
                                header.column.getIsSorted() === 'asc'
                                  ? 'opacity-30'
                                  : '',
                              )}
                              aria-hidden={true}
                            />
                          </div>
                        ) : null}
                      </div>
                    </TableHeaderCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cx(cell.column.columnDef.meta?.align)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/table-actions/table-action-02.tsx

```tsx
import { RiArrowDownLine, RiArrowUpLine } from '@remixicon/react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortDirection,
  useReactTable,
} from '@tanstack/react-table';

import { cx } from '@/lib/utils';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/Table';

// This example requires @tanstack/react-table

const workspaces = [
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
  {
    workspace: 'analytics_dashboard',
    owner: 'Sarah Wilson',
    status: 'live',
    costs: '$6,500.00',
    region: 'US-West 1',
    capacity: '90%',
    lastEdited: '26/09/2023 11:30',
  },
  {
    workspace: 'research_project',
    owner: 'Michael Adams',
    status: 'live',
    costs: '$3,900.00',
    region: 'US-East 1',
    capacity: '70%',
    lastEdited: '27/09/2023 08:45',
  },
  {
    workspace: 'training_environment',
    owner: 'Laura White',
    status: 'live',
    costs: '$2,500.00',
    region: 'EU-North 1',
    capacity: '55%',
    lastEdited: '28/09/2023 12:15',
  },
  //array-end
];

const workspacesColumns: {
  header: string;
  accessorKey: string;
  enableSorting: boolean;
  meta: {
    align: string;
  };
}[] = [
  //array-start
  {
    header: 'Workspace',
    accessorKey: 'workspace',
    enableSorting: true,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Owner',
    accessorKey: 'owner',
    enableSorting: true,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    enableSorting: false,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Region',
    accessorKey: 'region',
    enableSorting: false,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Capacity',
    accessorKey: 'capacity',
    enableSorting: false,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Costs',
    accessorKey: 'costs',
    enableSorting: false,
    meta: {
      align: 'text-right',
    },
  },
  {
    header: 'Last edited',
    accessorKey: 'lastEdited',
    enableSorting: false,
    meta: {
      align: 'text-right',
    },
  },
  //array-end
];

export default function Example() {
  const table = useReactTable({
    data: workspaces,
    columns: workspacesColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: 'workspace',
          desc: false,
        },
      ],
    },
  });

  return (
    <div className="obfuscate">
      <TableRoot>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortingHandler =
                    header.column.getToggleSortingHandler?.();
                  const getAriaSortValue = (
                    isSorted: false | SortDirection,
                  ) => {
                    switch (isSorted) {
                      case 'asc':
                        return 'ascending';
                      case 'desc':
                        return 'descending';
                      case false:
                      default:
                        return 'none';
                    }
                  };
                  return (
                    <TableHeaderCell
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && sortingHandler) {
                          sortingHandler(event);
                        }
                      }}
                      className={cx(
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        'group !px-0.5 !py-1.5',
                      )}
                      tabIndex={header.column.getCanSort() ? 0 : -1}
                      aria-sort={getAriaSortValue(header.column.getIsSorted())}
                    >
                      <div
                        className={cx(
                          header.column.columnDef.enableSorting === true
                            ? 'flex items-center justify-between gap-2 hover:bg-gray-50 hover:dark:bg-gray-900'
                            : header.column.columnDef.meta?.align,
                          'rounded-lg px-3 py-2.5',
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() ? (
                          header.column.getIsSorted() === 'asc' ? (
                            <RiArrowUpLine
                              className="size-4 text-gray-900 dark:text-gray-50"
                              aria-hidden={true}
                            />
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <RiArrowDownLine
                              className="size-4 text-gray-900 dark:text-gray-50"
                              aria-hidden={true}
                            />
                          ) : (
                            <RiArrowUpLine
                              className="size-4 text-gray-500 dark:text-gray-500"
                              aria-hidden={true}
                            />
                          )
                        ) : null}
                      </div>
                    </TableHeaderCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cx(cell.column.columnDef.meta?.align)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/table-actions/table-action-03.tsx

```tsx
import { RiArrowDownSFill, RiArrowUpSFill } from '@remixicon/react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortDirection,
  useReactTable,
} from '@tanstack/react-table';

import { cx } from '@/lib/utils';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/Table';

// This example requires @tanstack/react-table

const workspaces = [
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
  {
    workspace: 'analytics_dashboard',
    owner: 'Sarah Wilson',
    status: 'live',
    costs: '$6,500.00',
    region: 'US-West 1',
    capacity: '90%',
    lastEdited: '26/09/2023 11:30',
  },
  {
    workspace: 'research_project',
    owner: 'Michael Adams',
    status: 'live',
    costs: '$3,900.00',
    region: 'US-East 1',
    capacity: '70%',
    lastEdited: '27/09/2023 08:45',
  },
  {
    workspace: 'training_environment',
    owner: 'Laura White',
    status: 'live',
    costs: '$2,500.00',
    region: 'EU-North 1',
    capacity: '55%',
    lastEdited: '28/09/2023 12:15',
  },
  //array-end
];

const workspacesColumns = [
  //array-start
  {
    header: 'Workspace',
    accessorKey: 'workspace',
    enableSorting: true,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Owner',
    accessorKey: 'owner',
    enableSorting: true,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    enableSorting: false,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Region',
    accessorKey: 'region',
    enableSorting: false,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Capacity',
    accessorKey: 'capacity',
    enableSorting: false,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Costs',
    accessorKey: 'costs',
    enableSorting: false,
    meta: {
      align: 'text-right',
    },
  },
  {
    header: 'Last edited',
    accessorKey: 'lastEdited',
    enableSorting: false,
    meta: {
      align: 'text-right',
    },
  },
  //array-end
];

export default function Example() {
  const table = useReactTable({
    data: workspaces,
    columns: workspacesColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: 'workspace',
          desc: false,
        },
      ],
    },
  });

  return (
    <div className="obfuscate">
      <TableRoot>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortingHandler =
                    header.column.getToggleSortingHandler?.();
                  const getAriaSortValue = (
                    isSorted: false | SortDirection,
                  ) => {
                    switch (isSorted) {
                      case 'asc':
                        return 'ascending';
                      case 'desc':
                        return 'descending';
                      case false:
                      default:
                        return 'none';
                    }
                  };
                  return (
                    <TableHeaderCell
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && sortingHandler) {
                          sortingHandler(event);
                        }
                      }}
                      className={cx(
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        'border-transparent bg-gray-50 first:rounded-l-md last:rounded-r-md dark:border-transparent dark:bg-gray-900',
                      )}
                      tabIndex={header.column.getCanSort() ? 0 : -1}
                      aria-sort={getAriaSortValue(header.column.getIsSorted())}
                    >
                      <div
                        className={cx(
                          header.column.columnDef.enableSorting === true
                            ? 'flex items-center gap-2'
                            : header.column.columnDef.meta?.align,
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() ? (
                          <div className="-space-y-2.5">
                            <RiArrowUpSFill
                              className={cx(
                                'size-4 text-gray-500 dark:text-gray-500',
                                header.column.getIsSorted() === 'desc'
                                  ? 'opacity-30'
                                  : '',
                              )}
                              aria-hidden={true}
                            />
                            <RiArrowDownSFill
                              className={cx(
                                'size-4 text-gray-500 dark:text-gray-500',
                                header.column.getIsSorted() === 'asc'
                                  ? 'opacity-30'
                                  : '',
                              )}
                              aria-hidden={true}
                            />
                          </div>
                        ) : null}
                      </div>
                    </TableHeaderCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cx(cell.column.columnDef.meta?.align)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/table-actions/table-action-04.tsx

```tsx
import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { cx } from '@/lib/utils';

import { Checkbox } from '@/components/Checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/Table';

// This example requires @tanstack/react-table

type Workspace = {
  workspace: string;
  owner: string;
  status: string;
  costs: string;
  region: string;
  capacity: string;
  lastEdited: string;
};

const workspaces: Workspace[] = [
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
  {
    workspace: 'analytics_dashboard',
    owner: 'Sarah Wilson',
    status: 'live',
    costs: '$6,500.00',
    region: 'US-West 1',
    capacity: '90%',
    lastEdited: '26/09/2023 11:30',
  },
  {
    workspace: 'research_project',
    owner: 'Michael Adams',
    status: 'live',
    costs: '$3,900.00',
    region: 'US-East 1',
    capacity: '70%',
    lastEdited: '27/09/2023 08:45',
  },
  {
    workspace: 'training_environment',
    owner: 'Laura White',
    status: 'live',
    costs: '$2,500.00',
    region: 'EU-North 1',
    capacity: '55%',
    lastEdited: '28/09/2023 12:15',
  },
  //array-end
];

const columnHelper = createColumnHelper<Workspace>();

export default function TableCheckbox() {
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    // Pre-select the 1st and 3rd row for demo purpose
    setRowSelection({ 1: true, 3: true });
  }, []);

  const workspacesColumns = React.useMemo(
    //array-start
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomeRowsSelected()
                  ? 'indeterminate'
                  : false
            }
            onCheckedChange={() => table.toggleAllPageRowsSelected()}
            className="translate-y-0.5"
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={() => row.toggleSelected()}
            className="translate-y-0.5"
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      }),
      {
        header: 'Workspace',
        accessorKey: 'workspace',
        enableSorting: true,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Owner',
        accessorKey: 'owner',
        enableSorting: true,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Region',
        accessorKey: 'region',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Capacity',
        accessorKey: 'capacity',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Costs',
        accessorKey: 'costs',
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
      },
      {
        header: 'Last edited',
        accessorKey: 'lastEdited',
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
      },
      //array-end
    ],
    [],
  );

  const table = useReactTable({
    data: workspaces,
    columns: workspacesColumns,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
    },
  });

  return (
    <div className="obfuscate">
      <TableRoot>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    className={cx(header.column.columnDef.meta?.align)}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => row.toggleSelected(!row.getIsSelected())}
                className="select-none hover:bg-gray-50 hover:dark:bg-gray-900"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <React.Fragment key={cell.id}>
                    <TableCell
                      key={cell.id}
                      className={cx(
                        row.getIsSelected()
                          ? 'bg-gray-50 dark:bg-gray-900'
                          : '',
                        cell.column.columnDef.meta?.align,
                        'relative',
                      )}
                    >
                      {index === 0 && row.getIsSelected() && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-500 dark:bg-blue-500" />
                      )}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/table-actions/table-action-05.tsx

```tsx
import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { cx } from '@/lib/utils';

import { Checkbox } from '@/components/Checkbox';
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

// This example requires @tanstack/react-table

type Workspace = {
  workspace: string;
  owner: string;
  status: string;
  costs: string;
  region: string;
  capacity: string;
  lastEdited: string;
};

const workspaces: Workspace[] = [
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
  {
    workspace: 'analytics_dashboard',
    owner: 'Sarah Wilson',
    status: 'live',
    costs: '$6,500.00',
    region: 'US-West 1',
    capacity: '90%',
    lastEdited: '26/09/2023 11:30',
  },
  {
    workspace: 'research_project',
    owner: 'Michael Adams',
    status: 'live',
    costs: '$3,900.00',
    region: 'US-East 1',
    capacity: '70%',
    lastEdited: '27/09/2023 08:45',
  },
  {
    workspace: 'training_environment',
    owner: 'Laura White',
    status: 'live',
    costs: '$2,500.00',
    region: 'EU-North 1',
    capacity: '55%',
    lastEdited: '28/09/2023 12:15',
  },
  //array-end
];

const columnHelper = createColumnHelper<Workspace>();

export default function TableCheckbox() {
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    // Pre-select the 3rd and 7th row for demo purpose
    setRowSelection({ 3: true, 7: true });
  }, []);

  const workspacesColumns = React.useMemo(
    //array-start
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomeRowsSelected()
                  ? 'indeterminate'
                  : false
            }
            onCheckedChange={() => table.toggleAllPageRowsSelected()}
            className="translate-y-0.5"
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={() => row.toggleSelected()}
            className="translate-y-0.5"
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      }),
      {
        header: 'Workspace',
        accessorKey: 'workspace',
        enableSorting: true,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Owner',
        accessorKey: 'owner',
        enableSorting: true,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Region',
        accessorKey: 'region',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Capacity',
        accessorKey: 'capacity',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Costs',
        accessorKey: 'costs',
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
      },
      {
        header: 'Last edited',
        accessorKey: 'lastEdited',
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
      },
      //array-end
    ],
    [],
  );

  const table = useReactTable({
    data: workspaces,
    columns: workspacesColumns,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
    },
  });

  return (
    <div className="obfuscate">
      <TableRoot>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    className={cx(header.column.columnDef.meta?.align)}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => row.toggleSelected(!row.getIsSelected())}
                className="select-none hover:bg-gray-50 hover:dark:bg-gray-900"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cx(
                      row.getIsSelected() ? 'bg-gray-50 dark:bg-gray-900' : '',
                      cell.column.columnDef.meta?.align,
                      'relative',
                    )}
                  >
                    {index === 0 && row.getIsSelected() && (
                      <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-500 dark:bg-blue-500" />
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableHeaderCell colSpan={1} className="!border-transparent">
                <Checkbox
                  checked={
                    table.getIsAllPageRowsSelected()
                      ? true
                      : table.getIsSomeRowsSelected()
                        ? 'indeterminate'
                        : false
                  }
                  onCheckedChange={() => table.toggleAllPageRowsSelected()}
                  aria-label="Select all"
                  className="translate-y-0.5"
                />
              </TableHeaderCell>
              <TableHeaderCell
                colSpan={7}
                className="!border-transparent !font-normal !tabular-nums"
              >
                {Object.keys(rowSelection).length} of{' '}
                {table.getRowModel().rows.length} Page Rows selected
              </TableHeaderCell>
            </TableRow>
          </TableFoot>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/table-actions/table-action-06.tsx

```tsx
import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { cx } from '@/lib/utils';

import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
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

// This example requires @tanstack/react-table

type Workspace = {
  workspace: string;
  owner: string;
  status: string;
  costs: string;
  region: string;
  capacity: string;
  lastEdited: string;
};

const workspaces: Workspace[] = [
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
  {
    workspace: 'analytics_dashboard',
    owner: 'Sarah Wilson',
    status: 'live',
    costs: '$6,500.00',
    region: 'US-West 1',
    capacity: '90%',
    lastEdited: '26/09/2023 11:30',
  },
  {
    workspace: 'research_project',
    owner: 'Michael Adams',
    status: 'live',
    costs: '$3,900.00',
    region: 'US-East 1',
    capacity: '70%',
    lastEdited: '27/09/2023 08:45',
  },
  {
    workspace: 'training_environment',
    owner: 'Laura White',
    status: 'live',
    costs: '$2,500.00',
    region: 'EU-North 1',
    capacity: '55%',
    lastEdited: '28/09/2023 12:15',
  },
  //array-end
];

const columnHelper = createColumnHelper<Workspace>();

export default function TableCheckbox() {
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    // Pre-select the 2nd row for demo purpose
    setRowSelection({ 2: true });
  }, []);

  const workspacesColumns = React.useMemo(
    //array-start
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomeRowsSelected()
                  ? 'indeterminate'
                  : false
            }
            onCheckedChange={() => table.toggleAllPageRowsSelected()}
            className="translate-y-0.5"
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={() => row.toggleSelected()}
            className="translate-y-0.5"
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      }),
      {
        header: 'Workspace',
        accessorKey: 'workspace',
        enableSorting: true,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Owner',
        accessorKey: 'owner',
        enableSorting: true,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Region',
        accessorKey: 'region',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Capacity',
        accessorKey: 'capacity',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Costs',
        accessorKey: 'costs',
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
      },
      {
        header: 'Last edited',
        accessorKey: 'lastEdited',
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
      },
      //array-end
    ],
    [],
  );

  const table = useReactTable({
    data: workspaces,
    columns: workspacesColumns,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
    },
  });

  return (
    <div className="relative mb-20">
      <TableRoot>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    className={cx(header.column.columnDef.meta?.align)}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => row.toggleSelected(!row.getIsSelected())}
                className="select-none hover:bg-gray-50 hover:dark:bg-gray-900"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cx(
                      row.getIsSelected() ? 'bg-gray-50 dark:bg-gray-900' : '',
                      cell.column.columnDef.meta?.align,
                      'relative',
                    )}
                  >
                    {index === 0 && row.getIsSelected() && (
                      <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-500 dark:bg-blue-500" />
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableHeaderCell colSpan={1} className="!border-transparent">
                <Checkbox
                  checked={
                    table.getIsAllPageRowsSelected()
                      ? true
                      : table.getIsSomeRowsSelected()
                        ? 'indeterminate'
                        : false
                  }
                  onCheckedChange={() =>
                    table.getToggleAllRowsSelectedHandler()
                  }
                  className="translate-y-0.5"
                  aria-label="Select all"
                />
              </TableHeaderCell>
              <TableHeaderCell
                colSpan={7}
                className="!border-transparent !font-normal !tabular-nums"
              >
                {Object.keys(rowSelection).length} of{' '}
                {table.getRowModel().rows.length} Page Row(s) selected
              </TableHeaderCell>
            </TableRow>
          </TableFoot>
        </Table>
      </TableRoot>
      <div
        className={cx(
          'absolute inset-x-0 -bottom-14 mx-auto flex w-fit items-center space-x-10 rounded-lg border border-gray-200 bg-white p-2 shadow-md dark:border-gray-800 dark:bg-gray-950',
          Object.keys(rowSelection).length > 0 ? '' : 'hidden',
        )}
      >
        <p className="select-none text-sm">
          <span className="rounded bg-blue-100 px-2 py-1.5 font-medium tabular-nums text-blue-600 dark:bg-blue-900 dark:text-blue-600">
            {Object.keys(rowSelection).length}
          </span>
          <span className="ml-2 font-medium text-gray-900 dark:text-gray-50">
            selected
          </span>
        </p>
        <div className="flex items-center space-x-2">
          <Button className="px-2 py-1.5">Bulk edit</Button>
          <Button variant="secondary" className="px-2 py-1.5">
            Delete all
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### src/content/components/table-actions/table-action-07.tsx

```tsx
import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { cx } from '@/lib/utils';

import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
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

// This example requires @tanstack/react-table

type Workspace = {
  workspace: string;
  owner: string;
  status: string;
  costs: string;
  region: string;
  capacity: string;
  lastEdited: string;
};

const workspaces: Workspace[] = [
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
  {
    workspace: 'analytics_dashboard',
    owner: 'Sarah Wilson',
    status: 'live',
    costs: '$6,500.00',
    region: 'US-West 1',
    capacity: '90%',
    lastEdited: '26/09/2023 11:30',
  },
  {
    workspace: 'research_project',
    owner: 'Michael Adams',
    status: 'live',
    costs: '$3,900.00',
    region: 'US-East 1',
    capacity: '70%',
    lastEdited: '27/09/2023 08:45',
  },
  {
    workspace: 'training_environment',
    owner: 'Laura White',
    status: 'live',
    costs: '$2,500.00',
    region: 'EU-North 1',
    capacity: '55%',
    lastEdited: '28/09/2023 12:15',
  },
  //array-end
];

const columnHelper = createColumnHelper<Workspace>();

export default function TableCheckbox() {
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    // Pre-select the 2nd row for demo purpose
    setRowSelection({ 2: true });
  }, []);

  const workspacesColumns = React.useMemo(
    //array-start
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomeRowsSelected()
                  ? 'indeterminate'
                  : false
            }
            onCheckedChange={() => table.toggleAllPageRowsSelected()}
            className="translate-y-0.5"
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={() => row.toggleSelected()}
            className="translate-y-0.5"
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      }),
      columnHelper.accessor('workspace', {
        id: 'workspace',
        enableSorting: true,
        header: ({ table }) =>
          table.getIsAllRowsSelected() || table.getIsSomeRowsSelected() ? (
            <div className="absolute left-14 top-0 flex h-12 items-center space-x-2 bg-white dark:bg-gray-950 lg:left-[70px]">
              <Button className="rounded px-2 py-1">Bulk edit</Button>
              <Button variant="secondary" className="rounded px-2 py-1">
                Delete all
              </Button>
            </div>
          ) : (
            'Workspace'
          ),
        meta: {
          align: 'text-left',
        },
      }),
      {
        header: 'Owner',
        accessorKey: 'owner',
        enableSorting: true,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Region',
        accessorKey: 'region',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Capacity',
        accessorKey: 'capacity',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Costs',
        accessorKey: 'costs',
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
      },
      {
        header: 'Last edited',
        accessorKey: 'lastEdited',
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
      },
      //array-end
    ],
    [],
  );

  const table = useReactTable({
    data: workspaces,
    columns: workspacesColumns,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
    },
  });

  return (
    <div className="relative">
      <TableRoot>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    className={cx(header.column.columnDef.meta?.align)}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => row.toggleSelected(!row.getIsSelected())}
                className="select-none hover:bg-gray-50 hover:dark:bg-gray-900"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cx(
                      row.getIsSelected() ? 'bg-gray-50 dark:bg-gray-900' : '',
                      cell.column.columnDef.meta?.align,
                      'relative',
                    )}
                  >
                    {index === 0 && row.getIsSelected() && (
                      <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-500 dark:bg-blue-500" />
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableHeaderCell colSpan={1} className="!border-transparent">
                <Checkbox
                  checked={
                    table.getIsAllPageRowsSelected()
                      ? true
                      : table.getIsSomeRowsSelected()
                        ? 'indeterminate'
                        : false
                  }
                  onCheckedChange={() => table.toggleAllPageRowsSelected()}
                  aria-label="Select all"
                  className="translate-y-0.5"
                />
              </TableHeaderCell>
              <TableHeaderCell
                colSpan={7}
                className="!border-transparent !font-normal !tabular-nums"
              >
                {Object.keys(rowSelection).length} of{' '}
                {table.getRowModel().rows.length} Page Row(s) selected
              </TableHeaderCell>
            </TableRow>
          </TableFoot>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/table-actions/table-action-08.tsx

```tsx
import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { cx } from '@/lib/utils';

import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
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

// This example requires @tanstack/react-table

type Workspace = {
  workspace: string;
  owner: string;
  status: string;
  costs: string;
  region: string;
  capacity: string;
  lastEdited: string;
};

const workspaces: Workspace[] = [
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
  {
    workspace: 'analytics_dashboard',
    owner: 'Sarah Wilson',
    status: 'live',
    costs: '$6,500.00',
    region: 'US-West 1',
    capacity: '90%',
    lastEdited: '26/09/2023 11:30',
  },
  {
    workspace: 'research_project',
    owner: 'Michael Adams',
    status: 'live',
    costs: '$3,900.00',
    region: 'US-East 1',
    capacity: '70%',
    lastEdited: '27/09/2023 08:45',
  },
  {
    workspace: 'training_environment',
    owner: 'Laura White',
    status: 'live',
    costs: '$2,500.00',
    region: 'EU-North 1',
    capacity: '55%',
    lastEdited: '28/09/2023 12:15',
  },
  //array-end
];

const columnHelper = createColumnHelper<Workspace>();

export default function TableCheckbox() {
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    // Pre-select the 2nd row for demo purpose
    setRowSelection({ 2: true });
  }, []);

  const workspacesColumns = React.useMemo(
    //array-start
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomeRowsSelected()
                  ? 'indeterminate'
                  : false
            }
            onCheckedChange={() => table.toggleAllPageRowsSelected()}
            className="translate-y-0.5"
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={() => row.toggleSelected()}
            className="translate-y-0.5"
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      }),
      {
        header: 'Workspace',
        accessorKey: 'workspace',
        enableSorting: true,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Owner',
        accessorKey: 'owner',
        enableSorting: true,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Region',
        accessorKey: 'region',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Capacity',
        accessorKey: 'capacity',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Costs',
        accessorKey: 'costs',
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
      },
      columnHelper.accessor('lastEdited', {
        id: 'lastEdited',
        header: 'Last edited',
        cell: ({ getValue }) => {
          const value = getValue();
          return (
            <div className="relative">
              <span>{value}</span>
              <div className="absolute right-0 top-1/2 hidden h-full -translate-y-1/2 items-center space-x-2 bg-gray-50 group-hover:flex dark:bg-gray-900">
                <Button
                  className="rounded px-2 py-1"
                  onClick={
                    // add stopPropagation to avoid row selection when clicking button
                    (e) => {
                      e.stopPropagation();
                    }
                  }
                >
                  Bulk edit
                </Button>
                <Button
                  className="rounded px-2 py-1"
                  variant="secondary"
                  onClick={
                    // add stopPropagation to avoid row selection when clicking button
                    (e) => {
                      e.stopPropagation();
                    }
                  }
                >
                  Delete all
                </Button>
              </div>
            </div>
          );
        },
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
      }),
      //array-end
    ],
    [],
  );

  const table = useReactTable({
    data: workspaces,
    columns: workspacesColumns,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
    },
  });

  return (
    <>
      <TableRoot>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    className={cx(header.column.columnDef.meta?.align)}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => row.toggleSelected(!row.getIsSelected())}
                className="group select-none hover:bg-gray-50 hover:dark:bg-gray-900"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cx(
                      row.getIsSelected() ? 'bg-gray-50 dark:bg-gray-900' : '',
                      cell.column.columnDef.meta?.align,
                      'relative',
                    )}
                  >
                    {index === 0 && row.getIsSelected() && (
                      <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-500 dark:bg-blue-500" />
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableHeaderCell colSpan={1} className="!border-transparent">
                <Checkbox
                  checked={
                    table.getIsAllPageRowsSelected()
                      ? true
                      : table.getIsSomeRowsSelected()
                        ? 'indeterminate'
                        : false
                  }
                  onCheckedChange={() => table.toggleAllPageRowsSelected()}
                  aria-label="Select all"
                  className="translate-y-0.5"
                />
              </TableHeaderCell>
              <TableHeaderCell
                colSpan={7}
                className="!border-transparent !font-normal !tabular-nums"
              >
                {Object.keys(rowSelection).length} of{' '}
                {table.getRowModel().rows.length} Page Row(s) selected
              </TableHeaderCell>
            </TableRow>
          </TableFoot>
        </Table>
      </TableRoot>
    </>
  );
}
```

### src/content/components/table-actions/table-action-09.tsx

```tsx
import React from 'react';
import {
  RiDeleteBin7Line,
  RiPencilLine,
  RiPlayListAddLine,
} from '@remixicon/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { cx } from '@/lib/utils';

import { Checkbox } from '@/components/Checkbox';
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

// This example requires @tanstack/react-table

type Workspace = {
  workspace: string;
  owner: string;
  status: string;
  costs: string;
  region: string;
  capacity: string;
  lastEdited: string;
};

const workspaces: Workspace[] = [
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
  {
    workspace: 'analytics_dashboard',
    owner: 'Sarah Wilson',
    status: 'live',
    costs: '$6,500.00',
    region: 'US-West 1',
    capacity: '90%',
    lastEdited: '26/09/2023 11:30',
  },
  {
    workspace: 'research_project',
    owner: 'Michael Adams',
    status: 'live',
    costs: '$3,900.00',
    region: 'US-East 1',
    capacity: '70%',
    lastEdited: '27/09/2023 08:45',
  },
  {
    workspace: 'training_environment',
    owner: 'Laura White',
    status: 'live',
    costs: '$2,500.00',
    region: 'EU-North 1',
    capacity: '55%',
    lastEdited: '28/09/2023 12:15',
  },
  //array-end
];

const columnHelper = createColumnHelper<Workspace>();

export default function TableCheckbox() {
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    // Pre-select the 2nd row for demo purpose
    setRowSelection({ 2: true });
  }, []);

  const workspacesColumns = React.useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomeRowsSelected()
                  ? 'indeterminate'
                  : false
            }
            onCheckedChange={() => table.toggleAllPageRowsSelected()}
            className="translate-y-0.5"
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={() => row.toggleSelected()}
            className="translate-y-0.5"
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      }),
      {
        header: 'Workspace',
        accessorKey: 'workspace',
        enableSorting: true,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Owner',
        accessorKey: 'owner',
        enableSorting: true,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Region',
        accessorKey: 'region',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Capacity',
        accessorKey: 'capacity',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Costs',
        accessorKey: 'costs',
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
      },
      columnHelper.accessor('lastEdited', {
        header: 'Last edited',
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
        cell: ({ getValue }) => (
          <div className="relative">
            <span>{getValue()}</span>
            <div className="absolute right-0 top-1/2 hidden h-full -translate-y-1/2 items-center bg-gray-50 group-hover:flex dark:bg-gray-900">
              <div className="inline-flex items-center rounded-md shadow-sm">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-l-md bg-white px-4 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:text-gray-900 focus:z-10 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 hover:dark:text-gray-50"
                  onClick={
                    // add stopPropagation to avoid row selection when clicking button
                    (e) => {
                      e.stopPropagation();
                    }
                  }
                >
                  <RiPencilLine
                    className="size-4"
                    aria-hidden={true}
                    aria-label="Edit"
                  />
                </button>
                <button
                  type="button"
                  className="relative -ml-px inline-flex items-center bg-white px-4 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:text-gray-900 focus:z-10 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 hover:dark:text-gray-50"
                  onClick={
                    // add stopPropagation to avoid row selection when clicking button
                    (e) => {
                      e.stopPropagation();
                    }
                  }
                >
                  <RiPlayListAddLine
                    className="size-4"
                    aria-hidden={true}
                    aria-label="Add"
                  />
                </button>
                <button
                  type="button"
                  className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-4 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:text-gray-900 focus:z-10 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 hover:dark:text-gray-50"
                  onClick={
                    // add stopPropagation to avoid row selection when clicking button
                    (e) => {
                      e.stopPropagation();
                    }
                  }
                >
                  <RiDeleteBin7Line
                    className="size-4"
                    aria-hidden={true}
                    aria-label="Delete"
                  />
                </button>
              </div>
            </div>
          </div>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: workspaces,
    columns: workspacesColumns,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
    },
  });

  return (
    <div className="obfuscate">
      <TableRoot>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    className={cx(header.column.columnDef.meta?.align)}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => row.toggleSelected(!row.getIsSelected())}
                className="group select-none hover:bg-gray-50 hover:dark:bg-gray-900"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cx(
                      row.getIsSelected() ? 'bg-gray-50 dark:bg-gray-900' : '',
                      cell.column.columnDef.meta?.align,
                      'relative',
                    )}
                  >
                    {index === 0 && row.getIsSelected() && (
                      <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-500 dark:bg-blue-500" />
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableHeaderCell colSpan={1} className="!border-transparent">
                <Checkbox
                  checked={
                    table.getIsAllPageRowsSelected()
                      ? true
                      : table.getIsSomeRowsSelected()
                        ? 'indeterminate'
                        : false
                  }
                  onCheckedChange={() => table.toggleAllPageRowsSelected()}
                  aria-label="Select all"
                  className="translate-y-0.5"
                />
              </TableHeaderCell>
              <TableHeaderCell
                colSpan={7}
                className="!border-transparent !font-normal !tabular-nums"
              >
                {Object.keys(rowSelection).length} of{' '}
                {table.getRowModel().rows.length} Page Row(s) selected
              </TableHeaderCell>
            </TableRow>
          </TableFoot>
        </Table>
      </TableRoot>
    </div>
  );
}
```

### src/content/components/table-actions/table-action-10.tsx

```tsx
import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { cx } from '@/lib/utils';

import { Checkbox } from '@/components/Checkbox';
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

// This example requires @tanstack/react-table

type Workspace = {
  workspace: string;
  owner: string;
  status: string;
  costs: string;
  region: string;
  capacity: string;
  lastEdited: string;
};

const workspaces: Workspace[] = [
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
  {
    workspace: 'analytics_dashboard',
    owner: 'Sarah Wilson',
    status: 'live',
    costs: '$6,500.00',
    region: 'US-West 1',
    capacity: '90%',
    lastEdited: '26/09/2023 11:30',
  },
  {
    workspace: 'research_project',
    owner: 'Michael Adams',
    status: 'live',
    costs: '$3,900.00',
    region: 'US-East 1',
    capacity: '70%',
    lastEdited: '27/09/2023 08:45',
  },
  {
    workspace: 'training_environment',
    owner: 'Laura White',
    status: 'live',
    costs: '$2,500.00',
    region: 'EU-North 1',
    capacity: '55%',
    lastEdited: '28/09/2023 12:15',
  },
  //array-end
];

export default function TableCheckbox() {
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    // Pre-select the 2nd row for demo purpose
    setRowSelection({ 2: true });
  }, []);

  const columnHelper = createColumnHelper<Workspace>();

  const workspacesColumns = React.useMemo(
    //array-start
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomeRowsSelected()
                  ? 'indeterminate'
                  : false
            }
            onCheckedChange={() => table.toggleAllPageRowsSelected()}
            className="translate-y-0.5"
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={() => row.toggleSelected()}
            className="translate-y-0.5"
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      }),
      {
        header: 'Workspace',
        accessorKey: 'workspace',
        enableSorting: true,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Owner',
        accessorKey: 'owner',
        enableSorting: true,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Region',
        accessorKey: 'region',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Capacity',
        accessorKey: 'capacity',
        enableSorting: false,
        meta: {
          align: 'text-left',
        },
      },
      {
        header: 'Costs',
        accessorKey: 'costs',
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
      },
      {
        header: 'Last edited',
        accessorKey: 'lastEdited',
        enableSorting: false,
        meta: {
          align: 'text-right',
        },
      },
      //array-end
    ],
    [],
  );

  const table = useReactTable({
    data: workspaces,
    columns: workspacesColumns,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
    },
  });

  return (
    <div className="relative mb-20">
      <TableRoot>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    className={cx(header.column.columnDef.meta?.align)}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => row.toggleSelected(!row.getIsSelected())}
                className="select-none hover:bg-gray-50 hover:dark:bg-gray-900"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cx(
                      row.getIsSelected() ? 'bg-gray-50 dark:bg-gray-900' : '',
                      cell.column.columnDef.meta?.align,
                      'relative',
                    )}
                  >
                    {index === 0 && row.getIsSelected() && (
                      <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-500 dark:bg-blue-500" />
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableHeaderCell colSpan={1} className="!border-transparent">
                <Checkbox
                  checked={
                    table.getIsAllPageRowsSelected()
                      ? true
                      : table.getIsSomeRowsSelected()
                        ? 'indeterminate'
                        : false
                  }
                  onCheckedChange={() => table.toggleAllPageRowsSelected()}
                  aria-label="Select all"
                  className="translate-y-0.5"
                />
              </TableHeaderCell>
              <TableHeaderCell
                colSpan={7}
                className="!border-transparent !font-normal !tabular-nums"
              >
                {Object.keys(rowSelection).length} of{' '}
                {table.getRowModel().rows.length} Page Row(s) selected
              </TableHeaderCell>
            </TableRow>
          </TableFoot>
        </Table>
      </TableRoot>
      <div
        className={cx(
          'absolute inset-x-0 -bottom-14 mx-auto flex w-fit items-center space-x-3 rounded-full border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-medium shadow-md ring-1 ring-gray-800',
          Object.keys(rowSelection).length > 0 ? '' : 'hidden',
        )}
      >
        <p className="select-none tabular-nums text-gray-400">
          {Object.keys(rowSelection).length} selected
        </p>
        <span className="h-4 w-px bg-gray-600" aria-hidden={true} />
        <span className="flex items-center space-x-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm text-gray-300 transition-all hover:text-gray-50"
          >
            Edit
            <span className="flex size-6 select-none items-center justify-center rounded-md bg-gray-800 text-gray-400 ring-1 ring-inset ring-gray-700">
              E
            </span>
          </button>
        </span>
        <span className="h-4 w-px bg-gray-600" aria-hidden={true} />
        <span className="flex items-center space-x-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm text-gray-300 transition-all hover:text-gray-50"
          >
            Delete
            <span className="flex items-center space-x-1">
              <span className="flex size-6 select-none items-center justify-center rounded-md bg-gray-800 text-gray-400 ring-1 ring-inset ring-gray-700">
                ⌘
              </span>
              <span className="flex size-6 select-none items-center justify-center rounded-md bg-gray-800 text-gray-400 ring-1 ring-inset ring-gray-700">
                D
              </span>
            </span>
          </button>
        </span>
      </div>
    </div>
  );
}
```

### src/content/components/table-actions/table-action-11.tsx

```tsx
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { cx } from '@/lib/utils';

import { RadioCardGroup, RadioCardItem } from '@/components/RadioCardGroup';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/Table';

type Payment = {
  amount: string;
  paymentMethod: string;
  description: string;
  customer: string;
  lastSeen: string;
  status: string;
};

const payments: Payment[] = [
  // array-start
  {
    amount: '$49.00',
    paymentMethod: 'Visa',
    description: 'Premium',
    customer: 'customer81@yahoo.com',
    lastSeen: '4 Jan 2023, 18:39',
    status: 'Succeeded',
  },
  {
    amount: '$49.00',
    paymentMethod: 'Visa',
    description: 'Premium',
    customer: 'customer81@yahoo.com',
    lastSeen: '4 Jan 2023, 18:39',
    status: 'Succeeded',
  },
  {
    amount: '$49.00',
    paymentMethod: 'Mastercard',
    description: 'Basic',
    customer: 'customer41@yahoo.com',
    lastSeen: '3 Jan 2023, 17:21',
    status: 'Succeeded',
  },
  {
    amount: '$49.00',
    paymentMethod: 'Mastercard',
    description: 'Basic',
    customer: 'customer68@yahoo.com',
    lastSeen: '3 Jan 2023, 17:01',
    status: 'Succeeded',
  },
  {
    amount: '$49.00',
    paymentMethod: 'Mastercard',
    description: 'Basic',
    customer: 'customer63@yahoo.com',
    lastSeen: '3 Jan 2023, 15:51',
    status: 'Succeeded',
  },
  {
    amount: '$49.00',
    paymentMethod: 'Mastercard',
    description: 'Basic',
    customer: 'customer74@yahoo.com',
    lastSeen: '3 Jan 2023, 15:51',
    status: 'Succeeded',
  },
  {
    amount: '$29.00',
    paymentMethod: 'PayPal',
    description: 'Standard',
    customer: 'customer51@yahoo.com',
    lastSeen: '5 Jan 2023, 10:15',
    status: 'Refunded',
  },
  {
    amount: '$79.00',
    paymentMethod: 'Visa',
    description: 'Premium Plus',
    customer: 'customer48@yahoo.com',
    lastSeen: '6 Jan 2023, 14:27',
    status: 'Failed',
  },
  {
    amount: '$39.00',
    paymentMethod: 'Mastercard',
    description: 'Standard',
    customer: 'customer41@yahoo.com',
    lastSeen: '7 Jan 2023, 12:45',
    status: 'Refunded',
  },
  {
    amount: '$59.00',
    paymentMethod: 'Visa',
    description: 'Advanced',
    customer: 'customer1@example.com',
    lastSeen: '8 Jan 2023, 09:00',
    status: 'Succeeded',
  },
  {
    amount: '$99.00',
    paymentMethod: 'PayPal',
    description: 'Premium Plus',
    customer: 'customer2@example.com',
    lastSeen: '9 Jan 2023, 14:30',
    status: 'Failed',
  },
  {
    amount: '$69.00',
    paymentMethod: 'Mastercard',
    description: 'Pro',
    customer: 'customer3@example.com',
    lastSeen: '10 Jan 2023, 16:45',
    status: 'Refunded',
  },
  {
    amount: '$79.00',
    paymentMethod: 'Visa',
    description: 'Premium Plus',
    customer: 'customer4@example.com',
    lastSeen: '11 Jan 2023, 11:20',
    status: 'Succeeded',
  },
  {
    amount: '$29.00',
    paymentMethod: 'Mastercard',
    description: 'Basic',
    customer: 'customer5@example.com',
    lastSeen: '12 Jan 2023, 13:10',
    status: 'Failed',
  },
  {
    amount: '$39.00',
    paymentMethod: 'Visa',
    description: 'Standard',
    customer: 'customer6@example.com',
    lastSeen: '13 Jan 2023, 09:30',
    status: 'Succeeded',
  },
  {
    amount: '$49.00',
    paymentMethod: 'PayPal',
    description: 'Premium',
    customer: 'customer7@example.com',
    lastSeen: '14 Jan 2023, 15:00',
    status: 'Refunded',
  },
  {
    amount: '$59.00',
    paymentMethod: 'Mastercard',
    description: 'Advanced',
    customer: 'customer8@example.com',
    lastSeen: '15 Jan 2023, 17:45',
    status: 'Succeeded',
  },
  {
    amount: '$69.00',
    paymentMethod: 'Visa',
    description: 'Pro',
    customer: 'customer9@example.com',
    lastSeen: '16 Jan 2023, 10:20',
    status: 'Failed',
  },
  {
    amount: '$79.00',
    paymentMethod: 'Mastercard',
    description: 'Premium Plus',
    customer: 'customer10@example.com',
    lastSeen: '17 Jan 2023, 12:55',
    status: 'Refunded',
  },
  {
    amount: '$89.00',
    paymentMethod: 'Visa',
    description: 'Enterprise',
    customer: 'customer11@example.com',
    lastSeen: '18 Jan 2023, 14:30',
    status: 'Succeeded',
  },
  {
    amount: '$99.00',
    paymentMethod: 'Mastercard',
    description: 'Premium Plus',
    customer: 'customer12@example.com',
    lastSeen: '19 Jan 2023, 16:10',
    status: 'Failed',
  },
  {
    amount: '$109.00',
    paymentMethod: 'Visa',
    description: 'Enterprise',
    customer: 'customer13@example.com',
    lastSeen: '20 Jan 2023, 09:45',
    status: 'Refunded',
  },
  {
    amount: '$119.00',
    paymentMethod: 'Mastercard',
    description: 'Premium Plus',
    customer: 'customer14@example.com',
    lastSeen: '21 Jan 2023, 11:20',
    status: 'Succeeded',
  },
  {
    amount: '$169.00',
    paymentMethod: 'Visa',
    description: 'Enterprise',
    customer: 'customer19@example.com',
    lastSeen: '26 Jan 2023, 15:20',
    status: 'Refunded',
  },
  {
    amount: '$179.00',
    paymentMethod: 'Mastercard',
    description: 'Premium Plus',
    customer: 'customer20@example.com',
    lastSeen: '27 Jan 2023, 09:55',
    status: 'Succeeded',
  },
  // array-end
];

const paymentsColumns = [
  //array-start
  {
    header: 'Amount',
    accessorKey: 'amount',
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Payment Method',
    accessorKey: 'paymentMethod',
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Description',
    accessorKey: 'description',
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Customer',
    accessorKey: 'customer',
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Last seen',
    accessorKey: 'lastSeen',
    meta: {
      align: 'text-right',
    },
  },
  //array-end
];

const tabs = payments.reduce(
  (acc, workspace) => {
    const index = acc.findIndex((e) => e.name === workspace.status);

    if (index === -1) {
      acc.push({ name: workspace.status, value: 1 });
    } else {
      acc[index].value++;
    }

    acc[0].value++;
    return acc;
  },
  [{ name: 'All', value: 0 }],
);

export default function Example() {
  const table = useReactTable({
    data: payments,
    columns: paymentsColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: 'amount',
          desc: false,
        },
      ],
    },
  });

  return (
    <div className="obfuscate">
      <RadioCardGroup
        name="Status"
        value={
          (table.getState().columnFilters.find((e) => e.id === 'status')
            ?.value as string) ?? 'All'
        }
        onValueChange={(value) => {
          const filter = value === 'All' ? [] : [{ id: 'status', value }];
          table.setColumnFilters(filter);
        }}
        className="grid gap-3 sm:grid-cols-2 md:grid-cols-4"
      >
        {tabs.map((tab) => (
          <RadioCardItem key={tab.name} value={tab.name}>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {tab.name}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              {tab.value}
            </p>
          </RadioCardItem>
        ))}
      </RadioCardGroup>
      <TableRoot className="mt-6 h-96 overflow-y-scroll">
        <Table className="border-separate border-spacing-0 border-transparent">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    className={cx(
                      header.column.columnDef.meta?.align,
                      'sticky top-0 z-10 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950',
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cx(
                      cell.column.columnDef.meta?.align,
                      'border-b border-gray-200 dark:border-gray-800',
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
}
```
