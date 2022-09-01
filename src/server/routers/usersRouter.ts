import express from "express";
import multer from "multer";
import { schema, validate } from "express-validation";
import registerUser from "../controllers/userControllers";
import registerSchema from "../../schemas/registerSchema";

const usersRouter = express.Router();
const upload = multer({ dest: "uploads", limits: { fileSize: 3000000 } });

usersRouter.post(
  "/register",
  validate(registerSchema as schema, {}, { abortEarly: false }),
  upload.single("image"),
  registerUser
);

export default usersRouter;
