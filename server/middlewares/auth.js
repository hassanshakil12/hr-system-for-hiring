import jwt from "jsonwebtoken";

const tokenAuthentication = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT Token is required!!!" });
  }

  try {
    const JWTSecret = process.env.JWT_SECRET || "localhost";
    const decoded = jwt.verify(auth, JWTSecret);
    req.user = decoded;
    next()
  } catch (error) {
    return res.status(401).json({ message: "Token is wrong or expired!!!" });
  }
};

export { tokenAuthentication };
