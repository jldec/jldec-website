export const ContentHtml = ({ html }: { html: string | undefined }) => (
  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html ?? '[empty page]' }} />
)
