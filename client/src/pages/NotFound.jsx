import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
        Go Home
      </button>
    </div>
  );
}
