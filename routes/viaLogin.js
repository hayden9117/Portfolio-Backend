require("dotenv").config();
var express = require("express");
var router = express.Router();
// const dbEngine = process.env.DB_ENVIRONMENT || "development";
// const config = require("../knexfile")[dbEngine];
const knex = require("knex")(require("../knexfile.js")["production"]);
// router.use(cors());

// router.get('/', (req, res) => {
//     res.send({
//         token: 'test123'
//     })
// })
router.post("/", async (req, res) => {
  let userName = req.body.username;
  let passWord = req.body.password;

  knex
    .select("*")
    .from("viaAccount")
    .where({ username: `${userName}` })
    .then(async (result) => {
      if (result.length === 0) {
        res.send({ message: "No match found, create new user." });
      } else if (result[0].password === passWord) {
        var configStructure = await knex
          .from("viaPages")
          .where({ userID: result[0].id })
          .then(async (page) => {
            let linksArr = await knex
              .from("links")
              .where({ userID: result[0].id })
              .then((res) => {
                let arr = res.map((links) => {
                  return links.link;
                });
                return arr;
              });
            return {
              token: { token: result[0].id, username: userName },
              config: {
                links: { num: page[0].numLinks, url: linksArr },
                avatars: page[0].avatars,
                background: page[0].background,
                opacity: page[0].opacity,
                template: page[0].template,
                brightness: page[0].brightness,
              },
            };
          });

        configStructure.config.links.url.pus;
        res.send(configStructure);
      } else {
        res.send({ message: "incorrect password" });
      }
    })
    .then((data) => res.status(200).json(data))
    .catch(
      (err) =>
        (err = res.status(404).json({
          message: "these are not the users you are looking for" + err,
        }))
    );

  // { username: 'username', password: 'password' }
});
module.exports = router;
