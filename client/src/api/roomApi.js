import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getRooms = async () => {
  const res = await axios.get(`${API_BASE}/rooms`);
  return res.data;
};

export const createRoom = async (roomData) => {
  const res = await axios.post(`${API_BASE}/rooms`, roomData);
  return res.data;
};

export const getRoomById = async (id) => {
  const res = await axios.get(`${API_BASE}/rooms/${id}`);
  return res.data;
};
