import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRoomStore from "../stores/roomStore";
import { getRooms, createRoom } from "../api/roomApi";

export default function Rooms() {
  const [loading, setLoading] = useState(true);
  const [roomName, setRoomName] = useState("");
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleJoin = (room) => {
    setCurrentRoom(room);
    navigate(`/room/${room.roomId}`);
  };

  const handleCreate = async () => {
    if (!roomName.trim()) return;
    try {
      const room = await createRoom({ name: roomName, visibility: "public" });
      setCurrentRoom(room);
      setRooms([...rooms, room]);
      navigate(`/room/${room.roomId}`);
    } catch (err) {
      console.error(err);
      alert("Could not create room");
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Available Rooms</h2>
        {loading ? (
          <p>Loading rooms...</p>
        ) : (
          <ul className="mb-4">
            {rooms.map((room) => (
              <li key={room.roomId} className="flex justify-between items-center py-2 border-b">
                <div>
                  <div className="font-medium">{room.name}</div>
                  <div className="text-sm text-gray-500">{room.visibility}</div>
                </div>
                <button onClick={() => handleJoin(room)} className="bg-green-500 text-white px-3 py-1 rounded">
                  Join
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex mt-4">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="New room name"
            className="flex-1 p-2 border rounded mr-2"
          />
          <button onClick={handleCreate} className="bg-blue-600 text-white px-4 rounded">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
