import express from "express";
import { createAchievement, getAchievements, getAchievement, updateAchievement, deleteAchievement } from "../controllers/achievementController.js";

const router = express.Router();

router.post("/createAchievement", createAchievement);
router.get("/getAchievements", getAchievements);
router.get("/getAchievement/:id", getAchievement);
router.put("/updateAchievement/:id", updateAchievement);
router.delete("/deleteAchievement/:id", deleteAchievement);

export default router;