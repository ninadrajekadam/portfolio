import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { addProject, getAllProjects, getProject, updateProject, deleteProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/getAllProjects", getAllProjects);
router.get("/getProject/:id", getProject);
router.post("/addProject", upload.single("projectImage"), addProject);
router.put("/updateProject/:id", upload.single("projectImage"), updateProject);
router.delete("/deleteProject/:id", deleteProject);

export default router;