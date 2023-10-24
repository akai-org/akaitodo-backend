const db = require("../models/index");
const Task = db.models.Task;

// Gets a task
const getTask = async (req, res) => {
    const id = req.params["id"];
    try {
        const task = await Task.findOne({
            where: { taskNo: id },
        });
        if (!task) {
            return res.status(404).send({ message: `No task with id: ${id}` });
        }
        res.status(200).send(task.toJSON());
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

// Creates a new task
const createTask = async (req, res) => {
    const taskData = req.body;
    try {
        const task = await Task.create({
            userId: taskData.userId,
            title: taskData.title,
            content: taskData.content,
            sheduledAt: taskData.sheduledAt,
            isComplered: false,
        });
        task.save();
        res.status(200).send({ message: "Task added" });
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

// Updates a task
const updateTask = async (req, res) => {
    const id = req.params["id"];
    const { title, content, sheduledAt, isComplered } = req.body;
    let updateValues = {};
    if (title) updateValues.title = title;
    if (content) updateValues.title = content;
    if (sheduledAt) updateValues.title = sheduledAt;
    if (isComplered) updateValues.title = isComplered;
    try {
        const task = await Task.update(updateValues, {
            where: { taskNo: id },
        });
        if (!task) {
            return res.status(404).send({ message: `No task with id: ${id}` });
        }
        res.status(200).send({ message: "Task updated" });
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

// Deletes a task
const deleteTask = async (req, res) => {
    const id = req.params["id"];
    try {
        await Task.destroy({ where: { taskNo: id } });
        res.status(200).send({ message: "Task deleted or doesn't exist" });
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

// Gets a list of tasks defined by start and end date, if both are empty gets a list of all tasks
const getTasksByDate = async (req, res) => {
    const uid = req.params["uid"];
    const startDate = req.params["start_date"];
    const endDate = req.params["end_date"];
    let filter = {};
    filter.uid = uid;
    if (startDate != null) filter.startDate = startDate;
    if (endDate != null) filter.endDate = endDate;
    try {
        const tasks = await Task.findAll({
            where: filter,
        });
        res.status(200).send(tasks.toJSON());
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getTasksByDate,
};
