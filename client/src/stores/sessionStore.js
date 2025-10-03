import { create } from "zustand";

const savedSession = JSON.parse(localStorage.getItem("session"));

const useSessionStore = create((set) => ({
  session: savedSession || null,
  setSession: (sessionData) => {
    set({ session: sessionData });
    localStorage.setItem("session", JSON.stringify(sessionData));
  },
  clearSession: () => {
    set({ session: null });
    localStorage.removeItem("session");
  },
  updateNickname: (nickname) =>
    set((state) => {
      const updated = { ...state.session, nickname };
      localStorage.setItem("session", JSON.stringify(updated));
      return { session: updated };
    }),
}));

export default useSessionStore;
