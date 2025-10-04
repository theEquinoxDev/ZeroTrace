import { Server } from "socket.io";
import MessageModel from "./models/Message.js";
import RoomModel from "./models/Room.js";
import SessionModel from "./models/Session.js";
import { v4 as uuidv4 } from "uuid";

const socketHandler = (server) => {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join_room", async ({ roomId, sessionId }) => {
      try {
        socket.join(roomId);

        const session = await SessionModel.findOne({ sessionId });
        if (!session) {
          console.error("Session not found for sessionId:", sessionId);
          return;
        }

        io.to(roomId).emit("system_message", {
          content: `${session.nickname} joined the room`,
          type: "system",
        });
      } catch (err) {
        console.error("join_room error:", err);
      }
    });

    socket.on("leave_room", async ({ roomId, sessionId }) => {
      try {
        socket.leave(roomId);

        const session = await SessionModel.findOne({ sessionId });
        if (!session) return;

        io.to(roomId).emit("system_message", {
          content: `${session.nickname} left the room`,
          type: "system",
        });
      } catch (err) {
        console.error("leave_room error:", err);
      }
    });

    socket.on("send_message", async ({ roomId, sessionId, content, type = "text" }) => {
      try {
        const room = await RoomModel.findOne({ roomId });
        const session = await SessionModel.findOne({ sessionId });
        if (!room || !session) return;

        const message = new MessageModel({
          messageId: uuidv4(),
          roomId: room._id,
          sessionId: session._id,
          content,
          type,
        });

        await message.save();

        io.to(roomId).emit("receive_message", {
          messageId: message.messageId,
          content,
          type,
          nickname: session.nickname,
          createdAt: message.createdAt,
        });
      } catch (err) {
        console.error("send_message error:", err);
      }
    });

    socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
  });
};

export default socketHandler;
