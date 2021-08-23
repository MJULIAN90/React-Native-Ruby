const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = express();
const routes = require("./routes/index");

server.use(morgan("dev"));
server.use(cors());
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use("/", routes);

module.exports = server;
