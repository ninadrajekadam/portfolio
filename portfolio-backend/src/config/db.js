import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing in .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;