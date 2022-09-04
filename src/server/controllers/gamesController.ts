import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import customError from "../../utils/customError";
import Games from "../../database/models/Game";

const debug = Debug("GAMES:Controllers");

const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  let games;
  try {
    games = await Games.find();
    debug(chalk.yellow("Sending a response from getAllGames"));
  } catch (error) {
    const errorGetAll = customError(
      500,
      "Conection to database is down",
      "Cannot reach this request"
    );

    next(errorGetAll);
    return;
  }

  res.status(200).json({ games });
};

export default getAllGames;
