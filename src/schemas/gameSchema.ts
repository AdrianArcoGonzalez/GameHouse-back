import { Joi } from "express-validation";

const gameSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    owner: Joi.string().required(),
    category: Joi.string().required(),
    company: Joi.string().required(),
    sinopsis: Joi.string().required(),
    likes: Joi.number().required(),
    dislikes: Joi.number().required(),
    image: Joi.string().required(),
    reviews: Joi.array().optional(),
  }),
};

export default gameSchema;
