const express = require('express');

const securityControllers = require('../controllers/security.js');

const router = express.Router();

router.post('/login', securityControllers.login);

router.post('/register', securityControllers.register);

router.get('/logout', securityControllers.logout);

module.exports = router;
