var express = require("express");
var router = express.Router();
const knex = require("knex")(require("../knexfile.js")["development"]);
const cheerio = require("cheerio");
const fetch = require("node-fetch");

router.post("/", function (req, res, next) {
  const getAmazon = async (url) => {
    // get html text from url
    console.log(url);
    let urlToScrape = new URL(url);
    console.log(urlToScrape + " url to scrape");
    const response = await fetch(urlToScrape);
    // using await to ensure that the promise resolves
    const body = await response.text();

    // parse the html text and extract titles
    const $ = cheerio.load(body);
    const priceList = [];

    // using CSS selector
    $(".a-price").each((i, price) => {
      const priceNode = $(price);
      const priceText = priceNode.text();

      priceList.push(priceText);
    });

    const titleNode = $(".a-size-large");
    const titleText = titleNode.text();
    console.log(titleText);

    let price = priceList[0]
      .split("")
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      })
      .join("");
    let productName = titleText;
    knex
      .select("*")
      .from("Amazon")
      .where({ url: `${url}` })
      .then(() =>
        knex
          .insert({
            url: req.body.url,
            productname: productName,
            itemprice: price,
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
