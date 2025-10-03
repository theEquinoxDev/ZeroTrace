import { Server } from "socket.io";
import MessageModel from "./models/Message.js";
import RoomModel from "./models/Room.js";
import SessionModel from "./models/Session.js";
import { v4 as uuidv4 } from "uuid";

const socketHandler = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join_room", ({ roomId, sessionId }) => {
      socket.join(roomId);
      socket.to(roomId).emit("system_message", {
        content: `User joined the room.`,
        type: "system",
      });
    });

    socket.on("leave_room", ({ roomId, sessionId }) => {
      socket.leave(roomId);
      socket.to(roomId).emit("system_message", {
        content: `User left the room.`,
        type: "system",
      });
    });

    socket.on("send_message", async ({ roomId, sessionId, content, type = "text" }) => {
      try {
        const room = await RoomModel.findOne({ roomId });
        const session = await SessionModel.findOne({ sessionId });
        if (!room || !session) {
          return socket.emit("error_message", { error: "Invalid room or session" });
        }

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
          roomId,
          sessionId,
          content,
          type,
          createdAt: message.createdAt,
        });
      } catch (error) {
        socket.emit("error_message", { error: "Failed to send message" });
      }
    });

    socket.on("delete_message", async ({ messageId, roomId }) => {
      try {
        const message = await MessageModel.findOneAndUpdate(
          { messageId },
          { "moderation.removed": true },
          { new: true }
        );
        if (message) {
          io.to(roomId).emit("message_deleted", { messageId });
        }
      } catch (error) {}
    });

    socket.on("disconnect", () => {
  io.emit("system_message", { content: "A user disconnected", type: "system" });
});
  });
};

export default socketHandler;
