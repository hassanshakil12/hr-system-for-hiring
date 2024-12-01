import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const getUser = (req, res) => {
  try {
    console.log("Hello World");
    res.status(200).json({ Message: "All good" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Server Not Responding" });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const Model = User;

  try {
    const existingUser = await Model.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: `${existingUser.username} already exists with the give email!!!`,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await Model.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: `Registeration Successful ${newUser}`, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


const SignInUser = async (req, res) => {
  const { email, password } = req.body;
  const Model = User;
  const errMsg = "Login Failed!!! Email/Passwoord is incorrect..."

  try {
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password)
    if(!isPasswordEqual){
      return res.status(403).json({
        message: errMsg,
        success: false
      })
    }

    const jwtToken = jwt.sign(
      {email: user.email, _id: user._id},
      process.env.JWT_SERCET,
      {expiresIn: "24h"}
    )

    res
      .status(201)
      .json({ 
        message: `Login Successful`, 
        success: true,
        jwtToken,
        email,
        username: user.username
       });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export { getUser, registerUser, SignInUser };
