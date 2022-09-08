import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import customError from "../../utils/customError";

const parserJson = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newGame = req.body.game;

    const game = await JSON.parse(newGame);

    const newName = `${Date.now()}${req.file.originalname}`;
    game.image = newName;

    await fs.rename(
      path.join("uploads", req.file.filename),
      path.join("uploads", newName)
    );

    game.image = newName;

    req.body = game;

    next();
  } catch (error) {
    const errorData = customError(404, "Missing data", "Missing data");
    next(errorData);
  }
};

export default parserJson;
