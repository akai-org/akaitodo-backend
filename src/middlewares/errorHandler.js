const { errorLogger } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    errorLogger(err, req, res);

    res.status(500).send(JSON.stringify(err.lineNumber));

    next();
};

module.exports = { errorHandler };
