import * as certificationService from "../services/certificationServices.js";

export const createCertification = async (req, res) => {
  try {
    const { certificateName, instituteName, date } = req.body;

    if (!certificateName || !instituteName || !date) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const data = await certificationService.createCertification(req.body);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCertifications = async (req, res) => {
  try {
    const data = await certificationService.getAllCertifications();

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCertification = async (req, res) => {
  try {
    const data = await certificationService.getCertificationById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCertification = async (req, res) => {
  try {
    const data = await certificationService.updateCertification(
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

export const deleteCertification = async (req, res) => {
  try {
    const data = await certificationService.deleteCertification(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};