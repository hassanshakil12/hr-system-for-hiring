import jwt from "jsonwebtoken";
import config from "../config/env.config.js";

export const tokenAuthentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    console.log("No Authorization Header");
    return res
      .status(401)
      .json({ message: "Unauthorized: JWT Token is required", success: false });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token);

  if (!token) {
    console.log("No Token Provided");
    return res
      .status(401)
      .json({ message: "Unauthorized: Token is missing", success: false });
  }

  try {
    const JWTSecret = config.jwt_secret;
    const decoded = jwt.verify(token, JWTSecret);
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token Error:", error.message);
    return res.status(401).json({
      message: "Unauthorized: Token is invalid or expired",
      success: false,
    });
  }
};
