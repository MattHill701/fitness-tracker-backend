const { client } = require('./db')
require("dotenv").config();
const { PORT = 3000} = process.env
const express = require("express");
const server = express();
server.use(express.json());
const morgan = require("morgan");
server.use(morgan("dev"));
const cors = require("cors")
server.use(cors());
server.use(express())
const apiRouter = require("./api");
server.use("/api", apiRouter);




client.connect()
server.listen(PORT, () => {
    console.log("The server is up on port", PORT);
  });
 
