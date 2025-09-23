import { expect, test } from 'vitest'
import { parseMarkdown } from './parse-markdown'

const markdown = `# markdown header
paragraph 1

paragraph 2
`

const expectedResult = `<h1>markdown header</h1>
<p>paragraph 1</p>
<p>paragraph 2</p>
`

test('parseMarkdown', {}, () => {
  let actual = parseMarkdown(markdown)
  // console.log(actual)
  expect(actual).toEqual(expectedResult)
})
