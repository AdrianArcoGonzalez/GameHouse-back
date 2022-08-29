import mongoose from "mongoose";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("ROBOTS:database");

const connectDatabase = (mongoUrl: string) =>
  new Promise((resolve, reject) => {
    mongoose.connect(mongoUrl, (error) => {
      if (error) {
        debug(chalk.red("Error conecting to database"));
        reject(error);
        return;
      }

      debug(chalk.green("Connected to database"));
      resolve(true);
    });
  });

export default connectDatabase;
