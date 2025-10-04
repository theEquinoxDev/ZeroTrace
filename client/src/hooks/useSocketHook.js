import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useRoomStore from "../stores/roomStore";
import useSessionStore from "../stores/sessionStore";

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

export default function useSocketHook() {
  const currentRoom = useRoomStore((state) => state.currentRoom);
  const session = useSessionStore((state) => state.session);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!currentRoom) return;
    const stored = sessionStorage.getItem(`messages_${currentRoom.roomId}`);
    if (stored) setMessages(JSON.parse(stored));
  }, [currentRoom]);

  useEffect(() => {
    if (!currentRoom || !session) return;

    const s = io(SOCKET_URL);
    setSocket(s);

    s.emit("join_room", { roomId: currentRoom.roomId, sessionId: session.sessionId });

    s.on("connect", () => console.log("Socket connected:", s.id));

    s.on("receive_message", (msg) => {
      setMessages((prev) => {
        const updated = [...prev, msg];
        sessionStorage.setItem(`messages_${currentRoom.roomId}`, JSON.stringify(updated));
        return updated;
      });
    });

    s.on("system_message", (msg) => {
      setMessages((prev) => {
        const updated = [...prev, msg];
        sessionStorage.setItem(`messages_${currentRoom.roomId}`, JSON.stringify(updated));
        return updated;
      });
    });

    return () => {
      s.emit("leave_room", { roomId: currentRoom.roomId, sessionId: session.sessionId });
      s.disconnect();
      sessionStorage.removeItem(`messages_${currentRoom.roomId}`);
    };
  }, [currentRoom, session]);

  const sendMessage = (content) => {
    if (!socket || !currentRoom || !session) return;

    socket.emit("send_message", {
      roomId: currentRoom.roomId,
      sessionId: session.sessionId,
      content,
    });
  };

  return { messages, sendMessage };
}
