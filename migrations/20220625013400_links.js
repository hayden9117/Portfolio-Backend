exports.up = function (knex) {
  return knex.schema.createTable("links", (table) => {
    table.increments("id"); // adds an auto incrementing PK column
    table.integer("userID");
    table.string("link");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("links");
};
