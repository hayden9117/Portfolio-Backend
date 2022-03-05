var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile.js")["development"]);

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
    .then(
      res.send({
        token: "test123",
        username: req.body.username,
      })
    )
    .catch((err) =>
      res.send({
        message: "error when trying to update user",
      })
    );

  console.log(`user ${req.body.username}  `);
});

module.exports = router;
