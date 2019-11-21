let orm = require("../config/orm");

// The burger object, call back function shoots the data back to the front-end
let burger = {
    selectAll: (cb) => {
        orm.selectAll("burgers", (res) => {
            cb(res);
        });
    },
    insertOne: (cols, vals, cb) => {
        orm.insertOne("burgers", cols, vals, (res) => {
            cb(res);
        });
    },
    updateOne: (objColVals, condition, cb) => {
        orm.updateOne("burgers", objColVals, condition, (res) => {
            cb(res);
        });
    }
};

module.exports = burger;