import express from "express";
import { getAllGames, getById } from "../controllers/gamesController";

const gamesRouter = express.Router();

gamesRouter.get("/", getAllGames);
gamesRouter.get("/:id", getById);

export default gamesRouter;
