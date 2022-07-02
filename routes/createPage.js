require("dotenv").config();
var express = require("express");
var router = express.Router();
// const dbEngine = process.env.DB_ENVIRONMENT || "development";
// const config = require("../knexfile")[dbEngine];
const knex = require("knex")(require("../knexfile.js")["production"]);

/* GET users listing. */
router.put("/", function (req, res, next) {
  const {
    url,
    pageName,
    id,
    links,
    avatars,
    background,
    template,
    opacity,
    brightness,
  } = req.body;

  knex
    .from("viaPages")
    .where({ userID: id })
    .update({
      numLinks: links.num,
      avatars: avatars,
      background: background,
      opacity: opacity,
      template: template,
      brightness: brightness,
    })
    .then(() => {
      knex
        .from("links")
        .where({ userID: id })
        .then(async (res) => {
          console.log(res.length);
          const addList = () => {
            links.url.forEach((link, index) => {
              console.log(link);
              return knex
                .insert({
                  userID: id,
                  link: link,
                })
                .into("links")
                .catch((_err) => res.send({ message: "error " + _err }));
            });
          };
          if (res.length === 0) {
            let check = await addList();
            console.log(check);
          }
          if (res.length > 0) {
            console.log(true);
            let test = await knex("links")
              .del()
              .then((res) => {
                return res;
              });
            console.log(test);
            addList();
          }
        });
    })
    .catch((_err) => res.send({ message: "error " + _err }));
});

module.exports = router;
