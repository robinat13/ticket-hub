import mongoose from "mongoose";
import { app } from "./app";

const startUp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Could not find JWT_KEY env variable");
  }
  await mongoose
    .connect("mongodb://auth-mongo-srv:27017/auth", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("Connected to db");

  app.listen(3000, () => {
    console.log("Auth service started on port 3000");
  });
};
startUp();
