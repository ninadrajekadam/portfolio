import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    certificateName: {
      type: String,
      required: true,
      trim: true,
    },
    instituteName: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Certification", certificationSchema);