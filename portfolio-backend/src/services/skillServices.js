import Skill from "../models/Skill.js";

export const createSkill = async (data) => {
  return await Skill.create(data);
};

export const getSkills = async () => {
  return await Skill.find().sort({ createdAt: -1 });
};

export const updateSkill = async (id, data) => {
  return await Skill.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSkill = async (id) => {
  return await Skill.findByIdAndDelete(id);
};

export const getSkillById = async (id) => {
  return await Skill.findById(id);
};