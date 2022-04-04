require("dotenv").config();
var express = require("express");
var router = express.Router();
const dbEngine = process.env.DB_ENVIRONMENT || "development";
const config = require("../knexfile")[dbEngine];
const knex = require("knex")(require("../knexfile.js")[dbEngine]);

router.get("/", function (req, res, next) {
  console.log("request records");
  knex
    .select("*")
    .from("product_week")
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
