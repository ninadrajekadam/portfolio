import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    role: String,
    about: String,
    profileImage: String,
    cvFile: String,
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);