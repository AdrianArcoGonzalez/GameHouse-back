import { NextFunction, Request, Response } from "express";
import Games from "../../database/models/Game";
import getAllGames from "./gamesController";

describe("Given gamessController controller", () => {
  const req: Partial<Request> = {};
  describe("When it's invoqued with getAllGames method", () => {
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
  });
});
