const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

class LogFormat {
    constructor() {
        this.message = {};
    }

    withDateTime(dateFormat = 'yyyy-MM-dd\tHH:mm:ss') {
        this.message.dateTime = `${format(new Date(), dateFormat)}`;

        return this;
    }

    withUuid() {
        this.message.uuid = uuid();
        return this;
    }

    withMethod(method) {
        this.message.method = method;
        return this;
    }

    withOrigin(origin) {
        this.message.origin = origin;
        return this;
    }

    withUrl(url) {
        this.message.url = url;

        return this;
    }

    withMessage(message) {
        this.message.message = message;
        return this;
    }

    getMessage(withNewLine = false) {
        let logMessage = '';

        for (var p in this.message) {
            logMessage += this.message[p] + '\t';
        }

        if (withNewLine) logMessage += '\n';

        return logMessage;
    }
}

module.exports.LogFormat = LogFormat;
