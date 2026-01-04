import { requestInfo as r } from 'rwsdk/worker'
import { ViewTransition } from 'react'
import { LayoutProps } from 'rwsdk/router'
import { Menu } from './Menu'
import { Metadata } from './Metadata'
import { Splash } from './Splash'

export function ContentLayout({ children }: LayoutProps) {
  const dbg = new URL(r.request.url).searchParams.get('dbg') !== null
  const pageContext = r.ctx.pageContext
  return (
    <div className="max-w-3xl m-auto py-3 px-3 lg:px-0 overflow-hidden">
      <Metadata />
      <Menu />
      <ViewTransition>
        <Splash />
        {children}
      </ViewTransition>
      <script dangerouslySetInnerHTML={{ __html: 'import("/js/image-enlarge.js")' }} type="module"></script>
      {dbg && pageContext ? <pre>{JSON.stringify(pageContext, null, 2)}</pre> : null}
    </div>
  )
}
