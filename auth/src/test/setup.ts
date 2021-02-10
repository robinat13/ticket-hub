import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../app";

let mongo: any;
//Hook that Runs before all the test cases start executing
beforeAll(async () => {
  process.env.JWT_KEY = "test";
  mongo = new MongoMemoryServer();
  const mongoURI = await mongo.getUri();
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

//Hook runs before each test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  collections.forEach(async (collection) => await collection.deleteMany({}));
});

//Hook that runs after all the test cases are finished
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
