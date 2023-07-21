var http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

//Here we are using Mongoose in-memory database(MongoMemoryServer)
// so that we don't need mongoDB separately installed
const { MongoMemoryServer } = require("mongodb-memory-server");
const cors = require("cors");

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = async () => {
  // NOTE: before establishing a new connection close previous
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();
  console.log("mongo server created");
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts);
};

connect().then(() => {
  console.log("mongoose requested");
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/", routes);
  app.listen(5001, () => {
    console.log("Express Server has started!");
  });
});

console.log("Node.js web server at port 5001 is running..");
