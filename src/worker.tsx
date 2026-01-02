// prettier-ignore
import { defineApp } from 'rwsdk/worker'
import { Document } from './app/Document'
import { render, route } from 'rwsdk/router'

import type { ContentPageContext } from './app/contentSource/types'
import { ContentLayout } from './app/contentTheme/ContentLayout'
import { contentMiddleware } from './app/contentSource/contentMiddleware'
import { contentTheme } from './app/contentTheme/contentTheme'

export type AppContext = {
  pageContext?: ContentPageContext
}

const app = defineApp([
  contentMiddleware({ ignore: '/api/' }),
  render(Document, [route('*', [contentTheme])])
])

export default {
  fetch: app.fetch
}

// cache disabled - https://github.com/jldec/agents-chat/issues/56
