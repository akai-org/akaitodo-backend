const jwt = require('jsonwebtoken');
const secret = require('./secret.js');

const tokenCheck = (req, res, next) => {
    // Guard
    const ignoreUrls = ['/', '/api/login', '/api/register'];
    if (ignoreUrls.includes(req.path)) return next();

    const token = req.get('dodo-token');
    if (!token) return res.status(401).send([{ error: 'No token' }]); // TODO better error handler
    let err, decoded;
    try {
        jwt.verify(token, secret.getSecretKeyNow(), function (err1, decoded1) {
            decoded = decoded1;
            err = err1;
        });
        if (
            err &&
            err.name == 'JsonWebTokenError' &&
            secret.getSecretKeyPrevious()
        ) {
            jwt.verify(
                token,
                secret.getSecretKeyPrevious(),
                function (err2, decoded2) {
                    if (!err2) {
                        res.setHeader('dodo-token', getToken(decoded2.id));
                    }
                    decoded = decoded2;
                    err = err2;
                },
            );
        }

        if (err) {
            switch (err.name) {
                case 'TokenExpiredError':
                    res.status(401).send([{ error: 'Expired token' }]);
                default:
                    res.status(401).send([{ error: err.name }]);
            }
            return;
        }

        if (
            decoded.iat + (process.env.TOKEN_REFERESH_TIME | 0) <
            new Date().getTime() / 1000
        ) {
            res.setHeader('dodo-token', getToken(decoded.id));
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

function getToken(tid) {
    return jwt.sign(
        {
            id: tid,
        },
        secret.getSecretKeyNow(),
        { expiresIn: process.env.TOKEN_EXPIRATION_TIME | 0 },
    );
}

module.exports = { tokenCheck, getToken };
