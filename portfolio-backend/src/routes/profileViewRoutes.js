import express from "express";
import { addProfileView, getProfileStats } from "../controllers/profileViewController.js";

const router = express.Router();

router.post("/addProfileView", addProfileView);
router.get("/getProfileStats", getProfileStats);

export default router;