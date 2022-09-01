import express from "express";
import multer from "multer";
import registerUser from "../controllers/userControllers";

const usersRouter = express.Router();
const upload = multer({ dest: "uploads", limits: { fileSize: 3000000 } });

usersRouter.post("/register", upload.single("image"), registerUser);

export default usersRouter;
