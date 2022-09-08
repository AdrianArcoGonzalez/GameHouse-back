import "../loadEnvironment";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk";
import Debug from "debug";
import generalError from "./middlewares/error";
import usersRouter from "./routers/usersRouter";
import gamesRouter from "./routers/gamesRouter";

const debug = Debug("GAMES:IndexServer");

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(express.static("uploads"));
app.use(express.json());
app.use(morgan("dev"));
app.use((req, _res, next) => {
  debug(chalk.blue(`A request arrived to ${req.url}`));
  next();
});

app.use("/games/users", usersRouter);
app.use("/games/games", gamesRouter);
app.use("/", generalError);

export default app;
