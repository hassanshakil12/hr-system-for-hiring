import joi from "joi";

const signUpValidation = (req, res, next) => {
  const schema = joi.object({
    entityType: joi.string().min(4).max(12).required(),
    username: joi.string().min(6).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "bad Request", error });
  }

  next();
};

const signInValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required(),
    entityType: joi.string().min(4).max(12).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "bad Request", error });
  }

  next();
};

export { signUpValidation, signInValidation };
