import Certification from "../models/Certification.js";

export const createCertification = (data) => {
  return Certification.create(data);
};

export const getAllCertifications = () => {
  return Certification.find().sort({ createdAt: -1 });
};

export const getCertificationById = (id) => {
  return Certification.findById(id);
};

export const updateCertification = (id, data) => {
  return Certification.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCertification = (id) => {
  return Certification.findByIdAndDelete(id);
};