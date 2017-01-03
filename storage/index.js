const jsonStorage = require('./json-storage');

module.exports = options => {
    const config = require('../config')(__dirname + '/config.default.json', options); 
    return {
        jsonStorage : jsonStorage(config.toJson())
    }
}