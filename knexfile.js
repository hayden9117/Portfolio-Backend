// Update with your config settings.
const connectionString = process.env.DATABASE_URL


module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://postgres:docker@localhost/'
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      connectionString,
      ssl: { rejectUnauthorized: false }
    },
    migrations:
      { directory: './migrations' },
    seeds: { directory: './seeds' }


  }

};
