const express = require("express");
const path = require("path");
const userController= require("../controllers/userController")

const router = express.Router();
const app = express();

router.post("/signup",userController.createUser );

router.post("/login",userController.loginUser );


module.exports = router;
