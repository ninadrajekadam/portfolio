import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { addExperience, getAllExperience, updateExperience, deleteExperience } from "../controllers/experienceController.js";

const router = express.Router();

router.post("/addExperience", protect, addExperience);
router.get("/getAllExperience", getAllExperience);
router.put("/updateExperience/:id", protect, updateExperience);
router.delete("/deleteExperience/:id", protect, deleteExperience);

export default router;
