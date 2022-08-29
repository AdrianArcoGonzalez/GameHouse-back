import CustomError from "../interfaces/interfaces";

const customError = (
  statusCode: number,
  messagePrivate: string,
  messagePublic: string
) => {
  const error = new Error() as CustomError;
  error.privatemessage = messagePrivate;
  error.publicmessage = messagePublic;
  error.statusCode = statusCode;

  return error;
};

export default customError;
