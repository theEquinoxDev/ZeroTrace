import { Router } from "express";
import { createRoom, getRoomById, getRooms } from "../controllers/roomController.js";

const router = Router();

router.get("/rooms", getRooms);
router.post("/rooms", createRoom);
router.get("/rooms/:id", getRoomById);

export default router;