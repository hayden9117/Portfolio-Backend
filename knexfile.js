// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres:docker@localhost/",
    migrations: { directory: "./migrations" },
    seeds: { directory: "./seeds" },
  },
  production: {
    client: "pg",
    connection: process.env.HEROKU_POSTGRESQL_IVORY_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tablename: "knex_migrations",
      directory: "./migrations",
    },
  },
};
