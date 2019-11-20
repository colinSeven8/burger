let express = require("express");
let burger = require("../models/burger");

let router = express.Router();

router.get("/", (req, res) => {
    burger.selectAll((data) => {
        let obj = {
            burgers: data
        };
        res.render("index", obj);
    });
});
router.post("api/burgers", (req, res) => {
    let userData = req.body;
    burgers.create([
        'burger_name', 'devoured'
    ], [
        userData.burger_name, userData.devoured
    ], (result) => {
        res.json({ id: result.insertId });
    });
});
router.put("api/burgers/:id", (req, res) => {
    let condition = "id = " + req.params.id;
    let userData = req.body;

    // Update the devoured status of the id requested, if no rows changed, it's not there
    burgers.update({
        devoured: userData.devoured
    }, condition, (result) => {
        if (result.changeRows === 0) return res.status(404).end();
        else res.status(200).end();
    });
});

module.exports = router;