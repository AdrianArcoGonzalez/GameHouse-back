import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import customError from "../../utils/customError";
import Game from "../../database/models/Game";

const debug = Debug("GAMES:Controllers");

export const getAllGames = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  let games;
  try {
    games = await Game.find();
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

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.yellow("Received a getById req"));
  let requestedGame;
  try {
    const idGame = req.params.id;
    requestedGame = await Game.find({ _id: idGame });
  } catch {
    next(customError(404, "Element not found", "Cant response this request"));
  }
  res.status(200).json(requestedGame);
};
