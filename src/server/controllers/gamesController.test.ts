import { NextFunction, Request, Response } from "express";
import Games from "../../database/models/Game";
import { Game } from "../../interfaces/interfaces";
import { getAllGames, getById } from "./gamesController";

describe("Given gamessController controller", () => {
  beforeEach(() => jest.restoreAllMocks());
  describe("When it's invoqued with getAllGames method", () => {
    const req: Partial<Request> = {};
    const next = jest.fn();
    test("Then it should call the status method with a 200", async () => {
      const status = 200;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Games.find = jest.fn().mockResolvedValue([]);
      await getAllGames(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });
    test("Then it should call the json method with the games", async () => {
      const games: Game[] = [
        {
          title: "Assassins Creed 2",
          company: "Ubisoft",
          category: "",
          dislikes: 0,
          likes: 0,
          image: "",
          owner: "",
          sinopsis: "",
          reviews: [""],
        },
        {
          title: "Commandos2",
          company: "Bethesda",
          category: "",
          dislikes: 0,
          likes: 0,
          image: "",
          owner: "",
          sinopsis: "",
          reviews: [""],
        },
      ];
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(games),
      };
      Games.find = jest.fn().mockResolvedValue(games);
      await getAllGames(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith({ games });
    });
    test("And if cannot get any game it should call the status method with a 500", async () => {
      const error = new Error();
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue([]),
      };
      Games.find = jest.fn().mockRejectedValue(error);
      await getAllGames(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it's invoked with his method getById", () => {
    test("Then it should response with status 200 and the game on json if it the data is ok", async () => {
      const requestedGame = {
        title: "Assassins Creed 2",
        company: "Ubisoft",
        category: "",
        dislikes: 0,
        likes: 0,
        image: "",
        owner: "",
        sinopsis: "",
        reviews: [""],
        id: "123123123123",
      };
      const req: Partial<Request> = { params: { id: "123123123123" } };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({ requestedGame }),
      };
      const next = jest.fn();
      Games.find = jest.fn().mockResolvedValue(requestedGame);
      await getById(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ requestedGame });
    });

    test("And it should call the next function with an error if cannot get the game", async () => {
      const error = new Error();
      const req: Partial<Request> = { params: { id: "123123123123" } };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue([]),
      };
      const next = jest.fn();
      Games.find = jest.fn().mockRejectedValue(error);
      await getById(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
