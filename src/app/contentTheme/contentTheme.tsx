import { requestInfo } from 'rwsdk/worker'
import { NotFound } from './404'
import { Page } from './Page'
import { Home } from './Home'
import { BlogList } from './BlogList'
import { BlogPost } from './BlogPost'

export async function contentTheme() {
  const pageContext = requestInfo.ctx.pageContext
  if (pageContext?.pageData) {
    switch (pageContext.pathname) {
      case '/':
        return <Home />
      case '/blog':
        return <BlogList />
      default:
        if (pageContext.pathname.startsWith('/blog/')) {
          return <BlogPost />
        }
        return <Page />
    }
  } else {
    console.log('NotFound', pageContext?.pathname)
    requestInfo.response.status = 404
    return <NotFound />
  }
}
