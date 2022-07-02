// Update with your config settings.
const connectionString = process.env.HEROKU_POSTGRESQL_IVORY_URL;
module.exports = {
  // development: {
  //   client: "pg",
  //   connection: "postgres://postgres:docker@localhost/",
  //   migrations: { directory: "./migrations" },
  //   seeds: { directory: "./seeds" },
  // },
  production: {
    client: "pg",
    connection: {
      connectionString,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      migrations: { directory: "./migrations" },
    },
  },
};
