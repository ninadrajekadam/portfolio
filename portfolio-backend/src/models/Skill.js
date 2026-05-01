import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    skillName: { type: String, required: true, trim: true },
    skillImage: { type: String, required: true },
    imagePublicId: { type: String },
    category: { type: String, required: true },
    proficiency: { type: Number, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);