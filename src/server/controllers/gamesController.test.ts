import { NextFunction, Request, Response } from "express";
import Game from "../../database/models/Game";
import {
  createGame,
  deleteOne,
  editGame,
  getAllGames,
  getByCategory,
  getById,
  getOwnerGames,
} from "./gamesController";
import { Game as IGame } from "../../interfaces/interfaces";

const games: IGame[] = [
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
const game = {
  title: "Assassins Creed 2",
  company: "Ubisoft",
  category: "Adventure",
  dislikes: 0,
  likes: 0,
  image: "image.webp",
  owner: "admin",
  sinopsis: "Lorem Lorem Lorem",
  reviews: [""],
  id: "123123123123",
};

describe("Given gamessController controller", () => {
  beforeEach(() => jest.restoreAllMocks());
  describe("When it's invoqued with getAllGames method", () => {
    const req: Partial<Request> = {
      query: {},
    };

    const next = jest.fn();
    test("Then it should call the status method with a 200", async () => {
      const status = 200;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Game.find = await jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            exec: jest.fn().mockReturnValue(games),
          }),
        }),
      });

      await getAllGames(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });
    test("Then it should call the json method with the games", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(games),
      };
      Game.find = await jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            exec: jest.fn().mockReturnValue(games),
          }),
        }),
      });

      await getAllGames(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith({ games });
    });
    test("And if cannot get any game it should call the status method with a 500", async () => {
      const error = new Error();
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue([]),
      };
      Game.find = jest.fn().mockReturnValue(error);

      await getAllGames(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it's invoked with his method getById", () => {
    test("Then it should response with status 200 and the game on json if it the data is ok", async () => {
      const req: Partial<Request> = { params: { id: "123123123123" } };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({ game }),
      };
      const next = jest.fn();
      Game.findById = jest.fn().mockResolvedValue(game);
      await getById(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ game });
    });

    test("And it should call the next function with an error if cannot get the game", async () => {
      const error = new Error();
      const req: Partial<Request> = { params: { id: "123123123123" } };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue([]),
      };
      const next = jest.fn();
      Game.findById = jest.fn().mockRejectedValue(error);

      await getById(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it's invoked with the method deleteOne", () => {
    test("And if the data is ok it should call the status 200 and json with the id deleted", async () => {
      const req: Partial<Request> = { body: { id: "123123123123" } };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({ idGame: "123123123123" }),
      };
      const next = jest.fn();
      Game.findByIdAndDelete = jest.fn();

      await deleteOne(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ idGame: "123123123123" });
    });

    test("And if the data is wrong it should call the next function with an error", async () => {
      const error = new Error();
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue([]),
      };
      const next = jest.fn();
      Game.findByIdAndDelete = jest.fn().mockResolvedValue(error);

      await deleteOne(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When its invoked with the method getOwnerGames", () => {
    test("Then if the token is ok it should call the status with 200 and the json method", async () => {
      const status = 200;
      const req = {
        params: { owner: "123123123" },
      } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({ game }),
      };
      const next = jest.fn();
      Game.find = jest.fn().mockResolvedValue({ game });

      await getOwnerGames(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalled();
    });

    test("And if it found error it should next with the error", async () => {
      const error = new Error();
      const req = {} as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue([]),
      };
      const next = jest.fn();
      Game.find = jest.fn().mockResolvedValue(error);

      await getOwnerGames(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When its invoked with method createGame", () => {
    test("then it should call the status method with a 200 and json with the game created", async () => {
      const req = {} as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({ game }),
      };
      const next = jest.fn();
      Game.create = jest.fn().mockResolvedValue(game);

      await createGame(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ game });
    });
    test("And if it throw an error creating it should next with an error", async () => {
      const error = new Error();
      const req = {} as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue([]),
      };
      const next = jest.fn();
      Game.create = jest.fn().mockRejectedValue(error);

      await createGame(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it's invoked the method editGame", () => {
    test("Then it should call the status method with 200", async () => {
      const req = {
        body: game,
        params: game.id as unknown,
      } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({ game }),
      };
      const next = jest.fn();
      Game.findByIdAndUpdate = jest.fn().mockResolvedValue(game);

      await editGame(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ game });
    });

    test("Then it should next with an error if it cannot complete the update", async () => {
      const error = new Error();
      const req = {
        params: game.id as unknown,
      } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue([]),
      };
      const next = jest.fn();
      Game.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      await editGame(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it's invoked with getByCategory method", () => {
    test("Then it should call the status method with a 200 and json with the games found", async () => {
      const req = {
        params: "MOBA" as unknown,
      } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({ game }),
      };
      const next = jest.fn();
      Game.find = jest.fn().mockResolvedValue(game);

      await getByCategory(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ games: game });
    });
    test("Then it should next with an error if the function throw an error ", async () => {
      const error = new Error();
      const req = {
        params: game.category as unknown,
      } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue([]),
      };
      const next = jest.fn();
      Game.find = jest.fn().mockRejectedValue(error);

      await editGame(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
