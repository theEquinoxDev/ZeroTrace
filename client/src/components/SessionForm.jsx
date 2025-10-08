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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-neutral-800 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-neutral-900 border border-gray-700 rounded-2xl p-6 flex flex-col gap-4 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-100">
          Join Chat
        </h2>

        <label className="font-medium text-gray-300">Nickname (optional)</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Enter your nickname"
          className="w-full p-3 bg-neutral-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-2xl font-semibold shadow-md transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Join Chat"}
        </button>
      </form>
    </div>
  );
}
