import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";

export default function ChatWindow({ messages, sendMessage }) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 border rounded p-4 h-[500px] overflow-y-auto">
      {messages.map((msg, idx) => (
        <div key={idx} className="mb-2">
          <span className="font-semibold">{msg.nickname}: </span>
          <span>{msg.content}</span>
        </div>
      ))}
      <div ref={bottomRef}></div>
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}
