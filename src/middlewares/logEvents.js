const { Logger }    = require('./Logger/Logger');
const { LogFormat } = require('./Logger/LogFormat');

const logger = (req, res, next) => {
    // `${req.method}\t${req.headers.origin}\t${req.url}`
    const logMessage = new LogFormat()
        .withMethod(req.method)
        .withOrigin(req.headers.origin)
        .withUrl(req.url)
        .getMessage()
    ;

    new Logger().logRequest(logMessage);

    next();
}

const errorLogger = (err, req, res) => {
    const logMessage = new LogFormat()
        .withMessage(`${err.name}: ${err.message}`)
        .getMessage()
    ;

    new Logger().logError(logMessage);
}

module.exports = { logger, errorLogger };
