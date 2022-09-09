import express from "express";
import multer from "multer";
import {
  createGame,
  deleteOne,
  getAllGames,
  getById,
  getOwnerGames,
} from "../controllers/gamesController";
import authentication from "../middlewares/auth";
import parserJson from "../middlewares/parserJson";
import supaBaseUpload from "../middlewares/supaBase";

const upload = multer({ dest: "uploads" });
const gamesRouter = express.Router();

gamesRouter.get("/", getAllGames);
gamesRouter.post(
  "/",
  upload.single("image"),
  authentication,
  parserJson,
  supaBaseUpload,
  createGame
);
gamesRouter.get("/my-collection/:owner", authentication, getOwnerGames);
gamesRouter.get("/:id", authentication, getById);
gamesRouter.delete("/", authentication, deleteOne);
export default gamesRouter;
