import chalk from "chalk";
import { debug } from "console";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import { CustomError } from "../../interfaces/interfaces";

const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  let errorCode = error.statusCode;
  let publicMessage = error.publicmessage;
  let privateMessage = error.privatemessage;

  if (error instanceof ValidationError) {
    errorCode = 400;
    publicMessage = "Invalid data";
    privateMessage = error.details.body[0].message;
    debug(chalk.blue("Invalidation request data:"));
  }

  res.status(errorCode).json({ publicMessage });
  debug(chalk.red(privateMessage));
};

export default generalError;
