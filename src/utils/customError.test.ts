import customError from "./customError";

describe("Given a customError function", () => {
  describe("When it's invoked with a code and a public/private message", () => {
    test("Then it should return an error with this properties", () => {
      const codeStatus = 400;
      const privateMessage = "";
      const publicMessage = "";
      const customReturn = customError(
        codeStatus,
        privateMessage,
        publicMessage
      );

      expect(customReturn.statusCode).toBe(codeStatus);
      expect(customReturn.publicmessage).toBe(publicMessage);
      expect(customReturn.publicmessage).toBe(privateMessage);
    });
  });
});
