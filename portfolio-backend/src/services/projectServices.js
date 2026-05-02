import Project from "../models/Projects.js";

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

export const createProject = async (projectData) => {
  const project = new Project({
    projectName: projectData.projectName,
    companyName: projectData.companyName,
    description: projectData.description,
    usedSkills: normalizeSkills(projectData.usedSkills),
  });

  return await project.save();
};

export const getProjects = async () => {
  return await Project.find().sort({ createdAt: -1 });
};

export const getProjectById = async (id) => {
  return await Project.findById(id);
};

export const updateProject = async (id, updateData) => {
  const normalizedData = {
    ...updateData,
    usedSkills: updateData.usedSkills ? normalizeSkills(updateData.usedSkills) : undefined,
  };

  return await Project.findByIdAndUpdate(id, normalizedData, {
    new: true,
    runValidators: true,
  });
};

export const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};