import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-gray-950 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
        404 — Page Not Found
      </h1>

      <p className="mb-8 text-gray-400 text-lg text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-gradient-to-r from-gray-200 to-gray-400 text-black px-8 py-3 rounded-2xl text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
      >
        Go Home
      </button>
    </div>
  );
}
