import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SessionForm from "./components/SessionForm";
import Rooms from "./components/Rooms";
import Room from "./pages/Room";
import NotFound from "./pages/NotFound";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session" element={<SessionForm />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
