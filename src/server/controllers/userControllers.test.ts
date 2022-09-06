import { Request, Response, NextFunction } from "express";
import User from "../../database/models/User";
import { JwtPayload, UserRegister } from "../../interfaces/interfaces";
import { createToken } from "../../utils/authentication";
import customError from "../../utils/customError";
import { loginUser, registerUser } from "./userControllers";

let mockHashCompareValue: boolean | Error = true;
jest.mock("../../utils/authentication", () => ({
  ...jest.requireActual("../../utils/authentication"),
  hashCreate: () => jest.fn().mockReturnValue(""),
  createToken: () => "#",
  hashComparer: jest.fn().mockImplementation(() => mockHashCompareValue),
}));

const mockUser = {
  username: "adrian",
  password: "12356",
};

describe("Given a userController controller", () => {
  describe("When it invoked with registerUser method", () => {
    const newUser: UserRegister = {
      birthdate: new Date(),
      email: "adrian@gmail.com",
      image: "image.jpg",
      location: "barcelona",
      name: "adrian",
      password: "12345",
      username: "12345",
    };
    const userJson = JSON.stringify(newUser);

    const status = 201;

    const req: Partial<Request> = {
      body: { user: userJson },
      file: { fileName: "adrianImage" } as any,
    };

    test("Then it should call the status method with a 200", async () => {
      User.create = jest.fn().mockResolvedValue(newUser);
      const next: NextFunction = jest.fn();
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("And it should call the method json with the newUser created", async () => {
      const message = { message: "User Created" };
      User.create = jest.fn().mockResolvedValue(newUser);

      const next: NextFunction = jest.fn();
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({ user: newUser }),
      };

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith(message);
    });

    test("And if it reject the create method it should call the next function with the a custom error", async () => {
      const error = new Error();
      User.create = jest.fn().mockRejectedValue(error);

      const next: NextFunction = jest.fn();
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({ user: newUser }),
      };

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it's invoked with a loginUser method and the correct data", () => {
    const req = { body: mockUser } as Partial<Request>;
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    test("Then it should call the method status with a 200", async () => {
      User.find = jest.fn().mockReturnValue([mockUser]);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("And it should call the method json", async () => {
      await loginUser(req as Request, res as Response, next as NextFunction);

      const payLoad: JwtPayload = {
        id: "123456",
        username: "adrian",
      };

      const responseData = {
        user: { token: createToken(payLoad) },
      };

      expect(res.json).toHaveBeenCalledWith(responseData);
    });
  });
  describe("And when it's invoked with an unvalid user", () => {
    test("Then it should next an error with a custom error", async () => {
      const userError = customError(
        403,
        "User not found",
        "User or password not valid"
      );
      const next: NextFunction = jest.fn();
      User.find = jest.fn().mockReturnValue([]);
      const req = { body: "" } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(userError);
    });
  });
  describe("And when the user.find return an error", () => {
    test("Then it should next with a custom error", async () => {
      const error = new Error();
      const next: NextFunction = jest.fn();
      User.find = jest.fn().mockRejectedValue(error);
      const newError = customError(
        403,
        `name: ${(error as Error).name} message: ${error.message}`,
        "user or password not valid"
      );
      const req = { body: "" } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });

  describe("And if the hashComparer function throw and error", () => {
    test("Then it should call the next function with the error cached", async () => {
      mockHashCompareValue = false;
      User.find = jest.fn().mockReturnValue([mockUser]);
      const next: NextFunction = jest.fn();
      // const fakePaswoord = { username: "adrian", password: "213asdf" };
      const req = { body: mockUser } as Partial<Request>;
      const res: Partial<Response> = {};
      await loginUser(req as Request, res as Response, next as NextFunction);
      const error = new Error();
      expect(next).toHaveBeenCalledWith(error);
    });

    test("And if the hashComparer detect that the password is invalid it should throw an error", async () => {
      const error = new Error();
      const next: NextFunction = jest.fn();
      User.find = jest.fn().mockReturnValue({});
      const newError = customError(
        403,
        `name: ${(error as Error).name} message: ${error.message}`,
        "user or password not valid"
      );
      mockHashCompareValue = error;
      const req = { body: mockUser } as Partial<Request>;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });
});
