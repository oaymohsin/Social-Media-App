const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
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

router.post("/login", (req, res, next) => {
  let fetchedUser;
  const user = userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(501).json({
          message: "user doesnot exist",
        });
      } else {
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      }
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
});

module.exports = router;
