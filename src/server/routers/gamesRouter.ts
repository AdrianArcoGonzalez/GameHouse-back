import express from "express";
import getAllGames from "../controllers/gamesController";

const gamesRouter = express.Router();

gamesRouter.get("/", getAllGames);

export default gamesRouter;
