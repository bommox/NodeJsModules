describe("Config Spec", function() {
  var configModule = require('../config');
  var testConfig1 = configModule('./spec/res/config1.json', { "logger.level" : "ERROR", "new.var" : false});

  it("Values from file", function() {
    expect(testConfig1("logger.level.app.controller")).toBe("DEBUG");
  });

  it("Overrides works", function() {
    expect(testConfig1("logger.level")).toBe("ERROR");
  });

  it("New mixed values works", function() {
    expect(testConfig1("new.var")).toBe(false);
  });

  it("array values works", function() {
    expect(testConfig1("logger.appenders").length).toBe(1);
    expect(testConfig1("logger.appenders.test").length).toBe(1);
    expect(testConfig1("logger.appenders.test2").length).toBe(2);
  });

});