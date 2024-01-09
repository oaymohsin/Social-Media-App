const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");
const router = express.Router();
const app = express();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "user created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        });
      });
  });
});

module.exports = router;
