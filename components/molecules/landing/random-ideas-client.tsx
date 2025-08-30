'use client'

import { useTranslations } from 'next-intl'
import { Badge } from '@/components/atoms/badge'
import { ProgressCircle } from '@/components/atoms/progress-circle'
import {
  TableRoot,
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
  const t = useTranslations('landing.random-ideas')
  return (
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t('table.header.product')}</TableHeaderCell>
            <TableHeaderCell>{t('table.header.engineering')}</TableHeaderCell>
            <TableHeaderCell>{t('table.header.legal')}</TableHeaderCell>
            <TableHeaderCell className='text-right'>
              {t('table.header.vibe-check')}
            </TableHeaderCell>
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
                    <Tooltip content={t('tooltip.vibe-ratio')} side='top'>
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
    </TableRoot>
  )
}
