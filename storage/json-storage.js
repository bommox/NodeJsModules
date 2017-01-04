const fs = require('fs');

const CONFIG = {
    STORAGE_DIR : "storage.dir",
    STORAGE_JSON_FILENAME : "storage.json.filename",
    STORAGE_AUTOSAVE : "storage.json.autosave"
};

module.exports = options => tag => {

    
    const config = require('../config')(__dirname + '/config.default.json', options); 
    
    var filesufix = tag || "";

    const filename = config(CONFIG.STORAGE_DIR) + config(CONFIG.STORAGE_JSON_FILENAME) + "_"+ filesufix +".json"; 
    const autosave = config(CONFIG.STORAGE_AUTOSAVE);

    var _data = undefined;

    if (!fs.existsSync(filename)) {
        _data = {};
        fs.writeFileSync(filename, JSON.stringify(_data));
    } else {
        _data = JSON.parse(fs.readFileSync(filename));
    }

    var getJsonFile = () => {
        return _data;
    }
    var saveJsonFile = () => {
        fs.writeFileSync(filename, JSON.stringify(_data));   
    }

    return {
        put : (key, value) => {
            getJsonFile()[key] = value;
            if (autosave) {
                saveJsonFile();
            }
        },
        get : (key, defaultValue) => {
            var data = getJsonFile();
            if (Object.keys(data).indexOf(key) > -1) {
                return data[key];
            } else {
                return defaultValue;
            }
        },
        save : saveJsonFile,
        filename :  filename
    }
}