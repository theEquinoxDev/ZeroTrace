import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRoomStore from "../stores/roomStore";
import { getRooms } from "../api/roomApi";
import RoomForm from "./RoomForm";
import { toast } from "react-toastify";
import { Lock, Unlock, X } from "lucide-react";

export default function Rooms() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
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
    setModalOpen(false);
    navigate(`/room/${room.roomId}`);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
      <div className="w-full max-w-2xl bg-neutral-900 p-6 rounded-2xl shadow-lg border border-gray-800 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-gray-100 text-center">
          Available Rooms
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading rooms...</p>
        ) : rooms.length === 0 ? (
          <p className="text-gray-400 text-center">No rooms available.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {rooms.map((room) => (
              <li
                key={room.roomId}
                className="flex justify-between items-center p-3 border border-gray-700 rounded-xl hover:bg-neutral-800 transition"
              >
                <div className="flex items-center gap-2 text-gray-200 font-medium">
                  {room.name}
                  {room.visibility === "private" ? (
                    <Lock className="text-red-500 w-4 h-4" />
                  ) : (
                    <Unlock className="text-green-500 w-4 h-4" />
                  )}
                </div>
                <button
                  onClick={() => handleJoin(room)}
                  className="bg-gray-400 text-black px-4 py-2 rounded-xl font-semibold shadow-md hover:scale-105 transition-all duration-300"
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className=" bottom-8 right-8 z-50 fixed px-6 py-4 rounded-2xl font-semibold text-lg overflow-hidden group bg-gray-900 shadow-lg hover:scale-105 transition-all duration-300"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500" />
        <span className="relative text-white group-hover:text-gray-100 transition">
          Create Room
        </span>
        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition" />
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-2xl shadow-lg border border-gray-800 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
            <RoomForm onCreated={handleCreated} />
          </div>
        </div>
      )}
    </div>
  );
}
