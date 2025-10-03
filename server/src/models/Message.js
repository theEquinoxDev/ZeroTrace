import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const MessageSchema = new Schema({
  messageId: { type: String, required: true, unique: true },
  roomId: { type: Types.ObjectId, ref: "Room", required: true },
  sessionId: { type: Types.ObjectId, ref: "Session", required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ["text", "image", "system"], default: "text" },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  moderation: {
    flagged: { type: Boolean, default: false },
    removed: { type: Boolean, default: false }
  }
});

const MessageModel = model("Message", MessageSchema);

export default MessageModel;
