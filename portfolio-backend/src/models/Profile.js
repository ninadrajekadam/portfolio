import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
    whatsapp: String,
    city: String,
    github: String,
    linkedin: String,
    facebook: String,
    instagram: String,
    role: String,
    about: String,
    profileImage: String,
    cvFile: String,
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);