require("dotenv").config();
var express = require("express");
var router = express.Router();
const dbEngine = process.env.DB_ENVIRONMENT || "development";
const config = require("../knexfile")[dbEngine];
const knex = require("knex")(require("../knexfile.js")["production"]);
const cheerio = require("cheerio");
const fetch = require("node-fetch");

router.post("/", function (req, res, next) {
  const getAmazon = async (url) => {
    // get html text from url
    var http = require("http");
    var https = require("https");
    http.globalAgent.maxSockets = 1;
    https.globalAgent.maxSockets = 1;
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

    return {
      url: req.body.url,
      userID: req.body.userID,
      productname: productName,
      itemprice: newPrice[1],
      some_datetime: dateTime,
    };
  };

  getAmazon(req.body.url)
    .then((promise) => {
      console.log(promise);
      knex
        .select("*")
        .from("Amazon")
        .where({ url: `${promise.url}` })
        .then(() =>
          knex
            .insert({
              url: promise.url,
              userID: promise.userID,
              productname: promise.productname,
              itemprice: promise.itemprice,
              some_datetime: promise.some_datetime,
            })
            .into("Amazon")
        );
    })
    .catch((err) => {
      res.status(404).json({
        message: "not found",
      });
    });

  console.log("request records");
});

module.exports = router;
