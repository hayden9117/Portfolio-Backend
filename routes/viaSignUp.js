require("dotenv").config();
const { replaceWith } = require("cheerio/lib/api/manipulation.js");
var express = require("express");
var router = express.Router();
// const dbEngine = process.env.DB_ENVIRONMENT || "development";
// const config = require("../knexfile")[dbEngine];
const knex = require("knex")(require("../knexfile.js")["production"]);

/* GET users listing. */
router.post("/", function (req, res, next) {
  let config = {
    links: { num: 0, url: [] },
    avatars: 0,
    background: "#FFFFFF",
    opacity: "ff",
    template: "column",
    brightness: 0,
  };

  knex
    .select("*")
    .from("viaAccount")
    .where({ username: `${req.body.username}` })
    .then((result) => {
      if (result.length === 0) {
        // create the new user
        knex
          .insert({
            username: req.body.username,
            password: req.body.password,
          })
          .into("viaAccount")
          .then((result) => {
            console.log(result);
            res.send({ message: "successfully added new entry to database" });
          });
        knex
          .select("*")
          .from("viaAccount")
          .where({ username: `${req.body.username}` })
          .then((result) => {
            knex
              .insert({
                userID: result[0].id,
                pageName: req.body.username,
                url: req.body.url,
                numLinks: config.links.num,
                avatars: config.avatars,
                background: config.background,
                opacity: config.opacity,
                template: config.template,
                brightness: config.brightness,
              })
              .into("viaPages")
              .catch((_err) => res.send({ message: "error " + _err }));
          });
      } else {
        res.send({ message: "User Already Exists" });
      }
    })
    .catch((_err) => res.send({ message: "error " + _err }));
});

module.exports = router;
