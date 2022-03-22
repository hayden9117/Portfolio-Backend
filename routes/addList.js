require("dotenv").config();
var express = require("express");
var router = express.Router();

const knex = require("knex")(require("../knexfile.js")["production"]);

/* GET users listing. */
router.post("/", function (req, res, next) {
  knex
    .select("*")
    .from("favoriteslist")
    .where({ listname: `${req.body.listname}` })
    .then((result) => {
      if (result.length === 0) {
        // create the new user
        knex
          .insert({
            listname: req.body.listname,
          })
          .into("favoriteslist")
          .then(
            res.send({ message: "successfully added new entry to database" })
          );
      } else {
        res.send({ message: "list Already Exists" });
      }
    })
    .catch((err) => res.send({ message: "error when trying to add list" }));
});

module.exports = router;
