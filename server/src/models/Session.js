import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const SessionSchema = new Schema({
  sessionId: { type: String, required: true, unique: true },
  nickname: { type: String, required: true },
  avatar: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  lastActiveAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  banned: { type: Boolean, default: false }
});

const SessionModel = model("Session", SessionSchema);

export default SessionModel;
