import { useState } from "react";
import { createRoom } from "../api/roomApi";
import { toast } from "react-toastify";

export default function RoomForm({ onCreated }) {
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return toast.error("Room name is required");
    if (visibility === "private" && !inviteCode.trim()) {
      return toast.error("Invite code is required for private rooms");
    }

    setLoading(true);
    try {
      const room = await createRoom({ name, visibility, inviteCode });
      setName("");
      setInviteCode("");
      toast.success("Room created successfully");
      onCreated && onCreated(room, true);
    } catch (err) {
      console.error(err);
      toast.error("Could not create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4 p-4 bg-gradient-to-br from-black via-neutral-900 to-gray-950 rounded-2xl shadow-lg max-w-md border border-gray-800 ">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Room name"
        className="p-3 bg-neutral-900 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      <select
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
        className="p-3  bg-neutral-900 text-gray-200 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>

      {visibility === "private" && (
        <input
          type="text"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          placeholder="Invite code for private room"
          className="p-3 bg-neutral-900 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      )}

      <button
        onClick={handleCreate}
        disabled={loading}
        className="bg-gradient-to-r from-gray-200 to-gray-400 text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Room"}
      </button>
    </div>
  );
}
