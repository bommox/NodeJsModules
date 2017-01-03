describe("Storage Spec", function() {
  var testConfig1 = require('../config')('./spec/res/config1.json');
  var storage = require('../storage')(testConfig1.toJson());
  var fs = require('fs');

  var store1 = storage.jsonStorage("test");

  it ("storage works", function() {
      
      store1.put("campo1", "valor");
      var v = store1.get("campo1", "prueba");
      expect(v).toBe("valor");
      expect(fs.existsSync(store1.filename)).toBe(true);
  });

});