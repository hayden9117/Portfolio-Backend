require("dotenv").config();
var express = require("express");
var router = express.Router();
// const dbEngine = process.env.DB_ENVIRONMENT || "development";
// const config = require("../knexfile")[dbEngine];
const knex = require("knex")(require("../knexfile.js")["production"]);
const cheerio = require("cheerio");
const fetch = require("node-fetch");

const updateAmazonData = () => {
  knex
    .select("*")
    .from("Amazon")
    .orderBy("id")
    .then(async (result) => {
      result.forEach(async (result) => {
        let urlToScrape = new URL(result.url);

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
        // const imgNode = $(".a-image-container");
        // const imgSrc = imgNode;
        // console.log(imgSrc);

        knex
          .select("*")
          .from("Amazon")
          .update({ id: result.id, itemprice: newPrice[1] })
          .where("id", result.id)
          .catch(function (err) {
            console.log("select id do not exist");
            res.send("do not exist");
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
updateAmazonData();

module.exports = updateAmazonData;
