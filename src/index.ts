import "./loadEnvironment";
import Debug from "debug";
import cors from "cors";
import express from "express";
import chalk from "chalk";
import morgan from "morgan";
import mongoose from "mongoose";
import connectDatabase from "./database";
import { app, startServer } from "./server/startServer";
import generalError from "./server/middlewares/error";
import usersRouter from "./server/routers/usersRouter";

const debug = Debug("GAMES:");
const port = process.env.PORT ?? 4500;
const urlMongo = process.env.MONGOURL;

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    const newDocument = { ...ret };

    // eslint-disable-next-line no-underscore-dangle
    delete newDocument.__v;
    // eslint-disable-next-line no-underscore-dangle
    delete newDocument._id;

    return newDocument;
  },
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use((req, _res, next) => {
  debug(chalk.blue(`A request arrived to ${req.url}`));
  next();
});

app.use("/games/users", usersRouter);
app.use("/", generalError);

(async () => {
  try {
    await startServer(+port);
    await connectDatabase(urlMongo);
  } catch (error) {
    process.exit(1);
  }
})();
