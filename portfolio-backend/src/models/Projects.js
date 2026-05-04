import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  usedSkills: {
    type: [String],
    required: true
  },
  projectUrl: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);