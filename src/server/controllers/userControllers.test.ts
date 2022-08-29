import { Request, Response, NextFunction } from "express";
import User from "../../database/models/User";
import { UserRegister } from "../../interfaces/interfaces";
import registerUser from "./userControllers";

describe("Given a userController controller", () => {
  describe("When it invoked with registerUser method", () => {
    test("Then it should call the status method with a 200", async () => {
      const user: UserRegister = {
        birthdate: new Date(),
        email: "",
        image: "",
        location: "",
        name: "",
        password: "",
        username: "",
      };
      const status = 200;
      const next: NextFunction = jest.fn();
      const req: Partial<Request> = { body: user };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.create = jest.fn().mockResolvedValue(user);

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
});
