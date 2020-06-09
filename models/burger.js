let orm = require("../config/orm");

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
  updateOne: function (id, cb) {
    let condition = "id=" + id;
    orm.updateOne(
      "burgers",
      {
        devoured: true,
      },
      condition,
      cb
    );
  },
};

module.exports = burger;
