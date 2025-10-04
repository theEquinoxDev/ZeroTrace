import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-pink-200">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-red-700 text-center">
        404 - Page Not Found
      </h1>
      <p className="mb-6 text-lg text-red-600 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-red-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:bg-red-700 transition"
      >
        Go Home
      </button>
    </div>
  );
}
