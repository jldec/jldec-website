export function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen text-sm">
      <h1 className="text-xl font-bold my-2">RedwoodSDK Agent Chat demo</h1>
      <div className="flex flex-row gap-2">
        <a href="chat-rsc" className="text-blue-600 p-2 hover:underline mb-8 text-base text-center border-gray-200 border-1 shadow-md rounded-md">
          RSC Chat
        </a>
        <a href="chat-agent" className="text-blue-600 p-2 hover:underline mb-8 text-base text-center border-gray-200 border-1 shadow-md rounded-md">
          Agent Chat
        </a>
        <a href="chat-agent-sdk" className="text-blue-600 p-2 hover:underline mb-8 text-base text-center border-gray-200 border-1 shadow-md rounded-md">
          Agent SDK Chat
        </a>
        <a href="chat-tinybase" className="text-blue-600 p-2 hover:underline mb-8 text-base text-center border-gray-200 border-1 shadow-md rounded-md">
          TinyBase Chat
        </a>
      </div>
      <div className="flex flex-row gap-2">
        <a href="https://github.com/jldec/agents-chat#readme" className="text-blue-600 p-2 underline mb-8 text-base">
          github.com/jldec/agents-chat
        </a>
        <a href="time" className="text-blue-600 p-2 underline mb-8 text-base">
          ⏰
        </a>
      </div>
    </div>
  )
}
