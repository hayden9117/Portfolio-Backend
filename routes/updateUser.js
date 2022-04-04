require("dotenv").config();
var express = require("express");
var router = express.Router();
const dbEngine = process.env.DB_ENVIRONMENT || "development";
const config = require("../knexfile")[dbEngine];
const knex = require("knex")(require("../knexfile.js")["production"]);

/* GET users listing. */
router.put("/", function (req, res, next) {
  console.log(req.body.username);
  knex
    .select("*")
    .from("accounts")
    .update({
      username: req.body.username,
    })
    .where({ username: `${req.body.oldUserName}` })
    .then((result) => {
      res.send({
        token: req.body.id,
        username: req.body.username,
      });
    })
    .catch((err) =>
      res.send({
        message: "error when trying to update user",
      })
    );

  console.log(`user ${req.body.username}  `);
});

module.exports = router;
