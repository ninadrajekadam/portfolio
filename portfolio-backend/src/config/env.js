import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });


// const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
// requiredEnvVars.forEach((key) => {
  //   if (!process.env[key]) {
    //     console.error(`❌ Missing environment variable: ${key}`);
    //     process.exit(1);
    //   }
    // });
    
const isProd = process.env.NODE_ENV === "production";

const env = {
  PORT: parseInt(process.env.PORT, 10) || 8080,

  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,

  CORS_ORIGIN: isProd
    ? process.env.CORS_ORIGIN_PROD || "https://ninadkadam-portfolio.vercel.app"
    : process.env.CORS_ORIGIN_DEV || "http://localhost:5173",
    
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default env;