const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("config");
const socketIO = require("socket.io-client")(config.appUrl);
const app = express();
const sectionRoutes = require("./app/routes/section");
const boardRoutes = require("./app/routes/board");
const usersRoutes = require("./app/routes/users");
const resultRoutes = require("./app/routes/result");
const {
  DBConstants
} = require("./constants");


mongoose
  .connect(`mongodb://${config.DB.host}:${config.DB.port}/${config.DB.database}`)
  .then(() => {
    console.log(DBConstants.MESSAGES.CONNECTED_TO_DATABASE);
  })
  .catch(() => {
    console.log(DBConstants.MESSAGES.DB_CONNECTION_FAILED);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", config.appUrl);
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
