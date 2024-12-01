import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
// import rateLimit from "express-rate-limit";

import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(cors());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });

// app.use(limiter);

app.use("/api/v1/user", userRoutes);

export default app;
