import { model, Schema } from "mongoose";

const gameSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sinopsis: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
  },
  likes: {
    type: Number,
  },
  dislikes: {
    type: Number,
  },
  reviews: {
    type: [String],
  },
});

const Games = model("Games", gameSchema, "games");

export default Games;
