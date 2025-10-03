import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SessionForm from "./components/SessionForm";
import Rooms from "./components/Rooms";
import Room from "./pages/Room";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/session" element={<SessionForm />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/room/:roomId" element={<Room />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
