const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketIO = require("socket.io-client")("http://localhost:4200");
const app = express();
const sectionRoutes = require("./routes/section");
const boardRoutes = require("./routes/board");
const usersRoutes = require("./routes/users");
const resultRoutes = require("./routes/result");
mongoose
  .connect("mongodb://localhost:27017/result-square")
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});



app.use("/api", usersRoutes);

app.use("/api", sectionRoutes);

app.use("/api", boardRoutes);

app.use("/api", resultRoutes);

module.exports = app;
