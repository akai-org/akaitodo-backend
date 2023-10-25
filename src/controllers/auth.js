const db = require("../models/index")
const User = db.models.User;
const { tokenCheck ,getToken} = require("../middlewares/tokenCheck");



const login = async (req, res) => {
    try {
        const us = await User.findOne({
            where: { username: req.body.username, password: req.body.password },
        });
        if (us!=null){
            //let us = us.toJSON();
            //res.send([{token: getToken(us.id)}]);
            //let t = getToken();
            //console.log(us);
            res.setHeader('TOKEN', getToken(us.toJSON().id));
            res.send({ message: "logged in" });
        }else{
            //console.error("User not exists");
            res.send({ message: "Incorrect usrename or password" });
            //res.status(404).send({ status: "User not exists" });
        }
    } catch (err) {
        console.error(err);
    }
};


const register = async (req, res) => {
    //console.log(req.body);
    try {
        await User.create({
            id: req.body.id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        res.send([{status: "added"}]);
    } catch (err) {
        console.error(err);
    }
};


module.exports = { login,register }