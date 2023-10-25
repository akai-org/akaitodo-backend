const express = require("express");

const authControllers = require("../controllers/auth.js");

const router = express.Router();

router.post("/login", authControllers.login);

router.post("/register", authControllers.register);

module.exports = router;