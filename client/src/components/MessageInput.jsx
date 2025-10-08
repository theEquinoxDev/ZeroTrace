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
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 mt-2 bg-gray-800 p-2 rounded-2xl shadow-inner"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-2xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-900 text-white placeholder-gray-400"
      />
      <button
        type="submit"
        className="bg-white/10 text-white px-4 py-2 rounded-2xl hover:bg-white/20 transition"
      >
        Send
      </button>
    </form>
  );
}
