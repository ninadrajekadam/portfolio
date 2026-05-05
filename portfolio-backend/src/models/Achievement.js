import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    achievement: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Achievement", achievementSchema);