exports.up = function (knex) {
  return knex.schema.createTable("viaAccount", (table) => {
    table.increments("id"); // adds an auto incrementing PK column
    table.string("username");
    table.string("password");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("viaAccount");
};
