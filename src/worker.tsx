// prettier-ignore
import { ChatRSC } from './app/chat-rsc/ChatRSC'
import { defineApp } from 'rwsdk/worker'
import { Document } from './app/Document'
import { env } from 'cloudflare:workers'
import { render, route, layout, type LayoutProps } from 'rwsdk/router'
import { realtimeRoute } from 'rwsdk/realtime/worker'

export { ChatDurableObject } from './app/shared/ChatStore'
export { RealtimeDurableObject } from 'rwsdk/realtime/durableObject'

import type { ContentPageContext } from './app/contentSource/types'
import { ContentLayout } from './app/contentTheme/ContentLayout'
import { contentMiddleware } from './app/contentSource/contentMiddleware'
import { contentTheme } from './app/contentTheme/contentTheme'

export type AppContext = {
  pageContext?: ContentPageContext
}

export const AppLayout = ({ children }: LayoutProps) => <ContentLayout>{children}</ContentLayout>

const app = defineApp([
  realtimeRoute(() => env.REALTIME_DURABLE_OBJECT),
  contentMiddleware({ ignore: '/api/' }),
  render(Document, layout(AppLayout, [route('/chat-rsc', ChatRSC)])),
  render(Document, [route('*', [contentTheme])])
])

export default {
  fetch: app.fetch
}

// cache disabled - https://github.com/jldec/agents-chat/issues/56
