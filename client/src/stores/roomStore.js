import { create } from "zustand";

const savedRooms = JSON.parse(localStorage.getItem("rooms")) || [];
const savedCurrentRoom = JSON.parse(localStorage.getItem("currentRoom")) || null;

const useRoomStore = create((set) => ({
  currentRoom: savedCurrentRoom, 
  rooms: savedRooms,
  setCurrentRoom: (room) => {
    set({ currentRoom: room });
    localStorage.setItem("currentRoom", JSON.stringify(room));
  },
  setRooms: (rooms) => {
    set({ rooms });
    localStorage.setItem("rooms", JSON.stringify(rooms));
  },
  clearCurrentRoom: () => {
    set({ currentRoom: null });
    localStorage.removeItem("currentRoom");
  },
}));

export default useRoomStore;
