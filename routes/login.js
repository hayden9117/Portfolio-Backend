var express = require("express");
var router = express.Router();
knex = require("knex")(require("../knexfile.js")["development"]);
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
    .from("accounts")
    .where({ username: `${userName}` })
    .then((result) => {
      if (result.length === 0) {
        res.send({ message: "No match found, create new user." });
      } else if (result[0].password === passWord) {
        res.send({ token: "test123", username: userName });
      } else {
        res.send({ message: "incorrect password" });
      }
    })
    .then((data) => res.status(200).json(data))
    .catch(
      (err) =>
        (err = res
          .status(404)
          .json({ message: "these are not the users you are looking for" }))
    );

  // { username: 'username', password: 'password' }

  console.log(
    `user ${userName} pass ${passWord} result: $ ${result[0].password} `
  );
});
module.exports = router;