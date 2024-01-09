const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const postModel = require("./Models/postModel");
const mongoose = require("mongoose");
const appRoutes = require("./routes/posts");
const userRoutes=require('./routes/users')
const app = express();

// MONGO_URI="mongodb+srv://mohsinmaken3:76510063Msn@cluster0.epwsfar.mongodb.net/"
const MONGO_URI =
  "mongodb+srv://mohsinmaken3:76510063Msn@cluster0.epwsfar.mongodb.net/SocialMediaApp";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("conncected successfully");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/images", express.static("/images"));
app.use("/images", express.static(path.join(__dirname, 'images')));
// express.static('/images')
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});

app.use("/api/posts", appRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
