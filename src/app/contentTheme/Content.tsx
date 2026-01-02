import { requestInfo as r } from 'rwsdk/worker'
import { ContentHtml } from './ContentHtml'

export function Content() {
  const pageData = r.ctx.pageContext?.pageData
  return <ContentHtml html={pageData?.html} />
}
