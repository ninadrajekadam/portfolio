import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { getProfile, saveProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/getProfile", getProfile);
router.post("/save", upload.fields([ { name: "profileImage", maxCount: 1 }, { name: "cvFile", maxCount: 1 } ]), saveProfile);
router.put("/update", upload.fields([ { name: "profileImage", maxCount: 1 }, { name: "cvFile", maxCount: 1 } ]), updateProfile);

export default router;