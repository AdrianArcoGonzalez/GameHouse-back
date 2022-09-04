import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import customError from "../../utils/customError";
import Games from "../../database/models/Game";

const debug = Debug("GAMES:Controllers");

const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  debug(chalk.yellow("Received a getAllGames req"));
  try {
    const AllGames = await Games.find();
    debug(chalk.yellow("Sending a response from getAllGames"));

    res.status(200).json({ AllGames });
  } catch {
    const errorGetAll = customError(
      500,
      "Conection to database is down",
      "Cannot reach this request"
    );

    next(errorGetAll);
  }
};

export default getAllGames;
