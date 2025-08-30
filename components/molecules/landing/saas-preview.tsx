export function SaaSPreview() {
  return (
    <div className='h-72 overflow-hidden rounded-md bg-white/5 shadow-2xl shadow-black/40 ring-1 ring-black/10 backdrop-blur-sm'>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-white/10 px-3 py-2'>
        <div className='flex items-center gap-2'>
          <div className='size-4 rounded-sm bg-gradient-to-br from-emerald-400 to-emerald-600 ring-1 ring-white/30' />
          <span className='text-xs font-medium leading-none text-white/90'>Hypany</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='hidden items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-white/70 ring-1 ring-white/15 md:flex'>
            <span className='tracking-wide'>⌘K</span>
          </div>
          <div className='size-6 rounded-full bg-white/10 ring-1 ring-white/15' />
        </div>
      </div>

      {/* Tabs */}
      <div className='flex gap-1 px-3 pt-2 text-[11px]'>
        <span className='rounded-md bg-white/10 px-2 py-1 text-white ring-1 ring-white/15'>Overview</span>
        <span className='rounded-md px-2 py-1 text-white/70 ring-1 ring-transparent hover:bg-white/10 hover:ring-white/10'>Analytics</span>
        <span className='rounded-md px-2 py-1 text-white/70 ring-1 ring-transparent hover:bg-white/10 hover:ring-white/10'>Settings</span>
      </div>

      {/* Content */}
      <div className='grid grid-cols-3 gap-3 px-3 py-3'>
        {/* Left: MRR + mini bars */}
        <div className='col-span-2 rounded-md bg-black/10 p-3 ring-1 ring-white/10'>
          <div className='flex items-center justify-between text-[11px] text-white/70'>
            <span>Pageviews</span>
            <span className='text-emerald-100'>+8.2%</span>
          </div>
          <div className='mt-0.5 text-xl font-semibold leading-tight text-white'>24,830</div>
          <div className='mt-2 flex h-16 items-end gap-1.5'>
            {/* Simple bar spark chart */}
            <div className='h-6 w-1.5 rounded-sm bg-emerald-300/80' />
            <div className='h-10 w-1.5 rounded-sm bg-emerald-200/85' />
            <div className='h-8 w-1.5 rounded-sm bg-emerald-300/80' />
            <div className='h-12 w-1.5 rounded-sm bg-emerald-100/90' />
            <div className='h-9 w-1.5 rounded-sm bg-emerald-200/85' />
            <div className='h-14 w-1.5 rounded-sm bg-emerald-100/90' />
            <div className='h-8 w-1.5 rounded-sm bg-emerald-200/85' />
            <div className='h-16 w-1.5 rounded-sm bg-emerald-50/95' />
            <div className='h-10 w-1.5 rounded-sm bg-emerald-100/90' />
            <div className='h-7 w-1.5 rounded-sm bg-emerald-200/85' />
            <div className='h-12 w-1.5 rounded-sm bg-emerald-100/90' />
            <div className='h-9 w-1.5 rounded-sm bg-emerald-200/85' />
          </div>
        </div>

        {/* Right: two mini stat cards */}
        <div className='col-span-1 flex flex-col gap-3'>
          <div className='rounded-md bg-black/10 p-3 ring-1 ring-white/10'>
            <div className='text-[11px] text-white/70'>Waitlist</div>
            <div className='mt-0.5 text-base font-semibold leading-tight text-white'>3,482</div>
            <div className='mt-0.5 text-[10px] text-emerald-100'>+12%</div>
          </div>
          <div className='rounded-md bg-black/10 p-3 ring-1 ring-white/10'>
            <div className='text-[11px] text-white/70'>Growth</div>
            <div className='mt-0.5 text-base font-semibold leading-tight text-white'>1.7%</div>
            <div className='mt-0.5 text-[10px] text-emerald-100'>-0.3%</div>
          </div>
        </div>
      </div>

      {/* Footer: activity pills */}
      <div className='flex items-center gap-2 truncate px-3 pb-3'>
        <span className='inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white ring-1 ring-white/15'>
          <span className='size-1.5 rounded-full bg-emerald-300' aria-hidden='true' />
          Deploy Success
        </span>
        <span className='inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/80 ring-1 ring-white/15'>
          <span className='size-1.5 rounded-full bg-emerald-200' aria-hidden='true' />
          New signup
        </span>
        <span className='inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/80 ring-1 ring-white/15'>
          <span className='size-1.5 rounded-full bg-emerald-200' aria-hidden='true' />
          Domain Connected
        </span>
      </div>
    </div>
  )
}

export default SaaSPreview

