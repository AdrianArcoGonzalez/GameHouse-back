import express from "express";
import {
  deleteOne,
  getAllGames,
  getById,
  getOwnerGames,
} from "../controllers/gamesController";
import authentication from "../middlewares/auth";

const gamesRouter = express.Router();

gamesRouter.get("/", getAllGames);
gamesRouter.get("/my-collection/:owner", authentication, getOwnerGames);
gamesRouter.get("/:id", authentication, getById);
gamesRouter.delete("/", authentication, deleteOne);
export default gamesRouter;
