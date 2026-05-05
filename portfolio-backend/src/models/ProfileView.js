import mongoose from "mongoose";

const profileViewSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("ProfileView", profileViewSchema);