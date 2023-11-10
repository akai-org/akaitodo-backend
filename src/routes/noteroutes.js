const express = require('express');

const noteControllers = require('../controllers/notes.js');

const router = express.Router();

router.delete('/:id', noteControllers.deleteNote);

router.get('/:uid/:name', noteControllers.filterNote);

module.exports = router;
