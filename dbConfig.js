const dbEngine = process.env.DB_ENVIRONMENT || "development";
console.log(dbEngine);
const config = require("./knexfile")[dbEngine];

module.exports = require("knex")(config);
