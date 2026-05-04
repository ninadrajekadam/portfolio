import fs from "fs";
import * as projectService from "../services/projectServices.js";

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
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const { projectName, companyName, description, usedSkills, projectUrl } = req.body;

    if (!projectName || !companyName || !description) {
      return res.status(400).json({
        message: "Project name, company name, and description are required",
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

    const image = req.file ? `uploads/projects/${req.file.filename}` : "";
    const project = await projectService.createProject({ projectName, companyName, description, usedSkills: skillsArray, projectUrl, image });

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    const { projectName, companyName, description, usedSkills, projectUrl } = req.body;

    if (projectUrl && !isValidURL(projectUrl)) {
      return res.status(400).json({
        message: "Invalid project URL",
      });
    }

    const skillsArray = usedSkills ? normalizeSkills(usedSkills) : existingProject.usedSkills;

    let image = existingProject.image;

    if (req.file) {
      if (existingProject.image && fs.existsSync(existingProject.image)) {
        fs.unlinkSync(existingProject.image);
      }
      image = req.file.path.replace(/\\/g, "/");
    }

    const updatedData = {
      projectName: projectName ?? existingProject.projectName,
      companyName: companyName ?? existingProject.companyName,
      description: description ?? existingProject.description,
      usedSkills: skillsArray,
      projectUrl: projectUrl ?? existingProject.projectUrl,
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

    if (existingProject.image && fs.existsSync(existingProject.image)) {
      fs.unlinkSync(existingProject.image);
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