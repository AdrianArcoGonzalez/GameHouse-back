import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import { validate } from "express-validation";
import customError from "../../utils/customError";
import Game from "../../database/models/Game";
import gameSchema from "../../schemas/gameSchema";

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

  try {
    const idGame = req.params.id;
    const game = await Game.findById(idGame);

    res.status(200).json({ game });
  } catch {
    next(customError(404, "Element not found", "Cant response this request"));
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idGame = req.body.id;

    await Game.findByIdAndDelete(idGame);

    res.status(200).json({ idGame });
  } catch (error) {
    next(
      customError(
        404,
        "Cannot find and delete this element",
        "Can't response this request"
      )
    );
  }
};

export const getOwnerGames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { owner } = req.params;
    const games = await Game.find({ owner });

    res.status(200).json({ games });
  } catch (error) {
    next(
      customError(404, "Cannot find any game from that owner", "No Games Found")
    );
  }
};

export const createGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const game = req.body;
  try {
    validate(gameSchema, {}, { abortEarly: false });
    const gameCreated = await Game.create(game);
    res.status(201).json({ game: gameCreated });
  } catch (error) {
    const errorCreate = customError(
      400,
      "error creating game",
      "Cannot create the game"
    );

    next(errorCreate);
  }
};
