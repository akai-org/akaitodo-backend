const express = require("express");

const authController = require("../controllers/auth.js");

const router = express.Router();

router.getToken('/generate', authController.generate);

router.isTokenExpired('/check', authController.isExpired);

router.refreshToken('/refresh', authController.refresh);

router.refreshToken('/remove', authController.remove);

module.exports = router;