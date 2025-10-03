import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const createSession = async (nickname) => {
  const res = await axios.post(`${API_BASE}/sessions`, { nickname });
  return res.data;
};
