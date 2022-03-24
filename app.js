const path = require("path");
const express = require("express");
const knex = require("knex")(require("./knexfile.js")["production"]);
const app = express();
// const PORT = process.env.PORT || 3001;
// const db = require("./db");
const cors = require("cors");
var users = require("./routes/users");
var login = require("./routes/login");
var deleteList = require("./routes/deleteList.js");
var AmazonData = require("./routes/AmazonData");
var getAmazonData = require("./routes/getAmazonData");
var updateAmazonData = require("./routes/updateAmazonData");
var updateUser = require("./routes/updateUser");
var addProductWeek = require("./routes/addProductWeek");
var getProductWeek = require("./routes/getProductWeek");
// require("dotenv").config();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
// SERVER
// app.listen(PORT || 3001, () => {
//   console.log("running");
// });

setInterval(updateAmazonData, 1000 * 60 * 60);
setInterval(addProductWeek, 1000 * 60 * 120);
// Middleware
// app.use(cors({ origin: '', credentials: true }))
const domainsFromEnv = process.env.CORS_DOMAINS || "";

const whitelist = domainsFromEnv.split(",").map((item) => item.trim());

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/newuser", users);
app.use("/login", login);
app.use("/deletelist", deleteList);
app.use("/AmazonData", AmazonData);
app.use("/getAmazonData", getAmazonData);
app.use("/getProductWeek", getProductWeek);
app.use("/updateUser", updateUser);
// Routes
app.get("/", (req, res) => {
  res.send("heroku test server successful");
});

// docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v ~/docker/volumes/postgres:/var/lib/postgresql/data postgres

// app.post('/login', async (req, res) => {
//   let userName = req.body.username
//   let passWord = req.body.password

//   knex
//     .select('*')
//     .from('accounts')
//     .where({ username: `${userName}` })
//     .then(result => {
//       if (result.length === 0) {
//         res.send({ message: 'No match found, create new user.' })
//       } else if (result[0].password === passWord) {
//         res.send({ message: 'login successful' })
//       } else {
//         res.send({ message: 'incorrect password' })
//       }

//     }
//     )
// .then(data => res.status(200).json(data))
// .catch(err => res.status(404).json({ message: 'these are not the users you are looking for' }))

// {username: 'username', password: 'password'}

//   console.log(`user ${userName} pass ${passWord} result: $ ${result[0].password} `)

// })

app.get("/test", (req, res) => {
  console.log("request records");
  knex
    .select("*")
    .from("accounts")
    .orderBy("id")
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(404).json({
        message: "not found",
      });
    });
});

app.get("/testlist", (req, res) => {
  console.log("request records");
  knex
    .select("*")
    .from("favoriteslist")
    .orderBy("id")
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(404).json(
        {
          message: "not found",
        },
        console.log(err.message)
      );
    });
});
/* GET users listing. */
app.get("/amazonTest", function (req, res, next) {
  console.log("request records");
  knex
    .select("*")
    .from("Amazon")
    .orderBy("id")
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(404).json(
        {
          message: "not found",
        },
        console.log(err.message)
      );
    });
});

app.get("/amazonWeekTest", function (req, res, next) {
  console.log("request records");
  knex
    .select("*")
    .from("product_week")
    .orderBy("id")
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(404).json(
        {
          message: "not found",
        },
        console.log(err.message)
      );
    });
});

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   console.log("request records");
//   knex
//     .select("*")
//     .from("Amazon")
//     .orderBy("id")
//     .then((data) => res.status(200).json(data))
//     .catch((err) => {
//       res.status(404).json(
//         {
//           message: "not found",
//         },
//         console.log(err.message)
//       );
//     });
// });
// app.post('/newuser', (req, res) => {
//   knex
//     .select('*')
//     .from('accounts')
//     .where({ username: `${req.body.username}` })
//     .then(result => {
//       if (result.length === 0) {
//         // create the new user
//         knex.insert({
//           username: req.body.username,
//           password: req.body.password,
//         }).into('accounts')
//           .then(res.send({ message: 'successfully added new entry to database' }))

//       } else {
//         res.send({ message: 'User Already Exists' })
//       }

//     }
//     )
//     .catch(err => res.send({ message: 'error when trying to add user' }))

// })

// app.post('/update', (req, res) => {
//   console.log(req.body)
//   knex('scores')
//     .where({ username: req.body.username })
//     .update({ username: req.body.newusername })
//     .update({ password: req.body.newpassword })
//     .then(res.send({ message: 'username updated' }))
//     .catch(err => res.send({ message: 'error when updating username' }))
// })

// app.delete('/delete', (req, res) => {
//   console.log('user tried to delete', req.body.username)
//   knex('scores')
//     .del()
//     .where({ username: req.body.username })
//     .then(data => res.status(200).json(data))
//     .catch(err => {
//       res.status(404).json({
//         message: 'not found'
//       })
//     })
// })
module.exports = app;
