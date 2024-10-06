import winston from "winston";
import app from "./app.js";
import config from "./config/env.config.js";

const logger = winston.createLogger({
  level: config.logLevel,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

const startServer = () => {
  app.listen(config.port, (err) => {
    logger.error(
      `Server is listening on port ${config.port} in ${config.nodeEnv} mode`
    );
  });
};

startServer();
