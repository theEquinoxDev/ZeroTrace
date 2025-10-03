import { useState } from "react";

export default function MessageInput({ sendMessage }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-l p-2 focus:outline-none"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700">
        Send
      </button>
    </form>
  );
}
