import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const reportMessage = async (messageId) => {
  const res = await axios.post(`${API_BASE}/moderation/report`, { messageId });
  return res.data;
};

export const deleteMessage = async (messageId) => {
  const res = await axios.post(`${API_BASE}/moderation/delete`, { messageId });
  return res.data;
};
