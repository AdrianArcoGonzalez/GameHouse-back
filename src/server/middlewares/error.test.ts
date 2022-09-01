import { NextFunction, Request, Response } from "express";
import { errors, ValidationError } from "express-validation";
import { CustomError } from "../../interfaces/interfaces";
import generalError from "./error";

describe("Given a general error function", () => {
  const req = {} as Partial<Request>;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;
  const next = jest.fn();
  describe("When it receives a response object", () => {
    test("Then it should call the response method with status code 404", () => {
      const statusCode = 404;
      const errorFake: CustomError = {
        statusCode: 404,
        publicmessage: "Endpoint not found",
        privatemessage: "Access error",
        name: "",
        message: "",
      };
      const expectedReturn = { publicMessage: errorFake.publicmessage };

      generalError(
        errorFake as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith(expectedReturn);
    });
  });
  describe("And if it receive a validation error", () => {
    const error = new ValidationError(
      {
        body: [{ message: "error" }],
      } as errors,
      {}
    );
    test("Then it should response with status 400", () => {
      const expectedStatus = 400;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("And it should call the method json with the 'Invalid data' message", () => {
      const expectedError = { publicMessage: "Invalid data" };

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
