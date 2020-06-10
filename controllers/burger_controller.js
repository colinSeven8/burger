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
  });
});

router.put("/api/burgers/:id", function (req, res) {
  const condition = `id = ${req.params.id}`;
  burger.updateOne(
    {
      devoured: req.body.devoured,
    },
    condition,
    function (result) {
      if (result.changedRows === 0) return res.status(404).end();
      res.sendStatus(200).end();
    }
  );
});

module.exports = router;
