const morgan = require("morgan");
const express = require("express");
const server = express();
const routes = require("./routes/index");

server.use(morgan("dev"));

server.use("/", routes);

module.exports = server;
