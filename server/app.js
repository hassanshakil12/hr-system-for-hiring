import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
// import rateLimit from "express-rate-limit";
import { UPLOAD_DIR } from "./config/static.config.js";

import authRoutes from "./routes/auth.routes.js";
import organizationRoutes from "./routes/organization.routes.js";
import candidateRoutes from "./routes/candidate.routes.js";
import recruiterRoutes from "./routes/recruiter.routes.js";

const app = express();

dotenv.config();

app.use("/uploads", express.static(UPLOAD_DIR));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });

// app.use(limiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/candidate", candidateRoutes);
app.use("/api/v1/organization", organizationRoutes);
app.use("/api/v1/recruiter", recruiterRoutes);

export default app;
