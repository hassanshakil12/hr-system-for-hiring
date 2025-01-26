import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info",
  mongoDB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/hr-system",
  jwt_secret: process.env.JWT_SECRET || "localhost"
};

export default config;
