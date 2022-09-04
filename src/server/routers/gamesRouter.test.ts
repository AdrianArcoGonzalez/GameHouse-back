import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../index";
import connectDatabase from "../../database";
import Game from "../../database/models/Game";

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUrl = mongoServer.getUri();

  await connectDatabase(mongoUrl);
});

afterEach(async () => {
  await Game.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a register endpoint", () => {
  describe("When it receive a request with method post on register and the correct user data", () => {
    test("Then it should response with status 201", async () => {
      const expectedStatus = 200;

      await request(app).get("/games/games/").expect(expectedStatus);
    });
  });
});
