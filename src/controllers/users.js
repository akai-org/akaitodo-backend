const db = require("../models/index");
const User = db.models.User;

// Get user with a given id
const getUser = async (req, res) => {
    const uid = req.params["uid"];
    try {
        const user = await User.findOne({
            where: { id: uid },
        });
        if (!user) {
            return res.status(404).send({ message: `No user with id: ${uid}` });
        }
        res.status(200).send(user.toJSON());
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

// Create a new user
const createUser = async (req, res) => {
    const userData = req.body;
    try {
        const user = await User.create({
            username: userData.username,
            email: userData.email,
            password: userData.password,
        });
        user.save();
        res.status(200).send({ message: "User created" });
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

// Update user data
const updateUser = async (req, res) => {
    const uid = req.params["uid"];
    const { username, email, password } = req.body;
    let updateValues = {};
    if (username) updateValues.username = username;
    if (email) updateValues.email = email;
    if (password) updateValues.password = password;
    try {
        const user = await User.update(updateValues, {
            where: { id: uid },
        });
        if (!user) {
            return res.status(404).send({ message: `No user with id: ${uid}` });
        }
        res.status(200).send({ message: "User data updated" });
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const uid = req.params["uid"];
    try {
        User.destroy({ where: { id: uid } });
        res.status(200).send({ message: "User deleted or doesn't exist" });
    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

// Update password
const updateUserPassword = async (req, res) => {
    const uid = req.params["uid"];
    const password = req.body;
    try {
        const user = await User.update(
            { password: password },
            { where: { id: uid } }
        );
        if (!user) {
            return res.status(404).send({ message: `No user with id: ${uid}` });
        }
        res.status(200).send({ message: "User password updated" });
    } catch (err) {
        console.error(err);
        res.status(500);
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

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateUserPassword,
    resetUserPassword,
    verifyEmailToken,
};
