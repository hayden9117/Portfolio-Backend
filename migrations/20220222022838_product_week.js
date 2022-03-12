exports.up = function (knex) {
  return knex.schema.createTable("product_week", (table) => {
    table.increments("id");
    table.integer("userID");
    table.string("url", 9000);
    table.string("productname", 1000);
    table.string("itemprice");
    table.string("some_datetime");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("product_week");
};
