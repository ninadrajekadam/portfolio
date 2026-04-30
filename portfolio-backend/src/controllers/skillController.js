import fs from "fs";
import * as skillService from "../services/skillServices.js";

export const addSkill = async (req, res) => {
  try {
    const { skillName, category, proficiency } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const skillImage = `/uploads/skills/${req.file.filename}`;

    const skill = await skillService.createSkill({
      skillName,
      category,
      proficiency,
      skillImage,
    });

    res.status(201).json({
      success: true,
      message: "Skill added",
      data: skill,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const skills = await skillService.getSkills();
    res.status(200).json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await skillService.getSkillById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    let updatedData = { ...req.body };

    if (req.file) {
      if (skill.skillImage) {
        const oldPath = `.${skill.skillImage}`;
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      updatedData.skillImage = `/uploads/skills/${req.file.filename}`;
    }

    const updatedSkill = await skillService.updateSkill(
      req.params.id,
      updatedData
    );

    res.status(200).json({
      success: true,
      message: "Skill updated",
      data: updatedSkill,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await skillService.getSkillById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.skillImage) {
      const filePath = `.${skill.skillImage}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await skillService.deleteSkill(req.params.id);

    res.status(200).json({
      success: true,
      message: "Skill deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};