import "../loadEnvironment";

import Debug from "debug";
import chalk from "chalk";
import app from ".";

const debug = Debug("GAMES:startServer");

const startServer = (port: number) =>
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

export default startServer;
