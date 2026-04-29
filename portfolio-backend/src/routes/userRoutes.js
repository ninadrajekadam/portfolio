import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getUserProfile } from "../services/userServices.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);

export default router;