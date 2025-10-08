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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-black to-neutral-800 text-white relative overflow-hidden">
     
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

     
      <div className="z-10 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-gray-100 via-white to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
          ZeroTrace
        </h1>
        <p className="text-gray-400 mb-10 max-w-md mx-auto text-lg">
          Connect. Chat. Disappear - a minimal, private chat experience.
        </p>

        <button
          onClick={handleEnter}
          className="relative px-10 py-4 rounded-2xl font-semibold text-lg overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500" />
          <span className="relative text-white group-hover:text-gray-100 transition">
            Enter Chat
          </span>
          <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition" />
        </button>
      </div>
    </div>
  );
}
