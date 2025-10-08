import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";

export default function ChatWindow({ messages, sendMessage }) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 border border-gray-700 rounded-2xl p-4 h-[500px] overflow-y-auto bg-gradient-to-br from-neutral-900 via-black to-neutral-800 shadow-lg">
      <div className="flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.nickname === "Anonymous" ? "" : "justify-start"
            }`}
          >
            {msg.avatar ? (
              <img
                src={msg.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full border border-gray-600"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold text-white">
                {msg.nickname?.charAt(0)?.toUpperCase() || "A"}
              </div>
            )}
            <div
              className={`px-3 py-2 rounded-xl max-w-[80%] break-words ${
                msg.nickname === "Anonymous"
                  ? "bg-gray-800 text-gray-100"
                  : "bg-gray-700 text-white"
              }`}
            >
              <span className="font-semibold mr-1">{msg.nickname}:</span>
              <span>{msg.content}</span>
            </div>
          </div>
        ))}
      </div>
      <div ref={bottomRef}></div>
      <div className="mt-3">
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}
