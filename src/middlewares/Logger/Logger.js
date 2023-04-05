const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const { LogFormat } = require('./LogFormat');

class Logger {
    constructor() {
        this.filename = {
            log: `log-${process.env.NODE_ENV}.txt`,
            error: `log-error-${process.env.NODE_ENV}.txt`
        };
    }

    /* Generic method for logging message */
    async logEvent(message, logFileLocation, filename) {

        try {
            if(!fs.existsSync(logFileLocation)) {
                await fsPromises.mkdir(logFileLocation);
            }

            await fsPromises.appendFile(path.join(logFileLocation, filename), message);
        } catch(err) {
            console.log(err);
        }
    }

    /* Method with normalied format & filename */
    async logRequest(message) {
        const logItem = new LogFormat()
            .withDateTime()
            .withUuid()
            .withMessage(message)
            .getMessage(true)
        ;

        const logFilePath = path.join(__dirname, '../../..', 'logs');

        await this.logEvent(logItem, logFilePath, this.filename.log);
    }

    async logError(message) {
        const logItem = new LogFormat()
            .withDateTime()
            .withUuid()
            .withMessage(message)
            .getMessage(true)
        ;

        const logFilePath = path.join(__dirname, '../../..', 'logs');

        await this.logEvent(logItem, logFilePath, this.filename.error);
    }
}

module.exports.Logger = Logger;