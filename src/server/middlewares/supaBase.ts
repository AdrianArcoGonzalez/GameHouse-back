import { NextFunction, Request, Response } from "express";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { readFile } from "fs/promises";
import customError from "../../utils/customError";

const supabase = createClient(
  "https://ufafxozrqezyacmvfscu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmYWZ4b3pycWV6eWFjbXZmc2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI3NDM2NTgsImV4cCI6MTk3ODMxOTY1OH0.pwlLr3TYCvS413m94ehyZkGlxtTj5WQD350N7IR5NoI"
);

const supaBaseUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { image } = req.body;

  const imagePath = path.join("uploads", image);

  try {
    const fileData = await readFile(imagePath);

    const storage = supabase.storage.from("gamehouse");

    const uploadResult = await storage.upload(image, fileData);

    if (uploadResult.error) {
      next(uploadResult.error);
      return;
    }

    const { publicURL } = storage.getPublicUrl(image);

    req.body.imageBackUp = publicURL;
    next();
  } catch (error) {
    const newError = customError(
      500,
      "Couldn't upload or read the image",
      "Error while reading and uploading the image"
    );
    next(newError);
  }
};

export default supaBaseUpload;
