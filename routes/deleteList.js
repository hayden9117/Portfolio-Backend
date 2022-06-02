require("dotenv").config();
var express = require("express");
var router = express.Router();
// const dbEngine = process.env.DB_ENVIRONMENT || "development";
// const config = require("../knexfile")[dbEngine];
const knex = require("knex")(require("../knexfile.js")["production"]);

/* GET users listing. */
router.delete("/", async function (req, res, next) {
  knex("Amazon")
    .del()
    .where({ userID: req.body.id, url: `${req.body.url}` })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
