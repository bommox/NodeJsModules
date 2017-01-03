var config = require('./config');

var testConfig1 = config('./test/config1.json', { "logger.level" : "ERROR"});

console.log(testConfig1("logger.level"));
console.log(testConfig1("logger.level","PRUEBA"));
console.log(testConfig1("logger.level11","PRUEBA"));
console.log(testConfig1("logger.level.app.controller"));
console.log(testConfig1("logger.appenders"));

