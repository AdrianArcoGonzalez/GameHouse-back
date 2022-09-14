import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../index";
import connectDatabase from "../../database";
import User from "../../database/models/User";

let mongoServer: MongoMemoryServer;
const userBaseData = {
  birthdate: new Date(),
  email: "adrian@gmail.com",
  image: "adrianImage.jpg",
  location: "barcelona",
  name: "adrian",
  repeatPassword: "123456789",
  password: "123456789",
  username: "adrian89",
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUrl = mongoServer.getUri();

  await connectDatabase(mongoUrl);
});

afterEach(async () => {
  await User.deleteMany(userBaseData);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

const newUser = {
  birthdate: "10/10/1010",
  email: "adrian@gmail.com",
  image: "",
  location: "barcelona",
  name: "adrian",
  password: "12345",
  username: "adrian",
};
const userJson = JSON.stringify(newUser);
const user = userJson;

describe("Given a register endpoint", () => {
  describe("When it receive a request with method post on register and the correct user data", () => {
    test("Then it should response with status 201", async () => {
      const expectedStatus = 201;
      await request(app)
        .post("/games/users/register")
        .type("multipart/form-data")
        .field("user", user)
        .attach("image", Buffer.from("fakeImage", "utf-8"), {
          filename: "avatar.jpg",
        })
        .expect(expectedStatus);
    });

    test("And status 401 for a wrong user data", async () => {
      const expectedStatus = 409;
      const user2 = {};
      await request(app)
        .post("/games/users/register")
        .send(user2)
        .expect(expectedStatus);
    });
  });
  describe("When it receive a request with post on login with correct data", () => {
    test("Then it should response with status 200 and a token", async () => {
      const expectedStatus = 200;
      const user1 = { username: "adrian", password: "12345" };
      await User.create(userBaseData);
      await request(app)
        .post("/games/users/login")
        .send(user1)
        .expect(expectedStatus);
    });

    test("And if it get a wrong password should response with 403 as status", async () => {
      await User.create(userBaseData);

      const expectedStatus = 403;
      const user2 = { username: "adrian", password: "1238888" };
      await request(app)
        .post("/games/users/login")
        .send(user2)
        .expect(expectedStatus);
    });
  });
});
