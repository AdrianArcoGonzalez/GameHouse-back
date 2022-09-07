import express from "express";
import {
  deleteOne,
  getAllGames,
  getById,
  getOwnerGames,
} from "../controllers/gamesController";

const gamesRouter = express.Router();

gamesRouter.get("/", getAllGames);
gamesRouter.get("/my-collection/:owner", getOwnerGames);
gamesRouter.get("/:id", getById);
gamesRouter.delete("/", deleteOne);
export default gamesRouter;
