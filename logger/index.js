const CONFIG = {
    LOGGER_LEVEL : "logger.level",
    LOGGER_LEVEL__DEBUG : "DEBUG",
    LOGGER_LEVEL__INFO: "INFO",
    LOGGER_LEVEL__WARN: "WARN",
    LOGGER_LEVEL__ERROR: "ERROR",
    LOGGER_APPENDERS : "logger.appenders",
    LOGGER_APPENDERS__console : "console",
    LOGGER_APPENDERS__file : "file"
}

const LEVELS = {
    DEBUG : 10,
    INFO : 20,
    WARN : 30,
    ERROR : 40
}

const DEFAULT_LEVEL = "WARN";

const doDebug = false;


const Module = function(options) {

    const config = require('../config')(__dirname + '/config.default.json', options);   

    const appenderMap = { };

    const defaultLevel = config('logger.level',  DEFAULT_LEVEL);

    const levelForTag = tag => config('logger.level.' + tag, defaultLevel);
    
    const levelForAppender = appenderId => config('logger.level.appenders.' + appenderId, defaultLevel);

    const levelValue = level => LEVELS[level] || LEVELS[DEFAULT_LEVEL];

    const getConfigLevelValue = (tag, appender) => Math.max(levelValue(levelForTag(tag), levelValue(levelForAppender(appender))));

    const doLog  = msgLevelValue => (tag, appender)  => msgLevelValue >= getConfigLevelValue(tag, appender);

    const appendersForTag = tag => config('logger.appenders.' + tag, config('logger.appenders'));


    appenderMap[CONFIG.LOGGER_APPENDERS__console]   = require('./console-appender')(config.toJson());
    appenderMap[CONFIG.LOGGER_APPENDERS__file]      = require('./file-appender')(config.toJson());

    const Log = function(tag) {
        var tag = tag;
        var appenders = appendersForTag(tag);
        var applyToAppenders = level => msg => {
            appenders.forEach(apId => {
                var dol = doLog(levelValue(level))(tag, apId);
                if (doDebug) {
                    console.log(`>>Log[${tag}][${level}][${apId}]-> doLog:${dol}`);
                }
                if (dol) {
                    appenderMap[apId].apply(null, [tag, level, msg])
                }
            });
        }
        return {
            debug : applyToAppenders(CONFIG.LOGGER_LEVEL__DEBUG),
            info : applyToAppenders(CONFIG.LOGGER_LEVEL__INFO),
            warn : applyToAppenders(CONFIG.LOGGER_LEVEL__WARN),
            error : applyToAppenders(CONFIG.LOGGER_LEVEL__ERROR)
        }
    }

    return {
        registerAppeneder : (id, fn) => {appenderMap[id] = fn},
        getLog : tag => new Log(tag)
    }
}

module.exports = Module;