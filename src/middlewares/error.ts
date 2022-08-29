import chalk from "chalk";
import { debug } from "console";
import { NextFunction, Request, Response } from "express";
import CustomError from "../interfaces/interfaces";

const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  const errorCode = error.statusCode ?? 404;
  const publicMessage = error.publicmessage ?? "Endpoint not found";
  const privateMessage = error.privatemessage ?? "Access error";

  res.status(errorCode).json({ publicMessage });
  debug(chalk.red(privateMessage));
};

export default generalError;
