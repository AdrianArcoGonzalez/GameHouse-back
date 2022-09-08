import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { Game } from "../../interfaces/interfaces";
import customError from "../../utils/customError";
import parserJson from "./parserJson";

jest.useFakeTimers();

describe("Given a parseData middleware", () => {
  describe("When it receive a request, a response and a next function", () => {
    const mockedGame: Game = {
      category: "action",
      company: "Bethesda",
      image: "imageimage.webp",
      owner: "admin",
      sinopsis: "Lorem Lorem  Lorem  Lorem  Lorem  Lorem ",
      title: "Call of Duty",
      dislikes: 0,
      id: "123123123",
    };

    const gameJson = JSON.stringify(mockedGame);

    jest
      .spyOn(path, "join")
      .mockReturnValue(`${path.join("uploads", "image")}`);

    jest.spyOn(fs, "rename").mockResolvedValue();

    const req = {
      body: { game: gameJson },
      file: { filename: "callofduty", originalname: "callofduty" },
    } as Partial<Request>;

    const res = {} as Partial<Response>;

    const next = jest.fn() as NextFunction;

    test("Then it should asign the data as req body", async () => {
      await parserJson(req as Request, res as Response, next);

      expect(req.body).toStrictEqual({
        ...mockedGame,
        image: `${Date.now()}${req.file.filename}`,
      });
      expect(next).toHaveBeenCalled();
    });

    test("If it get an error it must call the next function with the error created", async () => {
      const reqWithoutImage = {
        body: { game: mockedGame },
      } as Partial<Request>;

      const newError = customError(404, "You must add", "Missing data");
      await parserJson(reqWithoutImage as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });
});
