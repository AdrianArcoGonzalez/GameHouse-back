import { Request, Response, NextFunction } from "express";
import User from "../../database/models/User";
import { UserRegister } from "../../interfaces/interfaces";
import registerUser from "./userControllers";

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
});
