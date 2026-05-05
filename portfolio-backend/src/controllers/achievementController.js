import * as achievementService from "../services/achievementServices.js";

export const createAchievement = async (req, res) => {
  try {
    const { achievement, companyName, year } = req.body;

    if (!achievement || !companyName || !year) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const data = await achievementService.createAchievement(req.body);

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAchievements = async (req, res) => {
  try {
    const data = await achievementService.getAchievements();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAchievement = async (req, res) => {
  try {
    const data = await achievementService.getAchievement(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    const data = await achievementService.updateAchievement(
      req.params.id,
      req.body
    );

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    const data = await achievementService.deleteAchievement(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};