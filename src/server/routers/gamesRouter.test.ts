import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../index";
import connectDatabase from "../../database";
import Game from "../../database/models/Game";
import { Game as IGame } from "../../interfaces/interfaces";

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUrl = mongoServer.getUri();

  await connectDatabase(mongoUrl);
});

const fakeGame = {
  title: "Assassins Creed 2",
  company: "Ubisoft",
  category: "adventure",
  dislikes: 150,
  likes: 180,
  image: "image",
  owner: "Admin",
  sinopsis: "sinposis Lorem Lorem Lorem Lorem Lorem Lorem",
  reviews: ["review"],
};

let gameCreated: IGame;
beforeEach(async () => {
  gameCreated = await Game.create(fakeGame);
});

afterEach(async () => {
  await Game.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a games endpoint", () => {
  const expectedStatus = 200;
  describe("When it receive a request to /games/games with method get", () => {
    test("Then it should response with status 200", async () => {
      await request(app).get("/games/games/").expect(expectedStatus);
    });
  });

  describe("When it receive a request to /games/games/12345", () => {
    test("Then it should response with status 200", async () => {
      await request(app)
        .get(`/games/games/${gameCreated.id}`)
        .expect(expectedStatus);
    });
  });

  describe("When it receive a request to /games/games with an id on the body", () => {
    test("Then it should response with status 200", async () => {
      await request(app).delete(`/games/games/`).expect(expectedStatus);
    });
  });
});
