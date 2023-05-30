const express = require("express");

const taskControllers = require("../controllers/tasks.js");

const router = express.Router();

router.get("/:id", taskControllers.getTask);

router.get("/:uid/:start_date/:end_date", taskControllers.getTasksByDate);

router.post("/", taskControllers.createTask);

router.patch("/:id", taskControllers.updateTask);

router.delete("/:id", taskControllers.deleteTask);

module.exports = router;