import express from "express";
import multer from "multer";
import { loginUser, registerUser } from "../controllers/userControllers";

const usersRouter = express.Router();
const upload = multer({ dest: "uploads", limits: { fileSize: 3000000 } });

usersRouter.post("/register", upload.single("image"), registerUser);
usersRouter.post("/login", loginUser);
export default usersRouter;
