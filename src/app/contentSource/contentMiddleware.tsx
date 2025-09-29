import { getPagePaths } from './markdown/get-dirs'
import { getManifest } from './manifest'
import { getPageData } from './markdown/get-markdown'
import { getStatic } from './static'
import { getRedirects } from './redirects'
import { type ContentPageContext } from './types'
import { type RequestInfo } from 'rwsdk/worker'
import { match } from '@/lib/match'

export type contentMiddlewareOptions = {
  ignore?: string | string[]
}

function acceptRaw(accept: string | null) {
  if (!accept) return false
  accept = accept.toLowerCase()

  const html = accept.indexOf('text/html')
  const plain = accept.indexOf('text/plain')
  const markdown = accept.indexOf('text/markdown')

  if (plain === -1 && markdown === -1) return false
  if (html === -1 || (html > plain && html > markdown)) return true
  return false
}

export const contentMiddleware = ({ ignore }: contentMiddlewareOptions = {}) => {
  return async ({ request, ctx }: RequestInfo): Promise<Response | void> => {
    const noCache =
      request.headers.get('cache-control')?.includes('no-cache') || request.headers.get('pragma')?.includes('no-cache')
    const url = new URL(request.url)
    const prefersRaw = url.searchParams.has('raw') || acceptRaw(request.headers.get('accept'))
    const pathname = url.pathname
    const search = url.search

    if (match(pathname, ignore)) return

    // redirect trailing slashes
    // TODO: should be configurable
    if (pathname.endsWith('/') && pathname.length > 1) {
      return Response.redirect(url.origin + pathname.slice(0, -1) + search, 301)
    }

    // serve static content from manifest
    // only bypass manifest cache when reloading the home page
    const isHome = pathname === '/'
    const manifest = await getManifest(noCache && isHome)
    if (manifest.includes(pathname)) {
      const resp = await getStatic(pathname, noCache)
      if (resp) {
        console.log('static', pathname)
        return resp
      }
    }

    // redirects take precedence over markdown pages
    const redirects = await getRedirects()
    if (pathname in redirects) {
      return Response.redirect(new URL(redirects[pathname].redirect + search, url.origin), redirects[pathname].status)
    }
    const pagePaths = await getPagePaths()
    const pageContext: ContentPageContext = {
      pathname,
      siteData: '/' in pagePaths ? (await getPageData('/'))?.attrs : undefined,
      pageData: pathname in pagePaths ? (await getPageData(pathname, noCache)) || undefined : undefined,
      dirData:
        pathname.startsWith('/blog/') && '/blog' in pagePaths
          ? (await getPageData('/blog'))?.dir?.find((p) => p.path === pathname)
          : undefined
    }
    if (url.searchParams.has('json')) return Response.json(pageContext)
    if (prefersRaw) {
      console.log('raw', pathname)
      return pageContext.pageData?.md
        ? new Response(pageContext.pageData?.md)
        : new Response('not found', { status: 404 })
    }
    ctx.pageContext = pageContext
  }
}
