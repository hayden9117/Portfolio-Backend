exports.up = function (knex) {
  return knex.schema.createTable("Amazon", (table) => {
    table.increments("id"); // adds an auto incrementing PK column
    table.integer("userID");
    table.string("productname", 9000);
    table.string("url", 9000);
    table.string("itemprice");
    table.dateTime("some_datetime");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Amazon");
};
