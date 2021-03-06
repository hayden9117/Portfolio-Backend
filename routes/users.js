require("dotenv").config();
var express = require("express");
var router = express.Router();
// const dbEngine = process.env.DB_ENVIRONMENT || "development";
// const config = require("../knexfile")[dbEngine];
const knex = require("knex")(require("../knexfile.js")["production"]);

/* GET users listing. */
router.post("/", function (req, res, next) {
  knex
    .select("*")
    .from("accounts")
    .where({ username: `${req.body.username}` })
    .then((result) => {
      if (result.length === 0) {
        // create the new user
        knex
          .insert({
            username: req.body.username,
            password: req.body.password,
          })
          .into("accounts")
          .then(
            res.send({ message: "successfully added new entry to database" })
          );
      } else {
        res.send({ message: "User Already Exists" });
      }
    })
    .catch((_err) => res.send({ message: "error " + _err }));
});

module.exports = router;
