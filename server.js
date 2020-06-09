var express = require("express");
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Sets up the Express app to parse app body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burger_controller.js");

// Routes
app.use(routes);

// Syncing our sequelize models and then starting our Express app
  app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
  });