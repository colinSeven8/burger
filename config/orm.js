let orm = require('../config/connection');

// Helper function that adds '?' to SQL syntax
function printQuestionMarks(num) {
  // Array to hold question marks
  let arr = [];

  // Add the requested number of ? to the array
  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
  // 
  let arr = [];

  // Loop through the keys and push the key/value as a string into the array
  for (let key in obj) {
    // Get the value
    let value = obj[key];
    // Check to skip hidden properties
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

// Object for all our SQL statement functions, call backs send the data back to the front-end
let orm = {
  // Select everything from the burger table
  selectall: (tableInput, cb) => {
    let queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  // Construct the query to insert a value into the burger table
  // INSERT INTO burgers (burger_name) VALUES ('Double Bacon Jalepeno');
  insertOne: (table, cols, vals, cb) => {
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
  // UPDATE burgers SET burger_name WHERE ? Ex: {burger_name: Whopper}, {devoured: TRUE}
  updateOne: (table, objColVals, condition, cb) => {
    let queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  }
};

module.exports = orm;  