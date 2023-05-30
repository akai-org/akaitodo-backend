const db = require("../models/index")
const User = db.User;

// Get user with a given id
const getUser = async (req, res) => {
    const uid = req.params["uid"]; // User id from request parameter
    try {
        const user = await User.findOne({
            where: { id: uid },
        });
        res.send(user.toJSON());
    } catch (err) {
        console.error(err);
    }
};

// Create a new user
const createUser = async (req, res) => {
    const user = req.body; // User data as JSON/JS object in request body
    try {
        await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
        });
    } catch (err) {
        console.error(err);
    }
};

// Update user data
const updateUser = async (req, res) => {
    const uid = req.params["uid"]; // As in getUser
    const { name, email, password } = req.body; // Need to specify which user data can be updated
    let updateValues = {};
    if (name) updateValues.name = name;
    if (email) updateValues.email = email;
    if (password) updateValues.password = password;
    try {
        await User.update(updateValues, {
            where: { id: uid },
        });
    } catch (err) {
        console.error(err);
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const uid = req.params["uid"];
    try {
        User.destroy({ where: { id: uid } });
    } catch (err) {
        console.error(err);
    }
};

// Update password
const updateUserPassword = async (req, res) => {
    const uid = req.params["uid"];
    const password = req.body;
    try {
        await User.update({ password: password }, { where: { id: uid } });
    } catch (err) {
        console.error(err);
    }
};

// Reset password
const resetUserPassword = async (req, res) => {
    const uid = req.params["uid"];
};

// Account verification
const verifyEmailToken = async (req, res) => {
    const token = req.params["token"];
};

module.exports = { getUser, createUser, updateUser, deleteUser, updateUserPassword, resetUserPassword, verifyEmailToken }