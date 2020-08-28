let connection = require("../connection.js");

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
    // Change syntax format
    arr.push(key + "=" + obj[key]);
  }
  return arr.toString();
}

// Object for all our SQL statement functions, call backs send the data back to the front-end
let orm = {
  // Select everything from the burger table
  selectAll: function (tableInput, cb) {
    let queryString = `SELECT * FROM ${tableInput}`;
    console.log(`selectAll queryString: ${queryString}`);
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // Construct the query to insert a value into the burger table
  // INSERT INTO burgers (burger_name) VALUES ('Double Bacon Jalepeno');
  insertOne: function (table, cols, vals, cb) {
    let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)}) `;

    console.log(`insertOne queryString: ${queryString}`);

    connection.query(queryString, vals, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // UPDATE burgers SET burger_name WHERE ? Ex: {burger_name: Whopper}, {devoured: TRUE}
  updateOne: function (table, objColVals, condition, cb) {
    let queryString = `UPDATE ${table} SET ${objToSql(
      objColVals
    )} WHERE ${condition}`;
    console.log(`updateOne queryString: ${queryString}`);

    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    let queryString = `DELETE FROM ${table} WHERE ${condition}`;

    connection.query(queryString, function(err, result) {
      if (err) { throw err; }
      cb(result);
    });
  }
};

module.exports = orm;
