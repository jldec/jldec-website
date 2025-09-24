import markdownit from 'markdown-it'
import markdownitAnchor from 'markdown-it-anchor'

export function parseMarkdown(s: string) {
  const md = markdownit({
    linkify: true,
    html: true
  })
  .use(markdownitAnchor, {
    permalink: false,
    tabIndex: false,
    level: [1, 2, 3]
  })
  return md.render(s)
}
