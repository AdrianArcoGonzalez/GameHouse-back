import { NextFunction, Response } from "express";
import { CustomRequest } from "../../interfaces/interfaces";
import customError from "../../utils/customError";

import authentication from "./auth";

let mockTokenVerify: jest.Mock<void> | string = jest.fn();

jest.mock("../../utils/authentication", () => ({
  ...jest.requireActual("../../utils/authentication"),
  verifyToken: () => mockTokenVerify,
}));

describe("Given an authentication middleware", () => {
  beforeEach(() => jest.clearAllMocks());
  describe("When invoke with req, res and next", () => {
    test("Then it should call the next function with tokenData as request payload", () => {
      const req = {
        get: jest.fn().mockReturnValue("Bearer #"),
      } as Partial<CustomRequest>;

      const res = {} as Partial<Response>;

      const next = jest.fn() as NextFunction;
      const error = customError(
        400,
        "Authentication error",
        "Authentication error"
      );

      authentication(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalledWith(error);
    });

    test("Then it should call the next function with an error if there isn't authoritzation header", () => {
      const req = {
        get: jest.fn().mockReturnValue(""),
      } as Partial<CustomRequest>;

      const res = {} as Partial<Response>;

      const next = jest.fn() as NextFunction;
      const error = customError(
        400,
        "Authentication error",
        "Authentication error"
      );

      authentication(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });

    test("Then it should call the next function with an error if the authoritzatiton header doesen't start with bearer", () => {
      const req = {
        get: jest.fn().mockReturnValue("Osador "),
      } as Partial<CustomRequest>;

      const res = {} as Partial<Response>;

      const next = jest.fn() as NextFunction;
      const error = customError(
        400,
        "Authentication error",
        "Authentication error"
      );

      authentication(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });

    test("Then it should call the next function with an error if the verify token fucntion return a string", () => {
      mockTokenVerify = "string";

      const req = {
        get: jest.fn().mockReturnValue("Bearer #"),
      } as Partial<CustomRequest>;

      const res = {} as Partial<Response>;

      const next = jest.fn() as NextFunction;

      authentication(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });
  });
});
