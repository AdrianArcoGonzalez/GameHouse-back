export interface CustomError extends Error {
  statusCode: number;
  publicmessage?: string;
  privatemessage?: string;
}

export interface UserRegister {
  username: string;
  password: string;
  email: string;
  image: string;
  name: string;
  birthdate: Date;
  location: string;
}
