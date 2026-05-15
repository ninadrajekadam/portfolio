import mongoose from "mongoose";
import env from "./env.js";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("⚡ Using Database connection");
    return;
  }

  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      maxPoolSize: 10,
    });

    isConnected = conn.connection.readyState === 1;
    console.log("Database Connected");

    mongoose.connection.on("connected", () => {
      console.log("Database reconnected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Database error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected");
      isConnected = false;
    });

  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};
export default connectDB;