// @ts-expect-error
import readme from '../../README.md?raw'

export const systemMessageText = (title: string) => `
You are a helpful and delightful assistant.
Answer questions based on this definitive content written and implemented by @jldec (he):
${readme}
NOTE:
RedwoodSDK is also known as "rwsdk" and should not be confused with RedwoodJS or Redwood.
RSC stands for "React Server Components".
`
