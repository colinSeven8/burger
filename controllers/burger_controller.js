let express = require("express");
let burger = require("../models/burger.js");

let router = express.Router();

// Routes
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    let hbsObj = {
      burgers: data,
    };
    console.log("hbsObj: " + hbsObj);
    res.render("index", hbsObj);
  });
});
router.post("/burgers/create", function (req, res) {
  burger.insertOne(req.body.burger_name, function (result) {
      console.log(result);
      res.redirect("/");
    }
  );
});
router.put("/burgers/:id", function (req, res) {
  burger.updateOne(req.params.id, function(result) {
    console.log(result);
      res.sendStatus(200);
  });
});

module.exports = router;
