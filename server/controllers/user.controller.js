import bcrypt from "bcrypt";
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

export { getUser, registerUser };
