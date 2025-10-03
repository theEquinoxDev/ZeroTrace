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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to Chat App</h1>
      <button onClick={handleEnter} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
        Enter
      </button>
    </div>
  );
}
