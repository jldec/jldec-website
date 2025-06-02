# RedwoodSDK agents chat with RSC
Two small implementations of streaming AI chat -- deployed at https://agents-chat.jldec.workers.dev/. 

1. [RSC Chat](https://agents-chat.jldec.workers.dev/chat-rsc) uses realtime websocket-based RSC updates implemented by [RedwoodSDK](https://rwsdk.com/).
2. [Agent Chat](https://agents-chat.jldec.workers.dev/chat-agent) sends JSON over websockets implemented by Cloudflare [agents](https://developers.cloudflare.com/agents/).

Both persist messages in the same vanilla durable object, in a JSON array in one KV value.

The RSC implementation feels slightly slower for the following reasons:

1. The RSC-chat MessageList component loads data directly from the durable object API. This means that the chat store has to be updated with each stream chunk, before triggering a new server-side render. This is not required for the agent-chat, which broadcasts single-message updates directly to clients via the agent websocket, so it only needs to call the store to persist the AI response at the end of the stream. This difference can probably be mitigated by changing the implementation in this repo to load messages from worker memory during streaming.  

2. When RSC-chat realtime updates are rendered, all the RSCs for the page are sent to clients (there is no server-side diffing). This means that payloads for streaming updates are larger, even if clients only update one small part of their DOM. Discussion about this question in the [rwsdk discord](https://discord.com/channels/679514959968993311/1374715298636238968/1376288266789064734). Fixing this requires changes to RedwoodSDK/RSC internals.

### Next
Add another implementation using a sync engine like [Zero](https://zero.rocicorp.dev/) or [TinyBase](https://tinybase.org/) or [Livestore](https://livestore.dev/).

## Why?
I'm exploring how to build multi-user AI chat because I expect this to become the universal UI for humans and agents to work together.
The idea to try 3 architectures came from the same [rwsdk discord](https://discord.com/channels/679514959968993311/1374715298636238968/1376269189802627112) thread.

> ![Screenshot 2025-06-02 at 21 06 37](https://github.com/user-attachments/assets/2545674b-1535-4759-b332-151014bc12ea)
> #### The must-have requirements are,
> 1. load up to one full page size of recent messages on client start,
> 2. live-stream new messages (e.g. AI responses) to all active clients.,
> 3. return older messages only when requested by a specific client.,
>
> I think I have 3 architectural choices:
> #### 1. custom JSON over websockets,
> Instead of using the rwsdk realtime feature, send messages (and message chunks when streaming) via JSON over websockets like cloudflare/agents. One way to build this would be with the useAgentChat react hook from the same library. Rendering happens client-side.
> #### 2. RSCs with rwsdk and realtime,
> Use rwsdk with server components for realtime updates to send the first page of messages and keep it updated as it changes. Call a separate api route (or server-function) to fetch earlier messages when needed. This solution will be more chatty (1 page of messages on the wire for each realtime update), but probably ok. There is also some complexity (I haven't tried yet) to blend RSCs with the earlier messages, but I think it's doable with some experimentation.
> #### 3. sync data,
> Use a generic sync engine like tinybase to sync state between the durable objects and browsers, and render messages on the client This has the benefit of built-in support for client-persistence (local caching) and also syncs just one value at a time (not the whole page like rwsdk), but it adds some complexity and some constraints to how things are represented on the server side. 

### Further Reading
- [RedwoodSDK Docs](https://docs.rwsdk.com/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare Agents Docs](https://developers.cloudflare.com/agents/)
