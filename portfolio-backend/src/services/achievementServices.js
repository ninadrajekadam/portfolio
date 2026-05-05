import Achievement from "../models/Achievement.js";

export const createAchievement = (data) => {
  return Achievement.create(data);
};

export const getAchievements = () => {
  return Achievement.find().sort({ createdAt: -1 });
};

export const getAchievement = (id) => {
  return Achievement.findById(id);
};

export const updateAchievement = (id, data) => {
  return Achievement.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAchievement = (id) => {
  return Achievement.findByIdAndDelete(id);
};