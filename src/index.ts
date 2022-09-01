import "./loadEnvironment";
import mongoose from "mongoose";
import connectDatabase from "./database";
import startServer from "./server/startServer";

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

(async () => {
  try {
    await startServer(+port);
    await connectDatabase(urlMongo);
  } catch (error) {
    process.exit(1);
  }
})();
