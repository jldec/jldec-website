import { ViewTransition } from 'react'

export const ContentHtml = ({ html }: { html: string | undefined }) => (
  <ViewTransition>
    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html ?? '[empty page]' }} />
  </ViewTransition>
)
