import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 프로젝트 루트의 .env 읽기
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_SECRET_KEY",
  mongoUri: process.env.MONGODB_URI,
};

export default config;