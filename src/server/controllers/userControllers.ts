import "../../loadEnvironment";
import { Request, Response, NextFunction } from "express";
import { validate } from "express-validation";
import User from "../../database/models/User";
import { UserRegister } from "../../interfaces/interfaces";
import registerSchema from "../../schemas/registerSchema";
import hashCreator from "../../utils/authentication";
import customError from "../../utils/customError";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const json = req.body.user;
  try {
    const user: UserRegister = JSON.parse(json);
    validate(registerSchema, {}, { abortEarly: false });
    user.password = await hashCreator(user.password, 10);
    // eslint-disable-next-line prefer-destructuring
    user.image = `uploads\\${req.file.filename}`;
    await User.create(user);

    res.status(201).json({ message: "User Created" });
  } catch (error) {
    const errorCustom = customError(
      401,
      error.message,
      "Error creating new user"
    );

    next(errorCustom);
  }
};

export default registerUser;
