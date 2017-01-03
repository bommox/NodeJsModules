# NodeJsModules

## Config Reader

`const config = require('node-js-modules/config')`

Usage:

```
var appConfig = config.open('./config/app-config.json', /*optional*/ {}); // Second arguments mixes the json file
appConfig.get('logger.doDebug', false); // Second argument is default
appConfig.get('logger.level', 'WARN');
appConfig.toString(); // Prints JSON
```


## Logger

`const logger = require('node-js-modules/logger')(/*optional json config*/)`

Usage:

```
logger.trace('Hi all!');
logger.info('Hi all!');
logger.warn('Hi all!');
logger.error('Hi all!');

logger.registerAppender('simple-appender', (level, message) => {
  console.log(`[${level.toUpperCase()}] -> ${message}`);
});

```

Config File: 

```application/json
{
  "logger.level" : "INFO",
  "logger.level.app.controller" : "DEBUG",
  "logger.appenders" : ["console", "simple-appender", "file"],
  "logger.appender.file.path = "./logs/"
}
```
