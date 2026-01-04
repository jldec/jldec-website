import { requestInfo as r } from 'rwsdk/worker'
import { ContentLayout } from './ContentLayout'
import { Content } from './Content'

export function BlogList() {
  const pageData = r.ctx.pageContext?.pageData
  return (
    <ContentLayout>
      <Content />
      {pageData?.dir ? (
        <div className="prose max-w-none mt-4">
          <ul>
            {pageData.dir.map((d, i) => {
              const preloadImage = i < 10 ? d.attrs?.splash?.image : null
              const text = d.attrs?.title ?? d.path
              const date = d.attrs?.date ?? ''
              return (
                <li key={d.path} className="leading-[1.1rem] pb-1">
                  {preloadImage ? <link rel="preload" href={preloadImage} as="image" /> : null}
                  <a
                    className="group flex items-end gap-4 no-underline border-b-[1.5px] border-b-transparent hover:border-b-current"
                    href={d.path}
                  >
                    <span className="grow">{text}</span>
                    <span className="hidden sm:block text-transparent group-hover:text-orange-500">{date}</span>
                  </a>
                </li>
              )
            })}
          </ul>{' '}
        </div>
      ) : null}
    </ContentLayout>
  )
}
