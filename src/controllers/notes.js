const db = require('../models/index');
const Note = db.models.Note;

// Gets all notes from a user with a given id
const getUserNotes = async (req, res) => {
    const uid = req.params['uid'];
    try {
        const notes = await Note.findAll({
            where: { userId: uid },
        });
        res.status(200).send(notes.toJSON());
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

// Gets a note with a given id
const getNote = async (req, res) => {
    const id = req.params['id'];
    try {
        const note = await Note.findOne({
            where: { noteNo: id },
        });
        if (!note) {
            return res.status(404).send({ message: `No note with id: ${id}` });
        }
        res.status(200).send(note.toJSON());
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

// Adds a note
const addNote = async (req, res) => {
    const noteData = req.body;
    try {
        const note = await Note.create({
            userId: noteData.userId,
            title: noteData.title,
            content: noteData.content,
            iconCode: noteData.iconCode,
        });
        note.save();
        res.status(200).send({ message: 'Note added' });
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

// Update a note
const updateNote = async (req, res) => {
    const id = req.params['id'];
    const { title, content, iconCode } = req.body;
    let updateValues = {};
    if (title) updateValues.title = title;
    if (content) updateValues.content = content;
    if (iconCode) updateValues.iconCode = iconCode;
    try {
        const note = await Note.update(updateValues, {
            where: { noteNo: id },
        });
        if (!note) {
            return res.status(404).send({ message: `No note with id: ${id}` });
        }
        res.status(200).send({ message: 'Note updated' });
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    const id = req.params['id'];
    try {
        await Note.destroy({ where: { noteNo: id } });
        res.status(200).send({ message: "Note deleted or doesn't exist" });
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

// Filters notes by user and name - TODO
const filterNote = async (req, res) => {
    const uid = req.params['uid'];
    const name = req.params['name'];
    try {
        const notes = await Note.findAll({
            where: {
                userId: uid,
                [title.regexp]: `/${name}/gi`,
            },
        });
        res.status(200).send(notes.toJSON());
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

module.exports = {
    getUserNotes,
    getNote,
    addNote,
    updateNote,
    deleteNote,
    filterNote,
};
