require("dotenv").config();
var express = require("express");
var router = express.Router();
const dbEngine = process.env.DB_ENVIRONMENT || "development";
const config = require("../knexfile")[dbEngine];
const knex = require("knex")(require("../knexfile.js")["production"]);
const cheerio = require("cheerio");
const fetch = require("node-fetch");

const addProductWeek = () => {
  knex
    .select("*")
    .from("Amazon")
    .orderBy("id")
    .then(async (result) => {
      result.forEach(async (result) => {
        let urlToScrape = new URL(result.url);
        console.log(urlToScrape + " url to scrape");
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
        console.log(newPrice[1]);
        const titleNode = $(".a-size-large");

        // const imgNode = $(".a-image-container");
        // const imgSrc = imgNode;
        // console.log(imgSrc);
        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        var time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        var dateTime = date + " " + time;
        let productName = result.productName;
        knex
          .select("*")
          .from("product_week")
          .then(() =>
            knex
              .insert({
                url: result.url,
                userID: result.userID,
                productname: productName,
                itemprice: newPrice[1],
                some_datetime: dateTime,
              })
              .into("product_week")
          )
          .catch((err) => {
            console.log(err);
          });
      });
    });
};
addProductWeek();
module.exports = addProductWeek;
