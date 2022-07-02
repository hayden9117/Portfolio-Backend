exports.up = function (knex) {
  return knex.schema.createTable("messages", (table) => {
    table.increments("id"); // adds an auto incrementing PK column
    table.string("subject");
    table.string("body");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("messages");
};
