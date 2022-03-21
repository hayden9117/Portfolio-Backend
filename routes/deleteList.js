var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile.js")["production"]);

/* GET users listing. */
router.delete("/", function (req, res, next) {
  console.log(req.body.url);
  knex("Amazon")
    .del()
    .where({ url: `${req.body.url}` })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(404).json({
        message: "not found",
      });
    });
});

module.exports = router;
