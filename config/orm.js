let orm = require('../config/connection');

// Helper function that adds '?' to SQL syntax
function printQuestionMarks(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
    let arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (let key in obj) {
        let value = obj[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(obj, key)) {
            // Put quotations around strings with spaces
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // Change syntax format
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

// Object for all our SQL statement functions.
let orm = {
    all: (tableInput, cb) => {
      let queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, (err, result) => {
        if (err) throw err;
        cb(result);
      });
    },
    create: (table, cols, vals, cb) => {
      let queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
  
      connection.query(queryString, vals, (err, result) => {
        if (err) throw err;
        cb(result);
      });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    update: (table, objColVals, condition, cb) => {
      let queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, (err, result) => {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    delete: (table, objColVals, condition, cb) => {
      let queryString = "DELETE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, (err, result) => {
        if (err) { throw err; }
        cb(result);
      });
    }
  };
  
  module.exports = orm;  