import { NextFunction, Request, Response } from "express";
import fs from "fs";
import resizeImg from "./resizeImg";

const mockToFile = jest.fn();

const mockJpeg = jest.fn().mockReturnValue({
  toFile: mockToFile,
});

let mockResize = jest.fn().mockReturnValue({
  jpeg: mockJpeg,
});

jest.mock("sharp", () => () => ({
  resize: mockResize,
}));

beforeAll(async () => {
  await fs.writeFile("uploads/image.png", "content", () => {});
});

afterAll(async () => {
  await fs.unlink("uploads/image.png", () => {});
  await fs.unlink("uploads/r_image.png", () => {});
});

describe("Given a compressImage function", () => {
  const req = {
    body: {
      image: "image.png",
    },
  } as Partial<Request>;
  const res = {} as Partial<Response>;
  const next = jest.fn();

  describe("When called with a request, a response and a next function", () => {
    test("Then it should resize and compress the received image", async () => {
      jest.restoreAllMocks();
      await resizeImg(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });

    test("Then it should call next to continue to the next middleware", async () => {
      await resizeImg(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });

    test("Then it should call next with an error if something goes wrong", async () => {
      jest.clearAllMocks();
      jest.restoreAllMocks();

      mockResize = jest.fn().mockReturnValue({
        jpeg: jest.fn().mockReturnValue({
          toFile: jest.fn().mockRejectedValue(new Error()),
        }),
      });

      await resizeImg(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});
