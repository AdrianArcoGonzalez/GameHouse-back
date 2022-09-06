import { Joi } from "express-validation";

const registerSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    username: Joi.string().required(),
    location: Joi.string().required(),
    password: Joi.string().min(5).required(),
    birthdate: Joi.string().required(),
    repeatPassword: Joi.string().min(5).required(),
    image: Joi.string(),
  }),
};

export default registerSchema;
