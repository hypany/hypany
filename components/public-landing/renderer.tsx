import 'server-only'

type Block = {
  id: string
  type: string
  order: string
  content: string
}

function safeParse<T>(json: string): T | null {
  try {
    return JSON.parse(json) as T
  } catch {
    return null
  }
}

export function PublicLandingRenderer({
  blocks,
  customCss,
}: {
  blocks: Block[]
  customCss?: string | null
}) {
  return (
    <div className='min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100'>
      {customCss ? <style>{customCss}</style> : null}
      <main className='mx-auto max-w-5xl px-4 py-10'>
        {blocks.map((b) => {
          switch (b.type) {
            case 'hero': {
              const v = safeParse<{ headline?: string; subhead?: string; ctas?: Array<{ label: string; href?: string }> }>(
                b.content,
              )
              return (
                <section key={b.id} className='mb-12'>
                  <h1 className='text-3xl font-bold'>{v?.headline || 'Welcome'}</h1>
                  {v?.subhead ? (
                    <p className='mt-2 text-gray-600 dark:text-gray-300'>{v.subhead}</p>
                  ) : null}
                  {v?.ctas && v.ctas.length > 0 ? (
                    <div className='mt-4 flex flex-wrap gap-3'>
                      {v.ctas.map((c, i) => (
                        <a
                          key={i}
                          className='inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm text-white dark:bg-gray-100 dark:text-gray-900'
                          href={c.href || '#'}
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </section>
              )
            }
            case 'partners': {
              const v = safeParse<{ logos?: Array<{ name?: string; logoSrc: string; href?: string }> }>(
                b.content,
              )
              const logos = v?.logos || []
              if (logos.length === 0) return null
              return (
                <section key={b.id} className='mb-12'>
                  <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4'>
                    {logos.map((l, i) => (
                      <a key={i} href={l.href || '#'} className='flex items-center justify-center'>
                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={l.logoSrc} alt={l.name || 'Logo'} className='max-h-10' />
                      </a>
                    ))}
                  </div>
                </section>
              )
            }
            case 'features': {
              const v = safeParse<{
                heading?: string
                primary?: { title: string; summary?: string }
                secondary?: Array<{ title: string; summary?: string }>
              }>(b.content)
              return (
                <section key={b.id} className='mb-12'>
                  {v?.heading ? (
                    <h2 className='text-xl font-semibold'>{v.heading}</h2>
                  ) : null}
                  {v?.primary ? (
                    <div className='mt-4 rounded border p-4 dark:border-gray-800'>
                      <div className='font-medium'>{v.primary.title}</div>
                      {v.primary.summary ? (
                        <p className='text-gray-600 dark:text-gray-300'>{v.primary.summary}</p>
                      ) : null}
                    </div>
                  ) : null}
                  {v?.secondary && v.secondary.length > 0 ? (
                    <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                      {v.secondary.map((s, i) => (
                        <div key={i} className='rounded border p-3 dark:border-gray-800'>
                          <div className='font-medium'>{s.title}</div>
                          {s.summary ? (
                            <p className='text-gray-600 dark:text-gray-300'>{s.summary}</p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              )
            }
            case 'benefits': {
              const v = safeParse<{ heading?: string; items?: Array<{ title: string; summary?: string }> }>(
                b.content,
              )
              const items = v?.items || []
              if (!v?.heading && items.length === 0) return null
              return (
                <section key={b.id} className='mb-12'>
                  {v?.heading ? (
                    <h2 className='text-xl font-semibold'>{v.heading}</h2>
                  ) : null}
                  <ul className='mt-3 grid list-disc gap-2 pl-5'>
                    {items.map((it, i) => (
                      <li key={i}>
                        <div className='font-medium'>{it.title}</div>
                        {it.summary ? (
                          <div className='text-gray-600 dark:text-gray-300'>{it.summary}</div>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </section>
              )
            }
            case 'faq': {
              const v = safeParse<{ heading?: string; items?: Array<{ q: string; a: string }> }>(b.content)
              const items = v?.items || []
              if (!v?.heading && items.length === 0) return null
              return (
                <section key={b.id} className='mb-12'>
                  {v?.heading ? (
                    <h2 className='text-xl font-semibold'>{v.heading}</h2>
                  ) : null}
                  <div className='mt-3 space-y-3'>
                    {items.map((qa, i) => (
                      <div key={i}>
                        <div className='font-medium'>{qa.q}</div>
                        <div className='text-gray-600 dark:text-gray-300'>{qa.a}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )
            }
            case 'finalCta': {
              const v = safeParse<{ heading?: string; ctas?: Array<{ label: string; href?: string }> }>(
                b.content,
              )
              if (!v?.heading && !(v?.ctas && v.ctas.length > 0)) return null
              return (
                <section key={b.id} className='mb-12'>
                  {v?.heading ? (
                    <h2 className='text-xl font-semibold'>{v.heading}</h2>
                  ) : null}
                  {v?.ctas && v.ctas.length > 0 ? (
                    <div className='mt-4 flex flex-wrap gap-3'>
                      {v.ctas.map((c, i) => (
                        <a
                          key={i}
                          className='inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm text-white dark:bg-gray-100 dark:text-gray-900'
                          href={c.href || '#'}
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </section>
              )
            }
            case 'footer': {
              const v = safeParse<{ columns?: Array<{ heading?: string; links?: Array<{ label: string; href: string }> }> }>(
                b.content,
              )
              return (
                <footer key={b.id} className='mt-12 border-t pt-6 dark:border-gray-800'>
                  <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
                    {(v?.columns || []).map((col, i) => (
                      <div key={i}>
                        {col.heading ? (
                          <div className='mb-2 text-sm font-semibold'>{col.heading}</div>
                        ) : null}
                        <ul className='space-y-1 text-sm'>
                          {(col.links || []).map((link, j) => (
                            <li key={j}>
                              <a className='text-gray-600 hover:underline dark:text-gray-300' href={link.href}>
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </footer>
              )
            }
            case 'meta':
            case 'theme':
            default:
              return null
          }
        })}
      </main>
    </div>
  )
}
