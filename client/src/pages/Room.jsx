// pages/rRoom.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRoomStore from "../stores/roomStore";
import useSessionStore from "../stores/sessionStore";
import useSocketHook from "../hooks/useSocketHook";
import ChatWindow from "../components/ChatWindow";
import { getRoomById } from "../api/roomApi";

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
    if (!session) navigate("/");
  }, [session]);

  useEffect(() => {
    let isMounted = true;

    const fetchRoom = async () => {
      try {
        const room = await getRoomById(roomId);
        if (!room) throw new Error("Room not found");
        if (isMounted) setCurrentRoom(room);
      } catch (err) {
        console.error("Failed to fetch room:", err);
        navigate("/rooms");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (!currentRoom || currentRoom.roomId !== roomId) fetchRoom();
    else setLoading(false);

    return () => { isMounted = false; };
  }, [roomId, currentRoom]);

  useEffect(() => () => clearCurrentRoom(), []);

  if (loading) return <p className="text-center mt-10 text-lg">Loading room...</p>;

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-50">
      {currentRoom ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{currentRoom.name}</h2>
          <div className="w-full max-w-2xl flex flex-col flex-1">
            <ChatWindow messages={messages} sendMessage={sendMessage} />
          </div>
        </>
      ) : (
        <p className="text-center mt-10 text-lg">Loading room...</p>
      )}
    </div>
  );
}
