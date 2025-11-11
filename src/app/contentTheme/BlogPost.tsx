import { requestInfo as r } from 'rwsdk/worker'
import { ContentLayout } from './ContentLayout'
import { List, SquareChevronUp, SquareChevronDown } from './icons'
import { ContentHtml } from './ContentHtml'

function parentPath(path: string) {
  return path.split('/').slice(0, -1).join('/') || '/'
}

function formatDate(date: any) {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  if (!date || !(date instanceof Date)) return ''
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long'
  }).format(date)
}

export function BlogPost() {
  const pageData = r.ctx.pageContext?.pageData
  const dirData = r.ctx.pageContext?.dirData
  const longdate = [formatDate(pageData?.attrs?.date)].filter(Boolean).join(' - ')

  return (
    <ContentLayout>
      <p className="flex mb-4">
        <span className="grow">{longdate}</span>
        {/* <a
          className="px-[6px] text-gray-400 hover:text-orange-500"
          role="button"
          onClick={() => document.getElementById('chat-icon')?.click()}
        >
          Ask AI
        </a> */}
        {dirData?.next ? (
          <a className="px-[6px] text-gray-400 hover:text-orange-500" href={parentPath(pageData?.path || '/')}>
            <List className="h-[1.4rem]" />
          </a>
        ) : (
          ''
        )}
        {dirData?.prev ? (
          <a
            className="px-[6px] text-gray-400 hover:text-orange-500 hover:underline decoration-double decoration-2"
            href={dirData.prev.href}
            title={`Prev: ${dirData.prev.text}`}
          >
            Prev
          </a>
        ) : (
          ''
        )}
        {dirData?.next ? (
          <a
            className="px-[6px] text-gray-400 hover:text-orange-500 hover:underline decoration-double decoration-2"
            href={dirData.next.href}
            title={`Next: ${dirData.next.text}`}
          >
            Next
          </a>
        ) : (
          ''
        )}
      </p>
      <ContentHtml />
    </ContentLayout>
  )
}
