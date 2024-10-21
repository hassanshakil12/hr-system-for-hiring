import winston from "winston";
import app from "./app.js";
import config from "./config/env.config.js";
import connectDB from "./config/db.config.js";

const logger = winston.createLogger({
  level: config.logLevel,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

const startServer = () => {
  app.listen(config.port, (err) => {
    logger.info(
      `Server is listening on port ${config.port} in ${config.nodeEnv} mode at Localhost: http://localhost:5000/`
    );
  });
};

connectDB()
  .then(() => startServer())
  .catch((err) => logger.error(err));