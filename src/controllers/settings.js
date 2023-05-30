const Sequelize = require("sequelize");

// Gets user's settings
const getSettings = (req, res) => {
    const uid = req.params["uid"];
};

// Update user's settings
const updateSettings = (req, res) => {
    const uid = req.params["uid"];
};

// Reset user's settings
const resetSettings = (req, res) => {
    const uid = req.params["uid"];
};

module.exports = { getSettings, updateSettings, resetSettings }
