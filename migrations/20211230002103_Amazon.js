exports.up = function (knex) {
  return knex.schema.createTable("Amazon", (table) => {
    table.increments("id"); // adds an auto incrementing PK column
    table.string("productname", 1000);
    table.string("url", 1000);
    table.string("itemprice");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Amazon");
};
