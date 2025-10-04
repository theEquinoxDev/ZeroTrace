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
    <div className="flex flex-col gap-3 mt-4 p-4 bg-white rounded-xl shadow-md max-w-md">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Room name"
        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <select
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
          className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      )}
      <button
        onClick={handleCreate}
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Room"}
      </button>
    </div>
  );
}
