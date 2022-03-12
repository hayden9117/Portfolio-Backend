var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile.js")["development"]);

router.get("/", function (req, res, next) {
  knex
    .select("*")
    .from("Amazon")

    .orderBy("id")
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(404).json(
        {
          message: "not found",
        },
        console.log(err.message)
      );
    });
});

module.exports = router;
