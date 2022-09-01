import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../index";
import connectDatabase from "../../database";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUrl = mongoServer.getUri();

  await connectDatabase(mongoUrl);
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
  username: "12345",
};
const userJson = JSON.stringify(newUser);
const user = userJson;

describe("Given a register endpoint", () => {
  describe("When it receive a request with method post and the correct user data", () => {
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
      const expectedStatus = 401;
      const user2 = {};
      await request(app)
        .post("/games/users/register")
        .send(user2)
        .expect(expectedStatus);
    });
  });
});
