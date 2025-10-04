import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import connectDB from "./config/db.js";
import sessionRoutes from "./routes/sessions.js";
import roomRoutes from "./routes/rooms.js";
import socketHandler from "./socket.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", sessionRoutes);
app.use("/api", roomRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const server = http.createServer(app);
socketHandler(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
