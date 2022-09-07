import "../loadEnvironment";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../interfaces/interfaces";

export const hashCreator = (textToHash: string, salt: number) =>
  bycrypt.hash(textToHash, salt);

export const hashComparer = (password: string, hashedPasword: string) =>
  bycrypt.compare(password, hashedPasword);

export const createToken = (payload: IJwtPayload) =>
  jwt.sign(payload, process.env.SECRET);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.SECRET);
