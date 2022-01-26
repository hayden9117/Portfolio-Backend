exports.up = function (knex) {
  return knex.schema.createTable("Amazon", (table) => {
    table.increments("id"); // adds an auto incrementing PK column
    table.string("itemname").notNullable();
    table.string("itemprice").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Amazon");
};
