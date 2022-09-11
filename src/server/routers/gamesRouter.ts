import express from "express";

import multer from "multer";
import {
  createGame,
  deleteOne,
  editGame,
  getAllGames,
  getById,
  getOwnerGames,
} from "../controllers/gamesController";
import authentication from "../middlewares/auth";
import parserJson from "../middlewares/parserJson";
import compressImage from "../middlewares/resizeImg";
import supaBaseUpload from "../middlewares/supaBase";

const upload = multer({ dest: "uploads", limits: { fileSize: 3000000 } });
const gamesRouter = express.Router();

gamesRouter.get("/", getAllGames);
gamesRouter.post(
  "/",
  upload.single("image"),
  authentication,
  parserJson,
  compressImage,
  supaBaseUpload,
  createGame
);
gamesRouter.put(
  "/:id",
  upload.single("image"),
  authentication,
  parserJson,
  compressImage,
  supaBaseUpload,
  editGame
);
gamesRouter.get("/my-collection/:owner", authentication, getOwnerGames);
gamesRouter.get("/:id", authentication, getById);
gamesRouter.delete("/", authentication, deleteOne);
export default gamesRouter;
