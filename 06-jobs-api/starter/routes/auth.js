const express = require("express");
const router = express.Router();

// import controllers
const { register, login } = require("../controllers/auth");

// define routes
router.post("/register", register); // user registration
router.post("/login", login); // user login

module.exports = router;
