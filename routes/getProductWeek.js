require("dotenv").config();
var express = require("express");
var router = express.Router();
// const dbEngine = process.env.DB_ENVIRONMENT || "development";
// const config = require("../knexfile")[dbEngine];
const knex = require("knex")(require("../knexfile.js")["production"]);

router.post("/", function (req, res, next) {
  const userID = req.body.userID;

  knex
    .select("*")
    .from("Amazon")
    .where({ userID: userID })
    .then((userList) => {
      const week = [];
      for (let j = 0; j < 7; j++) {
        var curr = new Date(); // get current date
        var last = curr.getDate() - j; // last day is current date

        var currentWeek = new Date(curr.setDate(last)).toString().slice(0, 11);
        week.push(currentWeek);
      }

      knex
        .select("*")
        .from("product_week")
        .then((timeData) => {
          userList.forEach((item) => {
            item.data = [
              {
                id: 1,
                day: week[6],
                price: null,
              },
              {
                id: 2,
                day: week[5],
                price: null,
              },
              {
                id: 3,
                day: week[4],
                price: null,
              },
              {
                id: 4,
                day: week[3],
                price: null,
              },
              {
                id: 5,
                day: week[2],
                price: null,
              },
              {
                id: 6,
                day: week[1],
                price: null,
              },
              {
                id: 7,
                day: week[0],
                price: null,
              },
            ];

            item.data[6].price = item.itemprice;

            for (let i = 0; i < timeData.length; i++) {
              let day = new Date(timeData[i].some_datetime);
              const daysUpdate = day.toString().slice(0, 11);
              timeData[i].daysToUpdate = daysUpdate;
              for (let j = 0; j < item.data.length; j++) {
                if (item.url === timeData[i].url) {
                  item.data[6].price = item.itemprice;

                  if (
                    item.data[j].day === timeData[i].daysToUpdate &&
                    item.data[j].day !== item.data[6].day
                  ) {
                    item.data[j].price = timeData[i].itemprice;
                  }
                }
              }
            }
          });
          return userList;
        })
        .then((data) => {
          res.status(200).json(data);
        });
    })
    .catch((err) => {
      res.status(404).json(
        {
          message: "not found",
        },
        console.log(err.message)
      );
    });
});

module.exports = router;
