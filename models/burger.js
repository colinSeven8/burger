const orm = require("../config/orm.js");

// The burger object, call back function shoots the data back to the ajax and to the FE
let burger = {
  selectAll: function (cb) {
    orm.selectAll("burgers", function (res) {
      cb(res);
    });
  },
  insertOne: function (name, cb) {
    orm.insertOne("burgers", ["burger_name", "devoured"], [name, false], cb);
  },
  updateOne: function (objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function (res) {
      cb(res);
    });
  }
};

module.exports = burger;
