import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSessionStore from "../stores/sessionStore";
import { createSession } from "../api/sessionApi";
import { toast } from "react-toastify";

export default function SessionForm() {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const setSession = useSessionStore((state) => state.setSession);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createSession(nickname.trim() || null);
      setSession(data);
      toast.success("Session created successfully");
      navigate("/rooms");
    } catch (err) {
      console.error(err);
      toast.error("Could not create session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-6 bg-gradient-to-br from-black via-neutral-900 to-gray-950 rounded-2xl shadow-lg flex flex-col gap-4 border border-gray-800"
    >
      <h2 className="text-2xl font-bold text-center text-gray-200">
        Join Chat
      </h2>

      <label className="font-medium text-gray-300">Enter your nickname (optional)</label>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Nickname"
        className="w-full p-3 bg-neutral-900 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-gray-200 to-gray-400 text-black py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Join Chat"}
      </button>
    </form>
  );
}
