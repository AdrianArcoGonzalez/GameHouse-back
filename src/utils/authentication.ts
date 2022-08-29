import "../loadEnvironment";
import bycrypt from "bcryptjs";

const hashCreator = (textToHash: string, salt: number) =>
  bycrypt.hash(textToHash, salt);

export default hashCreator;
