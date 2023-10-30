const crypto = require("crypto")
const argon2 = require("argon2")
const db = require("../models/index")

const User = db.models.User;

const { getToken } = require("../middlewares/tokenCheck");

// Get user with a given id
const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        // check if there is user with login and pass in DB
        const loggedUser = await User.findOne({ where: {email}});

        if(!loggedUser) {
            res.status(400).send({error: `Login for username not found in user database`})
            return;
        }
        
        argon2.verify(loggedUser.password, password).then((success) => {
            /* clear user password */
            const validUser = {...loggedUser.dataValues, password: ""};

            if(success){
                res.setHeader('dodo-token', getToken(validUser.id));
                res.status(200).send(validUser);
            }else
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
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
	
        if(!username || !email || !password) {
            res.status(400).send({error: `Incomplete data!!!`});
            return;
        }
        if(await User.findOne({ where: {email}})){
            res.status(400).send({error: `Account with this email alredy exists!!!`});
            return;
        }
        crypto.randomBytes(32, async function(err, salt) {
            const passwordHash = await argon2
                .hash(password, salt)
                .then(hash => {
                    return hash;
                });

            const newUser = await User.create({ username: username, password: passwordHash, email: email, createdAt: new Date(), updatedAt: new Date() });
                // .catch(error => {
                //     res.status(500).send({error: `Unexpected error: ${error}`});
                //     return;
                // });

            const validUser = {...newUser.dataValues, password: ""};

            return res.status(200).send(validUser);
		});
    }catch(error) {
        if(error.name === 'SequelizeUniqueConstraintError') {
            req.status(400).send({error: `Query error: $error.message}`});
        }else {
            res.status(500).send({error: `Unexpected error: ${error}`});
        }
    }
    
};

const logout = async (req, res) => {
    // 1. Mark token as expired
    // 2. Logout user
    // 3. Return ok
};

module.exports = { login, register, logout }
