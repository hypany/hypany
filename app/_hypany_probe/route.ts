import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse('ok', {
    headers: {
      'cache-control': 'no-store',
      'content-type': 'text/plain; charset=utf-8',
    },
    status: 200,
  })
}
