import { requestInfo as r } from 'rwsdk/worker'
import { ContentLayout } from './ContentLayout'
import { Content } from './Content'

export function Page() {
  const pageData = r.ctx.pageContext?.pageData
  return (
    <ContentLayout>
      <Content />
      {pageData?.dir ? (
        <ul>
          {pageData.dir.map((d) => (
            <li key={d.path}>
              <a href={d.path}>{d.attrs?.title ?? d.path}</a>
            </li>
          ))}
        </ul>
      ) : null}
    </ContentLayout>
  )
}
