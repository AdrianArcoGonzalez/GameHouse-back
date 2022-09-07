import express from "express";
import {
  deleteOne,
  getAllGames,
  getById,
} from "../controllers/gamesController";

const gamesRouter = express.Router();

gamesRouter.get("/", getAllGames);
gamesRouter.get("/:id", getById);
gamesRouter.delete("/", deleteOne);
export default gamesRouter;
