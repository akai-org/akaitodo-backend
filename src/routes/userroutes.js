const express = require('express');

const userControllers = require('../controllers/users.js');

const router = express.Router();

router.get('/:uid', userControllers.getUser);

router.post('/', userControllers.createUser);

router.patch('/:uid', userControllers.updateUser);

router.delete('/:uid', userControllers.deleteUser);

router.patch('/:uid/passchange', userControllers.updateUserPassword);

router.patch('/:uid/passreset', userControllers.resetUserPassword);

module.exports = router;
