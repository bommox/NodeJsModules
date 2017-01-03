
const moment = require('moment');
module.exports = (options) => (tag, level, msg) => { console.log(`${moment().format()} [${tag}][${level}] :: ${msg}`); };