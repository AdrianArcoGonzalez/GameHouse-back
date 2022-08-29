import "./loadEnvironment";
import Debug from "debug";
import cors from "cors";
import express from "express";
import chalk from "chalk";
import morgan from "morgan";
import connectDatabase from "./database";
import { app, startServer } from "./server/startServer";

const debug = Debug("GAMES:");
const port = process.env.PORT ?? 4500;
const urlMongo = process.env.MONGOURL;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use((req, _res, next) => {
  debug(chalk.blue(`A request arrived to ${req.url}`));
  next();
});

(async () => {
  try {
    await startServer(+port);
    await connectDatabase(urlMongo);
  } catch (error) {
    process.exit(1);
  }
})();
