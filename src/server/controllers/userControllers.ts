import { Request, Response, NextFunction } from "express";
import User from "../../database/models/User";
import { UserRegister } from "../../interfaces/interfaces";
import hashCreator from "../../utils/authentication";
import customError from "../../utils/customError";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: UserRegister = req.body;
  user.password = await hashCreator(user.password, 10);

  try {
    const newUser = await User.create(user);

    res.status(200).json({ user: newUser });
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
