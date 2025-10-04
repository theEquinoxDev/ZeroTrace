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
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-center">Join Chat</h2>
      <label className="font-medium">Enter your nickname (optional)</label>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Nickname"
        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Join Chat"}
      </button>
    </form>
  );
}
