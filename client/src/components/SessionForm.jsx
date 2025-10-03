import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSessionStore from "../stores/sessionStore";
import { createSession } from "../api/sessionApi";

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
      navigate("/rooms");
    } catch (err) {
      console.error(err);
      alert("Could not create session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border rounded-md shadow-md">
      <label className="block mb-2 font-semibold">Enter your nickname (optional)</label>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Nickname"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Join Chat"}
      </button>
    </form>
  );
}
