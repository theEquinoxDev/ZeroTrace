import mongoose from "mongoose";

const { Schema, model } = mongoose;

const RoomSchema = new Schema({
  roomId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  inviteCode: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date } 
});

const RoomModel = model("Room", RoomSchema);

export default RoomModel;
