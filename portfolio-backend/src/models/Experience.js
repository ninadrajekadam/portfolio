import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    exitDate: {
      type: Date,
      default: null,
    },
    totalExp: {
      type: Number,
      required: true,
      default: 0,
    },
    responsibilities: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Experience", experienceSchema);
