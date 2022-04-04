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
// const { port } = require("pg/lib/defaults");
// require("dotenv").config();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
// SERVER

setInterval(updateAmazonData, 1000 * 60 * 60);
setInterval(addProductWeek, 1000 * 60 * 120);
// Middleware
app.use(
  cors({
    origin:
      "https://www.haydenportfol.io/" &&
      "https://richiehayden-portfolio-fronten.herokuapp.com",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
// app.listen(port, () => {
//   console.log("running");
// });
// const whitelist = [
//   "http://localhost:3001",
//   "http://localhost:8080",
//   "https://richiehayden-portfolio-fronten.herokuapp.com",
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin);
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable");
//       callback(null, true);
//     } else {
//       console.log("Origin rejected");
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   Credential: true,
// };

// app.use(cors(corsOptions));
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

module.exports = app;
