import express from "express";
import {
  addProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// GET /api/projects - Get all projects
router.get("/", getAllProjects);

// GET /api/projects/:id - Get single project
router.get("/:id", getProject);

// POST /api/projects - Create new project
router.post("/", addProject);

// PUT /api/projects/:id - Update project
router.put("/:id", updateProject);

// DELETE /api/projects/:id - Delete project
router.delete("/:id", deleteProject);

export default router;