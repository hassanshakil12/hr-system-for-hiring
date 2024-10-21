import mongoose from "mongoose";
import config from "./env.config.js";

const connectDB = async () => {
  try {
    let connectionInstance = await mongoose.connect(`${config.mongoDB_URI}`);
    mongoose.connection.on("connected", () => {
      console.log(
        `Database connected!!! DB Host: ${connectionInstance.connection.host}`
      );
    });

    mongoose.connection.on("disconnected", () => {
      console.log(`Database disconnected!!!`);
    });

    mongoose.connection.on("error", () => {
      console.log(`Database connection error!!!`);
    });
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
};

export default connectDB;
