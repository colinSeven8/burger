let express = require("express");
let burger = require("../models/burger.js");

let router = express.Router();

router.get("/", (req, res) => {
    burger.selectAll((data) => {
        let hbsObj = {
            burgers: data
        };
        console.log(hbsObj);
        res.render("index", hbsObj);
    });
});
router.post("api/burgers", (req, res) => {
    burger.insertOne([
        'burger_name', 'devoured'
    ], [
        req.body.burger_name, req.destroy.devoured
    ], (result) => {
        res.json({ id: result.insertId });
    });
});
router.put("api/burgers/:id", (req, res) => {
    let condition = "id = " + req.params.id;

    // Update the devoured status of the id requested, if no rows changed, it's not there
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, (result) => {
        if (result.changeRows === 0) return res.status(404).end();
        else res.status(200).end();
    });
});

module.exports = router;