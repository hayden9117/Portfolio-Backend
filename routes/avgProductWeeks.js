require("dotenv").config();
var express = require("express");
var router = express.Router();
// const dbEngine = process.env.DB_ENVIRONMENT || "development";
// const config = require("../knexfile")[dbEngine];
const knex = require("knex")(require("../knexfile.js")["production"]);

const avgProductWeek = () => {
  var today = new Date();

  knex
    .select("*")
    .from("product_week")
    .then((timeData) => {
      timeData.forEach((item) => {
        var itemDate = new Date(item.some_datetime.slice(0, 11));
      });
    })
    .then((data) => {
      data.status(200).json(data);
    })
    .catch((data) => {
      console.log(data);
    });
};

module.exports = router;
