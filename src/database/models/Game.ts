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
    required: true,
  },
  likes: {
    type: Number,
    required: false,
  },
  dislikes: {
    type: Number,
    required: false,
  },
  reviews: {
    type: [String],
    required: false,
  },
  imageBackUp: {
    type: String,
  },
});

const Game = model("Games", gameSchema, "games");

export default Game;
