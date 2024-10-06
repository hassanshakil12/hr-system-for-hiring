import app from "./app.js";
import config from "./config/env.config.js";

const startServer = () => {
  app.listen(config.port, (err) => {
    if (err) throw new Error();
    console.log(`Server is listening on port ${config.port} in ${config.nodeEnv} mode`);
  });
};

startServer()