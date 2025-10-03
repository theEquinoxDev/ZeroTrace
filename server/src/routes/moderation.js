import { Router } from "express";
import { reportMessage, deleteMessage } from "../controllers/moderationController.js";


const router = Router();

router.post("/moderation/report", reportMessage);
router.post("/moderation/delete", deleteMessage);

export default router;
