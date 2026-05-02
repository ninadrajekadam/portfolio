import * as projectService from "../services/projectServices.js";

const normalizeSkills = (skills) => {
  if (Array.isArray(skills)) {
    return skills.map((skill) => skill?.trim()).filter(Boolean);
  }

  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return [];
};

export const addProject = async (req, res) => {
  try {
    const { projectName, companyName, description, usedSkills } = req.body;

    if (!projectName || !companyName || !description) {
      return res.status(400).json({ message: "Project name, company name, and description are required" });
    }

    const skillsArray = normalizeSkills(usedSkills);
    if (!skillsArray.length) {
      return res.status(400).json({ message: "Please provide at least one skill" });
    }

    const project = await projectService.createProject({
      projectName,
      companyName,
      description,
      usedSkills: skillsArray,
    });

    res.status(201).json({ success: true, message: "Project added successfully", data: project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getProjects();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const existingProject = await projectService.getProjectById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    const { projectName, companyName, description, usedSkills } = req.body;
    const skillsArray = usedSkills ? normalizeSkills(usedSkills) : existingProject.usedSkills;

    const updatedData = {
      projectName: projectName ?? existingProject.projectName,
      companyName: companyName ?? existingProject.companyName,
      description: description ?? existingProject.description,
      usedSkills: skillsArray,
    };

    const updatedProject = await projectService.updateProject(req.params.id, updatedData);
    res.status(200).json({ success: true, message: "Project updated successfully", data: updatedProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const existingProject = await projectService.getProjectById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    await projectService.deleteProject(req.params.id);
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};