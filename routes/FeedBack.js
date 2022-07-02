require("dotenv").config();

var express = require("express");
var router = express.Router();

const knex = require("knex")(require("../knexfile.js")["production"]);

/* GET users listing. */
router.post("/", function (req, res, next) {
  knex
    .insert({
      subject: req.body.subject,
      body: req.body.body,
    })
    .into("messages")
    .then((result) => {
      console.log(result);
      res.send({ message: "feed back submitted" });
    });
});
module.exports = router;
