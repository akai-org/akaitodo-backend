const express = require("express");

const noteControllers = require("../controllers/notes.js");

const router = express.Router();

router.get("/:uid/all", noteControllers.getUserNotes);

router.get("/:id", noteControllers.getNote);

router.post("/", noteControllers.addNote);

router.patch("/:id", noteControllers.updateNote);

router.delete("/:id", noteControllers.deleteNote);

router.get("/:uid/:name", noteControllers.filterNote);