import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";

export default function ChatWindow({ messages, sendMessage }) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 border rounded-xl p-4 h-[500px] overflow-y-auto bg-white shadow-md">
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
                className="w-8 h-8 rounded-full border border-gray-300"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-white">
                {msg.nickname?.charAt(0)?.toUpperCase() || "A"}
              </div>
            )}
            <div
              className={`px-3 py-2 rounded-lg max-w-[80%] break-words ${
                msg.nickname === "Anonymous"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-indigo-100 text-indigo-900"
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
