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
  games?: string[];
  reviews?: string[];
}

export interface LoginData {
  id: string;
  username: string;
  password: string;
}

export interface UserData {
  username: string;
  password: string;
  email: string;
  image: string;
  name: string;
  birthdate: Date;
  location: string;
  games?: string[];
  reviews?: string[];
  id: string;
}
export interface JwtPayload {
  id: string;
  username: string;
}

export interface Game {
  title: string;
  category: string;
  company: string;
  image: string;
  sinopsis: string;
  owner: string;
  likes: number;
  dislikes: number;
  reviews?: string[];
}
