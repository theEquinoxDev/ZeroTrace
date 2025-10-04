import { useNavigate } from "react-router-dom";
import useSessionStore from "../stores/sessionStore";

export default function Home() {
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);

  const handleEnter = () => {
    if (!session) navigate("/session");
    else navigate("/rooms");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-indigo-800 text-center">
        Welcome to ZeroTrace
      </h1>
      <button
        onClick={handleEnter}
        className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:bg-indigo-700 transition"
      >
        Enter
      </button>
    </div>
  );
}
