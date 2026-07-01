import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as projectService from "../services/projectServices.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsBasePath = path.resolve(__dirname, "..", "..", "uploads");

const normalizeSkills = (skills) => {
  if (Array.isArray(skills)) {
    return skills.map((skill) => skill?.trim()).filter(Boolean);
  }
  if (typeof skills === "string") {
    return skills.split(",").map((skill) => skill.trim()).filter(Boolean);
  }
  return [];
};

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const addProject = async (req, res) => {
  try {
    const { projectName, companyName, description, usedSkills, projectUrl, projectStatus } = req.body;

    if (!projectName || !companyName || !description) {
      return res.status(400).json({
        message: "Project name, company name, and description are required",
      });
    }

    if (!projectStatus) {
      return res.status(400).json({
        message: "Project status is required",
      });
    }

    const skillsArray = normalizeSkills(usedSkills);

    if (!skillsArray.length) {
      return res.status(400).json({
        message: "Please provide at least one skill",
      });
    }

    if (projectUrl && !isValidURL(projectUrl)) {
      return res.status(400).json({
        message: "Invalid project URL",
      });
    }

    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const image = req.file ? `projects/${req.file.filename}` : "";
    const project = await projectService.createProject({ projectName, companyName, description, usedSkills: skillsArray, projectUrl, projectStatus, image });

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: project,
    });
  } catch (error) {
    // res.status(500).json({ message: error.message });

    console.error("Add Project Error:");
    console.error(error);
    console.error(error.stack);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getProjects();
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const existingProject = await projectService.getProjectById(req.params.id);

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const { projectName, companyName, description, usedSkills, projectUrl, projectStatus } = req.body;

    if (projectUrl && !isValidURL(projectUrl)) {
      return res.status(400).json({
        message: "Invalid project URL",
      });
    }

    const skillsArray = usedSkills ? normalizeSkills(usedSkills) : existingProject.usedSkills;

    let image = existingProject.image;

    if (req.file) {
      if (existingProject.image) {
        const oldPath = path.join(uploadsBasePath, existingProject.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      image = `projects/${req.file.filename}`;
    }

    const updatedData = {
      projectName: projectName ?? existingProject.projectName,
      companyName: companyName ?? existingProject.companyName,
      description: description ?? existingProject.description,
      usedSkills: skillsArray,
      projectUrl: projectUrl ?? existingProject.projectUrl,
      projectStatus: projectStatus ?? existingProject.projectStatus,
      image
    };

    const updatedProject = await projectService.updateProject(
      req.params.id,
      updatedData
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const existingProject = await projectService.getProjectById(
      req.params.id
    );

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (existingProject.image) {
      const filePath = path.join(uploadsBasePath, existingProject.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await projectService.deleteProject(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};