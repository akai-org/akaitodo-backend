const db = require("../models/index")

const User = db.User;

// Get user with a given id
const login = async (req, res) => {
    const login = req.params["login"];
    const password = req.params["password"]

    try {
        // check if there is user with login and pass in DB
    } catch (err) {
        console.error(err);
    }
};

const register = async (req, res) => {
    // 1. Get data from form POST request
    // 2. Save in db User sequelize model
    // 3. Return success response or go to jwt auth logic and return authorized login
    // 4. Or send email with auth link which redirect to jwt auth logic and return key
};

const logout = async (req, res) => {
    // 1. Mark token as expired
    // 2. Logout user
    // 3. Return ok
};

module.exports = { login, register, logout }
