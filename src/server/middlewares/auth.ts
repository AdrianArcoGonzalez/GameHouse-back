import { NextFunction, Response } from "express";
import { CustomRequest } from "../../interfaces/interfaces";
import { verifyToken } from "../../utils/authentication";
import customError from "../../utils/customError";

const authentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const error = customError(400, "Bad request", "Authentication Error");
  const dataAuthentication = req.get("authorization");

  if (!dataAuthentication || !dataAuthentication.startsWith("Bearer")) {
    next(error);
    return;
  }

  const token = dataAuthentication.slice(7);
  const tokenData = verifyToken(token);

  if (typeof tokenData === "string") {
    next(error);
    return;
  }

  req.payload = tokenData;

  next();
};
export default authentication;
