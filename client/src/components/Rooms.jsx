import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRoomStore from "../stores/roomStore";
import { getRooms } from "../api/roomApi";
import RoomForm from "./RoomForm";
import { toast } from "react-toastify";
import { Lock, Unlock } from "lucide-react";

export default function Rooms() {
  const [loading, setLoading] = useState(true);
  const rooms = useRoomStore((state) => state.rooms);
  const setRooms = useRoomStore((state) => state.setRooms);
  const setCurrentRoom = useRoomStore((state) => state.setCurrentRoom);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (err) {
        toast.error("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleJoin = (room) => {
    if (room.visibility === "private") {
      const code = prompt("Enter invite code");
      if (!code) return toast.error("Invite code required");
      if (code !== room.inviteCode) return toast.error("Invalid invite code");
    }
    setCurrentRoom(room);
    navigate(`/room/${room.roomId}`);
  };

  const handleCreated = (room) => {
    setRooms([...rooms, room]);
    setCurrentRoom(room);
    navigate(`/room/${room.roomId}`);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Available Rooms</h2>
        {loading ? (
          <p className="text-gray-500">Loading rooms...</p>
        ) : rooms.length === 0 ? (
          <p className="text-gray-500">No rooms available. Create one below!</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {rooms.map((room) => (
              <li
                key={room.roomId}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{room.name}</span>
                  {room.visibility === "private" ? (
                    <Lock className="text-red-500 w-4 h-4" />
                  ) : (
                    <Unlock className="text-green-500 w-4 h-4" />
                  )}
                </div>
                <button
                  onClick={() => handleJoin(room)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        )}
        <RoomForm onCreated={handleCreated} />
      </div>
    </div>
  );
}
