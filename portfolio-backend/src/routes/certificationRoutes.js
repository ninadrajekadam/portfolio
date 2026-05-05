import express from "express";
import { createCertification, getCertifications, getCertification, updateCertification, deleteCertification } from "../controllers/certificationController.js";

const router = express.Router();

router.post("/createCertification", createCertification);
router.get("/getCertifications", getCertifications);
router.get("/getCertification/:id", getCertification);
router.put("/updateCertification/:id", updateCertification);
router.delete("/deleteCertification/:id", deleteCertification);

export default router;