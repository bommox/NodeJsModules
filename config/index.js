const fs = require('fs');
const readline = require('readline');

const objectHasKey = obj => key => Object.keys(obj).indexOf(key) > -1;

const doDebug = true;

const Config = function(filePath, mixinOptions) {
    mixinOptions = mixinOptions || {};
    var configMap = {};
    var fileRaw = fs.readFileSync(filePath);
    if (fileRaw !== undefined) {
        configMap = Object.assign({}, JSON.parse(fileRaw), mixinOptions);
    } else {
        configMap = mixinOptions;
    }
    var hasKey = objectHasKey(configMap);
    
    var get = (optionPath, defaultValue) => (hasKey(optionPath)) ? configMap[optionPath] : defaultValue;
    get.toJson = () => Object.assign({}, configMap);
    get.toString = () => JSON.stringify(configMap);
    get.dump = () => {
        console.log("fileRaw -> " + JSON.stringify(JSON.parse(fileRaw)));
        console.log("mixin -> " + JSON.stringify(mixinOptions));
        console.log("configMap -> " + JSON.stringify(configMap));
    };

    return get;
}

module.exports = Config;