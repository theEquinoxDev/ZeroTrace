import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRoomStore from "../stores/roomStore";
import useSessionStore from "../stores/sessionStore";
import useSocketHook from "../hooks/useSocketHook";
import ChatWindow from "../components/ChatWindow";
import { getRoomById } from "../api/roomApi";
import { toast } from "react-toastify";

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);
  const currentRoom = useRoomStore((state) => state.currentRoom);
  const setCurrentRoom = useRoomStore((state) => state.setCurrentRoom);
  const clearCurrentRoom = useRoomStore((state) => state.clearCurrentRoom);
  const { messages, sendMessage } = useSocketHook();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) navigate("/session");
  }, [session]);

  useEffect(() => {
    let isMounted = true;
    const fetchRoom = async () => {
      try {
        const room = await getRoomById(roomId);
        if (!room) throw new Error("Room not found");

        setCurrentRoom(room);
      } catch (err) {
        toast.error("Room not found");
        navigate("/rooms");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    if (!currentRoom || currentRoom.roomId !== roomId) fetchRoom();
    else setLoading(false);
    return () => {
      isMounted = false;
    };
  }, [roomId, currentRoom]);

  useEffect(() => () => clearCurrentRoom(), []);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/room/${currentRoom.roomId}`;
    navigator.clipboard.writeText(link);
    toast.success("Invite link copied");
  };

  if (loading) return <p className="text-center mt-10 text-lg text-gray-600">Loading room...</p>;

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gradient-to-br from-indigo-50 to-purple-50">
      {currentRoom && (
        <div className="w-full max-w-3xl flex flex-col gap-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-indigo-700">{currentRoom.name}</h2>
            <button
              onClick={handleCopyLink}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Copy Invite Link
            </button>
          </div>
          <ChatWindow messages={messages} sendMessage={sendMessage} />
        </div>
      )}
    </div>
  );
}
