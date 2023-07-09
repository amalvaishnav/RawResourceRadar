var http = require("http"); // Import Node.js core module
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
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
  app.use(express.json()); // new

  console.log("exprress json", express.json());
  app.use("/", routes); // new
  app.listen(5001, () => {
    console.log("Express Server has started!");
  });
});
// var server = http.createServer((req, res) => {

//   if (req.url == "/") {
//     //check the URL of the current request

//     // set response header
//     res.writeHead(200, { "Content-Type": "text/html" });

//     // set response content
//     res.write("<html><body><p>adsThis is home Page.</p></body></html>");
//     res.end();
//   }
// });

// server.listen(5001); //3 - listen for any incoming requests

console.log("Node.js web server at port 5001 is running..");
