const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');


const CONFIG = {
    FILE_APPENDER__PATH : "logger.appender.file.path",
    FILE_APPENDER__PREFIX : "logger.appender.file.prefix",
    FILE_APPENDER__EXTENSION : "logger.appender.file.extension"
}


module.exports = (options) => {
    const config = require('../config')(__dirname + '/config.default.json', options);

    const writeToFile = _.throttle((file, text) => {
        fs.appendFile(file, text);
    }, 100);

    const filename = config(CONFIG.FILE_APPENDER__PATH) + config(CONFIG.FILE_APPENDER__PREFIX) + "_" + moment().format("YYYYMMDD-HHmm") + config(CONFIG.FILE_APPENDER__EXTENSION);

    return (tag, level, msg) => { 
        writeToFile(filename, `\n${moment().format()} [${tag}][${level}] :: ${msg}`); 
    }
}