import express from "express";
import { createMessage, getMessages, getUnreadCount, markAsRead, replyMessage, deleteMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/contact", createMessage);
router.get("/getMessages", getMessages);
router.get("/unreadCount", getUnreadCount);
router.put("/read/:id", markAsRead);
router.post("/reply/:id", replyMessage);
router.delete("/deleteMessage/:id", deleteMessage);

export default router;