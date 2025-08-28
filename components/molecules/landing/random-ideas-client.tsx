'use client'

import { Badge } from '@/components/atoms/badge'
import { ProgressCircle } from '@/components/atoms/progress-circle'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/components/atoms/table'
import { Tooltip } from '@/components/atoms/tooltip'

export type IdeaItem = {
  user: string
  product: string
  engineering: string[]
  legal: string[]
}

export default function RandomIdeasClient({ items }: { items: IdeaItem[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Product</TableHeaderCell>
          <TableHeaderCell>Engineering</TableHeaderCell>
          <TableHeaderCell>Legal</TableHeaderCell>
          <TableHeaderCell className='text-right'>Vibe Check</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((row, idx) => {
          return (
            <TableRow key={row.product}>
              <TableCell>
                <span className='text-gray-800'>{row.product}</span>
              </TableCell>
              <TableCell>
                <div className='flex flex-wrap gap-1.5'>
                  {row.engineering?.map((tag) => (
                    <Badge key={tag} variant='neutral'>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className='flex flex-wrap gap-1.5'>
                  {row.legal?.map((tag) => (
                    <Badge key={tag} variant='neutral'>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end'>
                  <Tooltip content='Waitlist/Visitor ratio' side='top'>
                    <div className='flex items-center'>
                      <ProgressCircle
                        value={idx * 10}
                        max={100}
                        radius={18}
                        strokeWidth={4}
                        variant='success'
                      >
                        <span className='text-[10px] font-medium text-gray-700 dark:text-gray-300'>
                          {idx * 10}%
                        </span>
                      </ProgressCircle>
                    </div>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
