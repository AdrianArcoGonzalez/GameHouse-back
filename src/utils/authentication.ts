import "../loadEnvironment";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces/interfaces";

export const hashCreator = (textToHash: string, salt: number) =>
  bycrypt.hash(textToHash, salt);

export const hashComparer = (password: string, hashedPasword: string) =>
  bycrypt.compare(password, hashedPasword);

export const createToken = (payload: JwtPayload) =>
  jwt.sign(payload, process.env.SECRET);
