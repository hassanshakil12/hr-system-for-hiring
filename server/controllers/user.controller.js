import bcrypt from "bcrypt";

import User from "../models/user.model.js";
import Recruiter from "../models/recruiter.model.js";
import Organization from "../models/organization.model.js";

const getModel = (entityType) => {
  switch (entityType) {
    case "user":
      return User;

    case "recruiter":
      return Recruiter;

    case "organization":
      return Organization;

    default:
      throw new Error("Invalid Entity Type");
  }
};

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
  const { entityType, username, email, password } = req.body;
  const Model = getModel(entityType);

  try {
    const existingEntity = await Model.findOne({ email });

    if (existingEntity) {
      return res.status(400).json({
        Message: `${entityType} already exists with the give email!!!`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newEntity = await Model.create({
      entityType: entityType,
      username: username,
      email: email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ Message: `${entityType} Registered Successfully ${newEntity}` });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export { getUser, registerUser };
