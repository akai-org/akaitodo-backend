const db = require("../models/index")
const Note = require("../models/note.js")(db);

// Gets all notes from a user with a given id
export const getUserNotes = async (req, res) => {
    const uid = req.params["uid"]; // User id
    try {
        const notes = await Note.findAll({
            where: { userId: uid },
        });
        res.send(notes.toJSON());
    } catch (err) {
        console.error(err);
    }
};

// Gets a note with a given number
export const getNote = async (req, res) => {
    const id = req.params["id"]; // Note number
    try {
        const note = await Note.findOne({
            where: { noteNo: id },
        });
        res.send(note.toJSON());
    } catch (err) {
        console.log(err);
    }
};

// Adds a note
export const addNote = async (req, res) => {
    const note = req.body; // Note data as JSON object
    try {
        await Note.create({
            userId: note.userId,
            title: note.title,
            content: note.content,
            iconCode: note.iconCode,
        });
    } catch (err) {
        console.error(err);
    }
};

// Update a note
export const updateNote = async (req, res) => {
    const id = req.params["id"]; // Note number
    const { title, content, iconCode } = req.body;
    let updateValues = {};
    if (title) updateValues.title = title;
    if (content) updateValues.content = content;
    if (iconCode) updateValues.iconCode = iconCode;
    try {
        await Note.update(updateValues, {
            where: { noteNo: id },
        });
    } catch (err) {
        console.error(err);
    }
};

// Delete a note
export const deleteNote = async (req, res) => {
    const id = req.params["id"];
    try {
        await Note.destroy({ where: { noteNo: id } });
    } catch (err) {
        console.error(err);
    }
};

// Filters notes by user and name - TODO
export const filterNote = async (req, res) => {
    const uid = req.params["uid"];
    const name = req.params["name"];
    try {
        const notes = await Note.findAll({
            where: {
                userId: uid,
                [title.regexp]: `/${name}/gi`,
            },
        });
        res.send(notes.toJSON());
    } catch (err) {
        console.error(err);
    }
};
