import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { addSkill, getAllSkills, updateSkill, deleteSkill } from "../controllers/skillController.js";

const router = express.Router();

router.get("/getAllSkills", getAllSkills);
router.post("/addSkill", protect, upload.single("skillImage"), addSkill);
router.put("/updateSkill/:id", protect, upload.single("skillImage"), updateSkill);
router.delete("/deleteSkill/:id", protect, deleteSkill);

export default router;