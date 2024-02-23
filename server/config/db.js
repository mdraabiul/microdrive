import mongoose from "mongoose";
import "dotenv/config.js";

const db = async () => {
  const mongoURI = process.env.mongoURI;

  mongoose
    .connect(mongoURI)
    .then(() => console.log("db is connected"))
    .catch((error) => console.log(error.message));
};

export default db;
