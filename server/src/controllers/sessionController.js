import { v4 as uuidv4 } from "uuid";
import SessionModel from "../models/Session.js";

export const createSession = async (req, res) => {
  try {
    let { nickname } = req.body;

    // Generate sessionId
    const sessionId = uuidv4();

    if (!nickname || nickname.trim() === "") {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      nickname = `Anon-${randomSuffix}`;
    }

    const avatar = `https://avatars.dicebear.com/api/identicon/${sessionId}.svg`;

    const session = new SessionModel({
      sessionId,
      nickname,
      avatar,
    });

    await session.save();

    res.status(201).json({ sessionId, nickname, avatar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await SessionModel.findOne({ sessionId: id });
    if (!session) {
      return res.status(404).json({ message: "Session does not exist" });
    }
    res.json({
      sessionId: session.sessionId,
      nickname: session.nickname,
      avatar: session.avatar,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
