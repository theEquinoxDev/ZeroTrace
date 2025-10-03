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
    if (!currentRoom || !session) return;

    const s = io(SOCKET_URL);
    setSocket(s);

    console.log("Joining room:", currentRoom.roomId, session);

    s.emit("join_room", { roomId: currentRoom.roomId, session });

    s.on("connect", () => console.log("Socket connected:", s.id));

    s.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    s.on("system_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      s.emit("leave_room", { roomId: currentRoom.roomId, session });
      s.disconnect();
    };
  }, [currentRoom, session]);

  const sendMessage = (content) => {
    if (!socket || !currentRoom || !session) return;

    const msg = {
      content,
      roomId: currentRoom.roomId,
      sessionId: session.sessionId,
      nickname: session.nickname || "Anonymous",
    };

    socket.emit("send_message", msg);
  };

  return { messages, sendMessage };
}
