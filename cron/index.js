const CronJob = require('cron').CronJob;

const Interval = milli => callback => {
    var ts = -1;
    return {
        start : () => {
            ts = setInterval(callback, milli);
        },
        stop : () => {
            clearInterval(ts);
        }
    }
}

module.exports = config => callback => {
    // If config is a cron string, then CronJob
    var cj = undefined;
    if (typeof config == 'string') {
        cj = new CronJob(config, callback);
    } else if (typeof config == 'number') {
       cj = Interval(config)(callback);
    }
    return cj;
}