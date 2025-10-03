import MessageModel from "../models/Message.js";

export const reportMessage = async (req, res) => {
  try {
    const { messageId } = req.body;
    if (!messageId) return res.status(400).json({ error: "messageId is required" });

    const message = await MessageModel.findOne({ messageId });
    if (!message) return res.status(404).json({ error: "Message not found" });

    message.moderation.flagged = true;
    await message.save();

    res.json({ message: "Message reported successfully", messageId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.body;
    if (!messageId) return res.status(400).json({ error: "messageId is required" });

    const message = await MessageModel.findOne({ messageId });
    if (!message) return res.status(404).json({ error: "Message not found" });

    message.moderation.removed = true;
    await message.save();

    res.json({ message: "Message deleted successfully", messageId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
