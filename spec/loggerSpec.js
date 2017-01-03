describe("Logger Spec", function() {
  var configModule = require('../config');
  var testConfig1 = configModule('./spec/res/config1.json');
  console.log("Logger config -> " + JSON.stringify(testConfig1));
  var Logger = require('../logger')(testConfig1.toJson());

  var logs = { DEBUG : [], INFO :[], WARN: [], ERROR: [] };
    Logger.registerAppeneder("test", (tag, level, msg) => {
      logs[level].push(msg);
    });

  beforeEach(function() {
    logs = { DEBUG : [], INFO :[], WARN: [], ERROR: [] };
  });

  it("createLogger no errors", function() {
    var log = Logger.getLog("app");

    log.debug("Probando");
    log.info("Probando info");
    log.warn("Probando warn"); //Should appear
    log.error("Probando error"); //Should appear
    expect(true).toBe(true);
  });

  it("test appender", function() {    

    var log = Logger.getLog("test");    

    log.debug("Probando");
    log.info("Probando info");
    log.warn("Probando warn"); //Should appear
    log.warn("Probando warn2"); //Should appear
    log.error("Probando error"); //Should appear
    expect(logs.DEBUG.length).toBe(0);
    expect(logs.INFO.length).toBe(0);
    expect(logs.WARN.length).toBe(2);
    expect(logs.ERROR.length).toBe(1);
  });

  it("test appender 2", function(done) {


    var log = Logger.getLog("test2"); 

    log.debug("Probando");
    log.info("Probando info");
    log.warn("Probando warn"); //Should appear
    log.warn("Probando warn2"); //Should appear
    log.error("Probando error"); //Should appear
    expect(logs.DEBUG.length).toBe(1);
    expect(logs.INFO.length).toBe(1);
    expect(logs.WARN.length).toBe(2);
    expect(logs.ERROR.length).toBe(1);    
    expect(logs.ERROR[0]).toBe("Probando error");
    setTimeout(function() {
        done();
      }, 1000);
  });



});