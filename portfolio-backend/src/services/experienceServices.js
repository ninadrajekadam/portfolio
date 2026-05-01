import Experience from "../models/Experience.js";

export const createExperience = async (data) => {
  return await Experience.create(data);
};

export const getExperiences = async () => {
  return await Experience.find().sort({ createdAt: -1 });
};

export const getExperienceById = async (id) => {
  return await Experience.findById(id);
};

export const updateExperience = async (id, data) => {
  return await Experience.findByIdAndUpdate(id, data, { new: true });
};

export const deleteExperience = async (id) => {
  return await Experience.findByIdAndDelete(id);
};