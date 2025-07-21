import { cn } from '@/lib/utils'
import markdownit from 'markdown-it'
import type { Message } from './ChatStore'

const md = markdownit({
  linkify: true
})

function messageContent(message: Message): string {
  return message.content
}

// No hooks - component can run in both RSC and client
export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div id="message-list" className="flex flex-col gap-2 prose max-w-none prose-p:!my-0 prose-p:!py-2 my-4">
      {messages.map((m) => (
        <div
          className={cn('border-gray-200 p-2 rounded-lg', m.role === 'assistant' ? 'bg-gray-100' : 'bg-white')}
          key={m.id}
          dangerouslySetInnerHTML={{ __html: md.render(messageContent(m)) }}
        />
      ))}
    </div>
  )
}
