import { Router } from "express";
import { createSession, getSession } from "../controllers/sessionController.js";

const router = Router();

router.post("/sessions", createSession);
router.get("/sessions/:id", getSession);

export default router;