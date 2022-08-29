interface CustomError extends Error {
  statusCode: number;
  publicmessage?: string;
  privatemessage?: string;
}

export default CustomError;
