const db = require("../models/index")
const Task = require("../models/task.js")(db);

// Gets a task
export const getTask = async (req, res) => {
    const id = req.params["id"];
    try {
        const task = await Task.findOne({
            where: { taskNo: id },
        });
        res.send(task.toJSON());
    } catch (err) {
        console.error(err);
    }
};

// Creates a new task
export const createTask = async (req, res) => {
    const task = req.body; // Task data as JSON/JS object in request body
    try {
        await Task.create({
            userId: task.userId,
            title: task.title,
            content: task.content,
            sheduledAt: task.sheduledAt,
            isComplered: false,
        });
    } catch (err) {
        console.error(err);
    }
};

// Updates a task
export const updateTask = async (req, res) => {
    const id = req.params["id"];
    const { title, content, sheduledAt, isComplered } = req.body;
    let updateValues = {};
    if (title) updateValues.title = title;
    if (content) updateValues.title = content;
    if (sheduledAt) updateValues.title = sheduledAt;
    if (isComplered) updateValues.title = isComplered;
    try {
        await Task.update(updateValues, {
            where: { taskNo: id },
        });
    } catch (err) {
        console.error(err);
    }
};

// Deletes a task
export const deleteTask = async (req, res) => {
    const id = req.params["id"];
    try {
        await Task.destroy({ where: { taskNo: id } });
    } catch (err) {
        console.error(err);
    }
};

// Gets a list of tasks defined by start and end date, if both are empty gets a list of all tasks
export const getTasksByDate = async (req, res) => {
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
        res.send(tasks);
    } catch (err) {
        console.error(err);
    }
};
