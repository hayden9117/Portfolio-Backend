var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile.js")["production"]);
const cheerio = require("cheerio");
const fetch = require("node-fetch");

router.post("/", function (req, res, next) {
  const getAmazon = async (url) => {
    // get html text from url

    let urlToScrape = new URL(url);

    const response = await fetch(urlToScrape);
    // using await to ensure that the promise resolves
    const body = await response.text();

    // parse the html text and extract titles
    const $ = cheerio.load(body);

    // using CSS selector
    const priceSing = $(".a-price");
    const priceNode = $(priceSing);
    const priceText = priceNode.text();
    let newPrice = priceText.split("$");

    const titleNode = $(".a-size-large");
    const titleText = titleNode.text();

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    let productName = titleText;
    knex
      .select("*")
      .from("Amazon")
      .where({ url: `${url}` })
      .then(() =>
        knex
          .insert({
            url: req.body.url,
            userID: req.body.userID,
            productname: productName,
            itemprice: newPrice[1],
            some_datetime: dateTime,
          })
          .into("Amazon")
      )
      .catch((err) => {
        res.status(404).json(
          {
            message: "not found",
          },
          console.log(err.message)
        );
      });
  };

  getAmazon(req.body.url);

  console.log("request records");
});

module.exports = router;
