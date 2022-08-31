import "../loadEnvironment";
import express from "express";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("GAMES:startServer");

export const app = express();
app.disable("x-powered-by");

export const startServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(
        chalk.greenBright(`Server listening on port http://localhost:${port}`)
      );
      resolve(true);
    });

    server.on("error", (error) => {
      debug(chalk.redBright("Error server error:", error.message));
      reject(error);
    });
  });
