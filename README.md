# RedwoodSDK agents chat with RSC
Two small implementations of streaming AI chat deployed at https://agents-chat.jldec.workers.dev/

1. [RSC Chat](https://agents-chat.jldec.workers.dev/chat-rsc) uses realtime websocket-based RSC updates implemented by [RedwoodSDK](https://rwsdk.com/).
2. [Agent Chat](https://agents-chat.jldec.workers.dev/chat-rsc) sends JSON over websockets implemented by Cloudflare [agents](https://developers.cloudflare.com/agents/).

Both do chat message peristence using the same "vanilla" durable object (single JSON blog in KV).

The RSC implementation feel slightly slower for the following reasons:

1. The RSC-chat MessageList component loads data directly from the durable object on the server. This means that the chat store has to be updated with each stream chunk, before triggering a new server-side render. This is not required for the agent-chat, which broadcasts single-message updates to clients via the websocket, so it only needs to call the store to persist the AI response at the end of the stream.

2. When RSC-chat realtime updates are rendered, all the RSCs for the page are sent to clients (there is no server-side diffing). This means that payloads for streaming updates are larger, even if clients only update one small part of their DOM. Discussion about this in the [RedwoodSDK Discord](https://discord.com/channels/679514959968993311/1374715298636238968/1376288266789064734).

### Next
Add another implementation using a sync engine like [Zero](https://zero.rocicorp.dev/) or [TinyBase](https://tinybase.org/) or [Livestore](https://livestore.dev/).

### Further Reading
- [RedwoodSDK Docs](https://docs.rwsdk.com/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare Agents Docs](https://developers.cloudflare.com/agents/)