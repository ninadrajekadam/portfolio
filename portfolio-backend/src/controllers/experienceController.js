import * as experienceService from "../services/experienceServices.js";

const computeTotalExp = (joiningDate, exitDate) => {
  if (!joiningDate) return 0;

  const start = new Date(joiningDate);
  if (isNaN(start.getTime())) return 0;

  let end;
  if (!exitDate) {
    end = new Date();
  } else {
    end = new Date(exitDate);
    if (isNaN(end.getTime())) return 0;
  }

  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = diffDays / 365.25;

  return Number(years.toFixed(1));
};

const normalizeResponsibilities = (responsibilities) => {
  if (Array.isArray(responsibilities)) {
    return responsibilities.map((item) => item?.trim()).filter(Boolean);
  }

  if (typeof responsibilities === "string") {
    return responsibilities
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export const addExperience = async (req, res) => {
  try {
    const { role, company, joiningDate, exitDate, responsibilities, totalExp } = req.body;

    if (!role || !company || !joiningDate || !responsibilities) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const responsibilitiesArray = normalizeResponsibilities(responsibilities);
    if (!responsibilitiesArray.length) {
      return res.status(400).json({ message: "Please provide responsibilities" });
    }

    const parsedTotalExp = Number(totalExp);
    const experience = await experienceService.createExperience({
      role,
      company,
      joiningDate: new Date(joiningDate),
      exitDate: exitDate ? new Date(exitDate) : null,
      totalExp:
        Number.isFinite(parsedTotalExp) && parsedTotalExp > 0
          ? parsedTotalExp
          : computeTotalExp(joiningDate, exitDate),
      responsibilities: responsibilitiesArray,
    });

    res.status(201).json({ success: true, message: "Experience added", data: experience });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllExperience = async (req, res) => {
  try {
    const experiences = await experienceService.getExperiences();
    res.status(200).json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const existing = await experienceService.getExperienceById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Experience not found" });
    }

    const { role, company, joiningDate, exitDate, responsibilities, totalExp } = req.body;
    const responsibilitiesArray = normalizeResponsibilities(responsibilities);
    const parsedTotalExp = Number(totalExp);

    const updatedData = {
      role: role ?? existing.role,
      company: company ?? existing.company,
      joiningDate: joiningDate ? new Date(joiningDate) : existing.joiningDate,
      exitDate: exitDate ? new Date(exitDate) : (exitDate === null ? null : existing.exitDate),
      responsibilities: responsibilitiesArray.length ? responsibilitiesArray : existing.responsibilities,
      totalExp:
        Number.isFinite(parsedTotalExp) && parsedTotalExp > 0
          ? parsedTotalExp
          : computeTotalExp(joiningDate ?? existing.joiningDate, exitDate ?? existing.exitDate),
    };

    const updatedExperience = await experienceService.updateExperience(req.params.id, updatedData);
    res.status(200).json({ success: true, message: "Experience updated", data: updatedExperience });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const existing = await experienceService.getExperienceById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Experience not found" });
    }

    await experienceService.deleteExperience(req.params.id);
    res.status(200).json({ success: true, message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
