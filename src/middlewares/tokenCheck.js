const jwt = require('jsonwebtoken');
const secret = require("./secret.js");

const tokenCheck = (req, res, next) => { // Guard
    const ignoreUrls = ['/api/auth/login','/login','/api/auth/register','/register'];
    // console.log(req.path);
    // console.log(ignoreUrls.includes(req.path));
    if(ignoreUrls.includes(req.path))return next();

    // console.log("-----NOT WORKING--------");
    // console.log(req.path);
    // console.log(ignoreUrls.includes(req.path));
    const token=req.get('TOKEN');
    if(token==null)return res.status(401).send([{message: "No token"}]); // TODO better error handler
    try{
        jwt.verify(token, secret.getSecretKeyNow(), function(err, decoded) {
            if(err){
                try {
                    decoded = jwt.verify(token, secret.getSecretKeyPrevious());
                    //console.log("Previous secret key");
                } catch(err) {
                    return res.status(401).send([{message: err.name}]); // TODO better error handler
                }
            }

            // console.log(decoded.refreshTime);
            // console.log(new Date().getTime());
            if(decoded.refreshTime < new Date().getTime()){
            res.setHeader('TOKEN', getToken(decoded.id));
            }
            next();
            
            // switch(err.name){
            //     case 'TokenExpiredError':
            //         return res.status(401).send("Error: Expired token");
            //     default:
            //         return res.status(401).send(err.name);
            // };
        });
    } catch (err) {
        return res.status(500).send(err);
    }

}


module.exports = { tokenCheck,getToken };

function getToken(tid){
    console.log("Get token");
    console.log(tid);
    return jwt.sign({
        id: tid,
        refreshTime: new Date().getTime() + 600_000 // 1_000 = 1s
      }, secret.getSecretKeyNow(),{ expiresIn: '30m' });
}