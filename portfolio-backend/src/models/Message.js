import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["message", "feedback"],
    default: "",
  },
  name: String,
  email: String,
  message: String,

  isRead: {
    type: Boolean,
    default: false,
  },

  reply: String,
  repliedAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message", messageSchema);