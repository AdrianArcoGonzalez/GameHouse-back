import { Joi } from "express-validation";

const registerSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(10).max(20).required(),
    username: Joi.string().min(3).max(15).required(),
    location: Joi.string().min(5).max(15).required(),
    password: Joi.string().min(5).max(15).required(),
    birthdate: Joi.string().min(6).max(10).required(),
    repeatPassword: Joi.string().min(5).max(15).required(),
    image: Joi.string(),
  }),
};

export default registerSchema;
