const crypto = require("crypto")
const argon2 = require("argon2")
const db = require("../models/index")

const User = db.models.User;

// Get user with a given id
const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        // check if there is user with login and pass in DB
        const loggedUser = await User.findOne({ where: {email}});

        if(loggedUser === undefined || loggedUser === null) {
            res.status(400).send({error: `Login for username not found in user database`})
            return;
        }
        
        argon2.verify(loggedUser.password, password).then((success) => {
            /* clear user password */
            const validUser = {...loggedUser.dataValues, password: ""};

            if(success == true)
                res.status(200).send(validUser);
            else
                res.status(500).send({error: `Wrong password for user: ${email}!!!`});
        }).catch((error) => {
            res.status(500).send({error: `Unexpected error validating hash: ${error}`});
        });
        
    } catch (error) {
        res.status(500).send({error: `Unexpected error: ${error}`});
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
