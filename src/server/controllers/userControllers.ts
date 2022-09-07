import "../../loadEnvironment";
import { Request, Response, NextFunction } from "express";
import { validate } from "express-validation";
import User from "../../database/models/User";
import {
  IJwtPayload,
  LoginData,
  UserData,
  UserRegister,
} from "../../interfaces/interfaces";
import registerSchema from "../../schemas/registerSchema";
import {
  hashCreator,
  hashComparer,
  createToken,
} from "../../utils/authentication";
import customError from "../../utils/customError";

export const registerUser = async (
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

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body as LoginData;
  let findUser: UserData[];
  try {
    findUser = await User.find({ name: user.username });

    if (findUser.length === 0) {
      const userError = customError(
        403,
        "User not found",
        "User or password not valid"
      );
      next(userError);
      return;
    }
  } catch (error) {
    const newError = customError(
      403,
      `name: ${(error as Error).name} message: ${error.message}`,
      "user or password not valid"
    );

    next(newError);

    return;
  }

  try {
    const isPasswordValid = await hashComparer(
      user.password,
      findUser[0].password
    );

    if (!isPasswordValid) {
      throw new Error();
    }
  } catch (error) {
    const userError = customError(
      403,
      "User not found",
      "User or password not valid"
    );
    next(userError);
    return;
  }

  const payload: IJwtPayload = {
    id: findUser[0].id,
    username: findUser[0].username,
  };

  const responseData = { user: { token: createToken(payload) } };

  res.status(200).json(responseData);
};
