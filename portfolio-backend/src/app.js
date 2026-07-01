import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import env from "./config/env.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import projectRoutes from "./routes/projectsRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import certificationRoutes from "./routes/certificationRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import profileViewRoutes from "./routes/profileViewRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

const allowedOrigins = [env.CORS_ORIGIN, "http://localhost:5173"].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (
      origin.includes("vercel.app") ||
      origin.includes("localhost")
    ) {
      return callback(null, true);
    }

    console.log("❌ Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/view", profileViewRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.code === "LIMIT_FILE_SIZE"
        ? "File too large. Maximum size is 5MB."
        : err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }

  next();
});

export default app;