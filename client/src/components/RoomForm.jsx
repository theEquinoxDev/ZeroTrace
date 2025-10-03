import { useState } from "react";
import { createRoom } from "../api/roomApi";

export default function RoomForm({ onCreated }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const room = await createRoom({ name, visibility: "public" });
      setName("");
      onCreated && onCreated(room);
    } catch (err) {
      console.error(err);
      alert("Could not create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Room name" className="flex-1 p-2 border rounded" />
      <button onClick={handleCreate} disabled={loading} className="bg-blue-600 text-white px-4 rounded">
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
}
