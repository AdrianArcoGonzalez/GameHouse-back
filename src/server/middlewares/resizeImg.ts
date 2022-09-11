import { NextFunction, Request, Response } from "express";
import path from "path";
import sharp from "sharp";
import customError from "../../utils/customError";

const compressImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { image } = req.body;
  try {
    const imageResized = await sharp(path.join("uploads", image))
      .resize(200, 280, { fit: "cover" })
      .webp({ quality: 100 })
      .toFile(path.join("uploads", `_${image}.webp`));

    image = imageResized;
    next();
  } catch (error) {
    const newError = customError(
      400,
      "error resizeing img",
      "error resizeing img"
    );
    next(newError);
  }
};

export default compressImage;
